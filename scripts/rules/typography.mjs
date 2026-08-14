/**
 * Typography rules for the deterministic design-smell detector.
 * Split out of scripts/detector.mjs during the rule-registry split.
 */
import { prop, countProp } from '../css-scan.mjs';
import { attr, stripTags, EMOJI_RE, BUZZWORDS } from './context.mjs';

export const RULES = [

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
    id: 'justified-text',
    name: 'Justified text without hyphenation',
    category: 'Typography',
    severity: 'warning',
    check(ctx) {
      return prop(ctx.css, 'text-align').some((v) => /justify/i.test(v))
        ? [{ evidence: 'justified text creates rivers of white; use text-align: left or hyphens: auto' }] : [];
    },
  },
  {
    id: 'tight-line-height',
    name: 'Tight line height',
    category: 'Typography',
    severity: 'warning',
    check(ctx) {
      const m = ctx.css.match(/line-height\s*:\s*(\d+(?:\.\d+)?)\b/);
      return m && parseFloat(m[1]) < 1.3
        ? [{ evidence: `line-height ${m[1]} is too tight for body text; use 1.5-1.7` }] : [];
    },
  },
  {
    id: 'tiny-body-text',
    name: 'Tiny body text',
    category: 'Typography',
    severity: 'warning',
    check(ctx) {
      const m = ctx.css.match(/font-size\s*:\s*(9|10|11)px/);
      return m ? [{ evidence: `${m[1]}px body text is below 12px; use at least 14px` }] : [];
    },
  },
  {
    id: 'wide-body-tracking',
    name: 'Wide letter spacing on body text',
    category: 'Typography',
    severity: 'warning',
    check(ctx) {
      const m = ctx.css.match(/letter-spacing\s*:\s*(0\.0[5-9])em/);
      return m ? [{ evidence: `letter-spacing ${m[1]}em disrupts word grouping; reserve wide tracking for short uppercase labels` }] : [];
    },
  },
];
