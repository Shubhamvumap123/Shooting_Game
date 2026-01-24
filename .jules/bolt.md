## 2024-05-22 - [Double Splice Anti-Pattern]
**Learning:** Calling `splice` twice on the same index in a loop (e.g. for logging then removing) is a critical correctness and performance bug. It removes two elements and causes index misalignment.
**Action:** Always verify `splice` usage. Iterate backwards when removing elements from an array in a loop.

## 2024-05-22 - [Canvas Loop Performance]
**Learning:** Constructing style strings (e.g., `rgba(...)`) and calling `Date.now()` inside a high-frequency canvas loop (e.g., 50 particles @ 60fps) generates significant garbage and CPU overhead.
**Action:** Use `ctx.globalAlpha` with a static `ctx.fillStyle` where possible. Cache time values (like `Date.now()`) outside the loop.
