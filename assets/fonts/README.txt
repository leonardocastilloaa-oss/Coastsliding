CoastSlide font strategy

The site is configured to use local system fonts:

- Sans-serif UI: system-ui, Segoe UI, Roboto, Arial
- Serif display: Georgia, Times New Roman

This avoids external Google Fonts requests and improves performance, privacy, and Core Web Vitals.

If you later want branded webfonts, place licensed .woff2 files in this folder and add @font-face rules in css/style.css. Use font-display: swap and keep each font file small.
