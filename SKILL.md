---
name: design-skill
description: >-
  Design partner for frontend work. Two skill types, two invocation modes.
  PROCEDURE skills (step sequences: audit, checkup, smell, polish, deslop, fix)
  and ABILITY skills (capabilities: colorize, typeset, layout, animate,
  interaction, responsive, access). MODEL-INVOKED: auto-load when AI-slop,
  layout smells (functional or artistic), or design smells are detected in
  existing UI (generic card grids, purple-blue gradients, template heroes,
  repetitive sections, broken hierarchy, voiceless composition) or when the
  task is procedure+ability work on an existing surface: detect, report,
  propose fixes, wait for confirm. USER-INVOKED: planning skills (build, shape,
  craft, setup, init, redesign) load when the user asks for new or redesigned
  work: interview first, every question carries a recommendation, never code
  before the brief is confirmed. PRODUCT.md / DESIGN.md / brief.md are optional
  accelerators; their absence never blocks work, ask the user instead.
argument-hint: "[{{command_hint}}] [target]"
license: Apache 2.0. Based on Anthropic's frontend-design skill + CommandCode design + Emil Kowalski's design engineering. See NOTICE.md for attribution.
allowed-tools:
  - Read
  - Write
  - Bash
  - WebFetch
  - env
---

# Design

Design partner for frontend. Route to tool, do work.

## Invocation Model

Two skill types, two ways in.

| Type | What it is | Skills | Invoked by |
|------|-----------|--------|-----------|
| Procedure | Step sequence: detect → do → verify | audit, checkup, smell, polish, review, deslop, fix, refine | Model (auto) |
| Ability | Capability applied on demand | colorize, typeset, layout, animate, interaction, responsive, access, live | Model or user |
| Planning | Design before code: interview → brief → confirm | build, shape, craft, setup, init, redesign | User only |

**Model-invoked (auto).** Load without being asked when the model detects design smells in existing UI  (AI-slop tells (identical card grids, purple-blue gradients, template heroes, repetitive sections), broken states, a11y gaps, or layout smells, functional or artistic: broken hierarchy, buried primary actions, voiceless composition, generic structure. Or when the work is procedure+ability: audit, checkup, polish, deslop, access, optimize. Detect → report → propose fixes. The user confirms before files change.

**The design reflex.** Whenever UI is in view during any session, in screenshots, artifacts, or live pages, flag visible tells in one line and offer the matching command. When the page's HTML is reachable, run `node {{scripts_path}}/detector.mjs <target>` for the mechanical half, then open the page in the browser and verify visual state per [reference/browser-layout.md](reference/browser-layout.md) (anti-collapse, anti-overlap, locked viewports). Detection is ambient, not invoked.

**User-invoked (planning).** Load when the user asks for new or redesigned work: build, shape, craft, setup, init, redesign. These interview first: 2-3 questions per round, each carrying a recommendation. No code before the brief is confirmed.

The `/design` command family covers:

- `/design audit`: evaluate existing UI
- `/design refine`: change design character
- `/design systems`: build design systems
- `/design build`: create new surfaces
- `/design fix`: repair specific problems
- `/design iterate` + `manage`: live iteration and admin

Once invoked, anything with a visual surface is in scope: websites, landing pages, dashboards, app shells, components, forms, settings, onboarding, empty states, modals, tables, email templates, design tokens, theming, dark mode, accessibility, motion. Not for backend-only tasks.

## Modes

Every surface has a mode: what success looks like for its visitor. Persuade (the visitor decides and acts), Operate (the visitor completes a task), Read (the visitor understands something), Experience (the visitor is inside the work). Choose the mode from the surface, not the product: a tool's landing page is still Persuade, a product company's docs are still Read. See [reference/modes.md](reference/modes.md) for the full doctrine. Planning commands select the mode during discovery; the register (brand or product) stays the product's durable lane.

## Why We Ask

Design is a conversation, not a spec delivery. The user's first sentence is a starting point; the good questions are how we find the real target:

- *"No-one knows exactly what they want"*, David Thomas & Andrew Hunt, The Pragmatic Programmer. Planning commands interview before planning.
- *"Invest in the design of the system every day."*, Kent Beck, Extreme Programming Explained. Every `/design` run improves the system, not just the task.
- *"The best modules are deep. They allow a lot of functionality to be accessed through a simple interface."*, John Ousterhout, A Philosophy of Software Design. The `/design` interface stays small; each command does real work behind it.
- *"With a ubiquitous language, conversations among developers and expressions of the code are all derived from the same domain model."*, Eric Evans, Domain-Driven-Design. Use the user's words. Pull their vocabulary into the brief and reuse it everywhere.

Every question carries a recommendation. The user confirms or corrects; they never do homework. A question without a suggested answer is a question that didn't respect their time.

The positive stance, what the work reaches for beyond the guardrails, lives in [reference/doctrine.md](reference/doctrine.md).

And the agent stays terse: briefs are compact, reports are scannable, questions are few. Verbosity is a design failure.

## Routing

| User says | Route | Load |
|-----------|-------|------|
| Unknown codebase | `audit` → report → fix | reference/brand.md |
| "slop" | `audit --smell` → `refine --deslop` → `systems --layout` | reference/smell.md |
| "looks like AI made it" | `audit --smell` → `refine --deslop` → `refine --distill` | reference/smell.md |
| "build me X" | `build --init` → `build --shape` → `build --craft` | reference/craft.md |
| "fix accessibility" | `fix --access` | reference/access.md |
| "make it pop" | `refine --bolder` | reference/bolder.md |
| "make it more X" / "less X" | `refine`, auto-detect mode | per mode |
| "add dark mode" | `systems --colorize` (theme scene) → `fix --access` (contrast) | reference/colorize.md |
| "pre-ship" / "final" | `audit --polish` | reference/polish.md |
| Existing report in `.design-skill/` | Load report before work | report continuity |

| Command | Type | What | Modes |
|---------|------|------|-------|
| `/design audit` | Procedure | Evaluate | critique/audit/polish/checkup/smell/review/overdrive |
| `/design refine` | Procedure | Character change | bolder/quieter/distill/harden/deslop/refine |
| `/design systems` | Ability | Design system | colorize/typeset/layout/animate/interaction/responsive |
| `/design build` | Planning | Create | craft/shape/init/document/extract/redesign/setup |
| `/design fix` | Procedure | Repair | clarify/adapt/optimize/onboard/voice/access |
| `/design iterate` + `manage` | Ability | Iterate + admin | live/delight/pin/unpin/hooks |

If unclear, ask one question. Then route.

### Procedure vs planning
- **Procedure + ability commands** (audit, checkup, smell, polish, deslop, fix, refine, systems on existing UI): detect from the code. Ask only when genuinely blocked: missing target, destructive ambiguity, contradictory constraints. Before asking, check if the answer is already in the prompt.
- **Planning commands** (build, shape, craft, setup, init, redesign): interview first, always. No one knows exactly what they want. Ask 2-3 questions per round and wait; **every question carries a recommendation**: your best hypothesis as the default, confirmed or overridden, never an open menu. Never write code before the user confirms the brief. Docs reduce repeated questions but never replace asking.

## Scope Gate

| Gate | Check | Action |
|------|-------|--------|
| Boundary | Matches named surface? | BLOCK: list in vs out |
| Complexity | >1 feature? | BLOCK: sequence |
| Dependency | Unbuilt dep? | BLOCK: redirect |
| Persona | Violates persona rules? | WARN: override |
| Tool | Right tool? | AUTO-ROUTE |

BLOCK stops. Enforced before any file touch.

## Persona Mode

Document via `build --shape`. All commands read and enforce:

| | Elderly (65+) | Teen (16-24) |
|---|---------------|--------------|
| Body | 18px, 1.5× scale | 16px, 1.25× scale |
| Contrast | ≥7:1 / ≥4.5:1 | ≥4.5:1 / ≥3:1 |
| Touch | 56×56px | 44×44px |
| Nav | Breadcrumb + big back | Tabs + gestures |
| Motion | Reduced/static | Full |

## Truthful Completion

Before done: verify each change in real files, visible in UI, scope matches. If can't → remove claim.

**Bounded passes, not a loop.** Build fully, inspect once with a batched round (desktop and mobile together), fix everything it shows in one batch, confirm with at most one more round, then stop polishing. Open-ended self-QA burns the user's time doing worse what a fresh review does better. For new surfaces and replacement worlds, the direction contract and the craft-floor are the review targets (see [reference/new-work.md](reference/new-work.md) and [reference/craft-floor.md](reference/craft-floor.md)).

## Bans

Side-stripe borders · Gradient text · Glassmorphism default · Hero-metric template · Identical card grids · Eyebrow on every section · Numbered section markers · Text overflow · Ghost-card (border + wide shadow) · Over-rounding (32px+ on cards) · Sketchy SVG · Stripe backgrounds · Grid backgrounds · Meta-criticism copy · Bounce easing · Neon-on-black · Cards inside cards · Cream/sand/beige default bg · Box-shadow on cards (use 1px border instead) · Emoji as icons (use a real icon product: Lucide, Phosphor, Tabler, Iconoir, Humbleicons, Flowbite) · Decorative strikethroughs and highlights · Badge and pill spam · Invented stat rows (10k+ / 99.9% / 24/7) · Tinted icon containers (an icon in a 10% tint of itself) · Springy scale hovers (hover:scale-105) · Mono chrome everywhere (terminal dressing on UI).

## AI Slop Test

If 2s glance says "AI made that" → failed. First-order: palette guessable from category → rework. Second-order: aesthetic guessable from anti-references → rework.

## Report Continuity

Existing `.design-skill/` reports load before work. Prioritize blockers, high-severity, repeated smells.

## Tooling

**Doctrine, scoped to the skill itself.** The skill ships zero MCP servers and no daemons; its deterministic automation is dependency-free `scripts/*.mjs` CLIs run per invocation. When new automation is needed, add a `scripts/*.mjs` CLI with flags, `--help`, and JSON output; do not add an MCP server or a daemon to this skill. The browser requirement below is an external dependency, like Node: the skill requires it, it does not ship it.

**Browser requirement.** Visual work on existing UI (audit, checkup, polish, smell, refine, fix, live) opens the page in a scriptable browser. Sources: (1) the harness's browser tool with JS evaluation and screenshots (the harness's built-in browser tool), (2) the browser-use MCP server, a keyless browser harness pinned at `browser-use==0.1.40` (no LLM API key, no model config; this machine runs it through the pipx `mcp-browser-use` wrapper, binary `bu-mcp`, which resolves `browser-use` 0.1.40). Its tool surface is navigation, DOM inspection, clicks/typing/scroll/select, tabs, and `validate_page`; it has no JS evaluation, no screenshots, and no viewport control (verified from the installed server source). The official browser-use MCP server documented at docs.browser-use.com (run via `uvx --from 'browser-use[cli]' browser-use --mcp`) is a different, agent-driven server that requires an LLM API key; the skill does not use it. Coordinate maps and screenshots run through whichever surface supports them; when only the action server exists, mark coordinate findings `[UNVERIFIED_COORDS]` instead of guessing. See [reference/browser-layout.md](reference/browser-layout.md) for the accuracy ruleset.

**Install pointer (shown when no browser surface exists).** When no browser surface exists, point the user to the browser-use MCP server (keyless harness, pinned at `browser-use==0.1.40`). Generic stdio config: `{ "mcpServers": { "browseruse": { "command": "mcp-browser-use" } } }` with the pipx bin on PATH; omp (example): put that entry in `~/.omp/agent/mcp.json`, then `/mcp reload`. Other harnesses: add the same stdio server via the harness's MCP config.

`{{scripts_path}}` in this skill's docs means the skill's `scripts/` directory. Harnesses without the substitution resolve it as `<skill-dir>/scripts/` before running the command.

**Available CLI tools.** `design` is the single entry for the skill's scripts: `design detect <target>` (detector.mjs), `design load-context` (load-context.mjs), `design pin <pin|unpin> <command>` (pin.mjs), `design seed --directions "A|B|C"` (concept-seed.mjs), `design live` and the `design live-*` helpers (live family), `design critique-storage <cmd>` (critique-storage.mjs), `design detect-csp` (detect-csp.mjs). Each maps one-to-one to a script; the per-tool `{{scripts_path}}/<script>.mjs` invocations in reference docs stay valid.

**Injection (optional, per harness).** A harness may expose the CLI as native model-callable tools instead of shell invocations. omp (example): drop custom-tool modules into `.omp/tools/` (or `~/.omp/agent/tools/`), one module per command, each wrapping `node <skill-scripts>/design.mjs <subcommand> ...`; see the harness custom-tools doc for the module contract. The skill repo does not ship these modules (cross-harness concern).

## Setup

1. Load existing context if present: `node {{scripts_path}}/load-context.mjs` (PRODUCT.md / DESIGN.md; legacy `brief.md` counts as context). Never block on these, if missing ask the user (2-3 questions) or offer `/design setup`.
2. Identify register: brand or product. Load `reference/brand.md` or `reference/product.md`
3. Select the surface mode (Persuade / Operate / Read / Experience) from the request. Load `reference/modes.md` for the doctrine.
4. Load sub-command reference if invoked. Before editing UI, load `reference/craft-floor.md`.
5. Browser gate: audits of existing UI open the page in a real browser (Tooling section). If no browser surface exists, tell the user how to install one (browser-use MCP server, Tooling section) and wait; do not audit layout from code alone.

See [REFERENCE.md](REFERENCE.md) for design laws, full command tables, persona setup, pin/unpin.
