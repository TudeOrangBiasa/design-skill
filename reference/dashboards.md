# Dashboards: decision surfaces

Load for any operational, analytical, or monitoring surface: admin panels, analytics, server monitors, KPI overviews, data-heavy product views. The register is product ([product.md](product.md)); the mode comes from the surface ([modes.md](modes.md)). A dashboard is a tool for decisions, not a display of data. Every element traces to a decision someone makes; a screen packed with charts nobody reads is data rendered into noise.

## Decision trace

Before anything renders, each metric answers a named decision. Ask the stakeholder: "What action will you take based on this data?" If there is no answer, the metric does not belong on the dashboard.

- Separate decision metrics from vanity metrics. Total pageviews and registered users feel informative and drive nothing. Conversion, churn, and time-to-resolution signal that something works, is broken, or needs attention now.
- Match depth to role. An executive gets a daily glance at trends; a support agent gets a queue with response times; an analyst gets granular, filterable tables. Define 2-4 personas, one view each. Never design for the most data-literate person and expect everyone else to adapt; they will stop using it.
- A one-page decision map (metric, decision, owner) is the scope contract. It takes an hour and saves weeks of scope creep.

## The scan path

Users do not read dashboards; they scan them. NN/g F-pattern research: a sweep across the top, a shorter sweep below, a vertical drift down the left. Tableau's eye-tracking adds two findings that shape every layout:

1. Big numbers command attention immediately. If a number matters, give it visual weight.
2. When the same element repeats, attention peaks at the first instance and drops left to right, top to bottom. The last two cards in a row of five are nearly invisible.

Build the inverted pyramid:

- Top row: the 3-5 KPIs that matter most, each a clean metric card with a large readable number, a clear label, and one contextual indicator (sparkline, trend arrow, prior-period comparison).
- Middle band: trend visualizations showing where things are heading.
- Bottom section: granular tables and breakdowns for the users who dig deeper.

## Layout system

A 12 or 16-column grid on an 8px base unit locks components into alignment, keeps responsive behavior predictable, and gives the dashboard one visual system. Generous whitespace between card groups reduces cognitive strain; the same 1-4-9 rhythm rules apply ([layout.md](layout.md)). High-density surfaces may go full width with condensed gutters; editorial centering has no place on a scanned surface.

## Density and tables

Data density is a defined scale, not a mood.

- Row heights come from the scale: 24, 32, 40, 48, or 64px. The header row matches the body row height; never mix the two. 64px only for two-line cells.
- Density is a discrete user setting in 4px steps, never an ad-hoc per-element choice. Compact levels belong on data-dense screens.
- Tables: at least 3 columns, 16px cell padding, a human-readable first column as the record identifier, columns ordered by relevance, sticky header and frozen first column on scroll, zebra striping and hover highlights to keep the eye on the row.
- Numbers: right-aligned tabular lining figures; monospace for code-adjacent values. Serif oldstyle numerals are prose type and cannot be scanned down a column.
- Maximize the data-ink ratio: every non-data pixel earns its place or leaves.

## Charts

Start from the question, not the chart. The pairings that rarely fail:

- Line chart: trend over time.
- Bar chart: comparison between categories.
- Scatter plot: correlation between variables.
- Single-number card: current status at a glance.

Bans: pie or donut with more than 3-4 slices, anything in 3D, area or angle as the primary quantitative encoding (length and 2D position are perceived preattentively; angle is not). Distinguish operational dashboards (real-time, immediate time-sensitive decisions, speed first) from analytical dashboards (historical data, exploration, consistent legends and color mapping per dataset).

**The Hover Test.** If a chart needs a hover to be understood, it has failed. Labels, legends, and annotations make it legible with zero interaction.

## Context on every metric

A number without context is a status update, not a signal. Every KPI card carries three pieces of context:

1. Temporal comparison: week-over-week or month-over-month change.
2. Benchmark or target: is this ahead of the goal?
3. Trend indicator: sparkline, directional arrow, or color-coded status that reads healthy, at risk, failing.

That is enough to make a judgment call. Deeper detail belongs behind a drill-down, not inside the card. Every widget links to the views that explain it, so a spike in the summary opens the underlying report one click away.

## Progressive disclosure

Show essentials first, reveal details on demand. Summary data loads fast because it is aggregated; granular data is queried only when a user asks. Drill paths follow common hierarchies: region > country > city, year > quarter > month > week, department > team > individual. Deep-linkable views let users share the exact state with a teammate.

## Filters and views

No single default view serves everyone. Ship structured flexibility, not a blank canvas:

- Global filters (date range, team, region) update every widget at once.
- Widget-level filters for granular control over one tile.
- Saved presets and shareable filter URLs so common views survive a refresh.

Unlimited customization paralyzes. Predefined filter categories, drag-and-drop within the grid, and a curated widget library give control inside guardrails.

## States

Empty, loading, and error states are designed, never defaulted.

- The empty state is an onboarding moment: show what the populated view will look like and the next step. A blank screen is a missed first run.
- Loading uses skeleton screens that mirror the final layout, keeping the user oriented.
- Errors speak plainly: what happened and the path forward (retry the query, adjust the filters, contact support). "Something went wrong" is not a design decision; an error handled well barely registers as a problem.

## Accessibility

Dashboard accessibility is the same set of decisions as dashboard quality, not a compliance checkbox.

- Contrast at WCAG 2.1 AA: 4.5:1 for text, 3:1 for large text and UI components.
- Full keyboard navigation: Tab, Shift+Tab, Enter, Escape reach everything.
- ARIA labels on interactive elements; the interface stays intact at 200% zoom without breakage or overlap.
- Color is never the only encoding. Roughly 8% of men have a color-vision deficiency; a red/green status system is unreadable to them. Pair every color with a text label ("On track", "At risk") and prefer shapes plus color in charts.

## Measurement

The only honest measure of a dashboard is whether users complete tasks faster and more accurately than before. Track it as a loop after every major release. Responsiveness is part of the contract: [performance.md](performance.md) owns the interaction-latency rules (200ms good, 500ms poor).

- Time on task, in the three MeasuringU variants: time to complete (successful tasks only), time on task (all participants), time till failure (failed tasks only). The spread reveals both how fast the fast users are and how long the struggling ones persist before giving up.
- Task success rate and error rate: did they find the right answer, and did they misread the data?
- The 5-second test: can a new user identify the dashboard's purpose within five seconds?

## Sources

- UX Pilot, "12 Dashboard Design Principles For Better UX" (https://uxpilot.ai/blogs/dashboard-design-principles).
- Nielsen Norman Group: dashboard preattentive processing, data tables, F-pattern eye tracking, mobile tables.
- IBM Carbon: data table style, 2x grid, presentation dashboards.
- Material 3 density; Edward Tufte, The Visual Display of Quantitative Information; WCAG 2.1 AA.
