## 2024-05-23 - [Canvas Testing in JSDOM]
**Learning:** React components using HTML5 Canvas fail in `jsdom` (Jest) because `getContext` is not implemented.
**Action:** Always mock `HTMLCanvasElement.prototype.getContext` in setupTests or specific test files when testing Canvas components.
