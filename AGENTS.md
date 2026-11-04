# Agent guide

## Verification gate (solo, local verifier)

No GitHub Actions. The gate is `bash scripts/verify.sh` ([docs/agents/verifier.md](docs/agents/verifier.md), mode in [docs/agents/repo-mode.md](docs/agents/repo-mode.md)). The pre-push hook runs it on every push; run it again before `gh pr create` and paste the real output in the PR body. Never skip the pre-push hook. New worktrees: `scripts/ensure-worktree-hooks --worktree <path>`. Merge once the verifier passed at the PR head; do not wait on GitHub checks. App-driving proof: `skills/verify-design-skill/`.
