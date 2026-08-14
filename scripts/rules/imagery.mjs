/**
 * Imagery rules for the deterministic design-smell detector.
 * Split out of scripts/detector.mjs during the rule-registry split.
 */
import { attr, stripTags, EMOJI_RE, BUZZWORDS } from './context.mjs';

export const RULES = [

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
];
