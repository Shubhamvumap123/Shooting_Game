## 2024-05-22 - [Double Splice Anti-Pattern]
**Learning:** Calling `splice` twice on the same index in a loop (e.g. for logging then removing) is a critical correctness and performance bug. It removes two elements and causes index misalignment.
**Action:** Always verify `splice` usage. Iterate backwards when removing elements from an array in a loop.

## 2024-05-23 - [TransformStream ReferenceError in Playwright]
**Learning:** Playwright tests failed with `ReferenceError: TransformStream is not defined` likely due to Node version or environment mismatch, but `src/App.test.js` passed.
**Action:** Focus on unit tests (`src/App.test.js`) for logic verification when environment issues block e2e tests.
