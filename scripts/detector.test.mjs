/**
 * Tests for the deterministic detector (scripts/detector.mjs).
 * Run: node --test scripts/detector.test.mjs
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildContext, runRules, stripTags, RULES } from './detector.mjs';

const FIXTURE = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures', 'slop.html');
const NEW_FIXTURE = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures', 'new-slop.html');

const CLEAN = `<!DOCTYPE html>
<html>
<head><style>
  body { background-color: #1a1c1e; font-family: "Public Sans", sans-serif; }
  h1 { font-size: 3rem; letter-spacing: -0.02em; }
  .card { border: 1px solid #333; border-radius: 12px; }
</style></head>
<body>
  <h1>Track anything in one place</h1>
  <p>Rows is an unapologetically simple way to track anything.</p>
  <img src="/real.jpg" alt="Product screenshot" />
  <a href="/start" class="btn">Create a workspace</a>
</body>
</html>
`;

function ids(html) {
  const ctx = buildContext({ html, text: stripTags(html) });
  return runRules(ctx).map((f) => f.id);
}

test('detects the planted tells in the slop fixture', () => {
  const html = fs.readFileSync(FIXTURE, 'utf8');
  const found = ids(html);
  for (const expected of [
    'emoji-icon',
    'gradient-text',
    'ai-palette',
    'cream-palette',
    'overused-font',
    'italic-serif-display',
    'crushed-tracking',
    'oversized-h1',
    'icon-tile-stack',
    'nested-cards',
    'side-tab-border',
    'ghost-card',
    'over-rounding',
    'bounce-easing',
    'pulsing-dot',
    'marquee',
    'broken-image',
    'missing-alt',
    'content-hidden-at-rest',
    'marketing-buzzword',
    'eyebrow-above-h1',
  ]) {
    assert.ok(found.includes(expected), `expected rule ${expected} to fire, got: ${found.join(', ')}`);
  }
});

test('clean markup produces no error findings', () => {
  const found = ids(CLEAN);
  const errors = found.filter((id) => ['emoji-icon', 'gradient-text', 'ai-palette', 'nested-cards', 'side-tab-border', 'bounce-easing', 'broken-image', 'content-hidden-at-rest', 'marketing-buzzword', 'eyebrow-above-h1'].includes(id));
  assert.deepEqual(errors, [], `clean markup fired: ${found.join(', ')}`);
});

test('emo dash saturation rule fires on dense dashes', () => {
  const html = '<h1>Title</h1><p>' + ('word — word — word — word — word — word — word — word — ').repeat(6) + '</p>';
  assert.ok(ids(html).includes('em-dash-saturation'));
});

test('rule registry size is locked', () => {
  assert.equal(RULES.length, 42);
});

test('detects the 2025-2026 tells in the new-slop fixture', () => {
  const html = fs.readFileSync(NEW_FIXTURE, 'utf8');
  const found = ids(html);
  for (const expected of [
    'semantic-palette',
    'mono-hue-alert',
    'atmosphere-gradients',
    'glassmorphism',
    'decorative-strikes',
    'flat-type-hierarchy',
    'invented-stat-row',
    'copy-tics',
    'star-rating',
    'badge-spam',
    'tinted-icon-tile',
    'springy-hover',
    'all-caps-grid',
    'tasteful-terminal',
    'editorial-dashboard',
    'equal-card-grid',
  ]) {
    assert.ok(found.includes(expected), `expected rule ${expected} to fire, got: ${found.join(', ')}`);
  }
});

test('clean markup fires no new-slop rules', () => {
  const found = ids(CLEAN);
  const newRules = ['semantic-palette', 'mono-hue-alert', 'atmosphere-gradients', 'glassmorphism', 'decorative-strikes', 'flat-type-hierarchy', 'invented-stat-row', 'copy-tics', 'star-rating', 'badge-spam', 'tinted-icon-tile', 'springy-hover', 'all-caps-grid', 'tasteful-terminal', 'editorial-dashboard', 'equal-card-grid'];
  const fired = found.filter((id) => newRules.includes(id));
  assert.deepEqual(fired, [], `clean markup fired new-slop rules: ${fired.join(', ')}`);
});
