---
name: design-skill
description: Frontend design partner. Kills AI-slop by teaching 10 tells with positive direction. Five commands: detect, audit, deslop, shape, craft. Model-invoked: flag tells in-view, run detect. User-invoked: shape/craft interview first.
license: Apache 2.0
allowed-tools: Read, Write, Bash, WebFetch, env
---

## The 10 Tells

| Tell | Why machine-made | Do instead |
|---|---|---|
| Tech gradient | blue-violet→magenta gloss signals nothing | one real color story, OKLCH, flat/subtle |
| Generic tech hue | #6366F1 indigo "because software" | choose hue with reason; refuse category defaults |
| Feature-tile grid | 3 equal cards, no hierarchy decided | asymmetry: one clearly primary |
| Accent rail | colored stripe posing as organization | real grouping + spacing, not paint |
| Unearned blur | glassmorphism as a "modern" signal | blur only when it serves legibility |
| Stat monument | invented 10k+/99.9%/24-7 rows | only real numbers; prefer specific claims |
| Icon topper | icon tile above every heading | lead with the word; icons only for scanning |
| Template hero | centered headline+sub+primary/ghost, 100vh | break the spine: offset grid, strong edge |
| Default type stack | Inter, 14-18px, 1.5 lh, 700 headings | editorial contrast; ≥1.25x; 60-76ch |
| Anti-reference echo | design guessable from a banned list | restart with a direction contract: register+mode+scene |

## Invocation

**Model-invoked:** UI in view → flag visible tells in one line, offer the command; HTML reachable → run `detect`. **User-invoked:** `shape`/`craft` grill first - never assume (reference/shape.md); `audit`/`deslop` take a target.

## Commands

Abilities are flags, never standalone commands.

- `detect <target>` - run detector.mjs; report mechanical tells
- `audit [--a11y|--responsive|--interaction|--checkup|--polish]` - two-axis scored report → `.design-skill/audit-report.md`
- `deslop [--distill|--bolder|--quieter|--harden]` - kill tells with positive alternatives
- `shape` - grill in frontier rounds, every question with a recommendation; settle register/mode/persona/direction → brief
- `craft [--typeset|--colorize|--layout|--animate|--document]` - brief-confirmed build; `--document` writes DESIGN.md (design.md format)

## Modes & register

Register: brand or product (reference/register.md). Mode: Persuade/Operate/Read/Experience, from the surface (reference/modes.md).

## The design reflex

UI in view during any session → flag visible tells and offer the command; HTML reachable → run `detect`.

## Never

Gradient text (signals nothing) · identical card grids (no hierarchy) · invented stat rows (dishonest) · emoji as icons (unprofessional) · glassmorphism default (status signal).

## Setup

Load context (`node scripts/load-context.mjs`; PRODUCT.md/DESIGN.md/brief.md optional, never block). Read reference/modes.md + reference/register.md. Load REFERENCE.md when invoked.

## Truthful completion

Verify each change in real files before claiming done; bounded passes, not a loop.
