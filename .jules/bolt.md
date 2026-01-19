## 2024-05-22 - [Double Splice Anti-Pattern]
**Learning:** Calling `splice` twice on the same index in a loop (e.g. for logging then removing) is a critical correctness and performance bug. It removes two elements and causes index misalignment.
**Action:** Always verify `splice` usage. Iterate backwards when removing elements from an array in a loop.

## 2024-05-24 - [Canvas Loop Optimizations]
**Learning:** Constructing strings (like `rgba()`) and making system calls (like `Date.now()`) inside a high-frequency render loop (50+ iterations @ 60fps) creates avoidable overhead.
**Action:** Cache time values outside loops. Use `ctx.globalAlpha` with a static `ctx.fillStyle` instead of dynamic color strings where possible.
