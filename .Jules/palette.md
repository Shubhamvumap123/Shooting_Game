# Palette's Journal

## 2025-01-22 - Accessibility in Canvas Games
**Learning:** Canvas elements are naturally inaccessible to screen readers. For games, critical information must be exposed via accessible overlays or ARIA regions. Focus management is crucial because key listeners on `document` work visually but blind users need context (e.g. modals).
**Action:** When working with canvas games, ensure instruction overlays are proper ARIA dialogs and manage focus so the user knows where they are (Start button -> Game -> End button).
