# BASELINE-v1 — agent-skills-eval scorecard (before refactor)

Run against the **unmodified v1** skill (`agent-design-skill` 1.0.26, commit `e868325`).

- Date: 2026-08-11
- Backend: opencode zen free API (`https://opencode.ai/zen/v1`), target + judge `deepseek-v4-flash-free`
- Config: `agent-skills-eval.yaml` (12 evals, `baseline: true`, concurrency 2, strict)
- Report: `eval-workspace/iteration-1/report/index.html`
- Benchmark: `eval-workspace/iteration-1/benchmark.json`

## Results

Assertion-level pass counts (with_skill = SKILL.md in context; without_skill = baseline):

| Family | Eval | with_skill | without_skill |
|---|---|---|---|
| slop-kill | gradient hero page | 0/5 | 0/5 |
| slop-kill | new-slop tells | 0/5 | 0/5 |
| slop-kill | copy voice | 2/4 | 0/4 |
| build-from-brief | dashboard | 2/5 | 4/5 |
| build-from-brief | landing | 0/5 | 2/5 |
| redesign | make it bolder | 4/4 | 0/4 |
| audit | two axes | 0/5 | 0/5 |
| audit | honesty | 0/4 | 2/4 |
| a11y | contrast and targets | 4/4 | 0/4 |
| a11y | semantics | 3/4 | 0/4 |
| deslop | targeted fix | 0/4 | 0/4 |
| shape | grill before building | 2/5 | 3/5 |
| **Total** | | **17/54 (31.5%)** | **11/54 (20.4%)** |

Lift: **+11.1pp** aggregate (harness mean-based summary: with 33.8% vs without 19.2%, Δ +14.6pp).

## Acceptance-family numbers (gate for v2)

The v2 gate measures with_skill pass rate on the slop-kill + build-from-brief families vs this baseline:

- slop-kill (3 evals): **2/14 (14.3%)** with_skill
- build-from-brief (2 evals): **2/10 (20.0%)** with_skill
- Combined (5 evals): **4/24 (16.7%)** with_skill — v2 must reach ≥ **31.7%** (+15pp)

## Findings that motivate v2

- The v1 skill **hurts builds**: build-from-brief drops 6/10 → 2/10 when SKILL.md is loaded.
- slop-kill gradient/new-slop: **0/5 both sides** — the 30-item Bans list does not kill slop (banned patterns still appear).
- audit-report-two-axes 0/5 with_skill: v1 has no two-axis structure, the judge looks for one.
- shape-grill 2/5 with_skill: v1 asks questions but does not run frontier rounds with recommendations.

## How to re-run

```bash
npm run eval   # reads agent-skills-eval.yaml; EVAL_API_KEY from .eval-key.env or env
```

Env overrides: `OPENAI_COMPATIBLE_BASE_URL` / `OPENAI_COMPATIBLE_MODEL` / `OPENAI_COMPATIBLE_API_KEY` (or export `EVAL_API_KEY` directly). To create `.eval-key.env`: `cp .eval-key.env.example .eval-key.env` and fill in the key (opencode zen key from `~/.omp/agent/agent.db`, table `auth_credentials`, provider `opencode-zen`).
