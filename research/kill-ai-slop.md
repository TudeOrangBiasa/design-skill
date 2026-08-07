# Kill AI Slop — learned and mapped to the design skill

Status: research notes, 2026-08-06. Source: https://killaislop.com/ (fetched live; field guide in 4 languages; 35 tells with before/after HTML pairs + code signals, plus 6 principles). Purpose: audit which tells the skill's 26-rule detector already catches, which it misses, and which become new detector rules and doctrine. Outside the linted corpus.

The site also ships its own Agent Skill ("kill-ai-slop") that scans a project, flags each tell from this catalogue, explains why, and applies clean fixes in an approved scope: detect / explain / fix. Same architecture as this skill (detector + doctrine + fix flows); worth cross-referencing if it is public on GitHub.

## The 35 tells, grouped

### Color (6)
1. Indigo→violet gradient (#6366f1→#a855f7) on buttons, glows, heroes.
2. Gradient headline text (bg-clip-text / background-clip: text).
3. Warm "cozy" palette: amber/stone/orange wash on soft beige.
4. Default semantic palette: info blue / tip amber / success green / error red, always framework -50 bg + -600 text together.
5. Mono-hue status box: border, text, and bg all one hue; bg is a see-through version of the same hue (red on red, etc.).
6. Gradients as atmosphere: near-black navy page with top spotlight glow; card surfaces are themselves gradients (each card washed in a tint of its own accent); repeating-linear-gradient stripes; colored box-shadow glows in dark mode.

### Type (7)
7. Serif-italic on one word inside a sans headline (font-swap "emphasis"; "the most viral AI headline tic right now").
8. Serif where sans belongs: Playfair/Lora/Cormorant display serif on a dev tool or SaaS, as body or oversized italic-serif hero ("a tuxedo on a terminal").
9. Decorative strikes and highlights: line-through on non-deleted text, underline as fake emphasis, highlighter abuse.
10. The kicker above every heading (text-xs uppercase tracking-widest; the same eyebrow on every section; the label restates the heading).
11. Full-sentence display headline: text-5xl/7xl font-extrabold tracking-tight wrapping 3+ lines, eating the viewport.
12. Flat type hierarchy: everything crammed 14-18px; hierarchy carried by gray shades; scale steps under 1.25x.
13. Highlighted keywords mid-copy: scattered spans of text-primary / marks / semibold in prose.

### Copy (3)
14. AI copywriting voice: "not just X it's Y", "say goodbye to X", three-word triads, em-dash habit, dismissing things as "X theater".
15. Emoji everywhere: an emoji on every heading, button, bullet (rocket, zap, lock, party).
16. (status dot is under components)

### Components (10)
16. Glowing status dot: solid dot + pale halo, usually pulsing, almost always saturated green; or glued into a hero pill with no state behind it (animate-ping / box-shadow glow).
17. Rounded card + colored left border (border-l-4 rounded-lg bg-*-50) on every list item; docs admonition styling applied to plain lists.
18. Rounded-square icon tiles: grid of rounded-xl bg-*-100 icon chips (icon + h3 + one line x6); icons unrelated to content.
19. Max radius + glassmorphism: rounded-full on cards, backdrop-blur bg-white/10 border-white/20; radius mixed 4/12/24/9999px.
20. Oversized drop shadow: box-shadow blur >= 40px on a small element (0 30px 80px, 0 40px 120px), bigger than the thing casting it; "atmosphere standing in for elevation".
21. Corners that don't nest: inner radius should equal outer radius minus the gap; AI stamps one radius token on everything so nested corners never line up.
22. The border that dies at the corner: radius on the wrapper (rounded-xl overflow-hidden) + border on the child; the square stroke ring gets clipped at the corners; "right line by line, wrong as a whole".
23. Badge and pill spam: "New", "Beta", "Hot" decorative pills everywhere (rounded-full bg-*-100 text-*-700; emoji + label).
24. AI-drawn SVG icons: blob mascots, primitive shapes + dot eyes as a logo, generic cartoon creatures; placeholder art that never got replaced.
25. Icon in a tint of itself: bg-{color}/10 behind text-{color} icon in a rounded square; every glyph wrapped in a soft colored square.
26. Springy hover: hover:scale-105 + transition-all on every card/button/image; bounce easing on UI chrome.
27. Wobbling spinner: rotation not around its own centre; transform-origin off centre, or a rotate keyframe clobbering translate(-50%,-50%); "an absence of looking".

### Layout (5)
28. All-caps card grid: UPPERCASE label + number/icon copied into rows of interchangeable cards; "fakes structure while stuffing unrelated things into identical boxes".
29. Invented stat row: 10k+ developers / 99.9% uptime / 24/7 support; "real numbers are odd and specific; these are what credibility looks like from a distance. One invented figure poisons every true one beside it."
30. Numbered section markers: giant faint 01/02/03 ordinals beside unordered feature sections ("numbering is a claim").
31. Cards inside cards: 3+ nested rounded/bordered boxes.
32. One gap everywhere: gap-4/p-4/space-y-4 stamped across the page; heading-to-body distance equals section-to-section distance.

### Evolved slop (the new default, 2026) (3)
33. Inter everywhere: Space Grotesk display + Inter body, or Geist/Manrope/Plus Jakarta Sans; "a typeface is the loudest single signal of who made this".
34. The "tasteful terminal": mono everywhere as UI chrome, near-black background, one warm accent, ASCII-art hero; "an AI that read one Vercel blog post"; not ugly, which is the trap.
35. The editorial dashboard: operational UI dressed as a magazine - giant serif "Good evening" greeting, serif/oldstyle numerals in stat cards, cream paper, tracked-caps kicker over every block; "a console is scanned all day; a magazine is read once".

## The six principles

1. Decide before you decorate: every visual choice must be explainable; if not, it is someone else's default.
2. One accent, one voice: a single accent color, sparingly; one person talking.
3. Hierarchy from scale and space: rank with size, weight, spacing; coloring words or swapping fonts is the lazy shortcut.
4. Subtract first: slop is what piles up; remove until everything left has to be there.
5. Specific beats loud: real numbers, nouns, consequences; "40% faster" beats "blazing fast".
6. Decoration must mean something: icons, badges, callouts are signals; spread everywhere, they signal nothing.

## Coverage audit vs the skill's 26 detector rules

Already covered by a rule:
- #1 indigo-violet gradient -> ai-palette (purple + cyan)
- #2 gradient text -> gradient-text
- #3 warm cozy -> cream-palette (beige background; amber/orange wash not detected)
- #7 serif-italic -> italic-serif-display (h1 serif + italic; the one-word swap inside a sans headline is a narrower pattern, partially caught)
- #10 kicker -> eyebrow-above-h1 (p-before-h1; the uppercase tracking-widest label on every section is the same pattern)
- #11 full-sentence headline -> oversized-h1 (long h1 + display size)
- #14 copy voice -> aphoristic-cadence (partial: "Not a X. A Y." and "No/Just" lines; "say goodbye to X" and triads not covered), em-dash-saturation, marketing-buzzword
- #15 emoji -> emoji-icon
- #16 status dot -> pulsing-dot (pulse; halo/glow variant not detected)
- #17 left border -> side-tab-border (border-left 2-9px)
- #18 icon tiles -> icon-tile-stack (svg/img before heading; the tinted chip grid is adjacent but not the same)
- #19 max radius -> over-rounding (>= 32px); glassmorphism is in the bans list but has no detector rule
- #20 oversized shadow -> dark-glow (zero-offset chromatic shadows; the big-blur fog is a different signature)
- #26 springy hover -> bounce-easing (overshooting cubic-bezier; hover:scale-105 transition-all is a different signature)
- #30 numbered sections -> in the bans list (Numbered section markers) but no detector rule
- #31 nested cards -> nested-cards
- #32 one gap -> monotonous spacing (model-only tell in smell.md, no rule)
- #33 Inter -> overused-font (Inter, Roboto, Fraunces, Geist, Plus Jakarta Sans, Space Grotesk; matches the evolved-slop list almost exactly)

Not covered by any rule (new candidates, mechanically checkable):
- #4 default semantic palette (framework -50/-600 semantic set together)
- #5 mono-hue alert (same hue at three opacities: border-{c} text-{c} bg-{c}/10)
- #6 atmosphere gradients (radial page bg, linear-gradient card fills, repeating stripes, colored shadow glows)
- #8 serif on dev tool/SaaS (Playfair/Lora/Cormorant on UI; extends overused-font)
- #9 decorative strikes (<s>/<mark>/<u> outside their jobs; text-decoration line-through on non-deleted text)
- #12 flat type hierarchy (all sizes within a small px band; extends flat-hierarchy tell)
- #13 highlighted keywords (mid-sentence colored/bold spans)
- #19 glassmorphism (backdrop-blur on nav/modals/overlays)
- #21 nested radius (same radius token on nested containers)
- #22 broken corner border (radius on wrapper, border on child)
- #23 badge spam (rounded-full pills with emoji labels)
- #25 tinted icon tile (bg-{color}/10 behind same-hue icon)
- #26b springy hover signature (hover:scale-105, transition-all on cards)
- #27 wobbling spinner (transform-origin / rotate+translate clobber)
- #28 all-caps card grid (UPPERCASE label + number x6; extends icon-tile-stack)
- #29 invented stat row (10k+/99.9%/24/7 patterns)
- #34 tasteful terminal (mono font on UI chrome, near-black + single accent, ASCII art)
- #35 editorial dashboard (serif on dashboard, cream + serif + kicker combo)

## Proposed integration into the skill

1. New doctrine reference `reference/anti-slop-catalogue.md` (or fold into smell.md): the 35 tells with the site's own "why" (decoration that carries no information) and "fix" (specific beats loud, subtract first) framing, plus the six principles as named doctrine. The evolved-slop trio (33-35) is 2026-fresh material the skill does not have at all.
2. Detector rules: implement the mechanically checkable subset, roughly 14-16 new rules from the "not covered" list, priority order:
   - High value, easy CSS/HTML signals: default-semantic-palette (#4), mono-hue-alert (#5), glassmorphism-blur (#19b), badge-spam (#23), tinted-icon-tile (#25), springy-hover (#26b), invented-stat-row (#29), atmosphere-gradients (#6), serif-on-UI (#8).
   - Structure-level (HTML/DOM): nested-radius (#21), all-caps-card-grid (#28), tasteful-terminal (#34), editorial-dashboard (#35), decorative-strikes (#9).
   - Browser/audit layer: wobbling-spinner (#27), broken-corner-border (#22), flat-type-hierarchy (#12).
3. Bans list additions (SKILL.md): numbered-section-markers already banned; add decorative strike-through, badge spam, invented stat rows, tinted icon containers, springy scale hovers, glassmorphism already there.
4. The six principles map cleanly onto existing doctrine (decide-before-decorate = doctrine.md brief wins; one-accent = The One Voice Rule; hierarchy-from-scale = flat-hierarchy smell; subtract-first = component caps; specific-beats-loud = copy doctrine; decoration-means-something = "motion conveys state, not decoration"). The catalogue file should cite them as the skill's own principles so the tells are anchored to the why.
5. The kill-ai-slop skill itself: cross-reference its detect/explain/fix contract if public; the skill's detector.mjs + reference playbooks already implement the same contract.

## Verification

- 35 tells + 6 principles extracted from the live site (4-language edition), code signals quoted verbatim.
- Coverage audit is a first pass against detector.mjs RULES and smell.md; expect review to shift a few "not covered" items to partial.
- The evolved-slop section (33-35) is the material with the highest novelty for the skill: Inter/Space Grotesk pairing, tasteful terminal, editorial dashboard.
