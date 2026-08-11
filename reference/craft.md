# Craft: brief-confirmed build

Build with real design quality. **Never start code without a confirmed brief** - `shape` first (shape.md). Context files (PRODUCT.md/DESIGN.md/brief.md) are accelerators, never blockers: load, never block.

## Gates - do not compress

1. **Discovery interview** (shape frontier rounds, wait for answers).
2. **Brief confirmed** (shape output, user-confirmed).
3. **Direction locked** (register + mode + direction from the brief).

Shape confirmation alone is NOT code-green; compressing the gates is the dominant failure mode. After the brief is confirmed, build - do not re-interview.

## Step 0: project foundation

Respect what exists: the project's framework (Astro/Next/SvelteKit/Vite - never a parallel build, never writing to `dist/`/`build/` directly), its component library and icon set (use what's there; never introduce a second set). Greenfield: ask once - Astro for brand/content-led, the project framework for app surfaces, single index.html for a one-shot.

## Build to production quality

- **Real content.** No placeholders, fake controls, dead links, or unused scaffold at presentation time.
- **Semantic first.** Headings, landmarks, labels, form associations, accessible names.
- **Deliberate spacing, intentional typography, realistic states** (hover/focus-visible/active/disabled/loading/error/empty), finished interaction quality (keyboard paths, touch targets, no hover-only functionality).
- **Coherent icon set** - one, never mixed (Lucide, Phosphor, Tabler, Iconoir, Humbleicons, Flowbite, or the project's own).
- **Verify image URLs before referencing**; optimized media with alt text.
- **Premium motion, purpose-gated** (see --animate below); respect reduced motion.
- **Respect the build pipeline**, technically clean, no avoidable layout shift.
- Ask when a discovery materially changes the brief. Don't guess.

## Ability flags

Flags apply the matching reference, never standalone commands:

- `--typeset` - type hierarchy, measure, scale (craft-floor type checks)
- `--colorize` - palette strategy per register
- `--layout` - surface topology: asymmetry or rigorous grid, spacing rhythm
- `--animate` - motion. **Before animating, browse the motionsites.ai free gallery** (free tier only - the paid "Go Unlimited" prompts are NOT to be copied; licensing) and name 2-3 reference directions (easing, entrance choreography, section rhythm) citing the page. Motion must have purpose: one primary motion per surface, never animate everything; use `grid-template-rows` for collapsing sections.
- `--document` - after the build, generate/update `DESIGN.md` per the google-labs-code/design.md spec (frontmatter tokens + 8 ordered sections: Overview, Colors, Typography, Layout, Elevation, Shapes, Components, Do's and Don'ts; `{path.to.token}` references; unitless spacing for lineHeight/spacing only; variants as sibling keys), then validate: `node scripts/design.mjs validate DESIGN.md` (the official `@google/design.md` lint is optional, never required).

## Inspect and finish

**Bounded passes, not a loop.** Capture desktop + mobile in one round, read the screenshots back, patch every material defect in one batch, recapture to confirm. Two rounds is the ceiling; after it, ship as reported, never as a silent gap. Mechanical sweep first: `node scripts/detector.mjs <target>` on changed files, fix what is mechanical, then `audit`. Don't invent defects to demonstrate iteration; detector output is defect evidence, never proof of completion.

## Drift upkeep

Keep design memory truthful: DESIGN.md reflects the built world; PRODUCT.md is canonical over README/PRD disagreement; legacy brief.md answers belong in PRODUCT.md (show the merge, ask before removing). One source of truth per answer; report drift in one line when noticed, never repair it silently.

## Present

Show the primary state, summarize the viewports checked and the most important fixes, walk the key states, connect decisions back to the brief, note remaining limitations honestly. Ask: "What's working? What isn't?"
