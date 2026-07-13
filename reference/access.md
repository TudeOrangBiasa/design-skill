# Accessibility Mode

## What it does
Adds or audits accessibility features: screen reader support, high contrast mode, font scaling, voice navigation, focus management, reduced motion.

## Check before work
1. Read any existing design report for a11y findings
2. Check current WCAG compliance level (A/AA/AAA)
3. Identify target personas and their a11y needs

## Screen Reader
- Semantic HTML: `nav`, `main`, `aside`, `section`, `article`, `header`, `footer`
- ARIA labels on every interactive element
- `aria-live="polite"` for dynamic content updates
- Focus trapping within modals and drawers
- Announcement order: logical, not visual

## High Contrast
- WCAG 2.1 AA: body 4.5:1, large text 3:1 minimum
- All borders: at least 2px or use background contrast
- Focus indicators: 3px outline, 3:1 contrast against background
- Never convey info through color alone

## Font Scaling
- All sizes in `rem`. No `px` locks on font-size
- `clamp()` with floor and ceiling values
- Test at 200% zoom — no layout breakage, no text truncation

## Voice Navigation
- Every interactive element has an accessible name
- Speech recognition targets: `aria-label` on all controls
- Visible labels > icon-only (voice can't target icons)
- Command mapping documented for complex interactions

## Focus Management
- Logical tab order matching visual order
- Skip links at top of page
- Modal/drawer: trap focus, restore on close
- `:focus-visible` ring: 2-3px, offset 2px, 3:1 contrast

## Reduced Motion
- 4-level slider: None (instant) / Reduced (100ms fades) / Standard (full) / Enhanced (expressive)
- `prefers-reduced-motion: reduce` — crossfade or instant
- No parallax, no auto-scroll, no continuous animation when reduced

## Reference
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
