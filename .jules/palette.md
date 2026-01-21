## 2024-01-01 - Canvas Accessibility & Test Stability
**Learning:** Canvas elements in game interfaces are completely invisible to screen readers without `role="img"` and a descriptive `aria-label`. Also, when testing React components that access DOM measurements (like `getBoundingClientRect`), strictly guarding against null/undefined returns is crucial for test stability in JSDOM environments, even if the element exists.
**Action:** Always add ARIA roles/labels to canvas elements and defensive checks for DOM rects in `useEffect` logic.

## 2026-01-21 - Key Scannability in Game Instructions
**Learning:** Replacing text-based key instructions (e.g., "W / Up") with visually distinct `<Key>` components (resembling keyboard caps) significantly improves scannability for users. It helps them quickly parse controls without reading long lines of text.
**Action:** Use visual affordances like "keyboard cap" styling for all input instructions in future game interfaces.
