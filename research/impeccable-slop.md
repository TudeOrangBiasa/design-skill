# impeccable.style/slop catalog

Status: research notes, 2026-08-11. Source: https://impeccable.style/slop/ (fetched live; the 64-pattern catalog page from pbakaus/impeccable, the direct ancestor of this skill). Purpose: capture the full pattern catalog verbatim (it is the lineage's authoritative tell list), then audit which patterns the skill's detector already catches (53 rules since 2026-08-13; the geometric + typography/color/quality additions are not in this catalog), which live only in prose doctrine, and which are gaps. Outside the linted corpus.

The page states: 64 patterns total, "including all 59 deterministic detector rules"; 11 synthetic specimen pages; 5 broader judgments stay in `/impeccable critique` (LLM-only).

Pattern categories: **AI slop** (AI-generated tells), **Quality** (design mistakes regardless of author), **Personalized** (needs DESIGN.md).

## The catalog (64 patterns)

### Your design system (4, Personalized, CLI)

1. **Font outside DESIGN.md** - a face falls outside the documented type system.
2. **Color outside DESIGN.md** - a literal color outside the documented palette.
3. **Radius outside DESIGN.md** - a corner radius outside the shape scale.
4. **Font size outside DESIGN.md** - a size between documented type steps.

### Visual Details (8)

5. **Decorative grid-line background** (AI slop, CLI) - a decorative grid covers a surface without supporting a canvas/map/measurement task.
6. **Border accent on rounded element** (AI slop, CLI) - thick accent border clashes with the border-radius.
7. **Glassmorphism everywhere** (AI slop, LLM only) - blur/glass/glow as decoration, not a real layering problem.
8. **Side-tab accent border** (AI slop, CLI) - thick colored border on one side of a card; "the most recognizable tell of AI-generated UIs".
9. **Hairline border with wide shadow** (AI slop, CLI) - the ghost card; commit to edge or elevation, not both.
10. **Repeating-gradient stripes** (AI slop, CLI) - stripes as surface decoration; reach for deliberate texture or plain.
11. **Extreme border-radius on cards** (AI slop, LLM only) - 24px+ on small cards rounds everything into a blob; cards top out 12-16px.
12. **Amateurish hand-drawn SVG** (AI slop, LLM only) - hand-coded SVG scenes/mascots read as amateur doodles; ship no illustration over a sketchy fallback.

### Typography (11)

13. **Kicker / eyebrow label above heading** (AI slop, CLI) - tracked uppercase label borrows editorial authority it has not earned; delete or fold into the heading.
14. **Undersized functional text** (Quality, CLI) - under 11px fails small/high-density screens.
15. **Flat type hierarchy** (AI slop, CLI) - sizes too close; aim for >= 1.25 ratio between steps.
16. **Icon tile stacked above heading** (AI slop, CLI) - rounded icon container above a heading; "every generator outputs this exact shape"; side-by-side or in flow without a container.
17. **Italic serif display headline** (AI slop, CLI) - oversized italic serif hero is the universal AI-startup hero; set roman or non-serif; editorial registers may legitimately want it.
18. **Hero eyebrow / pill chip** (AI slop, CLI) - tiny uppercase letter-spaced label above an oversized hero headline, or as a pill; the default AI SaaS hero.
19. **Oversized hero headline** (AI slop, CLI) - a full-sentence headline at display size dominates the viewport; punchy one/two-word headlines are fine.
20. **Crushed letter spacing** (AI slop, CLI) - tracking pulled tighter than the point where characters keep their shapes; tighten optically, not destructively.
21. **Overused font** (AI slop, CLI) - Inter, Geist, Space Grotesk, and the newest reflex Instrument Serif no longer feel distinctive.
22. **Single font for everything** (AI slop, CLI) - one family for the entire page; pair display + body.
23. **All-caps body text** (Quality, CLI) - long uppercase passages lose word shape; reserve caps for short labels/headings.

### Color & Contrast (7)

24. **Radial-gradient background halo** (AI slop, CLI) - saturated radial glow on a dark page.
25. **Decorative radial spotlight glow** (AI slop, CLI) - faint accent haze behind a section.
26. **AI color palette** (AI slop, CLI) - purple/violet gradients and cyan-on-dark; "the most recognizable tells".
27. **Dark mode with glowing accents** (AI slop, CLI) - dark bg with colored box-shadow glows; cyberpunk-by-default.
28. **Gradient text** (AI slop, CLI) - decorative; a common tell on headings and metrics; use solid.
29. **Gray text on colored background** (Quality, CLI) - washed out; use a darker shade of the background color instead.
30. **Cream / beige palette** (AI slop, CLI) - warm cream is the reflex "tasteful" AI surface; choose a deliberate background.

### Layout & Space (12)

31. **Tiny numbered section labels** (AI slop, CLI) - 01/02/03 numbers imitate editorial structure without adding it.
32. **Cards flush against the scroller edge** (Quality, Browser) - one gutter lost; keep both gutters consistent.
33. **Text occluded by an overlapping element** (Quality, Browser).
34. **One column stretches the first viewport** (Quality, Browser) - dead space beside it.
35. **Heading crowded against the previous block** (Quality, Browser) - more space above than below.
36. **Hero metric layout** (AI slop, LLM only) - big number, small label, three supporting stats, gradient accent; "used everywhere, trusted nowhere".
37. **Identical card grids** (AI slop, LLM only) - same-sized icon+heading+text cards repeated; the default AI homepage layout.
38. **Monotonous spacing** (AI slop, CLI) - the same spacing value everywhere; tight groups, generous separations.
39. **Nested cards** (AI slop, CLI) - cards inside cards; flatten with spacing/typography/dividers.
40. **Line length too long** (Quality, Browser) - wider than ~80 chars; 65-75ch max-width.
41. **Content overflowing its container** (Quality, Browser).
42. **Positioned child clipped by overflow container** (Quality, Browser) - tooltips/menus/popovers cut off.

### Motion (6)

43. **Pulsing status dot** (AI slop, CLI) - animate only when the data is changing.
44. **Decorative blinking cursor** (AI slop, Browser) - fake caret on non-editable hero copy.
45. **Auto-scrolling marquee** (AI slop, CLI).
46. **Bounce or elastic easing** (AI slop, CLI) - spring physics for real physical things only; ease interface motion out (ease-out-quart/quint/expo).
47. **Layout property animation** (Quality, CLI) - width/height/padding/margin causes layout thrash; transform + opacity, or grid-template-rows.
48. **Image hover transform** (AI slop, CLI) - scaling/rotating imagery on hover is a generated-UI signature.

### Copy (5)

49. **Same text repeated inside one container** (Quality, Browser).
50. **Em-dash overuse** (AI slop, CLI) - more than a couple in body copy is an AI cadence tell.
51. **Marketing buzzword** (AI slop, CLI) - streamline, empower, supercharge, world-class, enterprise-grade; pick a specific verb and noun.
52. **Aphoristic-cadence copy** (AI slop, CLI) - short rebuttal / manufactured-contrast lines; once is fine, the repeated pattern is the tell.
53. **Theater framing copy** (AI slop, CLI) - dismissing things as "theater" is a recurring tic.

### Imagery (2)

54. **Shape-assembled illustration** (AI slop, CLI) - hero art from generic SVG shapes reads as clip art.
55. **Broken or placeholder image** (Quality, CLI) - empty/missing/placeholder src ships broken.

### General quality (10)

56. **Uncaught script error on load** (Quality, Browser).
57. **Content invisible at rest** (Quality, Browser) - reveal code left the page hidden; ship content visible, then enhance.
58. **Cramped padding** (Quality, Browser) - < 8px inside bordered/colored containers; 12-16px ideal.
59. **Body text touching viewport edge** (Quality, Browser) - no container padding; wrap with >= 16px horizontal padding or max-width mx-auto.
60. **Justified text** (Quality, CLI) - rivers of white; text-align left, or hyphens: auto.
61. **Low contrast text** (Quality, CLI) - fails WCAG AA (4.5:1 body, 3:1 large).
62. **Skipped heading level** (Quality, CLI) - h1 then h3 with no h2 breaks the document outline.
63. **Tight line height** (Quality, CLI) - below 1.3x; use 1.5-1.7 for body.
64. **Tiny body text** (Quality, CLI) - below 12px; 14px minimum, 16px ideal. (Wide letter spacing on body text, > 0.05em, is the 65th entry on the page; slow reading, reserve wide tracking for short uppercase labels.)

## Coverage audit vs the skill's 42-rule detector

Legend: COVERED = detector rule exists / PARTIAL = same family or prose-only / GAP = nothing.

| Pattern | Status | Where |
|---|---|---|
| 5 decorative grid-line bg | GAP | prose: craft-floor (grid overlays need a real canvas) |
| 6 border accent on rounded | COVERED | side-tab-border (same family) |
| 7 glassmorphism everywhere | COVERED | glassmorphism (ours is CLI, theirs is LLM-only) |
| 8 side-tab accent border | COVERED | side-tab-border |
| 9 hairline + wide shadow | COVERED | ghost-card |
| 10 repeating-gradient stripes | GAP | prose: craft-floor (stripes need a real canvas) |
| 11 extreme border-radius | COVERED | over-rounding |
| 12 amateurish hand-drawn SVG | GAP | prose: craft-floor (real illustration or none) |
| 13 kicker/eyebrow above heading | COVERED | eyebrow-above-h1 |
| 14 undersized functional text | GAP | prose: audit a11y |
| 15 flat type hierarchy | COVERED | flat-type-hierarchy |
| 16 icon tile above heading | COVERED | icon-tile-stack |
| 17 italic serif display headline | COVERED | italic-serif-display |
| 18 hero eyebrow / pill chip | COVERED | eyebrow-above-h1 (same family) |
| 19 oversized hero headline | COVERED | oversized-h1 |
| 20 crushed letter spacing | COVERED | crushed-tracking |
| 21 overused font | COVERED | overused-font |
| 22 single font for everything | PARTIAL | prose: SKILL.md "Default type stack" tell |
| 23 all-caps body text | PARTIAL | all-caps-grid (label grids; body caps is prose) |
| 24 radial-gradient halo | COVERED | radial-halo |
| 25 radial spotlight glow | PARTIAL | radial-halo (same family) |
| 26 AI color palette | COVERED | ai-palette |
| 27 dark mode glowing accents | COVERED | dark-glow |
| 28 gradient text | COVERED | gradient-text |
| 29 gray text on colored bg | GAP | prose: audit a11y / craft-floor |
| 30 cream/beige palette | COVERED | cream-palette |
| 31 tiny numbered section labels | GAP | prose: craft-floor (section numbers) |
| 32-35 browser layout quality | GAP | Browser-only; the skill ships no browser tooling (deliberate) |
| 36 hero metric layout | PARTIAL | invented-stat-row (same family; theirs is LLM-only) |
| 37 identical card grids | COVERED | equal-card-grid |
| 38 monotonous spacing | GAP | prose: craft-floor spacing |
| 39 nested cards | COVERED | nested-cards |
| 40 line length too long | GAP | prose: craft-floor measure 60-76ch |
| 41-42 overflow / clipped child | GAP | Browser-only |
| 43 pulsing status dot | COVERED | pulsing-dot |
| 44 blinking cursor | COVERED | blinking-cursor |
| 45 auto-scrolling marquee | COVERED | marquee |
| 46 bounce/elastic easing | COVERED | bounce-easing |
| 47 layout property animation | GAP | prose: craft-floor (transform/opacity, grid-template-rows) |
| 48 image hover transform | COVERED | springy-hover (same family) |
| 49 same text repeated in container | GAP | Browser-only |
| 50 em-dash overuse | COVERED | em-dash-saturation |
| 51 marketing buzzword | COVERED | marketing-buzzword |
| 52 aphoristic-cadence copy | COVERED | aphoristic-cadence |
| 53 theater framing copy | PARTIAL | copy-tics family |
| 54 shape-assembled illustration | GAP | prose: craft-floor |
| 55 broken/placeholder image | COVERED | broken-image |
| 56 uncaught script error | GAP | Browser-only |
| 57 content invisible at rest | COVERED | content-hidden-at-rest |
| 58-59 cramped padding / viewport edge | GAP | Browser-only |
| 60 justified text | GAP | CLI-detectable; no rule |
| 61 low contrast text | GAP | prose: audit a11y / craft-floor |
| 62 skipped heading level | GAP | prose: audit a11y |
| 63 tight line height | GAP | CLI-detectable; no rule |
| 64 tiny body text | GAP | CLI-detectable; no rule |
| 65 wide body letter spacing | GAP | CLI-detectable; no rule |

Our detector also carries 11 rules absent from their catalog: all-caps-grid, atmosphere-gradients, badge-spam, decorative-strikes, editorial-dashboard, missing-alt, mono-hue-alert, semantic-palette, star-rating, tasteful-terminal, tinted-icon-tile.

## Conclusions

- **Detector overlap is strong**: 28 of 64 patterns are directly covered by our detector; 6 more are same-family or prose-covered.
- **The gaps are deliberate or prose-covered, not accidents**: the Browser-only quality checks (10+ patterns) are exactly what we removed with the live subsystem; the Personalized DESIGN.md rules (4) are a future direction (the parser + validate tool are the foundation, but no DESIGN.md-driven detection ships yet); the prose gaps (grid lines, stripes, SVG illustration, measure, spacing rhythm) are already taught in craft-floor.md and the 10-tells table.
- **CLI-detectable gaps worth a future detector expansion** (registry is test-locked in this refactor; a follow-up can lift the lock deliberately): justified text, low contrast, skipped heading level, tight line height, tiny body text, wide body tracking, gray-on-colored, repeating-gradient stripes, monotonous spacing.
- **Specimen pages**: the page links 11 synthetic slop specimens (/antipattern-examples/purple-gradients.html, lazy-cool.html, lazy-impact.html, thick-border-cards.html, cardocalypse.html, layout-templates.html, inter-everywhere.html, massive-icons.html, bad-contrast.html, redundant-ux-writing.html, modal-abuse.html). These are strong candidate eval fixtures for the slop-kill family; they live in the impeccable repo (MIT), so copying them into evals/ needs a license check + attribution first.
