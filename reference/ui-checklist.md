# UI checklist: the pre-ship pass

Load before shipping any UI: the final pass of `audit --polish`, `audit --checkup`, and the end of `build --craft`. The source is Checklist Design (110 checklists, 703 checks, scraped for this distillation; the raw dataset stays local, not versioned). This file carries the universal pass; the per-surface catalog is at the bottom. Where a check has doctrine elsewhere, link to it; the checklist is the run, not a second source of truth.

## Core components

- **Button:** a base style (fill, outline, or underline), defined shape (padding, border, radius, shadow), variants (primary and secondary), copy that says what happens on click, and the full state set: hover, focused, disabled. Generic copy like "Okay" or "Cancel" is allowed only when the surrounding title or description gives the action context. [interaction.md](interaction.md) owns the state vocabulary.
- **Input field:** a label that states what the user is meant to provide, placeholder text acting as an example and never as the label, enforced data format (numeric only for a phone number), a hint when the label is ambiguous, and an icon to break up long forms. Labels live outside the field ([dashboards.md](dashboards.md) form rules).
- **Toggle, checkbox, radio:** a label paired with the control, an explicit default selection, a style distinct from the other input types, and the full state set. A radio needs more than one option to exist, a default selected, and a clickable label and container, not just the dot.

## System layer

- **Color system:** a primitive palette (named ramps like blue-100 through blue-900), semantic tokens that name purpose not appearance, interactive state colors for default, hover, pressed, focused, disabled, and selected, a consistent feedback set (success, warning, error, info), WCAG AA contrast verified (4.5:1), a complete dark and light mode, brand colors mapped into the semantic system, and the palette tested against color-vision deficiencies. [colorize.md](colorize.md) owns the palette doctrine; this checks the system is complete.
- **Typography:** a type scale with a consistent ratio, semantic text styles that name role not size, chosen typefaces with their weights and loading, line height and letter spacing defined per style, responsive type behavior, a minimum readable size validated in the real render, and behavior at 200% zoom. [typeset.md](typeset.md).
- **Spacing and grid:** a base-4 or base-8 scale (4, 8, 12, 16, 24, 32, 48, 64, 96), semantic spacing tokens, a column grid per major breakpoint (4 mobile, 8 tablet, 12 desktop) with gutters, breakpoints shared between design and code, a distinction between component spacing and layout spacing, density variants for data-heavy products, and text baselines aligned to the base unit. [layout.md](layout.md) and [dashboards.md](dashboards.md).
- **Tokens:** a three-tier architecture (primitive, semantic, component), a predictable naming convention, each semantic token documented with what it can and cannot be used for, a governance rule for token versus hardcoded value, sync with the design tool, and versioned changes. [document.md](document.md) owns DESIGN.md generation; the three-tier check extends it.

## Feedback and states

- **Loading:** a clear indicator, text that explains the state, a defined threshold for when loading is needed at all, visibility for assistive tech, and something to look at while the user waits. Skeleton layouts beat spinners on data surfaces ([dashboards.md](dashboards.md)).
- **Empty state:** an illustration or icon that signals the state without feeling broken, a plain-language heading naming what is missing, a supporting description for first-time users, a primary action toward the next step, a distinction between the zero state (nothing created) and the no-results state (nothing matched), and a separate variant for load failures.
- **Modal:** a clear title explaining the action, a button or link to continue or close, a close affordance, a responsiveness check (a modal may be the wrong pattern on small devices), a changed background behind the modal, and a description when the decision needs context.
- **Tooltip:** concise content, a background that contrasts with the underlying surface, a clear visibility model, and a dismiss action when the tooltip is intrusive.
- **Toast:** copy that says what happened, placement in a viewport corner rather than in focus, triggered only by an action or event, color variants that match the message's emotion, a duration long enough to read and short enough to clear, and a dismiss affordance.

## Data surfaces

- **Table:** a header that defines each column, row styling with borders or zebra striping, consistent row and header padding, search, row actions (view, edit, delete), filter and sort, a defined responsive structure (collapse into an accordion on small screens), and pagination. Density, row heights, and numerals follow [dashboards.md](dashboards.md).

## The catalog

Pick the surface, run its checklist (all 110 from Checklist Design; the ones below are the common cases).

- **Website pages (23):** Pricing, FAQ, 404, Contact Us, Blog and Blog Post, Login, Sign up, Search, Cart, Careers, Team, About, Status, Billing, Waitlist, Affiliate, Compare, Privacy, Security, Features, Testimonials, Press and Media.
- **Web app screens (26):** Onboarding, Empty State, Notifications and Notification Settings, Settings, Account, Billing, Admin Panel, Search Results, Multi-step form, Kanban board, Chat, Feed, Comments, Integrations, API Keys, Version History, Timeline and Gantt, Public Profile, User Management, Single Item Detail, 2FA, Help Center, Maintenance, Pricing, Login.
- **Design system components (28):** the component's own checklist, e.g. Button, Input Field, Toggle, Checkbox, Radio, Select, Modal, Tooltip, Toast, Tabs, Accordion, Drawer, Carousel, Slider, Date Picker, Skeleton, Banner, Badge, Avatar, Icon, Card, Table, Dropdown Menu, Searchbar, Loading, Typography, Color System, Spacing and Grid, Tokens.
- **Mobile app (20):** Tab Bar Navigation, Gesture navigation, Splash Screen, Checkout, Paywall, Onboarding, In-App Notifications, Action Sheet, Search, Camera, Map View, Chat, Settings, In-App Browser, Cart, Login, Account, Invite, Billing.
- **Flows (13):** Adding to cart, Uploading media, Verifying account, Canceling subscription, Filtering items, Saving changes, Entering promo code, Showing input error, Resetting password, Deleting account, Contacting support, Making a card payment, Submitting a form.

## Sources

- Checklist Design (https://www.checklist.design/), 110 checklists, 703 checks. Scraped for this distillation; the raw dataset is kept locally in research/ and is not versioned.
