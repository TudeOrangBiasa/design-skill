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
      const overused = ['Inter', 'Roboto', 'Fraunces', 'Geist', 'Plus Jakarta Sans', 'Space Grotesk'];
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
