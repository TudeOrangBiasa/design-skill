# Using the Design Skill

A guide for the person at the keyboard. It covers how the skill starts, what to expect in your first session, and the questions people ask most.

## Install

```
npm install omp-design-skill
```

Point your agent at `node_modules/omp-design-skill/SKILL.md`, or symlink it into your agent's skills directory. Restart your agent after installing.

## How the skill starts

Two ways.

**You ask.** Say what you want in plain words. "This looks like AI made it", "Build me a landing page", "Fix the accessibility". The skill reads the situation and picks the right tool. You never need to name a command.

**The skill notices.** When it sees AI tells in an existing interface, like identical card grids, purple-blue gradients, or a hero that reads like a template, it loads itself and reports what it found. Nothing changes until you confirm.

## Your first session

Pick the situation closest to yours.

### You have an existing page that feels generic

Say "This looks like AI made it".

1. The skill catalogs the tells and writes a report.
2. It proposes what to remove. You confirm.
3. It strips the generic patterns, one by one.
4. It rebuilds the spacing and rhythm so the page stops reading as a template.

Review the result in your browser. Say "make it bolder" or "quieter" to steer the character.

### You are building something new

Say "Build me a landing page" or "I need a dashboard for my team".

1. The skill asks two or three questions, each with a recommendation attached. Who is this for, what should it feel like, what must it avoid.
2. You confirm or correct the answers.
3. It presents a short brief and stops. Nothing is built until you confirm the direction.
4. It builds the surface, shows you the result, and asks what is working and what is not.

### You are fixing a specific problem

Say "the layout overlaps on mobile", "the contrast is too low", or "add keyboard support". The skill picks the matching repair and shows you the change before it ships.

## Answers to common questions

**Does the skill need PRODUCT.md or DESIGN.md?** No. If those files exist, it reads them for context. If they are missing, it asks you a few questions instead. Nothing blocks.

**What is DESIGN.md?** A single file that captures your visual system: colors, typography, spacing, components. The skill can generate it from your code in the Google Stitch format, so future screens stay on brand.

**Where do reports go?** The skill writes them under `.design-skill/` at your project root. Future sessions read them, so a fixed issue stays fixed.

**How do I get it to consider specific users?** Say who they are. "For elderly users" switches the skill to bigger type, larger touch targets, and higher contrast. The persona rules are built in.

**What if I change my mind mid-session?** Interrupt and say so. Every step pauses for your confirmation, so course corrections are cheap.

## Tips that make sessions better

- Name the audience and their situation, not just the surface. "A settings page for tired admins at the end of the day" beats "a settings page".
- Say what you do not want. Anti-references guide the skill as much as preferences do.
- Review in the browser. A live page beats a description for catching problems.
