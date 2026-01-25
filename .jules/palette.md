## 2024-01-01 - Canvas Accessibility & Test Stability
**Learning:** Canvas elements in game interfaces are completely invisible to screen readers without `role="img"` and a descriptive `aria-label`. Also, when testing React components that access DOM measurements (like `getBoundingClientRect`), strictly guarding against null/undefined returns is crucial for test stability in JSDOM environments, even if the element exists.
**Action:** Always add ARIA roles/labels to canvas elements and defensive checks for DOM rects in `useEffect` logic.

## 2024-05-22 - Motion Sensitivity & Keyboard UI
**Learning:** Using `motion-safe:animate-bounce` ensures animations respect user preferences for reduced motion, preventing discomfort. Visualizing key bindings with a `<kbd>`-styled component (resembling physical keys) significantly improves scanability compared to plain text.
**Action:** Use `motion-safe:` prefixes for large animations and standard `<kbd>` styling for all keyboard instructions.
