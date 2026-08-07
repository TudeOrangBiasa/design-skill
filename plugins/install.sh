#!/usr/bin/env bash
# design-skill installer plugin.
#
# Installs this skill for one agent from the current checkout. Every agent
# except omp goes through the skills.sh CLI, which knows the per-agent
# install paths. omp reads ~/.agents/skills/ and has no skills.sh entry,
# so it gets a symlink instead.
#
# Usage:
#   bash plugins/install.sh <agent>
#
# Agents:
#   pi, opencode, claude-code, codex, cursor, gemini-cli
#   universal   (agents that read .agents/skills/; global install)
#   omp         (symlink into ~/.agents/skills/)
#   project     (records skills-lock.json; the repo is the skill)

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
AGENT="${1:-}"

case "${AGENT}" in
  pi|opencode|claude-code|codex|cursor|gemini-cli|universal)
    npx --yes skills@1.5.22 add "${REPO_ROOT}" -a "${AGENT}" -g -y
    ;;
  omp)
    mkdir -p "${HOME}/.agents/skills"
    ln -sfn "${REPO_ROOT}" "${HOME}/.agents/skills/design-skill"
    echo "design-skill -> ${HOME}/.agents/skills/design-skill"
    ;;
  project)
    # Local source: the repo IS the skill, so the CLI records a
    # skills-lock.json at the repo root instead of copying files.
    npx --yes skills@1.5.22 add "${REPO_ROOT}" -a universal -y
    ;;
  *)
    echo "Usage: bash plugins/install.sh <agent>" >&2
    echo "Agents: pi, omp, opencode, claude-code, codex, cursor, gemini-cli, universal, project" >&2
    exit 2
    ;;
esac
