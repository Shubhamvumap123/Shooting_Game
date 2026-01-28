## 2024-05-22 - [Double Splice Anti-Pattern]
**Learning:** Calling `splice` twice on the same index in a loop (e.g. for logging then removing) is a critical correctness and performance bug. It removes two elements and causes index misalignment.
**Action:** Always verify `splice` usage. Iterate backwards when removing elements from an array in a loop.

## 2024-05-24 - [Nested IndexOf Anti-Pattern]
**Learning:** Using `indexOf` to find an element inside a loop (e.g. to splice it) creates an implicit O(n²) complexity.
**Action:** Use the loop index directly when possible, especially when iterating backwards for removal.
