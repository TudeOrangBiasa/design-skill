#!/usr/bin/env bash
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
step() { printf '\n==> %s\n' "$1"; }
step "unit tests"; npm test --silent
step "doc lint"; npm run -s lint:docs
step "validate catalog"; npm run -s validate-catalog
step "validate evals"; npm run -s validate-evals
step "security scan (SkillSpector, no LLM, baseline)"
if command -v skillspector >/dev/null 2>&1; then
  OUT="$(mktemp -d)/skillspector.sarif"
  skillspector scan . --no-llm --baseline .skillspector-baseline.yaml --format sarif --output "$OUT"
  echo "    sarif: $OUT"
else
  echo "    skipped: skillspector not installed (uv tool install git+https://github.com/NVIDIA/SkillSpector.git@v2.5.3)"
fi
if [ "${VERIFY_SKIP_SMOKE:-0}" != "1" ]; then
  step "CLI smoke (verify-design-skill)"; bash skills/verify-design-skill/scripts/smoke.sh
fi
printf '\nverify: all gates passed\n'
