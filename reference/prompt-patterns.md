# Prompt patterns

How to write a UI-build prompt that produces a specific layout. Mined from the 92 prompts in the vibeui prompt library (see `scraped/vibeui-prompts.json`, local reference) and validated against the playbooks.

## The pattern

A build prompt has three beats, in order.

1. **Name the layout and its structure.** "Create a pricing section as a three-tier card layout" or "Build a hero as a split layout with the copy on the left and a product screenshot on the right."
2. **Name the components.** Enumerate what the layout must contain: heading, subheading, CTA, form fields, nav, empty state, hover state. Components you do not name default to whatever the model guesses.
3. **Anchor the style to existing truth.** End with the style-match constraint: "Match the visual style, colors, typography, and overall aesthetic of the UI shown in my screenshot." Without the anchor, the model picks its own palette and type, and the result drifts off the design system.

## Examples from the library

- Hero, split: "Create a hero section as a split layout, heading, subheading, and CTAs on one side, and a visual or product demo on the other."
- Hero, video: "Create a hero section with a looping video or animated background behind the heading text."
- Pricing: "Create a pricing section as a three-column card layout with a highlighted middle plan."
- Features: "Create a feature section as a bento grid with one large tile and several smaller ones."

## Rules

- Structure first, components second, style anchor last. Never the reverse.
- Be specific about the structure: split, centered card, bento, single column, sidebar. "A nice layout" is not a structure.
- Name the real components the surface needs, including states (empty, error, loading) when they matter.
- The style anchor is non-negotiable when a design system exists. Point at the system: "use the tokens from DESIGN.md" beats "make it look good".
- One prompt per surface. One prompt per section produces sections that do not agree.
