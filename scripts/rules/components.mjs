/**
 * Components rules for the deterministic design-smell detector.
 * Split out of scripts/detector.mjs during the rule-registry split.
 */
import { prop, countProp, attr, stripTags, EMOJI_RE, BUZZWORDS } from './context.mjs';

export const RULES = [

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
];
