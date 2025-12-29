## 2024-05-22 - Content Security Policy (CSP)
**Vulnerability:** Missing CSP Header
**Learning:** React applications, especially those using `react-scripts`, often rely on inline styles and scripts during development, which makes strictly applying CSP challenging.
**Prevention:** Added a CSP meta tag in `public/index.html` with `script-src 'self' 'unsafe-inline'` and `style-src 'self' 'unsafe-inline'` to mitigate risks while maintaining functionality.
