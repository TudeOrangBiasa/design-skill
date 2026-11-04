# Verifier

Solo gate for this repo. Replaces GitHub Actions.

## Command

```bash
bash scripts/verify.sh
```

Prints `verify: all gates passed` and exits 0 when every step passes. Any red step stops the run with a nonzero exit.

## Steps

1. `npm test` (node --test)
2. `npm run lint:docs`
3. `npm run validate-catalog`
4. `npm run validate-evals`
5. SkillSpector scan, no LLM, baseline `.skillspector-baseline.yaml` (skipped with a note when not installed)
6. CLI smoke: `skills/verify-design-skill/scripts/smoke.sh` (skip with `VERIFY_SKIP_SMOKE=1`)

Hook: `.githooks/pre-push`, installed with `scripts/ensure-worktree-hooks`.

## Who runs it

- **pre-push hook** on every push. New worktrees: `scripts/ensure-worktree-hooks --worktree <path>`, then `--check`.
- **the agent**, again, right before `gh pr create`. Paste the real output in the PR body.
- App-driving proof beyond the gate: `skills/verify-design-skill/`.

Never skip the pre-push hook. Merges trust this gate; no GitHub status check is required.
