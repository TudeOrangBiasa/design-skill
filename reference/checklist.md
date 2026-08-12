# Core checklist (every surface, always)

The universal pre-ship pass. Run every check on the built result; findings are element-level (name the element + the fix). The 703-check catalog in `datasets/checklist-catalog.md` is the optional deep pass (git clones); this core is the floor and is always run.

## Content

- Real copy: no lorem/placeholder; one message per screen; controls name their action; errors name the problem and the recovery.
- Alt text describes the subject, never "image"; links are labeled; no invented stats.

## Structure & semantics

- Exactly one h1; no skipped heading levels; landmarks (header/main/footer); form fields labeled and associated; lists use list semantics.

## States

- hover, focus-visible, active, disabled, loading, error, empty covered; no hover-only functionality; focus ring visible (2-3px, 3:1 contrast).

## Accessibility

- Contrast >= 4.5:1 body / 3:1 large; touch targets >= 44x44; complete keyboard path; reduced-motion respected.

## Responsive

- No horizontal scroll at 375/640/768/1024/1280/1536; no text clipped (fixed height + overflow hidden); images fluid; touch targets hold on mobile.

## Quality

- No console errors; no broken images or links; no avoidable layout shift; images lazy-loaded below the fold; copy follows the anti-AI rules (no em dashes, no filler, no promotional words).
