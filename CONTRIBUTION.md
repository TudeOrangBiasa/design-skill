# Contributing

Thanks for contributing to the design skill. This file covers how to run the checks, what the conventions are, and how to add a command or a script.

## Repository layout

- `SKILL.md`: the entry point. 10 tells, invocation modes, the five commands.
- `reference/`: doctrine. One file per command (audit, deslop, shape, craft) plus shared playbooks (register, modes, craft floor).
- `scripts/`: deterministic Node CLIs, no npm dependencies.
- `scripts/command-metadata.json`: command catalog (single source of truth), machine-validated by `validate-catalog.mjs`.
- `scripts/validate-catalog.mjs`: asserts command metadata, the dispatcher, and the reference index agree.
- `plugins/install.sh`: per-agent installer.
- `evals/`: the agent-skills-eval suite and baseline scorecards.
- `datasets/`: scraped reference material (git clones only, never shipped).

## Checks

Run before submitting anything:

```bash
npm test                          # 21 tests, node --test
npm run lint:docs                 # em dashes, banned AI-prose phrases, broken links
npm run validate-catalog          # command catalog vs dispatcher vs reference index
node scripts/design.mjs --help    # dispatcher works
```

CI runs the same checks plus a SkillSpector security scan. There is nothing to install: the skill has zero npm dependencies and needs only Node >= 18.

## Prose conventions

The doc lint is a hard gate. Follow the anti-AI prose rules in REFERENCE.md:

- No em dashes. Use a comma, a colon, or a new sentence.
- No banned phrases from the anti-AI list. Read the full list in REFERENCE.md before writing.
- No exclamation points. Sentence case everywhere.
- Every internal markdown link target must exist. The lint checks this.

Single source of truth: when a rule belongs in one place, link to it, do not copy it. New normative lists get the same treatment.

## Size budget

The skill ships inside a model's context, so size is a contract:

- `SKILL.md` <= 4200 bytes (raised 3072 -> 3600 -> 3850 -> 4100 -> 4200 as goal doctrine landed: Build doctrine now carries layout, story, motion, numbers, modals, register-fit, icons, imagery, OKLCH palette generation, font, reference-hunt, invented-claims, category-reflex palette, audit evidence - ~1050 tokens, inside SkillOpt's 300-2000-token artifact envelope; v1 was 14.7KB).
- Each `reference/*.md` <= 4096 bytes; the `reference/` directory <= 27200 bytes total (checklist.md core added 2026-08-12).
- The 10-tell table + Build doctrine in SKILL.md are the teaching core. Reference files add depth; they never restate the table.

## Adding a command

A command touches five places. Do all five in one change:

1. `scripts/command-metadata.json`: add the entry (`type: "flow"|"script"`, flags, description, `reference: "<file>.md"`).
2. `SKILL.md`: add a row to the Commands section (and keep it within the size budget).
3. `reference/<command>.md`: the command playbook. Link to shared doctrine instead of restating it.
4. `scripts/design.mjs`: add a dispatcher tool when the command ships CLI automation.
5. A test, when the command has deterministic behavior (detector, parser, concept-seed are the existing test targets).

`npm run validate-catalog` must stay green.

## Adding a script

- Node builtins only. Do not add npm dependencies; portability is the point.
- Expose `--help`, JSON output where the result is data, and the exit code convention: 0 success, 1 findings or errors found, 2 usage error.
- Place it under `scripts/`, then wire it into the `scripts/design.mjs` dispatcher map.
- Keep it small. A script that needs its own subsystem deserves a review first.

## Evals

The skill is measured with `npm run eval` (agent-skills-eval, 12 evals, with_skill vs without_skill). Evals run on demand, never in CI. When you change doctrine that affects what the model outputs, re-run the suite and record the delta in `evals/BASELINE-v2.md`. See [evals/BASELINE-v1.md](evals/BASELINE-v1.md) for the backend contract (opencode zen free API by default, env-overridable).

## Security

CI runs SkillSpector (`skillspector scan . --no-llm --baseline .skillspector-baseline.yaml`), which flags prompt injection, exfiltration, and supply-chain patterns. When a scan surfaces a finding:

- Fix it when it is real (pin unpinned install commands, declare capabilities).
- Suppress false positives via the baseline file. Regenerate it with `skillspector baseline . --no-llm -o .skillspector-baseline.yaml`, then edit the reason fields so each suppression is self-documenting. Keep the baseline in sync with the pinned SkillSpector version in CI.

## Pull requests

- One behavior per PR.
- Run the checks above first.
- Add a CHANGELOG.md entry and bump the version in package.json (patch for a behavior change).
- Keep the diff small. Large additions get a plan first.
