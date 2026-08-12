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

A landing page is a story with six beats (restored from v1 landing-pages.md); structure for the scan, then reward with the story:

1. **Hook (hero)** - core purpose + primary visual; one headline, one sub, one visual, one CTA.
2. **Catalyst (the problem)** - the visitor's pain, in their words; they recognize themselves on sight.
3. **Mentor (the solution)** - the brand as guide; show the mechanism, never a feature list.
4. **Journey (how it works)** - the process in one logical order, no dead ends.
5. **Proof (social proof)** - attributable: who said it, what result; unsourced quotes are decoration.
6. **Resolution (CTA)** - one verb, one path, the outcome named ("Start free", "Book a consultation").

Discipline: **one primary CTA**; **the agency rule** (delete any component that does not advance the story - max 2-3 extras); ruts: Hook (hero-metric, eyebrow pill), Catalyst (generic pain), Mentor (feature grid), Journey (cards with no order), Proof (fake metrics), Resolution (two competing CTAs). Mobile-first; desktop earns richness.

## Merged surfaces

This file replaces the v1 per-surface interview scripts (hero, landing-pages, dashboards, redesign, new-work) - same tree, different branches.
