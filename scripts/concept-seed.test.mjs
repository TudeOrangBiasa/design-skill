/**
 * Tests for the concept-seed dice (scripts/concept-seed.mjs).
 * Run: node --test scripts/concept-seed.test.mjs
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT = path.join(path.dirname(fileURLToPath(import.meta.url)), 'concept-seed.mjs');
const DIRS = 'A|B|C|D|E|F|G';

function run(args) {
  return execFileSync(process.execPath, [SCRIPT, ...args], { encoding: 'utf8' });
}

test('same seed picks the same direction', () => {
  const a = run(['--directions', DIRS, '--seed', '42', '--json']);
  const b = run(['--directions', DIRS, '--seed', '42', '--json']);
  assert.equal(JSON.parse(a).index, JSON.parse(b).index);
  assert.equal(JSON.parse(a).direction, JSON.parse(b).direction);
});

test('different seeds reach different indices across the range', () => {
  const seen = new Set();
  for (let s = 1; s <= 400; s++) {
    const out = JSON.parse(run(['--directions', DIRS, '--seed', String(s), '--json']));
    seen.add(out.index);
  }
  assert.deepEqual([...seen].sort((x, y) => x - y), [1, 2, 3, 4, 5, 6, 7]);
});

test('--roll returns a valid 1-based index', () => {
  const out = JSON.parse(run(['--roll', '7', '--seed', '7', '--json']));
  assert.ok(out.index >= 1 && out.index <= 7);
  assert.equal(out.count, 7);
});

test('--list echoes the directions unchanged', () => {
  const out = run(['--list', '--directions', DIRS]);
  const lines = out.trim().split('\n');
  assert.equal(lines.length, 7);
  assert.equal(lines[0], '1. A');
  assert.equal(lines[6], '7. G');
});
