/**
 * Deterministic design-smell detector. Runs the mechanical tells from
 * smell.md against HTML without an LLM: static-HTML structure checks,
 * CSS property checks, and regex text checks.
 *
 * Usage:
 *   node scripts/detector.mjs <file|dir|url> [--json]
 *
 * Exit code 1 when error-severity findings exist, 2 on usage error.
 * Dependency-free: Node >= 18 (fetch for URLs).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { buildContext, stripTags } from './rules/context.mjs';
import { RULES } from './rules/index.mjs';

export { RULES, buildContext, runRules, summarize, stripTags };

// ---------------------------------------------------------------------------
// Input loading
// ---------------------------------------------------------------------------

async function loadInput(target) {
  if (/^https?:\/\//.test(target)) {
    const res = await fetch(target);
    if (!res.ok) throw new Error(`fetch failed: ${res.status} ${target}`);
    const html = await res.text();
    return [{ file: target, html }];
  }
  const p = path.resolve(target);
  const st = fs.statSync(p);
  if (st.isDirectory()) {
    const files = [];
    (function walk(d) {
      for (const entry of fs.readdirSync(d)) {
        const f = path.join(d, entry);
        const s = fs.statSync(f);
        if (s.isDirectory()) walk(f);
        else if (/\.html?$/i.test(entry)) files.push(f);
      }
    })(p);
    if (!files.length) throw new Error(`no HTML files in ${target}`);
    return files.map((f) => ({ file: f, html: fs.readFileSync(f, 'utf8') }));
  }
  return [{ file: p, html: fs.readFileSync(p, 'utf8') }];
}

// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// Runner
// ---------------------------------------------------------------------------

function runRules(ctx) {
  const findings = [];
  for (const rule of RULES) {
    try {
      const hits = rule.check(ctx);
      for (const hit of hits) {
        findings.push({
          id: rule.id,
          name: rule.name,
          category: rule.category,
          severity: rule.severity,
          evidence: hit.evidence,
        });
      }
    } catch {
      // a rule must never take down the run
    }
  }
  return findings;
}

function summarize(findings) {
  const bySeverity = { error: 0, warning: 0, advisory: 0 };
  const byCategory = {};
  for (const f of findings) {
    bySeverity[f.severity]++;
    byCategory[f.category] = (byCategory[f.category] || 0) + 1;
  }
  return { bySeverity, byCategory, total: findings.length };
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);
  const json = args.includes('--json');
  const target = args.find((a) => !a.startsWith('--'));

  if (!target) {
    console.error('usage: node scripts/detector.mjs <file|dir|url> [--json]');
    process.exit(2);
  }

  const sources = await loadInput(target);
  const allFindings = [];
  for (const { file, html } of sources) {
    const text = stripTags(html);
    const ctx = buildContext({ html, text });
    const findings = runRules(ctx).map((f) => ({ ...f, file }));
    allFindings.push(...findings);
  }

  const summary = summarize(allFindings);

  if (json) {
    console.log(JSON.stringify({ summary, findings: allFindings }, null, 2));
  } else {
    for (const f of allFindings) {
      console.log(`[${f.severity.toUpperCase()}] ${f.file} ${f.name}: ${f.evidence}`);
    }
    console.log(
      `\n${summary.total} findings: ${summary.bySeverity.error} error, ${summary.bySeverity.warning} warning, ${summary.bySeverity.advisory} advisory`
    );
    for (const [cat, n] of Object.entries(summary.byCategory)) console.log(`  ${cat}: ${n}`);
  }

  process.exit(summary.bySeverity.error > 0 ? 1 : 0);
}

const isMain = process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;
if (isMain) main();
