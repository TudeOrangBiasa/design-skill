# BASELINE-SPECIMENS — 58-eval scorecard on real slop corpus

The v2 skill measured against the expanded suite: 12 original evals + 11 real slop specimens from impeccable's antipattern-examples + 35 tell fragments from killaislop.com.

- Run: 2026-08-11, `agent-design-skill` 2.0.0 (commit `c3b49ff`)
- Backend: **DeepSeek API** (`https://api.deepseek.com`, target + judge `deepseek-v4-flash`, concurrency 4) — fast rerun; the zen-free backend stalls occasionally (two calls hung ~10h with no request timeout in the harness), so the scorecard used the paid fast backend. Default config stays opencode zen free; override with `OPENAI_COMPATIBLE_BASE_URL` / `OPENAI_COMPATIBLE_MODEL` / `OPENAI_COMPATIBLE_API_KEY`.
- Report: `eval-workspace/iteration-8/report/index.html`
- Benchmark: `eval-workspace/iteration-8/benchmark.json`

## Results

Assertion-level, with_skill vs without_skill:

| Family | Evals | with_skill | without_skill | Lift |
|---|---|---|---|---|
| slop-kill (impeccable specimens + killaislop tells + originals) | 49 | **138/158 (87.3%)** | 20/158 (12.7%) | **+74.7pp** |
| build-from-brief | 2 | 9/10 (90.0%) | 7/10 (70.0%) | +20.0pp |
| audit (two-axis + honesty) | 2 | 7/9 (77.8%) | 3/9 (33.3%) | +44.4pp |
| a11y | 2 | 7/8 (87.5%) | 0/8 (0.0%) | +87.5pp |
| deslop | 1 | 3/4 (75.0%) | 0/4 (0.0%) | +75.0pp |
| shape (grill) | 1 | 4/5 (80.0%) | 4/5 (80.0%) | +0.0pp |
| redesign | 1 | 3/4 (75.0%) | 0/4 (0.0%) | +75.0pp |
| **Total (58 evals)** | | **171/198 (86.4%)** | **34/198 (17.2%)** | **+69.2pp** |

Harness summary: with_skill 87.4% vs without_skill 15.7%, delta +71.8pp.

## The slop-kill corpus, tell by tell

- **Impeccable specimens (11)**: 9 of 11 are detector-catchable (exit 1); modal-abuse and redundant-ux-writing are LLM-only patterns in their catalog too. with_skill passes: purple-gradients 5/5, lazy-impact 5/5, cardocalypse 3/3, thick-border 3/3, layout-templates 4/4, inter-everywhere 3/3, massive-icons 3/3, bad-contrast 3/3, redundant-ux 3/3, lazy-cool 3/4, modal-abuse 1/3.
- **Killaislop tells (35)**: 26/35 are detector-catchable after inlining the site's slop CSS into the fixtures (the fragments are class-based; the detector scans declarations). with_skill passes 31/35 fully; the four misses are honest:
  - `the-invented-stat-row` 0/3: the model removed the badge-row treatment but KEPT the invented number ("10k+ developers"); the judge correctly flagged it. The skill says only real numbers; this fragment beat the doctrine.
  - `the-warm-cozy-palette` 0/3: the rewrite kept a warm off-white surface; the "cozy wash" persisted in the judge's read.
  - `ai-drawn-svg-icons` 1/3: partially fixed (mascot reduced but a primitive-shape logo remained).
  - `modal-abuse-specimen` 1/3: settings stayed in a modal, just restyled.
- **Known harness artifact**: `gradient-hero-page` scored 0/5 with_skill on this backend because the model tried to run the skill's `detect` command (the SKILL.md instructs exactly that) and the eval harness target has no tools - the output was a tool-call-shaped preamble, not a rewrite. The same eval scored 4/5 on the zen backend where the model rewrote directly. This is the skill working against a harness that cannot execute tools; if tool execution matters, run the slop-kill proof locally instead (detector exit 1 -> fixed rewrite exit 0).

## vs the 12-eval gate

The original gate (BASELINE-v2.md, slop-kill + build-from-brief, +15pp) was measured on the zen backend with 12 evals and passed at +62.5pp. This run uses a different backend and a 46-eval slop-kill corpus; the gate families on DeepSeek: slop-kill + build-from-brief combined lift +72.4pp (with 147/168 = 87.5%, without 27/168 = 16.1%). The gate conclusion is unchanged and stronger.

## How to re-run

```bash
npm run eval   # default: DeepSeek API (agent-skills-eval.yaml); key in .eval-key.env or EVAL_API_KEY
```

Zen-free fallback: `OPENAI_COMPATIBLE_BASE_URL=https://opencode.ai/zen/v1 OPENAI_COMPATIBLE_MODEL=deepseek-v4-flash-free npm run eval` (zen stalls occasionally: no request timeout in the harness, two calls hung ~10h during the specimen run).
