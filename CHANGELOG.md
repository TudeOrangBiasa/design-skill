# Changelog

Entries start at 1.0.19; earlier history lives in the git log. Format follows Keep a Changelog: Added, Changed, Removed per release.

## [2.1.0] - 2026-08-13

Architecture cleanup + measured doctrine closure. Scorecard grows 219/239 -> 228/239 with_skill (95.4%), lift +68.6pp; eval backend moved to opencode go.

### Added

- `scripts/validate-evals.mjs` + `npm run validate-evals`: machine-checks evals/evals.json (unique ids, prompt, >= 1 assertion, fixture paths exist) before any API spend; wired into CI.
- `CONTEXT.md`: the domain model (term to owning module) lands and is doc-linted.

### Changed

- Detector rule registry split out of `scripts/detector.mjs` into per-category modules (`scripts/rules/`): context.mjs (shared extraction + helpers), layout/typography/color/copy/motion/quality/components/imagery.mjs, and index.mjs aggregation. detector.mjs keeps the runner, CLI, and public exports; findings content unchanged, now grouped by category.
- Detector grows 46 -> 52 rules: justified-text, tight-line-height, tiny-body-text, wide-body-tracking (Typography), repeating-gradient-stripes (Color), skipped-heading-level (Quality); all warning severity.
- Shared CSS scanning seam (`scripts/css-scan.mjs`): prop, countProp, splitBlocks, collectColors, collectFontFamilies, collectRadii. The detector rules and design-system-check.mjs now import the same scanners; the color-literal regexes and hand-rolled font/radius extractors in design-system-check.mjs are gone. New `css-scan.test.mjs` (6 tests).
- Eval backend default switched to opencode go (`deepseek-v4-flash`, `https://opencode.ai/zen/go/v1`, key in `.eval-key.go.env`, the opencode account key). The zen free tier is `npm run eval:zen` (429s after ~4-5 heavy calls); the DeepSeek paid direct path is `npm run eval:deepseek` (`.eval-key.env`). agent-skills-eval.yaml points at go.
- SKILL.md doctrine closes the eval gaps (go scorecard 219/239): Numbers extended to invented testimonials/attributions, Color bans category-reflex palettes (coffee -> brown, cozy -> beige, tech -> indigo), audit findings must carry severity/element/fix and the Spec axis quotes the brief. Cap raised 3850 -> 4100B.
- Layout doctrine gains the anti-KPI-monument line (big figure + small label + stat row -> lead with the delta or a table); detector grows 52 -> 53 rules with `kpi-monument` (catches the $2.4M/12.8K/$187 cluster invented-stat-row missed). Adapted from Jakub Krehel's skills (MIT) - attribution in NOTICE.md. Mini-runs close layout-templates (4/4) and warm-cozy (3/3).
- Color doctrine upgraded to explicit OKLCH palette generation (one hue with a reason, equal-L steps, same C% across hues, accent from a different hue - per better-colors, MIT, see NOTICE.md), closing build-from-brief-dashboard 4/5 -> 5/5. Cap 4100 -> 4200B.
- Version 2.1.0; final scorecard 228/239 (95.4%) vs 64/239 (26.8%), lift +68.6pp (evals/BASELINE-SPECIMENS.md).
- Narrative/register/deslop doctrine sharpened (attributable proof - never invent nor omit; no tracked-caps kickers or greeting copy; deslop replaces with a rationale, never bare removal). SKILL.md cap 4200 -> 4400B.

## [2.0.0] - 2026-08-11

From-scratch rebuild measured with agent-skills-eval (see evals/BASELINE-v1.md, evals/BASELINE-v2.md). Baseline: with_skill 17/54 (31.5%) -> v2 39/54 (72.2%); slop-kill + build-from-brief with_skill +62.5pp.

### Added

- SKILL.md rewritten (3052B): the 10 tells with positive direction (Tech gradient, Generic tech hue, Feature-tile grid, Accent rail, Unearned blur, Stat monument, Icon topper, Template hero, Default type stack, Anti-reference echo), an explicit Invocation section (model-invoked flag-and-detect, user-invoked grill-first), five commands with ability flags, and a five-line Never appendix.
- `evals/`: agentskills.io evals.json (12 evals across slop-kill, build-from-brief, redesign, two-axis audit, a11y, deslop, shape-grill) + `agent-skills-eval.yaml` (opencode zen free API default, env-overridable) + `npm run eval`.
- Two-axis audit (reference/audit.md): Standards x Spec run as parallel passes, reported side by side, never reranked. Modeled on Matt Pocock's code-review skill; detector.mjs is the smell baseline; laws-of-UX GAPs (Cognitive Bias, Doherty Threshold, Flow, Goal-Gradient) folded in; /24 score with a fixed denominator.
- Grilling protocol (reference/shape.md): design tree, frontier rounds, every question with a recommendation, never assume. Copied from Matt Pocock's grilling skill.
- `scripts/validate-catalog.mjs`: machine-validates command-metadata.json vs the dispatcher vs REFERENCE.md; wired into CI.
- `node scripts/design.mjs validate DESIGN.md`: spec-conformance validation (frontmatter + 8 canonical sections in order) via design-parser.mjs.
- `datasets/`: checklist-catalog.md and scraped galleries (git clones only, never shipped).

### Changed

- Command surface: 55 reference files + 30 routed commands collapsed to 5 commands (detect, audit, deslop, shape, craft) with abilities as flags; command-metadata.json regenerated from 23 stale entries to exactly 5.
- reference/ merged to 7 files totalling 23401B (register, modes, craft-floor, audit, deslop, shape, craft), each <= 4096B; SKILL.md <= 3072B.
- load-context.mjs is read-only (the `.design.md` -> PRODUCT.md auto-rename is gone) and now reads legacy brief.md. is-generated.mjs uses spawnSync array argv instead of a shell string.
- craft.md: gates (do not compress), ability-flag doctrine, motionsites.ai free-gallery motion reference for --animate, DESIGN.md generation + validation for --document, drift upkeep (doctor.md merged).
- Version 2.0.0; files[] = SKILL.md, REFERENCE.md, GUIDE.md, reference/, scripts/, agents/, evals/, plugins/, NOTICE.md, LICENSE.

### Removed

- Live browser subsystem (18 scripts incl. vendored modern-screenshot.umd.js, tagged `v1-live-mode`), reference/live.md, and the browser-use MCP requirement: the skill ships zero servers, no MCP, no browser automation.
- The v1 routing tables, 30-item bans list, and per-surface interview scripts (hero, landing-pages, dashboards, redesign, new-work): replaced by the tells table and the merged playbooks.

## [1.0.26] - 2026-08-06

### Added

- reference/ui-checklist.md: the universal pre-ship UI checklist, scraped from Checklist Design (110 checklists, 703 checks). Core components (button, input, toggle, checkbox, radio), the system layer (color system, typography, spacing and grid, three-tier tokens), feedback and states (loading, empty, modal, tooltip, toast), data surfaces (tables), and the per-surface catalog (website pages, web app screens, design system components, mobile, flows). Cross-linked to existing doctrine instead of restating it. The raw scraped dataset is kept locally, not versioned (its credential-like vocabulary trips the security scanner at scale).
- checkup.md runs the checklist first; audit.md polish pass runs it before shipping.

## [1.0.25] - 2026-08-06

### Added

- reference/dashboards.md gains the real-time dashboards section (Smashing Magazine, "From Data To Decisions"): change perception (delta plus sparkline, sparkline rules, change-blindness micro-cues, mini-history), the Refresh Rule, the trust layer (Data Freshness Indicator, cached snapshots, skeleton UIs, retry with backoff, "Why this alert?"), change-cue motion timing (200-400ms value updates, 300-600ms chart trails, 100-150ms control feedback) scoped explicitly under animate.md's authoritative interaction timing, and the real-time audit pass.

## [1.0.24] - 2026-08-06

### Added

- reference/performance.md: the responsiveness playbook (web.dev INP doctrine). The Next Paint Contract (feedback in the next frame, interaction total under 200ms, never above 500ms), the interaction anatomy (input delay, event handler duration, next-paint delay), the Long Task Rule (no main-thread task over 50ms), layout-thrash and over-rendering bans, and field-vs-lab measurement. Motion doctrine stays in animate.md (Emil Kowalski).
- audit.md performance dimension loads the playbook; dashboards.md links it.

## [1.0.23] - 2026-08-06

### Added

- reference/dashboards.md: the decision-surface playbook for operational, analytical, and monitoring UIs. Twelve dashboard principles (decision trace, role-matched depth, F-pattern and inverted-pyramid hierarchy, grid systems, chart-to-question mapping, metric context, progressive disclosure, structured filters, designed empty/loading/error states, accessibility, performance measurement) plus the density and table norms (row-height scale 24-64px, header matches body row, sticky header and frozen first column, tabular lining numerals, data-ink).
- audit.md loads the dashboard playbook for dashboard and monitoring surfaces; the product register links it.

### Changed

- SkillSpector baseline refreshed for fingerprint drift in audit.md and CHANGELOG.md.
- Saved webpage artifacts in research/ (raw HTML with third-party scripts) are gitignored; their extracted doctrine and research notes stay versioned as markdown.

## [1.0.22] - 2026-08-06

### Added

- Detector grows from 26 to 42 rules with the 2025-2026 AI-tell set (research: killaislop.com, ai-layout research): default semantic palette, same-hue status boxes, atmosphere gradients, glassmorphism, decorative strikes, flat type hierarchy, invented stat rows, AI copy tics, decorative star ratings, badge spam, tinted icon containers, springy scale hovers, all-caps label grids, mono chrome terminals, editorial dressing on operational surfaces, equal-weight card grids.
- `overused-font` extended with the display-serif cliches (Playfair, Lora, Cormorant, Newsreader, Recoleta).
- smell.md: the Tells Registry and Detector Pass updated to the full 42-rule set; new Evolved Slop section (2026 second wave: Inter everywhere, tasteful terminal, editorial dashboard); the six anti-slop principles (decide before you decorate, one accent one voice, hierarchy from scale and space, subtract first, specific beats loud, decoration must mean something).
- SKILL.md bans: decorative strikethroughs, badge and pill spam, invented stat rows, tinted icon containers, springy scale hovers, mono chrome.
- Detector tests: new-slop fixture covering all 16 new rules, clean-markup false-positive guard, and a locked rule count.

### Changed

- lint-docs glob updated after the CONTRIBUTING.md to CONTRIBUTION.md rename; CONTRIBUTION.md is now linted by CI.
- `gradient-text` narrowed to `background-clip: text` only; gradient backgrounds are covered by the new `atmosphere-gradients` rule, so a surface choice is no longer an error-severity finding.

## [1.0.21] - 2026-08-06

### Changed

- DESIGN.md generation aligned to the canonical [google-labs-code/design.md](https://github.com/google-labs-code/design.md) spec (`docs/spec.md`): frontmatter examples use schema-valid dimensions (no `clamp()`, no `"normal"` letter spacing, single-value `padding`), token-reference rules match the spec's composite-ref allowance, and the document flow gained a Step 4c that validates the generated file with `npx @google/design.md lint` before presenting it.
- Parser tests cover the spec's token vocabulary: composite typography references in components and unitless spacing numbers.

### Fixed

- document.md Pitfalls claimed the spec has six sections; it has eight.

## [1.0.20] - 2026-08-06

### Changed

- npm package renamed to `agent-design-skill` (the `omp-design-skill` name is retired).
- Machine-specific paths removed from SKILL.md Tooling and the README install section.
- Indonesian routing triggers removed (English-only triggers remain).
- `CONTRIBUTING.md` renamed to `CONTRIBUTION.md`; the README links to it.
- README gained an npm version badge for `agent-design-skill`.

## [1.0.19] - 2026-08-06

### Added

- `reference/browser-layout.md`: browser layout guardrails and accuracy ruleset (anti-collapse, strict coordinates, locked breakpoints, defensive CSS, reconciliation pipeline).
- Audit dimension 6, Layout Integrity (Browser-Verified), scored out of 24 with rescaled rating bands.
- Browser requirement for visual audits: harness browser tool or the browser-use MCP server (keyless harness pinned at `browser-use==0.1.40`), with an install pointer and a `[UNVERIFIED_COORDS]` degradation path.
- Universal locked breakpoints 375/640/768/1024/1280/1536 across audit, layout, and responsive.
- `scripts/design.mjs` dispatcher and the `design-skill` npm bin.
- `plugins/install.sh` installer for pi, opencode, claude-code, codex, cursor, gemini-cli, universal, omp, and project scope.
- `CONTRIBUTING.md`, `CHANGELOG.md`, and a CI workflow (tests, doc lint, SkillSpector scan).
- Complex single-page audits with a closing ambition statement.
- SkillSpector security scan in CI, with a committed suppression baseline (`.skillspector-baseline.yaml`) and documented triage rules in CONTRIBUTING.md.
- Declared `allowed-tools` in the SKILL.md frontmatter and pinned the `skills.sh` installer (`skills@1.5.22`), closing the scanner's supply-chain and least-privilege findings.

### Changed

- Audit report score bands moved from /20 to /24.
- The old viewport gauntlet (320/375/768/1024/1440/2560) replaced by the six locked breakpoints; 1440 is an alternate 2xl.
- SKILL.md Tooling section restated the CLI over MCP doctrine scoped to the skill itself.
- NOTICE.md now attributes the vendored modern-screenshot bundle.

### Removed

- `scripts/cleanup-deprecated.mjs`, unreferenced since its one-shot migration ran.
