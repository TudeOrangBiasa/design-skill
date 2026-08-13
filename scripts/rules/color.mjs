/**
 * Color rules for the deterministic design-smell detector.
 * Split out of scripts/detector.mjs during the rule-registry split.
 */
import { prop, countProp } from '../css-scan.mjs';
import { attr, stripTags, EMOJI_RE, BUZZWORDS } from './context.mjs';

export const RULES = [

  {
    id: 'gradient-text',
    name: 'Gradient text',
    category: 'Color',
    severity: 'error',
    check(ctx) {
      // Only background-clip:text is gradient text. Gradient backgrounds are a
      // separate tell, covered by atmosphere-gradients (warning), ai-palette,
      // and radial-halo; counting them here made a legibility error out of a
      // surface choice.
      const clip = countProp(ctx.css, 'background-clip', /text/i);
      return clip > 0 ? [{ evidence: `${clip} background-clip:text declarations` }] : [];
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
    id: 'repeating-gradient-stripes',
    name: 'Repeating-gradient stripes',
    category: 'Color',
    severity: 'warning',
    check(ctx) {
      return /repeating-linear-gradient/.test(ctx.css)
        ? [{ evidence: 'repeating-gradient stripes as decoration - use a deliberate texture or leave the surface plain' }] : [];
    },
  },
];
