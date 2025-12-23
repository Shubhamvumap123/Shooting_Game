## 2024-03-24 - Console Logs in Game Loops
**Learning:** Synchronous `console.log` statements in high-frequency loops (like game loops or collision checks) are catastrophic for performance.
**Action:** Always audit `Looping` functions and event handlers for stray debug logs before shipping. In this case, `console.log(bull)` was inside an O(N*M) collision loop running 50 times/sec, causing massive overhead.
