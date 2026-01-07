## 2024-04-20 - Game Loop Pausing with React Refs
**Learning:** In a `setInterval` game loop managed by React `useEffect`, standard state variables (like `isPaused`) are stale inside the closure.
**Action:** Always use a mutable ref (e.g., `pausedRef.current`) to check pause state within the loop, while using state (`setIsPaused`) to trigger re-renders for the UI overlay.

## 2024-04-20 - Canvas Accessibility
**Learning:** HTML5 Canvas elements are invisible to screen readers by default.
**Action:** Always add `role="img"` and a descriptive `aria-label` to the canvas element. If the game has states (like Paused), ensure the overlay uses `role="dialog"` and `aria-modal="true"` to trap focus contextually.
