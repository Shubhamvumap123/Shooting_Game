## 2024-05-23 - Content Security Policy (CSP) Implementation
**Vulnerability:** Missing Content Security Policy (CSP) allowed potential loading of malicious scripts, styles, or other resources from unauthorized origins.
**Learning:** `react-scripts` (Create React App) and the current application architecture (using inline styles in `App.js` for dynamic canvas background) necessitate the use of `'unsafe-inline'` for both `script-src` and `style-src`. This weakens the CSP but is currently required for functionality.
**Prevention:** In future refactors, move inline styles to classes or CSS variables where possible, and investigate build configurations that allow hashing or nonces for scripts to remove `'unsafe-inline'`.

## 2025-05-23 - Missing Deployment Security Configuration
**Vulnerability:** The application is deployed on Vercel but lacked a `vercel.json` configuration file, resulting in missing standard security headers (X-Frame-Options, X-Content-Type-Options, etc.).
**Learning:** React Single Page Applications (SPAs) served statically need explicit server configuration (like `vercel.json` or Nginx config) to inject security headers, as client-side meta tags are insufficient for all headers (e.g., X-Frame-Options).
**Prevention:** Include a standard `vercel.json` or equivalent configuration in the project template to ensure all deployments have baseline security headers by default.
