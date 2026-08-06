# Teach Flow

Gathers design context for a project. **DESIGN.md is the only file this flow creates**: the visual system spec in [Google Stitch DESIGN.md format](https://stitch.withgoogle.com/docs/design-md/format/) (colors, typography, components; answers "how it looks"). The strategic context (register, users, purpose, brand, anti-references, principles; answers "who/what/why") goes **into a file the user already has**, never into a freshly minted PRODUCT.md.

Every other design command reads these files when present; when they're missing, commands ask the user directly instead of blocking.

## Step 1: Load current state

Run the shared loader first so you know what already exists:

```bash
node {{scripts_path}}/load-context.mjs
```

The output tells you whether PRODUCT.md and/or DESIGN.md already exist. If `migrated: true`, legacy `.design.md` was auto-renamed to `PRODUCT.md`. Mention this once to the user.

Decision tree:
- **PRODUCT.md (or an existing product doc) exists**: merge the design context into it. Show the proposed section, confirm, write. Refresh DESIGN.md if the user wants.
- **No PRODUCT.md, but a fitting existing doc** (README.md, PRD, `docs/`, style guide, brand doc): extend that file with a short **Design Context** section instead of creating a new PRODUCT.md. Ask first. It's the user's file.
- **No fitting doc at all**: keep the confirmed answers in conversation, then offer to write them into README.md, or a new PRODUCT.md, only if the user asks. Do not create PRODUCT.md by default.
- **DESIGN.md missing**: offer `/design document` (see Step 5) once there's context to base it on.

Never silently overwrite or edit an existing file. Always confirm first.

If another command found no context files (e.g. `{{command_prefix}}design craft landing page`), it asks the user directly; teach is the deeper, durable version of that conversation. If the user wants the durable version, complete teach, re-run the loader, then resume the original command with the freshly loaded context. For craft, resume into shape next; teach creates project context, but it is not a substitute for the task-specific shape interview and confirmed design brief.

## Step 2: Explore the codebase

Before asking questions, thoroughly scan the project to discover what you can:

- **README and docs**: Project purpose, target audience, any stated goals
- **Package.json / config files**: Tech stack, dependencies, existing design libraries
- **Existing components**: Current design patterns, spacing, typography in use
- **Brand assets**: Logos, favicons, color values already defined
- **Design tokens / CSS variables**: Existing color palettes, font stacks, spacing scales
- **Any style guides or brand documentation**

Also form a **register hypothesis** from what you find:

- Brand signals: `/`, `/about`, `/pricing`, `/blog/*`, `/docs/*`, hero sections, big typography, scroll-driven sections, landing-page-shaped content.
- Product signals: `/app/*`, `/dashboard`, `/settings`, `/(auth)`, forms, data tables, side/top nav, app-shell components.

Register is a hypothesis at this point, not a decision; Step 3 confirms it.

Note what you've learned and what remains unclear. This exploration feeds both the design context and DESIGN.md.

## Step 3: Ask strategic questions (for the design context)

{{ask_instruction}} Ask only about what you couldn't infer from the codebase.

### Interview mode, not confirmation mode

If the repo is empty or the user's brief is sparse, run a short interview before proposing the design context. Do **not** turn a one-sentence request into a complete inferred context and ask for blanket confirmation.

- Use the harness's structured question tool when one exists. Otherwise, ask directly in chat and stop.
- Ask **2-3 questions per round**, then wait for answers.
- Use inferred answers as hypotheses or options, not as finished facts.
- **Every question carries your best hypothesis as the default**: the user confirms or corrects, they don't do homework.
- Complete at least one real user-answer round before drafting the design context, unless every required answer is directly discoverable from repo docs.
- Round 1 should establish register, users/purpose, and desired outcome.
- Round 2 should establish brand personality or references, anti-references, and accessibility needs.

### Minimum viable interview

Ask enough to complete the design context. At minimum, cover register confirmation, users and purpose, brand personality, anti-references, and accessibility needs unless each answer is directly discoverable from repo context. After at least one interview round, you may propose inferred answers, but the user must confirm them before you write anything. Never synthesize the context from the original task prompt alone.

### Register (ask first; it shapes everything below)

Every design task is either **brand** (marketing, landing, campaign, long-form content, portfolio: design IS the product) or **product** (app UI, admin, dashboards, tools: design SERVES the product).

If Step 2 produced a clear hypothesis, lead with it: *"From the codebase, this looks like a [brand / product] surface. Does that match your intent, or should we treat it differently?"*

If the signal is genuinely split (e.g. a product with a big marketing landing), {{ask_instruction}} Ask which register describes the **primary** surface. The register can be overridden per task later, but the design context carries one default.

### Users & Purpose
- Who uses this? What's their context when using it?
- What job are they trying to get done?
- For brand: what emotions should the interface evoke? (confidence, delight, calm, urgency)
- For product: what workflow are they in? What's the primary task on any given screen?

### Brand & Personality
- How would you describe the brand personality in 3 words?
- Reference sites or apps that capture the right feel? What specifically about them?
  - For brand, push for real-world references in the right lane (tech-minimal, editorial-magazine, consumer-warm, brutalist-grid, etc.), not generic "modern" adjectives.
  - For product, push for category best-tool references (Linear, Figma, Notion, Raycast, Stripe).
- What should this explicitly NOT look like? Any anti-references?

### Accessibility & Inclusion
- Specific accessibility requirements? (WCAG level, known user needs)
- Considerations for reduced motion, color blindness, or other accommodations?

Skip questions where the answer is already clear. **Do NOT ask about colors, fonts, radii, or visual styling here.** Those belong in DESIGN.md, not PRODUCT.md.

## Step 4: Write the design context into the chosen file

Write only after the user has confirmed the strategic answers from Step 3. If an inferred answer is uncertain or unconfirmed, ask before writing.

**Target file, in order of preference:**
1. **Existing PRODUCT.md**: merge the sections in below, matching its existing structure and voice. Update in place; don't append a duplicate.
2. **A fitting existing doc** (README.md, PRD, `docs/`, style guide, brand doc): add a short **Design Context** section with the fields below. Keep it proportional: README gets a compact section, a PRD gets full treatment.
3. **Nothing fits**: stay conversational. Offer to write the section into README.md or a new PRODUCT.md only if the user asks.

Show the proposed content before writing. The user's file is their file; edit with permission, never silently.

Synthesize the confirmed answers:

```markdown
## Design Context

### Register
product

### Users
[Who they are, their context, the job to be done]

### Product Purpose
[What this product does, why it exists, what success looks like]

### Brand Personality
[Voice, tone, 3-word personality, emotional goals]

### Anti-references
[What this should NOT look like. Specific bad-example sites or patterns to avoid.]

### Design Principles
[3-5 strategic principles derived from the conversation. Principles like "practice what you preach", "show, don't tell", "expert confidence". NOT visual rules like "use OKLCH" or "magenta accent".]

### Accessibility & Inclusion
[WCAG level, known user needs, considerations]
```

Register is either `brand` or `product` as a bare value. No prose, no commentary.

If `.design.md` existed, the loader already renamed it to `PRODUCT.md`; merge into that content rather than starting from scratch.

## Step 5: Decide on DESIGN.md

Offer `/design document` either way. Two paths:

- **Code exists** (CSS tokens, components, a running site): "I can generate a DESIGN.md that captures your visual system (colors, typography, components) so variants stay on-brand. Want to do that now?"
- **Pre-implementation** (empty project): "I can seed a starter DESIGN.md from five quick questions about color strategy, type direction, motion energy, and references. You can re-run once there's code, to capture the real tokens. Want to do that now?"

If the user agrees, delegate to `/design document` (it auto-detects scan vs seed). Load its reference and follow that flow.

If the user prefers to skip, mention they can run `/design document` any time later.

## Step 6: Confirm and wrap up

Summarize:
- Register captured (brand / product)
- Where the design context landed (which existing file) and what was written (DESIGN.md, or pending)
- The 3-5 strategic principles that will guide future work
- If DESIGN.md is pending, remind the user how to generate it later

**Critical: refresh session context.** If the context went into PRODUCT.md, re-run `node {{scripts_path}}/load-context.mjs` and let its full JSON output land in conversation. If it went into another file, state the file and its section so the rest of the session knows where to look.

If teach was invoked by another design command that found no context (e.g. the user ran `/design polish`), resume that original task now.
