# Detect

## Sub-features

Layout, typography, color, copy, motion, quality, and imagery rules, with severity error, warning, or advisory.

## How to get to it (user POV)

`design detect <file|dir|url> [--json]`, or `/design detect` from the skill.

## Driving it with the CLI

`node scripts/design.mjs detect scripts/fixtures/slop.html --json`, then parse `summary` and `findings`.

## Gotchas

URL targets need network, so use the local fixtures to get a deterministic proof.
