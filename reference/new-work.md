# New visual work

Use this flow for a new surface or a replacement visual identity. PRODUCT.md owns product truth. DESIGN.md owns durable visual decisions. A surface brief keeps strategy that belongs to only one route or artifact. Run `init` first when PRODUCT.md is missing; a missing DESIGN.md does not route back to init.

## 1. Decide what is already true

Read DESIGN.md, representative code, tokens, components, and assets.

- **Redesign:** preserve product truth, content, function, constraints, and explicit brand commitments; replace the old visual world rather than polishing it. The old look is evidence of what the subject is, not authority over what it becomes.
- **Established world:** inherit it. A missing DESIGN.md does not erase a coherent identity already present in code; document that identity instead of inventing a replacement.
- **Incomplete brand:** preserve confirmed assets and recognizable traits, then help the user expand the system for this new surface.
- **No visual authority:** create a new world with the user.

A section, component, feature, or state inside an established surface inherits that surface. Do not turn a local addition into a new identity exercise.

## 2. Ask what will change the work

Ask one round of two or three related questions. Skip settled facts; a precise request may need only a compact confirmation. Use the mode from [modes.md](modes.md) to shape the questions:

- **Persuade:** who must act, what they should believe, which real proof, content, or assets can earn that belief.
- **Operate:** the task, information, important states, frequency, and constraints.
- **Read:** the reader's question, source material, structure, and wayfinding.
- **Experience:** what leads, how exploration unfolds, which interaction or transition matters.

Across modes, ask what success looks like, what must remain untouched, and what would make a polished result feel wrong. Do not ask for CSS values or canned aesthetic lanes.

## 3. Choose the right amount of invention

### Extend an existing surface

Inherit its world and composition. Resolve only the new purpose, content, hierarchy, states, interaction, and how the addition joins the surrounding experience. Do not run a concept tournament or change DESIGN.md unless the user approves a durable system change.

### Create a whole surface inside an established world

Keep the visual system fixed. Derive five to seven materially different structures from the content, task, and user behavior, ordered by resonance, and build the top structure.

### Create or replace the visual world

1. Name the product's unique mechanism in one sentence, the audience's real scene, its cultural home, and what this first surface must prove. Note the page this category always ships and its predictable opposite; name both as the rut and keep them out of the candidate list.
2. From that cultural world, list seven concrete visual systems, artifacts, places, or rituals the audience knows by heart, each with one line on why it resonates and can carry the mechanism, ordered by resonance. Include the audience's graphic and screen traditions, not only its physical objects: the notation, publications, identity programs, and interfaces it reads daily. Near-duplicates count once. When more than three of the seven share one material family, the derivation stopped at the subject's most obvious artifact; dig until the list spans at least three families.
3. Turn that material into complete directions, each joining a reusable visual world to a concrete first-surface experience.
4. Choose one committed direction. Rank the seven honestly, then pick the one most different from what a default run would ship for this category. The anti-rut test: a direction that any model would land on for this subject is a rut, not a direction.
5. Present the committed direction fully: its world, first viewport, visitor path, signature interaction, cross-surface reach, and honest risk. Offer up to three of the remaining candidates as named alternates with a one-line case for each, and the category standard as a quiet standing exit the user can always take. When the user takes the canon, execute it at full fidelity without irony or smuggled quirk, and record the preference as a brand commitment in PRODUCT.md.

Every direction must be viable: every relationship and claim it visualizes true, a real palette and component family, a distinctive composition with one product-specific experience, workable at full-surface scale within the available assets, tools, and performance budget. Truth binds claims, not demonstrations: in greenfield work, author whatever illustrative material the concept needs at full fidelity, label it synthetic wherever a visitor could mistake it for the real thing, and hand the user the list of what to replace with real material. What stays uninventable are commercial and factual claims: prices, customers, benchmarks, endpoints, capabilities the product does not have.

For **Persuade**, the opening must make the offer intelligible and desirable, expose a clear action, and demonstrate something only this product can prove. A landing page follows the five-beat narrative in [landing-pages.md](landing-pages.md): Hook, Problem, Guide, Proof, Resolution. For **Operate**, expression may never obscure the task, state, or familiar affordance. For **Read**, comprehension and wayfinding remain intact. For **Experience**, the work itself leads from the first viewport.

## 4. Commit the world

Pick a color strategy before picking colors: Restrained (neutrals plus one accent; the default when the visitor came to operate or read), Committed (one saturated color carries 30-60% of the surface), Full palette (3-4 named roles), or Drenched (the surface is the color). Persuade and Experience surfaces have permission for the bolder strategies. Color commits at page scale: fields that own whole regions, not accents scattered over a neutral ground. Dark or light is never a default: write one sentence of physical scene and let it force the answer.

Choose faces like objects from the subject's world, in the mode's register. Operate and Read surfaces are well served by system stacks and workhorse faces; Persuade and Experience surfaces want faces with a point of view. The training-data defaults mean you stopped looking: Fraunces, Playfair Display, Cormorant, Lora, Crimson, Newsreader, Syne, Space Grotesk, Space Mono, IBM Plex, Inter-as-display, DM Sans, DM Serif, Outfit, Plus Jakarta Sans, Instrument Sans. Naming one of these faces anyway requires a reason no other face could satisfy, and a subject association is never that reason.

Calibration: AI-generated interfaces cluster around a few looks regardless of subject: warm cream ground, high-contrast serif display, and a terracotta or signal-red accent; near-black with one neon accent and glowing edges; broadsheet-editorial hairlines, italic display serif, and small tracked mono labels. All are legitimate when the brief calls for them. Where the brief leaves the aesthetic free, landing in one means the self-check failed: if someone could guess your aesthetic from the category alone, or from category-plus-avoidance, rework until neither answer is obvious. Energy is not the enemy of trust: negative constraints (no gamification, no hype) rule out those devices, not exuberance.

## 5. Record the decision

Before code, state the chosen direction as a contract in the artifact's opening comment, five short blocks, 150 words at most, in a form that survives the production build: an HTML comment in the emitted markup, placed as the first child of the document body in the root layout. After the first production build, grep the built output for the seed phrase; a contract the build erased is a contract nobody can audit.

- THESIS: the one idea this surface owns and the category-default arrangement it refuses.
- OWN-WORLD: the palette and component language, specific enough to be recognizable with all content removed.
- STORY: what the visitor understands, believes, and does.
- FIRST VIEWPORT: the exact composition, what is where and at what scale, and where the primary action sits.
- FORM: the chosen direction and its position on the candidate list.
- FINISH: the run's exit condition: "unreviewed and undocumented is unfinished; this build ends with the review, the verdict, and DESIGN.md".

On a new or replacement world, DESIGN.md is written at finish, from the built world, not before the build. A rulebook written before the build gets defended against reality instead of describing it. An ordinary extension does not rewrite DESIGN.md.

## 6. Build with full commitment

When an approved comp exists, the comp is king. Phase one is reproduction: rebuild the comp at its own breakpoint until a screenshot at the comp's width and height overlaps it near pixel-perfectly. Exactly three concessions exist: fonts (the closest obtainable face), icons (exact match unless the user already chose an icon library), and genuine defects in the generated comp. Everything else must match. When a region keeps losing the comparison, stop recreating it in code and produce it as a rendered asset composited into the page. Only when reproduction holds does phase two begin: static regions become animated or interactive, reveals and motion are added, then responsiveness across the surface's devices.

Build the assigned direction, not a safer interpretation of it. The form supplies structure, reading order, component conventions, and native motion; the product supplies every fact. Commit every atom: nav, buttons, inputs, and links are rebuilt in the form's vocabulary. Land the first build fully committed; committing is the hard part, and the passes that follow exist to make the committed thing clear and effective, never to dilute it.

- **The first viewport is a thesis, not a header.** Demonstrate the mechanism immediately. The memory test: if someone left after one viewport, what would they describe an hour later? If the honest answer is a mood, the concept has not committed yet.
- **Prove the hero before building past it.** When an approved comp exists, render the first viewport and set it beside the comp's first viewport before any later section. Judge scale and density as quantities, not feelings.
- **Prove, don't claim.** Show the subject doing its job: the interface at work, the mechanism dramatized, specifics a competitor could not copy-paste.
- **Author the assets; never substitute chrome.** Names, entries, copy, covers, thumbnails, textures are design material. In greenwork, author every blank the ask round left open at production fidelity; label synthetic content; mark unanswered commercial claims as placeholders on the replacement list.
- **Build the form's web leverage.** When the chosen world names a technique (canvas, WebGL, view transitions, generative motion), build the technique itself, not a static imitation.
- **Pace the scroll like a studio.** Vary density, scale, image, motion, and quiet inside one grammar; the page ends anchored by a real close.
- **Use real, verified imagery when the brief implies it.** Search for the subject's physical object rather than the category; one decisive photo beats five mediocre ones. Verify URLs resolve.
- **Author motion as material.** Give the page the form's native motion once, orchestrated, rather than scattered hover effects.

Preserve semantics, accessibility, performance, responsiveness, project conventions, and working behavior.

## 7. Inspect and finish

Inspect desktop and mobile in one batched screenshot round, critique the render against the user's request and the direction contract, fix material gaps, and confirm with one final round. Two rounds is the ceiling, and fixes batch between them rather than earning per-tweak screenshots. When an approved comp exists, the critique is a side-by-side: view the comp region and the build region together, each section as its own crop at legible scale, never one full-page thumbnail.

After the second inspection round, stop polishing. Run `/design audit --smell` and `/design audit --checkup` on the changed targets once, fix what is mechanical, and capture desktop and mobile screenshots. Then run the finish review with a fresh context: step out of the build conversation and review the render against the contract, the request, and the craft-floor, scoring each material fix resolved, partial, or unresolved. A reviewer that inherits your transcript inherits your framing, your optimism, and your abstractions. Fixes scored partial or unresolved get one more batch, recapture, and verdict; stop the moment a round resolves nothing. Report the verdict table as it stands, open items included. A table with open material findings is never announced as a pass.

Then write DESIGN.md and the sidecar from the built world, ground truth over intention. A clean pass is not finished; finished is the contract kept, the comp honored, the review closed, and the system recorded.
