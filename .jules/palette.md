## 2024-01-01 - Canvas Accessibility & Test Stability
**Learning:** Canvas elements in game interfaces are completely invisible to screen readers without `role="img"` and a descriptive `aria-label`. Also, when testing React components that access DOM measurements (like `getBoundingClientRect`), strictly guarding against null/undefined returns is crucial for test stability in JSDOM environments, even if the element exists.
**Action:** Always add ARIA roles/labels to canvas elements and defensive checks for DOM rects in `useEffect` logic.

## 2024-05-22 - Styled Key Components for Instructions
**Learning:** Using semantic `<kbd>` tags styled as visual keys significantly improves the scannability of game control instructions compared to plain text strings like "W / Up".
**Action:** Replace plain text key bindings with a reusable `<Key>` component in all instruction or help modals.
