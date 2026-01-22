## 2024-05-22 - [Double Splice Anti-Pattern]
**Learning:** Calling `splice` twice on the same index in a loop (e.g. for logging then removing) is a critical correctness and performance bug. It removes two elements and causes index misalignment.
**Action:** Always verify `splice` usage. Iterate backwards when removing elements from an array in a loop.

## 2026-01-22 - [Canvas Loop Optimizations]
**Learning:** In canvas animation loops (like `drawStars`), calling `Date.now()` and constructing color strings (e.g., `rgba(...)`) inside the loop creates significant overhead per entity.
**Action:** Cache `Date.now()` once per frame. Use `ctx.globalAlpha` with a static `ctx.fillStyle` instead of per-entity color strings to reduce garbage collection and parsing time.
