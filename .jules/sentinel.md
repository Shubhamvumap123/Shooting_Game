## 2024-05-23 - Content Security Policy (CSP) Implementation
**Vulnerability:** Missing Content Security Policy (CSP) allowed potential loading of malicious scripts, styles, or other resources from unauthorized origins.
**Learning:** `react-scripts` (Create React App) and the current application architecture (using inline styles in `App.js` for dynamic canvas background) necessitate the use of `'unsafe-inline'` for both `script-src` and `style-src`. This weakens the CSP but is currently required for functionality.
**Prevention:** In future refactors, move inline styles to classes or CSS variables where possible, and investigate build configurations that allow hashing or nonces for scripts to remove `'unsafe-inline'`.

## 2024-05-24 - Security Headers Configuration
**Vulnerability:** Missing HTTP security headers in production deployment exposed the application to clickjacking and MIME-type sniffing attacks.
**Learning:** Vercel deployments require a `vercel.json` configuration file to enforce security headers (`X-Frame-Options`, `X-Content-Type-Options`, etc.) at the edge, as these cannot be set via client-side code.
**Prevention:** Always include a `vercel.json` (or platform-equivalent config) with strict security headers for production deployments.
