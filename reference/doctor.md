# Doctor: drift repair

Use when the user asks what is stale, out of date, or needs refreshing between the project's design artifacts. Report drift first; repair only what the user approves.

## What to check

- **DESIGN.md vs `.design/design.json`:** if DESIGN.md is newer than the sidecar, the sidecar is stale. Offer to regenerate it, or note the live panel's stale-hint.
- **PRODUCT.md vs a Design Context section elsewhere:** when the design context lives in README or a PRD and PRODUCT.md also exists, the two can disagree. PRODUCT.md is canonical; reconcile the drift by merging, then ask before deleting the duplicate.
- **Legacy `brief.md`:** if it exists alongside PRODUCT.md, its durable answers belong in PRODUCT.md. Show the merge, confirm, then ask before removing `brief.md`.
- **Missing DESIGN.md after a finished new world:** a new surface or replacement world shipped with no DESIGN.md is an unfinished run. Offer `/design document` from the built world.
- **Register and mode consistency:** the register recorded in PRODUCT.md against the surfaces actually built. A product that rebuilt its landing as pure Persuade with no product shell still records the product register; surface modes are per-surface and need no PRODUCT.md change.
- **The docs themselves:** run `node {{scripts_path}}/lint-docs.mjs` to catch broken links, em dashes, and banned phrases in the skill's own corpus.

## Rules

- **Report, then repair.** Present the findings as a table; the user picks what to fix. Never silently rewrite a project's design memory.
- **Never repair drift as a side effect of a design task.** A stale sidecar noticed mid-build is reported in one line, not silently regenerated, unless the user asks.
- **One source of truth per answer.** After repair, each durable fact lives in exactly one canonical file.
