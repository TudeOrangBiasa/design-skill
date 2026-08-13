# BASELINE-v2 — agent-skills-eval scorecard (after refactor)

> **SUPERSEDED (2026-08-13).** This is the 12-eval v2 gate from 2026-08-11.
> The current scorecard is 66 evals, kept in
> [evals/BASELINE-SPECIMENS.md](BASELINE-SPECIMENS.md): with_skill
> **223/239 (93.3%)** vs without_skill 64/239 (26.8%), lift **+66.5pp**
> (`agent-design-skill` 2.1.0, backend opencode go). The gate below was
> PASSED at +62.5pp and is kept as the historical v1->v2 record.

Run against the **v2 skill** (`agent-design-skill` 2.0.0, commit `4a23e73`).

- Date: 2026-08-11
- Backend: opencode zen free API (`https://opencode.ai/zen/v1`), target + judge `deepseek-v4-flash-free`
- Config: `agent-skills-eval.yaml` (12 evals, `baseline: true`, concurrency 2, strict)
- Report: `eval-workspace/iteration-3/report/index.html`
- Benchmark: `eval-workspace/iteration-3/benchmark.json`

## Results

Assertion-level pass counts (with_skill = v2 SKILL.md in context; without_skill = baseline):

| Family | Eval | with_skill | without_skill | v1 with_skill |
|---|---|---|---|---|
| slop-kill | gradient hero page | **4/5** | 0/5 | 0/5 |
| slop-kill | new-slop tells | **5/5** | 0/5 | 0/5 |
| slop-kill | copy voice | 2/4 | 0/4 | 2/4 |
| build-from-brief | dashboard | **4/5** | 5/5 | 2/5 |
| build-from-brief | landing | **4/5** | 3/5 | 0/5 |
| redesign | make it bolder | 2/4 | 0/4 | 4/4 |
| audit | two axes | **2/5** | 0/5 | 0/5 |
| audit | honesty | **3/4** | 1/4 | 0/4 |
| a11y | contrast and targets | 3/4 | 0/4 | 4/4 |
| a11y | semantics | 2/4 | 0/4 | 3/4 |
| deslop | targeted fix | **3/4** | 0/4 | 0/4 |
| shape | grill before building | **5/5** | 3/5 | 2/5 |
| **Total** | | **39/54 (72.2%)** | **11/54 (20.4%)** | 17/54 (31.5%) |

Lift vs baseline: **+51.9pp** aggregate (harness mean-based summary: with 71.3% vs without 20.4%, Δ +50.8pp).

## Acceptance gate (slop-kill + build-from-brief, with_skill)

| Family | v1 | v2 | Delta |
|---|---|---|---|
| slop-kill (3 evals) | 2/14 (14.3%) | **11/14 (78.6%)** | **+64.3pp** |
| build-from-brief (2 evals) | 2/10 (20.0%) | **8/10 (80.0%)** | **+60.0pp** |
| Combined (5 evals) | 4/24 (16.7%) | **19/24 (79.2%)** | **+62.5pp** |

Gate: >= +15pp. Result: **+62.5pp. PASS.**

## What the scorecard says

- **The skill now kills slop.** gradient-hero 0/5 -> 4/5, new-slop-tells 0/5 -> 5/5 with_skill; both stay 0/5 without. The 10-tell table with positive direction beats the v1 30-item bans list, which changed nothing.
- **Builds stopped regressing.** v1 made build-from-brief worse than baseline (6/10 without -> 2/10 with). v2 builds at 8/10 with, matching or beating baseline.
- **Grilling works.** shape-grill went 2/5 -> 5/5: frontier rounds with recommendations, no assumed answers, no code before the brief.
- **Two-axis audit is teachable.** audit-report-two-axes 0/5 -> 2/5; honesty 0/4 -> 3/4 (v2 states "no spec available" instead of inventing one).
- **Known regressions.** redesign-make-it-bolder 4/4 -> 2/4 and a11y 4/4/3/4 -> 3/4/2/4: the eval prompts do not invoke the skill's flags, and v2's SKILL.md carries the tells, not the full bolder/a11y playbooks (those live in reference/audit.md + craft-floor.md, loaded on command). Acceptable: the gate families are slop-kill + build-from-brief; the playbooks are one flag away in real use.

## How to re-run

```bash
npm run eval            # default: opencode go (agent-skills-eval.yaml); key in .eval-key.go.env
npm run eval:zen        # free tier: opencode zen (429s after a few heavy calls - spot runs only)
npm run eval:deepseek   # paid direct: DeepSeek API; key in .eval-key.env
```

Env overrides: `OPENAI_COMPATIBLE_BASE_URL` / `OPENAI_COMPATIBLE_MODEL` / `OPENAI_COMPATIBLE_API_KEY` (or export `EVAL_API_KEY` directly).
