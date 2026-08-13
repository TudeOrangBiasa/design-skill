#!/usr/bin/env node
/**
 * validate-evals.mjs — machine-validate the eval suite's integrity.
 *
 * Reads evals/evals.json (the ~50KB data module behind the API-budget eval
 * runs) and asserts the contract before any harness spend:
 *   (a) every eval has a non-empty, unique id, a name, a prompt, and >= 1
 *       non-empty assertion;
 *   (b) every files[] entry exists on disk (relative to the repo root);
 *   (c) expected_output, when present, is a string.
 *
 * Node builtins only. Exit 0 = suite consistent, 1 = problems printed.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const EVALS_PATH = path.join(ROOT, 'evals', 'evals.json');

const errors = [];

function fail(msg) {
  errors.push(msg);
}

const doc = JSON.parse(fs.readFileSync(EVALS_PATH, 'utf8'));
const evals = doc.evals;

if (typeof doc.skill_name !== 'string' || !doc.skill_name) {
  fail('evals.json: missing skill_name');
}
if (!Array.isArray(evals) || evals.length === 0) {
  fail('evals.json: evals must be a non-empty array');
  console.error('validate-evals: eval suite is inconsistent:');
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

const seen = new Set();
for (const e of evals) {
  const where = `eval "${e.id ?? '<no id>'}"`;
  if (typeof e.id !== 'string' || !e.id) {
    fail(`${where}: missing id`);
  } else {
    if (seen.has(e.id)) fail(`duplicate eval id "${e.id}"`);
    seen.add(e.id);
  }
  if (typeof e.name !== 'string' || !e.name) fail(`${where}: missing name`);
  if (typeof e.prompt !== 'string' || !e.prompt.trim()) fail(`${where}: missing prompt`);
  if (!Array.isArray(e.assertions) || e.assertions.length === 0) {
    fail(`${where}: needs at least one assertion`);
  } else {
    for (const a of e.assertions) {
      if (typeof a !== 'string' || !a.trim()) fail(`${where}: empty assertion`);
    }
  }
  if ('expected_output' in e && typeof e.expected_output !== 'string') {
    fail(`${where}: expected_output must be a string`);
  }
  if ('files' in e) {
    if (!Array.isArray(e.files)) {
      fail(`${where}: files must be an array`);
    } else {
      for (const f of e.files) {
        if (typeof f !== 'string' || !f) {
          fail(`${where}: files entry must be a non-empty string`);
        } else if (!fs.existsSync(path.join(ROOT, f))) {
          fail(`${where}: files entry "${f}" does not exist`);
        }
      }
    }
  }
}

if (errors.length > 0) {
  console.error('validate-evals: eval suite is inconsistent:');
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`validate-evals: OK — ${evals.length} evals, unique ids, all fixture paths resolve`);
