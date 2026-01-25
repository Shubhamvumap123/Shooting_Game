## 2024-05-22 - [Double Splice Anti-Pattern]
**Learning:** Calling `splice` twice on the same index in a loop (e.g. for logging then removing) is a critical correctness and performance bug. It removes two elements and causes index misalignment.
**Action:** Always verify `splice` usage. Iterate backwards when removing elements from an array in a loop.

## 2025-01-25 - [Canvas Loop Optimization]
**Learning:** Parsing color strings (e.g., `rgba(...)`) inside a loop is significantly slower than using `ctx.globalAlpha` with a static color. Also, `Date.now()` is a system call and should be cached outside loops.
**Action:** Lift static values and system calls out of render loops. Use `globalAlpha` for opacity animations when color is constant.
