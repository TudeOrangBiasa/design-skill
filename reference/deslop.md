# Deslop: kill tells with positive alternatives

The tell catalog lives in SKILL.md's 10-tells table and audit.md's Standards axis. This file is the replacement playbook: every tell gets a positive alternative, never just removal. Removing a tell without an alternative leaves a hole that a different tell fills.

## Core doctrine

- **Replace, don't delete.** Each fix must state the intentional rationale: what the element is for now, and why this choice serves it.
- **One tell at a time, verified after each.** Fix, re-render, check the fix did not introduce a different recognizable tell (audit the output with the same eyes that found the first).
- **Keep content and purpose.** Deslop changes the design, never the copy's meaning, the structure, or the user's task.
- **Never add a tell to fix a tell.** Gradient text is not the cure for a flat page; more cards is not the cure for a template grid.
- **The brief wins.** A documented decision that deliberately uses a flagged pattern is not a tell - leave it and say why.

## The plays

- `--distill` - strip to essence first: remove non-essential elements, then rebalance hierarchy so what remains carries the page. Fixes stat monuments (delete or make real), icon toppers (drop the tile, let the heading lead), accent rails (delete the stripe, re-group with spacing).
- `--bolder` - amplify character: bigger display scale, stronger contrast, one committed color move, asymmetric composition. Fixes template heroes (break the spine: offset grid, strong left edge, content first), default type stacks (editorial contrast: display vs body, ≥1.25x scale, 60-76ch), generic tech hue (one real color story from the product, OKLCH-first, flat or subtle).
- `--quieter` - reduce intensity: cut decoration, unify surfaces, calm the palette while keeping hierarchy. Fixes unearned blur (remove backdrop-filter unless it serves legibility), tech gradients (flatten), over-weighted type.
- `--harden` - make it real: replace invented stats with real numbers or specific claims, replace emoji-as-icons with a real icon set (Lucide, Phosphor, Tabler, Iconoir, Humbleicons, Flowbite - one set, never mixed), fix overflow and edge cases.

## Anti-reference echo

If a reviewer could name the source template the design was guessable from, restart with a direction contract instead of patching: register + mode + one-sentence physical scene (what this page is, as a physical object). Patching a template-shaped page keeps its skeleton visible; the contract replaces the skeleton.

## Output

Full rewritten HTML plus a one-line note per fix naming the tell, the alternative, and why. Verify against the detector after the rewrite: `node scripts/detector.mjs <target>` should exit 0 (no error findings) - that is the mechanical proof the slop is gone.
