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

const LETTERS_PER_ROW = 26;

/* Scroll timeline (0 -> 1 across the pinned section) */
const PILL_IN_END = 0.06;   // vertical pill rises into center
const WALL_OPEN_END = 0.14; // pill expands into full wall
const FLOW_START = 0.11;    // first card flows in from the right
const FLOW_END = 0.88;      // last card finishes sweeping across
const WALL_CLOSE_START = 0.89;
const WALL_CLOSE_END = 0.95; // wall contracts back into vertical pill
const EXIT_UP_END = 1.0;     // pill slides upward out of view

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
      FLOW_START +
      (totalItems > 1 ? target / (totalItems - 1) : 0) * (FLOW_END - FLOW_START);

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

      /* ---------- 1. Pill Rise -> Wall Expand -> Pill Collapse -> Slide Up ---------- */
      const pillRise = easeOut(range(p, 0, PILL_IN_END));
      const openWall = smooth(range(p, PILL_IN_END * 0.65, WALL_OPEN_END));
      const closeWall = smooth(range(p, WALL_CLOSE_START, WALL_CLOSE_END));
      const exitUp = smooth(range(p, WALL_CLOSE_END, EXIT_UP_END));

      const wallSpread = clamp(openWall - closeWall);

      const pillW = Math.min(184, W * 0.22);
      const pillH = Math.min(H * 0.78, 660);

      const insetX = lerp((W - pillW) / 2, 0, wallSpread);
      const insetY = lerp((H - pillH) / 2, 0, wallSpread);
      const radius = lerp(pillW / 2, 0, wallSpread);

      const enterOffsetY = (1 - pillRise) * H * 0.65;
      const exitOffsetY = -exitUp * H * 1.1;
      const stageOffsetY = enterOffsetY + exitOffsetY;

      wall!.style.clipPath = `inset(${insetY.toFixed(1)}px ${insetX.toFixed(
        1
      )}px ${insetY.toFixed(1)}px ${insetX.toFixed(1)}px round ${radius.toFixed(
        1
      )}px)`;
      wall!.style.transform = `translate3d(0, ${stageOffsetY.toFixed(1)}px, 0)`;

      stage!.style.setProperty("--pw", `${pillW}px`);
      stage!.style.setProperty("--ph", `${pillH}px`);

      const pillChromeVisible =
        pillRise * (1 - smooth(range(wallSpread, 0.05, 0.45))) * (1 - exitUp);

      ring!.style.opacity = pillChromeVisible.toFixed(3);
      ring!.style.transform = `translate3d(-50%, calc(-50% + ${stageOffsetY.toFixed(
        1
      )}px), 0)`;

      label!.style.opacity = (
        pillRise *
        (1 - smooth(range(wallSpread, 0.1, 0.55))) *
        (1 - exitUp)
      ).toFixed(3);
      label!.style.transform = `translate3d(-50%, calc(-50% + ${stageOffsetY.toFixed(
        1
      )}px), 0) scale(${(1 + wallSpread * 0.3).toFixed(3)})`;

      /* ---------- 2. Cylindrical WORK Wall Rows ---------- */
      const planeScale = lerp(1.14, 1.05, smooth(range(p, WALL_OPEN_END, 0.9)));
      plane!.style.transform = `translate3d(0, 0, 0) scale(${planeScale.toFixed(
        3
      )})`;

      const wallLetterOpacity = (
        smooth(range(wallSpread, 0.15, 0.7)) *
        (1 - exitUp)
      ).toFixed(3);
      for (let i = 0; i < letters.length; i++) {
        letters[i].style.opacity = wallLetterOpacity;
      }

      // Opposite horizontal drift per row + gentle upward arc near left/right edges
      const progressNorm = range(p, WALL_OPEN_END * 0.5, WALL_CLOSE_END);
      const driftTravel = (progressNorm - 0.5) * W * 0.48;

      for (let r = 0; r < rowEls.length; r++) {
        const dir = r % 2 === 0 ? -1 : 1;
        const rowX = dir * driftTravel;
        const edgeFactor = clamp(Math.abs(rowX) / Math.max(W * 0.24, 1), 0, 1.4);
        const arcLiftY = -edgeFactor * edgeFactor * 16;
        rowEls[r].style.transform = `translate3d(${rowX.toFixed(
          1
        )}px, ${arcLiftY.toFixed(1)}px, 0)`;
      }

      /* ---------- 3. Separated Upper/Lower Cards Flowing Smoothly ---------- */
      const cardW = cardEls[0]?.offsetWidth ?? Math.min(W * 0.43, 540);
      const laneGapX = cardW * 1.04;
      const denom = Math.max(totalItems - 1, 1);

      // Flow progress moves cards from right to left across the viewport
      const flowT = range(p, FLOW_START, FLOW_END);
      const headIndex = flowT * denom;
      const fadeOutAll = 1 - smooth(range(p, WALL_CLOSE_START - 0.02, WALL_CLOSE_START + 0.05));

      for (let i = 0; i < cardEls.length; i++) {
        const card = cardEls[i];
        const isTopLane = i % 2 === 0;

        // Position card `i` relative to the active scroll window:
        // When `headIndex === i`, card `i` sits near the right-center and flows left as `headIndex` increases.
        const rel = i - headIndex;

        // Smooth continuous x from right offscreen (+W * 0.78) to left offscreen (-W * 0.95)
        const x = rel * laneGapX + W * 0.14;

        // Distinct upper and lower vertical separation like the video
        const laneY = isTopLane ? -H * 0.215 : H * 0.215;
        const subtleWaveY = Math.sin(rel * 0.7) * 6;
        const y = laneY + subtleWaveY;

        // Slight counter-rotation & subtle 3D depth for organic flow
        const rotZ = (isTopLane ? -1.2 : 1.2) + clamp(rel, -2.5, 2.5) * 0.9;
        const rotY = clamp(rel, -2.5, 2.5) * -6;
        const scale = lerp(0.95, 1.02, 1 - clamp(Math.abs(rel) / 2.2));

        // Smooth entry from right & smooth exit to left
        const enterSmooth = smooth(range(x, W * 0.85, W * 0.42));
        const exitSmooth = 1 - smooth(range(x, -W * 0.42, -W * 0.85));
        const cardOpacity = clamp(enterSmooth * exitSmooth * fadeOutAll);

        card.style.opacity = cardOpacity.toFixed(3);
        card.style.visibility = cardOpacity < 0.01 ? "hidden" : "visible";
        card.style.zIndex = String(100 + i);
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
        const factor = 1 - Math.exp(-11 * dt);
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

        <div className="showcase-grid" aria-hidden="true" />
        <div className="work-pill-ring" aria-hidden="true" />

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

        <div className="work-label" aria-hidden="true">
          {rows.map((letter, i) => (
            <span key={i}>{letter}</span>
          ))}
        </div>

        <div className="showcase-cards">
          {projects.map((project, i) => (
            <article
              key={`${project.title}-${i}`}
              className="showcase-card"
              onClick={() => goTo(i)}
              aria-label={project.title}
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