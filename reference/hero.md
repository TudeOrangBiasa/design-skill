# Hero playbook

The hero is the first viewport's thesis, not a header. It has one job: demonstrate the product's mechanism at real scale, in the time a visitor gives it before deciding to scroll or leave.

Not every surface has a hero. The hero belongs to **Persuade** surfaces (landing pages, marketing, campaigns) and the opening viewport of some **Experience** surfaces. An **Operate** surface's first viewport is the task itself; a **Read** surface's first viewport is the entry to content. Do not force a hero onto a mode that does not want one.

## The memory test

If someone left after one viewport, what would they describe an hour later? If the honest answer is a mood, a gradient, or "clean", the hero has not committed yet. The right answer names the product's mechanism: "it showed the chart forming as you typed", "it proved the photo cleanup on a real image".

## The anti-ruts

These are the category defaults. Recognizing one means rewriting the hero, not softening it.

- **The hero-metric template:** big number, small label, supporting stats, accent. Decorative numbers are never proof. Real, live user data can carry a metric, but the template itself is a tell.
- **The centered-stack hero:** centered logo, centered headline, centered subhead, centered CTA, maybe a product screenshot below. The composition default of every generated page. Choose an arrangement with a reason.
- **The eyebrow pill:** a tiny uppercase letter-spaced label or pill chip above the headline. Hard ban. The heading carries its own weight.
- **Full-sentence display headline:** a long headline blown up to display size dominates the viewport and leaves nothing else above the fold. Punchy short headlines at that size are fine; long ones get smaller or tighter copy.
- **The italic serif cliché:** Fraunces or Playfair italic at 96px as the default "tasteful" AI hero. Editorial registers may legitimately want it; judge by context, not by reflex.
- **Glass and gradient surfaces:** frosted panels and gradient text as the way to make the hero feel premium.
- **The fake prompt:** a blinking cursor or typed text where no input exists.
- **The spotlight glow:** a soft accent radial gradient behind the headline, added because the composition felt empty. Fix the composition instead.
- **A hero that restates the nav:** "Welcome to [Product]" plus a screenshot of the homepage. The hero must add information the nav does not.

## The doctrine

- **Demonstrate the mechanism, not the category.** Show the subject doing its job at the scale the form has in life. "The interface at work" beats "an image of the interface".
- **One line, one action, one reading order.** The offer must land in one line, the primary action must be visible without scrolling, and the eye path from hook to action must be legible in a glance.
- **Prove the hero before building past it.** When an approved comp exists, render the first viewport, capture it, and set it beside the comp's first viewport before any later section. The hero carries the run's ambition; every following section inherits its shortfall.
- **Judge scale and density as quantities.** A field at a tenth of the comp's coverage, or type at half its weight, is a different design.
- **Real imagery or none.** When the brief implies imagery, search for the subject's physical object, verify the URLs, and prefer one decisive photo over five generic ones.
- **Author, don't decorate.** Names, entries, product shots, and textures are design material. Gradients, glass, and generic icon tiles where an authored asset belongs are the gap wearing chrome.

## Working directions

These are lanes, not templates. Each joins a mechanism to a composition; the product's facts decide which one fits.

### The asymmetric split
Text on one side, the artifact on the other, balanced off-center. Headline carries the offer, the artifact demonstrates the mechanism. Best when the product has something visible to show: an interface, a physical object, a chart.

### The product demonstration
The hero IS the interface at work, full bleed or near it: a real session, real data, the cursor moving, the state changing. Best for tools where watching the work sells the work. The copy shrinks to a line and an action.

### The editorial statement
Display type as the dominant object, image secondary or absent. Best for brands where the voice is the product: publications, studios, portfolios. Requires type with real character; system faces do not qualify.

### The immersive scene
A full-bleed layered image or world with the offer overlaid. Best when the product's world is its appeal: travel, food, fashion, physical goods. The image must be real or authored, never a stock gradient.

### The live proof
A real, current datum doing something: a counter tied to live data, a before-and-after on the subject's own input, a result the visitor can verify. Best when the product's value is measurable. Decorative numbers are banned; live ones are the point.

## Composition checks

- One dominant idea per fold. The hero proposes a single thought; supporting material comes below.
- Hierarchy from size and space first: the headline leads, the subhead follows, the action sits at the natural resting point.
- Spacing rhythm inside the hero matches the page's system: more space above the heading than below it.
- The CTA names the action in one verb. "Start free", "See the result", "Trace a call". Never "Get started" on its own without context.
- Motion: one authored entrance, under 300ms, ease-out from an already-visible default, respecting `prefers-reduced-motion`. No bounce, no staggered everything, no scroll-jacking.
- Responsive: the hero composes at 320px without amputating the demonstration. The artifact scales, reflows, or reorders; it does not vanish.
- States: the hero's primary action needs hover, focus-visible, active, and loading states like any other control.

## Verify the hero

- Memory test: name the mechanism after one viewport.
- Comprehension: a first-time visitor knows what this is, why it matters, and what to do within seconds.
- Prove-the-hero: when a comp exists, the rendered first viewport matches it at the comp's width and height.
- Read the screenshot back into the conversation; a screenshot you did not read does not count.
