# Smell: `/design smell`

I use smell to catch generic design before it spreads. This is not a broad review. It is a detector for reflex, template, and generated sameness.

When a surface smells wrong, I fix the category reflex first. Cosmetic edits do not remove the odor.

---

## Composition Smell

I check whether the composition came from the work or from habit.

Monitor smell: status hidden inside equal cards, alerts without priority, live data treated as static decoration.

Operate smell: tools far from objects, no inspector, no command surface, no fast feedback.

Compare smell: comparison forced into unrelated cards, missing alignment, weak filters, unstable scan paths.

Configure smell: settings scattered by visual balance instead of dependency and consequence.

Learn smell: sections arranged as feature tiles when the user needs a path.

Decide smell: too many equal calls to action, proof buried below ornament.

Explore smell: search, filters, results, and backtracking treated as afterthoughts.

Centered grid is not automatically wrong. It is wrong when it has no work-pattern reason to exist.

---

## Prompt Drift Smell

I treat prompt drift as a severe smell.

Wrong name, recycled logo mark, reused headline structure, inherited proof object, generic visual artifact, and domain objects from an unrelated brief all mean the design is not listening.

The fix is not copy editing. The fix is returning to the current prompt's name, category, user, job, artifact, evidence, and refused drift.

---

## Evidence Bar

`/design smell` names generic design tells from the actual surface. It does not invent odor.

At minimum, I identify the visible pattern, the reflex behind it, why it weakens this specific brief, and the right mode to fix it.

If a smell is only a suspicion, I mark it as a suspicion. I do not report it as observed.

---

## What Smell Means

A smell is a choice that looks unchosen.

It may be competent. It may even be accessible. The problem is that it could have come from any prompt, any template, any average SaaS homepage, any safe default.

I look for the moment where the design stopped making project-specific decisions.

---

## Detector Pass

Before the LLM judgment, run the deterministic detector once. It catches the mechanical tells with no model and no API key:

```bash
node {{scripts_path}}/detector.mjs <file|dir|url> [--json]
```

It covers emoji icons, gradient text, the AI palette, cream backgrounds, overused fonts, italic serif displays, crushed tracking, oversized headlines, icon tile stacks, nested cards, side-tab borders, ghost cards, over-rounding, bounce easing, pulsing dots, blinking cursors, marquees, broken images, missing alt, content hidden at rest, eyebrow labels, marketing buzzwords, aphoristic cadence, em-dash saturation, glowing shadow accents, radial gradient halos, the default semantic palette, same-hue status boxes, atmosphere gradients, glassmorphism, decorative strikes, flat type hierarchy, invented stat rows, AI copy tics, decorative star ratings, badge spam, tinted icon containers, springy scale hovers, all-caps label grids, mono chrome, editorial dressing, and equal-weight card grids.

The detector output is defect evidence, never the verdict. Merge its findings with the LLM pass, mark false positives honestly, and judge severity yourself. Error-severity findings block shipping until fixed or explicitly accepted.

---

## Two Smell Lenses

Smell applies two lenses to a layout, and judges both.

**Functional smell (Operate, Read):** does the layout serve the task?
- Hierarchy: can the eye find the primary action in two seconds?
- Scanability: are groupings and separations legible at a glance?
- Density: does spacing match the content type, or is everything one size?
- States: are empty, error, loading, and disabled states present and honest?
- Alignment: optical alignment, consistent rhythm, no stray gaps.
- Structure: does the layout reflect the task's real order (see the surface patterns in REFERENCE.md)?

**Artistic smell (Persuade, Experience):** does the layout have voice?
- The odors list below: tech gradient, feature tile grid, center stack, and the rest.
- Composition: did the arrangement come from the work or from habit?
- Calibration: could the aesthetic be guessed from the category alone?

A layout can pass one lens and fail the other. A functional Operate surface with perfect hierarchy can still smell from generic type and voiceless details. A striking Persuade hero can fail functionally with a buried CTA and no reading order. Judge both, and name which lens each finding belongs to.

---

## The Odors I Track

**Tech gradient**: blue-violet, indigo-cyan, and purple-to-teal glossy energy plastered on heroes, CTAs, cards, or text. The visual shorthand for "AI startup."

**Generic tech hue**: blue-purple as the primary identity for anything vaguely technical or software-adjacent.

**Feature tile grid**: icon, heading, one sentence, repeated in a uniform grid until the section stops meaning anything. Every card equal, nothing prioritized.

**Accent rail**: a colored stripe on one side of cards or callouts added to simulate structure. Decoration pretending to be organization.

**Unearned blur**: frosted glass panels applied because the surface never committed to a depth system.

**Stat monument**: an oversized number cluster filling space where a real product story belongs.

**Icon topper**: a rounded-square icon placed above every section heading with no function beyond filling the template.

**Bounce everywhere**: motion that turns every interaction into a toy. Elastic easing applied because it was available.

**Default type**: a common family used with no voice, no scale, no reason. The font that appeared because no choice was made.

**Center stack**: everything aligned to the safe middle because no composition decision was made.

---

## The Tells Registry

The deterministic catalog, aligned with impeccable's antipattern detector. Every tell is a named pattern you can point to on the actual surface. Grouped by what it pollutes.

### Layout
- **Side-tab accent border:** a thick colored border on one side of a card. The most recognizable AI tell. Use a subtler accent or none.
- **Border accent on rounded element:** a thick accent border on a rounded card clashes with the corners. Remove the border or the radius.
- **Nested cards:** cards inside cards create noise and false depth. Flatten with spacing, type, and dividers.
- **Monotonous spacing:** one spacing value everywhere, no rhythm. Tight groups, generous separations.
- **Icon tile stack:** a small rounded-square icon container above every heading, the universal feature-card template. Side-by-side or in-flow instead.
- **Numbered section labels:** tiny index numbers riding beside headings, repeated section after section. Editorial scaffolding, not structure.
- **Edge-flush cards:** cards touching viewport edges with no margin.
- **Content invisible at rest:** page text at opacity 0 after all reveals ran. The failed-reveal signature; content must be visible by default.
- **Equal-weight card grid:** three or more identical cards in a 3-column grid, each an icon, a heading, and one line. Structure faked by stuffing unrelated things into identical boxes; decide the one most important thing and show it fully.
- **All-caps label grid:** uppercase micro-labels stamped across interchangeable cards. The default costume for "looks designed".
- **Invented stat rows:** a row of round numbers (`10k+`, `99.9%`, `24/7`) that are set dressing, not measurements. Real numbers are odd and specific; one invented figure poisons every true one beside it.

### Typography
- **Overused font:** Inter, Roboto, Fraunces, Geist, Plus Jakarta Sans, Space Grotesk appear on so many sites they no longer feel distinctive. Choose a face with personality.
- **Flat type hierarchy:** sizes too close together. Fewer sizes, more contrast, at least a 1.25 ratio between steps.
- **Italic serif display:** an oversized italic serif (Fraunces, Playfair, Newsreader) as the hero headline, the universal AI-startup landing. Set roman or change the face.
- **Hero eyebrow chip:** a tiny uppercase letter-spaced label above the oversized hero headline, or the same shape as a pill. The heading carries its own weight.
- **Oversized hero headline:** a full sentence set at display size dominates the viewport. Punchy short headlines at that size are fine.
- **Crushed letter spacing:** tracking pulled past legibility. Tighten optically, not destructively.
- **Decorative strikes and highlights:** strikethrough on words that are not being deleted, underlines that are not links, highlighter marks. The model does not trust the words to carry weight, so it draws on them; weight, size, and sentence structure should carry emphasis.
- **Mono chrome:** the terminal look for its own sake: monospace across all UI, near-black surface, one warm accent, ASCII art. It is not ugly, which is the trap. Keep mono for code, not UI chrome.
- **Editorial dressing on operational surfaces:** cream paper, display serif, and tracked-caps kickers applied to a dashboard or console. A magazine is read once; a console is scanned all day. Tabular numerals and a legible sans belong to scanned interfaces.

### Color
- **AI palette:** purple-violet gradients and cyan-on-dark.
- **Cream or beige palette:** the warm off-white default reached for by reflex.
- **Gradient text:** decorative gradient on headings and metrics.
- **Glowing shadow accents:** zero-offset chromatic halos, or colored blurred shadows on dark backgrounds.
- **Radial halo:** a saturated radial-gradient wash used as a background glow.
- **Spotlight glow:** a low-opacity accent radial gradient behind a hero, the translucent cousin of the halo.
- **Default semantic palette:** the framework info/tip/success/error set (blue, amber, green, red in -50 backgrounds with -600 text), unrelated to the brand or to each other. Grow semantic colors out of one palette; most notes need no color at all.
- **Same-hue status box:** border, text, and background all one hue, the background a see-through version of it. Red on red, green on green; a traffic light is not a palette. Carry the state in words and weight first.
- **Atmosphere gradients:** gradients as mood, not decisions: repeating stripes, gradient card fills, a radial spotlight behind everything. Pick one flat background and hold it; build depth with hairlines and restrained shadows.
- **Glassmorphism:** `backdrop-blur` on navbars, modals, and overlays as a status signal rather than a legibility decision. A frozen slice of 2021 Dribbble.

### Motion
- **Bounce or elastic easing:** dated. Exponential ease-out instead.
- **Pulsing status dot:** decoratively simulates liveness. Reserve pulse for genuinely live data.
- **Blinking cursor:** a fake typing prompt in a hero where no input exists.
- **Auto-scrolling marquee:** demands attention it has not earned and hides half its content.
- **Springy scale hover:** every card, button, and image grows on hover (scale-105, transition-all). Motion is information; scaling says nothing, and animating every property at once is deciding none of them matters. Hover feedback is a surface shift, not growth.

### Imagery
- **Emoji icon:** an emoji standing in for an icon system. Icons come from one real product in a consistent stroke and weight; the moment two emoji styles mix, the system is broken.
- **Shape-assembled illustration:** a hero-sized SVG built from primitive shapes reads as placeholder clip art. Real artwork, a deliberate graphic, or none.
- **Broken or placeholder image:** an empty src ships as a broken box.

### Components
- **Badge and pill spam:** "New", "Beta", "Hot" pills everywhere, manufacturing a fake sense of buzz and credibility. Badges mark status; in bulk, each one stops meaning anything.
- **Tinted icon containers:** every icon wrapped in a rounded square washed in 10% of its own hue (bg-{color}/10 behind text-{color}). A one-line reflex, not a decision; let an icon be an icon.
- **Glowing status dot:** (under Motion; the halo and pulse are its decoration.)

### Copy
- **Marketing buzzword:** `streamline`, `empower`, `supercharge`, `world-class`, `enterprise-grade`. Say what the product literally does.
- **Aphoristic cadence:** three or more sections landing on a short manufactured-contrast line ("Not a feature. A platform."). Once is voice; repetition is the tell.
- **Em-dash overuse:** saturation in body copy, near one em dash per 500 characters. Prefer commas, colons, periods, parentheses.
- **AI copy tics:** "say goodbye to X", "it's not just X", "welcome to the future", punchy triads. The rhythmic fingerprint of generated copy: forever symmetrical, one notch too excited, specifics-free.
- **Decorative star ratings:** star rows and 5/5 ratings not tied to a real review. Social proof turned into a layout.

---

## The Six Principles

Every tell above is a violation of one of six principles. Name the principle when you report a smell; it turns the finding into a rule the model can generalize.

1. **Decide before you decorate.** Every visual choice must be explainable. If you cannot explain it, it is a default someone else set.
2. **One accent, one voice.** A single accent color, sparingly. The whole page reads as one person talking.
3. **Hierarchy from scale and space.** Rank with size, weight, and spacing. Coloring words or swapping in a font is the lazy shortcut.
4. **Subtract first.** Slop is what piles up. Remove until everything left has to be there.
5. **Specific beats loud.** Real numbers, nouns, consequences. "40% faster" says more than "blazing fast".
6. **Decoration must mean something.** Icons, badges, and callouts are signals. Spread everywhere, they signal nothing.

## Evolved Slop (the new default)

The first wave of tells got scolded out of circulation. The second wave is the model's new shorthand for "taste": the same absence of decisions, in cooler clothing. Track these as hard as the classics.

- **Inter everywhere:** Space Grotesk for display, Inter for body, or Geist, Manrope, Plus Jakarta Sans. A typeface is the loudest single signal of who made this; outsourcing it to the training-data average dodges the identity decision exactly like the indigo gradient dodged the color one.
- **The tasteful terminal:** monospace across all UI chrome, a near-black background, one warm accent, ASCII art. It is not ugly, which is the trap: once "hacker terminal" is a one-click template, it dodges the design decision in cooler clothing.
- **The editorial dashboard:** an operational UI dressed as a magazine. Serif "Good evening" greeting, serif numerals in stat cards, cream paper, a tracked-caps kicker over every block. A console is scanned all day; a magazine is read once. Tabular numerals and a legible sans belong to scanned interfaces.

## The Domain Default Trap

I ask whether the visual direction could be guessed from the industry.

A note-taking app as cream and rounded sans. A developer tool as dark with terminal mono. A health product as white and calm blue. A legal platform as navy and serif. A food app as warm orange. A payments product as clean white with green accents.

If the answer was obvious before I opened the page, the design has not found itself yet.

---

## What I Look For Instead

The design needs at least a few real decisions:

- A color strategy that is not the domain's first reflex
- Type with a reason
- A composition that chooses tension, rigor, image, or editorial pacing
- Imagery or visual material tied to the subject
- Motion that reveals character or state
- Copy with a specific voice
- An interaction or detail that could only belong here

Unexpected is not automatically good. But a page with nothing unexpected is usually forgettable.

---

## How I Judge Severity

I treat faint smells as cleanup. I treat clustered smells as identity failure.

A single generic icon card can be replaced. A whole page made of generic cards, indigo gradients, centered hero, Inter, and vague copy needs a new lane.

If the smell is structural, I do not patch. I change the direction.

---

## What I Do After Finding Smell

I name the dominant smell. I identify the root reflex. Then I pick the right design tool.

- Color reflex goes to recolor
- Type reflex goes to typeset
- Composition reflex goes to relayout or redesign
- Generic brand lane goes to voice or redesign
- Missing state and interaction smell goes to interaction
- Unclear copy goes to writing

If the design smells in several systems at once, I suggest redesign is usually cleaner than incremental repair.

**Important:** Smell never executes any mode. It only produces `.design-skill/smell-report.md` and `.design-skill/smell-report.html`.

---

## Scoring

Smell uses a `/10` score. The score is **inverted**: finding nothing is perfect.

| Tells found | Score |
|---|---|
| 0 | 10/10: CLEAN |
| 1–2 | 7–8/10: FAINT |
| 3–4 | 5–6/10: PRESENT |
| 5–6 | 3–4/10: STRONG |
| 7+ | 0–2/10: IDENTITY FAILURE |

**MAX_SCORE = 10.** Use `/10` as the denominator in the report template. When zero tells are found, the score is `10/10` and the verdict is CLEAN. Never output `0/10` to mean "no smells detected."

The heuristics table in the report uses 10 rows (one per odor tracked). Each row scores `1` if the odor is absent, `0` if detected.

---

## Report Boundary

Smell always produces two report artifacts:

- `.design-skill/smell-report.md`
- `.design-skill/smell-report.html`

**Important Rule for Generating HTML Report:**

- **Use the following template structure** [smell-report-html.md](smell-report-html.md) to generate `smell-report.html`:
- Do not change the visual design. Only fill in the content.

These are the only report artifacts smell creates.

---

## What I Refuse

- Calling a design clean because it passes technical checks
- Reporting a smell I cannot point to
- Treating personal taste as evidence of generated design
- Fixing an AI gradient by choosing a different AI gradient
- Treating Inter as wrong when it is clearly intentional
- Treating all centered layouts as bad when symmetry is the right lane
- Adding decoration to hide generic structure
- Creating extra report artifacts beyond `smell-report.md` and `smell-report.html`

---

## How I Know The Smell Is Gone

- Every named smell maps to a visible choice
- The palette cannot be guessed from the domain alone
- The type has a project-specific reason
- The composition is not the median generated landing page
- Repeated sections have hierarchy and variation
- The strongest visual idea belongs to this brief
- A stranger would not immediately say the page was generated
- `smell-report.md` and `smell-report.html` both exist

STRICT RULE: NEVER BREAK THIS
Always create .design-skill/smell-report.md and
.design-skill/smell-report.html. Do not create any other report,
summary, analysis file, or extra documentation.
