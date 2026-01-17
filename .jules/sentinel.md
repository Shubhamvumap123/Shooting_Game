## 2024-05-23 - Content Security Policy (CSP) Implementation
**Vulnerability:** Missing Content Security Policy (CSP) allowed potential loading of malicious scripts, styles, or other resources from unauthorized origins.
**Learning:** `react-scripts` (Create React App) and the current application architecture (using inline styles in `App.js` for dynamic canvas background) necessitate the use of `'unsafe-inline'` for both `script-src` and `style-src`. This weakens the CSP but is currently required for functionality.
**Prevention:** In future refactors, move inline styles to classes or CSS variables where possible, and investigate build configurations that allow hashing or nonces for scripts to remove `'unsafe-inline'`.

## 2025-02-23 - Missing Security Headers in Deployment Config
**Vulnerability:** Default deployment configuration (Vercel) lacked standard security headers like `X-Frame-Options` and `Permissions-Policy`, exposing the app to clickjacking and unnecessary hardware API access.
**Learning:** Deployment platforms often require explicit configuration (e.g., `vercel.json`) to enforce security headers that are not handled by the application code itself.
**Prevention:** Always verify the presence of deployment-specific configuration files and audit headers using tools like `securityheaders.com` or local inspection.
