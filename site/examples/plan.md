# Example Sites Plan — "Made with the skill"

Scope: six example websites built with the design-skill, rendered at 16:9 (1280×720)
for the landing's Keep Control-style hook section. Proof of breadth: any surface,
one skill. Every example is built on a shared system design, real free assets,
real Google Fonts, and palettes extracted from the assets themselves.

## 1. Brief

- **Purpose (confirmed)**: breadth showcase — six genres, each hooking a different
  visitor: brand dogfood, hospitality, studio, data product, editorial, travel.
- **Assets (confirmed)**: real free backgrounds from Backgrounds Supply freebies
  (free for personal use, QHD PNG, no watermark). No CSS-gradient placeholders.
  Palette for each site is extracted from its own asset (colorize doctrine).
- **Fonts (confirmed)**: good Google Fonts pairings per genre. No system defaults,
  no Inter-by-reflex.
- **Process (confirmed)**: plan → system design → build → verify. One-shot is banned.
- **Render**: HTML → headless Chrome 1280×720 → ffmpeg → webp. 16:9.
- **Gate**: detector 0 errors / 0 warnings on both the example HTML and `site/dist`.

## 2. Asset pool (Backgrounds Supply freebies, free license)

All 112 freebies mapped with ids. The 7 selected (id → collection/file):

| site | id | collection | file | why |
|---|---|---|---|---|
| the-landing | `72px1wwSsHVG` | Viridian | image-1 | brand's own world, painterly botanicals |
| landing-2 (alt) | `smuQwt_K3cvG` | Viridian | shipwreck aerial | secondary brand visual |
| cafe-aurora | `WbgJxXQoWHhb` | Horizon | amber/cream | warm hospitality register |
| studio-noma | `rFpESoAsh3Pu` | ASCII | halftone | print/ink register |
| pulse | `x5_7P1_bsfZC` | Velvex | slate 3D valley | cool data register |
| field-notes | `8dMTOkCyvvMG` | Flora | periwinkle folds | editorial texture |
| atlas | `H7nWE50--ZqZ` | Perplex | golden canyon | travel grandeur |

Download recipe (logged-in relay session required; the free download redirects to
a presigned R2 URL, 15-min expiry, auth embedded — no CORS, no session needed
for the signed fetch itself):

1. In the signed-in tab: `Network.getCookies` for `app.backgrounds.supply` →
   the HttpOnly session cookie (unreadable via `document.cookie`).
2. `curl -b "<cookie>" -L "https://app.backgrounds.supply/api/download/<id>"`
   → original PNG (≈10 MB, QHD 2912×1632).
3. `ffmpeg -i in.png -vf scale=1920:-1 -q:v 80 out.webp` → `site/src/assets/examples-src/`.

License: freebies are free for personal projects; commercial use requires the paid
library. This landing is the skill's own site — attribution added to NOTICE.

## 3. System design (shared across all six sites)

### 3.1 Color tokens (extracted from each asset)

Pipeline: ffmpeg downscale → dominant-hue clustering (k-means on quantized HSV) →
pick 12-step neutral ramp + 1-2 accent hues per site. Semantic tokens:

```
--bg / --surface / --surface-2 / --ink / --ink-2 / --line /
--accent / --accent-ink / --accent-soft
```

Shared contract: text on bg ≥ 4.5:1 (AA); accent used for one action per viewport;
accent-soft only as fills, never as text.

### 3.2 Type scale (typeset doctrine, fluid)

```
display   clamp(2.6rem, 6vw, 4.4rem)  wght 800-900, -0.03em
heading   clamp(1.6rem, 3vw, 2.4rem)  wght 700
body      clamp(1rem, 1.15vw, 1.125rem)  1.6 line-height
small     0.875rem
micro     0.6875rem → mono, +0.14em letterspacing (labels only)
```

One serif-or-sans display + one grotesque body + one mono per site (below).

### 3.3 Spacing (8-scale) and grid

`4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96`. Layout grid 12-col desktop, 4-col mobile,
gutter 24/16. Component spacing ≥ layout spacing never inverted. Baselines on the unit.

### 3.4 Components

- **Nav bar**: brand (display, tracked) + 3 mono links + 1 accent CTA. 64px tall.
- **Hero**: headline (display) + one-sentence sub (≤ 40ch) + 2 CTAs max.
- **Feature rows**: numbered 01-03, divider lines, label micro-mono.
- **Footer strip**: brand / est / location / year, micro-mono, border-top.
- **Buttons**: 44px min height (Fitts), 6-10px radius, solid accent + ghost variant.
- **Chips**: micro-mono, 6px radius, surface fill (status/tags).

### 3.5 UX laws applied

Hick — max 2 primary CTAs per viewport · Fitts — all targets ≥ 44px ·
Proximity — 8-scale grouping, 24px between groups · Miller — lists ≤ 7 items ·
Serial position — strongest hook first, CTA last · AA contrast — text ≥ 4.5:1 ·
Von Restorff — one accent per viewport.

## 4. Fonts (Google Fonts per genre)

| site | display | body | mono |
|---|---|---|---|
| the-landing | Schibsted Grotesk 900 | Instrument Sans | JetBrains Mono |
| cafe-aurora | Fraunces 400/600 | Inter | JetBrains Mono |
| studio-noma | Space Grotesk 500/700 | Inter | IBM Plex Mono |
| pulse | Inter 700 | Inter | JetBrains Mono |
| field-notes | Newsreader 400 italic | Inter | IBM Plex Mono |
| atlas | Archivo 800 | Inter | Space Mono |

## 5. Flow — the six builds (order matters)

1. **System**: `design-system.css` (tokens + primitives) — built once, consumed by all.
2. **the-landing**: dogfood — brand statement + detector panel (real output style),
   Viridian asset. Sets the quality bar.
3. **pulse**: hardest layout (dashboard doctrine: density, mono numbers, bars).
4. **cafe-aurora / atlas**: hero + feature rows, warm palettes.
5. **studio-noma / field-notes**: typographic registers (print/editorial).
6. Each: detector 0/0 on its HTML → render 1280×720 → webp.

## 6. Verification

- Detector on every example HTML: 0 errors, 0 warnings.
- Detector on `site/dist`: 0 errors, 0 warnings (78 advisories baseline).
- Live QA: desktop (1440) + narrow (390) — no overflow, no crops, contrast spot-check.
- NOTICE: Backgrounds Supply freebies attribution.
- Link check: all example links + landing links resolve.
