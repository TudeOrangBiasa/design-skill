#!/usr/bin/env bash
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
RUN_DIR=".scratch/verify/$(date +%Y%m%d-%H%M%S)"
mkdir -p "$RUN_DIR"
node scripts/design.mjs --help > "$RUN_DIR/help.txt"
grep -q '^Usage: design' "$RUN_DIR/help.txt" || { echo "FAIL: dispatcher --help has no Usage line"; exit 1; }
node scripts/design.mjs detect scripts/fixtures/slop.html --json > "$RUN_DIR/detect-slop.json" || true
node -e '
const j = JSON.parse(require("fs").readFileSync(process.argv[1], "utf8"));
if (!(j.summary && j.summary.total > 0 && Array.isArray(j.findings) && j.findings.length === j.summary.total)) {
  console.error("FAIL: detect on slop fixture returned no findings", j.summary); process.exit(1);
}
console.log(`detect slop.html: ${j.summary.total} findings (${j.summary.bySeverity.error} error, ${j.summary.bySeverity.warning} warning)`);
' "$RUN_DIR/detect-slop.json"
echo "evidence: $RUN_DIR"
