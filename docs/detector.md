# The detector

`scripts/detector.mjs` is the deterministic half of the design reflex: 42 rules over HTML and CSS, zero model, zero API key, zero npm dependencies. It catches what does not need judgment and leaves what does to the model.

## Run it

```bash
node scripts/detector.mjs <file|dir|url> [--json]
design detect <target> [--json]     # through the dispatcher
```

Exit codes: 0 no error-severity findings, 1 error-severity findings exist, 2 usage error.

JSON output shape:

```json
{
  "summary": { "bySeverity": { "error": 0, "warning": 2, "advisory": 1 }, "total": 3 },
  "findings": [
    { "id": "ai-palette", "name": "AI color palette (purple-blue / cyan)",
      "category": "Color", "severity": "error", "evidence": "...", "file": "index.html" }
  ]
}
```

The detector output is defect evidence, never the verdict. Merge its findings with the model pass, mark false positives honestly, and judge severity yourself. Error-severity findings block shipping until fixed or explicitly accepted.

## The 42 rules

Severities: error (blocks), warning, advisory. Groups: Imagery, Copy, Color, Typography, Layout, Motion, Components, Quality.

### Imagery (1)
- `emoji-icon` (error): emoji in headings or buttons.

### Copy (6)
- `em-dash-saturation` (advisory): em/en dash density in body copy.
- `marketing-buzzword` (error): `streamline`, `empower`, `supercharge`, and the rest of the buzzword list.
- `aphoristic-cadence` (advisory): manufactured-contrast lines ("Not a feature. A platform.").
- `invented-stat-row` (warning): `10k+`, `99.9%`, `24/7` cliches together.
- `copy-tics` (advisory): "say goodbye to", "it's not just", "welcome to the future".
- `star-rating` (advisory): star rows not tied to a review.

### Color (9)
- `gradient-text` (error): background-clip text only. Gradient backgrounds are a surface choice, covered by the atmosphere rule.
- `ai-palette` (error): purple-violet plus cyan, or purple plus any gradient.
- `cream-palette` (warning): warm off-white default backgrounds.
- `dark-glow` (error): zero-offset chromatic shadows.
- `radial-halo` (warning): radial gradient page backgrounds.
- `semantic-palette` (warning): the framework blue/amber/green/red -50/-600 set together.
- `mono-hue-alert` (warning): border, text, and background all one hue.
- `atmosphere-gradients` (warning): repeating stripes, gradient card fills, radial page background.
- `glassmorphism` (warning): `backdrop-blur` surfaces.

### Typography (11)
- `overused-font` (warning): Inter, Roboto, Fraunces, Geist, Plus Jakarta Sans, Space Grotesk, Playfair, Lora, Cormorant, Newsreader, Recoleta.
- `italic-serif-display` (warning): serif italic hero headlines.
- `crushed-tracking` (warning): letter spacing past legibility.
- `oversized-h1` (warning): a long h1 at display size.
- `eyebrow-above-h1` (error): the small label above the hero heading.
- `decorative-strikes` (advisory): strikethrough and highlight marks as decoration.
- `flat-type-hierarchy` (warning): all sizes within a 6px band.
- `tasteful-terminal` (warning): mono type at scale on a near-black surface.
- `editorial-dashboard` (advisory): serif greeting on an operational surface.

### Layout (8)
- `icon-tile-stack` (warning): icon before heading stacks.
- `nested-cards` (error): cards inside cards.
- `side-tab-border` (error): the thick border-left stripe.
- `ghost-card` (warning): 1px border plus wide shadow.
- `over-rounding` (warning): border radius 32px and up.
- `all-caps-grid` (advisory): six or more all-caps labels.
- `equal-card-grid` (warning): 3-column grid with three plus icon-before-heading cards.
- `content-hidden-at-rest` (error): opacity 0 or visibility hidden declarations.

### Motion (5)
- `bounce-easing` (error): overshooting cubic-bezier or bounce keyframes.
- `pulsing-dot` (warning): pulse animation.
- `blinking-cursor` (advisory): blink animation.
- `marquee` (warning): infinite horizontal scroll.
- `springy-hover` (warning): scale-on-hover and transition-all.

### Components (2)
- `badge-spam` (warning): four or more pill badges.
- `tinted-icon-tile` (warning): icons in a 10% tint of their own hue.

### Quality (3)
- `broken-image` (error): empty or placeholder src.
- `missing-alt` (warning): images without alt text.
- `content-hidden-at-rest` (error): invisible content.

## Design notes

The rules are deliberately conjunctive where a naive detector would fire on one signal. `ai-palette` needs two families or purple plus gradient; `oversized-h1` needs length and size; `ghost-card` needs border and shadow. That is the false-positive budget, and it is the difference between evidence and noise.

Two-signal rules (`tasteful-terminal`, `editorial-dashboard`) require both signals before firing, keeping clean pages clean.

## Extending the detector

Add a rule to the `RULES` array in `scripts/detector.mjs` with id, name, category, severity, and a `check(ctx)` returning evidence objects. Context carries `html`, `text`, `css`, `headings`, and `imgs`. Update the fixtures and tests, refresh the count assertion, and follow the contribution rules in [CONTRIBUTION.md](../CONTRIBUTION.md). The rule count is locked by a test.
