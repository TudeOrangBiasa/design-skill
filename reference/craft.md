# Craft Flow

Build a feature with design UX and UI quality: shape the design, land the visual direction, build real production code, inspect and improve in-browser until it meets a high-end studio bar.

Before writing code, you need: project context (PRODUCT.md / brief.md if present — otherwise gathered by asking the user a few questions), register and mode identified, and a confirmed design direction for this task (from `shape`, from [new-work.md](new-work.md), or supplied by the user). Context files are accelerators, never blockers: if they're missing, ask.

A new surface or a replacement visual world routes its direction decision through [new-work.md](new-work.md): decide what is already true, ask, choose the amount of invention, commit the world, and record the contract before any code. A narrow extension of an existing surface proceeds from the brief directly.

Treat any approved visual direction (generated mock or stated reference) as a concrete contract for composition, hierarchy, density, atmosphere, signature motifs, and distinctive visual moves. Don't let mocks replace structure, copy, accessibility, or state design. But if the live result lacks the approved direction's major ingredients, the implementation is wrong.

### Gates: do not compress

Craft has **multiple user gates**, not one:

1. **Discovery interview** (Step 1, inside shape — 2-3 questions per round, wait for answers)
2. **Visual direction probes answered** (shape Phase 1.5, only when the harness has native image generation)
3. **Brief confirmed** (Step 1)

You must stop at every gate. **Shape confirmation alone is NOT a green light to start coding.** Compressing the gates because the shape brief felt complete is the dominant failure mode of this flow.

When the harness lacks native image generation, the probe gate collapses into the brief itself, and shape confirmation advances straight to code.

## Step 0: Project Foundation

Before shape, before code: figure out what kind of project you're working in.

Look at the working directory. Run `ls`. Check for:

- An existing framework: `astro.config.mjs/ts`, `next.config.js/ts`, `nuxt.config.ts`, `svelte.config.js`, `vite.config.js/ts`, `package.json` with framework deps, `Cargo.toml` + Leptos/Yew, `Gemfile` + Rails. **If found, use it.** Do not start a parallel build, do not introduce a second framework, do not write to `dist/` or `build/` directly. Whatever pipeline the project has, respect it.
- An existing component library or design system: `src/components/`, `app/components/`, a `tokens.css` / `theme.ts`, an `astro.config` `integrations`. Read what's there before adding to it.
- An existing icon set: `lucide-react`, `@phosphor-icons/react`, `@iconify/*`, hand-rolled SVG sprites in `assets/icons/`. **Use what's already in the project**; don't introduce a second set.

If the directory is empty (greenfield), don't pick a framework silently. Ask the user via the AskUserQuestion tool, with sensible defaults framed by the brief:

```text
What should this be built on?
  - Astro (default for content-led brand sites, landing pages, marketing surfaces)
  - SvelteKit / Next.js / Nuxt (when the brief implies an app surface or significant interactivity)
  - Single index.html (one-shot demo, prototype, or a deliberately framework-free experiment)
```

Default: Astro for brand briefs, the project's existing framework for product briefs. Ask once; don't re-ask mid-task.

## Step 0.5: Identify Surface Pattern

Before shaping, before layout: identify the dominant surface pattern (Monitor / Operate / Compare / Configure / Learn / Decide / Explore), described in [layout.md](layout.md) and REFERENCE.md.

- Read the user's brief. Which surface fits? (Monitor / Operate / Compare / Configure / Learn / Decide / Explore)
- Surface determines layout topology, register, and motion approach. Layout follows from the work, not from habit.
- State surface pattern in one line before proceeding to Step 1. Surface identification is part of the brief, not a separate gate.

## Step 1: Shape the Design

Run {{command_prefix}}design shape, passing along whatever feature description the user provided. Shape is **required** for craft; it is what produces a confirmed direction.

Present the shape output and stop. Wait for the user to confirm, override, or course-correct before writing code.

If the user already supplied a confirmed brief or ran shape separately, use it and skip this step.

When the original prompt + PRODUCT.md already answer scope, content, and visual direction with no real ambiguity, the shape output can be **compact** (3-5 bullets stating what you're building and the visual lane, ending with one or two specific questions or "confirm or override"). The full 10-section structured brief is reserved for genuinely ambiguous, multi-screen, or stakeholder-heavy tasks. Don't pad a clear brief into a long one to look thorough; equally, don't skip the pause to look efficient.

If the harness has native image generation, a compact shape's "confirm or override" advances to shape's visual direction probe (Phase 1.5), not to code. Phrase the closing line accordingly: "Confirm or override; once we lock direction, I'll run a couple of palette and reference questions before generating any mocks." This stops the model from reading shape confirmation as code-green.

## Step 2: Load References

Based on the design brief's "Recommended References" section, consult the relevant design reference files. At minimum, always consult:

- [layout.md](layout.md) for layout and spacing
- [typeset.md](typeset.md) for type hierarchy

Then add references based on the brief's needs:
- Complex interactions or forms? Consult [interaction.md](interaction.md)
- Animation or transitions? Consult [animate.md](animate.md)
- Color-heavy or themed? Consult [colorize.md](colorize.md)
- Responsive requirements? Consult [responsive.md](responsive.md)
- Heavy on copy, labels, or errors? Consult [clarify.md](clarify.md)
- New surface or replacement world? Consult [new-work.md](new-work.md) and [modes.md](modes.md)

Load [craft-floor.md](craft-floor.md) immediately before editing UI. It carries the quality floor, the absolute bans, and the reflexes no detector catches. Do not load it for planning-only work.

## Step 3: Visual Direction (Harness-Gated)

**New surface or replacement world:** follow [new-work.md](new-work.md) sections 1-5. Decide what is already true, ask the mode-shaped questions, choose the amount of invention, commit the world (color strategy, faces, calibration), and record the direction contract. Present the committed direction and stop for confirmation.

**Narrow extension:** the brief is the direction. If the harness has native image generation, shape's visual direction probe (Phase 1.5) already ran: 2-4 direction probes were generated, the user picked a lane, and the brief was updated. Treat the winning probe as the contract for composition, hierarchy, density, atmosphere, and signature motifs.

If the harness lacks native image generation, **state in one line that the visual-direction-by-generation step is being skipped because the harness lacks native image generation, then proceed**. The one-line announcement is required; it forces a conscious decision instead of letting the step quietly evaporate. The brief is your only visual reference. Implement directly from it, treating any named anchor references and the brief's "Design Direction" as the contract.

Whether you generated mocks or not: don't replace required imagery with generic cards, bullets, emoji, fake metrics, decorative CSS panels, or filler copy. Image-led briefs (restaurants, hotels, magazines, photography, hobbyist communities, food, travel, fashion, product) need real or sourced imagery in the build, not CSS scenery.

## Step 4: Build to Production Quality

**Precondition.** The discovery interview, probe gate, and brief confirmation must be complete before any code. **Do not mention implementation, file paths, or patch plans until the brief is confirmed.** A confirmed shape brief is not enough; the model that compressed those gates is the model that already failed this flow.

Implement the feature following the design brief. Build in passes so structure, visual system, states, motion/media, and responsive behavior each get deliberate attention. The list below is the definition of done, not inspiration.

### Production bar

- **Real content.** No placeholder copy, placeholder images, dead links, fake controls, or unused scaffold at presentation time.
- **Preserve the approved mock's major ingredients.** Missing hero objects, world/product imagery, section structure, CTA/nav treatment, or distinctive motifs are blocking defects unless the user accepted the change.
- **Semantic first.** Real headings, landmarks, labels, form associations, button/link semantics, accessible names, state announcements where needed.
- **Deliberate spacing and alignment.** No default gaps, arbitrary margins, unbalanced whitespace, or accidental optical misalignment.
- **Intentional typography.** Chosen loading strategy, clear hierarchy, readable measure, stable line breaks, no overflow at any width.
- **Realistic state coverage.** Default, hover, focus-visible, active, disabled, loading, error, success, empty, overflow, long/short text, first-run.
- **Finished interaction quality.** Keyboard paths, touch targets, feedback timing, scroll behavior, state transitions, no hover-only functionality.
- **Coherent icon set.** Use the project's established set; otherwise pick one library or use accessible text. Don't mix.
- **Respect the build pipeline.** Edit source files and run the project's build (`npm run build` or equivalent). Don't write to `build/` / `dist/` / `.next/` with `cat`, heredoc, or Bash redirects; that skips asset hashing, image optimization, code splitting, and CSS extraction, and produces output the dev server won't serve.
- **Verify image URLs before referencing them.** Use image-search MCP or web-fetch when available; guessed photo IDs ship as broken-image placeholders. Without verification, prefer fewer images you're confident about.
- **Optimized imagery and media.** Correct dimensions, useful alt text, lazy loading below the fold, modern formats when practical, responsive `srcset`/`picture` for raster, no project-referenced asset left outside the workspace.
- **Premium motion.** Use atmospheric blur, filter, mask, shadow, reveal when they improve the experience. Avoid casual layout-property animation, bound expensive effects, verify smoothness in-browser, respect reduced motion, and avoid choreography that blocks task completion.
- **Maintainable.** Reusable local patterns, clear component boundaries, project conventions. No rasterized UI text or one-off hacks when a local pattern exists.
- **Technically clean.** Production build passes, no console errors, no avoidable layout shift, no needless dependencies, no broken asset paths.
- **Ask when uncertain.** If a discovery materially changes the brief or approved direction, stop and ask. Don't guess.

## Step 5: Inspect and Finish

**Bounded passes, not a loop.** Build fully, then inspect in batched rounds. Open-ended self-QA burns time doing worse what a fresh review does better.

1. **Round one (batched):** capture desktop and mobile in one screenshot round. Read the PNGs back into the conversation; a screenshot you didn't read doesn't count. For long-form surfaces, inspect major sections individually; thumbnails hide spacing, clipping, and cascade defects. Critique the render against the brief, the approved mock's major ingredients (hero silhouette, motifs, imagery, nav/CTA, density), and the craft-floor. Patch every material defect it shows in one batch.
2. **Round two (confirm):** recapture the same viewports and confirm. Two rounds is the ceiling. After it, stop polishing; whatever remains ships as reported, not as a silent gap.
3. **Mechanical sweep:** run `/design audit --smell` and `/design audit --checkup` on the changed targets once, fix what is mechanical, and pass remaining findings into the review.
4. **Fresh-context review:** step out of the build conversation and review the render against the contract, the request, and the craft-floor. A reviewer that inherits your transcript inherits your framing and your optimism. Score each material fix resolved, partial, or unresolved; fixes scored partial or unresolved get one more batch, recapture, and verdict. Stop the moment a round resolves nothing.
5. **Record:** for a new surface or replacement world, write DESIGN.md and the sidecar from the built world (see new-work). A clean pass is not finished; finished is the contract kept, the review closed, and the system recorded.

Don't invent defects to demonstrate iteration. A confident "first pass clean, shipping" beats a fake fix. Detector or QA output is defect evidence only; never proof the work is finished.

## Step 6: Present

Present the result to the user:
- Show the feature in its primary state
- Summarize the browser/viewports checked and the most important fixes made after inspection
- Walk through the key states (empty, error, responsive)
- Explain design decisions that connect back to the design brief and, when used, the chosen north-star mock. Include any accepted deviations from the mock; do not hide unimplemented mock ingredients.
- Note any remaining limitations or follow-up risks honestly
- Ask: "What's working? What isn't?"
