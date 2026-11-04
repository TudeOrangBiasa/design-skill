---
name: verify-design-skill
description: Drive the design-skill `design` dispatcher CLI like a user (detect, validate, check-design) against repo fixtures and capture JSON evidence. Use before a PR that touches scripts/, rules, or the command catalog.
---

# Verify design-skill

Primary surface: the `design` CLI (`scripts/design.mjs`, bin `design-skill`). Secondary: SKILL.md docs read by agents (gated by `npm run lint:docs`).

## Launch

No server and no install step. The scripts have no dependencies. Run `node scripts/design.mjs <tool> ...` from the repo root.

## Doctor

`node scripts/design.mjs --help` prints `Usage: design <tool> [args...]` and the tool list. If it doesn't, the dispatcher or `scripts/command-metadata.json` is broken.

## Drive

- `node scripts/design.mjs detect scripts/fixtures/slop.html --json`: `summary.total > 0`, and `findings.length` equals `summary.total`.
- `node scripts/design.mjs detect scripts/fixtures/new-slop.html --json` covers the 2025-2026 tells.
- `node scripts/design.mjs validate <DESIGN.md>` and `check-design` cover the fixtures under `scripts/fixtures/design-system/`.

## Evidence

`bash skills/verify-design-skill/scripts/smoke.sh` saves `help.txt` and `detect-slop.json` under `.scratch/verify/<run>/` and prints the finding counts.

## Cleanup

Nothing is left running, and evidence stays in `.scratch/verify/`. Delete `.scratch/` whenever you like.

## Helpers

- `skills/verify-design-skill/scripts/smoke.sh` (the "CLI smoke" step of `scripts/verify.sh`).
- Feature map: `features/README.md`.
