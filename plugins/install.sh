#!/usr/bin/env bash
# design-skill installer plugin.
#
# Installs this skill for one agent. Every agent except omp goes through the
# skills.sh CLI (npx skills@1.5.22, Vercel's skills.sh), which knows the
# per-agent install paths. omp reads ~/.agents/skills/ and has no skills.sh
# entry, so it gets a symlink instead.
#
# Source: the GitHub repo, NEVER the local checkout path. skills.sh has no
# include-list for local paths: `skills add /path/to/design-skill` copies the
# whole working directory, including gitignored secrets (.eval-key.go.env)
# and dev dirs (.claude/, .agents/, eval-workspace/). A GitHub source clones
# tracked files only - key-free. Run plugins/prune-install.sh on each
# installed copy afterwards to strip the tracked dev artifacts.
#
# npx flags: --prefer-online avoids stale-cache ETARGET; the
# npm_config_min_release_age=0 prefix bypasses project .npmrc files that
# gate packages by release age (Hermes uses min-release-age=14, which
# rejects the freshly published skills CLI).
#
# Usage:
#   bash plugins/install.sh <agent>
#
# Agents:
#   pi, opencode, claude-code, codex, cursor, gemini-cli
#   universal   (agents that read .agents/skills/; global install)
#   omp         (symlink into ~/.agents/skills/)
#   project     (install into this repo's .agents/skills/)

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SKILL_SOURCE="TudeOrangBiasa/design-skill"
AGENT="${1:-}"

case "${AGENT}" in
  pi|opencode|claude-code|codex|cursor|gemini-cli|universal)
    npm_config_min_release_age=0 npx --yes --prefer-online skills@1.5.22 add "${SKILL_SOURCE}" -a "${AGENT}" -g -y
    ;;
  omp)
    mkdir -p "${HOME}/.agents/skills"
    ln -sfn "${REPO_ROOT}" "${HOME}/.agents/skills/design-skill"
    echo "design-skill -> ${HOME}/.agents/skills/design-skill"
    ;;
  project)
    npm_config_min_release_age=0 npx --yes --prefer-online skills@1.5.22 add "${SKILL_SOURCE}" -a universal -y
    ;;
  *)
    echo "Usage: bash plugins/install.sh <agent>" >&2
    echo "Agents: pi, omp, opencode, claude-code, codex, cursor, gemini-cli, universal, project" >&2
    exit 2
    ;;
esac
