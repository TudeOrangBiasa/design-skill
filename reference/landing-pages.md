# Landing page playbook (Persuade)

A landing page is a story with six beats, designed for emotional resonance first and logical conversion second. Users do not read landing pages, they scan them: headline hunting, link spotting, visual anchoring (see the scan patterns in REFERENCE.md). Structure the page for the scan, then reward the reader with the story.

## The six beats

1. **Hook (hero):** the brand's core purpose and primary visual identity. One headline, one subheadline, one brand visual, one direct CTA. See [hero.md](hero.md).
2. **Catalyst (the problem):** validates the user's pain point or introduces the challenge. The visitor should recognize their own situation on sight.
3. **Mentor (the solution):** the company as the guide that fixes the problem. Demonstrate the mechanism; feature lists prove nothing.
4. **Journey (how it works):** the process or services, explained cleanly. One logical order: step to step, offer to offer.
5. **Proof (social proof):** success stories, numbers, client quotes. Attributable only: who said it, what result. Decorative stats are banned.
6. **Resolution (call to action):** the final step. One verb, one path, the outcome named ("Start free", "Book a consultation").

## Core components

- **Hero section:** a powerful headline, a supporting subheadline, a brand visual (video or photo), one direct CTA.
- **Value proposition block:** a short, bold statement of what makes the brand unique.
- **Narrative or About section:** a brief, stylized section or timeline showing the brand's why and heritage.
- **Core offerings grid:** cards breaking down services or products, with custom iconography or photography.
- **Social proof carousel:** micro case studies, video testimonials, or client logos validating authority.
- **Footer CTA:** a clean, high-contrast final section dedicated to conversion.

## Limits

- Max 2 to 3 additional components. Acceptable additions: an interactive timeline, a curated team gallery, a brief FAQ accordion, a live dynamic counter ("10M+ users").
- **The agency rule:** if a component does not directly advance the brand story or build trust, delete it.

## Design approach

- **Mobile-first for content discipline:** start with the mobile layout to force the story tight, the headers short, and the core message clear.
- **Desktop immersion:** expand into rich, interactive desktop layouts. Desktop is where storytelling shines: micro-interactions, parallax scrolling, expansive brand imagery.

## Best practices

- **Visual anchors:** break up long text blocks with custom brand graphics to keep the eye moving down the page.
- **One CTA:** every button leads to the same primary goal. Do not confuse the user with competing actions.
- **Micro-animations:** subtle transitions on scroll make the narrative feel alive and dynamic.
- **Typography contrast:** a bold, personality-filled face for headings (branding), a highly readable sans for body text (UX).
- **Copy follows the anti-AI prose rules** in REFERENCE.md: no em dashes, no filler, no promotional words. Headings must carry meaning alone, because headline hunters read only headings.

## Per-beat checks

- **Hook:** the memory test (what would a visitor describe an hour later?), the offer lands in one line, the primary action is visible where the scan ends.
- **Catalyst:** named in the user's words, not the category's. A visitor should recognize their own situation.
- **Mentor:** the mechanism demonstrated at real scale, or the interface at work. Feature lists collapse into chrome.
- **Journey:** a legible order, one step at a time, no dead ends.
- **Proof:** every proof item attributable: who said it, what result. Testimonials without a source are decoration.
- **Resolution:** one primary CTA, repeated at most once more; the form is short; the action names the outcome.

## Ruts per beat

- **Hook ruts:** hero-metric, centered stack, eyebrow pill, the library hero. See [hero.md](hero.md).
- **Catalyst ruts:** the generic pain ("Are you tired of X?" with no specifics), or the beat skipped straight into features.
- **Mentor ruts:** the feature grid (icon plus heading plus text, repeated), the "X that does Y" label with no demonstration.
- **Journey ruts:** process steps that are same-size cards with no real order, or a process hidden entirely.
- **Proof ruts:** fake metrics, logos without names, testimonials without attribution.
- **Resolution ruts:** the CTA buried, two competing primary CTAs, "Get started" with no stated outcome.

## References

Named anchors for the direction come from the Lapa Ninja reference list in `scraped/lapa-ninja-references.json` (live URLs and taglines, local reference). Hero prompt examples live in `scraped/vibeui-prompts.md`; the prompt pattern they share is documented in [prompt-patterns.md](prompt-patterns.md).

## The arc in the skill

The beats map onto existing playbooks: Hook is [hero.md](hero.md), Journey and Mentor draw on [layout.md](layout.md) and [craft.md](craft.md), Proof and Resolution draw on [craft-floor.md](craft-floor.md) and [clarify.md](clarify.md). The whole page is a Persuade surface, so [modes.md](modes.md) and [new-work.md](new-work.md) govern the direction and the contract.
