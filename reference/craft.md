# Craft: brief-confirmed build

Build with real design quality. **Never start code without a confirmed brief** - `shape` first (shape.md). Context files (PRODUCT.md/DESIGN.md/brief.md) are accelerators, never blockers: load, never block.

## Gates - do not compress

1. **Discovery interview** (shape frontier rounds, wait for answers).
2. **Brief confirmed** (shape output, user-confirmed).
3. **Direction locked** (register + mode + direction).

Shape confirmation is NOT code-green; compressing gates is the dominant failure mode. After confirmation, build - do not re-interview.

## Reference hunt

Before writing markup, web-search 2-3 inspirations for the brief (layout, type, palette) and cite them; name what works for THIS brief, then exceed it. Never copy a template - references pick a lane (motionsites below is the motion case).

## Step 0: project foundation

Respect what exists: the project's framework (Astro/Next/SvelteKit/Vite - no parallel build, no direct writes to dist/build), its component library and icon set (use what's there). Greenfield: ask once - Astro for brand/content-led, the project framework for app surfaces, single index.html for a demo.

## Build to production quality

- **Real content.** No placeholders, fake controls, dead links, or scaffold at presentation.
- **Semantic first.** Headings, landmarks, labels, form associations, accessible names.
- **Deliberate spacing, intentional typography, realistic states** (hover/focus-visible/active/disabled/loading/error/empty), finished interaction quality (keyboard paths, touch targets, no hover-only).
- **Coherent icon set** - one real set, never hand-drawn mascots (SKILL.md doctrine).
- **Imagery** - real/generated, URLs verified, alt text; colored div is a bug (SKILL.md doctrine).
- **Premium motion, purpose-gated** (see --animate); respect reduced motion.
- **Respect the build pipeline**, technically clean, no layout shift.
- Ask when a discovery changes the brief.

## Ability flags

Flags apply the matching reference, never standalone commands:

- `--typeset` - hierarchy, measure, scale (craft-floor checks)
- `--colorize` - palette strategy per register; OKLCH-first, convert to hex/hsl only where the framework needs it
- `--layout` - surface topology (SKILL.md Build doctrine)
- `--animate` - motion. **Before animating, browse the motionsites.ai free gallery** (free tier only - the paid "Go Unlimited" prompts are NOT to be copied; licensing) and name 2-3 reference directions (easing, entrance choreography, section rhythm) citing the page. Motion must have purpose: one primary motion per surface, never animate everything; use `grid-template-rows` for collapsing sections. Ambitious upper end: shaders, spring physics, scroll-driven reveals - one committed system.
- `--document` - after the build, generate/update `DESIGN.md` per the google-labs-code/design.md spec (frontmatter tokens + 8 ordered sections: Overview, Colors, Typography, Layout, Elevation, Shapes, Components, Do's and Don'ts; `{path.to.token}` references; unitless spacing for lineHeight/spacing only; variants as sibling keys), then validate: `node scripts/design.mjs validate DESIGN.md` (@google/design.md lint optional).

## Inspect and finish

**Bounded passes, not a loop.** Capture desktop + mobile in one round, read the screenshots, patch every material defect in one batch, recapture. Two rounds is the ceiling; after it, ship as reported, never as a silent gap. Mechanical sweep first: `node scripts/detector.mjs <target>` on changed files, fix what is mechanical, then `audit`. Detector output is defect evidence, never proof of completion.

## Drift upkeep

Keep design memory truthful: DESIGN.md reflects the built world; PRODUCT.md is canonical over README/PRD disagreement; brief.md answers belong in PRODUCT.md (show the merge, ask first). One source of truth per answer; report drift in one line, never repair silently.

## Present

Show the primary state, the viewports checked, the key fixes, states, and decisions tied to the brief; note limitations. Ask: "What's working? What isn't?"
