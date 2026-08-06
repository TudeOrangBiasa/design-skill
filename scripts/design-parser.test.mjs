/**
 * Test suite for design-parser.mjs (Stitch-spec DESIGN.md parsing).
 * Run: node --test scripts/design-parser.test.mjs
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseDesignMd, assessCoverage } from './design-parser.mjs';

const SPEC = `---
version: alpha
name: Heritage
omitted:
  - spacing
  - section: rounded
    reason: "No rounded corners defined in brand book"
colors:
  primary: "#1A1C1E"
  secondary: "#6C7278"
  tertiary: "#B8422E"
typography:
  h1:
    fontFamily: Public Sans
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.1
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.sm}"
    padding: 12px
---

# Design System: Heritage

## Overview

Architectural Minimalism meets Journalistic Gravitas.

**Key Characteristics:**
- Deep ink headlines
- Warm limestone base

## Colors

The palette is rooted in high-contrast neutrals.

- **Primary (#1A1C1E):** Deep ink for headlines.
- **Tertiary (#B8422E):** The sole driver for interaction.

## Typography

**Display Font:** Public Sans (with Georgia)

## Layout

The layout follows a **Fluid Grid** for mobile and a **Fixed-Max-Width Grid** for desktop (max 1200px).

## Elevation & Depth

Depth is achieved through **Tonal Layers** rather than heavy shadows.

## Shapes

The shape language is defined by **Architectural Sharpness**. Interactive elements use a minimal **4px corner radius**.

## Components

### Buttons
- **Shape:** 4px radius

## Do's and Don'ts

### Do:
- Do use the primary color only for the single most important action

### Don't:
- Don't mix rounded and sharp corners in the same view
`;

test('parses all eight canonical sections', () => {
  const model = parseDesignMd(SPEC);
  for (const key of ['overview', 'colors', 'typography', 'layout', 'elevation', 'shapes', 'components', 'dosDonts']) {
    assert.ok(model[key] !== null, `missing section ${key}`);
  }
});

test('Elevation and Depth alias maps to elevation', () => {
  const model = parseDesignMd(SPEC);
  assert.ok(model.elevation.description.includes('Tonal Layers'));
});

test('parses frontmatter tokens with token references', () => {
  const model = parseDesignMd(SPEC);
  assert.equal(model.frontmatter.version, 'alpha');
  assert.equal(model.frontmatter.name, 'Heritage');
  assert.equal(model.frontmatter.colors.primary, '#1A1C1E');
  assert.deepEqual(model.frontmatter.components['button-primary'], {
    backgroundColor: '{colors.tertiary}',
    textColor: '{colors.neutral}',
    rounded: '{rounded.sm}',
    padding: '12px',
  });
});

test('parses omitted as block list with object entries', () => {
  const model = parseDesignMd(SPEC);
  assert.deepEqual(model.frontmatter.omitted, ['spacing', { section: 'rounded', reason: 'No rounded corners defined in brand book' }]);
});

test('parses omitted as inline array', () => {
  const md = `---
omitted: ["spacing", "rounded"]
colors:
  primary: "#1A1C1E"
---

## Overview
Test.
`;
  const model = parseDesignMd(md);
  assert.deepEqual(model.frontmatter.omitted, ['spacing', 'rounded']);
});

test('parses typography as object', () => {
  const model = parseDesignMd(SPEC);
  assert.deepEqual(model.frontmatter.typography.h1, {
    fontFamily: 'Public Sans',
    fontSize: '48px',
    fontWeight: 600,
    lineHeight: 1.1,
  });
});

test('extracts layout and shapes prose', () => {
  const model = parseDesignMd(SPEC);
  assert.ok(model.layout.description.includes('Fluid Grid'));
  assert.ok(model.shapes.description.includes('4px corner radius'));
});

test('coverage report includes layout and shapes', () => {
  const model = parseDesignMd(SPEC);
  const report = assessCoverage(model);
  assert.ok(report.layout, 'layout missing from coverage');
  assert.ok(report.shapes, 'shapes missing from coverage');
  assert.equal(report.layout.description, true);
  assert.equal(report.shapes.description, true);
});

test('no frontmatter still parses the body', () => {
  const md = `# Title

## Overview
Hello.

## Colors
- **Primary (#000000):** Black.
`;
  const model = parseDesignMd(md);
  assert.equal(model.frontmatter, null);
  assert.ok(model.overview.philosophy.length >= 1);
});
