/**
 * Copy rules for the deterministic design-smell detector.
 * Split out of scripts/detector.mjs during the rule-registry split.
 */
import { prop, countProp, attr, stripTags, EMOJI_RE, BUZZWORDS } from './context.mjs';

export const RULES = [

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
];
