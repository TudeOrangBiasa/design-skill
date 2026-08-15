#!/usr/bin/env bash
# design-skill install pruner.
#
# skills.sh copies the whole cloned repo per project scope; it has no
# include-list, so every installed copy carries tracked dev artifacts the
# skill never reads at runtime (research notes, datasets, CI workflow,
# release/changelog files, the 3.9MB banner, eval config, package.json,
# and the dev-only pieces: the eval suite + harness, test files, test
# fixtures, and the catalog/eval validators). This script removes exactly
# that set from one installed copy.
#
# Kept: command-metadata.json (REFERENCE.md tells agents to load it per
# command) and every dispatcher script (design.mjs, detector.mjs,
# css-scan.mjs, design-parser.mjs, concept-seed.mjs,
# design-system-check.mjs, load-context.mjs, rules/).
#
# The omp install is a symlink to the repo itself - NEVER run this on it
# (it would delete source files). Only run on skills.sh copies.
#
# Usage:
#   bash plugins/prune-install.sh <installed-skill-path>
#
# Exit codes: 0 pruned; 2 usage error / not an installed skill copy.

set -euo pipefail

TARGET="${1:-}"

if [[ -z "${TARGET}" || ! -f "${TARGET}/SKILL.md" ]]; then
  echo "Usage: bash plugins/prune-install.sh <installed-skill-path>" >&2
  echo "Path must contain SKILL.md (an installed skill copy)." >&2
  exit 2
fi

# The repo's tracked dev artifacts; the skill does not load any of these
# at runtime (allowed-tools: Read, Write, Bash, WebFetch, env).
rm -rf \
  "${TARGET}/assets" \
  "${TARGET}/research" \
  "${TARGET}/datasets" \
  "${TARGET}/.github" \
  "${TARGET}/CHANGELOG.md" \
  "${TARGET}/CONTRIBUTION.md" \
  "${TARGET}/.skillspector-baseline.yaml" \
  "${TARGET}/agent-skills-eval.yaml" \
  "${TARGET}/.gitignore" \
  "${TARGET}/package.json" \
  "${TARGET}/evals" \
  "${TARGET}/scripts/"*.test.mjs \
  "${TARGET}/scripts/fixtures" \
  "${TARGET}/scripts/lint-docs.mjs" \
  "${TARGET}/scripts/validate-catalog.mjs" \
  "${TARGET}/scripts/validate-evals.mjs"

echo "Pruned ${TARGET}"
echo "Surviving top-level entries:"
ls -1 "${TARGET}" | sort
