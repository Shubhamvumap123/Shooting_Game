## 2024-05-22 - [Double Splice Anti-Pattern]
**Learning:** Calling `splice` twice on the same index in a loop (e.g. for logging then removing) is a critical correctness and performance bug. It removes two elements and causes index misalignment.
**Action:** Always verify `splice` usage. Iterate backwards when removing elements from an array in a loop.

## 2024-05-24 - [Hidden O(n²) in Array Loops]
**Learning:** Using `array.indexOf(item)` inside a loop iterating over that same array (e.g., to find the index for removal) creates a hidden O(n²) complexity bottleneck.
**Action:** Use a reverse `for` loop where the index is already known (`i`), allowing O(1) removal via `splice(i, 1)` without searching.
