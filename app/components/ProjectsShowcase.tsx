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
const CARDS_START = 0.26; // first pair of project cards arrives
const CARDS_END = 0.98;

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const range = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const smooth = (t: number) => t * t * (3 - 2 * t);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const pad = (n: number) => String(n).padStart(2, "0");

export default function ProjectsShowcase({ projects, word = "WORK" }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [pairLabel, setPairLabel] = useState("");

  const rows = word.toUpperCase().split("");
  const pairCount = Math.ceil(projects.length / 2);

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
    const counter = stage.querySelector<HTMLElement>(".showcase-counter")!;
    const letters = stage.querySelectorAll<HTMLElement>(".wall-row span");

    let frame = 0;
    let lastPair = -2;

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
      const rz = lerp(-12, 12, range(p, 0.1, 1));
      const s = lerp(1.55, 1.25, tiltIn);
      plane.style.transform = `rotateX(${rx}deg) rotateZ(${rz}deg) scale(${s})`;

      const letterOpacity = String(smooth(range(e, 0.25, 0.8)));
      letters.forEach((l) => (l.style.opacity = letterOpacity));

      const drift = p * 320;
      rowEls.forEach((row, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        row.style.transform = `translate3d(${dir * drift}px,0,0)`;
      });

      /* ---------- Phase 3: project cards arrive in pairs ---------- */
      const span = (CARDS_END - CARDS_START) / pairCount;
      cardEls.forEach((card, i) => {
        const pair = Math.floor(i / 2);
        const a = CARDS_START + pair * span;
        const q = range(p, a, a + span);
        const isLast = pair === pairCount - 1;

        const inT = easeOut(range(q, 0, 0.18));
        const outT = isLast ? 0 : smooth(range(q, 0.82, 1));
        const opacity = clamp(inT * (1 - outT));
        const scale = lerp(0.82, 1, inT) * lerp(1, 1.08, outT);
        const y = lerp(70, -70, q);
        const baseRot = i % 2 === 0 ? -4 : 3;
        const rot = baseRot + (i % 2 === 0 ? 1 : -1) * q * 4;

        card.style.opacity = String(opacity);
        card.style.visibility = opacity < 0.01 ? "hidden" : "visible";
        card.style.transform = `translate3d(0,${y}px,0) rotate(${rot}deg) scale(${scale})`;
      });

      /* ---------- Counter ---------- */
      counter.style.opacity = String(smooth(range(p, INTRO_END, CARDS_START)));
      const current = clamp(
        Math.floor(((p - CARDS_START) / (CARDS_END - CARDS_START)) * pairCount),
        0,
        pairCount - 1
      );
      if (current !== lastPair) {
        lastPair = current;
        const first = current * 2 + 1;
        const second = Math.min(first + 1, projects.length);
        setPairLabel(
          first === second
            ? `${pad(first)} / ${pad(projects.length)}`
            : `${pad(first)}–${pad(second)} / ${pad(projects.length)}`
        );
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
  }, [pairCount, projects.length]);

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

        <div className="showcase-cards">
          {projects.map((project, i) => (
            <article
              key={project.title}
              className={`showcase-card ${i % 2 === 0 ? "slot-a" : "slot-b"}`}
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
                <span>{project.title.toLowerCase().replace(/\s+/g, "-")}</span>
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
        <p className="showcase-counter" aria-hidden="true">
          {pairLabel}
        </p>
      </div>
    </section>
  );
}