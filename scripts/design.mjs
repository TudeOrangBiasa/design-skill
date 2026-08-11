#!/usr/bin/env node
/**
 * design-skill dispatcher. Single CLI entry for the skill's scripts.
 *
 * Usage:
 *   node scripts/design.mjs <tool> [args...]
 *
 * Resolves <tool> through the fixed map below and spawns the target script,
 * forwarding args, stdio, and exit code. Per-script invocations
 * (node <scripts_path>/<script>.mjs) remain valid and unchanged.
 *
 * Exit codes: 0 success, 1 target script reported errors, 2 usage error
 * (unknown tool, missing target script, or spawn failure).
 */

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const TOOLS = {
  detect: { script: 'detector.mjs', help: 'Detect design slop and anti-patterns in an HTML file, directory, or URL' },
  'load-context': { script: 'load-context.mjs', help: 'Load existing design context (PRODUCT.md, DESIGN.md, brief.md) — read-only' },
  validate: { script: 'design-parser.mjs', help: 'Validate a DESIGN.md against the google-labs-code/design.md spec (sections, order, frontmatter)' },
  seed: { script: 'concept-seed.mjs', help: 'Seed concept directions' },
};

function version() {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
    return pkg.version ?? 'unknown';
  } catch {
    return 'unknown';
  }
}

function usage() {
  const lines = ['Usage: design <tool> [args...]', '', 'Tools:'];
  for (const [name, entry] of Object.entries(TOOLS)) {
    lines.push(`  ${name.padEnd(16)} ${entry.help}`);
  }
  return lines.join('\n');
}

const [, , tool, ...args] = process.argv;

if (!tool || tool === '--help' || tool === '-h') {
  console.log(usage());
  process.exit(0);
}
if (tool === '--version') {
  console.log(version());
  process.exit(0);
}

const entry = TOOLS[tool];
if (!entry) {
  console.error(`design: unknown tool "${tool}"`);
  console.error(usage());
  process.exit(2);
}

const script = path.join(ROOT, 'scripts', entry.script);
if (!fs.existsSync(script)) {
  console.error(`design: missing target script ${entry.script}`);
  process.exit(2);
}

const result = spawnSync(process.execPath, [script, ...args], { stdio: 'inherit' });
if (result.error) {
  console.error(`design: failed to run ${entry.script}: ${result.error.message}`);
  process.exit(2);
}
process.exit(result.status ?? 1);
