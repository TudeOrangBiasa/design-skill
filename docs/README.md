# Documentation

The design skill is a large instrument: a router, a 42-rule detector, a doctrine library, a live variant mode, a DESIGN.md generator, and a 703-check checklist engine. This wiki maps it for humans. The agent-facing doctrine lives in [reference/](../reference/) and loads on demand; these pages explain the pieces and how they fit.

## Start here

| Page | What it covers |
|------|----------------|
| [install.md](install.md) | The per-agent installation matrix and the skills.sh contract |
| [architecture.md](architecture.md) | How the skill is built: the router, the two invocation modes, the doctrine library |
| [commands.md](commands.md) | The full `/design` command tables and the routing map |
| [detector.md](detector.md) | The 42 deterministic design-smell rules, how to run them, exit codes |
| [live-mode.md](live-mode.md) | Browser variant iteration and the durable session journal |
| [design-md.md](design-md.md) | The DESIGN.md visual-system spec and the document flow |
| [checklists.md](checklists.md) | The universal pre-ship pass and the 703-check catalog |

## Repo map

- `SKILL.md`: the entry point. Routing table, bans, invocation model, scope gate.
- `reference/`: the doctrine. One playbook per command plus shared doctrine (modes, brand, product, craft floor, dashboards, performance, smell, ui-checklist, catalog).
- `scripts/`: dependency-free Node CLIs, no npm dependencies. `design` is the single entry.
- `plugins/install.sh`: the per-agent installer.
- `agents/`: optional companion agents.
- `research/`: local research scratch space, not versioned and not shipped.

## The checks

Every change to the skill passes the same gates, run locally and in CI:

```bash
npm test                          # 21 tests, node --test
npm run lint:docs                 # em dashes, banned AI-prose phrases, broken links
node scripts/design.mjs --help    # dispatcher works
```

CI adds a SkillSpector security scan with a committed suppression baseline. Contribution rules: [CONTRIBUTION.md](../CONTRIBUTION.md). Release history: [CHANGELOG.md](../CHANGELOG.md).
