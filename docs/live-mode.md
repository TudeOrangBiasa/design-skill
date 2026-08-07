# Live variant mode

The live family turns browser iteration into a human-in-the-loop protocol: select an element in the browser, pick a design action, get HTML and CSS variants hot-swapped, accept or discard. A durable journal makes every session resumable across agent restarts.

## The loop

1. `design live` prepares the session: checks the project config, starts or reuses the local server (port auto-picked from 8400, bound to localhost, token-authed), injects the browser script, and reads PRODUCT.md and DESIGN.md.
2. The browser shows a floating control (configure, generating, cycling). Selecting an element and an action (design, bolder, quieter, distill, polish, typeset, colorize, layout, adapt, animate, delight, overdrive) posts a `generate` event with the element context and a variant count (1-8).
3. `design live-poll` blocks for the next browser event and prints JSON. Accept and discard events auto-route to the deterministic accept script, which replaces the wrapper with the chosen variant, preserves CSS blocks, and refuses generated files.
4. `design live-complete` appends the durable acknowledgment.

## The journal

Session state lives in `.design/live/sessions/`:

- `<id>.jsonl`: the append-only event journal, the source of truth.
- `<id>.snapshot.json`: the materialized state, always rebuilt from the journal on read.

The state machine: `new` to `generate_requested` to `variants_ready` (or `carbonize_required`) to `accept_requested` or `discard_requested`, then terminal `discarded`, `completed`, or `agent_error`. Checkpoints are revision-guarded; a stale checkpoint is ignored, not applied. A corrupted journal line degrades to a diagnostic, never a crash.

Recovery: `design live-status` shows the server and active sessions; `design live-resume` reads the journal and prints the next safe agent action. Pending events carry a lease; if the agent dies mid-processing, the lease expires and the event becomes available again.

## Support scripts

- `design live-wrap`: find an element in source and wrap it in a variant container (one CLI replacing several tool calls).
- `design detect-csp`: classify the project's Content-Security-Policy shape so script injection stays compatible.
- `live-inject` and `live-server`: the script tag insertion and the local server; both are background machinery, not model-facing.

## Hardening

- Event ids are validated as `^[0-9a-f]{8}$` and variant ids as `^[0-9]{1,3}$`, so any value reaching a DOM selector or child process is inert by construction.
- Annotation uploads are capped at 10MB; annotations land at the project root so the agent's Read tool does not trip permission prompts.
- Live mode rewrites project files by design; the SKILL.md invocation model gates every change behind user confirmation, and `is-generated` detection refuses files that a build step regenerates.

## Caveats

The live family has integration coverage but no dedicated unit tests yet; the journal state machine (`applyEvent`, journal rebuild) is pure and is the highest-value target for the next test pass.
