"use client";

import { useEffect, useRef } from "react";

type Doodle = {
  path: string;
  depth: number;
  delay: number;
};

function createRandom(seed: number) {
  let value = seed;

  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function createCornerPath(
  center: number,
  amplitude: number,
  waves: number,
  phase: number
) {
  const startY = -100;
  const span = 3400;
  const segments = Math.ceil(waves * 4);
  const step = span / segments;
  const frequency = (Math.PI * 2 * waves) / span;
  const xAt = (y: number) => center + Math.sin(y * frequency + phase) * amplitude;
  const slopeAt = (y: number) =>
    Math.cos(y * frequency + phase) * amplitude * frequency;
  let path = `M ${xAt(startY).toFixed(1)} ${startY}`;

  for (let segment = 0; segment < segments; segment += 1) {
    const y = startY + segment * step;
    const endY = y + step;
    const controlX1 = xAt(y) + slopeAt(y) * (step / 3);
    const controlX2 = xAt(endY) - slopeAt(endY) * (step / 3);

    path += ` C ${controlX1.toFixed(1)} ${(y + step / 3).toFixed(1)}, ${controlX2.toFixed(1)} ${(endY - step / 3).toFixed(1)}, ${xAt(endY).toFixed(1)} ${endY.toFixed(1)}`;
  }

  return path;
}

function createDoodles(): Doodle[] {
  const random = createRandom(48271);

  return Array.from({ length: 4 }, (_, index) => ({
    path: createCornerPath(
      120 + index * 400 + (random() - 0.5) * 100,
      130 + random() * 170,
      3 + random() * 1.6,
      random() * Math.PI * 2
    ),
    depth: 0.15 + random() * 0.35,
    delay: random() * 0.4,
  }));
}

const DOODLES = createDoodles();

export default function PageDoodles() {
  const doodlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = doodlesRef.current;
    const layers = root?.querySelectorAll<SVGGElement>("[data-depth]");

    if (!root || !layers?.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    function updateLayers() {
      layers?.forEach((layer) => {
        const depth = Number(layer.dataset.depth);
        layer.style.transform = `translate3d(${pointerX * depth}px, ${pointerY * depth}px, 0)`;
      });
      frame = 0;
    }

    function onPointerMove(event: PointerEvent) {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;

      pointerX = (event.clientX / window.innerWidth - 0.5) * 6;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 6;

      if (!frame) frame = window.requestAnimationFrame(updateLayers);
    }

    function resetLayers() {
      pointerX = 0;
      pointerY = 0;
      if (!frame) frame = window.requestAnimationFrame(updateLayers);
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", resetLayers);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", resetLayers);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={doodlesRef} className="page-doodles" aria-hidden="true">
      {DOODLES.map((doodle, index) => (
        <svg
          key={index}
          className="doodle-line"
          viewBox="0 0 1440 3200"
          preserveAspectRatio="none"
          style={{ animationDelay: `${doodle.delay}s` }}
        >
          <g data-depth={doodle.depth}>
            <path d={doodle.path} />
          </g>
        </svg>
      ))}
    </div>
  );
}
