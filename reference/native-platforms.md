# Native platform guidance

Platform conventions are not optional decoration; they are the affordances users already know. When the surface targets a native platform, apply its grammar. When the surface is adaptive or unknown, follow the Adaptive section.

## Android

- **Navigation:** top app bar, bottom navigation, FAB for the primary action on content screens. System back and predictive back; do not add in-app back buttons that fight the system gesture.
- **Touch:** 48dp minimum targets on an 8dp grid, 56dp for primary actions.
- **Type and scale:** Material type roles; layouts must not clip at 200% font scaling.
- **Insets:** status bar, navigation bar, cutouts, and gesture areas via system insets.
- **Theme:** dark mode follows the system; color roles from Material tokens.
- **Motion:** 150-250ms, Material standard and emphasized easing. No spring on static elements.

## iOS

- **Navigation:** navigation bar, tab bar, bottom sheets, context menus. Modals slide up, not scale.
- **Touch:** 44x44pt minimum targets.
- **Insets:** safe area and home indicator; landscape handling without amputating content.
- **Motion:** springs for sheets and drags, iOS-like drawer curve `cubic-bezier(0.32, 0.72, 0, 1)`, momentum for dismissal, haptics for confirmation.
- **Type and scale:** SF as the system face when the platform demands it; Dynamic Type scaling up to 310%.
- **Theme:** dark mode follows the system appearance.

## Adaptive (both or unknown)

- **Input mode:** `pointer: coarse` for touch sizing, `hover: hover` for hover affordances. Size and affordances follow the actual input, not the platform label.
- **Layout:** container queries, not page queries. Never amputate a feature for mobile; the platform changes the arrangement, not the capabilities.
- **Navigation:** platform-native patterns over web patterns: bottom navigation on touch, tabs and back on desktop.
- **Motion:** respect `prefers-reduced-motion`; springs stay for gestures, fades for preference changes.
