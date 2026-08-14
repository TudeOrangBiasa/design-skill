# Using the Design Skill

A guide for the person at the keyboard. It covers how the skill starts, what to expect in your first session, and the questions people ask most.

## Install

The skill installs with the [skills.sh CLI](https://github.com/vercel-labs/skills):

```bash
npx skills@1.5.22 add TudeOrangBiasa/design-skill
```

Add `-a <agent> -g` to target one agent globally, e.g. `npx skills@1.5.22 add TudeOrangBiasa/design-skill -a pi -g` for Pi. From a local checkout, `bash plugins/install.sh <agent>` covers pi, omp, opencode, claude-code, codex, cursor, gemini-cli, universal, and project scope. omp reads `~/.agents/skills/`, which the plugin script installs to by symlink.

npm also works: `npm install agent-design-skill`. Point your agent at `node_modules/agent-design-skill/SKILL.md`. Restart your agent after installing.

## How the skill starts

Two ways.

**You ask.** Say what you want in plain words. "This looks like AI made it", "Build me a landing page", "Fix the accessibility". The skill reads the situation and picks the right command. You never need to name one.

**The skill notices.** When UI is in view with visible AI tells (identical card grids, purple-blue gradients, a hero that reads like a template), the skill flags what it found in one line and offers the matching command. When HTML is reachable it runs `detect` for the mechanical findings. Nothing changes until you confirm.

## How the skill judges a surface

**The 10 tells.** The core doctrine. Tech gradient, generic tech hue, feature-tile grid, accent rail, unearned blur, stat monument, icon topper, template hero, default type stack, anti-reference echo. Each tell names why it reads machine-made and what to do instead. The skill teaches the positive direction, not a banned list.

**Modes.** Every surface has a mode, picked from the surface not the product: Persuade (the visitor decides and acts), Operate (the visitor completes a task), Read (the visitor understands something), Experience (the visitor is inside the work). A tool's landing page is still Persuade; a product company's docs are still Read.

**Register.** Brand or product. Brand surfaces need a point of view; product surfaces need earned familiarity. Each has its own type, color, and motion stances.

**Two-axis audit.** `audit` reviews a surface on two independent axes: Standards (does it follow the documented craft rules) and Spec (does it match the brief). Reported side by side, never merged. A page can pass one and fail the other, and the separation stops one axis hiding the other.

## Your first session

Pick the situation closest to yours.

### You have an existing page that feels generic

Say "This looks like AI made it".

1. The skill runs `detect` for the mechanical tells, then audits on two axes and writes a scored report.
2. It deslops: each tell is replaced by a positive alternative with a one-line rationale.
3. You steer the character ("make it bolder", "quieter") via the deslop flags.

### You are building something new

Say "Build me a landing page" or "I need a dashboard for my team".

1. The skill grills: it maps the request as a design tree and asks the questions whose answers are needed now, in frontier rounds. Every question carries a recommendation, so you can answer "defaults" and be done.
2. It never assumes: register, mode, persona, and direction are settled by your answers, not guessed.
3. It presents a short brief and stops. Nothing is built until you confirm.
4. It crafts the surface, shows you the result, and asks what is working and what is not.

### You are fixing a specific problem

Say "the layout overlaps on mobile", "the contrast is too low", or "add keyboard support". The skill audits the target with the matching flag and shows you the change before it ships.

## Answers to common questions

**Does the skill need PRODUCT.md or DESIGN.md?** No. If those files exist, it reads them for context. If they are missing, it grills a few questions instead. Nothing blocks.

**What is DESIGN.md?** A single file that captures your visual system: colors, typography, spacing, components, in the google-labs-code/design.md format. `craft --document` generates it from the built work and validates it, so future screens stay on brand.

**Where do reports go?** The skill writes them under `.design-skill/` at your project root. Future sessions read them, so a fixed issue stays fixed.

**Does the skill need a browser?** No. The skill ships zero servers and no MCP. It works on HTML, screenshots, and artifacts. If a live page is the only thing in view, the harness browser tool captures it and the skill audits the render.

**How do I get it to consider specific users?** Say who they are. "For elderly users" switches the audit to larger touch targets and higher contrast. The persona rules are built into the audit's Standards axis.

**What if I change my mind mid-session?** Interrupt and say so. Every gate pauses for your confirmation, so course corrections are cheap.

## Tips that make sessions better

- Name the audience and their situation, not just the surface. "A settings page for tired admins at the end of the day" beats "a settings page".
- Say what you do not want. Anti-references guide the skill as much as preferences do.
- Review the render. A screenshot you actually look at beats a description for catching problems.
