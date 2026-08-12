import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = path.join(ROOT, 'scripts', 'design-system-check.mjs');
const FIX = path.join(ROOT, 'scripts', 'fixtures', 'design-system');

function run(args) {
  return spawnSync(process.execPath, [CHECK, ...args], { encoding: 'utf8' });
}

test('design-system-check: flags tokens outside DESIGN.md', () => {
  const r = run([path.join(FIX, 'design.md'), path.join(FIX, 'drift.html')]);
  assert.equal(r.status, 1, r.stderr);
  assert.match(r.stderr, /colors outside DESIGN\.md: #6366f1/);
  assert.match(r.stderr, /fonts outside DESIGN\.md: inter/);
  assert.match(r.stderr, /radii outside DESIGN\.md: 999px/);
});

test('design-system-check: compliant target exits 0', () => {
  const r = run([path.join(FIX, 'design.md'), path.join(FIX, 'compliant.html')]);
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /conforms to DESIGN\.md/);
});

test('design-system-check: usage error without DESIGN.md', () => {
  const r = run([]);
  assert.equal(r.status, 2);
});
