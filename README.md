# Rajat Gehlot — Video Editor & Motion Designer

A single-page portfolio built with Vite + TypeScript, styled as a non-linear
editing timeline: sticky ruler nav with a scroll-driven playhead, a running
record timecode, kinetic type, and clip cards for the reel.

Content sourced from [rajatgehlot.carrd.co](https://rajatgehlot.carrd.co/).

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs to dist/
npm run preview # preview the production build locally
```

## Deploy to GitHub Pages

This repo ships a GitHub Actions workflow (`.github/workflows/deploy.yml`)
that builds and deploys `dist/` on every push to `main`.

1. Push this repo to GitHub.
2. In the repo settings, go to **Pages** and set **Source** to
   **GitHub Actions**.
3. Push to `main` — the site will build and deploy automatically.

Alternatively, deploy manually with `gh-pages`:

```bash
npm run deploy
```

`vite.config.ts` uses `base: "./"` (relative paths), so the build works
whether it's served from `https://<user>.github.io/` or
`https://<user>.github.io/<repo>/` without any changes.

## Adding project links & thumbnails

The reel grid renders from [`src/projects.ts`](src/projects.ts) — one
object per card. To wire up a real project:

- **Link**: set `href` to the video/case-study URL. The card renders as a
  real `<a target="_blank">`; cards without `href` render as plain
  (non-clickable) tiles.
- **Thumbnail**: drop an image in `public/assets/projects/` (see the
  [asset conventions](public/assets/README.md)) and set `thumbnail` to
  its relative path, e.g. `"assets/projects/blinkit.jpg"`. Cards without
  a `thumbnail` fall back to the tinted gradient placeholder.

## Before you publish

- `index.html` has a placeholder contact email
  (`hello@rajatgehlot.com`) — the real address on the Carrd site is
  Cloudflare-obfuscated and couldn't be scraped. Replace it in the
  `.contact__cta` link in `index.html`.
- `src/projects.ts` ships with no `href`/`thumbnail` set on any card —
  add the real links and thumbnails per the section above.
