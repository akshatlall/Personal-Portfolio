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
const INTRO_END = 0.16; // pill expands into the full wall
const ENTER_START = 0.11; // cards start sliding in
const ENTER_END = 0.24; // ...and have fully arrived
const CARDS_START = 0.2; // carousel starts moving (first card centered)
const CARDS_END = 0.94; // carousel ends (last card centered)
const OUTRO_START = 0.95; // pill contracts back near the end of the sequence

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const range = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const smooth = (t: number) => t * t * (3 - 2 * t);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const pad = (n: number, size = 2) => String(n).padStart(size, "0");

export default function ProjectsShowcase({ projects, word = "WORK" }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const countRef = useRef(projects.length);
  countRef.current = projects.length;

  const [active, setActive] = useState(0);

  const rows = word.toUpperCase().split("");
  const count = projects.length;

  /* Scroll the page so that card `index` sits in the center */
  function goTo(index: number) {
    const section = sectionRef.current;
    const totalItems = countRef.current;
    if (!section || totalItems <= 0) return;

    const target = clamp(index, 0, totalItems - 1);
    const total = Math.max(section.offsetHeight - window.innerHeight, 1);
    const top = section.getBoundingClientRect().top + window.scrollY;
    const p =
      CARDS_START +
      (totalItems > 1 ? target / (totalItems - 1) : 0) *
        (CARDS_END - CARDS_START);

    window.scrollTo({ top: top + p * total, behavior: "smooth" });
  }

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const wall = stage.querySelector<HTMLElement>(".showcase-wall");
    const plane = stage.querySelector<HTMLElement>(".wall-plane");
    const rowEls = Array.from(stage.querySelectorAll<HTMLElement>(".wall-row"));
    const cardEls = Array.from(
      stage.querySelectorAll<HTMLElement>(".showcase-card")
    );
    const label = stage.querySelector<HTMLElement>(".work-label");
    const ring = stage.querySelector<HTMLElement>(".work-pill-ring");
    const hint = stage.querySelector<HTMLElement>(".showcase-hint");
    const nav = stage.querySelector<HTMLElement>(".showcase-nav");
    const letters = Array.from(
      stage.querySelectorAll<HTMLElement>(".wall-row span")
    );

    if (!wall || !plane || !label || !ring || !hint || !nav) return;

    let rafId = 0;
    let smoothP: number | null = null;
    let lastActive = -1;
    let lastTime = performance.now();

    function getTargetProgress() {
      const total = Math.max(section!.offsetHeight - window.innerHeight, 1);
      const rect = section!.getBoundingClientRect();
      return clamp(-rect.top / total);
    }

    function render(p: number) {
      const totalItems = countRef.current;
      const W = stage!.clientWidth;
      const H = stage!.clientHeight;

      /* ---------- Phase 1: pill expands & contracts cleanly ---------- */
      const expandIn = smooth(range(p, 0, INTRO_END));
      const collapseOut = smooth(range(p, OUTRO_START, 1));
      const e = clamp(expandIn - collapseOut);

      const pillW = Math.min(210, W * 0.34);
      const pillH = Math.min(H * 0.72, 620);
      const insetX = lerp((W - pillW) / 2, 0, e);
      const insetY = lerp((H - pillH) / 2, 0, e);
      const radius = lerp(pillW / 2, 0, e);

      wall!.style.clipPath = `inset(${insetY.toFixed(1)}px ${insetX.toFixed(
        1
      )}px ${insetY.toFixed(1)}px ${insetX.toFixed(1)}px round ${radius.toFixed(
        1
      )}px)`;
      stage!.style.setProperty("--pw", `${pillW}px`);
      stage!.style.setProperty("--ph", `${pillH}px`);

      const pillChromeOpacity = 1 - smooth(range(e, 0.05, 0.55));
      ring!.style.opacity = String(pillChromeOpacity);
      label!.style.opacity = String(1 - smooth(range(e, 0.15, 0.65)));
      label!.style.transform = `translate3d(-50%, -50%, 0) scale(${(
        1 +
        e * 0.45
      ).toFixed(3)})`;
      hint!.style.opacity = String(1 - smooth(range(p, 0, 0.06)));

      /* ---------- Phase 2: wall tilt & alternating horizontal row drift ---------- */
      const tiltIn = easeOut(range(p, 0, 0.45));
      const rx = lerp(28, 7, tiltIn);
      const rz = lerp(-6, 6, range(p, 0.08, 1));
      const s = lerp(1.42, 1.22, tiltIn);
      plane!.style.transform = `translate3d(0, 0, 0) rotateX(${rx.toFixed(
        2
      )}deg) rotateZ(${rz.toFixed(2)}deg) scale(${s.toFixed(3)})`;

      const letterOpacity = smooth(range(e, 0.15, 0.75)).toFixed(3);
      for (let i = 0; i < letters.length; i++) {
        letters[i].style.opacity = letterOpacity;
      }

      const drift = (p - 0.5) * 520;
      for (let i = 0; i < rowEls.length; i++) {
        const dir = i % 2 === 0 ? 1 : -1;
        const rowShift = dir * drift;
        rowEls[i].style.transform = `translate3d(${rowShift.toFixed(
          1
        )}px, 0, 0)`;
      }

      /* ---------- Phase 3: staggered top/bottom card carousel ---------- */
      const cardW = cardEls[0]?.offsetWidth ?? 420;
      const spacing = cardW * 0.88;
      const denom = Math.max(totalItems - 1, 1);
      const travel = range(p, CARDS_START, CARDS_END) * denom;
      const enter = easeOut(range(p, ENTER_START, ENTER_END));
      const exit = 1 - smooth(range(p, OUTRO_START - 0.02, 1));

      for (let i = 0; i < cardEls.length; i++) {
        const card = cardEls[i];
        const d = i - travel;
        const ad = Math.abs(d);

        const x = d * spacing + (1 - enter) * W * 0.78;
        const waveY = (i % 2 === 0 ? -1 : 1) * H * 0.165;
        const y = waveY + Math.sin(d * 0.85) * 10;

        const focus = 1 - clamp(ad / 2.2);
        const scale =
          lerp(0.88, 1.04, smooth(focus)) * lerp(0.88, 1, enter);
        const rot = (i % 2 === 0 ? -2.2 : 2.2) + clamp(d, -3, 3) * 1.8;
        const rotY = clamp(d, -2.5, 2.5) * -11;
        const opacity = clamp(
          enter * exit * (1 - smooth(range(ad, 2.4, 3.3)))
        );

        card.style.opacity = opacity.toFixed(3);
        card.style.visibility = opacity < 0.01 ? "hidden" : "visible";
        card.style.zIndex = String(100 - Math.round(ad * 12));
        card.style.transform = `translate3d(-50%, -50%, 0) translate3d(${x.toFixed(
          1
        )}px, ${y.toFixed(1)}px, 0) rotate(${rot.toFixed(
          2
        )}deg) rotateY(${rotY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      }

      /* ---------- Nav + active counter ---------- */
      const navOpacity = clamp(
        smooth(range(p, INTRO_END * 0.7, CARDS_START)) * exit
      );
      nav!.style.opacity = navOpacity.toFixed(3);
      nav!.style.pointerEvents = navOpacity > 0.5 ? "auto" : "none";

      const current = clamp(Math.round(travel), 0, Math.max(totalItems - 1, 0));
      if (current !== lastActive) {
        lastActive = current;
        setActive(current);
      }
    }

    function tick(now: number) {
      rafId = 0;
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const targetP = getTargetProgress();
      if (smoothP === null) {
        smoothP = targetP;
      } else {
        // Exponential smoothing independent of display refresh rate (60Hz / 120Hz / 144Hz)
        const factor = 1 - Math.exp(-14 * dt);
        smoothP += (targetP - smoothP) * factor;
        if (Math.abs(targetP - smoothP) < 0.00015) {
          smoothP = targetP;
        }
      }

      render(smoothP);

      if (Math.abs(targetP - smoothP) > 0.00015) {
        rafId = requestAnimationFrame(tick);
      }
    }

    function schedule() {
      if (!rafId) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(tick);
      }
    }

    // Initial immediate paint so above-the-fold state never flashes
    smoothP = getTargetProgress();
    render(smoothP);

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

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