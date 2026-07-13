---
name: design
description: "Use when the user wants to design, redesign, shape, critique, audit, polish, clarify, distill, harden, optimize, adapt, animate, colorize, extract, or otherwise improve a frontend interface. Covers websites, landing pages, dashboards, product UI, app shells, components, forms, settings, onboarding, and empty states. Handles UX review, visual hierarchy, information architecture, cognitive load, accessibility, performance, responsive behavior, theming, anti-patterns, typography, fonts, spacing, layout, alignment, color, motion, micro-interactions, UX copy, error states, edge cases, i18n, and reusable design systems or tokens. Also use for bland designs that need to become bolder or more delightful, loud designs that should become quieter, live browser iteration on UI elements, or ambitious visual effects that should feel technically extraordinary. Not for backend-only or non-UI tasks."
argument-hint: "[{{command_hint}}] [target]"
user-invocable: true
license: Apache 2.0. Based on Anthropic's frontend-design skill + CommandCode design + Emil Kowalski's design engineering. See NOTICE.md for attribution.
---

# Design

Design partner for frontend. Route to tool, do work.

## Routing

| User says | Route | Load |
|-----------|-------|------|
| Unknown codebase | `audit` → report → fix | reference/brand.md |
| "slop" / "kacau" / "numpuk" | `audit --smell` → `refine --deslop` → `systems --layout` | reference/smell.md |
| "bikin X dari 0" | `build --init` → `build --shape` → `build --craft` | reference/craft.md |
| "tambahin accessibility" | `fix --access` | reference/access.md |
| "bikin lebih X" / "kurangin X" | `refine` — auto-detect mode | per mode |
| "pre-ship" / "final" | `audit --polish` | reference/polish.md |
| Existing report in `.design-skill/` | Load report before work | report continuity |

| Command | What | Modes |
|---------|------|-------|
| `/design audit` | Evaluate | critique/audit/polish/checkup/smell/review/overdrive |
| `/design refine` | Character change | bolder/quieter/distill/harden/deslop/refine |
| `/design systems` | Design system | colorize/typeset/layout/animate/interaction/responsive |
| `/design build` | Create | craft/shape/init/document/extract/redesign/setup |
| `/design fix` | Repair | clarify/adapt/optimize/onboard/voice/access |
| `/design iterate` + `manage` | Iterate + admin | live/delight/pin/unpin/hooks |

If unclear, ask one question. Then route.

### Brief sufficiency
A brief is sufficient when goal, target, and audience are identifiable. Do NOT ask about colors, fonts, layout, animation, or component details — infer from design laws. Before asking, check if answer is already in prompt. Ask only true blockers: missing target, destructive ambiguity, contradictory constraints.

## Scope Gate

| Gate | Check | Action |
|------|-------|--------|
| Boundary | Matches named surface? | BLOCK — list in vs out |
| Complexity | >1 feature? | BLOCK — sequence |
| Dependency | Unbuilt dep? | BLOCK — redirect |
| Persona | Violates persona rules? | WARN — override |
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

## Bans

Side-stripe borders · Gradient text · Glassmorphism default · Hero-metric template · Identical card grids · Eyebrow on every section · Numbered section markers · Text overflow · Ghost-card (border + wide shadow) · Over-rounding (32px+ on cards) · Sketchy SVG · Stripe backgrounds · Grid backgrounds · Meta-criticism copy · Bounce easing · Neon-on-black · Cards inside cards · Cream/sand/beige default bg · Box-shadow on cards (use 1px border instead).

## AI Slop Test

If 2s glance says "AI made that" → failed. First-order: palette guessable from category → rework. Second-order: aesthetic guessable from anti-references → rework.

## Report Continuity

Existing `.design-skill/` reports load before work. Prioritize blockers, high-severity, repeated smells.

## Setup

1. `node {{scripts_path}}/load-context.mjs` — load PRODUCT.md + DESIGN.md
2. Identify register: brand or product. Load `reference/brand.md` or `reference/product.md`
3. Load sub-command reference if invoked

See [REFERENCE.md](REFERENCE.md) for design laws, full command tables, persona setup, pin/unpin.
