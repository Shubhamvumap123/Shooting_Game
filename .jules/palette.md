## 2024-01-01 - Canvas Accessibility & Test Stability
**Learning:** Canvas elements in game interfaces are completely invisible to screen readers without `role="img"` and a descriptive `aria-label`. Also, when testing React components that access DOM measurements (like `getBoundingClientRect`), strictly guarding against null/undefined returns is crucial for test stability in JSDOM environments, even if the element exists.
**Action:** Always add ARIA roles/labels to canvas elements and defensive checks for DOM rects in `useEffect` logic.

## 2024-05-22 - Visual Keyboard Instructions
**Learning:** Replacing plain text key instructions (e.g., "W / Up") with visual keyboard-style components (using `<kbd>` styling) significantly improves scannability and instructional clarity in modal interfaces.
**Action:** Use a reusable `<Key>` component with standard styling (`border-b`, `rounded`, `mono` font) for all keyboard shortcuts in UI overlays.
