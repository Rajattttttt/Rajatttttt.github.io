import "./style.css";
import { projects } from "./projects";

const $ = <T extends Element>(sel: string) => document.querySelector<T>(sel);
const $$ = <T extends Element>(sel: string) => Array.from(document.querySelectorAll<T>(sel));

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- reel: render project cards from data (links + thumbnails live in projects.ts) ---------- */
const reelGrid = $<HTMLElement>("#reel-grid");
if (reelGrid) {
  reelGrid.innerHTML = projects
    .map((p) => {
      const tag = p.href ? "a" : "div";
      const linkAttrs = p.href
        ? `href="${p.href}" target="_blank" rel="noopener noreferrer"`
        : "";
      const thumbStyle = p.thumbnail
        ? ` style="background-image: linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.55)), url('${p.thumbnail}'); background-size: cover; background-position: center;"`
        : "";
      return `
        <${tag} class="clip" data-reveal data-tint="${p.tint}" ${linkAttrs}>
          <div class="clip__thumb"${thumbStyle}>
            <span class="clip__play"></span>
            <span class="clip__tc">${p.duration}</span>
          </div>
          <div class="clip__meta">
            <span class="clip__tag">${p.tag}</span>
            <h3>${p.title}</h3>
            <p>${p.description}</p>
          </div>
        </${tag}>
      `;
    })
    .join("");
}

/* ---------- footer year ---------- */
const yearEl = $("#year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

/* ---------- running record clock (HH:MM:SS:FF @ 24fps) ---------- */
const clockEl = $<HTMLElement>("#clock");
if (clockEl && !prefersReducedMotion) {
  const start = performance.now();
  const pad = (n: number, len = 2) => String(n).padStart(len, "0");

  const tick = () => {
    const elapsed = performance.now() - start;
    const totalFrames = Math.floor((elapsed / 1000) * 24);
    const ff = totalFrames % 24;
    const totalSeconds = Math.floor(totalFrames / 24);
    const ss = totalSeconds % 60;
    const mm = Math.floor(totalSeconds / 60) % 60;
    const hh = Math.floor(totalSeconds / 3600);
    clockEl.textContent = `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ---------- scroll-driven playhead + active marker ---------- */
const playhead = $<HTMLElement>("#playhead");
const track = $<HTMLElement>(".ruler__track");
const markers = $$<HTMLAnchorElement>(".marker");
const sections = markers
  .map((m) => document.querySelector<HTMLElement>(m.getAttribute("href")!))
  .filter((el): el is HTMLElement => el !== null);

const updatePlayhead = () => {
  if (!playhead || !track) return;
  const doc = document.documentElement;
  const maxScroll = doc.scrollHeight - doc.clientHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  const trackWidth = track.scrollWidth;
  playhead.style.left = `${progress * trackWidth}px`;

  let activeIndex = 0;
  const atBottom = window.scrollY + doc.clientHeight >= doc.scrollHeight - 2;
  if (atBottom) {
    activeIndex = sections.length - 1;
  } else {
    sections.forEach((sec, i) => {
      if (sec.getBoundingClientRect().top - 120 <= 0) activeIndex = i;
    });
  }
  markers.forEach((m, i) => m.classList.toggle("is-active", i === activeIndex));
};

window.addEventListener("scroll", updatePlayhead, { passive: true });
window.addEventListener("resize", updatePlayhead);
updatePlayhead();

/* ---------- role cycler ---------- */
const roles = [
  "Video Editor",
  "Motion Designer",
  "Sound Designer",
  "VFX Artist",
  "Documentary Cutter",
];

const roleEl = $<HTMLElement>("#role-cycle");
if (roleEl) {
  if (prefersReducedMotion) {
    roleEl.textContent = roles[0];
  } else {
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let deleting = false;

    const step = () => {
      const word = roles[roleIndex];
      charIndex += deleting ? -1 : 1;
      roleEl.textContent = word.slice(0, charIndex);

      let delay = deleting ? 45 : 75;

      if (!deleting && charIndex === word.length) {
        delay = 1400;
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 250;
      }
      setTimeout(step, delay);
    };
    setTimeout(step, 1400);
  }
}

/* ---------- waveform bars ---------- */
const waveform = $<HTMLElement>("#waveform");
if (waveform) {
  const barCount = 64;
  for (let i = 0; i < barCount; i++) {
    const bar = document.createElement("span");
    const height = 15 + Math.random() * 85;
    bar.style.height = `${height}%`;
    if (!prefersReducedMotion) {
      bar.style.animation = `wave-pulse ${1.2 + Math.random() * 1.4}s ease-in-out ${
        Math.random() * 1.5
      }s infinite alternate`;
    }
    waveform.appendChild(bar);
  }

  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    @keyframes wave-pulse {
      from { transform: scaleY(0.4); opacity: 0.35; }
      to { transform: scaleY(1); opacity: 0.75; }
    }
  `;
  document.head.appendChild(styleSheet);
}

/* ---------- scroll reveal (cut-in transitions) ---------- */
const revealTargets = $$<HTMLElement>(
  "[data-reveal], .section-head, .monitor, .tracks, .tools, .contact__panel"
);

if (prefersReducedMotion) {
  revealTargets.forEach((el) => el.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          setTimeout(() => el.classList.add("is-visible"), i * 60);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
  revealTargets.forEach((el) => observer.observe(el));
}

/* ---------- custom playhead cursor (desktop only) ---------- */
const cursorDot = $<HTMLElement>(".cursor-dot");
if (cursorDot && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  window.addEventListener("mousemove", (e) => {
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
    cursorDot.classList.add("is-active");
  });
  document.addEventListener("mouseleave", () => cursorDot.classList.remove("is-active"));

  $$<HTMLElement>("a, button, .clip").forEach((el) => {
    el.addEventListener("mouseenter", () => cursorDot.classList.add("is-hover"));
    el.addEventListener("mouseleave", () => cursorDot.classList.remove("is-hover"));
  });
}
