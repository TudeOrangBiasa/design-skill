# Taste Bootstrap

Generate design tokens from minimal input when no DESIGN.md exists.

## Given one input (brand color, product category, or reference site), generate:

- **Mini token system**: 3 colors (primary, surface, accent) in OKLCH + 2 font choices + spacing scale
- **Voice direction**: 3 words anchoring the style (e.g. "warm, mechanical, opinionated")
- **One smell to avoid**: specific to domain (e.g. for SaaS: "no glassmorphism metric cards")

## Rules

- Never prompt user for color/typography — generate from what exists
- All color output in OKLCH
- 3 fonts max, 2 scales max
- Mark generated tokens "taste-bootstrap" — DESIGN.md upgrades replace them
