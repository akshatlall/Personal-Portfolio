"use client";

import { useEffect, useRef, useState } from "react";
import ProjectArtwork from "./ProjectArtwork";
import "./projects-showcase.css";

type ArtworkType = React.ComponentProps<typeof ProjectArtwork>["type"];

type ShowcaseProject = {
  title: string;
  date: string;
  artwork: ArtworkType;
  tags: string[];
};

type Props = {
  projects: ShowcaseProject[];
  /** Big letters on the wall. 4 letters fits best (one row per letter). */
  word?: string;
};

const SHADOWS = [
  "var(--chip-peach-bg)",
  "var(--chip-sky-bg)",
  "var(--chip-yellow-bg)",
  "var(--chip-lavender-bg)",
  "var(--chip-rose-bg)",
  "var(--chip-mint-bg)",
];

const LETTERS_PER_ROW = 22;

/* Scroll timeline (0 → 1 across the pinned section) */
const INTRO_END = 0.22; // pill expands into the full wall
const ENTER_START = 0.15; // cards start sliding in
const ENTER_END = 0.3; // ...and have fully arrived
const CARDS_START = 0.26; // carousel starts moving (first card centered)
const CARDS_END = 0.96; // carousel ends (last card centered)

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const range = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const smooth = (t: number) => t * t * (3 - 2 * t);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const pad = (n: number, size = 2) => String(n).padStart(size, "0");

export default function ProjectsShowcase({ projects, word = "WORK" }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const rows = word.toUpperCase().split("");
  const count = projects.length;

  /* Scroll the page so that card `index` sits in the center */
  function goTo(index: number) {
    const section = sectionRef.current;
    if (!section) return;

    const target = clamp(index, 0, count - 1);
    const total = section.offsetHeight - window.innerHeight;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const p =
      CARDS_START +
      (count > 1 ? target / (count - 1) : 0) * (CARDS_END - CARDS_START);

    window.scrollTo({ top: top + p * total, behavior: "smooth" });
  }

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const wall = stage.querySelector<HTMLElement>(".showcase-wall")!;
    const plane = stage.querySelector<HTMLElement>(".wall-plane")!;
    const rowEls = Array.from(stage.querySelectorAll<HTMLElement>(".wall-row"));
    const cardEls = Array.from(
      stage.querySelectorAll<HTMLElement>(".showcase-card")
    );
    const label = stage.querySelector<HTMLElement>(".work-label")!;
    const ring = stage.querySelector<HTMLElement>(".work-pill-ring")!;
    const hint = stage.querySelector<HTMLElement>(".showcase-hint")!;
    const nav = stage.querySelector<HTMLElement>(".showcase-nav")!;
    const letters = stage.querySelectorAll<HTMLElement>(".wall-row span");

    let frame = 0;
    let lastActive = -1;

    function update() {
      frame = 0;
      const total = section!.offsetHeight - window.innerHeight;
      const rect = section!.getBoundingClientRect();
      const p = clamp(-rect.top / Math.max(total, 1));

      const W = stage!.clientWidth;
      const H = stage!.clientHeight;

      /* ---------- Phase 1: pill expands into the wall ---------- */
      const e = smooth(range(p, 0, INTRO_END));
      const pillW = Math.min(210, W * 0.32);
      const pillH = H * 0.68;
      const insetX = lerp((W - pillW) / 2, 0, e);
      const insetY = lerp((H - pillH) / 2, 0, e);
      const radius = lerp(pillW / 2, 0, e);

      wall.style.clipPath = `inset(${insetY}px ${insetX}px ${insetY}px ${insetX}px round ${radius}px)`;
      stage!.style.setProperty("--pw", `${pillW}px`);
      stage!.style.setProperty("--ph", `${pillH}px`);

      ring.style.opacity = String(1 - smooth(range(e, 0, 0.55)));
      label.style.opacity = String(1 - smooth(range(e, 0.2, 0.7)));
      label.style.transform = `translate(-50%, -50%) scale(${1 + e * 0.5})`;
      hint.style.opacity = String(1 - range(p, 0, 0.05));

      /* ---------- Phase 2: the wall tilts and drifts with scroll ---------- */
      const tiltIn = easeOut(range(p, 0, 0.5));
      const rx = lerp(36, 8, tiltIn);
      const rz = lerp(-10, 10, range(p, 0.1, 1));
      const s = lerp(1.55, 1.25, tiltIn);
      plane.style.transform = `rotateX(${rx}deg) rotateZ(${rz}deg) scale(${s})`;

      const letterOpacity = String(smooth(range(e, 0.25, 0.8)));
      letters.forEach((l) => (l.style.opacity = letterOpacity));

      const drift = p * 460;
      rowEls.forEach((row, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        row.style.transform = `translate3d(${dir * drift}px,0,0)`;
      });

      /* ---------- Phase 3: cards ride a horizontal carousel ---------- */
      const cardW = cardEls[0]?.offsetWidth ?? 420;
      const spacing = cardW * 0.82; // neighbours overlap a little
      const travel = range(p, CARDS_START, CARDS_END) * (count - 1);
      const enter = easeOut(range(p, ENTER_START, ENTER_END));

      cardEls.forEach((card, i) => {
        const d = i - travel; // distance from center, in card units
        const ad = Math.abs(d);

        const x = d * spacing + (1 - enter) * W * 0.85;
        const y = (i % 2 === 0 ? -1 : 1) * H * 0.15;
        const scale = lerp(1.05, 0.86, clamp(ad / 2)) * lerp(0.85, 1, enter);
        const rot = (i % 2 === 0 ? -3 : 3) + d * 2.5;
        const rotY = clamp(d, -2, 2) * -14;
        const opacity = enter * (1 - smooth(range(ad, 2.6, 3.4)));

        card.style.opacity = String(opacity);
        card.style.visibility = opacity < 0.01 ? "hidden" : "visible";
        card.style.zIndex = String(100 - Math.round(ad * 10));
        card.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) rotate(${rot}deg) rotateY(${rotY}deg) scale(${scale})`;
      });

      /* ---------- Nav + counter ---------- */
      const navOpacity = smooth(range(p, INTRO_END, CARDS_START));
      nav.style.opacity = String(navOpacity);
      nav.style.pointerEvents = navOpacity < 0.5 ? "none" : "auto";

      const current = clamp(Math.round(travel), 0, count - 1);
      if (current !== lastActive) {
        lastActive = current;
        setActive(current);
      }
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [count]);

  return (
    <section id="projects" className="showcase" ref={sectionRef}>
      <div className="showcase-sticky" ref={stageRef}>
        <h2 className="showcase-title">Projects</h2>

        {/* Grid paper the pill sits on */}
        <div className="showcase-grid" aria-hidden="true" />
        <div className="work-pill-ring" aria-hidden="true" />

        {/* The wall of letters, revealed through the expanding pill */}
        <div className="showcase-wall" aria-hidden="true">
          <div className="wall-plane">
            {rows.map((letter, r) => (
              <div className="wall-row" key={r}>
                {Array.from({ length: LETTERS_PER_ROW }, (_, i) => (
                  <span key={i}>{letter}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Vertical word shown inside the pill at the start */}
        <div className="work-label" aria-hidden="true">
          {rows.map((letter, i) => (
            <span key={i}>{letter}</span>
          ))}
        </div>

        {/* Carousel track */}
        <div className="showcase-cards">
          {projects.map((project, i) => (
            <article
              key={project.title}
              className="showcase-card"
              onClick={() => goTo(i)}
              style={
                {
                  "--card-shadow": SHADOWS[i % SHADOWS.length],
                } as React.CSSProperties
              }
            >
              <div className="showcase-card-bar">
                <i />
                <i />
                <i />
                <span>
                  {project.title.toLowerCase().replace(/\s+/g, "-")} #
                  {pad(i + 1, 4)}/{pad(count, 4)}
                </span>
              </div>

              <div className="showcase-art">
                <ProjectArtwork type={project.artwork} />
              </div>

              <div className="showcase-card-meta">
                <strong>{project.title}</strong>
                <span className="date">{project.date}</span>
              </div>

              <div className="showcase-card-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <p className="showcase-hint" aria-hidden="true">
          scroll
        </p>

        <div className="showcase-nav">
          <button
            type="button"
            aria-label="Previous project"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
          >
            ‹
          </button>

          <span className="showcase-nav-count">
            {pad(active + 1)} / {pad(count)}
            <em>{projects[active]?.title}</em>
          </span>

          <button
            type="button"
            aria-label="Next project"
            onClick={() => goTo(active + 1)}
            disabled={active === count - 1}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}