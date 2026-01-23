## 2024-05-22 - [Double Splice Anti-Pattern]
**Learning:** Calling `splice` twice on the same index in a loop (e.g. for logging then removing) is a critical correctness and performance bug. It removes two elements and causes index misalignment.
**Action:** Always verify `splice` usage. Iterate backwards when removing elements from an array in a loop.

## 2024-05-23 - [Canvas Render Optimization]
**Learning:** Frequent string concatenation (e.g., `rgba()`) and system calls (`Date.now()`) inside render loops cause GC pressure and lag.
**Action:** Cache loop-invariant values (time, dimensions) and use `ctx.globalAlpha` with static `fillStyle` to avoid string allocation.
