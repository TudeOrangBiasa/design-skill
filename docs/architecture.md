# Architecture

The skill is a routing layer, a doctrine library, a deterministic detector, and a CLI, held together by one file: `SKILL.md`. Nothing ships as an MCP server or a daemon; every automation is a dependency-free Node script run per invocation.

## The layers

```
SKILL.md (the router)
  ├── invocation model: two ways in
  ├── routing table: sentence -> command chain
  ├── scope gate: boundary, complexity, dependency, persona, tool
  ├── bans: the negative space
  └── tooling doctrine: scripts/*.mjs, no servers
        │
        ├── reference/  (doctrine, loaded on demand by command)
        │     ├── foundation: modes, brand, product, doctrine, craft-floor
        │     ├── capabilities: colorize, typeset, layout, animate,
        │     │                 interaction, responsive, access, voice
        │     ├── procedures: audit, review, polish, checkup, smell,
        │     │               refine, overdrive, deslop
        │     ├── planning: build, craft, shape, init, setup, document,
        │     │             new-work, visualize, prompt-patterns
        │     └── surfaces: dashboards, performance, ui-checklist,
        │                   checklist-catalog, browser-layout
        │
        └── scripts/  (the CLI, one entry: design)
              ├── detector.mjs       42-rule design-smell scan
              ├── design.mjs         the dispatcher
              ├── live-*.mjs         browser variant iteration
              ├── concept-seed.mjs   anti-convergence dice
              ├── design-parser.mjs  DESIGN.md parsing
              ├── load-context.mjs   PRODUCT.md / DESIGN.md / brief.md
              ├── lint-docs.mjs      the corpus lint
              └── ...                pin, critique-storage, detect-csp
```

## The invocation model

Two skill types, two ways in.

- **Procedure** (audit, checkup, smell, polish, review, deslop, fix, refine): step sequences, invoked by the model on detection.
- **Ability** (colorize, typeset, layout, animate, interaction, responsive, access, live): capabilities, invoked by model or user.
- **Planning** (build, shape, craft, setup, init, redesign): interview first, 2-3 questions per round, every question carrying a recommendation, no code before the brief is confirmed.

The model-invoked path is the design reflex: UI in view during any session, flag visible tells in one line, run the detector for the mechanical half, verify visual state in the browser. Detection is ambient, not invoked; nothing changes until the user confirms.

## The routing table

Natural language maps to command chains. "This looks like AI made it" becomes `audit --smell` then `refine --deslop` then `refine --distill`. "Build me a landing page" becomes `build --init` then `build --shape` then `build --craft`. The full map is in [commands.md](commands.md).

## The scope gate

Five checks, enforced before any file touch: Boundary (matches the named surface? else BLOCK with in/out lists), Complexity (more than one feature? sequence), Dependency (unbuilt dep? redirect), Persona (violation? warn), Tool (auto-route). BLOCK stops.

## The doctrine library

Single source of truth, enforced by convention: when a rule belongs in one place, link to it, do not copy it. `reference/browser-layout.md` is the model: layout and responsive link to its sections instead of restating them. `craft-floor.md` owns the mechanics floor. `dashboards.md` owns decision surfaces. `performance.md` owns the responsiveness contract. `smell.md` owns the tells registry behind the detector.

The doc lint is the enforcement: no em dashes, no banned AI-prose phrases, every internal link must resolve. The skill polices its own prose with the same rules it administers.

## The detector

42 rules over HTML and CSS, run with no model and no API key: `node scripts/detector.mjs <file|dir|url> [--json]`. Severity error blocks shipping (exit 1); warnings and advisories inform. Full rule catalog: [detector.md](detector.md).

## The CLI

`design` is the single entry for the skill's scripts. Subcommands map one-to-one:

```bash
design detect <target>          # detector.mjs
design load-context             # load-context.mjs
design pin <pin|unpin> <cmd>    # pin.mjs
design seed --directions ...    # concept-seed.mjs
design live, live-status, live-complete, live-resume, live-poll, live-wrap
design critique-storage <cmd>   # critique-storage.mjs
design detect-csp               # detect-csp.mjs
```

Exit codes: 0 success, 1 findings or errors, 2 usage error.

## Reports and continuity

Reports land in `.design-skill/` at the project root. Live sessions journal to `.design/live/sessions/`. Critiques store to `.design/critique/`. Existing reports load before work: prioritize blockers, high-severity, repeated smells. A fixed issue stays fixed; regressions show as trends.
