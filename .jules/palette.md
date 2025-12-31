## 2024-05-23 - Accessible Modals & High Contrast

**Learning:**
Standard color palettes often fail accessibility checks in their default shades. While `amber-500` is visually appealing, it fails WCAG AA contrast against white text (2.56:1). Switching to `amber-700` (5.76:1) ensures readability without sacrificing the design language.
Also, visual modals often lack semantic structure. Adding `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` is critical for screen reader users to understand context and focus boundaries.

**Action:**
- Always check contrast ratios for primary buttons, especially with white text.
- Use `amber-700` or darker for accessible amber buttons.
- Wrap all modal overlays in `role="dialog"` with explicit labelling.
