/**
 * Doc lint for the design-skill corpus.
 *
 * Checks, against every markdown file in the skill:
 *   1. No em dashes (the skill's own copy rule), except lines that name
 *      the banned character inside the anti-AI rules.
 *   2. No banned AI-prose phrases from the anti-AI list in REFERENCE.md.
 *   3. Every internal markdown link target exists.
 *
 * Usage: node scripts/lint-docs.mjs
 * Exit code 1 with a report when any check fails.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const DOC_GLOBS = [
  'SKILL.md',
  'REFERENCE.md',
  'GUIDE.md',
  'README.md',
  'CONTRIBUTING.md',
  'CHANGELOG.md',
  'reference/*.md',
  'agents/*.md',
  'NOTICE.md',
];

const BANNED = [
  /\bstands as\b/i,
  /\bserves as\b/i,
  /\bfunctions as\b/i,
  /\bpivotal\b/i,
  /\bvibrant\b/i,
  /\bintricate\b/i,
  /\btapestry\b/i,
  /\btestament\b/i,
  /\bevolving landscape\b/i,
  /\bnavigating\b/i,
  /\bleverage\b/i,
  /\butilize\b/i,
  /\bseamless\b/i,
  /\bcutting-edge\b/i,
  /\bBerikut adalah\b/i,
  /\bIn this section\b/i,
  /\bPenting untuk diingat\b/i,
  /\bPerlu diketahui\b/i,
  /\bsaat ini\b/i,
  /\bpada era\b/i,
  /\bdalam konteks\b/i,
];

function listFiles() {
  const out = [];
  for (const g of DOC_GLOBS) {
    const full = path.join(ROOT, g);
    if (g.includes('*')) {
      const dir = path.dirname(full);
      const pat = path.basename(full);
      if (!fs.existsSync(dir)) continue;
      for (const f of fs.readdirSync(dir)) {
        if (f.endsWith('.md')) out.push(path.join(dir, f));
      }
    } else if (fs.existsSync(full)) {
      out.push(full);
    }
  }
  return out;
}

function findings(file) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/);
  const issues = [];
  const rel = path.relative(ROOT, file);

  // Lines inside the anti-AI rules section intentionally name the banned
  // words and the banned character; skip them for checks 1 and 2.
  let inAntiAi = false;
  const antiAiStart = /^#{2,3} Anti-AI prose/;
  const sectionBreak = /^#{2,3} /;

  lines.forEach((line, i) => {
    const n = i + 1;
    if (antiAiStart.test(line)) inAntiAi = true;
    else if (inAntiAi && sectionBreak.test(line)) inAntiAi = false;

    // 1. em dashes, skipping the rule line that names the character
    if (!inAntiAi && line.includes('—') && !/Em dashes \(—\)/.test(line)) {
      issues.push(`${rel}:${n} em dash: ${line.trim().slice(0, 90)}`);
    }
    // 2. banned phrases
    if (!inAntiAi) {
      for (const re of BANNED) {
        if (re.test(line)) {
          issues.push(`${rel}:${n} banned phrase ${re}: ${line.trim().slice(0, 90)}`);
          break;
        }
      }
    }
  });

  // 3. internal markdown links
  const dir = path.dirname(file);
  const linkRe = /\]\(([^)]+\.md)(?:#[^)]*)?\)/g;
  let m;
  while ((m = linkRe.exec(text)) !== null) {
    const target = m[1];
    if (/^https?:\/\//.test(target)) continue;
    const local = path.resolve(dir, target);
    const fromRoot = path.resolve(ROOT, target);
    if (!fs.existsSync(local) && !fs.existsSync(fromRoot)) {
      issues.push(`${rel} broken link to ${target}`);
    }
  }

  return issues;
}

const allIssues = [];
for (const f of listFiles()) {
  allIssues.push(...findings(f));
}

if (allIssues.length) {
  console.log(`doc lint failed: ${allIssues.length} finding(s)`);
  for (const issue of allIssues) console.log('  ' + issue);
  process.exit(1);
}
console.log('doc lint clean: no em dashes, no banned phrases, all links resolve');
