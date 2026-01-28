## 2024-05-23 - Content Security Policy (CSP) Implementation
**Vulnerability:** Missing Content Security Policy (CSP) allowed potential loading of malicious scripts, styles, or other resources from unauthorized origins.
**Learning:** `react-scripts` (Create React App) and the current application architecture (using inline styles in `App.js` for dynamic canvas background) necessitate the use of `'unsafe-inline'` for both `script-src` and `style-src`. This weakens the CSP but is currently required for functionality.
**Prevention:** In future refactors, move inline styles to classes or CSS variables where possible, and investigate build configurations that allow hashing or nonces for scripts to remove `'unsafe-inline'`.

## 2025-02-18 - Missing Deployment Security Configuration
**Vulnerability:** The application is deployed to Vercel (per README) but lacked a `vercel.json` configuration file, leaving it without essential security headers like `X-Frame-Options` and `Content-Security-Policy` enforcement at the edge.
**Learning:** Even client-side React apps need server-side (or edge) configuration for security headers. Reliance on default framework behaviors is insufficient for production security.
**Prevention:** Always check for and verify the existence of deployment configuration files (`vercel.json`, `netlify.toml`, etc.) that explicitly define security headers.
