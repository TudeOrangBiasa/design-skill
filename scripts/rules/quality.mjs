/**
 * Quality rules for the deterministic design-smell detector.
 * Split out of scripts/detector.mjs during the rule-registry split.
 */
import { prop, countProp, attr, stripTags, EMOJI_RE, BUZZWORDS } from './context.mjs';

export const RULES = [

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
    id: 'skipped-heading-level',
    name: 'Skipped heading level',
    category: 'Quality',
    severity: 'warning',
    check(ctx) {
      const levels = ctx.headings.map((h) => h.level);
      for (let i = 1; i < levels.length; i++) {
        if (levels[i] > levels[i - 1] + 1) {
          return [{ evidence: `heading level skipped h${levels[i - 1]} -> h${levels[i]}; screen readers rely on the outline` }];
        }
      }
      return [];
    },
  },
];
