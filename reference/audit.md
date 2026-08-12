# Audit: two axes, Standards × Spec

Modeled on Matt Pocock's code-review skill: run two independent review passes and report them side by side. **Never merge or rerank findings across axes** - a page can pass one and fail the other; the separation stops one axis masking the other.

## Process

1. **Pin the target** - file, directory, or URL the user named. Load context first (`node scripts/load-context.mjs`) so the Spec axis has the brief.
2. **Spawn both axes as parallel sub-agents** so they don't pollute each other's context. If the harness has no sub-agents, run the two passes as separate sequential context windows and never share the transcript between them.
3. **Aggregate** - present under `## Standards` and `## Spec`, verbatim or lightly cleaned. End with a one-line summary per axis: total findings + worst issue within that axis. Don't pick a single winner across axes.

## Standards axis

Conformance to the skill's documented standards. The deterministic `detector.mjs` pass is the smell baseline (analogous to Fowler's code smells) - **run it first and report its findings verbatim** (exit 1 = error-severity findings). Then the craft-floor rules (reference/craft-floor.md), a11y (contrast ≥4.5:1 body / 3:1 large, touch 44×44, landmarks, heading order, focus), responsive rules, and the 10-tell catalog (SKILL.md).

Layout dimension (Laws-of-UX basis): sections differ in structure and rhythm; one focal point per viewport (Von Restorff); layout serves the register - a dashboard stays dense (Operate), a brand page can editorialize (Persuade); overcorrecting a tell into a narrow centered column is itself a finding. Choices limited by scope (Hick's); primary actions where the scan ends (Fitts). The checklist pass (datasets/, optional) covers completeness.

Two binding rules:

- **The brief/DESIGN.md overrides.** A documented design decision that deliberately uses a flagged pattern suppresses the finding.
- **Always a judgement call.** Each tell is a labelled heuristic, never a hard violation - except detector error-severity findings, which are hard. Skip anything tooling already enforces.

Laws-of-UX doctrine to apply: Cognitive Bias - audit interview flows for anchoring effects; Doherty Threshold - system feedback should be <400ms; Flow - onboarding calibrates difficulty; Goal-Gradient - multi-step flows show progress.

Flag mapping: `--a11y` (contrast, targets, semantics) · `--responsive` (breakpoints, overflow, touch) · `--interaction` (states, feedback timing, keyboard) · `--checkup` (consistency, drift vs DESIGN.md) · `--polish` (alignment, spacing, micro-detail). No flag = full Standards pass.

Optional deep pass: if `datasets/checklist-catalog.md` is present (git clone), deepen the checklist pass with its section for the target surface; npm installs use the built-in rules.

## Spec axis

Fidelity to the originating brief: read the shape-interview brief (brief.md), PRODUCT.md, and DESIGN.md (via load-context) when present, and report:

- (a) brief requirements missing or partial;
- (b) design behavior not asked for (scope creep);
- (c) requirements that look met but are implemented wrong.

Quote the brief line for each finding. If no brief exists, say "no spec available" and report only the Standards axis.

## Scoring

- Standards axis: findings at P0 (blocks ship) / P1 (major) / P2 (minor) / P3 (nit), plus a **/24 health score** (0 = broken, 24 = clean; v2 always writes `/24` - the v1 bug scored /24 but summarized /20).
- Spec axis: brief-fidelity pass/fail per requirement, no aggregate score.

## Report

Write `.design-skill/audit-report.md`. If it exists before an audit, load it and prioritize P0/P1 findings (report continuity - one line noting the prior report). When craft-floor verification overlaps audit checks, act on the report's findings instead of re-auditing each rule.
