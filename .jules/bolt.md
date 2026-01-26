## 2024-05-22 - [Double Splice Anti-Pattern]
**Learning:** Calling `splice` twice on the same index in a loop (e.g. for logging then removing) is a critical correctness and performance bug. It removes two elements and causes index misalignment.
**Action:** Always verify `splice` usage. Iterate backwards when removing elements from an array in a loop.

## 2024-05-23 - [Canvas FillStyle Optimization]
**Learning:** Constructing strings for `ctx.fillStyle` (e.g., `rgba(...)`) inside a loop is expensive due to string parsing.
**Action:** Use `ctx.globalAlpha` with a static `ctx.fillStyle` when possible for opacity changes.
