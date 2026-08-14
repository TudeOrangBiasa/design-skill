# Benchmarks — the design bar (patokan)

Awwwards-winning sites and best-in-class dashboards, distilled into concrete,
judge-able attributes. The eval family `benchmark-*` builds with the skill and
judges the result against these bars: matching or exceeding a bar is the
reward signal. The harness has no web tool, so each eval prompt carries the
bar as text (the checklist eval precedent).

## Landing / persuade (Awwwards SOTD 2025)

### Palmer (SOTD 2026-07-30, 7.46/10) — tableware
URL: https://www.awwwards.com/sites/palmer
- Horizontal layout: the page reads across, not down a centered column.
- Typography IS the identity: distinctive display type, editorial contrast,
  generous scale steps.
- Storytelling through the product: dining-table narrative, not a feature list.
- Bar: the hero breaks the centered stack; type carries the brand.

### MetaMask (SOTD 2025-08-13, 7.39/10)
URL: https://www.awwwards.com/sites/metamask
- Tiny deliberate palette: two hues (#E9C1FF, #3D065F) carry the whole system.
- Bento-box hover states: interaction feedback on every tile, purpose-gated.
- Scalable design system behind the page (brand guidelines embodied).
- Bar: a 2-color system with real contrast; every interactive tile responds.

### TRIPLETTA PIZZA (SOTD 2025-04-04, 7.34/10)
URL: https://www.awwwards.com/sites/tripletta-pizza
- Distinctive digital identity: the brand is the layout, not a theme applied.
- Typography + color chosen as a physical object (menu, packaging), not a
  category default.
- Bar: identity-first, category-reflex-free (pizza does not mean red/white).

### Heidelberg CCUS (SOTD 2025-09-15, 7.65/10)
URL: https://www.awwwards.com/sites/heidelberg-ccus
- Large-scale immersive platform: editorial rhythm across long scroll.
- Data/industrial subject handled with calm, generous whitespace.
- Bar: an industrial subject with editorial polish, not template density.

## Dashboard / operate (Stripe, Linear, Vercel class)

Sources: Linear's dashboard best practices, Mantlr's Stripe/Linear/Vercel
breakdown, artofstyleframe dashboard patterns (2026), Tufte data-ink.

- **Layout**: fixed left sidebar + card content area; 12-column grid; 4-6 KPI
  cards above the fold; dense rows (~36px) that stay legible; progressive
  disclosure for charts/tables/logs below the fold.
- **KPI discipline**: number + trend indicator (+x% vs last period) +
  sparkline; no extraneous labels; tabular numbers (same-width digits) so
  columns scan.
- **Microstates**: every interactive element has default, hover, focus,
  active, disabled, loading; skeletons match the layout they replace.
- **Color**: restrained; semantic state vocabulary (error/success/warning)
  with one accent; never decoration for decoration's sake.
- **Data-first**: metrics are decision-driven (data-ink ratio); one lead
  question per dashboard; glanceable under pressure.
- **Type**: one cohesive system; monospace reserved for code/IDs.

### The bars in one line
- Landing bar: breaks the centered stack, type is the identity, palette small
  and deliberate, one authored motion moment, cohesive enough to sit on
  Awwwards.
- Dashboard bar: sidebar + KPI discipline + complete microstates + restrained
  semantic color + data-first density, at Stripe/Linear craft level.

## How the eval uses this

`benchmark-landing-1` and `benchmark-dashboard-1` in evals/evals.json carry
the bar as prompt + assertions. The judge scores the with_skill output
against the bar; passing assertions are the reward. Recorded in
BASELINE-SPECIMENS.md.
