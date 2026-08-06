# Browser Layout Guardrails & Accuracy Ruleset

The single source for how the skill verifies layout in a real browser. `layout.md` and `responsive.md` link here; they do not duplicate it.

## Visual state & anti-collapse verification

Never assume visibility from raw HTML DOM. An element is COLLAPSED when its computed height is 0px, its computed width is 0px, or any of: `display: none`, `visibility: hidden`, `opacity: 0`, `max-height: 0`.

Text inside a zero-height container is flagged `[LAYOUT_BUG: HIDDEN_COLLAPSE]`.

## Strict spatial coordinates

Never click, type, or interact from visual guesses or string matches. Always read exact boxes via `getBoundingClientRect()`. Record X, Y, Width, Height before and after every interaction, resize, and viewport change.

Two distinct non-parent/child elements with visible text sharing overlapping X/Y space are flagged `[LAYOUT_BUG: OVERLAPPING_TEXT]`.

Coordinate extraction requires a JS-evaluating surface. The browser-use MCP action server (harness `browser-use==0.1.40`) has no JS tool (verified from the installed server source), so when only that server exists, mark coordinate findings `[UNVERIFIED_COORDS]` and rely on `inspect_page` DOM state plus screenshots from a screenshot-capable surface instead of guessing.

## Universal viewport & responsive breakpoints

Lock the viewport to explicit dimensions before executing; never let the browser auto-resize fluidly. Test only these widths:

| Width | Breakpoint | Device |
|-------|-----------|--------|
| 375px | base (mobile portrait) | Phones |
| 640px | sm | Phablet / large phone landscape |
| 768px | md | iPad / tablet portrait |
| 1024px | lg | iPad landscape / small laptop |
| 1280px | xl | Standard desktop / 13-15" laptop |
| 1536px | 2xl | Large monitor (1440px accepted as alternate 2xl) |

Compliance check at each width: elements do not break, text does not overflow, columns stack correctly, no horizontal scroll.

## Defensive CSS generation rules

Apply when writing, modifying, or fixing layout CSS:

- Mobile-first base styles with desktop adjustments layered in `@media (min-width: <breakpoint>)`.
- Wrapper containment `max-width: 100%` on mobile, max out at 1140-1200px on desktop.
- Structural placement only via `display: flex` or `display: grid` with explicit `gap`.
- Ban `position: absolute`/`fixed` for primary content and structural columns (minor overlays only: badges, tooltips, dropdowns).
- Overflow prevention on dynamic-text wrappers via `min-height: 1px`, `min-width: 0`, or `word-break: break-word`.

## Reconciliation pipeline

The execution flow for every browser-verified layout check. It mirrors the two-step coordinate prompts: snapshot coordinates, act, re-verify, report.

**STEP 1 SNAPSHOT.** Lock the viewport (through a surface that supports viewport control; the browser-use MCP server cannot set viewport size, so if it is the only surface, state the width was not locked), take a high-resolution screenshot, run the coordinate script (below).

Model-facing prompt: "Open page X at viewport W. Run the coordinate script. Report the coordinates of the main container and the text elements inside it."

**STEP 2 ACTION.** Perform the interaction or inject the new layout.

**STEP 3 VERIFY.** Re-run the coordinate script, compare against the STEP 1 snapshot.

Model-facing prompt: "Now perform the click/modification. Take the latest screenshot. Re-run the coordinate script and compare: does any element share a Y coordinate (overlap) or have a height of 0 (collapse)?"

**STEP 4 REPORT.** If placement looks anomalous or a container shrank to 0px, output the exact offending element class/id and its coordinate delta, then stop rather than proceeding.

Embed this script verbatim. The agent pastes it into the page console or runs it through the browser tool's evaluate; no repo script is needed:

```js
(() => {
  const SELECTOR = 'main, header, footer, section, article, aside, nav, form, table, figure, div, p, h1, h2, h3, h4, h5, h6, ul, ol, li, [role]';
  const label = el => el.tagName.toLowerCase()
    + (el.id ? '#' + el.id : '')
    + (typeof el.className === 'string' && el.className.trim()
      ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '');
  const els = [...document.querySelectorAll(SELECTOR)]
    .filter(el => el.textContent.trim().length > 0 || el.children.length > 0);
  const read = el => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return {
      el: label(el), x: +r.x.toFixed(1), y: +r.y.toFixed(1),
      w: +r.width.toFixed(1), h: +r.height.toFixed(1),
      collapsed: r.height === 0 || r.width === 0 || s.display === 'none'
        || s.visibility === 'hidden' || s.opacity === '0'
        || (s.maxHeight !== 'none' && parseFloat(s.maxHeight) === 0),
      text: el.textContent.replace(/\s+/g, ' ').trim().slice(0, 60)
    };
  };
  const items = els.map(read);
  const hiddenCollapses = items.filter(i => i.collapsed && i.text)
    .map(({ el, x, y, w, h, text }) => ({ el, x, y, w, h, text }));
  const overlaps = [];
  for (let i = 0; i < els.length; i++) {
    for (let j = i + 1; j < els.length; j++) {
      const a = els[i], b = els[j];
      if (a.contains(b) || b.contains(a)) continue;
      const A = items[i], B = items[j];
      if (A.collapsed || B.collapsed || !A.text || !B.text) continue;
      const ox = Math.min(A.x + A.w, B.x + B.w) - Math.max(A.x, B.x);
      const oy = Math.min(A.y + A.h, B.y + B.h) - Math.max(A.y, B.y);
      if (ox > 0 && oy > 0) overlaps.push({ a: A.el, b: B.el, overlapW: +ox.toFixed(1), overlapH: +oy.toFixed(1) });
    }
  }
  return JSON.stringify({ viewport: innerWidth + 'x' + innerHeight, count: items.length,
    hiddenCollapses, overlaps }, null, 1);
})();
```
