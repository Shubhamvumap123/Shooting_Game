## 2024-01-01 - Canvas Accessibility & Test Stability
**Learning:** Canvas elements in game interfaces are completely invisible to screen readers without `role="img"` and a descriptive `aria-label`. Also, when testing React components that access DOM measurements (like `getBoundingClientRect`), strictly guarding against null/undefined returns is crucial for test stability in JSDOM environments, even if the element exists.
**Action:** Always add ARIA roles/labels to canvas elements and defensive checks for DOM rects in `useEffect` logic.

## 2024-05-22 - Game Instructions & Motion Sensitivity
**Learning:** Text-based key instructions (e.g., "W / Up") are harder to scan than visual key representations. Also, `animate-bounce` on victory modals can trigger motion sickness and must be wrapped in `motion-safe:` to respect user preferences.
**Action:** Use a `<Key>` component for all keyboard instructions and always prefix high-motion Tailwind animations with `motion-safe:`.
