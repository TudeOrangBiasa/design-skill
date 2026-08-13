---
name: design-skill
description: >-
  Frontend design partner. Kills AI-slop by teaching 10 tells with positive
  direction. Five commands: detect, audit, deslop, shape, craft. Model-invoked:
  flag tells, run detect. User-invoked: grill first.
license: Apache 2.0
allowed-tools: Read, Write, Bash, WebFetch, env
---

## The 10 Tells

| Tell | Why machine-made | Do instead |
|---|---|---|
| Tech gradient | purple-violet gloss signals nothing | one real color story, flat/subtle |
| Generic tech hue | indigo "because software" | choose hue with reason; refuse category defaults |
| Feature-tile grid | 3 equal cards, no hierarchy | asymmetry: one clearly primary |
| Accent rail | stripe posing as organization | real grouping + spacing, not paint |
| Unearned blur | glass as a "modern" signal | blur only when it serves legibility |
| Stat monument | invented 10k+/99.9%/24-7 rows | real numbers or specific claims |
| Icon topper | icon tile above every heading | lead with the word; icons only for scanning |
| Template hero | centered hero stack, 100vh | break the spine: offset grid, strong edge |
| Default type stack | Inter everywhere, flat 700 headings | editorial contrast; ≥1.25x; 60-76ch |
| Anti-reference echo | design guessable from a banned list | restart with a direction contract: register+mode+scene |

## Invocation

**Model-invoked:** UI in view → flag tells, offer the command; HTML reachable → run `detect`. **User-invoked:** `shape`/`craft` grill first; `audit`/`deslop` take a target.

## Commands

Abilities are flags, never standalone.

- `detect <target>` - run detector.mjs, report tells
- `audit [--a11y|--responsive|--interaction|--checkup|--polish]` - two-axis scored report; findings carry severity, element, fix; Spec axis quotes the brief
- `deslop [--distill|--bolder|--quieter|--harden]` - kill tells with positive alternatives; every fix replaces with a rationale, never bare removal
- `shape` - grill in frontier rounds, every question with a recommendation; settle register/mode/persona → brief
- `craft [--typeset|--colorize|--layout|--animate|--document]` - brief-confirmed build; `--document` writes DESIGN.md (design.md)

## Build doctrine

- **Layout:** name the structure in one sentence before markup (asymmetric split, strict grid, editorial column, dense shell); never the centered stack; no KPI-monument hero (big figure + small label + stat row) - lead with the delta or a table. Sections differ in rhythm; one focal point per viewport (Hick's, Fitts, Von Restorff).
- **Story:** Persuade pages follow six beats: Hook, Catalyst, Mentor, Journey, Proof, Resolution (shape.md). Proof names a real person + result from the brief - never invent, never omit. One primary CTA; every button leads to it.
- **Motion:** one primary moment per surface, custom easing, transform/opacity - never width/height.
- **Numbers:** replace invented stats, testimonials, or attributions (10k+, "Dan W. since 2023") with real, checkable claims - a fake figure is a tell, not content.
- **Modals:** complex multi-section settings live on their own page, never in a modal.
- **Register-fit:** ops UI stays dense and scannable - no serif greeting, cream, tracked-caps kickers, or magazine copy, even if the source theme is editorial.
- **Icons:** one real set (Lucide, Phosphor, Tabler, Iconoir, Humbleicons, Flowbite); fetch it, no hand-drawn mascots, no emoji.
- **Imagery:** image-led briefs ship real/generated imagery, URLs verified; colored div = bug.
- **Color:** generate palettes in OKLCH: one hue with a reason, equal-L steps, same C% across hues, accent from a different hue; hex/hsl only where the framework needs it. Never category-reflex (coffee -> brown, cozy -> beige, tech -> indigo).
- **Font:** pick as a physical object (museum caption, terminal manual); reject reflex defaults (Inter, Fraunces, Space Grotesk).
- **Reference hunt:** web-search 2-3 inspirations that fit the brief (layout, type, palette); cite them.

## Modes & register

Register: brand or product (register.md). Mode: Persuade/Operate/Read/Experience, from the surface.


## Setup

Load context (`node scripts/load-context.mjs`; PRODUCT.md/DESIGN.md/brief.md optional, never block). Read modes.md + register.md. Load REFERENCE.md when invoked.

## Truthful completion

Verify each change in real files before claiming done; bounded passes.
