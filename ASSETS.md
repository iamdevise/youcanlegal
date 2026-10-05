# Static assets (canonical location)

This file documents the `public/assets/` directory convention for this project.

All local images, videos, and fonts referenced by runtime code MUST live under
`public/assets/`. Vite copies everything in `public/` verbatim into the
production bundle root, so these files survive `build` + publish.

## Layout

```
public/assets/
├── images/          # all site images (hero, logo, products, avatars, ...)
│   └── placeholder.svg
├── videos/          # local video files (optional)
└── fonts/           # self-hosted fonts (optional)
```

## Reference rule (single canonical form)

Always reference assets with a **root-absolute URL path** — leading slash, no
`public/` prefix:

```jsx
<img src="/assets/images/brand-logo.png" alt="Logo" />
```

```css
.hero { background-image: url('/assets/images/hero-banner.jpg'); }
```

## Never do

- `src="assets/images/x.png"` — relative path; breaks on nested routes and CDN sub-paths
- `src="public/assets/images/x.png"` — `public/` is not part of the served URL
- `src="../assets/x.png"` / `./assets/x.png` — same relative-path breakage
- placing images in `<project>/assets/` or `src/assets/` — not copied into `dist/`
  (unless explicitly `import`-ed, which this project convention does not use)

## Replacing an image? Rename it

Files under `public/` are served without content hashes, so CDN edges and
browsers cache them by URL. Overwriting a file with new content under the
**same name** can keep serving the stale image until caches expire.

When replacing an existing image, save it under a **new filename** (e.g.
`brand-logo-v2.png` or a short content hash suffix) and update the single
code reference. Never overwrite an existing file in place with different
content.


## Image Manifest — youcanlegal rebuild

All imagery downloaded from https://www.youcan.legal/ (site owner commissioned this
rebuild and owns all brand assets; reuse is authorized by the client).

| Path | Source | Usage | Status |
|---|---|---|---|
| /assets/images/logo.png | user-provided (client site 2025/07/logof.png) | Header + footer logo | ok |
| /assets/images/logo-vertical.png | user-provided (client site 2026/04) | Favicon/og alt logo | ok |
| /assets/images/hero-eu.jpg | user-provided (client site 2026/04/you-can-legal.jpg) | Home/Work-in-EU hero | ok |
| /assets/images/hero-slovakia.jpg | user-provided (client site) | Slovakia hero | ok |
| /assets/images/hero-serbia.jpg | user-provided (client site) | Serbia hero | ok |
| /assets/images/testimonial-face-1.webp | user-provided (client site) | Testimonial avatar | ok |
| /assets/images/testimonial-man.png | user-provided (client site) | Testimonial avatar | ok |
| /assets/images/flag-poland.png | user-provided (client site) | Poland card flag | ok |
| /assets/images/flag-slovakia.png | user-provided (client site) | Slovakia card flag | ok |
| /assets/images/flag-serbia.png | user-provided (client site) | Serbia card flag | ok |
| /assets/images/team/01..27-*.jpg (27 files) | user-provided (client site 740x960 portraits) | Team carousel | ok |

Generated images: 0 (all imagery is owner-supplied — no AI generation needed).
Fonts self-hosted under public/fonts/ (Plus Jakarta Sans var, Poppins 400/500/600/700, Playfair Display italic) — per frontend-implementation-policy (no Google CDN).

## Image Manifest — round 2 additions

| Path | Source | Usage | Status |
|---|---|---|---|
| /assets/images/logo-horiz-navy.svg | youcan.legal `2025/11/Logo-YOU-CAN-LEGAL-Horizont.svg` (owner asset, unmodified) | Header logo on light / scrolled backgrounds | ok |
| /assets/images/logo-horiz-white.svg | same SVG with the navy wordmark `#001846` swapped to `#FFFFFF` (heart keeps its blue `#0069EB` / coral `#FF3F55`) | Header logo over the dark navy heroes | ok |
| /assets/images/hero-portrait.png | youcan.legal `2025/11/man.png` (1024×1024) | Home hero portrait (replaces the old `hero-eu.jpg`, which was a video thumbnail carrying "Who We Are?" / "Watch now" ghost text) | ok |
| /assets/flags/*.svg (247 files) | [flag-icons](https://www.npmjs.com/package/flag-icons) 4x3 set, copied into the repo so nothing is hotlinked | Country pickers (citizenship, residence, WhatsApp dial code) | ok |
| /assets/flags/LICENSE.flag-icons.txt | flag-icons license (MIT) | Attribution for the bundled flags | ok |

`hero-eu.jpg`, `hero-slovakia.jpg` and `hero-serbia.jpg` are no longer used by any
hero: they were YouTube thumbnails with giant ghost headline text ("Who We Are?",
"Slovakia", "SERBIA") that overlapped the page content. The page heroes now use the
navy-to-blue theme gradient from `DESIGN.md`.
