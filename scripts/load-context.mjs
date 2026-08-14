/**
 * Shared context loader for every design command that needs to know
 * "who is this for" and "what does this look like".
 *
 * Input: project root (process.cwd()).
 *
 * Output (JSON to stdout):
 *   {
 *     hasProduct: boolean,        // PRODUCT.md found
 *     product: string | null,     // PRODUCT.md contents
 *     productPath: string | null, // relative path
 *     hasDesign: boolean,         // DESIGN.md found
 *     design: string | null,      // DESIGN.md contents
 *     designPath: string | null,
 *     hasBrief: boolean,          // legacy brief.md found
 *     brief: string | null,       // brief.md contents
 *     briefPath: string | null,
 *     contextDir: string,         // absolute path of the directory the files were found in
 *   }
 *
 * READ-ONLY. This command never creates, renames, or writes files.
 *
 * Filename matching is case-insensitive for PRODUCT.md and DESIGN.md. The
 * Google DESIGN.md convention is uppercase at repo root; Kiro-style and
 * lowercase variants are also matched so users don't get punished for case.
 *
 * Lookup directory resolution (first match wins):
 *   1. process.env.IMPECCABLE_CONTEXT_DIR (absolute or relative to cwd)
 *   2. cwd, if PRODUCT.md / DESIGN.md is there (back-compat)
 *   3. Auto-fallback subdirectories of cwd: .agents/context/, then docs/
 *   4. cwd as a default "no context found" location
 */

import fs from 'node:fs';
import path from 'node:path';

const PRODUCT_NAMES = ['PRODUCT.md', 'Product.md', 'product.md'];
const DESIGN_NAMES = ['DESIGN.md', 'Design.md', 'design.md'];
const BRIEF_NAMES = ['brief.md'];
const FALLBACK_DIRS = ['.agents/context', 'docs'];

/**
 * Resolve the directory that holds PRODUCT.md / DESIGN.md for
 * this project. Exported so other scripts (e.g. live-server.mjs) can read the
 * design files from the same location the loader uses.
 */
export function resolveContextDir(cwd = process.cwd()) {
  // 1. Explicit override
  const envDir = process.env.IMPECCABLE_CONTEXT_DIR;
  if (envDir && envDir.trim()) {
    const trimmed = envDir.trim();
    return path.isAbsolute(trimmed) ? trimmed : path.resolve(cwd, trimmed);
  }

  // 2. cwd wins if any canonical file is there.
  if (firstExisting(cwd, [...PRODUCT_NAMES, ...DESIGN_NAMES])) {
    return cwd;
  }

  // 3. Auto-fallback subdirs. Match if PRODUCT.md or DESIGN.md is present;
  //    legacy `.design.md` does not pull the lookup into a fallback dir.
  for (const rel of FALLBACK_DIRS) {
    const candidate = path.resolve(cwd, rel);
    if (firstExisting(candidate, [...PRODUCT_NAMES, ...DESIGN_NAMES])) {
      return candidate;
    }
  }

  // 4. Nothing found — keep the historical "default to cwd" behaviour so the
  //    caller's `hasProduct === false` branch still fires the same way.
  return cwd;
}

export function loadContext(cwd = process.cwd()) {
  const contextDir = resolveContextDir(cwd);

  // 1. Look for PRODUCT.md (case-insensitive) in the resolved dir
  const productPath = firstExisting(contextDir, PRODUCT_NAMES);

  // 2. DESIGN.md (case-insensitive)
  const designPath = firstExisting(contextDir, DESIGN_NAMES);

  // 3. Legacy brief.md (case-insensitive)
  const briefPath = firstExisting(contextDir, BRIEF_NAMES);

  const product = productPath ? safeRead(productPath) : null;
  const design = designPath ? safeRead(designPath) : null;
  const brief = briefPath ? safeRead(briefPath) : null;

  return {
    hasProduct: !!product,
    product,
    productPath: productPath ? path.relative(cwd, productPath) : null,
    hasDesign: !!design,
    design,
    designPath: designPath ? path.relative(cwd, designPath) : null,
    hasBrief: !!brief,
    brief,
    briefPath: briefPath ? path.relative(cwd, briefPath) : null,
    contextDir,
  };
}

function firstExisting(dir, names) {
  for (const name of names) {
    const abs = path.join(dir, name);
    if (fs.existsSync(abs)) return abs;
  }
  return null;
}

function safeRead(p) {
  try { return fs.readFileSync(p, 'utf-8'); } catch { return null; }
}

// ---------------------------------------------------------------------------
// CLI mode — print the context as JSON
// ---------------------------------------------------------------------------

function cli() {
  const result = loadContext(process.cwd());
  console.log(JSON.stringify(result, null, 2));
}

const _running = process.argv[1];
if (_running?.endsWith('load-context.mjs') || _running?.endsWith('load-context.mjs/')) {
  cli();
}
