/**
 * Motion rules for the deterministic design-smell detector.
 * Split out of scripts/detector.mjs during the rule-registry split.
 */
import { prop, countProp } from '../css-scan.mjs';
import { attr, stripTags, EMOJI_RE, BUZZWORDS } from './context.mjs';

export const RULES = [

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
];
