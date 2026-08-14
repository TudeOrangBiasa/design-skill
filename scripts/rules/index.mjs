/**
 * Rule registry aggregation for the deterministic design-smell detector.
 * Category order is the canonical finding order (Layout, Typography, Color,
 * Copy, Motion, Quality, Components, Imagery) - matches the pre-split array.
 */
import { RULES as layout } from './layout.mjs';
import { RULES as typography } from './typography.mjs';
import { RULES as color } from './color.mjs';
import { RULES as copy } from './copy.mjs';
import { RULES as motion } from './motion.mjs';
import { RULES as quality } from './quality.mjs';
import { RULES as components } from './components.mjs';
import { RULES as imagery } from './imagery.mjs';

export const RULES = [...layout, ...typography, ...color, ...copy, ...motion, ...quality, ...components, ...imagery];
