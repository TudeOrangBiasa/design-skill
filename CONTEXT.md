# CONTEXT.md: design-skill domain model

The skill's vocabulary, each term resolved to the module that owns it. A
future change should land in the owning module, not a lookalike elsewhere.

## Terms to modules

| Term | Meaning | Owner |
| --- | --- | --- |
| tell | A recognizable AI-generated design pattern (the 10 in SKILL.md) or mechanical CSS/copy signal | SKILL.md tells table; mechanical subset: `scripts/rules/*` |
| detector layer | Deterministic smell detection: context building, registry, runner | `scripts/detector.mjs` (runner + CLI) + `scripts/rules/index.mjs` (registry) + `scripts/rules/context.mjs` (buildContext, stripTags, attr) |
| css-scan seam | Shared CSS extraction (prop, countProp, splitBlocks, collectColors, collectFontFamilies, collectRadii) | `scripts/css-scan.mjs` |
| command | One of the five user commands with ability flags | `scripts/command-metadata.json` |
| reference module | A doctrine playbook under reference/ | `reference/*.md` (register, modes, craft-floor, audit, deslop, shape, craft, checklist) |
| audit | Two-axis review: Standards (detector + craft floor + tells + core checklist) x Spec (brief/DESIGN.md fidelity) | `reference/audit.md` |
| checklist core floor | Mandatory pre-ship UI checks | `reference/checklist.md` |
| grilling | Shape planning: design tree, frontier rounds, every question with a recommendation | `reference/shape.md` |
| DESIGN.md token | Color/font/radius tokens declared in DESIGN.md (google-labs-code/design.md spec) | `scripts/design-parser.mjs` (parseDesignMd) |
| drift | Target tokens outside the documented DESIGN.md system | `scripts/design-system-check.mjs` (uses the css-scan seam) |
| brief | The input product context a build follows | `scripts/load-context.mjs` (reads PRODUCT.md / DESIGN.md / brief.md) |
| mode | Operate (build) vs Explore (grill first) | `reference/modes.md` |

## Layer map

- User input -> `scripts/design.mjs` dispatcher -> one of detect, audit,
  deslop, shape, craft (abilities as flags).
- detect -> `scripts/detector.mjs` -> `scripts/rules/*` (53 rules) ->
  `scripts/rules/context.mjs` + `scripts/css-scan.mjs`.
- audit -> detector pass + `scripts/design-system-check.mjs` (check-design)
  + grilling shape + checklist core floor.
