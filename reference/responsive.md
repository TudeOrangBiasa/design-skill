# Responsive Design `/design responsive`

Responsive design is not making a desktop layout smaller. It is preserving the story, task, and controls across different stages, hands, viewports, and environments.

Screen size is only one variable. Input mode often matters more.

---

## Discipline files

Responsive drives the recomposition pass — consult these when each dimension comes up during responsive work, not as separate passes to layer on:

- [layout.md](layout.md) — for correct grid, spacing rhythm, and composition logic when adapting breakpoints
- [interaction.md](interaction.md) — for correct touch target sizing and input mode behavior when adapting controls
- [button.md](button.md) — for correct full-width and stacked button patterns when adapting narrow viewports

---

## Pre-execution checklist

Before proceeding, check for existing reports in the `.commandcode/design/` directory. Look for these files:

- `checkup-report.md`
- `review-report.md`
- `smell-report.md`

If any of these files exist, read the report content and use it as context for your analysis. Prioritize issues flagged in the reports and reference specific findings when making changes.

If no reports are found, proceed with the task normally.

---

---

## Composition Changes Across Context

The work pattern stays. The composition can change.

Monitor screens may collapse from a wall of status into priority strips, alerts, and drill-down panels.

Operate screens may move primary commands near the thumb and hide secondary tools behind stable drawers.

Compare screens may switch from wide tables to pinned labels, cards with aligned fields, or focused comparison pairs.

Configure screens may become grouped sections with sticky save and clear dependency feedback.

Learn screens may lengthen into a readable article path with progress cues.

Decide screens may reduce to claim, proof, action, and escape.

Explore screens may shift filters into drawers, maps into lists, and galleries into search-led flows.

Responsive work preserves the job, not the desktop shape.

---

## Adaptation Bar

`/design responsive` recomposes the interface across contexts. It is not a max-width tweak.

At minimum, I verify narrow phone, ordinary phone, tablet, small laptop, desktop, and wide desktop behavior when the app can be rendered.

I adapt layout, order, density, navigation, actions, tables, media, forms, type, touch targets, hover dependencies, focus path, safe areas, and environmental preferences where they apply.

If the same desktop composition merely shrinks, the responsive pass failed.

---

## My Starting Bias

I start from the smallest reasonable canvas and add complexity as space earns it. I do not worship the phrase mobile-first. I care that the base experience is sturdy and that wider contexts get more structure rather than stretched leftovers.

Breakpoints come from content pressure. When the content breaks, the layout changes.

---

## Viewports I Respect

I test narrow phones, ordinary phones, tablets, small laptops, standard desktop, and ultrawide screens.

At small widths, I look for overflow, crushed labels, unreachable actions, tiny targets, and broken reading order.

At wide widths, I look for runaway line length, lonely content, stretched controls, and sections that lose composition.

---

## Input Modes

I do not equate phone with touch or desktop with mouse.

Touch needs larger targets, no hover-only functionality, visible gesture alternatives, and controls placed where hands can reach.

Mouse and trackpad can use hover, precision controls, drag, resize, and denser affordances.

Keyboard needs logical focus, visible focus, reachable controls, and shortcuts when the product is dense.

Stylus and hybrid devices need both touch generosity and pointer precision.

---

## Thumb Reach

On phones, the bottom of the screen is easier to reach than the top. Primary actions belong where hands naturally operate. Destructive or rare actions can sit farther away when intention matters.

This is not a law for every app shell, but it is a pressure I account for.

---

## Component Adaptation

Components should adapt to their container when possible.

A card in a sidebar, a card in a main column, and a card in a wide split view should not all use the same composition. Page breakpoints cannot solve every component context cleanly.

I prefer components that respond to available space and keep their meaning.

---

## Environmental Preferences

Responsive includes the user's environment.

Dark mode is a real theme. Reduced motion gets an authored alternative. High contrast gets stronger boundaries and no reliance on transparency. Inverted colors and zoom must not destroy meaning.

Safe areas matter. Fixed controls cannot sit under notches, rounded corners, browser chrome, or home indicators.

---

## Responsive Type

Product UI keeps predictable type scales. Brand display can be fluid. Body text remains readable, not theatrical.

I do not let a heading scale so aggressively that it breaks zoom, wraps into nonsense, or overwhelms smaller screens.

---

## Tables

Tables need a chosen strategy.

Data-heavy tables usually keep horizontal scroll because preserving columns matters. Small comparison tables can become cards. Mixed-importance tables can hide lower-priority columns. Very small screens may need stacked cells.

I do not mix strategies randomly on the same table.

---

## What I Refuse

- Core features hidden on mobile
- Calling a width tweak a responsive pass
- Desktop composition simply squeezed smaller
- Hover-only controls
- Touch targets sized for cursors
- Separate mobile and desktop code paths with different IA
- Fixed widths that cause horizontal scroll
- Ultrawide pages with unreadable line length
- Safe-area ignorance on fixed bars
- Device detection when feature detection is the real need
- Fluid type in dense product UI because it seems modern

---

## How I Know Responsive Works

- The rendered UI was checked at multiple viewport classes
- Composition adapts where the job or content pressure changes
- The same story survives across viewports
- Controls fit the input mode
- Nothing overflows at narrow widths
- Wide layouts stay composed
- Keyboard and touch both complete the core task
- Safe areas protect fixed controls
- Dark, reduced-motion, high-contrast, and zoom states remain usable
- Tables keep their data meaning

STRICT RULE — NEVER BREAK THIS
Do not create report.md, any kind of report, summary, analysis file,
or extra documentation. This applies every time this file is used.
Generate no reports unless explicitly asked.
