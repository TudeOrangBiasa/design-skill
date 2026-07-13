# Surface Patterns

Identify the dominant work pattern BEFORE any layout decisions. Surface pattern determines layout topology, register, and motion approach.

## The 7 Surfaces

| Surface | Examples | Layout Topology | Register | Motion Hints |
|---------|----------|-----------------|----------|-------------|
| **Monitor** | Dashboards, status boards, feeds | Prioritized metrics, alerts, timelines | Product | Subtle data updates, no page-load choreography |
| **Operate** | Studio, editor, admin panel | Command bars, canvases, side panels | Product | No animation on frequent ops, deliberate transitions only |
| **Compare** | Tables, split views, analytics | Scanning lanes, matrices, ranked lists | Product | Highlight on sort/filter, transitions on compare |
| **Configure** | Settings, forms, preferences | Grouped fields, summaries, preview | Product | Focus transitions, validation feedback |
| **Learn** | Docs, tutorials, articles | Article flow, walkthrough rhythm | Brand/Product | Scroll-driven reveals, staggered content |
| **Decide** | Pricing, CTA pages, landing | Focused pitch, one action, proof | Brand | Hero entrance, sticky CTA, scroll narrative |
| **Explore** | Search, browse, gallery | Filters, maps, clusters, discovery | Brand/Product | Loading skeletons, staggered results, map transitions |

## Anti-Convergence

Each surface has distinct visual fingerprint. An Operate surface (keyboard-first, minimal chrome) must NOT converge toward Monitor (data-dense, scroll-heavy). If implementation looks like any other surface, restart with surface identification.
