# design-skill v2 — Refactor Plan (design from scratch)

Status: research complete, 2026-08-11. Inputs: full repo audit (55 reference files, 25 scripts, 3 test files), direct source analysis of `agent-skills-eval` and `microsoft/SkillOpt`, install + analysis of `mattpocock/skills`, and study of `pbakaus/impeccable`, `emilkowalski/skills`, `commandcode.ai/design`, `agentskills.io`, `NVIDIA/SkillSpector`.

---

## 0. The landscape, in one table

| System | Size/format | What it does well | The gap it leaves |
|---|---|---|---|
| Anthropic frontend-design | 1 SKILL.md | First real design skill; the origin | Static; superseded |
| **impeccable** (pbakaus, 57.9k★) | 1 skill, 23 commands, 59 rules, 3.4k files | Big deterministic rule engine, live browser iteration, PRODUCT.md/DESIGN.md init | Monorepo sprawl; command surface too wide; your direct ancestor — you inherited its sprawl |
| **emilkowalski/skills** (28.2k★) | 9 tiny skills, mostly animation | Mistake-catalog method: list the *specific small mistakes* agents make + how to fix them; small files | Animation-only; no full-UI doctrine |
| **mattpocock/skills** (installed) | 35 skills, 496KB | Tiny SKILL.md per skill (2-5KB), glossary-first vocabulary, marketplace w/ security scans | No visual/design skill at all; process/vocabulary only |
| **commandcode /design** (proprietary) | 1 slash command | "The part of Command Code that knows why [AI UI looks the same] and fixes it." **10 tells carry ~90% of the slop-recognition signal** | Closed; tied to their agent |
| **agent-skills-eval** | npm CLI + TS SDK | A/B harness: same prompt with_skill vs without_skill, judge-graded assertions, agentskills.io-spec-compliant, static HTML reports | Measures only; doesn't improve the skill |
| **SkillOpt** (microsoft) | Python research engine + Sleep | Skill doc as trainable weights; **optimized artifacts are 300–2,000 tokens**; gate accepts only strict validation-score improvement; Sleep = nightly self-evolution over agent transcripts | Research-grade setup; noisy scoring kills the optimizer (their own warning) |

Lineage: Anthropic frontend-design → impeccable → **this repo**, with CommandCode's ten-tell theory + Emil's mistake-catalog method mixed in (per NOTICE.md).

---

## 1. Diagnosis — why "it isn't optimal and doesn't kill slop"

### 1.1 The skill outgrew the model's attention budget
- Full prompt corpus: **539KB** of reference docs + 14.7KB SKILL.md + 469KB of scripts.
- Minimum setup load per SKILL.md's own Setup section: **~52KB** (SKILL.md + REFERENCE.md + modes + brand/product + craft-floor). Add one command reference (smell.md 19KB) and the 93.8KB `checklist-catalog.md` and a single invocation can burn 100KB+ before reading a line of the user's code.
- No model reliably *applies* doctrine it can't hold in active attention. The slop-killing content exists and is good — it's buried in taxonomy tables, philosophy quotes, and redundancy. Capacity dilution, not content absence.

### 1.2 Negative-space teaching
- The 30-item Bans list teaches the *anti-aesthetic*: purple-blue hex codes, "ghost-card", "glassmorphism". The model samples near-misses of the forbidden list — which is exactly how you get "second-order slop" (the skill's own AI Slop Test admits it: "aesthetic guessable from anti-references → rework").
- CommandCode's measured insight: **~10 tells carry ~90% of the recognition signal**. The skill should teach those few with positive direction, not 30+ flat prohibitions.

### 1.3 No measurement
- The only CI gates: 21 unit tests (scripts), lint-docs, dispatcher `--help` smoke, SkillSpector (NVIDIA prompt-injection scanner). **Nothing measures whether the skill makes the model's output better.** v1.0.26 vs v1.0.20 — unknown. The user cannot know if changes help or regress. That's the "not optimal" root: unmeasurable ⇒ unoptimizable.

### 1.4 Three overlapping command taxonomies (designed-by-committee evidence)
- SKILL.md routing tables: ~30 commands. `scripts/command-metadata.json`: 23 entries — **stale**: lists `teach` (CommandCode leftover; no reference/teach.md, no dispatcher tool) and **omits 12 real commands** (deslop, checkup, smell, review, refine, interaction, responsive, init, setup, redesign, voice, access).
- `scripts/design.mjs` TOOLS map: 12 tools, **missing 5 live-* scripts** its own docs invoke (live-accept, live-server, live-inject, live-session-store, live-completion).
- `pin.mjs` VALID_COMMANDS mirrors the stale gap, so 12 real commands can't be pinned.
- Fix at the root: one machine-validated catalog.

### 1.5 A product trying to be five products
- The skill is simultaneously: router, doctrine, design-spec format (Stitch parser), slop detector, **a 13-script live browser-iteration subsystem** (live-server/inject/poll/wrap/accept + vendored 197KB `modern-screenshot.umd.js`), critique storage, and a report generator. Impeccable proves this sprawl scales to 3.4k files — and that size ≠ quality.
- Runtime deps are external (browser-use MCP server, pinned pipx wrapper) — a skill that requires MCP infrastructure to do its core job isn't portable.

### 1.6 Smaller consistency rot (from the audit)
- `audit.md` scores /24, its summary says /20 (CHANGELOG confirms the /20→/24 move; audit.md stale).
- `package.json files[]` omits `research/` + `scraped/`, but `new-work.md` step 4 requires `scraped/lapa-ninja-references.json` — npm installs ship a broken flow.
- Two undocumented state dirs (reports in `.design-skill/`, tool state in `.design/`).
- `load-context.mjs` auto-renames `design.md` → `PRODUCT.md` — mutation on a read command.
- CONTRIBUTION.md says "16 tests"; there are 21. Docs cite `tests/live-e2e/agent.mjs`, `tests/live-wrap.test.mjs` — no `tests/` ships.
- `is-generated.mjs` shells `git check-ignore` with JSON-stringified paths (fragile, non-portable).

---

## 2. Evals framework — decision

### Adopt: `agent-skills-eval` (darkrishabh) — now
It is the missing receipts layer and the only framework that fits the SKILL.md ecosystem directly:
- **A/B design**: every eval runs twice — prompt with the skill loaded vs without (baseline) — judge grades both against the same assertions. This isolates *actual skill lift* from model ability. That is precisely "does my skill kill slop vs not loading it at all."
- Judge-graded assertions with cited reasoning (not vibes), plus deterministic tool-call assertions.
- agentskills.io-spec-compliant: `evals/evals.json` in the skill folder; validation + official iteration-N artifacts.
- Zero infra: `npx agent-skills-eval ./skills --target … --judge … --baseline`; OpenAI-compatible (works with any chat model incl. local); static HTML report + JSONL for diffing runs.
- Maturity: shipped npm package, CI, docs, spec compliance. Works today.

Config sketch for this repo:
```yaml
# agent-skills-eval.yaml
root: ./            # skill root (SKILL.md here)
workspace: ./eval-workspace
baseline: true      # with_skill vs without_skill
target: <harness-model>
judge: <judge-model>
include: ["SKILL.md", "reference/**"]
strict: true
```

Eval suite to ship in `evals/evals.json` (one per command family; judge rubric per case):
1. **slop-kill** — give a sloppy landing page (reuse `scripts/fixtures/slop.html`); assert: no error-severity detector findings remain, bans not present, hierarchy improved. *Hard assertion: run `detector.mjs` on the diff.*
2. **build-from-brief** — brief + persona; assert brief fidelity, no template hero/identical card grid, copy voice.
3. **redesign-character** — "make it bolder"; assert character change without breaking a11y (contrast ≥ threshold, touch targets).
4. **audit-report** — assert report structure, P0-P3 severity, actionability, no invented claims.
5. **a11y-fix** — assert WCAG-conformant changes, verified in real files.

### Adapt: `SkillOpt` (microsoft) — phase 2, for optimization, not measurement
- Its research engine trains the skill doc itself (rollout → reflect → gate, accept only on strict held-out improvement). Custom benchmark ≈ 200 lines (`SplitDataLoader` + scored rollout + `EnvAdapter`).
- **The original synthesis this plan exploits:** SkillOpt's scoring contract is `hard` (0-1) + `soft` (0-1) per rollout. For a design skill: **hard = your detector rules + a11y checks (deterministic), soft = LLM-judge rubric on aesthetics.** "Noisy scoring kills the optimizer" — so the *hard* deterministic signal carries the optimization, the soft judge signal only ranks aesthetic near-ties. This is the gap neither framework alone closes: agent-skills-eval measures, SkillOpt optimizes, your detector de-noises.
- SkillOpt-Sleep (harvest → mine → replay → consolidate → gate over Claude Code/Codex transcripts) is the eventual "nightly self-evolution" loop once the skill is in real use. Preview-grade; don't build on it yet.
- SkillOpt's **300–2,000-token artifact finding is adopted now as a sizing constraint** (§3), independent of whether you ever run its trainer.

Reject nothing outright; SkillOpt is adapted later, agent-skills-eval adopted now. Both are MIT/Apache.

---

## 3. The v2 design

### Principles (each maps to a diagnosed failure)
1. **Small interface, deep module** (this repo's own doctrine, applied to itself). Core SKILL.md ≤ 3KB. Command surface: **5 commands**. Reference files ≤ 2KB each. Target total load path ≈ 12-15KB. (Fixes 1.1, 1.5)
2. **Positive direction over prohibition.** Teach **10 tells**, each as: what it looks like → why it reads machine-made → *what to do instead*. The Bans list shrinks to a 5-line "never, with the reason" appendix; the detector is the enforcement layer. (Fixes 1.2)
3. **Knowledge moves from prose to code.** Anything checkable becomes a detector rule (deterministic, unit-tested, registry-locked). Prose is reserved for what can't be checked: judgment, sequencing, taste. (Fixes 1.1, 1.5)
4. **Progressive disclosure.** Core routing in SKILL.md; one ≤2KB reference per command; the 93.8KB checklist catalog and scraped galleries become **eval fixtures / training data**, not prompt text. (Fixes 1.1)
5. **Measured or it didn't happen.** `evals/evals.json` ships in-repo; CI runs agent-skills-eval; a release must cite a measured lift or no regression. (Fixes 1.3)
6. **One taxonomy, machine-validated.** `command-metadata.json` is the single source of truth; a script generates the dispatcher map and validates it against `reference/*.md` + the test suite in CI. (Fixes 1.4, 1.6)
7. **No runtime we don't ship.** The browser-iteration subsystem and MCP wiring move out of the skill entirely. (Fixes 1.5)

### The 10 tells (draft, from CommandCode's ten + your detector + research/)
1. Tech gradient (blue-violet→magenta glossy energy) — *why*: distributional default, signals nothing about the product.
2. Generic tech hue (#6366F1 indigo "because software") — *instead*: pick hue with reason, OKLCH-first (keep this doctrine).
3. Feature-tile grid — three equal cards, equal weight — *instead*: asymmetry; hierarchy a human decided.
4. Accent rail — colored stripe as decoration posing as organization.
5. Unearned blur — glassmorphism as "modern" status signal, not legibility decision.
6. Stat monument — invented 10k+/99.9%/24/7 rows.
7. Icon topper — rounded-square icon tile above every heading.
8. Template hero — centered headline + 2-line sub + primary/ghost buttons + 100vh.
9. Default type stack — Inter everywhere, flat 14-18px hierarchy, 1.5 line-height, 700 on all headings; no editorial contrast.
10. Anti-reference echo — the aesthetic is *guessable from the banned list* (second-order slop). The fix is always: direction contract first (modes + register + one-sentence physical scene), then build.

### Target tree
```
design-skill/
├── SKILL.md                 ≤3KB — identity, 10 tells, routing (5 commands)
├── evals/evals.json         scorecard (agent-skills-eval)
├── agent-skills-eval.yaml   harness config
├── scripts/
│   ├── detect.mjs           10 tells → deterministic rules (port best of the 42)
│   ├── design.mjs           dispatcher (generated from command-metadata.json)
│   ├── lint-docs.mjs        keep
│   └── *_test.mjs           rules lock + fixtures (keep slop.html/new-slop.html)
├── reference/               5-8 files × ≤2KB (modes, craft-floor, audit, deslop, …)
└── command-metadata.json    single source of truth
```

### The 5 commands
`detect` (slop scan) · `audit` (evaluate, scored report) · `deslop` (kill slop, positive fixes) · `shape` (interview → brief) · `craft` (brief → build). Everything else is either a flag, folded into these, or deleted. `live`/`pin`/`teach`/`document`/`extract`/`distill`/`bolder`/`quieter`/… leave the skill.

### Deletions / extractions (each is a separate PR-sized step, reversible)
1. **Live subsystem**: `live*.mjs` (13 files), `modern-screenshot.umd.js`, `reference/live.md`, browser-use MCP pointers → becomes its own repo/product.
2. **Redundant references**: deslop↔smell merge; audit/checkup/review/critique/polish → one audit; doctor.md delete; doctrine↔modes merge.
3. **Scraped/research**: move to a `datasets/` repo or eval fixtures; `checklist-catalog.md` → fixture.
4. **Stale taxonomy**: regenerate command-metadata.json; delete `teach`; wire the 5 commands; pin.mjs → feature of the harness, not the skill.
5. **Read-command mutation**: `load-context.mjs` stops renaming files.
6. **`.agents/`, `.claude/`, `skills-lock.json`** (496KB from the mattpocock install, untracked): add to `.gitignore` — dev-machine artifacts, not package content.

### Roadmap
- **Phase 0 — Baseline (this week).** Add `evals/evals.json` + config against the *current* skill; run with/without baseline; publish iteration-1 scorecard. This is the "before" number.
- **Phase 1 — Core rewrite.** New SKILL.md (≤3KB, 10 tells, 5 commands); port detector rules; delete/rebase references.
- **Phase 2 — Extraction.** Live subsystem + datasets out; taxonomy regenerated; CI extended (command-catalog validation, evals gate).
- **Phase 3 — Optimize (optional).** SkillOpt custom benchmark using detector-as-hard + judge-as-soft; or SkillOpt-Sleep over real sessions.
- **Phase 4 — Ship v2.** Compare against Phase 0 baseline; version bump justified by the scorecard diff.

### Acceptance criteria for v2
- Setup load ≤ 15KB of prompt text (from 52KB+).
- 5 commands, one validated taxonomy, dispatcher generated.
- `evals/` runs green in CI with `--baseline`; measured lift vs Phase 0 (target: ≥ +15% judge pass-rate on slop-kill + build evals).
- Detector: 10 rule groups, registry-locked, fixtures green.
- Zero runtime deps beyond Node; zero MCP/server requirements.
- All 21 existing tests still pass or are ported.
