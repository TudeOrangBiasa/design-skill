# Register: brand or product

The durable lane of the product, read together with the per-surface mode (modes.md). Choose once, record it, keep it stable.

## Brand register

Design IS the product: brand sites, landing pages, marketing, portfolios, long-form, campaigns. A visitor's impression is the deliverable.

- **Slop test:** if someone could say "AI made that" without hesitation, it failed. Restraint without intent reads as mediocre - brand surfaces need a POV and a specific audience. Go big or go home.
- **Aesthetic lane:** name the reference before committing ("Klim specimen", "Stripe restraint", "Liquid Death acid"). Don't drift into editorial-magazine aesthetics on a non-editorial brief. If a competitor's description of your page fits the category's modal template, restart.
- **Type:** pick a font as a physical object (a museum caption, a 1970s terminal manual), not by reflex. Reject training-data defaults: Fraunces, Newsreader, Lora, Crimson, Playfair, Cormorant, Syne, IBM Plex, Space Mono/Grotesk, Inter, DM Sans/Serif, Outfit, Plus Jakarta Sans, Instrument Sans/Serif. Two families only when the voice needs it; committed single-family beats timid pairing. ≥1.25x scale, fluid `clamp()`, 60-76ch.
- **Color:** palette IS voice. Committed, Full, or Drenched strategies are permission, not excess. Beige-and-muted-slate is the failure. Don't converge across projects.
- **Layout:** asymmetric or rigorously gridded - never the split-the-difference centered stack. Cards OK with `repeat(auto-fit, minmax(280px,1fr))`.
- **Imagery:** image-led briefs MUST ship imagery (real or generated). One decisive photo beats five mediocre ones. Verify stock URLs before referencing. Alt text is part of the voice.
- **Motion:** one well-orchestrated entrance or none. Grid-template-rows for collapsing sections.
- **Permissions:** ambitious first-load motion, single-purpose viewports, typographic risk, unexpected color, per-section art direction.
- **Bans:** mono as "technical" costume, big rounded icon tiles above headings, all-caps body, tiny tracked labels as section grammar, zero imagery on image-led briefs.

## Product register

Design SERVES the product: app UI, dashboards, admin, settings, tables, tools, authenticated surfaces. The tool disappears into the task.

- **Slop test:** not "would someone say AI made this" - familiarity is a feature. Would a fluent user trust this interface, or pause at every subtly-off component? The failure is strangeness without purpose.
- **Type:** system fonts are legitimate; one family is often right. Fixed rem scale (not fluid), 1.125-1.2x steps, 65-75ch for prose, denser for data.
- **Color:** Restrained is the floor; a surface can earn Committed. State-rich semantic vocabulary (hover, focus, active, disabled, selected, loading, error). Accent for primary actions, selection, and states only.
- **Layout:** predictable grids; consistency IS an affordance. Standard navigation, breadcrumbs, tabs are features, not reinventions. Responsive behavior is structural.
- **Components:** every interactive component ships default, hover, focus, active, disabled, loading, error. Skeletons not mid-content spinners. Empty states that teach.
- **Motion:** 150-250ms, state-conveying only, no orchestrated page-load sequences.
- **Permissions:** system fonts, standard nav patterns, density, consistency over surprise.
- **Bans:** decorative motion, inconsistent component vocabulary, display fonts in UI labels, reinvented standard affordances.

## Voice

- Brand voice: three concrete physical-object words ("warm and mechanical and opinionated"), never "modern" or "elegant".
- Copy is the product's own language: controls name their action, errors name the problem and the recovery, claims are fact-checkable.
- The brief wins over every pattern here. A documented design decision that deliberately breaks a rule suppresses the finding.
