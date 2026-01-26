## 2024-01-01 - Canvas Accessibility & Test Stability
**Learning:** Canvas elements in game interfaces are completely invisible to screen readers without `role="img"` and a descriptive `aria-label`. Also, when testing React components that access DOM measurements (like `getBoundingClientRect`), strictly guarding against null/undefined returns is crucial for test stability in JSDOM environments, even if the element exists.
**Action:** Always add ARIA roles/labels to canvas elements and defensive checks for DOM rects in `useEffect` logic.

## 2024-05-22 - Visual Polish for Key Bindings
**Learning:** Using the semantic `<kbd>` tag with CSS styling (borders, shadows) significantly improves the scanability of keyboard instructions in game guides, making them instantly recognizable as inputs compared to plain text.
**Action:** Use a reusable `Key` component wrapping `<kbd>` for all future keyboard shortcut documentation.
