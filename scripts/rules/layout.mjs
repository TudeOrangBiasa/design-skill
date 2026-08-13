/**
 * Layout rules for the deterministic design-smell detector.
 * Split out of scripts/detector.mjs during the rule-registry split.
 */
import { prop, countProp, splitBlocks } from '../css-scan.mjs';
import { attr, stripTags, EMOJI_RE, BUZZWORDS } from './context.mjs';

export const RULES = [

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
  {
    id: 'fixed-width-overflow',
    name: 'Fixed pixel width risks viewport overflow',
    category: 'Layout',
    severity: 'warning',
    check(ctx) {
      const m = ctx.css.match(/(?:min-)?width\s*:\s*(\d{4,})px/);
      return m ? [{ evidence: `fixed width ${m[1]}px risks horizontal overflow below 1280px (locked breakpoints 375-1536)` }] : [];
    },
  },
  {
    id: 'crop-risk-container',
    name: 'Fixed height with overflow hidden can crop content',
    category: 'Layout',
    severity: 'warning',
    check(ctx) {
      const blocks = splitBlocks(ctx.css);
      const hits = blocks
        .filter((b) => /overflow\s*:\s*hidden/.test(b[1]) && /(?:max-)?height\s*:\s*\d+px/.test(b[1]))
        .map((b) => `"${b[0].trim().slice(0, 40)}"`);
      return hits.length ? [{ evidence: `fixed height + overflow hidden can crop text: ${hits.slice(0, 3).join(', ')}` }] : [];
    },
  },
  {
    id: 'absolute-no-inset',
    name: 'Absolutely positioned element without an inset',
    category: 'Layout',
    severity: 'warning',
    check(ctx) {
      const blocks = splitBlocks(ctx.css);
      const hits = blocks
        .filter((b) => /position\s*:\s*(?:absolute|fixed)/.test(b[1]) && !/(?:^|;)\s*(?:top|left|right|bottom|inset)\s*:/.test(b[1]))
        .map((b) => `"${b[0].trim().slice(0, 40)}"`);
      return hits.length ? [{ evidence: `absolute/fixed without an inset - position undefined: ${hits.slice(0, 3).join(', ')}` }] : [];
    },
  },
  {
    id: 'negative-margin-overlap',
    name: 'Negative margin forces overlap',
    category: 'Layout',
    severity: 'warning',
    check(ctx) {
      const m = ctx.css.match(/margin(?:-[a-z]+)?\s*:\s*(-\d[\w.]*)/);
      return m ? [{ evidence: `negative margin (${m[1]}) forces element overlap - use the grid frame instead` }] : [];
    },
  },
  {
    id: 'kpi-monument',
    name: 'KPI monument: big figure, small label, supporting stats',
    category: 'Layout',
    severity: 'warning',
    check(ctx) {
      const big = /font-size\s*:\s*(?:[2-9]|\d{2,})(?:\.\d+)?\s*(?:rem|px)/i.test(ctx.css);
      const figs = (ctx.text.match(/\$\d+(?:\.\d+)?[kKmM]?\b|\b\d+(?:\.\d+)?[kKmM]\b/g) || []).length;
      return big && figs >= 2
        ? [{ evidence: `${figs} KPI figures with a big display size - hero-metric cluster (big number + label + stat row); lead with the delta, a table, or a decision instead` }] : [];
    },
  },
];
