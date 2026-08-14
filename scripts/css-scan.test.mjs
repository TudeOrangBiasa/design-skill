/**
 * Tests for the shared CSS scanning seam (scripts/css-scan.mjs).
 * Run: node --test scripts/css-scan.test.mjs
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { prop, countProp, splitBlocks, collectColors, collectFontFamilies, collectRadii } from './css-scan.mjs';

test('prop extracts name:value declarations', () => {
  const css = 'body { font-size: 1rem; color: #333 } p { font-size: 14px; }';
  assert.deepEqual(prop(css, 'font-size'), ['1rem', '14px']);
  assert.deepEqual(prop(css, 'color'), ['#333']);
  assert.deepEqual(prop(css, 'missing'), []);
});

test('countProp counts values matching a pattern', () => {
  const css = '.a { opacity: 0 } .b { opacity: 1 } .c { opacity: 0.5 }';
  assert.equal(countProp(css, 'opacity', /0(\.0+)?\b/), 2);
});

test('splitBlocks returns [selector, body] pairs', () => {
  const css = 'a { color: red } b, c { margin: 0; }';
  const blocks = splitBlocks(css);
  assert.equal(blocks.length, 2);
  assert.equal(blocks[0][0].trim(), 'a');
  assert.equal(blocks[0][1], ' color: red ');
  assert.equal(blocks[1][0].trim(), 'b, c');
});

test('collectColors dedupes and lowercases literals', () => {
  // Order: all HEX matches first, then OKLCH, then RGBA (three regex passes).
  assert.deepEqual(collectColors('color:#AABBCC; color:#aabbcc; rgb(1,2,3); oklch(50% 0.1 200)'), [
    '#aabbcc',
    'oklch(50% 0.1 200)',
    'rgb(1,2,3)',
  ]);
});

test('collectFontFamilies strips quotes and skips generic families', () => {
  // -apple-system is a platform alias, collected like any non-generic family.
  const css = 'body { font-family: "Public Sans", -apple-system, sans-serif } h1 { font-family: Fraunces }';
  assert.deepEqual([...collectFontFamilies(css)].sort(), ['-apple-system', 'fraunces', 'public sans']);
});

test('collectRadii collects px values', () => {
  const css = '.a { border-radius: 12px } .b { border-radius: 4px 8px } .c { border-radius: 50% }';
  assert.deepEqual([...collectRadii(css)].sort(), ['12', '4', '8']);
});
