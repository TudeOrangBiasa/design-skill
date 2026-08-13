/**
 * Shared context extraction + helper functions for the deterministic
 * design-smell detector. Moved verbatim from scripts/detector.mjs during
 * the rule-registry split (scripts/rules/*); rules import from here.
 */
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

export { stripTags, collectTags, attr, inlineStyles, cssBlocks, prop, countProp, EMOJI_RE, BUZZWORDS, buildContext };
