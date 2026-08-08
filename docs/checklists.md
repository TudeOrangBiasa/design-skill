# Checklists

The pre-ship pass. Before UI ships, the universal checklist runs; for a specific surface, the matching checklist from the catalog runs. Source: [Checklist Design](https://www.checklist.design/) (created by George Hatzis; no license published, attribution in NOTICE.md).

## The universal pass

`reference/ui-checklist.md` carries the distilled run, loaded by `audit --polish`, `audit --checkup`, and the end of `build --craft`:

- **Core components:** button (base style, shape, variants, copy, states), input (label, placeholder as example, data format, hint), toggle, checkbox, radio (label, default selection, distinct style, states).
- **System layer:** color system (primitive palette, semantic tokens, state and feedback colors, WCAG AA contrast, dark and light mode, color blindness), typography (scale, semantic styles, line height and letter spacing, responsive, 200% zoom), spacing and grid (base-4 or base-8 scale, semantic tokens, column grid, breakpoints, density, baseline alignment), three-tier token architecture (primitive, semantic, component, with governance).
- **Feedback and states:** loading, empty state (zero state vs no-results state vs error variant), modal, tooltip, toast (copy, placement, duration, dismiss).
- **Data surfaces:** tables (header, row style, spacing, search, actions, filter and sort, responsive collapse, pagination).

Every check cross-links to the doctrine that owns it; the checklist is the run, not a second source of truth.

## The catalog

`reference/checklist-catalog.md` carries all 110 checklists and 703 checks, grouped by surface:

| Surface | Checklists |
|---------|-----------|
| Website | 23 (Security, About, Privacy, Pricing, FAQ, 404, Login, Sign up, Blog, and more) |
| Web app | 26 (Onboarding, Empty State, Settings, Billing, Admin Panel, 2FA, Kanban, Chat, and more) |
| Design system | 28 (Button, Input Field, Modal, Tooltip, Toast, Table, Tokens, Color System, and more) |
| Mobile app | 20 (Tab Bar, Splash Screen, Checkout, Paywall, Camera, Map View, and more) |
| Flows | 13 (Adding to cart, Resetting password, Showing input error, Making a card payment, and more) |

Load the catalog when working a website page, a web app screen, a design-system component, a mobile screen, or a flow, and run the matching checklist items.

## Where the checks come from

The catalog was scraped from Checklist Design's public API (110 checklists, 703 items, zero empty) and normalized for the corpus lint. The raw dataset is kept locally and is not versioned: its vocabulary (API keys, 2FA, password reset, payments) trips the security scanner at scale, the same reason saved webpage artifacts stay out of git. The distilled playbook and the catalog markdown carry the knowledge.

Checklist Design publishes no explicit license; its items are short functional statements of standard design practice. Attribution and a verification flag live in [NOTICE.md](../NOTICE.md) before any commercial redistribution of the catalog text.
