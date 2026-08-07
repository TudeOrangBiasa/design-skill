Run systematic **technical** quality checks and generate a comprehensive report. Don't fix issues; document them for other commands to address.

This is a code-level audit, not a design critique. Check what's measurable and verifiable in the implementation.

## Browser Requirement

This audit opens the page in a real browser (harness browser tool or browser-use MCP server, see SKILL.md Tooling for install commands). The coordinate pipeline and screenshots run through a JS/screenshot-capable surface (the harness browser tool); the browser-use MCP action server (harness `browser-use==0.1.40`) covers navigation, inspection, and interaction only. When no JS-capable surface exists, mark coordinate findings `[UNVERIFIED_COORDS]`. If no browser surface at all is available, stop and point the user to the install commands; never audit layout from raw HTML alone. For each viewport in the universal set (375/640/768/1024/1280/1536, locked), apply the reconciliation pipeline from [browser-layout.md](browser-layout.md) §5.

## Diagnostic Scan

Run comprehensive checks across 6 dimensions. Score each dimension 0-4 using the criteria below.

### 1. Accessibility (A11y)

**Check for**:
- **Contrast issues**: Text contrast ratios < 4.5:1 (or 7:1 for AAA)
- **Missing ARIA**: Interactive elements without proper roles, labels, or states
- **Keyboard navigation**: Missing focus indicators, illogical tab order, keyboard traps
- **Semantic HTML**: Improper heading hierarchy, missing landmarks, divs instead of buttons
- **Alt text**: Missing or poor image descriptions
- **Form issues**: Inputs without labels, poor error messaging, missing required indicators

**Score 0-4**: 0=Inaccessible (fails WCAG A), 1=Major gaps (few ARIA labels, no keyboard nav), 2=Partial (some a11y effort, significant gaps), 3=Good (WCAG AA mostly met, minor gaps), 4=Excellent (WCAG AA fully met, approaches AAA)

### 2. Performance

**Check for**:
- **Layout thrashing**: Reading/writing layout properties in loops
- **Expensive animations**: Casual layout-property animation, unbounded blur/filter/shadow effects, or effects that visibly drop frames
- **Missing optimization**: Images without lazy loading, unoptimized assets, missing will-change
- **Bundle size**: Unnecessary imports, unused dependencies
- **Render performance**: Unnecessary re-renders, missing memoization

**Score 0-4**: 0=Severe issues (layout thrash, unoptimized everything), 1=Major problems (no lazy loading, expensive animations), 2=Partial (some optimization, gaps remain), 3=Good (mostly optimized, minor improvements possible), 4=Excellent (fast, lean, well-optimized)

### 3. Theming

**Check for**:
- **Hard-coded colors**: Colors not using design tokens
- **Broken dark mode**: Missing dark mode variants, poor contrast in dark theme
- **Inconsistent tokens**: Using wrong tokens, mixing token types
- **Theme switching issues**: Values that don't update on theme change

**Score 0-4**: 0=No theming (hard-coded everything), 1=Minimal tokens (mostly hard-coded), 2=Partial (tokens exist but inconsistently used), 3=Good (tokens used, minor hard-coded values), 4=Excellent (full token system, dark mode works perfectly)

### 4. Responsive Design

**Check for**:
- **Fixed widths**: Hard-coded widths that break on mobile
- **Touch targets**: Interactive elements < 44x44px
- **Horizontal scroll**: Content overflow on narrow viewports
- **Text scaling**: Layouts that break when text size increases
- **Missing breakpoints**: No mobile/tablet variants

**Score 0-4**: 0=Desktop-only (breaks on mobile), 1=Major issues (some breakpoints, many failures), 2=Partial (works on mobile, rough edges), 3=Good (responsive, minor touch target or overflow issues), 4=Excellent (fluid, all viewports, proper touch targets)

### 5. Anti-Patterns (CRITICAL)

Check against ALL the **DON'T** guidelines from the parent design skill (already loaded in this context). Look for AI slop tells (AI color palette, gradient text, glassmorphism, hero metrics, card grids, bounce easing, neon-on-black, generic fonts, repeated identical cards) and general design anti-patterns (gray on color, nested cards, bounce easing, redundant copy).

**Score 0-4**: 0=AI slop gallery (5+ tells), 1=Heavy AI aesthetic (3-4 tells), 2=Some tells (1-2 noticeable), 3=Mostly clean (subtle issues only), 4=No AI tells (distinctive, intentional design)

### 6. Layout Integrity (Browser-Verified)

Verified in the browser at every locked viewport (375/640/768/1024/1280/1536). Check for:
- **Hidden collapse**: containers with text whose computed height or width is 0px, or `display: none`, `visibility: hidden`, `opacity: 0`, `max-height: 0` ([LAYOUT_BUG: HIDDEN_COLLAPSE])
- **Overlapping text**: distinct non-parent/child elements with visible text sharing overlapping X/Y space ([LAYOUT_BUG: OVERLAPPING_TEXT])
- **Coordinate drift**: element X/Y/W/H changing unexpectedly after interactions or viewport changes
- **Breakpoint compliance**: elements break, text overflows, or columns fail to stack at any of the six widths

Score 0-4: 0=Collapsed or overlapping content across multiple breakpoints, 1=Major collapse/overlap bugs at common viewports, 2=Isolated layout bugs (one overlap or collapse), 3=Solid, minor coordinate drift only, 4=Verified at all six breakpoints, zero collapse or overlap

## Generate Report

### Audit Health Score

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | ? | [most critical a11y issue or "--"] |
| 2 | Performance | ? | |
| 3 | Responsive Design | ? | |
| 4 | Theming | ? | |
| 5 | Anti-Patterns | ? | |
| 6 | Layout Integrity | ? | |
| **Total** | | **??/24** | **[Rating band]** |

**Rating bands**: 22-24 Excellent (minor polish), 17-21 Good (address weak dimensions), 13-16 Acceptable (significant work needed), 8-12 Poor (major overhaul), 0-7 Critical (fundamental issues)

### Anti-Patterns Verdict
**Start here.** Pass/fail: Does this look AI-generated? List specific tells. Be brutally honest.

### Executive Summary
- Audit Health Score: **??/20** ([rating band])
- Total issues found (count by severity: P0/P1/P2/P3)
- Top 3-5 critical issues
- Recommended next steps

### Detailed Findings by Severity

Tag every issue with **P0-P3 severity**:
- **P0 Blocking**: Prevents task completion. Fix immediately
- **P1 Major**: Significant difficulty or WCAG AA violation. Fix before release
- **P2 Minor**: Annoyance, workaround exists. Fix in next pass
- **P3 Polish**: Nice-to-fix, no real user impact. Fix if time permits

For each issue, document:
- **[P?] Issue name**
- **Location**: Component, file, line
- **Category**: Accessibility / Performance / Theming / Responsive / Layout / Anti-Pattern
- **Impact**: How it affects users
- **WCAG/Standard**: Which standard it violates (if applicable)
- **Recommendation**: How to fix it
- **Suggested command**: Which command to use (prefer: {{available_commands}})

### Patterns & Systemic Issues

Identify recurring problems that indicate systemic gaps rather than one-off mistakes:
- "Hard-coded colors appear in 15+ components, should use design tokens"
- "Touch targets consistently too small (<44px) throughout mobile experience"

### Positive Findings

Note what's working well: good practices to maintain and replicate.

### Complex Single-Page Audits

For a complex single-page design (dense dashboard, landing page, app shell), run the full reconciliation pipeline from [browser-layout.md](browser-layout.md) §5 before and after each fix round: snapshot the coordinate map, apply the change, re-run, report the delta. The report must end with an ambition statement: what the layout should become, so follow-up commands (`refine`, `deslop`, `systems --layout`) target the direction, not the checklist.

Dashboard and monitoring surfaces audit against [dashboards.md](dashboards.md): the decision trace, the scan path, the density and chart rules, and the states pass. A dashboard that passes the mechanical checks but buries its primary decision still fails.

## Recommended Actions

List recommended commands in priority order (P0 first, then P1, then P2):

1. **[P?] `{{command_prefix}}command-name`**: Brief description (specific context from audit findings)
2. **[P?] `{{command_prefix}}command-name`**: Brief description (specific context)

**Rules**: Only recommend commands from: {{available_commands}}. Map findings to the most appropriate command. End with `{{command_prefix}}design polish` as the final step if any fixes were recommended.

After presenting the summary, tell the user:

> You can ask me to run these one at a time, all at once, or in any order you prefer.
>
> Re-run `{{command_prefix}}design audit` after fixes to see your score improve.

**IMPORTANT**: Be thorough but actionable. Too many P3 issues creates noise. Focus on what actually matters.

**NEVER**:
- Report issues without explaining impact (why does this matter?)
- Provide generic recommendations (be specific and actionable)
- Skip positive findings (celebrate what works)
- Forget to prioritize (everything can't be P0)
- Report false positives without verification

