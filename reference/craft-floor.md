# Craft floor

Load after the direction is settled, right before editing UI. The floor holds mechanics, never direction; a pinned brief or committed visual world overrides anything here, your own habit does not.

## Verify

Each check runs on the built result, not the intention; run them together in batched inspection rounds, one shared render.

- **Contrast:** body and placeholder ≥4.5:1, large text ≥3:1. On colored surfaces, tint secondary text from that hue; never gray.
- **Depth:** shadows carry an offset and a soft blur. A zero-offset colored halo is decoration.
- **Spacing:** tight groups, generous separation, more space above a heading than below it. Read the computed values.
- **Type:** body 60-76ch, display ≤6rem, tracking ≥-0.04em, balanced headings, obvious scale/weight steps; run real copy at every breakpoint, fix overflow.
- **Motion:** one authored moment, not scattered effects, not one identical entrance per section. Exponential ease-out from an already-visible default. Blur/filter/clip/mask/shadow are palette when smooth.
- **States:** hover, disabled, loading, error, empty. Plus real content, working controls, responsive composition, keyboard focus.
- **Browser surfaces:** text selection, the caret, custom scrollbars, focus rings, underline offset, tabular numerals - the parts you did not draw still carry the design. Theme them from the palette.
- **Copy:** the product's own language; controls name their action, errors name the problem and the recovery. No em dashes, filler, or promotional words.
- **Coverage:** every brief requirement present and findable within seconds.

## Refuse

Category defaults, not bans - the brief's own words can earn any. Reaching for one when the axis is free means you were not deciding; rewrite the element, don't soften it.

Page scaffolds:

- Same-size icon+heading+text cards as the page structure. Cards are the lazy container; nested cards are always wrong.
- The hero-metric template: big number, small label, stats, accent.
- A kicker or eyebrow above a heading - a ban, not a default; no brief earns it back.
- Section numbers (01/02/03) unless the sequence itself carries information.
- A modal for a task that needs neither interruption nor protected focus.

Surface habits:

- Gradient text. Emphasis comes from weight or size.
- Glass and blur as decoration rather than a specific effect.
- A colored border-left/right above 1px on cards, list items, callouts, alerts.
- Hard offset shadows (4px 4px 0) outside a world that is actually neobrutalist.
- Sparklines, progress rings, soft-shadow rectangles standing in for content.
- Monospace as a "technical" costume, not for code, data, or measurement.
- A system display face (Impact, Arial Black) as the display voice; source a face matching the approved lettering.
- **Emoji or unicode glyphs standing in for an icon system.** Hard ban. Use one real icon set - Lucide, Phosphor, Tabler, Iconoir, Humbleicons, Flowbite - or an authored SVG set in one consistent stroke and weight; never mix sets.
- Light or dark picked by category. Pick from the use scene: who, where, what ambient light.

Mechanics:

- Tracking stops at -0.04em; -0.02/-0.03em reads better.
- Declare elevation once, border or shadow. A 1px border under a wide soft shadow is the ghost card; radii 12-16px, pills for small controls.
- Real illustration or none. Sketch-style SVG scenes and feTurbulence grain read as amateur; SVG doing geometry - crisp shapes, diagrams, animated linework, shaders - stays first-class.
- Backgrounds are surfaces, textured only from the subject's world; a CSS gradient wash is a fallback of last resort, stripes/grid overlays need a real canvas, map, or blueprint under them.
- Claims and configuration come from supplied truth; label illustrative values honestly.

## In practice

The mechanical checks overlap with `audit`; when an audit report exists, act on its findings instead of re-auditing. With every check green, spend the page on the committed world; when torn between refined and committed, commit.
