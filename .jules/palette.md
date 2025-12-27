## 2024-05-22 - Accessibility in Canvas Games
**Learning:** Canvas-based games often lack semantic HTML structure, making them invisible to screen readers. Modals (like "How to Play" or "Game Over") are the primary interface for accessibility in these contexts.
**Action:** Always ensure overlay modals in canvas games have strict `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` attributes to provide context to screen reader users who cannot perceive the canvas content.
