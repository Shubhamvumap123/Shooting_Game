## 2024-05-22 - [Double Splice Anti-Pattern]
**Learning:** Calling `splice` twice on the same index in a loop (e.g. for logging then removing) is a critical correctness and performance bug. It removes two elements and causes index misalignment.
**Action:** Always verify `splice` usage. Iterate backwards when removing elements from an array in a loop.

## 2025-01-09 - [Canvas State Batching]
**Learning:** Frequent `ctx.save()`, `ctx.restore()`, and style property changes (like `shadowColor` and `shadowBlur`) inside iteration loops are expensive.
**Action:** Batch shared style settings outside the loop. Use `ctx.save()` before the loop for shared styles, and nest another `ctx.save()/restore()` pair inside for per-element transformations if needed. This reduces state churn significantly.
