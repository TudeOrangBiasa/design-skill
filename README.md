# Design Skill v2

Unified frontend design skill merging impeccable routing + CommandCode tools + Emil motion philosophy.

## Installation

### Via opencode-workflow (recommended)

This repo is symlinked from `opencode-workflow/skills/engineering/design-skill/`. Install via:

```bash
cd ~/Workspace/personal/agents/opencode-workflow
ln -sfn ~/Workspace/personal/agents/design-skill skills/engineering/design-skill
bash scripts/link-skills.sh
```

Then add to `~/.config/opencode/opencode.json`:

```json
"/home/todayz/.config/opencode/skills/engineering/design-skill"
```

### Standalone

Symlink to any OpenCode skills path:

```bash
ln -sfn /path/to/design-skill ~/.config/opencode/skills/misc/design
```

## Usage

See [SKILL.md](SKILL.md) for routing and commands. Basic flow:

- `/design audit` — evaluate existing UI
- `/design refine` — change character (bolder, quieter, deslop)
- `/design systems` — design systems (color, type, layout, motion)
- `/design build` — create from scratch
- `/design fix` — repair (accessibility, performance, copy)

## Sources

- [pbakaus/impeccable](https://github.com/pbakaus/impeccable) — routing layer, 22 commands, bans
- [Emil Kowalski's design engineering](https://animations.dev/) — motion philosophy, animation framework
- CommandCode design — 19 tools, report workflow, philosophy docs

## Dependencies

- Node.js for `scripts/` (context loading, pin/unpin, live browser)
- Optional: design audit reports generated as `.html` (no browser dependency)
