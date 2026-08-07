# DESIGN.md

A DESIGN.md file at the project root captures the visual design system so future screens stay on brand. It follows the [google-labs-code/design.md](https://github.com/google-labs-code/design.md) spec (`docs/spec.md`), so it works with every DESIGN.md-aware consumer: Stitch, the `@google/design.md` CLI, awesome-design-md, Figma token importers.

## The format

Two layers: YAML frontmatter with machine-readable design tokens, then a markdown body with eight canonical sections in a fixed order. Tokens are normative; prose provides context for how to apply them.

```yaml
---
name: <project title>
description: <one-line tagline>
omitted: []    # sections intentionally left out
colors:
  primary: "#b8422e"
  neutral-bg: "#faf7f2"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "3.5rem"
    fontWeight: 300
rounded:
  sm: "4px"
spacing:
  sm: "8px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    padding: "16px"
---
```

The eight sections: Overview, Colors, Typography, Layout, Elevation and Depth, Shapes, Components, Do's and Don'ts. Aliases allowed: "Brand & Style", "Layout & Spacing", "Elevation". No extra top-level sections; fold motion and responsive content where it belongs.

Token rules that matter:

- References use `{path.to.token}`; they must point at a primitive value, and within `components` may point at composite values like `{typography.label-md}`.
- Dimensions carry a unit suffix (px, em, rem). Unitless numbers are schema-valid only for `lineHeight` and `spacing` scale values. Fluid `clamp()` values and multi-value shorthands belong in prose or the sidecar, not the frontmatter.
- Component sub-tokens are limited to 8 props: `backgroundColor`, `textColor`, `typography`, `rounded`, `padding`, `size`, `height`, `width`.
- Any valid CSS color is a valid token, OKLCH included. Prefer hex unless there is a reason.

## The document flow

`/design document` runs in two modes:

- **Scan mode** (default): finds the design assets (CSS custom properties, Tailwind config, CSS-in-JS themes, token files, components, rendered output), auto-extracts the tokens, asks the user for the qualitative language (creative north star, overview voice, color character, elevation philosophy), and writes DESIGN.md plus the `.design/design.json` sidecar.
- **Seed mode**: pre-implementation projects, five interview questions, a minimal DESIGN.md marked with a SEED comment, real tokens on the next scan-mode run.

**Step 4c, the compatibility gate.** After writing, run the canonical linter and fix every finding before presenting:

```bash
npx @google/design.md lint DESIGN.md
```

A file that passes it is readable by every other DESIGN.md-aware tool. Between refresh runs, `npx @google/design.md diff DESIGN.md DESIGN-v2.md` catches token and prose regressions.

## The parser

`scripts/design-parser.mjs` reads DESIGN.md back into a structured model: frontmatter, the eight sections, colors, typography, layout, elevation, shapes, components, do's and don'ts, and a coverage report. The live panel and context loading consume this model. It accepts the spec's full token vocabulary: bare numbers, quoted strings, inline arrays, composite references.

## The sidecar

`.design/design.json` carries what the spec schema cannot: tonal ramps, shadow and motion tokens, breakpoints, full component HTML and CSS snippets, and the narrative (north star, rules, do's and don'ts). It extends the frontmatter, it does not duplicate it. Regenerate it whenever you regenerate DESIGN.md.

## Drift repair

`/design doctor` checks the design artifacts for drift: DESIGN.md newer than the sidecar, PRODUCT.md disagreeing with a design context section elsewhere, a legacy brief.md that belongs in PRODUCT.md, a missing DESIGN.md after a finished new world, and register or mode inconsistency. Report first; repair only what the user approves.
