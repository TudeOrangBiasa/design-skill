/**
 * Deterministic design-smell detector. Runs the mechanical tells from
 * smell.md against HTML without an LLM: static-HTML structure checks,
 * CSS property checks, and regex text checks.
 *
 * Usage:
 *   node scripts/detector.mjs <file|dir|url> [--json]
 *
 * Exit code 1 when error-severity findings exist, 2 on usage error.
 * Dependency-free: Node >= 18 (fetch for URLs).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export { RULES, buildContext, runRules, summarize, stripTags };

// ---------------------------------------------------------------------------
// Input loading
// ---------------------------------------------------------------------------

async function loadInput(target) {
  if (/^https?:\/\//.test(target)) {
    const res = await fetch(target);
    if (!res.ok) throw new Error(`fetch failed: ${res.status} ${target}`);
    const html = await res.text();
    return [{ file: target, html }];
  }
  const p = path.resolve(target);
  const st = fs.statSync(p);
  if (st.isDirectory()) {
    const files = [];
    (function walk(d) {
      for (const entry of fs.readdirSync(d)) {
        const f = path.join(d, entry);
        const s = fs.statSync(f);
        if (s.isDirectory()) walk(f);
        else if (/\.html?$/i.test(entry)) files.push(f);
      }
    })(p);
    if (!files.length) throw new Error(`no HTML files in ${target}`);
    return files.map((f) => ({ file: f, html: fs.readFileSync(f, 'utf8') }));
  }
  return [{ file: p, html: fs.readFileSync(p, 'utf8') }];
}

// ---------------------------------------------------------------------------
// Context extraction (no dependencies, tolerant of real-world HTML)
// ---------------------------------------------------------------------------

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function collectTags(html) {
  const tags = [];
  const re = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:\s+[^<>]*?)?)(\/?)>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const closing = m[1] === '/';
    const name = m[2].toLowerCase();
    const attrs = m[3] || '';
    const selfClosing = m[4] === '/';
    tags.push({ closing, name, attrs, selfClosing, index: m.index });
  }
  return tags;
}

function attr(attrs, key) {
  const re = new RegExp(`${key}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i');
  const m = attrs.match(re);
  return m ? (m[2] ?? m[3] ?? m[4] ?? '') : null;
}

function inlineStyles(html) {
  // style="..." attribute values, concatenated with unique declaration guard
  const out = [];
  const re = /style\s*=\s*"([^"]*)"/gi;
  let m;
  while ((m = re.exec(html)) !== null) out.push(m[1]);
  return out.join('\n');
}

function cssBlocks(html) {
  const out = [];
  const re = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let m;
  while ((m = re.exec(html)) !== null) out.push(m[1]);
  return out.join('\n');
}

function prop(css, name) {
  const re = new RegExp(`${name}\\s*:\\s*([^;}{]+)`, 'gi');
  const vals = [];
  let m;
  while ((m = re.exec(css)) !== null) vals.push(m[1].trim());
  return vals;
}

function countProp(css, name, pattern) {
  const vals = prop(css, name);
  return vals.filter((v) => pattern.test(v)).length;
}

const EMOJI_RE = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/u;
const BUZZWORDS = [
  'streamline', 'empower', 'supercharge', 'world-class', 'enterprise-grade',
  'next-generation', 'cutting-edge', 'revolutionary', 'game-chang', 'seamless',
  'unleash', 'unlock the power', 'effortless',
];

// ---------------------------------------------------------------------------
// The rule registry (deterministic subset of smell.md tells)
// ---------------------------------------------------------------------------

function buildContext({ html, text }) {
  const css = inlineStyles(html) + '\n' + cssBlocks(html);
  const headings = [];
  const headingRe = /<h([1-6])([^>]*)>([\s\S]*?)<\/h\1>/gi;
  let hm;
  while ((hm = headingRe.exec(html)) !== null) {
    headings.push({ level: +hm[1], attrs: hm[2], text: stripTags(hm[3]).slice(0, 200) });
  }
  const imgs = [];
  const imgRe = /<img([^>]*)>/gi;
  let im;
  while ((im = imgRe.exec(html)) !== null) imgs.push({ attrs: im[1] });
  return { html, text, css, headings, imgs };
}

const RULES = [
  {
    id: 'emoji-icon',
    name: 'Emoji used as icons',
    category: 'Imagery',
    severity: 'error',
    check(ctx) {
      const head = ctx.headings.map((h) => h.text).join(' ');
      const btns = [];
      const btnRe = /<button[^>]*>([\s\S]*?)<\/button>/gi;
      let bm;
      while ((bm = btnRe.exec(ctx.html)) !== null) btns.push(stripTags(bm[1]));
      const uiText = (head + ' ' + btns.join(' ')).match(EMOJI_RE);
      return uiText ? [{ evidence: `emoji in headings or buttons: ${uiText[0]}` }] : [];
    },
  },
  {
    id: 'em-dash-saturation',
    name: 'Em dash saturation in copy',
    category: 'Copy',
    severity: 'advisory',
    check(ctx) {
      const dashes = (ctx.text.match(/[\u2014\u2013]/g) || []).length;
      const per500 = ctx.text.length ? (dashes / ctx.text.length) * 500 : 0;
      return per500 >= 1 ? [{ evidence: `${dashes} em/en dashes, ${per500.toFixed(1)} per 500 chars` }] : [];
    },
  },
  {
    id: 'marketing-buzzword',
    name: 'Marketing buzzwords',
    category: 'Copy',
    severity: 'error',
    check(ctx) {
      const hits = [];
      for (const w of BUZZWORDS) {
        const re = new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i');
        if (re.test(ctx.text)) hits.push(w);
      }
      return hits.length ? [{ evidence: hits.slice(0, 6).join(', ') }] : [];
    },
  },
  {
    id: 'aphoristic-cadence',
    name: 'Aphoristic cadence copy',
    category: 'Copy',
    severity: 'advisory',
    check(ctx) {
      const matches = ctx.text.match(/Not a [A-Z][^.]*\. A [A-Z][^.]*\.|\. (No|Just) [^.]*\./g) || [];
      return matches.length >= 3 ? [{ evidence: `${matches.length} manufactured-contrast lines` }] : [];
    },
  },
  {
    id: 'gradient-text',
    name: 'Gradient text',
    category: 'Color',
    severity: 'error',
    check(ctx) {
      const clip = countProp(ctx.css, 'background-clip', /text/i);
      const bg = countProp(ctx.css, 'background-image', /linear-gradient|radial-gradient/i);
      return clip > 0 || bg > 0 ? [{ evidence: `${clip} background-clip:text, ${bg} gradient backgrounds` }] : [];
    },
  },
  {
    id: 'ai-palette',
    name: 'AI color palette (purple-blue / cyan)',
    category: 'Color',
    severity: 'error',
    check(ctx) {
      const purple = /#(8b5cf6|7c3aed|6366f1|818cf8|a855f7|6d28d9)|rgba?\(\s*(124|139|99|129|168)\s*,\s*(58|92|102|89|85)\s*,\s*(237|246|241|248|247)/i;
      const cyan = /#(06b6d4|22d3ee|0ea5e9|38bdf8)/i;
      const p = purple.test(ctx.css) ? 1 : 0;
      const c = cyan.test(ctx.css) ? 1 : 0;
      return p + c >= 2 || (p && /gradient/i.test(ctx.css))
        ? [{ evidence: `purple family: ${p}, cyan family: ${c}` }]
        : [];
    },
  },
  {
    id: 'cream-palette',
    name: 'Cream / beige default background',
    category: 'Color',
    severity: 'warning',
    check(ctx) {
      const bg = prop(ctx.css, 'background-color').filter((v) => /#f[a-f0-9]{5}/i.test(v));
      const cream = bg.filter((v) => {
        const hex = v.replace('#', '').slice(0, 6);
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        return r > 240 && g > 235 && b < 250 && r - b > 6 && r - g < 10;
      });
      return cream.length ? [{ evidence: `warm off-white backgrounds: ${cream.slice(0, 3).join(', ')}` }] : [];
    },
  },
  {
    id: 'dark-glow',
    name: 'Glowing shadow accents',
    category: 'Color',
    severity: 'error',
    check(ctx) {
      const shadows = prop(ctx.css, 'box-shadow').filter((v) =>
        /rgba?\(|hsl\(|#[0-9a-f]{3,8}/i.test(v) && /0 0 |0px 0px/.test(v) && /blur|px/.test(v)
      );
      const glow = shadows.filter((v) => /rgba?\(\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*[0-9.]+\)/i.test(v) && !/,\s*0(\.0+)?\s*\)/.test(v));
      return glow.length ? [{ evidence: `${glow.length} zero-offset chromatic shadows` }] : [];
    },
  },
  {
    id: 'radial-halo',
    name: 'Radial-gradient background halo',
    category: 'Color',
    severity: 'warning',
    check(ctx) {
      const rad = countProp(ctx.css, 'background-image', /radial-gradient/i);
      const r = countProp(ctx.css, 'background', /radial-gradient/i);
      return rad + r > 0 ? [{ evidence: `${rad + r} radial gradients in backgrounds` }] : [];
    },
  },
  {
    id: 'overused-font',
    name: 'Overused font family',
    category: 'Typography',
    severity: 'warning',
    check(ctx) {
      const families = prop(ctx.css, 'font-family');
      const overused = ['Inter', 'Roboto', 'Fraunces', 'Geist', 'Plus Jakarta Sans', 'Space Grotesk', 'Playfair', 'Lora', 'Cormorant', 'Newsreader', 'Recoleta'];
      const found = [];
      for (const fam of overused) {
        if (families.some((v) => new RegExp(fam, 'i').test(v))) found.push(fam);
      }
      return found.length ? [{ evidence: `families: ${found.join(', ')}` }] : [];
    },
  },
  {
    id: 'italic-serif-display',
    name: 'Italic serif display headline',
    category: 'Typography',
    severity: 'warning',
    check(ctx) {
      const h1 = ctx.headings.find((h) => h.level === 1);
      if (!h1) return [];
      const serif = /serif|Fraunces|Playfair|Recoleta|Newsreader|Cormorant|Lora/i.test(h1.attrs + ' ' + ctx.css);
      const italic = /font-style\s*:\s*italic/i.test(ctx.css);
      return serif && italic ? [{ evidence: `h1 in a serif face with italic styling` }] : [];
    },
  },
  {
    id: 'crushed-tracking',
    name: 'Crushed letter spacing',
    category: 'Typography',
    severity: 'warning',
    check(ctx) {
      const ls = prop(ctx.css, 'letter-spacing').filter((v) => {
        const m = v.match(/(-?[0-9.]+)(em|px)?/);
        if (!m) return false;
        const val = parseFloat(m[1]);
        const unit = m[2] || 'em';
        return unit === 'em' ? val < -0.04 : val < -4;
      });
      return ls.length ? [{ evidence: `letter-spacing values: ${ls.slice(0, 4).join(', ')}` }] : [];
    },
  },
  {
    id: 'oversized-h1',
    name: 'Oversized hero headline',
    category: 'Typography',
    severity: 'warning',
    check(ctx) {
      const h1 = ctx.headings.find((h) => h.level === 1);
      if (!h1 || h1.text.length < 40) return [];
      const sizes = prop(ctx.css, 'font-size').filter((v) => {
        const m = v.match(/([0-9.]+)(px|rem)/);
        return m && (m[2] === 'px' ? +m[1] >= 96 : +m[1] >= 6);
      });
      return sizes.length ? [{ evidence: `long h1 (${h1.text.length} chars) at display size` }] : [];
    },
  },
  {
    id: 'icon-tile-stack',
    name: 'Icon tile stacked above heading',
    category: 'Layout',
    severity: 'warning',
    check(ctx) {
      const re = /<(svg|img)[^>]*>[\s\S]{0,300}?<h([1-6])/gi;
      const hits = [];
      let m;
      while ((m = re.exec(ctx.html)) !== null) hits.push(m[0].length);
      return hits.length ? [{ evidence: `${hits.length} icon-before-heading stacks` }] : [];
    },
  },
  {
    id: 'nested-cards',
    name: 'Nested cards',
    category: 'Layout',
    severity: 'error',
    check(ctx) {
      const cardRe = /<([a-z]+)([^>]*class="[^"]*(?:card|tile|panel)[^"]*"[^>]*)>/gi;
      let depth = 0, max = 0;
      let m;
      while ((m = cardRe.exec(ctx.html)) !== null) {
        const tag = m[1];
        const open = m[2] && !m[2].includes('/');
        if (open) { depth++; max = Math.max(max, depth); }
      }
      // count closing of same tags is approximate; use a stack
      depth = 0; max = 0;
      const stack = [];
      const re2 = /<(\/?)([a-z]+)([^>]*class="[^"]*(?:card|tile|panel)[^"]*"[^>]*)?>/gi;
      while ((m = re2.exec(ctx.html)) !== null) {
        if (m[1] === '/') { if (stack.length && stack[stack.length - 1] === m[2]) stack.pop(); }
        else if (m[3] && /card|tile|panel/.test(m[3])) stack.push(m[2]);
        max = Math.max(max, stack.length);
      }
      return max >= 2 ? [{ evidence: `nesting depth ${max}` }] : [];
    },
  },
  {
    id: 'side-tab-border',
    name: 'Side-tab accent border',
    category: 'Layout',
    severity: 'error',
    check(ctx) {
      const bl = prop(ctx.css, 'border-left').filter((v) => /[2-9]px/.test(v));
      return bl.length ? [{ evidence: `thick border-left values: ${bl.slice(0, 4).join(', ')}` }] : [];
    },
  },
  {
    id: 'ghost-card',
    name: 'Ghost card (border + wide shadow)',
    category: 'Layout',
    severity: 'warning',
    check(ctx) {
      const borders = countProp(ctx.css, 'border', /1px/);
      const wideShadow = countProp(ctx.css, 'box-shadow', /\d{2,}px\s+\d{2,}px/);
      return borders > 0 && wideShadow > 0 ? [{ evidence: `${borders} 1px borders with ${wideShadow} wide shadows` }] : [];
    },
  },
  {
    id: 'over-rounding',
    name: 'Over-rounding on containers',
    category: 'Layout',
    severity: 'warning',
    check(ctx) {
      const radii = prop(ctx.css, 'border-radius').filter((v) => {
        const m = v.match(/(\d{2,})px/);
        return m && +m[1] >= 32;
      });
      return radii.length ? [{ evidence: `radii: ${radii.slice(0, 4).join(', ')}` }] : [];
    },
  },
  {
    id: 'bounce-easing',
    name: 'Bounce or elastic easing',
    category: 'Motion',
    severity: 'error',
    check(ctx) {
      // cubic-bezier with a control point y outside 0..1 overshoots, which is bounce.
      const vals = prop(ctx.css, 'transition').concat(prop(ctx.css, 'animation')).concat(prop(ctx.css, 'easing'));
      const bounced = vals.some((v) => {
        const m = v.match(/cubic-bezier\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)/i);
        if (!m) return false;
        return +m[2] > 1 || +m[4] > 1;
      });
      const named = /animation[^;{]*bounce|@keyframes bounce/i.test(ctx.css);
      return bounced || named ? [{ evidence: 'bounce-style easing (overshooting cubic-bezier) or bounce keyframes' }] : [];
    },
  },
  {
    id: 'pulsing-dot',
    name: 'Pulsing status dot',
    category: 'Motion',
    severity: 'warning',
    check(ctx) {
      const pulse = /animation[^;{]*pulse|@keyframes pulse/i.test(ctx.css);
      return pulse ? [{ evidence: 'pulse animation defined' }] : [];
    },
  },
  {
    id: 'blinking-cursor',
    name: 'Decorative blinking cursor',
    category: 'Motion',
    severity: 'advisory',
    check(ctx) {
      const blink = /animation[^;{]*blink|@keyframes blink/i.test(ctx.css);
      return blink ? [{ evidence: 'blink animation defined' }] : [];
    },
  },
  {
    id: 'marquee',
    name: 'Auto-scrolling marquee',
    category: 'Motion',
    severity: 'warning',
    check(ctx) {
      const marquee = /animation[^;{]*(marquee|scroll)[^;{]*infinite|translateX\(-100%\)/i.test(ctx.css);
      return marquee ? [{ evidence: 'infinite horizontal scroll animation' }] : [];
    },
  },
  {
    id: 'broken-image',
    name: 'Broken or placeholder image',
    category: 'Quality',
    severity: 'error',
    check(ctx) {
      const broken = ctx.imgs.filter((i) => {
        const src = attr(i.attrs, 'src');
        return !src || /placeholder|data:image\/gif;base64,R0lGOD|undefined|#/.test(src);
      });
      return broken.length ? [{ evidence: `${broken.length} images with empty or placeholder src` }] : [];
    },
  },
  {
    id: 'missing-alt',
    name: 'Images without alt text',
    category: 'Quality',
    severity: 'warning',
    check(ctx) {
      const missing = ctx.imgs.filter((i) => !attr(i.attrs, 'alt'));
      return missing.length ? [{ evidence: `${missing.length} images without alt` }] : [];
    },
  },
  {
    id: 'content-hidden-at-rest',
    name: 'Content invisible at rest',
    category: 'Quality',
    severity: 'error',
    check(ctx) {
      const hidden = countProp(ctx.css, 'opacity', /0(\.0+)?\b/);
      const vis = countProp(ctx.css, 'visibility', /hidden/i);
      return hidden + vis > 0 ? [{ evidence: `${hidden} opacity:0 and ${vis} visibility:hidden declarations` }] : [];
    },
  },
  {
    id: 'eyebrow-above-h1',
    name: 'Eyebrow label above hero heading',
    category: 'Typography',
    severity: 'error',
    check(ctx) {
      const re = /<p[^>]*>[^<]{0,60}<\/p>[\s\S]{0,80}<h1/gi;
      const m = ctx.html.match(re);
      return m ? [{ evidence: 'small label block directly above the h1' }] : [];
    },
  },
  {
    id: 'semantic-palette',
    name: 'Default semantic palette',
    category: 'Color',
    severity: 'warning',
    check(ctx) {
      const hues = new Set();
      const classRe = /(?:bg|text|border)-(blue|amber|green|red)-(?:50|500|600)(?:\/\d+)?/gi;
      let m;
      while ((m = classRe.exec(ctx.html)) !== null) hues.add(m[1]);
      const hexHues = { eff6ff: 'blue', fffbeb: 'amber', f0fdf4: 'green', fef2f2: 'red', '2563eb': 'blue', d97706: 'amber', '16a34a': 'green', dc2626: 'red', '3b82f6': 'blue', ef4444: 'red', '22c55e': 'green', f59e0b: 'amber' };
      const cssHueRe = /#(eff6ff|fffbeb|f0fdf4|fef2f2|2563eb|d97706|16a34a|dc2626|3b82f6|ef4444|22c55e|f59e0b)\b/gi;
      let hm;
      while ((hm = cssHueRe.exec(ctx.css)) !== null) hues.add(hexHues[hm[1]]);
      return hues.size >= 3 ? [{ evidence: `${hues.size} default semantic hues together: ${[...hues].join(', ')}` }] : [];
    },
  },
  {
    id: 'mono-hue-alert',
    name: 'Same-hue status box',
    category: 'Color',
    severity: 'warning',
    check(ctx) {
      const fam = (cls) => {
        const m = /(?:bg|border|text)-([a-z]+)-(?:[0-9]{2,3}|\[[^\]]*\])/.exec(cls);
        return m ? m[1] : null;
      };
      let boxes = 0;
      const elRe = /class="([^"]*)"/gi;
      let m;
      while ((m = elRe.exec(ctx.html)) !== null) {
        const bg = new Set();
        const fg = new Set();
        for (const cls of m[1].split(/\s+/)) {
          const f = fam(cls);
          if (!f) continue;
          if (cls.startsWith('bg-')) bg.add(f);
          else fg.add(f);
        }
        for (const f of bg) {
          if (fg.has(f)) { boxes++; break; }
        }
      }
      return boxes >= 2 ? [{ evidence: `${boxes} same-hue status boxes (border/text/bg in one family)` }] : [];
    },
  },
  {
    id: 'atmosphere-gradients',
    name: 'Gradients as atmosphere',
    category: 'Color',
    severity: 'warning',
    check(ctx) {
      const stripes = countProp(ctx.css, 'background-image', /repeating-linear-gradient/i);
      const surfaces = countProp(ctx.css, 'background-image', /linear-gradient/i) + countProp(ctx.css, 'background', /linear-gradient/i);
      const radial = countProp(ctx.css, 'background-image', /radial-gradient/i);
      const hits = [];
      if (stripes > 0) hits.push(`${stripes} repeating-gradient stripes`);
      if (radial > 0 && /(?:body|html|main|\.page|\.app)[^{]*\{[^}]*radial-gradient/i.test(ctx.css)) hits.push('radial page background');
      if (surfaces >= 4) hits.push(`${surfaces} linear-gradient surfaces`);
      return hits.length ? [{ evidence: hits.join('; ') }] : [];
    },
  },
  {
    id: 'glassmorphism',
    name: 'Glassmorphism surfaces',
    category: 'Color',
    severity: 'warning',
    check(ctx) {
      const cssBlur = (ctx.css.match(/backdrop(-filter)?\s*:\s*blur\(/gi) || []).length;
      const classes = (ctx.html.match(/backdrop-blur(?:-sm|-md|-lg|-xl|-2xl|-\[[^\]]*\])?/g) || []).length;
      const n = cssBlur + classes;
      return n >= 1 ? [{ evidence: `${n} backdrop-blur surfaces` }] : [];
    },
  },
  {
    id: 'decorative-strikes',
    name: 'Decorative strikethrough and highlight',
    category: 'Typography',
    severity: 'advisory',
    check(ctx) {
      const tags = (ctx.html.match(/<(?:s|del|mark)(\s[^>]*)?>/gi) || []).length;
      const css = (ctx.css.match(/text-decoration\s*:\s*line-through/gi) || []).length;
      const n = tags + css;
      return n >= 2 ? [{ evidence: `${n} decorative strike/highlight marks` }] : [];
    },
  },
  {
    id: 'flat-type-hierarchy',
    name: 'Flat type hierarchy',
    category: 'Typography',
    severity: 'warning',
    check(ctx) {
      const sizes = [];
      for (const v of prop(ctx.css, 'font-size')) {
        const m = v.match(/(\d+(?:\.\d+)?)(px|rem)/);
        if (!m) continue;
        const px = m[2] === 'rem' ? parseFloat(m[1]) * 16 : parseFloat(m[1]);
        if (px >= 8) sizes.push(px);
      }
      if (sizes.length < 3) return [];
      const min = Math.min(...sizes);
      const max = Math.max(...sizes);
      return max - min <= 6 && max <= 20
        ? [{ evidence: `all sizes within ${(max - min).toFixed(1)}px (${min}px-${max}px)` }]
        : [];
    },
  },
  {
    id: 'invented-stat-row',
    name: 'Invented stat row',
    category: 'Copy',
    severity: 'warning',
    check(ctx) {
      const t = ctx.text;
      const found = [];
      if (/\b\d{2,}k\s*\+/.test(t)) found.push('Nk+ figure');
      if (/\b99(?:\.\d+)?\s*%/.test(t)) found.push('99.x% figure');
      if (/\b24\/7\b|\b24×7\b/.test(t)) found.push('24/7');
      if (/\b\d+\+\s*(developers|users|customers|teams)\b/i.test(t)) found.push('round social proof');
      return found.length >= 2 ? [{ evidence: `stat cliches: ${found.join(', ')}` }] : [];
    },
  },
  {
    id: 'copy-tics',
    name: 'AI copywriting voice',
    category: 'Copy',
    severity: 'advisory',
    check(ctx) {
      const t = ctx.text;
      const tics = [];
      if (/\bSay goodbye to\b/i.test(t)) tics.push('"say goodbye to"');
      if (/\bIt'?s not just\b/i.test(t)) tics.push('"it\'s not just"');
      if (/\bWelcome to the (future|next|new)\b/i.test(t)) tics.push('"welcome to the ..."');
      if (/\bMeet the (new )?[A-Z]/i.test(t)) tics.push('"meet the ..."');
      if (/\b[a-z]+ theater\b/i.test(t)) tics.push('"X theater"');
      return tics.length >= 2 ? [{ evidence: `copy tics: ${tics.join(', ')}` }] : [];
    },
  },
  {
    id: 'star-rating',
    name: 'Decorative star rating',
    category: 'Copy',
    severity: 'advisory',
    check(ctx) {
      const stars = (ctx.text.match(/[★☆⭐]/g) || []).length;
      const text5 = /\b(?:rated\s+)?5(?:\/5|\.0\s*(?:out of\s*5|stars?))\b/i.test(ctx.text);
      return stars >= 5 || text5 ? [{ evidence: `${stars} star glyphs or a 5/5 rating row` }] : [];
    },
  },
  {
    id: 'badge-spam',
    name: 'Badge and pill spam',
    category: 'Components',
    severity: 'warning',
    check(ctx) {
      const elRe = /<([a-z][a-z0-9]*)\b[^>]*class="([^"]*)"/gi;
      let n = 0;
      let m;
      while ((m = elRe.exec(ctx.html)) !== null) {
        if (m[1] === 'img') continue;
        if (/\b(?:rounded-full|badge|pill)\b/.test(m[2])) n++;
      }
      return n >= 4 ? [{ evidence: `${n} pill badges` }] : [];
    },
  },
  {
    id: 'tinted-icon-tile',
    name: 'Icon in a tint of itself',
    category: 'Components',
    severity: 'warning',
    check(ctx) {
      const elRe = /class="([^"]*)"/gi;
      let n = 0;
      let m;
      while ((m = elRe.exec(ctx.html)) !== null) {
        const fams = new Set();
        for (const cls of m[1].split(/\s+/)) {
          const fm = /^bg-([a-z]+)-(?:[0-9]{2,3}|\[[^\]]*\])(?:\/\d+)?$/.exec(cls);
          const tm = /^text-([a-z]+)-(?:[0-9]{2,3}|\[[^\]]*\])$/.exec(cls);
          if (fm) fams.add('bg:' + fm[1]);
          if (tm) fams.add('text:' + tm[1]);
        }
        for (const s of fams) {
          const fam = s.split(':')[1];
          if (fams.has('bg:' + fam) && fams.has('text:' + fam)) { n++; break; }
        }
      }
      return n >= 3 ? [{ evidence: `${n} icons in tinted containers` }] : [];
    },
  },
  {
    id: 'springy-hover',
    name: 'Springy scale hover',
    category: 'Motion',
    severity: 'warning',
    check(ctx) {
      const classes = (ctx.html.match(/hover:(?:scale-105|scale-110|-(?:translate-y-1|translate-y-2)|scale-\[[^\s"']*\]?)/g) || []).length;
      const transitionAll = (ctx.css.match(/transition[^;}]*\ball\b/gi) || []).length;
      const scaleHover = (ctx.css.match(/:hover\s*\{[^}]*transform\s*:\s*(?:scale\(1\.0[2-9]|translateY\(-\d+px\))/gi) || []).length;
      return classes >= 3 || (transitionAll > 0 && scaleHover > 0)
        ? [{ evidence: `${classes} scale-on-hover interactions, ${transitionAll} transition:all declarations` }]
        : [];
    },
  },
  {
    id: 'all-caps-grid',
    name: 'All-caps label grid',
    category: 'Layout',
    severity: 'advisory',
    check(ctx) {
      const labels = ctx.text.match(/\b[A-Z]{3,}\b/g) || [];
      return labels.length >= 6 ? [{ evidence: `${labels.length} all-caps labels` }] : [];
    },
  },
  {
    id: 'tasteful-terminal',
    name: 'Mono chrome everywhere',
    category: 'Typography',
    severity: 'warning',
    check(ctx) {
      const monoCss = (ctx.css.match(/(?:font-family\s*:[^;}]*\b(?:monospace|ui-monospace|SFMono|Menlo|JetBrains Mono|Fira Code)\b)/gi) || []).length;
      const monoCls = (ctx.html.match(/\bfont-mono\b/g) || []).length;
      const n = monoCss + monoCls;
      const nearBlack = /background(?:-color)?\s*:\s*#(?:0[0-9a-f]{5}|1[0-4][0-9a-f]{4})\b/i.test(ctx.css);
      return n >= 6 && nearBlack ? [{ evidence: `${n} mono declarations on a near-black surface` }] : [];
    },
  },
  {
    id: 'editorial-dashboard',
    name: 'Editorial dressing on an operational surface',
    category: 'Typography',
    severity: 'advisory',
    check(ctx) {
      const greeting = /\bGood (morning|afternoon|evening)\b/i.test(ctx.text);
      const serif = /font-family[^;}]*\b(?:serif|Fraunces|Playfair|Lora|Cormorant|Newsreader|Recoleta)\b/i.test(ctx.css);
      return greeting && serif ? [{ evidence: 'serif greeting on an operational surface' }] : [];
    },
  },
  {
    id: 'equal-card-grid',
    name: 'Equal-weight card grid',
    category: 'Layout',
    severity: 'warning',
    check(ctx) {
      const grid = /grid-cols-3|repeat\(\s*3\s*,\s*1fr\)|grid-template-columns[^;}]*repeat\(\s*3\s*,/i.test(ctx.css + ' ' + ctx.html);
      const tileRe = /<(svg|img)[^>]*>[\s\S]{0,300}?<h([1-6])/gi;
      let tiles = 0;
      let m;
      while ((m = tileRe.exec(ctx.html)) !== null) tiles++;
      return grid && tiles >= 3 ? [{ evidence: '3+ equal cards in a 3-column grid' }] : [];
    },
  },
];

// ---------------------------------------------------------------------------
// Runner
// ---------------------------------------------------------------------------

function runRules(ctx) {
  const findings = [];
  for (const rule of RULES) {
    try {
      const hits = rule.check(ctx);
      for (const hit of hits) {
        findings.push({
          id: rule.id,
          name: rule.name,
          category: rule.category,
          severity: rule.severity,
          evidence: hit.evidence,
        });
      }
    } catch {
      // a rule must never take down the run
    }
  }
  return findings;
}

function summarize(findings) {
  const bySeverity = { error: 0, warning: 0, advisory: 0 };
  const byCategory = {};
  for (const f of findings) {
    bySeverity[f.severity]++;
    byCategory[f.category] = (byCategory[f.category] || 0) + 1;
  }
  return { bySeverity, byCategory, total: findings.length };
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);
  const json = args.includes('--json');
  const target = args.find((a) => !a.startsWith('--'));

  if (!target) {
    console.error('usage: node scripts/detector.mjs <file|dir|url> [--json]');
    process.exit(2);
  }

  const sources = await loadInput(target);
  const allFindings = [];
  for (const { file, html } of sources) {
    const text = stripTags(html);
    const ctx = buildContext({ html, text });
    const findings = runRules(ctx).map((f) => ({ ...f, file }));
    allFindings.push(...findings);
  }

  const summary = summarize(allFindings);

  if (json) {
    console.log(JSON.stringify({ summary, findings: allFindings }, null, 2));
  } else {
    for (const f of allFindings) {
      console.log(`[${f.severity.toUpperCase()}] ${f.file} ${f.name}: ${f.evidence}`);
    }
    console.log(
      `\n${summary.total} findings: ${summary.bySeverity.error} error, ${summary.bySeverity.warning} warning, ${summary.bySeverity.advisory} advisory`
    );
    for (const [cat, n] of Object.entries(summary.byCategory)) console.log(`  ${cat}: ${n}`);
  }

  process.exit(summary.bySeverity.error > 0 ? 1 : 0);
}

const isMain = process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;
if (isMain) main();
