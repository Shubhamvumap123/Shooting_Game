## 2024-05-22 - [Double Splice Anti-Pattern]
**Learning:** Calling `splice` twice on the same index in a loop (e.g. for logging then removing) is a critical correctness and performance bug. It removes two elements and causes index misalignment.
**Action:** Always verify `splice` usage. Iterate backwards when removing elements from an array in a loop.

## 2025-02-14 - [Canvas Context Thrashing]
**Learning:** Frequent calls to `ctx.save()`, `ctx.restore()`, and context property updates inside a loop (e.g. drawing bullets) cause significant overhead.
**Action:** Batch context state changes outside the loop. Set styles once, draw all items, then restore state.
