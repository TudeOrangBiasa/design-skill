# Commands

The skill's commands, invoked as `/design <command>` or routed from plain words. The mode is the flag after the command name.

## Routing map

| User says | Route | Playbook |
|-----------|-------|----------|
| Unknown codebase | `audit` then report then fix | reference/brand.md |
| "slop" | `audit --smell` then `refine --deslop` then `systems --layout` | reference/smell.md |
| "looks like AI made it" | `audit --smell` then `refine --deslop` then `refine --distill` | reference/smell.md |
| "build me X" | `build --init` then `build --shape` then `build --craft` | reference/craft.md |
| "fix accessibility" | `fix --access` | reference/access.md |
| "make it pop" | `refine --bolder` | reference/bolder.md |
| "make it more X" / "less X" | `refine`, auto-detect mode | per mode |
| "add dark mode" | `systems --colorize` then `fix --access` | reference/colorize.md |
| "pre-ship" / "final" | `audit --polish` | reference/polish.md |

## /design audit: evaluate

| Mode | What | When |
|------|------|------|
| `--critique` | UX judgment with heuristic scoring | Aesthetics and taste review |
| `--audit` | Technical quality: a11y, perf, responsive | Production readiness |
| `--polish` | Final pre-ship pass | Before deploy |
| `--checkup` | Health scan with traffic-light scores | Unknown codebase, first pass |
| `--smell` | AI-tells catalog | Slop detection |
| `--review` | Design review with scoring | Thorough critique |
| `--overdrive` | Push past conventional limits | When safe is not enough |

## /design refine: change character

| Mode | What |
|------|------|
| `--bolder` | Amplify safe or bland designs |
| `--quieter` | Tone down aggressive designs |
| `--distill` | Strip to essence |
| `--harden` | Edge cases, i18n, error states |
| `--deslop` | Remove AI-generated tells |
| `--refine` | Change design character |

## /design systems: build the system

| Mode | What |
|------|------|
| `--colorize` | Color palette and roles in OKLCH |
| `--typeset` | Typography system |
| `--layout` | Spacing, rhythm, hierarchy |
| `--animate` | Motion system |
| `--interaction` | States, behavior, affordances |
| `--responsive` | Multi-screen orchestration |

## /design build: create

| Mode | What |
|------|------|
| `--craft` | Feature end to end |
| `--shape` | UX plan before code |
| `--init` | Project context setup |
| `--document` | Generate DESIGN.md (google-labs spec) |
| `--extract` | Pull tokens and components |
| `--redesign` | Complete visual transformation |
| `--setup` | Project brief context |

## /design fix: repair

| Mode | What |
|------|------|
| `--clarify` | UX copy, labels, errors |
| `--adapt` | Responsive adaptation |
| `--optimize` | UI performance |
| `--onboard` | First-run flows, empty states |
| `--voice` | Brand identity, art direction |
| `--access` | Accessibility: screen reader, WCAG, contrast, font scaling, voice nav |

## /design iterate and manage

| Mode | What |
|------|------|
| `--live` | Browser iteration with hot reload |
| `--delight` | Micro-interactions, personality |
| `--pin`, `--unpin`, `--hooks` | Shortcuts and auto-detection |

## The planning contract

Planning commands (build, shape, craft, setup, init, redesign) interview first, always. Two or three questions per round, every question carrying a recommendation. Never an open menu, never code before the brief is confirmed. The register (brand or product) is the durable lane; the mode is per-surface.
