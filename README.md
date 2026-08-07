<p align="center">
  <img src="assets/banner.png" alt="design-skill" width="100%">
</p>

# Design Skill

[![skills.sh](https://skills.sh/b/TudeOrangBiasa/design-skill)](https://skills.sh/TudeOrangBiasa/design-skill)
[![npm version](https://img.shields.io/npm/v/agent-design-skill.svg)](https://www.npmjs.com/package/agent-design-skill)

Every AI-generated interface has a tell. The identical card grid. The purple-blue gradient. The hero that reads like a template. Two seconds of looking and you know a model made it. This skill exists to make that reaction impossible.

It is one skill, not a prompt: a router, a deterministic detector, a doctrine library, and a checklist engine. It works with any model and any harness. New here? Start with [GUIDE.md](GUIDE.md), the walkthrough of the skill in practice.

## The story

Design is a conversation, not a spec delivery. But agents fail at design in the same specific ways, every time. This skill exists because I watched those failures happen and built the fix for each one.

### #1: The interface reads as AI

> "No-one knows exactly what they want"
>
> David Thomas and Andrew Hunt, The Pragmatic Programmer

**The Problem.** Ask an agent for a landing page and you get the median of every landing page it has ever seen: indigo gradients, Inter at weight 700, three identical cards, a badge on everything. The output is competent and interchangeable. It could have come from any prompt, any template, any average SaaS homepage.

**The Fix** is a two-layer machine:

- A deterministic **42-rule detector** ([docs/detector.md](docs/detector.md)) that scans HTML and CSS with zero model and zero API key: emoji icons, gradient text, the AI palette, cream backgrounds, overused fonts, nested cards, invented stat rows, badge spam, glassmorphism, and 34 more. Error-severity findings block shipping until fixed or explicitly accepted.
- A **bans list** and an **AI Slop Test**: if a glance says "AI made that", the design failed. First-order: is the palette guessable from the category alone? Second-order: is the aesthetic guessable from anti-references? Rework until it is not.

### #2: The agent has no taste

> "Invest in the design of the system every day."
>
> Kent Beck, Extreme Programming Explained

**The Problem.** Taste cannot be enumerated, so agents default to safe. Every spacing decision a multiple of 4, every heading weight 700, every card the same size, hierarchy carried by shades of gray. Nothing is wrong and nothing is decided.

**The Fix** is a doctrine library, one playbook per concern, loaded only when the work needs it ([docs/architecture.md](docs/architecture.md)):

- [colorize](reference/colorize.md), [typeset](reference/typeset.md), [layout](reference/layout.md), [animate](reference/animate.md), [interaction](reference/interaction.md), [responsive](reference/responsive.md), [access](reference/access.md): the capabilities.
- [modes](reference/modes.md): every surface has a mode, Persuade, Operate, Read, Experience, chosen from the surface not the product.
- [craft-floor](reference/craft-floor.md): the mechanics floor nothing ships below.
- [doctrine](reference/doctrine.md): the brief wins, demonstrate the mechanism, the first viewport is a thesis.

The anti-slop principles are baked into every layer: decide before you decorate, one accent one voice, hierarchy from scale and space, subtract first, specific beats loud, decoration must mean something.

### #3: Dashboards bury the decision

> "The best modules are deep."
>
> John Ousterhout, A Philosophy of Software Design

**The Problem.** Dashboards are built to display data, not support decisions. Screens packed with charts nobody reads, KPIs stripped of context, real-time updates that move without meaning.

**The Fix** is [reference/dashboards.md](reference/dashboards.md): the decision trace (every metric answers a named decision), the F-pattern inverted pyramid, the row-height and density scale, chart-to-question mapping, the trust layer for real-time data (freshness indicators, cached snapshots, why-this-alert), and the responsiveness contract in [reference/performance.md](reference/performance.md) (feedback in the next frame, 200ms good, 500ms poor).

### #4: Nobody checks the details

**The Problem.** The hero looks great and the button has no focus state. The form has no error path. The empty state is a blank screen. Details are where interfaces die, and agents skip them because nothing forces the pass.

**The Fix** is [reference/ui-checklist.md](reference/ui-checklist.md), the universal pre-ship pass, backed by the full 110-checklist, 703-check catalog in [reference/checklist-catalog.md](reference/checklist-catalog.md): components, the system layer, feedback and states, data surfaces, and a per-surface catalog for website pages, web app screens, mobile, and flows.

### #5: You can't tell when it's done

> "Always take small, deliberate steps. The rate of feedback is your speed limit."
>
> David Thomas and Andrew Hunt, The Pragmatic Programmer

**The Problem.** An agent that never stops polishing burns your time; an agent that stops early ships broken states. Both are the same failure: no definition of done.

**The Fix** is the skill's completion discipline: verify every change in real files, visible in the browser, in bounded passes (build fully, inspect once, fix in one batch, at most one confirm round, stop). Reports land in `.design-skill/` and load on the next session, so a fixed issue stays fixed and regressions show as trends.

## How it starts

Two ways, the same as any good design partner.

**You ask.** Say what you want in plain words. "This looks like AI made it", "Build me a landing page", "Fix the accessibility". The routing table maps the sentence to a command chain. You never name a flag.

**The skill notices.** When UI is in view and it spots tells, it loads itself and reports what it found. Nothing changes until you confirm.

## Installation (30-second setup)

One package, every harness. Install per agent; a fresh session picks the skill up.

<details>
<summary><strong>Pi</strong></summary>

```bash
npx skills@1.5.22 add TudeOrangBiasa/design-skill -a pi -g
```

</details>

<details>
<summary><strong>OpenCode</strong></summary>

```bash
npx skills@1.5.22 add TudeOrangBiasa/design-skill -a opencode -g
```

</details>

<details>
<summary><strong>Claude Code</strong></summary>

```bash
npx skills@1.5.22 add TudeOrangBiasa/design-skill -a claude-code -g
```

</details>

<details>
<summary><strong>Codex, Cursor, Gemini CLI</strong></summary>

```bash
npx skills@1.5.22 add TudeOrangBiasa/design-skill -a codex -g
npx skills@1.5.22 add TudeOrangBiasa/design-skill -a cursor -g
npx skills@1.5.22 add TudeOrangBiasa/design-skill -a gemini-cli -g
```

</details>

<details>
<summary><strong>Shared .agents/skills agents (omp and friends)</strong></summary>

Harnesses that read `~/.agents/skills/<name>/SKILL.md` (the omp agents provider and other `.agents` readers) get a symlink from a local checkout, so updates are live:

```bash
# from the repo root
ln -sfn "$PWD" ~/.agents/skills/design-skill
```

or `bash plugins/install.sh omp`. Nested paths like `skills/engineering/design-skill` are not discovered; keep the skill one level under the root.

</details>

<details>
<summary><strong>npm</strong></summary>

```bash
npm install agent-design-skill
```

Point your agent at `node_modules/agent-design-skill/SKILL.md`, or symlink it into the agent's skills directory.

</details>

From a local checkout, the plugin script wraps the same commands and covers every agent, including omp which skills.sh has no entry for:

```bash
bash plugins/install.sh pi       # global Pi install
bash plugins/install.sh omp      # symlink into ~/.agents/skills/
bash plugins/install.sh project  # records skills-lock.json (the repo is the skill)
```

Full per-agent matrix and the skills.sh contract: [docs/install.md](docs/install.md).

## What's inside

| Instrument | What it does | Read more |
|-----------|--------------|-----------|
| SKILL.md | The router: invocation model, routing table, bans, scope gate | [docs/architecture.md](docs/architecture.md) |
| 42-rule detector | Deterministic design-smell scan of HTML and CSS | [docs/detector.md](docs/detector.md) |
| Doctrine library | 50+ playbooks, one per concern, loaded on demand | [docs/architecture.md](docs/architecture.md) |
| Live variant mode | Browser iteration with a durable journal | [docs/live-mode.md](docs/live-mode.md) |
| DESIGN.md | The visual system spec (google-labs format), validated by the canonical linter | [docs/design-md.md](docs/design-md.md) |
| Checklist engine | 703 checks across 110 checklists for the pre-ship pass | [docs/checklists.md](docs/checklists.md) |
| CLI | `design` dispatcher over dependency-free Node scripts | [docs/commands.md](docs/commands.md) |

## Command reference

The full `/design` command tables and routing map moved to [docs/commands.md](docs/commands.md) as the skill grew. The quick version: `/design audit` evaluates, `/design refine` changes character, `/design systems` builds the system, `/design build` creates, `/design fix` repairs, `/design iterate` iterates live.

## Design laws in brief

### Modes
- Every surface has a mode: Persuade (decide and act), Operate (complete a task), Read (understand), Experience (be inside the work).
- Choose the mode from the surface, not the product. A tool's landing page persuades; a product company's docs are read.

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
- **Universal breakpoints (locked):** 375, 640, 768, 1024, 1280, 1536px.
- Container queries, not page queries. Input mode detection.
- Never amputate a feature for mobile.

### Copy
- One verb per button. Errors are recovery paths. Empty states teach.
- No em dashes, no exclamation points, sentence case. No filler, no promotional words, no repetition.

### Scanning
- Users scan pages in four patterns: F-shaped, Z-shaped, Spotted, Layer Cake.
- Headings carry the message alone. Links look clickable. The primary action sits where the scan ends.

### Landing pages
- The six-beat narrative: Hook, Catalyst, Mentor, Journey, Proof, Resolution.
- Max 2-3 extra components; if a component does not advance the story or build trust, delete it.

## Bans (never generate)

Side-stripe borders · Gradient text · Glassmorphism as default · Hero-metric template · Identical card grids · Eyebrow on every section · Numbered section markers · Text overflow · Ghost-card (border and wide shadow) · Over-rounding (32px+ on cards) · Sketchy SVG illustrations · Stripe backgrounds · Grid backgrounds · Meta-criticism copy · Bounce easing · Neon-on-black · Cards inside cards · Cream or sand or beige default body background · Box-shadow on cards (use a 1px border instead) · Emoji as icons (use a real icon product: Lucide, Phosphor, Tabler, Iconoir, Humbleicons, Flowbite) · Decorative strikethroughs and highlights · Badge and pill spam · Invented stat rows (10k+ / 99.9% / 24/7) · Tinted icon containers (an icon in a 10% tint of itself) · Springy scale hovers (hover:scale-105) · Mono chrome everywhere (terminal dressing on UI)

## AI Slop Test

If a glance says "AI made that", the design failed. Two checks:

1. **First-order:** is the palette guessable from the category alone? Rework.
2. **Second-order:** is the aesthetic guessable from category plus anti-references? Rework until it is not.

## Sources

| Source | Contribution |
|--------|-------------|
| [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | Routing layer, 22 commands, bans, setup flow |
| [Emil Kowalski's design engineering](https://animations.dev/) | Motion philosophy, animation framework, spring physics |
| CommandCode design | Report workflow, color/type/layout/interaction/responsive/copy philosophy |
| [Anthropic's frontend-design skill](https://github.com/anthropics/skills) | Craft and shape flows, production quality bar |
| [Checklist Design](https://www.checklist.design/) | UI pre-ship checklist and catalog (created by George Hatzis; no license published, attribution in NOTICE.md) |
| [Nielsen Norman Group](https://www.nngroup.com/) | Scanning, dashboards, data tables, forms research |
| [IBM Carbon](https://carbondesignsystem.com/) | Data table and grid norms |
| [web.dev](https://web.dev/articles/inp) | Responsiveness contract (INP, 200ms/500ms thresholds) |

## Contributing

See [CONTRIBUTION.md](CONTRIBUTION.md) for the contribution rules, the check commands, and the repo conventions.

## License

Apache 2.0. Attribution details in [NOTICE.md](NOTICE.md).
