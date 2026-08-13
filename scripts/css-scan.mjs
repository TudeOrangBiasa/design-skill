/**
 * css-scan.mjs - shared CSS scanning seam for the design-skill scripts.
 *
 * One home for the CSS-extraction vocabulary used by two consumers:
 * the deterministic detector (scripts/rules/*, via context.mjs) and the
 * DESIGN.md drift check (scripts/design-system-check.mjs). If a scanning
 * bug appears, one fix covers both.
 *
 * Dependency-free: Node >= 18.
 */

/** Extract `name: value` declarations from CSS text. */
export function prop(css, name) {
  const re = new RegExp(`${name}\\s*:\\s*([^;}{]+)`, 'gi');
  const vals = [];
  let m;
  while ((m = re.exec(css)) !== null) vals.push(m[1].trim());
  return vals;
}

/** Count `name` declarations whose value matches `pattern`. */
export function countProp(css, name, pattern) {
  const vals = prop(css, name);
  return vals.filter((v) => pattern.test(v)).length;
}

/** Split CSS text into [selector, declarations] rule blocks. */
export function splitBlocks(css) {
  const blocks = [];
  const re = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = re.exec(css)) !== null) blocks.push([m[1], m[2]]);
  return blocks;
}

const HEX_RE = /#[0-9a-fA-F]{3,8}\b/g;
const OKLCH_RE = /oklch\([^)]+\)/gi;
const RGBA_RE = /rgba?\([^)]+\)/gi;

/** Collect unique color literals (hex, oklch, rgb/a) from text, lowercased. */
export function collectColors(text) {
  return [...new Set([...text.matchAll(HEX_RE), ...text.matchAll(OKLCH_RE), ...text.matchAll(RGBA_RE)].map((m) => m[0].toLowerCase()))];
}

/** Collect non-generic font family names from CSS text. */
export function collectFontFamilies(css) {
  const out = new Set();
  for (const v of prop(css, 'font-family')) {
    for (const fam of v.split(',')) {
      const clean = fam.trim().replace(/^['"]|['"]$/g, '');
      if (clean && !/^(serif|sans-serif|monospace|system-ui|cursive|fantasy)$/i.test(clean)) {
        out.add(clean.toLowerCase());
      }
    }
  }
  return out;
}

/** Collect px corner radii values from CSS text. */
export function collectRadii(css) {
  const out = new Set();
  for (const v of prop(css, 'border-radius')) {
    for (const part of v.split(/\s+/)) {
      const mm = part.match(/^(\d+(?:\.\d+)?)px$/);
      if (mm) out.add(mm[1]);
    }
  }
  return out;
}
