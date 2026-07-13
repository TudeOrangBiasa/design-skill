<p align="center">
  <img src="assets/banner.png" alt="design-skill" width="100%">
</p>

# Design Skill

Design partner for frontend interfaces. One skill covers every visual discipline: color, typography, layout, motion, interaction, responsive behavior, accessibility, copy, and review.

## Quick Start

```
/design audit                  → evaluate existing UI
/design refine --bolder        → amplify bland designs
/design systems --colorize     → build color system
/design build --craft          → build feature from scratch
/design fix --access           → add accessibility
/design systems --layout       → fix overlapping layouts
```

## Commands

### `/design audit` — Evaluate

| Mode | What | When |
|------|------|------|
| `--critique` | UX judgment with heuristic scoring | Aesthetics/taste review |
| `--audit` | Technical quality (a11y, perf, responsive) | Production readiness |
| `--polish` | Final pre-ship pass | Before deploy |
| `--checkup` | Health scan with traffic-light scores | Unknown codebase, first pass |
| `--smell` | AI-tells catalog | Slop detection |
| `--review` | Design review with scoring | Thorough critique |
| `--overdrive` | Push past limits | When safe isn't enough |

### `/design refine` — Change character

| Mode | What |
|------|------|
| `--bolder` | Amplify safe/bland designs |
| `--quieter` | Tone down aggressive designs |
| `--distill` | Strip to essence |
| `--harden` | Edge cases, i18n, error states |
| `--deslop` | Remove AI-generated tells |
| `--refine` | Change design character |

### `/design systems` — Design systems

| Mode | What |
|------|------|
| `--colorize` | Color palette + roles (OKLCH) |
| `--typeset` | Typography system |
| `--layout` | Spacing, rhythm, hierarchy |
| `--animate` | Motion system + animation |
| `--interaction` | States, behavior, affordances |
| `--responsive` | Multi-screen orchestration |

### `/design build` — Create

| Mode | What |
|------|------|
| `--craft` | Feature end-to-end |
| `--shape` | UX plan before code |
| `--init` | Project context setup |
| `--document` | Generate DESIGN.md |
| `--extract` | Pull tokens/components |
| `--redesign` | Complete visual transformation |
| `--setup` | Project brief context |

### `/design fix` — Repair

| Mode | What |
|------|------|
| `--clarify` | UX copy, labels, errors |
| `--adapt` | Responsive adaptation |
| `--optimize` | UI performance |
| `--onboard` | First-run flows, empty states |
| `--voice` | Brand identity, art direction |
| `--access` | Accessibility (screen reader, WCAG, high contrast, font scaling, voice nav) |

### `/design iterate` + `/design manage`

| Mode | What |
|------|------|
| `--live` | Browser iteration / HMR |
| `--delight` | Micro-interactions, personality |
| `--pin`/`--unpin`/`--hooks` | Shortcuts + auto-detection |

## Real-world flows

**"This layout is a mess, everything overlaps"**
```
/design audit --smell     → detects slop patterns
/design refine --deslop   → removes AI-generated bloat
/design systems --layout  → establishes rhythm system
```

**"Build a SaaS dashboard from scratch for elderly users"**
```
/design build --init      → sets up project context
/design build --shape     → documents elderly persona (18px, 56px touch targets)
/design build --craft     → builds the dashboard
/design systems --colorize → high-contrast palette
/design fix --access      → WCAG compliance
```

**"Add disability features to existing app"**
```
/design fix --access      → screen reader, high contrast, font scaling, voice nav
/design refine --harden   → edge cases for accessibility
```

**"This looks like AI designed it"**
```
/design audit --smell     → catalogs AI tells
/design refine --deslop   → removes them one by one
/design refine --distill  → strips generic patterns
```

## Design Philosophy

### Color
- **OKLCH only.** Never #000/#fff. Tint neutrals toward brand hue.
- **4 commitment levels:** Restrained → Committed → Full palette → Drenched.
- **60-30-10 rule:** 60% primary, 30% secondary, 10% accent.

### Typography
- Body: 60-76ch, 1.25× scale ratio minimum.
- 3-level hierarchy: Hook → Bridge → Detail.
- System fonts are legitimate. Don't reflex-reach for Inter.

### Layout
- **1-4-9 rhythm system.** Every spacing decision is a multiple of 4px, 16px, or 36px.
- **3-plane depth:** Background → Content → Attention.
- **Cards are lazy.** Use only for genuinely discrete content. No nested cards.

### Motion
- **Animation Decision Framework:** 4 questions — should it? purpose? easing? speed?
- UI under 300ms. Ease-out for enter, ease-in-out for on-screen movement.
- Animate only transform + opacity. Never layout.

### Interaction
- **9 states of being:** Idle / Hover / Active / Focused / Loading / Empty / Error / Disabled / Overflow.
- Touch targets: 44×44px minimum. Elderly: 56×56px.
- Focus rings: 2-3px, 3:1 contrast. Never `outline: none`.

### Responsive
- **Viewport gauntlet:** 320px → 375px → 768px → 1024px → 1440px → 2560px.
- Container queries, not page queries. Input mode detection.
- Never amputate a feature for mobile.

### Copy
- One verb per button. Errors are recovery paths. Empty states teach.
- No em dashes, no exclamation points, sentence case.

## Bans (never generate)

Side-stripe borders · Gradient text · Glassmorphism default · Hero-metric template · Identical card grids · Eyebrow on every section · Numbered section markers · Text overflow · Ghost-card (border + wide shadow) · Over-rounding (32px+ on cards) · Sketchy SVG illustrations · Stripe backgrounds · Grid backgrounds · Meta-criticism copy · Bounce easing · Neon-on-black · Cards inside cards · Cream/sand/beige default body bg · Box-shadow on cards

## AI Slop Test

If someone looks at the design for 2 seconds and says "AI made that" → it failed. Run two checks:

1. **First-order:** Is the palette guessable from the category alone? → rework.
2. **Second-order:** Is the aesthetic family guessable from category + anti-references? → rework until not obvious.

## Sources

| Source | Contribution |
|--------|-------------|
| [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | Routing layer, 22 commands, bans, setup flow |
| [Emil Kowalski's design engineering](https://animations.dev/) | Motion philosophy, animation framework, spring physics |
| CommandCode design | 19 tools, report workflow, color/type/layout/interaction/responsive/copy philosophy |

## Installation

```bash
# Via opencode-workflow (recommended)
cd ~/Workspace/personal/agents/opencode-workflow
ln -sfn ~/Workspace/personal/agents/design-skill skills/engineering/design-skill
bash scripts/link-skills.sh

# Add to ~/.config/opencode/opencode.json:
"/home/todayz/.config/opencode/skills/engineering/design-skill"

# Restart OpenCode
```

## License

Apache 2.0. Based on Anthropic's frontend-design skill, Paul Bakaus' impeccable, CommandCode design, and Emil Kowalski's design engineering.
