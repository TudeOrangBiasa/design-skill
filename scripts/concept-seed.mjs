/**
 * concept-seed: the direction dice for new visual work.
 *
 * Anti-convergence mechanism for new-work.md: the model derives seven
 * directions, then this script picks which one gets built. The pick comes
 * from a seed outside the model's taste, so every run cannot land on the
 * category default.
 *
 * Usage:
 *   node scripts/concept-seed.mjs --directions "A|B|C|D|E|F|G" [--seed N]
 *   node scripts/concept-seed.mjs --file directions.txt [--seed N]
 *   node scripts/concept-seed.mjs --roll 7 [--seed N]     # index only
 *   node scripts/concept-seed.mjs --list --directions "A|B|C"
 *
 * Output (plain): the seed, the 1-based index, and the chosen direction.
 * --json: machine-readable. Exit 2 on usage errors.
 */

import fs from 'node:fs';
import crypto from 'node:crypto';

function hashSeed(seed) {
  let h = 2166136261;
  for (const c of String(seed)) {
    h ^= c.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function randomSeed() {
  return crypto.randomBytes(8).toString('hex');
}

function parseArgs() {
  const argv = process.argv.slice(2);
  const get = (flag) => {
    const i = argv.indexOf(flag);
    return i !== -1 && argv[i + 1] ? argv[i + 1] : null;
  };
  const has = (flag) => argv.includes(flag);
  const directionsArg = get('--directions');
  const fileArg = get('--file');
  const seedArg = get('--seed');
  const rollArg = get('--roll');
  return { directionsArg, fileArg, seedArg, rollArg, json: has('--json'), list: has('--list') };
}

function loadDirections({ directionsArg, fileArg, rollArg }) {
  if (directionsArg) return directionsArg.split('|').map((s) => s.trim()).filter(Boolean);
  if (fileArg) {
    const text = fs.readFileSync(fileArg, 'utf8');
    return text.split('\n').map((s) => s.trim()).filter(Boolean);
  }
  if (rollArg) {
    const n = parseInt(rollArg, 10);
    if (!Number.isFinite(n) || n < 2) throw new Error('--roll needs an integer >= 2');
    return Array.from({ length: n }, (_, i) => `direction ${i + 1}`);
  }
  throw new Error('need --directions "a|b|c", --file <path>, or --roll N');
}

function main() {
  const { json, list } = parseArgs();
  let directions;
  let seed;
  try {
    directions = loadDirections(parseArgs());
    seed = parseArgs().seedArg ?? randomSeed();
  } catch (e) {
    console.error(`concept-seed: ${e.message}`);
    process.exit(2);
  }

  if (list) {
    const out = { seed, count: directions.length, directions };
    console.log(json ? JSON.stringify(out, null, 2) : directions.map((d, i) => `${i + 1}. ${d}`).join('\n'));
    return;
  }

  const h = hashSeed(seed);
  const index = h % directions.length;
  const result = { seed, count: directions.length, index: index + 1, direction: directions[index] };

  if (json) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log(`seed: ${result.seed}`);
    console.log(`pick: ${result.index}/${result.count}`);
    console.log(`direction: ${result.direction}`);
  }
}

main();
