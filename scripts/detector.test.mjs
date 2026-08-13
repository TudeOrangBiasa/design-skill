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
  // 42 + 4 geometric rules (fixed-width-overflow, crop-risk-container,
  // absolute-no-inset, negative-margin-overlap) added 2026-08-12 as part of
  // the geometry-detection work + 6 rules (justified-text, tight-line-height,
  // tiny-body-text, wide-body-tracking, repeating-gradient-stripes,
  // skipped-heading-level) landed with the registry split 2026-08-13 +
  // kpi-monument (2026-08-13, closes the hero-metric gap).
  // Bump deliberately, with a test for each.
  assert.equal(RULES.length, 53);
});

test('geometric rules fire on fixed-width, crop, floating, and overlap patterns', () => {
  const html = `<!DOCTYPE html><html><head><style>
    .wide { width: 1440px; }
    .crop { overflow: hidden; height: 200px; }
    .float { position: absolute; }
    .overlap { margin-top: -20px; }
  </style></head><body><h1>Title</h1></body></html>`;
  const found = ids(html);
  for (const expected of ['fixed-width-overflow', 'crop-risk-container', 'absolute-no-inset', 'negative-margin-overlap']) {
    assert.ok(found.includes(expected), `expected rule ${expected} to fire, got: ${found.join(', ')}`);
  }
});

test('geometric rules do not fire on safe layout', () => {
  const html = `<!DOCTYPE html><html><head><style>
    .wrap { width: min(100% - 2rem, 72rem); margin-inline: auto; }
    .panel { overflow: hidden; border-radius: 12px; }
    .popover { position: absolute; top: 100%; left: 0; }
    .grid { display: grid; gap: 1rem; }
  </style></head><body><h1>Title</h1></body></html>`;
  const found = ids(html);
  for (const forbidden of ['fixed-width-overflow', 'crop-risk-container', 'absolute-no-inset', 'negative-margin-overlap']) {
    assert.ok(!found.includes(forbidden), `rule ${forbidden} fired on safe layout: ${found.join(', ')}`);
  }
});

test('kpi-monument fires on hero-metric figures, not on single prices', () => {
  const html = `<!DOCTYPE html><html><head><style>
    .kpi { font-size: 2.5rem; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); }
  </style></head><body><h1>Title</h1>
  <div class="grid"><div class="kpi">$2.4M</div><div class="kpi">12.8K</div><div class="kpi">$187</div></div>
  </body></html>`;
  assert.ok(ids(html).includes('kpi-monument'), `expected kpi-monument, got: ${ids(html).join(', ')}`);
  const safe = `<html><head><style>.price { font-size: 1.25rem; }</style></head><body><p class="price">$24/month</p></body></html>`;
  assert.ok(!ids(safe).includes('kpi-monument'), 'kpi-monument fired on a single price');
});

test('new typography/color/quality rules fire on their patterns', () => {
  const html = `<!DOCTYPE html><html><head><style>
    .body { text-align: justify; line-height: 1.2; font-size: 10px; letter-spacing: 0.07em; }
    .bg { background: repeating-linear-gradient(45deg, #eee, #fff 10px); }
  </style></head><body><h1>Title</h1><h3>Skip</h3><p class="body">Text</p><div class="bg"></div></body></html>`;
  const found = ids(html);
  for (const expected of ['justified-text', 'tight-line-height', 'tiny-body-text', 'wide-body-tracking', 'repeating-gradient-stripes', 'skipped-heading-level']) {
    assert.ok(found.includes(expected), `expected ${expected}, got: ${found.join(', ')}`);
  }
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
  assert.ok(!found.includes('gradient-text'), 'gradient backgrounds alone must not fire gradient-text');
});

test('gradient backgrounds without text clipping do not fire gradient-text', () => {
  const html = '<!DOCTYPE html><html><head><style>.hero { background-image: linear-gradient(180deg, #6366f1, #a855f7); }</style></head><body><h1>Title</h1></body></html>';
  assert.ok(!ids(html).includes('gradient-text'));
});

test('clean markup fires no new-slop rules', () => {
  const found = ids(CLEAN);
  const newRules = ['semantic-palette', 'mono-hue-alert', 'atmosphere-gradients', 'glassmorphism', 'decorative-strikes', 'flat-type-hierarchy', 'invented-stat-row', 'copy-tics', 'star-rating', 'badge-spam', 'tinted-icon-tile', 'springy-hover', 'all-caps-grid', 'tasteful-terminal', 'editorial-dashboard', 'equal-card-grid'];
  const fired = found.filter((id) => newRules.includes(id));
  assert.deepEqual(fired, [], `clean markup fired new-slop rules: ${fired.join(', ')}`);
});
