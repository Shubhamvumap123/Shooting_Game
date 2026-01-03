## 2024-01-01 - Pause Functionality & React Closures
**Learning:** When implementing pause functionality in a game loop running via `setInterval` inside a React `useEffect`, standard state variables will be stale inside the loop's closure.
**Action:** Use a `useRef` to track the mutable pause state for the game loop, while simultaneously using `useState` to trigger UI updates (like a "PAUSED" overlay) to keep the visual state in sync.
