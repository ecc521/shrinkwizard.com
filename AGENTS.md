# Shrink Wizard Website (<shrinkwizard.com>) - AI Guidelines

This repository (`ecc521/shrinkwizard.com`) is a submodule embedded inside the main `Space-Saver` (Shrink Wizard) monorepo under the `website/` directory. It serves as the primary marketing site and distribution portal for the Shrink Wizard Desktop App.

## 1. Technical Stack & Constraints

- **Zero Frameworks:** The website is deliberately built using pure, vanilla HTML5, CSS3, and JavaScript. Do **NOT** introduce React, Vue, Svelte, Tailwind CSS, or any build tools (Webpack/Vite) into this submodule.
- **Single Page Application Feel:** It operates as a fast, simple static site without complex client-side routing.
- **Styling Architecture:** The CSS (`styles.css`) utilizes native CSS variables (`--bg-primary`, `--accent-primary`) that closely mirror the dark-mode aesthetic of the main Electron desktop application for brand consistency. Do not deviate from the existing spacing, typography (Inter), or dark/glassmorphism themes.

## 2. Dynamic Download Routing

- **OS Detection:** `app.js` is responsible for dynamically detecting the user's Operating System (macOS, Windows, Linux) and architecture (Apple Silicon vs Intel) to serve the correct download button payload.
- **GitHub Releases Integration:** We do NOT host the Heavy binaries on the website host (GitHub Pages/Cloudflare Pages). The site acts as an intermediary, directing users directly to the actual artifact assets hosted on `https://github.com/ecc521/Space-Saver/releases/latest/download/...`.

## 3. SEO & Legal Compliance

- **SEO Preservation:** When modifying HTML, ensure meta tags, proper semantic tags (`<nav>`, `<main>`, `<h1>`), and responsive metadata are intact.
- **Legal Endpoints:** Ensure that any future pages or links accurately connect to `/terms.html` and `/privacy.html`, which contain critical liability disclaimers about the app altering local files.
