export interface Project {
  tag: string;
  title: string;
  description: string;
  duration: string;
  tint: 1 | 2 | 3 | 4 | 5 | 6;
  /** External URL to the actual video / case study. Card renders as a plain (non-link) tile when omitted. */
  href?: string;
  /** Path under /assets/projects, e.g. "assets/projects/blinkit.jpg". Falls back to the tinted gradient when omitted. */
  thumbnail?: string;
}

export const projects: Project[] = [
  {
    tag: "COMMERCIAL",
    title: "Blinkit Promo — Aloo khaoge?",
    description: "Product workflow spot built on camera tracking and rhythmic sound design.",
    duration: "00:00 / 00:38",
    tint: 1,
    // href: "https://www.instagram.com/reel/...",
  },
  {
    tag: "PODCAST",
    title: "The Diary of a CEO — Neurology",
    description: "Multi-cam podcast narrative cut with reaction cuts and split-screens.",
    duration: "00:00 / 24:10",
    tint: 2,
    // href: "https://www.youtube.com/watch?v=...",
  },
  {
    tag: "NARRATIVE",
    title: "The Real Truth",
    description: "Dark narrative piece finished with grain overlays and aggressive pacing.",
    duration: "00:00 / 03:52",
    tint: 3,
    // href: "https://www.behance.net/gallery/...",
  },
  {
    tag: "DOCUMENTARY",
    title: "The British India Chronicle — SSC",
    description: "Historical documentary edit with vintage textures and kinetic transitions.",
    duration: "00:00 / 12:04",
    tint: 4,
    // href: "https://www.youtube.com/watch?v=...",
  },
  {
    tag: "PROMO",
    title: "Netflix Promo",
    description: "15-second asset built on multi-panel layouts and S-curve keyframing.",
    duration: "00:00 / 00:15",
    tint: 5,
    // href: "https://www.instagram.com/reel/...",
  },
  {
    tag: "TYPOGRAPHY",
    title: "Corporate Minimalism Aesthetics",
    description: "Typography-forward editing built on the same beat-science approach.",
    duration: "00:00 / 01:30",
    tint: 6,
    // href: "https://www.behance.net/gallery/...",
  },
];
