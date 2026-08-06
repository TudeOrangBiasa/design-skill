# Contributing

Thanks for contributing to the design skill. This file covers how to run the checks, what the conventions are, and how to add a command or a script.

## Repository layout

- `SKILL.md`: the entry point. Routing table, bans, invocation model.
- `reference/`: doctrine. One file per command plus shared playbooks (modes, brand, product, hero, landing pages, craft floor).
- `scripts/`: deterministic Node CLIs, no npm dependencies.
- `scripts/command-metadata.json`: command catalog that drives `{{available_commands}}`.
- `plugins/install.sh`: per-agent installer.
- `agents/`: optional companion agents.

## Checks

Run before submitting anything:

```bash
npm test                          # 16 tests, node --test
npm run lint:docs                 # em dashes, banned AI-prose phrases, broken links
node scripts/design.mjs --help    # dispatcher works
```

CI runs the same three checks plus a SkillSpector security scan. There is nothing to install: the skill has zero npm dependencies and needs only Node >= 18.

## Prose conventions

The doc lint is a hard gate. Follow the anti-AI prose rules in REFERENCE.md:

- No em dashes. Use a comma, a colon, or a new sentence.
- No banned phrases from the anti-AI list. Read the full list in REFERENCE.md before writing.
- No exclamation points. Sentence case everywhere.
- Every internal markdown link target must exist. The lint checks this.

Single source of truth: when a rule belongs in one place, link to it, do not copy it. `reference/browser-layout.md` is the model: layout.md and responsive.md link to its sections instead of restating them. New normative lists get the same treatment.

## Adding a command

A command touches five places. Do all five in one change:

1. `scripts/command-metadata.json`: add the entry with a description and argument hint.
2. `SKILL.md`: add a row to the routing table and, when the command ships CLI automation, a line in the Tooling section.
3. `reference/<command>.md`: the command playbook. Link to shared doctrine instead of restating it.
4. `scripts/design.mjs`: add the subcommand to the dispatcher map.
5. A test, when the command has deterministic behavior (detector, parser, concept-seed are the existing test targets).

## Adding a script

- Node builtins only. Do not add npm dependencies; portability is the point.
- Expose `--help`, JSON output where the result is data, and the exit code convention: 0 success, 1 findings or errors found, 2 usage error.
- Place it under `scripts/`, then wire it into the `scripts/design.mjs` dispatcher map.
- Keep it small. A script that needs its own subsystem deserves a review first.

## Vendored code

The one vendored bundle is `scripts/modern-screenshot.umd.js` (MIT, pinned at 4.7.0, attributed in NOTICE.md). If you replace or upgrade it, update the header comment and NOTICE.md in the same change.

## Security

CI runs SkillSpector (`skillspector scan . --no-llm --baseline .skillspector-baseline.yaml`), which flags prompt injection, exfiltration, and supply-chain patterns. When a scan surfaces a finding:

- Fix it when it is real (pin unpinned install commands, declare capabilities).
- Suppress false positives via the baseline file. Regenerate it with `skillspector baseline . --no-llm -o .skillspector-baseline.yaml`, then edit the reason fields so each suppression is self-documenting. Keep the baseline in sync with the pinned SkillSpector version in CI.

## Pull requests

- One behavior per PR.
- Run the checks above first.
- Add a CHANGELOG.md entry and bump the version in package.json (patch for a behavior change).
- Keep the diff small. Large additions get a plan first.
