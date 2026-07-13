> **Motion authority**: This file consolidates Emil Kowalski's design engineering philosophy (primary) with proven layout-motion patterns. Emil's Animation Decision Framework, spring physics, clip-path, gesture momentum, and Sonner Principles set the bar.

---

## Core Philosophy

### Taste is trained, not innate
Good taste is not personal preference. It is a trained instinct. Surround yourself with great work, think deeply about why something feels good, practice relentlessly.

### Unseen details compound
Most details users never consciously notice. That is the point. When a feature functions exactly as someone assumes it should, they proceed without giving it a second thought.

> "All those unseen details combine to produce something that's just stunning, like a thousand barely audible voices all singing in tune." — Paul Graham

### Beauty is leverage
People select tools based on experience, not just functionality. Good defaults and good animations are real differentiators. Use beauty as leverage.

---

## Animation Decision Framework

### 1. Should this animate at all?

**Ask:** How often will users see this animation?

| Frequency | Decision |
| --- | --- |
| 100+ times/day (keyboard shortcuts, command palette) | No animation. Ever. |
| Tens of times/day (hover effects, list navigation) | Remove or drastically reduce |
| Occasional (modals, drawers, toasts) | Standard animation |
| Rare/first-time (onboarding, celebrations) | Can add delight |

**Never animate keyboard-initiated actions.** Raycast has no open/close animation. That is the optimal experience.

### 2. What is the purpose?

Every animation must answer "why does this animate?"

Valid purposes: spatial consistency, state indication, explanation, feedback, preventing jarring changes.

If the purpose is "it looks cool" and the user will see it often, don't animate.

### 3. What easing should it use?

- Element entering → **ease-out** (starts fast, feels responsive)
- Element moving/morphing on screen → **ease-in-out** (natural acceleration)
- Hover/color change → **ease**
- Constant motion (marquee, progress bar) → **linear**

**Use custom easing curves.** Built-in CSS easings are too weak.

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);     /* iOS-like drawer */
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);    /* Smooth, refined */
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);     /* Snappy, confident */
```

**Never use ease-in for UI animations.** Starts slow → feels sluggish.

**Never use bounce or elastic curves.** Trendy in 2015, now amateurish. Real objects decelerate smoothly.

Resources: [easing.dev](https://easing.dev/) or [easings.co](https://easings.co/).

### 4. How fast should it be?

| Element | Duration |
| --- | --- |
| Button press feedback | 100-160ms |
| Tooltips, small popovers | 125-200ms |
| Dropdowns, selects | 150-250ms |
| Modals, drawers | 200-500ms |
| Entrance animations (page load) | 300-800ms |
| Marketing/explanatory | Can be longer |

**Rule: UI animations stay under 300ms.** A 180ms dropdown feels more responsive than 400ms.

**Exit animations are faster than entrances.** Use ~75% of enter duration.

**The 80ms threshold:** Our brains buffer sensory input for ~80ms. Under 80ms feels instant.

---

## Perceived Performance

Nobody cares how fast your site is, just how fast it feels.

- **Fast-spinning spinner** makes loading feel faster (same load time, different perception)
- **Preemptive start**: Begin transitions immediately while loading
- **Early completion**: Show content progressively
- **Optimistic UI**: Update interface immediately, handle failures gracefully
- **Easing affects perceived duration**: Ease-out at 200ms feels faster than ease-in at 200ms

**Caution**: Too-fast responses can decrease perceived value. Sometimes a brief delay signals "real work."

---

## Register-specific Motion

### Brand (marketing, landing pages, portfolio)
Orchestrated page-load sequences, staggered reveals, scroll-driven animation. One well-rehearsed entrance beats scattered micro-interactions.

### Product (app UI, dashboard, tool)
150-250ms on most transitions. Motion conveys state: feedback, reveal, loading, transitions between views. No page-load choreography.

---

## Spring Animations

Springs simulate real physics. No fixed duration — settle based on physical parameters.

### When to use springs
- Drag interactions with momentum
- Elements that should feel "alive" (Dynamic Island)
- Gestures that can be interrupted mid-animation
- Decorative mouse-tracking interactions

### Spring configuration

**Apple's approach (easier to reason about):**
```js
{ type: "spring", duration: 0.5, bounce: 0.2 }
```

**Traditional physics (more control):**
```js
{ type: "spring", mass: 1, stiffness: 100, damping: 10 }
```

Keep bounce subtle (0.1-0.3). Avoid bounce in most UI contexts.

### Interruptibility advantage
Springs maintain velocity when interrupted. CSS restarts from zero. Use springs for gestures that change mid-motion.

---

## Component Building Principles

### Buttons must feel responsive
```css
.button { transition: transform 160ms ease-out; }
.button:active { transform: scale(0.97); }
```

### Never animate from scale(0)
Nothing disappears and reappears completely. Start from `scale(0.95)` with opacity.

### Popovers: origin-aware
```css
.popover { transform-origin: var(--radix-popover-content-transform-origin); }
```
**Exception: modals** — keep `transform-origin: center`.

### Tooltips: skip delay on subsequent hovers
```css
.tooltip[data-instant] { transition-duration: 0ms; }
```

### Use CSS transitions over keyframes for interruptible UI
CSS transitions can be interrupted mid-animation. Keyframes restart from zero. For rapidly-triggered interactions (toasts, toggles), transitions win.

### Use blur to mask imperfect transitions
When a crossfade feels off, add subtle `filter: blur(2px)`. Keep under 20px (expensive in Safari).

### Animate enter states with @starting-style
Modern CSS way without JavaScript:
```css
.toast {
  opacity: 1; transform: translateY(0);
  transition: opacity 400ms ease, transform 400ms ease;
  @starting-style {
    opacity: 0; transform: translateY(100%);
  }
}
```

---

## CSS Transform Mastery

- **translateY with %**: Relative to element's own size. `translateY(100%)` = own height.
- **scale() scales children**: Unlike width/height, scales font, icons, content.
- **3D transforms**: `rotateX()`, `rotateY()` with `transform-style: preserve-3d`.
- **transform-origin**: Set to match where the trigger lives.

---

## clip-path for Animation

One of the most powerful CSS animation tools. Not just for shapes.

### The inset shape
`clip-path: inset(top right bottom left)` — each value "eats" into the element.

```css
.hidden  { clip-path: inset(0 100% 0 0); }
.visible { clip-path: inset(0 0 0 0); }
```

### Patterns
- **Tabs**: Duplicate tab list, clip the copy so only active tab is visible.
- **Hold-to-delete**: Colored overlay with `clip-path: inset(0 100% 0 0)` → `inset(0 0 0 0)` over 2s linear.
- **Image reveals**: Start `clip-path: inset(0 0 100% 0)` → animate on scroll.
- **Comparison sliders**: Clip top image with `clip-path: inset(0 50% 0 0)`, adjust by drag.

---

## Gesture and Drag Interactions

### Momentum-based dismissal
Calculate velocity: `Math.abs(dragDistance) / elapsedTime`. If velocity > ~0.11, dismiss regardless of distance.

```js
const velocity = Math.abs(swipeAmount) / timeTaken;
if (Math.abs(swipeAmount) >= SWIPE_THRESHOLD || velocity > 0.11) { dismiss(); }
```

### Damping at boundaries
More user drags past boundary, less the element moves.

### Pointer capture
Once dragging starts, capture all pointer events.

### Multi-touch protection
Ignore additional touch points after initial drag.

### Friction instead of hard stops
Allow upward drag with increasing friction instead of preventing it entirely.

---

## Performance Rules

- **Only animate transform and opacity**: Skip layout and paint, run on GPU. But use blur, filter, mask, shadow when they materially improve the effect — keep bounded, verify smooth.
- **CSS variables are inheritable**: Changing a CSS var on parent recalculates ALL children. Update `transform` directly on element instead.
- **Framer Motion shorthand (`x`, `y`, `scale`) is NOT hardware-accelerated**: Use `transform: "translateX(100px)"` for hardware acceleration.
- **CSS animations beat JS under load**: CSS runs off main thread. Use CSS for predetermined animations; JS for dynamic/interruptible.
- **WAAPI**: JavaScript control with CSS performance — hardware accelerated, interruptible, no library.

```js
element.animate([
  { clipPath: 'inset(0 0 100% 0)' },
  { clipPath: 'inset(0 0 0 0)' }
], { duration: 1000, fill: 'forwards', easing: 'cubic-bezier(0.77, 0, 0.175, 1)' });
```

---

## Motion Materials Framework

Transform and opacity are reliable defaults, not the whole palette.

| Material | Use For |
|----------|---------|
| **Transform / opacity** | Movement, press feedback, simple reveals, stagger |
| **Blur / filter / backdrop-filter** | Focus pulls, depth, glass effects, atmospheric transitions |
| **Clip path / masks** | Wipes, reveals, editorial cropping, product transitions |
| **Shadow / glow / color filters** | Energy, affordance, focus, active state |
| **Grid-template / FLIP** | Expanding layout without animating height directly |

Hard rule: avoid animating layout-driving properties (`width`, `height`, `top`, `left`, margins). Keep expensive effects bounded. Verify smooth on target viewports.

---

## Stagger Animations

```css
.item:nth-child(1) { animation-delay: 0ms; }
.item:nth-child(2) { animation-delay: 50ms; }
.item:nth-child(3) { animation-delay: 100ms; }
```

Or with CSS custom properties: `animation-delay: calc(var(--i, 0) * 50ms)` + `style="--i: 0"`.

Keep stagger delays **30-80ms** between items. **Cap total stagger**: 10 items at 50ms = 500ms max. Stagger is decorative — never block interaction.

---

## Accessibility

### prefers-reduced-motion (NOT optional)
Vestibular disorders affect ~35% of adults over 40.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Keep opacity and color transitions that aid comprehension. Remove movement and position animations.

### Touch device hover
```css
@media (hover: hover) and (pointer: fine) {
  .element:hover { transform: scale(1.05); }
}
```

---

## The Sonner Principles (from building Sonner, 13M+ weekly npm downloads)

1. **Developer experience is key.** No hooks, no context, no complex setup.
2. **Good defaults matter more than options.** Ship beautiful out of the box.
3. **Naming creates identity.** Sacrifice discoverability for memorability.
4. **Handle edge cases invisibly.** Pause toast timers when tab is hidden.
5. **Use transitions, not keyframes, for dynamic UI.**
6. **Build a great docs site.** Interactive examples lower the barrier.

### Cohesion matters
Easing and duration must fit the vibe of the library. Match motion to mood.

### Asymmetric enter/exit timing
Press should be slow where deliberate (hold-to-delete: 2s linear). Release always snappy (200ms ease-out).

```css
.overlay { transition: clip-path 200ms ease-out; }
.button:active .overlay { transition: clip-path 2s linear; }
```

---

## Review Format (Required)

When reviewing motion code, use a markdown table with Before/After/Why columns:

| Before | After | Why |
| --- | --- | --- |
| `transition: all 300ms` | `transition: transform 200ms ease-out` | Specify exact properties; avoid `all` |
| `transform: scale(0)` | `transform: scale(0.95); opacity: 0` | Nothing appears from nothing |
| `ease-in` on dropdown | `ease-out` with custom curve | `ease-in` feels sluggish |
| No `:active` state | `transform: scale(0.97)` on `:active` | Buttons need responsive press feedback |
| `transform-origin: center` on popover | `--radix-popover-content-transform-origin` | Popovers scale from trigger (not modals) |

### Motion review checklist

| Issue | Fix |
| --- | --- |
| `transition: all` | Specify exact properties |
| `scale(0)` entry | Start `scale(0.95)` + `opacity: 0` |
| `ease-in` on UI | Switch to `ease-out` or custom curve |
| `transform-origin: center` on popover | Use trigger location variable |
| Animation on keyboard action | Remove entirely |
| Duration > 300ms on UI element | Reduce to 150-250ms |
| Hover animation without media query | Add `@media (hover: hover)` |
| Keyframes on rapidly-triggered element | Use CSS transitions |
| Framer Motion `x`/`y` under load | Use `transform: "translateX()"` |
| Same enter/exit speed | Make exit faster than enter |
| All elements appear at once | Add stagger delay (30-80ms) |

---

## Debugging

- **Slow motion testing**: Play animations at 2-5x normal duration or use DevTools animation inspector.
- **Frame-by-frame**: Chrome DevTools Animations panel.
- **Test on real devices**: For touch interactions, test on physical devices.

---

## NEVER

- Use bounce or elastic easing curves — feel dated
- Animate layout properties casually (width, height, top, left)
- Use durations over 500ms for UI feedback — feels laggy
- Animate without purpose — every animation needs a reason
- Ignore `prefers-reduced-motion` — accessibility violation
- Animate everything — animation fatigue is real
- Block interaction during animations unless intentional
- Animate keyboard-initiated actions — user repeated it 100x today
