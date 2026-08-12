# BASELINE-SPECIMENS — 61-eval scorecard on real slop corpus

The v2 skill measured against the expanded suite: 12 original evals + 11 real slop specimens from impeccable's antipattern-examples + 35 tell fragments from killaislop.com + 3 priority evals (imagery, icon sourcing, layout laws).

- Runs: 2026-08-11, `agent-design-skill` 2.0.0
- Backend: DeepSeek API (`https://api.deepseek.com`, `deepseek-v4-flash`, concurrency 4) - the default
- Reports: `eval-workspace/iteration-10/` (doctrine-changed, 7 API-terminated evals) and `eval-workspace/iteration-11/` (re-run, 7 API-terminated evals)
- API reliability: ~11% of with_skill calls returned "ERROR: terminated" (DeepSeek aborts on long reasoning + large output; the harness retries twice then fails). Terminated evals are excluded from the clean score; the priority evals each measured clean in at least one run.

## Clean score (terminated evals excluded)

iteration-11 (re-run):

| | with_skill | without_skill | Lift |
|---|---|---|---|
| **Total** | **160/180 (88.9%)** | **26/180 (14.4%)** | **+74.4pp** |

iteration-10 (first doctrine run): with 164/189 (86.8%), without 37/189 (19.6%), +67.2pp. Stable across both runs: with-skill ~87-89%, lift ~+67 to +74pp.

## The priority evals (post-doctrine additions)

| Eval | Measures | Result |
|---|---|---|
| `build-imagery-1` | image-led brief ships real imagery, not colored divs/placeholders | **5/5** with (iter-10; iter-11 API-terminated) |
| `deslop-icons-1` | icons from a real set / consistent geometry, no mascots, no emoji | **5/5** with, **0/5** without (both runs) |
| `layout-laws-1` | layout structure named in one sentence; dense app shell; Hick's/Fitts/Von Restorff; no #6366F1 / equal cards | **5/5** with (iter-11; iter-10 API-terminated) |

The doctrine changes that drove these: SKILL.md's always-loaded **Build doctrine** (layout positive-space, icons one-real-set-no-mascots, imagery real/verified, OKLCH-first, font physical-object, reference hunt) plus the craft.md Reference-hunt step, audit.md layout dimension, and the 3 new evals. The icons eval is the clearest proof: before the doctrine, `slop-kill-ai-drawn-svg-icons` scored 1/3 (the model hand-drew a mascot); after, `deslop-icons-1` is 5/5 vs 0/5 without the skill.

## The slop-kill corpus, tell by tell (clean, combined runs)

- **Impeccable specimens (11)**: purple-gradients 5/5, lazy-impact 5/5, cardocalypse 3/3, thick-border 3/3, massive-icons 3/3, bad-contrast 3/3, redundant-ux 3/3, inter-everywhere 3/3, lazy-cool 4/4, modal-abuse 0/3 (settings stay in a modal - honest miss), layout-templates terminated both runs (unmeasured, API).
- **Killaislop tells (35)**: the overwhelming majority pass clean. Known honest misses: `invented-stat-row` (model kept the fake number), `modal-abuse`, `editorial-dashboard` (partial). Warm-cozy 3/3 (fixed vs the prior run's 0/3).
- **Original 3**: gradient-hero 4/5, new-slop-tells 5/5, copy-voice 3/4.

## vs the 12-eval gate

The original +15pp gate (BASELINE-v2.md) is superseded: the 61-eval corpus with the doctrine change shows with-skill ~88% vs without ~14-20%, lift +67-74pp on the full real-slop corpus. The gate conclusion holds and is stronger.

## How to re-run

```bash
npm run eval   # default: DeepSeek (agent-skills-eval.yaml); key in .eval-key.env or EVAL_API_KEY
```

~11% of calls may hit "ERROR: terminated" (DeepSeek abort on long reasoning/output); re-run to measure the failed evals, or accept the clean-excluded number. Zen-free fallback: `OPENAI_COMPATIBLE_BASE_URL=https://opencode.ai/zen/v1 OPENAI_COMPATIBLE_MODEL=deepseek-v4-flash-free npm run eval`.
