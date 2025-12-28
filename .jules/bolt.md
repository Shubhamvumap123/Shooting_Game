## 2024-05-22 - Optimization of Collision Detection Loops
**Learning:** `forEach` loops coupled with `splice` and `indexOf` inside the loop are essentially O(N^2) (due to scan) and can cause logic bugs (skipped elements) when modifying the array in place.
**Action:** Replace `forEach` with reverse `for` loops when elements might be removed, and use the loop index for removal instead of rescanning with `indexOf`.
