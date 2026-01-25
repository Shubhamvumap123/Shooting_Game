## 2024-05-23 - Content Security Policy (CSP) Implementation
**Vulnerability:** Missing Content Security Policy (CSP) allowed potential loading of malicious scripts, styles, or other resources from unauthorized origins.
**Learning:** `react-scripts` (Create React App) and the current application architecture (using inline styles in `App.js` for dynamic canvas background) necessitate the use of `'unsafe-inline'` for both `script-src` and `style-src`. This weakens the CSP but is currently required for functionality.
**Prevention:** In future refactors, move inline styles to classes or CSS variables where possible, and investigate build configurations that allow hashing or nonces for scripts to remove `'unsafe-inline'`.

## 2026-01-25 - Vercel Security Headers
**Vulnerability:** Missing HTTP security headers (X-Frame-Options, X-Content-Type-Options, etc.) left the application vulnerable to clickjacking and MIME sniffing attacks.
**Learning:** For Vercel deployments, security headers must be explicitly configured in `vercel.json` as they are not set by default.
**Prevention:** Always include a `vercel.json` with strict security headers (DENY framing, no-sniff, strict referrer policy) for all new Vercel-hosted projects.
