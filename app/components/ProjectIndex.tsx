"use client";

import { useEffect, useRef, useState } from "react";
import ProjectArtwork from "./ProjectArtwork";

type Project = {
  title: string;
  date: string;
  summary: string;
  description: string;
  tags: string[];
  artwork: React.ComponentProps<typeof ProjectArtwork>["type"];
};

// Keep in sync with .pf-preview in home.css
const PREVIEW_W = 360;
const PREVIEW_H = 225;

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export default function ProjectIndex({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [shown, setShown] = useState(0);

  const previewRef = useRef<HTMLDivElement>(null);
  const canFollow = useRef(false);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const hoverRef = useRef<number | null>(null);
  const raf = useRef(0);

  useEffect(() => {
    canFollow.current =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return () => cancelAnimationFrame(raf.current);
  }, []);

  function place(x: number, y: number) {
    let px = x + 28;
    if (px + PREVIEW_W > window.innerWidth - 16) px = x - PREVIEW_W - 28;
    const py = clamp(y - PREVIEW_H / 2, 16, window.innerHeight - PREVIEW_H - 16);
    target.current = { x: px, y: py };
  }

  function tick() {
    const el = previewRef.current;
    if (!el) {
      raf.current = 0;
      return;
    }

    const t = target.current;
    const c = current.current;
    const dx = t.x - c.x;
    const dy = t.y - c.y;

    c.x += dx * 0.16;
    c.y += dy * 0.16;

    // A little lean in the direction of travel
    const skew = clamp(dx * 0.045, -7, 7);
    el.style.transform = `translate3d(${c.x.toFixed(1)}px, ${c.y.toFixed(
      1
    )}px, 0) rotate(${(skew * 0.5).toFixed(2)}deg) skewX(${(-skew).toFixed(
      2
    )}deg)`;

    if (hoverRef.current !== null || Math.abs(dx) + Math.abs(dy) > 0.5) {
      raf.current = requestAnimationFrame(tick);
    } else {
      raf.current = 0;
    }
  }

  function run() {
    if (!raf.current) raf.current = requestAnimationFrame(tick);
  }

  function show(index: number, x: number, y: number) {
    if (!canFollow.current) return;

    const wasHidden = hoverRef.current === null;
    hoverRef.current = index;
    place(x, y);
    if (wasHidden) current.current = { ...target.current };

    setShown(index);
    setHover(index);
    run();
  }

  function hide() {
    hoverRef.current = null;
    setHover(null);
  }

  const previewOn = hover !== null && hover !== open;

  return (
    <>
      <ul
        className="pf-list"
        onMouseMove={(e) => {
          if (hoverRef.current !== null) {
            place(e.clientX, e.clientY);
            run();
          }
        }}
        onMouseLeave={hide}
      >
        {projects.map((project, i) => {
          const isOpen = open === i;
          const isDim = hover !== null && hover !== i;
          const panelId = `project-panel-${i}`;

          return (
            <li
              key={project.title}
              className={`pf-row${isOpen ? " is-open" : ""}${
                isDim ? " is-dim" : ""
              }`}
              data-reveal
            >
              <button
                type="button"
                className="pf-row-head"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                onMouseEnter={(e) => show(i, e.clientX, e.clientY)}
                onFocus={(e) => {
                  if (!e.currentTarget.matches(":focus-visible")) return;
                  const r = e.currentTarget.getBoundingClientRect();
                  show(i, r.left + r.width * 0.55, r.top + r.height / 2);
                }}
                onBlur={hide}
              >
                <span className="pf-row-date">{project.date}</span>

                <span className="pf-row-main">
                  <span className="pf-row-title">{project.title}</span>
                  <span className="pf-row-summary">{project.summary}</span>
                </span>

                <span className="pf-row-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </span>

                <span className="pf-row-icon" aria-hidden="true" />
              </button>

              <div
                className="pf-row-panel"
                id={panelId}
                role="region"
                aria-hidden={!isOpen}
              >
                <div className="pf-row-panel-inner">
                  <div className="pf-row-body">
                    {/* Shown on touch / small screens, where there is no hover preview */}
                    <div className="pf-row-art">
                      <ProjectArtwork type={project.artwork} />
                    </div>

                    <p>{project.description}</p>

                    <div className="pf-panel-tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Cursor-following preview (desktop only) */}
      <div
        ref={previewRef}
        className={`pf-preview${previewOn ? " is-on" : ""}`}
        aria-hidden="true"
      >
        <div className="pf-preview-card">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`pf-preview-layer${shown === i ? " is-on" : ""}`}
            >
              <ProjectArtwork type={project.artwork} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}