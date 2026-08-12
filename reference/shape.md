# Shape: grill before building

Copied from Matt Pocock's grilling skill: **never assume**. The user's answers are the brief; your job is to make the design tree explicit and walk it in rounds until nothing is silently assumed.

## The design tree

Map the request as a **design tree**: every decision branches into the decisions that hang off it. Settle order for this skill: register (brand or product) → mode (Persuade / Operate / Read / Experience) → persona → direction → brief. A surface's mode is chosen from the surface, never from the product category (modes.md, register.md).

## Rounds and the frontier

Work the tree in **rounds**. The **frontier** is every decision whose prerequisites are already settled - the questions you can ask now without guessing at answers you haven't heard yet. Ask the whole frontier in one round; number each question and give your recommended answer. Then wait for the user's answers before the next round.

Format:

```
❓ **Q1** - **<question title>**: <question body, with the choices>

➡️ <your recommended answer>
```

Each round's answers reshape the tree - settled decisions push the frontier outward and unblock questions that depended on them. Recompute and ask the next round. A question whose answer depends on another question still open in this round belongs to a **later** round, not this one. Ask 2-3 questions per round; the frontier is complete, not padded.

## Facts are your job

When a frontier question needs a fact from the environment (files, browser, PRODUCT.md, DESIGN.md, an existing surface), **look it up** - never ask the user for anything you could find yourself. Run `node scripts/load-context.mjs` before the first round. A running exploration is an unsettled prerequisite: only the questions downstream of it wait.

## Directions

Offer direction variety instead of converging on the first idea: `node scripts/concept-seed.mjs --directions "A|B|C"` gives seeded, deliberately different directions. Each direction carries a register + mode + one-sentence physical scene. Do not let the first plausible direction win silently.

## Done

The session is done when the frontier is empty - every branch visited, nothing left silently assumed. Output the confirmed brief (≤200 words: register, mode, persona, direction, constraints). Do not act on it until the user confirms the shared understanding. Write it to `brief.md` only if the user asks.

## Landing-page narrative (Persuade mode)

A landing page is a story with six beats, built for emotional resonance first, conversion second. Users scan before they read: structure for the scan, then reward with the story. Shape the brief so the landing page carries all six beats (restored from v1 landing-pages.md):

1. **Hook (hero)** - core purpose + primary visual. One headline, one sub, one brand visual, one direct CTA.
2. **Catalyst (the problem)** - validates the visitor's pain, in their words, not the category's. They recognize their own situation on sight.
3. **Mentor (the solution)** - the brand as the guide; demonstrate the mechanism at real scale, never a feature list.
4. **Journey (how it works)** - the process in one logical order, step to step, no dead ends.
5. **Proof (social proof)** - attributable only: who said it, what result. Testimonials without a source are decoration.
6. **Resolution (CTA)** - one verb, one path, the outcome named ("Start free", "Book a consultation").

Discipline: **one primary CTA** (every button leads to the same goal); **the agency rule** (any component that does not advance the story or build trust is deleted - max 2-3 extra components); per-beat ruts to avoid: Hook (hero-metric, centered stack, eyebrow pill), Catalyst (generic pain), Mentor (feature grid), Journey (same-size cards with no order), Proof (fake metrics, unattributed quotes), Resolution (buried or two competing CTAs). Mobile-first forces the story tight; desktop earns the richness.

## Merged surfaces

This file replaces the v1 per-surface interview scripts (hero, landing-pages, dashboards, redesign, new-work): they were the same tree with different branches. The tree above covers them - a hero brief still settles register/mode/persona/direction before any layout question.
