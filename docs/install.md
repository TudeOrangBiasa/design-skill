# Installation

One package, every harness. The installer is the [skills.sh CLI](https://github.com/vercel-labs/skills), pinned at `skills@1.5.22` (pinned for the security scan; upgrade deliberately). omp and other `.agents/skills` readers have no skills.sh entry and use a symlink.

## Per-agent matrix

| Agent | Global install command | Skill location |
|-------|----------------------|----------------|
| Pi | `npx skills@1.5.22 add TudeOrangBiasa/design-skill -a pi -g` | `~/.pi/skills/design-skill/SKILL.md` |
| OpenCode | `npx skills@1.5.22 add TudeOrangBiasa/design-skill -a opencode -g` | `~/.config/opencode/skill/design-skill/SKILL.md` (scanned as `{skill,skills}/**/SKILL.md`, source-verified) |
| Claude Code | `npx skills@1.5.22 add TudeOrangBiasa/design-skill -a claude-code -g` | `~/.claude/skills/design-skill/SKILL.md` |
| Codex | `npx skills@1.5.22 add TudeOrangBiasa/design-skill -a codex -g` | Codex skills root |
| Cursor | `npx skills@1.5.22 add TudeOrangBiasa/design-skill -a cursor -g` | Cursor skills root |
| Gemini CLI | `npx skills@1.5.22 add TudeOrangBiasa/design-skill -a gemini-cli -g` | Gemini CLI skills root |
| `.agents/skills` agents (omp, universal) | see omp below | `~/.agents/skills/design-skill/SKILL.md` |
| npm | `npm install agent-design-skill` | `node_modules/agent-design-skill/SKILL.md` |

Drop `-g` for a project-scope install into the agent's project skills path.

## omp (the `.agents/skills` layout)

omp discovers skills as `<skills-root>/<skill-name>/SKILL.md`, one level under a `skills/` root, via its agents provider (enabled by default, canonical user-level root `~/.agents/skills/`). From a local checkout, one symlink installs it and updates stay live:

```bash
# from the repo root
ln -sfn "$PWD" ~/.agents/skills/design-skill
```

or run `bash plugins/install.sh omp`. Nested paths like `skills/engineering/design-skill` are not discovered; keep the skill one level under the root. Restart the agent; a new session picks the skill up.

Provider precedence in omp (higher wins, first name wins): native `.omp` skills, omp-plugins, claude, claude-plugins, agents, codex, opencode, github, omp-managed. A same-named skill from a higher provider shadows this one, so check for name collisions before installing.

## The plugin script

From a local checkout, `bash plugins/install.sh <agent>` wraps the same commands and covers everything, including omp:

```bash
bash plugins/install.sh pi          # global Pi install
bash plugins/install.sh opencode    # global OpenCode install
bash plugins/install.sh claude-code # global Claude Code install
bash plugins/install.sh codex       # global Codex install
bash plugins/install.sh cursor      # global Cursor install
bash plugins/install.sh gemini-cli  # global Gemini CLI install
bash plugins/install.sh universal   # global .agents/skills install
bash plugins/install.sh omp         # symlink into ~/.agents/skills/
bash plugins/install.sh project     # records skills-lock.json (the repo is the skill)
```

`bash plugins/install.sh` with no agent prints the full list. The script uses `set -euo pipefail` and exits 2 on an unknown agent.

## npm

```bash
npm install agent-design-skill
```

Point your agent at `node_modules/agent-design-skill/SKILL.md`, or symlink it into the agent's skills directory. The published package ships SKILL.md, REFERENCE.md, GUIDE.md, `reference/`, `agents/`, `scripts/`, `plugins/`, NOTICE.md, and LICENSE. `research/` is not shipped.

## After install

Restart the agent, then say "This looks like AI made it" on an existing page or "Build me a landing page" for new work. The skill routes from plain words; no flags needed.
