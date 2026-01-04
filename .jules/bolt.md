## 2024-05-22 - [Double Splice Anti-Pattern]
**Learning:** Calling `splice` twice on the same index in a loop (e.g. for logging then removing) is a critical correctness and performance bug. It removes two elements and causes index misalignment.
**Action:** Always verify `splice` usage. Iterate backwards when removing elements from an array in a loop.

## 2024-05-24 - [Canvas Context State Batching]
**Learning:** In the `drawStars` loop, constructing `rgba` strings for every star (`"rgba(255, 255, 255, " + opacity + ")"`) generated excessive garbage and string parsing overhead.
**Action:** Use `ctx.globalAlpha` with a static `ctx.fillStyle` for varying opacity. Batch state changes where possible.
