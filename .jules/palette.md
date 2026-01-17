## 2024-01-01 - Canvas Accessibility & Test Stability
**Learning:** Canvas elements in game interfaces are completely invisible to screen readers without `role="img"` and a descriptive `aria-label`. Also, when testing React components that access DOM measurements (like `getBoundingClientRect`), strictly guarding against null/undefined returns is crucial for test stability in JSDOM environments, even if the element exists.
**Action:** Always add ARIA roles/labels to canvas elements and defensive checks for DOM rects in `useEffect` logic.

## 2024-05-22 - Visual Keyboard Hints
**Learning:** Replacing plain text key instructions (e.g., "W / Up") with visually distinct `<Key>` components (mimicking physical keys) significantly improves the scannability of control schemes for users, reducing cognitive load during the initial learning phase.
**Action:** Encapsulate key bindings in a reusable styled `Key` component for any interface with keyboard shortcuts.
