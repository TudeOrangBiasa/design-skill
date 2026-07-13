# Design — Reference

See [SKILL.md](SKILL.md) for routing table, setup, commands, and absolute bans.

## Setup Details

### Context gathering
Two files, case-insensitive:
- **PRODUCT.md**: required. Users, brand, tone, anti-references, strategic principles.
- **DESIGN.md**: optional, strongly recommended. Colors, typography, elevation, components.

Load both: `node {{scripts_path}}/load-context.mjs`

### Register
Every design task is **brand** (marketing, landing, portfolio) or **product** (app UI, dashboard, tool).
Identify before designing. Load matching reference: `reference/brand.md` or `reference/product.md`.

## Shared Design Laws (Detailed)

### Color
- Use OKLCH. Reduce chroma as lightness approaches 0 or 100.
- Never use `#000` or `#fff`. Tint every neutral toward the brand hue.
- Pick a color strategy: **Restrained** (one accent ≤10%), **Committed** (one color 30-60%), **Full palette** (3-4 roles), **Drenched** (surface IS the color).

### Theme
Write one sentence of physical scene before choosing dark/light. If the sentence doesn't force the answer, add detail until it does.

### Typography
- Cap body line length at 65-75ch.
- Hierarchy through scale + weight contrast (≥1.25 ratio between steps).

### Layout
- Vary spacing for rhythm. Same padding everywhere is monotony.
- Cards are the lazy answer.
- Don't wrap everything in a container.

### Motion
- Don't animate CSS layout properties.
- Ease out with exponential curves. No bounce, no elastic.

### The AI Slop Test
Two altitudes:
1. **First-order:** if someone could guess the theme+palette from category alone, rework the scene sentence and color strategy.
2. **Second-order:** if someone could guess the aesthetic family from category-plus-anti-references, rework until both answers are not obvious.

## Commands Reference

| Command | Category | Description |
|---------|----------|-------------|
| `craft` | Build | Shape, then build a feature end-to-end |
| `shape` | Build | Plan UX/UI before writing code |
| `teach` | Build | Set up PRODUCT.md and DESIGN.md context |
| `document` | Build | Generate DESIGN.md from existing project code |
| `extract` | Build | Pull reusable tokens into design system |
| `critique` | Evaluate | UX design review with heuristic scoring |
| `audit` | Evaluate | Technical quality checks (a11y, perf, responsive) |
| `polish` | Refine | Final quality pass before shipping |
| `bolder` | Refine | Amplify safe or bland designs |
| `quieter` | Refine | Tone down aggressive designs |
| `distill` | Refine | Strip to essence |
| `harden` | Refine | Production-ready: errors, i18n, edge cases |
| `onboard` | Refine | Design first-run flows, empty states |
| `animate` | Enhance | Add purposeful animations |
| `colorize` | Enhance | Add strategic color |
| `typeset` | Enhance | Improve typography |
| `delight` | Enhance | Add personality and memorable touches |
| `overdrive` | Enhance | Push past conventional limits |
| `clarify` | Fix | Improve UX copy and error messages |
| `adapt` | Fix | Adapt for different devices/screen sizes |
| `optimize` | Fix | Diagnose and fix UI performance |
| `surface` | Knowledge | List and describe surface patterns for planning |
| `live` | Iterate | Visual variant mode: pick elements, generate alternatives |

## Pin/Unpin

```bash
node {{scripts_path}}/pin.mjs <pin|unpin> <command>
```
