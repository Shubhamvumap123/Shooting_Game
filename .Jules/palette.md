## 2024-05-23 - Accessibility Improvements for Canvas Games
**Learning:** Canvas-based games are inherently inaccessible to screen readers because they are just pixel bitmaps. Adding `role="img"` and a descriptive `aria-label` to the `<canvas>` element provides a baseline experience for non-visual users by at least announcing what the element is.
**Action:** Always add `role="img"` and `aria-label` to `<canvas>` elements that convey meaningful content.

## 2024-05-23 - Modal Dialog Accessibility
**Learning:** Simple `div` overlays for modals (like "How to Play" or "Game Over" screens) are invisible to the accessibility tree as dialogs. They need `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` pointing to the modal title to be properly announced and navigated.
**Action:** Wrap all modal content in a container with `role="dialog"`, `aria-modal="true"`, and link it to its title via `aria-labelledby`. Ensure decorative elements (like SVG icons) inside have `aria-hidden="true"`.
