# Changelog

Entries start at 1.0.19; earlier history lives in the git log. Format follows Keep a Changelog: Added, Changed, Removed per release.

## [Unreleased]

- Nothing yet.

## [1.0.29] - 2026-08-06

### Added

- Static wiki site in `site/`: a Cntrl-style freehand landing page plus a browsable wiki rendering the docs/ and reference/ corpus (66 pages, client-side search, sidebar, 404, favicon, og image). Zero npm dependencies: `node site/build.mjs` is the whole build. GitHub Pages workflow added; `site/dist/` is build output and gitignored.
- Detector: `ctx.copyText` context (prose with `<pre>`/`<code>` stripped) and copy rules now scan it, so quoted evidence inside code blocks no longer self-fires. `glassmorphism` matches class attributes only, not documentation mentions. Two tests lock both contracts.

### Changed

- The detector's own docs quote banned vocabulary as code tokens (`streamline`, `10k+`, `backdrop-blur`) so the skill does not flag its own rulebook.

## [1.0.28] - 2026-08-06

### Added

- docs/ wiki: index, per-agent install matrix, architecture, command reference, the 42-rule detector guide, live mode, DESIGN.md, and the checklist engine. The wiki is lint-gated like the rest of the corpus.
- README rewritten in the storytelling style (failure modes, problem and fix, 30-second install with per-agent blocks) after the mattpocock/skills model.

### Changed

- plugins/install.sh verified against the omp skills docs (agents provider layout, `~/.agents/skills/<name>/SKILL.md`), the opencode source (`{skill,skills}/**/SKILL.md`), and a live universal install. The `project` branch comment now describes the lock behavior it actually has.
- skills-lock.json committed: the repo is the skill, and the lock records it for `skills experimental_install`.

## [1.0.27] - 2026-08-06

### Changed

- README synced with the released skill: full bans list, a doctrine playbooks section (dashboards, performance, ui-checklist, catalog), the 42-rule detector in the tooling contract, and Sources rows for Checklist Design, Nielsen Norman Group, IBM Carbon, and web.dev.
- NOTICE.md attributes Checklist Design (`reference/ui-checklist.md`, `reference/checklist-catalog.md`); the source publishes no explicit license, flagged for verification before commercial redistribution of the catalog text.

### Fixed

- Release audit: no secrets, machine paths, or personal data in the committed tree; no stale references (links, versions, asset paths) found; README and NOTICE were the only stale artifacts.

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
