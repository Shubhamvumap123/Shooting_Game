## 2024-05-23 - Content Security Policy (CSP) Implementation
**Vulnerability:** Missing Content Security Policy (CSP) allowed potential loading of malicious scripts, styles, or other resources from unauthorized origins.
**Learning:** `react-scripts` (Create React App) and the current application architecture (using inline styles in `App.js` for dynamic canvas background) necessitate the use of `'unsafe-inline'` for both `script-src` and `style-src`. This weakens the CSP but is currently required for functionality.
**Prevention:** In future refactors, move inline styles to classes or CSS variables where possible, and investigate build configurations that allow hashing or nonces for scripts to remove `'unsafe-inline'`.

## 2024-10-24 - Security Headers Configuration
**Vulnerability:** Missing HTTP security headers (X-Frame-Options, X-Content-Type-Options, etc.) left the application vulnerable to clickjacking and MIME-sniffing attacks.
**Learning:** Since the application is a client-side React app deployed on Vercel, security headers cannot be set via backend middleware. They must be configured in `vercel.json` to be applied by the Vercel edge network.
**Prevention:** Ensure `vercel.json` is maintained and includes comprehensive security headers for all deployments.
