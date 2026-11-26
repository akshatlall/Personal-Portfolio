"use client";

import { useEffect, useRef } from "react";
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

const LETTERS_PER_ROW = 26;

/* Scroll timeline (0 -> 1 across the pinned section) */
const INTRO_END = 0.14;   // pill expands into full wall
const ENTER_START = 0.08; // first cards begin entering
const ENTER_END = 0.22;   // entrance settled
const CARDS_START = 0.16; // carousel sweep starts
const CARDS_END = 0.88;   // carousel sweep finishes
const OUTRO_START = 0.89; // wall contracts back into pill & exits

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const range = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const smooth = (t: number) => t * t * (3 - 2 * t);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export default function ProjectsShowcase({ projects, word = "WORK" }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const countRef = useRef(projects.length);
  countRef.current = projects.length;

  const rows = word.toUpperCase().split("");

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
    const letters = Array.from(
      stage.querySelectorAll<HTMLElement>(".wall-row span")
    );

    if (!wall || !plane || !label || !ring) return;

    let rafId = 0;
    let smoothP: number | null = null;
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

      /* ---------- 1. Pill -> Full Wall -> Pill + Exit Up ---------- */
      const expandIn = smooth(range(p, 0, INTRO_END));
      const collapseOut = smooth(range(p, OUTRO_START, 0.985));
      const exitLift = smooth(range(p, 0.94, 1));
      const e = clamp(expandIn - collapseOut);

      const pillW = Math.min(185, W * 0.24);
      const pillH = Math.min(H * 0.78, 680);
      const insetX = lerp((W - pillW) / 2, 0, e);
      const insetY = lerp((H - pillH) / 2, 0, e);
      const radius = lerp(pillW / 2, 0, e);
      const wallLiftY = -exitLift * H * 1.05;

      wall!.style.clipPath = `inset(${insetY.toFixed(1)}px ${insetX.toFixed(
        1
      )}px ${insetY.toFixed(1)}px ${insetX.toFixed(1)}px round ${radius.toFixed(
        1
      )}px)`;
      wall!.style.transform = `translate3d(0, ${wallLiftY.toFixed(1)}px, 0)`;

      stage!.style.setProperty("--pw", `${pillW}px`);
      stage!.style.setProperty("--ph", `${pillH}px`);

      const pillChromeOpacity = (1 - smooth(range(e, 0.04, 0.45))) * (1 - exitLift);
      ring!.style.opacity = String(pillChromeOpacity);
      ring!.style.transform = `translate3d(-50%, calc(-50% + ${wallLiftY.toFixed(
        1
      )}px), 0)`;

      label!.style.opacity = String(
        (1 - smooth(range(e, 0.1, 0.55))) * (1 - exitLift)
      );
      label!.style.transform = `translate3d(-50%, calc(-50% + ${wallLiftY.toFixed(
        1
      )}px), 0) scale(${(1 + e * 0.35).toFixed(3)})`;

      /* ---------- 2. Cylindrical 4-Row WORK Wall ---------- */
      const planeScale = lerp(1.18, 1.06, smooth(range(p, 0, 0.6)));
      plane!.style.transform = `translate3d(0, 0, 0) scale(${planeScale.toFixed(
        3
      )})`;

      const letterOpacity = (
        smooth(range(e, 0.12, 0.65)) *
        (1 - exitLift * 0.7)
      ).toFixed(3);
      for (let i = 0; i < letters.length; i++) {
        letters[i].style.opacity = letterOpacity;
      }

      // Alternating horizontal drift + subtle cylindrical arc lift at edges
      const driftBase = (p - 0.5) * W * 0.42;
      for (let r = 0; r < rowEls.length; r++) {
        const dir = r % 2 === 0 ? 1 : -1;
        const rowX = dir * driftBase;
        // Parabolic upward curve toward left/right edges like a curved cylinder
        const normX = clamp(Math.abs(rowX) / Math.max(W * 0.25, 1), 0, 1.5);
        const arcY = -normX * normX * 14;
        rowEls[r].style.transform = `translate3d(${rowX.toFixed(
          1
        )}px, ${arcY.toFixed(1)}px, 0)`;
      }

      /* ---------- 3. Staggered High/Low Card Carousel ---------- */
      const cardW = cardEls[0]?.offsetWidth ?? Math.min(W * 0.44, 540);
      const spacing = cardW * 0.94;
      const denom = Math.max(totalItems - 1, 1);

      // Sweep cards across from right to left as scroll progresses
      const sweep = range(p, CARDS_START, CARDS_END);
      const centerIndex = sweep * denom;
      const enter = easeOut(range(p, ENTER_START, ENTER_END));
      const exit = 1 - smooth(range(p, OUTRO_START - 0.03, OUTRO_START + 0.05));

      for (let i = 0; i < cardEls.length; i++) {
        const card = cardEls[i];

        // Distance relative to current scroll position; shifts right-to-left as p increases
        const d = i - centerIndex;
        const ad = Math.abs(d);

        // Start offscreen right before entering, then glide smoothly across
        const entryOffset = (1 - enter) * (W * 0.65 + i * 120);
        const x = d * spacing + entryOffset;

        // Alternating top and bottom stagger like the video
        const isEven = i % 2 === 0;
        const baseY = isEven ? -H * 0.2 : H * 0.2;
        const y = baseY + d * (isEven ? -6 : 6);

        const rotZ = (isEven ? -1.4 : 1.4) + clamp(d, -2.5, 2.5) * 1.1;
        const rotY = clamp(d, -2.5, 2.5) * -7.5;
        const scale = lerp(0.92, 1.02, 1 - clamp(ad / 2.5)) * lerp(0.92, 1, enter);

        const visibilityFade = 1 - smooth(range(ad, 2.2, 3.1));
        const opacity = clamp(enter * exit * visibilityFade);

        card.style.opacity = opacity.toFixed(3);
        card.style.visibility = opacity < 0.01 ? "hidden" : "visible";
        card.style.zIndex = String(100 - Math.round(ad * 10));
        card.style.transform = `translate3d(-50%, -50%, 0) translate3d(${x.toFixed(
          1
        )}px, ${y.toFixed(1)}px, 0) rotate(${rotZ.toFixed(
          2
        )}deg) rotateY(${rotY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
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
        const factor = 1 - Math.exp(-12 * dt);
        smoothP += (targetP - smoothP) * factor;
        if (Math.abs(targetP - smoothP) < 0.0001) {
          smoothP = targetP;
        }
      }

      render(smoothP);

      if (Math.abs(targetP - smoothP) > 0.0001) {
        rafId = requestAnimationFrame(tick);
      }
    }

    function schedule() {
      if (!rafId) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(tick);
      }
    }

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

        {/* Grid background & vertical pill ring */}
        <div className="showcase-grid" aria-hidden="true" />
        <div className="work-pill-ring" aria-hidden="true" />

        {/* Wall of letters revealed through expanding pill */}
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

        {/* Vertical WORK label inside the pill */}
        <div className="work-label" aria-hidden="true">
          {rows.map((letter, i) => (
            <span key={i}>{letter}</span>
          ))}
        </div>

        {/* Clean frameless project cards */}
        <div className="showcase-cards">
          {projects.map((project, i) => (
            <article
              key={`${project.title}-${i}`}
              className="showcase-card"
              onClick={() => goTo(i)}
              aria-label={project.title}
              style={
                {
                  "--card-shadow": SHADOWS[i % SHADOWS.length],
                } as React.CSSProperties
              }
            >
              <div className="showcase-art">
                <ProjectArtwork type={project.artwork} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}