# Responsiveness: interaction latency

Load for the performance dimension of audits and for any surface where users click, tap, or type (dashboards especially, per [dashboards.md](dashboards.md)). This playbook owns the response-time contract. Motion doctrine lives in [animate.md](animate.md) and stays authoritative for animation; responsiveness is the time to the next frame, not the choreography.

## The metric

INP (Interaction to Next Paint) assesses page responsiveness by observing the latency of all click, tap, and keyboard interactions across a visit. It reports the worst interaction, ignoring outliers: pages with many interactions drop the single worst per 50, and field data is reported at the 75th percentile of page views.

- Good: 200ms or below.
- Needs improvement: 200-500ms.
- Poor: above 500ms.

**The Next Paint Contract.** Feedback for an interaction appears in the very next frame the browser paints. When the next paint is blocked, the user does not know the page heard them; they click again, and the delayed inputs fire together, toggling the accordion closed again. The contract: initial visual feedback within the next frame, the interaction total under 200ms, never above 500ms.

## What is in an interaction

An interaction is the group of event handlers that fire during one logical gesture (a tap is pointerdown, pointerup, click). Its latency is the single longest duration from the start of the gesture to the moment the browser can next paint a frame. Three phases:

1. Input delay: time before event handlers start, driven by long tasks on the main thread.
2. Event handler duration: the handlers themselves.
3. Next-paint delay: time until the browser paints after the handlers finish.

Only click, tap, and key interactions count. Hover, zoom, and scroll do not, but gestures inside them (a click inside a scrolled list) do.

## What makes INP poor

- **Long tasks:** any main-thread task over 50ms. A long task blocks every interaction that arrives while it runs. **The Long Task Rule.** No task over 50ms on the main thread; split the work or defer it.
- **Heavy event handlers:** synchronous work in handlers that could be computed lazily, cached, or moved off the main thread.
- **Layout thrash:** reading layout and writing styles in the same frame forces synchronous reflow. Batch reads, then batch writes.
- **Layout-property animation:** animating width, height, top, left forces layout every frame. Transform and opacity only, composited on the GPU; the same rule Emil's motion doctrine states and INP demands at once ([animate.md](animate.md)).
- **Over-rendering:** state changes that repaint the whole page instead of the changed surface. Scope visual updates to the affected element.
- **Input delay at load:** third-party scripts and eager hydration blocking the main thread while the user is already interacting. Around 90% of user time is spent after the page loads.

## Measure

- Field: CrUX at the 75th percentile, segmented by mobile and desktop. Field data is the truth; lab data is the hypothesis.
- Lab: throttled device simulation. Lab misses real-device variance and real interaction patterns.
- JavaScript: the Event Timing API (`performance.getEntriesByType('event')`) for interaction timings in the page's own telemetry.

## The audit pass

The performance dimension of an audit checks, in order: the 200ms contract on primary interactions (open navigation, add to cart, submit a form, apply a filter), long tasks over 50ms in interaction paths, layout-property animation, synchronous layout thrash, and heavy third-party work in the input-delay window. Each finding names the interaction, the phase (input delay, handler, next paint), and the measured or estimated latency. Report in field terms: good under 200ms, poor over 500ms.

## Sources

- web.dev, "Interaction to Next Paint (INP)", Jeremy Wagner and Barry Pollard (stable Core Web Vital; 200/500ms thresholds; 75th percentile; Event Timing API).
- [animate.md](animate.md) remains the motion doctrine (Emil Kowalski's design engineering); the transform-and-opacity rule is shared by both.
