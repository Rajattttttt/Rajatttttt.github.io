# assets

Static media served as-is (no build processing). Reference files here with a
relative path like `assets/projects/blinkit.jpg` — that works both in dev
and after build, at any GitHub Pages base path.

## projects/

Thumbnail images or GIFs for the reel cards. Recommended: 16:10, ≥800px
wide, `.jpg`/`.webp` for stills or `.gif`/`.mp4` for motion.

Wire a thumbnail up to a card by setting `thumbnail: "assets/projects/<file>"`
on the matching entry in [`src/projects.ts`](../../src/projects.ts). Cards
without a `thumbnail` fall back to the tinted gradient placeholder.
