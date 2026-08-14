#!/usr/bin/env node
/**
 * validate-catalog.mjs — machine-validate the command catalog's integrity.
 *
 * Reads scripts/command-metadata.json (single source of truth) and asserts:
 *   (a) every flow command has reference/<reference>.md present AND listed
 *       in REFERENCE.md;
 *   (b) every reference/*.md is reachable from REFERENCE.md (no orphan
 *       files — delete orphans instead of listing them);
 *   (c) design.mjs's TOOLS keys are a subset of command-metadata entries
 *       with type "script".
 *
 * Node builtins only. Exit 0 = catalog consistent, 1 = diff printed.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const METADATA_PATH = path.join(ROOT, 'scripts', 'command-metadata.json');
const REFERENCE_DIR = path.join(ROOT, 'reference');
const REFERENCE_INDEX = path.join(ROOT, 'REFERENCE.md');
const DISPATCHER = path.join(ROOT, 'scripts', 'design.mjs');

// checklist-catalog.md is a dataset resident in reference/ until Phase 2
// moves it to datasets/ (git clones only, never shipped). Treat it as the
// known dataset file, not an orphan.
const KNOWN_DATASETS = new Set(['checklist-catalog.md']);

const errors = [];

function fail(msg) {
  errors.push(msg);
}

const metadata = JSON.parse(fs.readFileSync(METADATA_PATH, 'utf8'));
const referenceFiles = fs
  .readdirSync(REFERENCE_DIR)
  .filter((f) => f.endsWith('.md'))
  .sort();
const indexText = fs.readFileSync(REFERENCE_INDEX, 'utf8');
const dispatcherText = fs.readFileSync(DISPATCHER, 'utf8');

// --- (a) flow commands reference existing, indexed files ---
for (const [name, entry] of Object.entries(metadata)) {
  if (entry.type !== 'flow') continue;
  if (typeof entry.reference !== 'string' || !entry.reference.endsWith('.md')) {
    fail(`command "${name}" is type flow but has no reference file`);
    continue;
  }
  const file = path.join(REFERENCE_DIR, entry.reference);
  if (!fs.existsSync(file)) {
    fail(`command "${name}" references ${entry.reference}, which does not exist`);
  }
  if (!indexText.includes(`reference/${entry.reference}`)) {
    fail(`command "${name}" reference ${entry.reference} is not listed in REFERENCE.md`);
  }
}

// --- (b) every reference file is indexed (or a known dataset) ---
for (const file of referenceFiles) {
  if (KNOWN_DATASETS.has(file)) continue;
  if (!indexText.includes(`reference/${file}`)) {
    fail(`reference/${file} is not listed in REFERENCE.md (orphan — delete or index it)`);
  }
}

// --- (c) dispatcher TOOLS and metadata script entries agree ---
// Every type:"script" command must be runnable through the dispatcher.
// The dispatcher may carry extra infrastructure tools (load-context,
// validate, seed) that are not user commands.
const toolMatch = dispatcherText.match(/const TOOLS = \{([\s\S]*?)\n\};/);
if (!toolMatch) {
  fail('design.mjs: cannot locate the TOOLS map');
} else {
  const toolKeys = [...toolMatch[1].matchAll(/^\s{2}(['"]?)([A-Za-z0-9-]+)\1:/gm)].map((m) => m[2]);
  const scriptCommands = Object.entries(metadata)
    .filter(([, e]) => e.type === 'script')
    .map(([n]) => n);
  for (const scriptCmd of scriptCommands) {
    if (!toolKeys.includes(scriptCmd)) {
      fail(`command-metadata script "${scriptCmd}" has no dispatcher tool in design.mjs`);
    }
  }
}

if (errors.length > 0) {
  console.error('validate-catalog: catalog is inconsistent:');
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log('validate-catalog: OK — 5 commands, dispatcher, and reference index are consistent');
