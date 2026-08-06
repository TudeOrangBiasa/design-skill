# Design — Reference

See [SKILL.md](SKILL.md) for routing, gates, persona, protocols.

## Setup Details

### Context gathering
Optional accelerators, never blockers:
- **PRODUCT.md** (or `brief.md`, or a Design Context section inside README/PRD/`docs/`): users, brand, tone, principles, persona profiles. Never create a new PRODUCT.md — merge into what the user already has.
- **DESIGN.md**: colors, typography, elevation, tokens. The one file this skill creates, via `/design build --document` (Google Stitch format).

Load what exists: `node {{scripts_path}}/load-context.mjs`

When these are missing, gather the same answers by asking the user (2-3 questions per round) or offer `/design setup`. Planning commands (shape, craft, build) interview the user regardless: docs reduce repeated questions, they never replace asking.

### Register
Every task is **brand** (marketing, landing) or **product** (app UI, dashboard). Load matching register reference before work.

### Mode
Every surface also has a **mode**: what success looks like for its visitor. Persuade (decide and act), Operate (complete a task), Read (understand), Experience (be inside the work). Choose it from the surface, not the product; see [modes.md](modes.md). Register is the product's durable lane, mode is the per-surface lens.

### Persona Profile
If multiple personas, `build --shape` documents them in PRODUCT.md. All commands read and enforce.

## Shared Design Laws

### Color
- **OKLCH only.** Never #000/#fff. Tint neutrals toward brand hue (chroma < 0.02).
- **OKLCH is the source of truth.** Build and pick the palette in OKLCH first; convert to hex, rgba, or hsl only at the export edge, when legacy browser support or a specific tool constraint requires it. Never design the palette in HSL.
- **4 commitment levels:** Restrained (1 accent ≤10%) / Committed (1 color 30-60%) / Full palette (3-4 roles) / Drenched (surface IS color).
- **60-30-10 rule:** 60% primary, 30% secondary, 10% accent. If accent >10%, it's not an accent.
- **Theme:** Write one sentence of physical scene before dark/light. If sentence doesn't force answer, add detail til it does.
- **Colorblind simulation:** Check deuteranopia, protanopia, tritanopia. If primary/secondary merge, swap lightness.
- **Refuse generic tech hue:** Blue-violet CTAs and blue-purple gradients signal nothing. Pick hue with reason.

### Typography
- **Body measure:** 60-76ch. Wider loses line; narrower feels breathless.
- **Scale:** 1.25× ratio minimum. Flat scales read as uncommitted.
- **3-level hierarchy:** Hook (heading) → Bridge (subtitle) → Detail (body). Not 2, not 4.
- **Reading distance:** `optimal = (distance_inches × 0.035) × 16`. Phone 16-20px, laptop 24-32px, monitor 28-36px.
- **Light-on-dark compensation:** More line-height, trace of letter-spacing, heavier weight.
- **System fonts are legitimate.** Don't reach for Inter/Plus Jakarta/Geist by reflex.

### Layout
- **1-4-9 rhythm:** Spacing in multiples of 1 (4px), 4 (16px), or 9 (36px). No in-betweens.
- **3-plane depth:** Background (z -1/0) / Content (z default) / Attention (z highest).
- **Composition mass:** `Mass = size × contrast × distance-from-center`. Score 80+ = equilibrium.
- **Cliffhanger:** Leave 40-80px of next section visible. Brain can't resist scrolling.
- **Cards are lazy.** Use only when content is genuinely discrete. No nested cards.
- **Z-index scale:** Semantic (dropdown → sticky → modal-backdrop → modal → toast → tooltip). Never 999.
- **Surface patterns:** 7 surfaces: Monitor / Operate / Compare / Configure / Learn / Decide / Explore.

### How users scan

Users do not read pages, they scan them. Four patterns, depending on the surface:

- **F-shaped:** the top horizontal line, a shorter second line, then a vertical sweep down the left. Dense text pages.
- **Z-shaped:** top-left to top-right, diagonal to bottom-left, across to bottom-right. Minimal and landing pages.
- **Spotted:** jumps straight to data points (links, prices, bold words, icons), ignoring surrounding text.
- **Layer cake:** hops from one heading or subheading to the next, without reading body paragraphs.

Core scanning behaviors: **headline hunting** (skimming large text to see if a section matters), **link spotting** (searching for clickable buttons or anchor text), **visual anchoring** (photos, icons, or charts pulling the eye away from text blocks).

Design consequences:

- Headings must carry the message alone. A visitor who reads only headings must still understand the offer. (This is why the kicker and eyebrow are banned.)
- Links and buttons must look clickable on sight. Affordance is not decoration.
- The primary action sits where the scan ends: F ends bottom-left, Z ends bottom-right.
- Visual anchors break up text blocks and pull the eye down the page. Long unbroken prose is where scanning dies.
- Prices, numbers, and key data get the spotted pattern: place them where they matter, set in tabular figures.

### Motion
- **Animation decision framework:** 4 questions before writing code:
  1. Should this animate? Frequency: 100+/day = never. Tens/day = reduce. Occasional = standard. Rare = delight.
  2. What purpose? Spatial consistency / State indication / Explanation / Feedback / Prevent jarring.
  3. What easing? Enter = ease-out. Move on-screen = ease-in-out. Hover = ease. Constant = linear.
  4. How fast? Button press 100-160ms. Tooltips 125-200ms. Dropdowns 150-250ms. Modals 200-500ms. UI under 300ms.
- **Custom easing curves:** `ease-out: cubic-bezier(0.23, 1, 0.32, 1)`, `ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`, drawer: `cubic-bezier(0.32, 0.72, 0, 1)`. Built-in CSS easings too weak. Never `ease-in` for UI: it starts slow and feels sluggish.
- **Exit faster than entrance:** exits at 70% of entrance duration.
- **Spring physics:** `{ type: "spring", duration: 0.5, bounce: 0.2 }`. Use for drag, gestures, decorative mouse-tracking.
- **Never animate from scale(0):** Start at 0.9-0.95 + opacity 0. Nothing appears from nothing.
- **@starting-style** for entry animations without JS.
- **Blur-crossfade:** `filter: blur(2px)` during state transitions masks imperfect overlap.
- **3-beat entrance:** Appear (scale 0.95, opacity 0) → Overshoot (scale 1.02, opacity 0.8) → Settle (scale 1, opacity 1). Heartbeat rhythm.
- **Stagger cascade:** `delay = index × 20ms + jitter(±5ms)`. Never uniform delays.
- **Animate only transform + opacity.** Never layout. Exits at 70% of entrance duration.
- **Reduced motion:** 4-level UI slider: None (instant) / Reduced (100ms fades) / Standard (full) / Enhanced (expressive).

### Interaction
- **9 states of being:** Every component in all 9: Idle / Hover / Active / Focused / Loading / Empty / Error / Disabled / Overflow.
- **Focus rings:** 2-3px width, offset, 3:1 contrast. Never `outline: none` without replacement.
- **Touch targets:** Minimum 44×44px (48×48px comfortable). Elderly: 56×56px.
- **Undo beats confirm:** Prefer undo for delete/move/edit/toggle. Confirm only for irreversible actions.
- **Labels always visible:** Placeholders show format, disappear on focus. Never placeholder as label.
- **Origin-aware popovers:** Scale from trigger, not center. Exception: modals stay centered.
- **Tooltip skip-delay:** First tooltip delays. Subsequent tooltips open instantly.
- **Button press:** `transform: scale(0.97)` on :active. 160ms ease-out.
- **CSS transitions > keyframes** for interruptible UI. Keyframes restart from zero.

### Responsive
- **Viewport gauntlet:** 320px (iPhone SE) / 375px (iPhone) / 768px (iPad) / 1024px (laptop) / 1440px (desktop) / 2560px (ultrawide).
- **Thumb zone:** Bottom 25% reachable one-hand. Primary actions there. Destructive in top 25%.
- **Input mode detection:** `pointer: coarse` for touch sizing. `hover: hover` for hover affordances.
- **Container queries:** Components respond to container, not page. Same `<Card>` adapts sidebar vs main.
- **Notch handling:** `env(safe-area-inset-*)` + `viewport-fit=cover`.
- **Never amputate feature for mobile.** "Not available on mobile" is a bug.

### Copy
- **One verb per button.** Name the action. Not OK/Confirm/Yes.
- **Errors are recovery paths.** Tell what broke, why if it matters, what next. Specific beats polite.
- **Empty states teach.** Say what belongs here, why it matters, what action fills it.
- **Loading names the work.** "Uploading", "Syncing", "Importing". Not "Loading...".
- **No em dashes.** Use comma, colon, or new sentence.
- **No exclamation points.** Reads as desperate.
- **Sentence case everywhere.** "Save changes" not "Save Changes".
- **Strip filler.** Restated headings, marketing preamble, transition sentences.

### Anti-AI prose (the full list)

When writing prose (docs, README, reports, articles, comments, captions, labels), avoid these patterns by default. This is the minimum bar:

- **Em dashes (—):** use comma, period, or rephrase.
- **"Stands as" / "serves as" / "functions as":** say what it does directly.
- **Rule of three:** don't pad with three-item lists when two suffice.
- **Promotional words:** pivotal, vibrant, intricate, tapestry, testament. Cut.
- **Corporate AI speak:** evolving landscape, navigating, leverage, utilize. Cut.
- **Negative parallelisms:** "not just X, but Y". Rephrase directly.
- **Fragmented headers:** heading plus restatement. Write full sentences.
- **Signposting:** "In this section...", "Berikut adalah...". Just start.
- **Filler:** "Penting untuk diingat", "Perlu diketahui", "saat ini", "pada era", "dalam konteks". Cut.
- **Promotional language:** seamless, powerful, cutting-edge. Describe facts.
- **Repetition:** the same idea restated in two or more sentences. Keep the clearest, delete the rest.

## Commands

### audit
| Mode | What | Load |
|------|------|------|
| critique | UX judgment call with heuristic scoring | reference/critique.md |
| audit | Technical quality (a11y, perf, responsive) | reference/audit.md |
| polish | Final pre-ship pass | reference/polish.md |
| checkup | Health scan with traffic-light scores, writes report | reference/checkup.md |
| smell | AI-tells catalog, writes report | reference/smell.md |
| review | Design review with scoring, writes report | reference/review.md |
| overdrive | Push past conventional limits | reference/overdrive.md |

### refine
| Mode | What | Load |
|------|------|------|
| bolder | Amplify safe or bland designs | reference/bolder.md |
| quieter | Tone down aggressive designs | reference/quieter.md |
| distill | Strip to essence | reference/distill.md |
| harden | Edge cases, i18n, error states | reference/harden.md |
| deslop | Remove AI slop (consumes smell report) | reference/deslop.md |
| refine | Change design character | reference/refine.md |

### systems
| Mode | What | Load |
|------|------|------|
| colorize | Color palette + roles | reference/colorize.md |
| typeset | Typography system | reference/typeset.md |
| layout | Spacing, rhythm, hierarchy | reference/layout.md |
| animate | Motion system + animation | reference/animate.md |
| interaction | States, behavior, affordances | reference/interaction.md |
| responsive | Multi-screen orchestration | reference/responsive.md |

### build
| Mode | What | Load |
|------|------|------|
| craft | Feature end-to-end | reference/craft.md |
| shape | UX plan before code | reference/shape.md |
| init | Project context setup | reference/init.md |
| document | Generate DESIGN.md | reference/document.md |
| extract | Pull tokens/components | reference/extract.md |
| redesign | Complete visual transformation | reference/redesign.md |
| setup | Project brief context | reference/setup.md |

Specialized playbooks: [modes.md](modes.md) (surface lens), [new-work.md](new-work.md) (new surfaces and replacement worlds), [craft-floor.md](craft-floor.md) (quality floor before editing UI), [hero.md](hero.md) (hero-led Persuade surfaces), [landing-pages.md](landing-pages.md) (the five-beat narrative for landing pages).

### fix
| Mode | What | Load |
|------|------|------|
| clarify | UX copy, labels, errors | reference/clarify.md |
| adapt | Responsive adaptation | reference/adapt.md |
| optimize | UI performance | reference/optimize.md |
| onboard | First-run flows, empty states | reference/onboard.md |
| voice | Brand identity, art direction | reference/voice.md |
| access | Accessibility: screen reader, WCAG, high contrast, font scaling, voice nav | reference/access.md |

### iterate + manage
| Mode | What | Load |
|------|------|------|
| live | Browser iteration / HMR | reference/live.md |
| delight | Micro-interactions, personality | reference/delight.md |
| pin/unpin/hooks | Shortcuts + auto-detection | n/a (scripts) |

## Pin/Unpin

```bash
node {{scripts_path}}/pin.mjs <pin|unpin> <command>
```

## Report Templates

- `reference/checkup-report-html.md` — template for checkup HTML report
- `reference/smell-report-html.md` — template for smell HTML report
- `reference/review-report-html.md` — template for review HTML report

Reports are `.design-skill/<mode>-report.md` + `.html`. No browser dep. Template-based.
