<p align="center">
  <img src="assets/banner.png" alt="design-skill" width="100%">
</p>

# Design Skill

Every AI-generated interface has a tell. The identical card grid. The purple-blue gradient. The hero that reads like a template. Two seconds of looking and you know a model made it. This skill exists to make that reaction impossible.

New here? Start with [Using the Design Skill](GUIDE.md), a walkthrough of the skill in practice.

## The story

The skill is a merger of three projects, each of which solved one piece of the problem.

[impeccable](https://github.com/pbakaus/impeccable) by Paul Bakaus knew how to route design work. Twenty-two commands, a setup flow, and a list of patterns to never ship. [Emil Kowalski's design engineering](https://animations.dev/) knew how motion should feel. When to animate, which easing to use, how fast, and why spring physics beats a default curve. CommandCode design knew how to build visual systems. Color roles, type hierarchy, layout rhythm, interaction states, responsive behavior, and a report workflow that turns review into fixes.

Each source was strong where the others were silent. Merged, they cover each other's gaps. The result is one design partner for frontend interfaces, from first question to final polish.

## Two kinds of design work, two ways to start

**Procedure work starts with detection.** Audit a page, check accessibility, catalog AI tells, remove slop. The model can start this on its own. When it spots a smell in an existing interface, the skill loads itself, reports what it found, and proposes fixes. The user confirms before files change.

**Planning work starts with questions.** Build a new dashboard, redesign a landing page, shape a feature from scratch. No one knows exactly what they want, write David Thomas and Andrew Hunt in The Pragmatic Programmer. So planning commands interview first. Two or three questions per round, each with a recommendation attached. The user confirms or corrects, and nothing is built until the direction is agreed.

This split is the skill's invocation model.

| Type | Skills | Invoked by |
|------|--------|-----------|
| Procedure | audit, checkup, smell, polish, deslop, fix, refine | Model, on detection |
| Ability | colorize, typeset, layout, animate, interaction, responsive, access, live | Model or user |
| Planning | build, shape, craft, setup, init, redesign | User only |

## Just say what you want

You do not need to memorize flags. Say what is wrong or what you want in plain words. The skill reads the situation and picks the right tool.

| You say | What happens |
|---------|-------------|
| "This looks like AI made it" | It catalogs the AI tells, then strips them |
| "Make this bolder" | It amplifies the design's character |
| "The layout is a mess, everything overlaps" | It finds the smells, removes the bloat, rebuilds the rhythm |
| "Fix the accessibility" | It checks WCAG and adds keyboard, screen reader and contrast support |
| "Build me a landing page" | It asks a few questions, confirms the direction, then builds |
| "Add dark mode" | It builds the color system first, then applies it |
| "Pre-ship check" | It runs the final polish pass |
| "I don't know this codebase" | It runs a health scan and reports what needs fixing |

## How it routes

Each sentence maps to a `/design` command behind the scenes. "This looks like AI made it" becomes `audit --smell`, then `refine --deslop`. You never have to know that mapping. When you want to name the command yourself, type `/design` plus the mode, like `/design audit --checkup`. Both paths do the same work.

## Command reference

For the curious, the full command set. Each command has modes, and the mode is the flag after the command name.

### /design audit: evaluate

| Mode | What | When |
|------|------|------|
| `--critique` | UX judgment with heuristic scoring | Aesthetics and taste review |
| `--audit` | Technical quality: a11y, perf, responsive | Production readiness |
| `--polish` | Final pre-ship pass | Before deploy |
| `--checkup` | Health scan with traffic-light scores | Unknown codebase, first pass |
| `--smell` | AI-tells catalog | Slop detection |
| `--review` | Design review with scoring | Thorough critique |
| `--overdrive` | Push past conventional limits | When safe is not enough |

### /design refine: change character

| Mode | What |
|------|------|
| `--bolder` | Amplify safe or bland designs |
| `--quieter` | Tone down aggressive designs |
| `--distill` | Strip to essence |
| `--harden` | Edge cases, i18n, error states |
| `--deslop` | Remove AI-generated tells |
| `--refine` | Change design character |

### /design systems: build the system

| Mode | What |
|------|------|
| `--colorize` | Color palette and roles in OKLCH |
| `--typeset` | Typography system |
| `--layout` | Spacing, rhythm, hierarchy |
| `--animate` | Motion system |
| `--interaction` | States, behavior, affordances |
| `--responsive` | Multi-screen orchestration |

### /design build: create

| Mode | What |
|------|------|
| `--craft` | Feature end to end |
| `--shape` | UX plan before code |
| `--init` | Project context setup |
| `--document` | Generate DESIGN.md in Google Stitch format |
| `--extract` | Pull tokens and components |
| `--redesign` | Complete visual transformation |
| `--setup` | Project brief context |

### /design fix: repair

| Mode | What |
|------|------|
| `--clarify` | UX copy, labels, errors |
| `--adapt` | Responsive adaptation |
| `--optimize` | UI performance |
| `--onboard` | First-run flows, empty states |
| `--voice` | Brand identity, art direction |
| `--access` | Accessibility: screen reader, WCAG, contrast, font scaling, voice nav |

### /design iterate and manage

| Mode | What |
|------|------|
| `--live` | Browser iteration with hot reload |
| `--delight` | Micro-interactions, personality |
| `--pin`, `--unpin`, `--hooks` | Shortcuts and auto-detection |

## Real flows

**"This layout is a mess, everything overlaps"**

The skill works through three steps.

1. Find the smells. (the `audit --smell` mode)
2. Remove the AI-generated bloat. (`refine --deslop`)
3. Rebuild the spacing and rhythm. (`systems --layout`)

**"Build a SaaS dashboard from scratch for elderly users"**

1. Set up project context. (`build --init`)
2. Document the elderly persona: bigger type, larger touch targets. (`build --shape`)
3. Build the dashboard. (`build --craft`)
4. Create a high-contrast palette. (`systems --colorize`)
5. Check WCAG compliance. (`fix --access`)

**"Add disability features to an existing app"**

1. Add screen reader, high contrast, font scaling and voice nav support. (`fix --access`)
2. Harden the edge cases. (`refine --harden`)

**"This looks like AI designed it"**

1. Catalog the AI tells. (`audit --smell`)
2. Remove them one by one. (`refine --deslop`)
3. Strip the generic patterns. (`refine --distill`)

## Design laws in brief

### Color
- **OKLCH only.** Never #000 and #fff. Tint neutrals toward the brand hue.
- **4 commitment levels:** Restrained, Committed, Full palette, Drenched.
- **60-30-10 rule:** 60% primary, 30% secondary, 10% accent.

### Typography
- Body measure 60-76ch, 1.25x scale ratio minimum.
- 3-level hierarchy: Hook, Bridge, Detail.
- System fonts are legitimate. Don't reach for Inter by reflex.

### Layout
- **1-4-9 rhythm.** Every spacing decision is a multiple of 4px, 16px, or 36px.
- **3-plane depth:** Background, Content, Attention.
- **Cards are lazy.** Use them only for genuinely discrete content. No nested cards.

### Motion
- **Animation Decision Framework:** four questions. Should it animate, what purpose, which easing, how fast.
- UI under 300ms. Ease-out for entry, ease-in-out for movement.
- Animate only transform and opacity. Never layout.

### Interaction
- **9 states of being:** Idle, Hover, Active, Focused, Loading, Empty, Error, Disabled, Overflow.
- Touch targets 44x44px minimum, 56x56px for elderly users.
- Focus rings 2-3px with 3:1 contrast. Never `outline: none`.

### Responsive
- **Viewport gauntlet:** 320, 375, 768, 1024, 1440, 2560px.
- Container queries, not page queries. Input mode detection.
- Never amputate a feature for mobile.

### Copy
- One verb per button. Errors are recovery paths. Empty states teach.
- No em dashes, no exclamation points, sentence case.

## Bans (never generate)

Side-stripe borders · Gradient text · Glassmorphism as default · Hero-metric template · Identical card grids · Eyebrow on every section · Numbered section markers · Text overflow · Ghost-card (border and wide shadow) · Over-rounding (32px+ on cards) · Sketchy SVG illustrations · Stripe backgrounds · Grid backgrounds · Meta-criticism copy · Bounce easing · Neon-on-black · Cards inside cards · Cream or sand or beige default body background · Box-shadow on cards (use a 1px border)

## AI Slop Test

If a glance says "AI made that", the design failed. Two checks:

1. **First-order:** is the palette guessable from the category alone? Rework.
2. **Second-order:** is the aesthetic guessable from category plus anti-references? Rework until it is not.

## Install

### From npm

```
npm install omp-design-skill
```

Point your agent at `node_modules/omp-design-skill/SKILL.md`, or symlink it into your agent's skills directory. Restart your agent afterwards.

### On this machine (omp)

omp discovers authored skills one level under a `skills/` root: `<skills-root>/<skill-name>/SKILL.md`. The canonical user-level root is `~/.agents/skills/` (the `agents` provider, enabled by default). One symlink installs it:

```bash
ln -sfn ~/Workspace/personal/agents/design-skill ~/.agents/skills/design-skill
```

Restart the agent. A new session picks the skill up. Nested paths like `skills/engineering/design-skill` are not discovered; keep the skill one level under the root.

## Sources

| Source | Contribution |
|--------|-------------|
| [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | Routing layer, 22 commands, bans, setup flow |
| [Emil Kowalski's design engineering](https://animations.dev/) | Motion philosophy, animation framework, spring physics |
| CommandCode design | Report workflow, color/type/layout/interaction/responsive/copy philosophy |
| [Anthropic's frontend-design skill](https://github.com/anthropics/skills) | Craft and shape flows, production quality bar |

## License

Apache 2.0. Attribution details in [NOTICE.md](NOTICE.md).
