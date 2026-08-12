# Laws of UX — learned and mapped to the design skill

STATUS 2026-08-12: coverage audit below references v1 reference files (deleted in the v2 merge); the v2 doctrine folds the GAPs (Cognitive Bias, Doherty Threshold, Flow, Goal-Gradient) into reference/audit.md. Historical record.

Status: research notes, 2026-08-06. Source: https://lawsofux.com/ (Jon Yablonski, fetched live; 30 entries). Purpose: audit which laws the skill already expresses, which it misses, and how to wire the gaps into doctrine. Outside the linted doctrine corpus.

Coverage legend: COVERED = the skill already states this law in effect (reference file/rule named); PARTIAL = embodied in spirit but never named or only weakly; GAP = no expression found.

| # | Law | One-line meaning | Coverage | Where in the skill |
|---|-----|------------------|----------|--------------------|
| 1 | Aesthetic-Usability Effect | Users perceive attractive design as more usable | COVERED | The skill's thesis; `audit --critique` "aesthetics and taste review"; the visual quality bar in craft-floor |
| 2 | Choice Overload | More options = worse decisions and satisfaction | COVERED | Decide smell ("too many equal calls to action"); bans; 60-30-10 rarity; scope gate complexity check |
| 3 | Chunking | Grouped content is easier to process than scattered | PARTIAL | Hierarchy doctrine, scan patterns; never named |
| 4 | Cognitive Bias | Known biases (anchoring, confirmation) distort judgment | GAP | No expression; relevant to the planning interview (questions carrying recommendations must fight anchoring) |
| 5 | Cognitive Load | Working memory is limited; reduce extraneous load | COVERED | Copy doctrine (one verb per button); "verbosity is a design failure"; complexity gate BLOCK; form minimization |
| 6 | Doherty Threshold | System response under 400ms keeps users in flow | GAP | Motion timing exists (150-250ms transitions) but no system-feedback latency principle |
| 7 | Fitts's Law | Time to hit a target grows with distance, shrinks with size | COVERED | Touch targets 44x44 / 56x56 elderly; "primary action sits where the scan ends"; CTA hierarchy |
| 8 | Flow | Deep engagement when challenge matches skill | GAP | No expression; relevant to onboarding, live iteration, complexity calibration |
| 9 | Goal-Gradient Effect | Effort rises as a visible goal nears | GAP | No expression; progress indicators in multi-step flows and setup |
| 10 | Hick's Law | Decision time grows with number and complexity of choices | COVERED | Decide smell; "limit the number of metrics" (dashboard doctrine from research); scope gate |
| 11 | Jakob's Law | Users expect familiar patterns from other sites | COVERED | product.md ("system fonts are legitimate", "earned familiarity"); native-platforms.md (platform-native patterns) |
| 12 | Law of Common Region | Elements in a bounded region read as a group | PARTIAL | Layout doctrine (3-plane depth, cards as discrete regions); never named |
| 13 | Law of Pragnanz | People perceive the simplest interpretation | PARTIAL | Simplicity doctrine, bans on ornament; never named |
| 14 | Law of Proximity | Nearby elements read as related | COVERED | 1-4-9 rhythm; monotonous-spacing smell ("tight groups, generous separations") |
| 15 | Law of Similarity | Similar elements read as related | PARTIAL | "Consistent affordances", "same button shape", 9 states of being; never named |
| 16 | Law of Uniform Connectedness | Visually connected elements read as one group | PARTIAL | Breadcrumbs, nav patterns; never named |
| 17 | Mental Model | Users bring existing mental models to new UIs | PARTIAL | Ubiquitous language, nav patterns; adjacent to Jakob's; never named |
| 18 | Miller's Law | Working memory holds ~7 plus/minus 2 chunks | PARTIAL | Chunking doctrine; never named |
| 19 | Occam's Razor | Simplest explanation/work is best | COVERED | "Max 2-3 extra components"; "delete it"; bans; scope gate |
| 20 | Paradox of the Active User | Novices need immediate wins; experts need shortcuts | PARTIAL | `pin.mjs` is literally the shortcut mechanism; no doctrine naming the paradox |
| 21 | Pareto Principle | ~80% of effects come from ~20% of causes | GAP | No expression; audit P0-P3 prioritization is a cousin, never named |
| 22 | Parkinson's Law | Work expands to fill available time | GAP | Not a surface law; low value for the skill |
| 23 | Peak-End Rule | Experience is remembered by its peak and its end | PARTIAL | Complex audits' closing ambition statement; delight micro-interactions; never named |
| 24 | Postel's Law | Be liberal in what you accept, conservative in what you emit | GAP | No expression; input handling, form validation, error recovery doctrine |
| 25 | Selective Attention | Users notice what they're looking for | COVERED | Scanning doctrine (F/Z/Spotted/Layer cake); "headings carry the message alone" |
| 26 | Serial Position Effect | First and last items are remembered best | PARTIAL | "First viewport is a thesis" + closing statements; never named |
| 27 | Tesler's Law | Complexity is a constant; someone must bear it | PARTIAL | The skill absorbs complexity (load-context, DESIGN.md constitution) so the surface stays simple; never named |
| 28 | Von Restorff Effect | The distinctive item is remembered | COVERED | "The One Voice Rule" (accent on <=10% of a screen); bolder/overdrive; one focal element |
| 29 | Working Memory | Limited capacity drives all load laws | PARTIAL | Folded into cognitive load; never named |
| 30 | Zeigarnik Effect | Unfinished tasks are remembered better than finished ones | GAP | No expression; progress indicators, onboarding, "what's left" affordances |

## Gap summary

Clear gaps (no expression anywhere): Cognitive Bias, Doherty Threshold, Flow, Goal-Gradient Effect, Pareto Principle, Parkinson's Law (low value), Postel's Law, Zeigarnik Effect.

Partial (in spirit, never named, no normative rule): Chunking, Common Region, Pragnanz, Similarity, Uniform Connectedness, Mental Model, Miller's Law, Paradox of the Active User, Peak-End Rule, Serial Position Effect, Tesler's Law, Working Memory.

## Proposed integration

1. New reference file `reference/ux-laws.md` (doctrine, linked from SKILL.md Setup step 4 or the review playbook). Content: the 30 laws in the skill's voice, grouped by where they bite (scanning and hierarchy: Selective Attention, Common Region, Proximity, Similarity, Von Restorff, Serial Position; choice and load: Hick's, Miller's, Working Memory, Cognitive Load, Occam's, Tesler's; interaction physics: Fitts's, Doherty, Postel's, Parkinson's; memory and motivation: Peak-End, Zeigarnik, Goal-Gradient, Flow, Paradox of the Active User, Cognitive Bias, Aesthetic-Usability, Jakob's, Mental Model, Pareto).
2. The 8 clear gaps get normative form, matched to existing doctrine voice:
   - Doherty: interactions acknowledge within 400ms; loading states are designed, not incidental (extends the motion doctrine).
   - Goal-Gradient + Zeigarnik: multi-step flows carry visible progress; unfinished paths leave a clear "resume" affordance (extends interaction states, onboarding).
   - Postel's: inputs tolerate real-world variance; errors are recovery paths, never dead ends (extends fix --clarify / error-state doctrine).
   - Flow: onboarding and first-run match difficulty to user skill; complexity ramps, never dumps (extends build --onboard).
   - Paradox of the Active User: ship the immediate win and the expert shortcut together; `pin` is the shortcut mechanism.
   - Peak-End: the last interaction of a flow is designed, not abandoned (closing states, confirmation screens).
   - Pareto: audit prioritization is explicitly 80/20; P0-P3 maps to impact, not completeness.
   - Cognitive Bias: the planning interview names its own bias risk; recommendations must be stated as hypotheses, not anchors.
3. Detector rules (mechanically checkable subset, small): `cta-overload` (4+ equal CTAs per viewport class — Hick's), `touch-target-too-small` (interactive element below 44px without exception — Fitts's), `multi-step-without-progress` (form wizard with no progress indicator — Goal-Gradient). These extend the audit/access dimension rather than the slop set.
4. Review/audit pass: `audit --review` adds a laws checklist pass (peak-end, hick, fitts, doherty) alongside the existing lenses, per the review playbook.

## Verification

- Law list verified against the live site (30 entries; slugs aesthetic-usability-effect through zeigarnik-effect, incl. choice-overload, cognitive-bias, cognitive-load, doherty-threshold, flow, goal-gradient-effect, law-of-uniform-connectedness, mental-model, paradox-of-the-active-user, pareto-principle, postels-law, selective-attention, serial-position-effect, teslers-law, von-restorff-effect, working-memory).
- Coverage mapping is a first-pass audit against the skill's current reference files; expect review to shift a few PARTIALs to COVERED.
