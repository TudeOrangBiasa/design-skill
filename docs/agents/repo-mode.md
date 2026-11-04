# Repo mode

- **Mode:** `solo`
- **Solo:** the agent merges after the local verifier passes. No GitHub Actions, no waiting on `gh pr checks`. Trust the pre-push hook; run the verifier again right before `gh pr create`. Never skip the pre-push hook.
- **Team:** CI decides; required checks green before landing. Not this repo.

Verifier: [verifier.md](./verifier.md).
