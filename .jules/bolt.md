## 2024-05-22 - [Double Splice Anti-Pattern]
**Learning:** Calling `splice` twice on the same index in a loop (e.g. for logging then removing) is a critical correctness and performance bug. It removes two elements and causes index misalignment.
**Action:** Always verify `splice` usage. Iterate backwards when removing elements from an array in a loop.

## 2024-05-24 - [Canvas Loop Optimization]
**Learning:** In `requestAnimationFrame` loops, properties like `ctx.fillStyle` involving string parsing (e.g., `rgba(...)`) are expensive.
**Action:** Set static styles outside the loop and use `ctx.globalAlpha` for opacity changes. Cache system calls like `Date.now()` outside the entity loop.

## 2024-05-24 - [Mutation during Iteration]
**Learning:** Using `splice` inside `forEach` causes the loop to skip the next element.
**Action:** Use a reverse `for` loop when removing elements from the array being iterated.
