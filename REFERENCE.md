# Reference index

Command definitions live in `scripts/command-metadata.json` (single source of truth, machine-validated). Load the file for the command you run. The 10 tells live in SKILL.md - the table there is the core doctrine; these files add depth.

## Commands

| Command | Flags | Reference |
|---|---|---|
| detect | - (script) | runs `node scripts/detector.mjs <target>` |
| audit | --a11y --responsive --interaction --checkup --polish | reference/audit.md |
| deslop | --distill --bolder --quieter --harden | reference/deslop.md |
| shape | - | reference/shape.md |
| craft | --typeset --colorize --layout --animate --document | reference/craft.md |

## File map

- `reference/register.md` - brand vs product lanes, voice, audience, reflex-reject lists
- `reference/modes.md` - Persuade / Operate / Read / Experience + scan patterns
- `reference/craft-floor.md` - quality floor before editing UI (contrast, depth, type, motion, states)
- `reference/audit.md` - two-axis audit: Standards × Spec, parallel passes, no reranking
- `reference/checklist.md` - the core pre-ship checklist (always run by audit; the optional 703-check deep pass needs the dev repo's `datasets/checklist-catalog.md`)
- `reference/deslop.md` - tell-replacement playbook (positive direction, per-flag plays)
- `reference/shape.md` - grilling protocol: design tree, frontier rounds, never assume
- `reference/craft.md` - build flow, gates, ability flags, DESIGN.md generation

## Scripts

- `scripts/detector.mjs` - mechanical tell detection (53 rules in `scripts/rules/*`; deterministic, exit 0/1)
- `scripts/load-context.mjs` - reads PRODUCT.md / DESIGN.md / brief.md (read-only)
- `scripts/design-parser.mjs` - parses + validates DESIGN.md (google-labs-code/design.md spec)
- `scripts/concept-seed.mjs` - seeded direction dice for shape
- `scripts/design-system-check.mjs` - DESIGN.md drift detection (colors, fonts, radii)

The 703-check catalog (checklist.design, git clones only) is dev content in the repo's `datasets/` on [main](https://github.com/TudeOrangBiasa/design-skill); this package ships the built-in core floor only.
