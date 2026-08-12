#!/usr/bin/env node
/**
 * design-system-check.mjs - personalized drift detection.
 *
 * Reads a DESIGN.md (google-labs-code/design.md spec) and a target (HTML file
 * or directory), and reports target tokens that fall OUTSIDE the documented
 * design system: colors, font families, and corner radii.
 *
 * Usage:
 *   node design-system-check.mjs <DESIGN.md> <target> [--json]
 *
 * Exit codes: 0 = no drift, 1 = drift found, 2 = usage error.
 * Deterministic; no LLM. The 42-rule detector registry is untouched - this is
 * a separate, DESIGN.md-aware pass.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDesignMd } from './design-parser.mjs';

const HEX_RE = /#[0-9a-fA-F]{3,8}\b/g;
const OKLCH_RE = /oklch\([^)]+\)/gi;
const RGBA_RE = /rgba?\([^)]+\)/gi;
const PX_RE = /(\d+(?:\.\d+)?)px/g;

function collectColors(text) {
  return [...new Set([...text.matchAll(HEX_RE), ...text.matchAll(OKLCH_RE), ...text.matchAll(RGBA_RE)].map((m) => m[0].toLowerCase()))];
}

function collectFontFamilies(css) {
  const out = new Set();
  const re = /font-family\s*:\s*([^;}{]+)/gi;
  let m;
  while ((m = re.exec(css)) !== null) {
    for (const fam of m[1].split(',')) {
      const clean = fam.trim().replace(/^['"]|['"]$/g, '');
      if (clean && !/^(serif|sans-serif|monospace|system-ui|cursive|fantasy)$/i.test(clean)) {
        out.add(clean.toLowerCase());
      }
    }
  }
  return out;
}

function collectRadii(css) {
  const out = new Set();
  const re = /border-radius\s*:\s*([^;}{]+)/gi;
  let m;
  while ((m = re.exec(css)) !== null) {
    for (const v of m[1].split(/\s+/)) {
      const mm = v.match(/^(\d+(?:\.\d+)?)px$/);
      if (mm) out.add(mm[1]);
    }
  }
  return out;
}

function documentedColors(model, raw) {
  const set = new Set();
  const walk = (v) => {
    if (typeof v !== 'string') return;
    collectColors(v).forEach((c) => set.add(c));
  };
  for (const group of model.colors?.groups ?? []) {
    for (const c of group.colors ?? []) {
      walk(c.value);
      (c.valueRange ?? []).forEach(walk);
    }
  }
  collectColors(raw).forEach((c) => set.add(c)); // prose + frontmatter literals
  return set;
}

function documentedFonts(model) {
  const set = new Set();
  for (const role of Object.values(model.typography?.fonts ?? {})) {
    const fam = (role.family ?? '').trim().replace(/^['"]|['"]$/g, '');
    if (fam) set.add(fam.toLowerCase());
    if (role.fallback) {
      for (const f of role.fallback.split(',')) {
        const clean = f.trim().replace(/^['"]|['"]$/g, '').toLowerCase();
        if (clean) set.add(clean);
      }
    }
  }
  return set;
}

function documentedRadii(model) {
  const set = new Set();
  for (const s of model.shapes?.shapes ?? []) {
    for (const m of s.value?.matchAll(PX_RE) ?? []) set.add(m[1]);
  }
  return set;
}

function readTarget(target) {
  const files = [];
  const stat = fs.statSync(target);
  if (stat.isFile()) files.push(target);
  else {
    const walk = (dir) => {
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) walk(p);
        else if (/\.(html?|css)$/i.test(e.name)) files.push(p);
      }
    };
    walk(target);
  }
  return files;
}

function run(designPath, target) {
  let md;
  try {
    md = fs.readFileSync(designPath, 'utf8');
  } catch (err) {
    console.error(`design-system-check: cannot read DESIGN.md: ${err.message}`);
    process.exit(2);
  }
  const model = parseDesignMd(md);
  const docColors = documentedColors(model, md);
  const docFonts = documentedFonts(model);
  const docRadii = documentedRadii(model);

  const targetText = readTarget(target).map((f) => fs.readFileSync(f, 'utf8')).join('\n');
  const usedColors = collectColors(targetText);
  const usedFonts = collectFontFamilies(targetText);
  const usedRadii = collectRadii(targetText);

  const findings = [];
  const offColors = usedColors.filter((c) => !docColors.has(c));
  const offFonts = [...usedFonts].filter((f) => !docFonts.has(f));
  const offRadii = [...usedRadii].filter((r) => !docRadii.has(r));
  if (offColors.length) findings.push(`colors outside DESIGN.md: ${offColors.slice(0, 8).join(', ')}`);
  if (offFonts.length) findings.push(`fonts outside DESIGN.md: ${offFonts.slice(0, 6).join(', ')}`);
  if (offRadii.length) findings.push(`radii outside DESIGN.md: ${offRadii.slice(0, 6).join(', ')}px`);

  if (findings.length === 0) {
    console.log(`design-system-check: ${target} conforms to DESIGN.md (colors ${docColors.size}, fonts ${docFonts.size}, radii ${docRadii.size})`);
    process.exit(0);
  }
  console.error(`design-system-check: ${findings.length} drift finding(s):`);
  for (const f of findings) console.error(`  - ${f}`);
  process.exit(1);
}

const [, , designPath, target, flag] = process.argv;
if (!designPath || !target || designPath === '--help') {
  console.error('usage: node design-system-check.mjs <DESIGN.md> <target> [--json]');
  process.exit(2);
}
run(designPath, target);
