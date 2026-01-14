## 2024-05-23 - Content Security Policy (CSP) Implementation
**Vulnerability:** Missing Content Security Policy (CSP) allowed potential loading of malicious scripts, styles, or other resources from unauthorized origins.
**Learning:** `react-scripts` (Create React App) and the current application architecture (using inline styles in `App.js` for dynamic canvas background) necessitate the use of `'unsafe-inline'` for both `script-src` and `style-src`. This weakens the CSP but is currently required for functionality.
**Prevention:** In future refactors, move inline styles to classes or CSS variables where possible, and investigate build configurations that allow hashing or nonces for scripts to remove `'unsafe-inline'`.

## 2024-05-24 - HTTP Security Headers Configuration
**Vulnerability:** The application relied on default server headers, missing critical protections like `X-Frame-Options` and `X-Content-Type-Options` which cannot be fully enforced via HTML meta tags.
**Learning:** For Vercel deployments, a `vercel.json` file is required to define headers that browsers process before parsing HTML. HTML `<meta>` tags are insufficient for headers like `X-Frame-Options` or `HSTS`.
**Prevention:** Always include a `vercel.json` (or equivalent server config) with strict security headers in the repository to ensure consistent security posture across all environments.
