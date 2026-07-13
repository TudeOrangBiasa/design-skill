---
name: design
description: "Use when the user wants to design, redesign, shape, critique, audit, polish, clarify, distill, harden, optimize, adapt, animate, colorize, extract, or otherwise improve a frontend interface. Covers websites, landing pages, dashboards, product UI, app shells, components, forms, settings, onboarding, and empty states. Handles UX review, visual hierarchy, information architecture, cognitive load, accessibility, performance, responsive behavior, theming, anti-patterns, typography, fonts, spacing, layout, alignment, color, motion, micro-interactions, UX copy, error states, edge cases, i18n, and reusable design systems or tokens. Also use for bland designs that need to become bolder or more delightful, loud designs that should become quieter, live browser iteration on UI elements, or ambitious visual effects that should feel technically extraordinary. Not for backend-only or non-UI tasks."
argument-hint: "[{{command_hint}}] [target]"
user-invocable: true
license: Apache 2.0. Based on Anthropic's frontend-design skill. See NOTICE.md for attribution.
---

## ROUTING TABLE — when this skill loads, drill into the right sub-command

This skill is a router. When `design` loads, identify the user's intent and load the matching `reference/<sub>.md` file. **Do not proceed with generic design advice — load the sub-command file first.**

| User intent | Load | Sub-command |
|-------------|------|-------------|
| New project context, scaffold DESIGN.md | [reference/document.md](reference/document.md) | `design document` |
| Run the full 5-dimension quality audit (a11y, performance, design, content, IA) | [reference/audit.md](reference/audit.md) | `design audit` |
| Judgment-call design critique (aesthetics, taste) | [reference/critique.md](reference/critique.md) | `design critique` |
| Polish pass before sign-off (last-mile quality) | [reference/polish.md](reference/polish.md) | `design polish` |
| Build a new interface from scratch | [reference/craft.md](reference/craft.md) | `design craft` |
| Adapt existing UI to a new context/screen | [reference/adapt.md](reference/adapt.md) | `design adapt` |
| Live browser iteration / HMR | [reference/live.md](reference/live.md) | `design live` |
| Add motion / animation | [reference/animate.md](reference/animate.md) | `design animate` |
| Identify surface pattern before layout | [reference/surface-patterns.md](reference/surface-patterns.md) | `design surface` |
| Generate tokens from minimal input (no DESIGN.md) | [reference/taste-bootstrap.md](reference/taste-bootstrap.md) | `design taste-bootstrap` |
| Color treatment | [reference/colorize.md](reference/colorize.md) | `design colorize` |
| Make bolder | [reference/bolder.md](reference/bolder.md) | `design bolder` |
| Make quieter | [reference/quieter.md](reference/quieter.md) | `design quieter` |
| Distill / simplify | [reference/distill.md](reference/distill.md) | `design distill` |
| Clarify confusing UI | [reference/clarify.md](reference/clarify.md) | `design clarify` |
| Robustness / edge cases | [reference/harden.md](reference/harden.md) | `design harden` |
| Performance optimization | [reference/optimize.md](reference/optimize.md) | `design optimize` |
| Typography | [reference/typeset.md](reference/typeset.md) | `design typeset` |
| Add delight / micro-interactions | [reference/delight.md](reference/delight.md) | `design delight` |
| Shape the work before implementing | [reference/shape.md](reference/shape.md) | `design shape` |
| Extract reusable patterns | [reference/extract.md](reference/extract.md) | `design extract` |
| Onboarding flows | [reference/onboard.md](reference/onboard.md) | `design onboard` |
| Maximum ambition | [reference/overdrive.md](reference/overdrive.md) | `design overdrive` |
| Brand/landing pages (marketing) | [reference/brand.md](reference/brand.md) | register: brand |
| Product UI (app, dashboard, tool) | [reference/product.md](reference/product.md) | register: product |

**If user's intent is unclear**, ask one question, then route. Do not guess.

---

Designs and iterates production-grade frontend interfaces. Real working code, committed design choices, exceptional craft.

## Setup

1. Load context (PRODUCT.md / DESIGN.md): `node {{scripts_path}}/load-context.mjs`
2. Identify register: **brand** (marketing) or **product** (app UI)
3. If user invoked sub-command (craft, shape, audit), load its reference file too

See [REFERENCE.md](REFERENCE.md) for detailed setup, context gathering, and register identification.

## Shared design laws

See [REFERENCE.md](REFERENCE.md) for detailed laws.

**Color:** OKLCH, never #000/#fff. Strategy: Restrained/Committed/Full/Drenched.
**Theme:** Scene sentence before dark/light choice.
**Typography:** 65-75ch line length. 1.25× scale ratio.
**Layout:** Vary spacing. Cards are lazy. Don't wrap everything.
**Motion:** Don't animate layout. Exponential ease-out.
**Surface:** Identify surface pattern before layout. 7 surfaces: Monitor / Operate / Compare / Configure / Learn / Decide / Explore.
**Bans:** No side-stripe borders, gradient text, glassmorphism, hero-metric, identical card grids, modal-first, bounce easing, neon-on-black, repeated identical cards.
**Copy:** Every word earns its place. No em dashes.
**AI slop test:** Category-reflex check at two altitudes.

## Commands

See [REFERENCE.md](REFERENCE.md) for full commands table, routing rules, and pin/unpin details.
