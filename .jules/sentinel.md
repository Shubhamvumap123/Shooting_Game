## 2024-05-23 - Content Security Policy (CSP) Implementation
**Vulnerability:** Missing Content Security Policy (CSP) allowed potential loading of malicious scripts, styles, or other resources from unauthorized origins.
**Learning:** `react-scripts` (Create React App) and the current application architecture (using inline styles in `App.js` for dynamic canvas background) necessitate the use of `'unsafe-inline'` for both `script-src` and `style-src`. This weakens the CSP but is currently required for functionality.
**Prevention:** In future refactors, move inline styles to classes or CSS variables where possible, and investigate build configurations that allow hashing or nonces for scripts to remove `'unsafe-inline'`.

## 2025-02-23 - Vercel Security Headers
**Vulnerability:** Missing HTTP security headers (X-Frame-Options, Permissions-Policy, etc.) left the application vulnerable to clickjacking and other client-side attacks.
**Learning:** Since the application is deployed on Vercel, security headers must be configured in `vercel.json` to be applied effectively at the edge.
**Prevention:** Include a `vercel.json` file with strict default headers (e.g., X-Frame-Options: DENY, Permissions-Policy: camera=(), microphone=()).
