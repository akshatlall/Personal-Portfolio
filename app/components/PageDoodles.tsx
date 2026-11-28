"use client";

import { useEffect, useRef } from "react";

type Doodle = {
  top: number;
  left: number;
  width: number;
  rotation: number;
  delay: number;
  depth: number;
  path: string;
};

function createRandom(seed: number) {
  let value = seed;

  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function createSquiggle(random: () => number) {
  const amplitude = 16 + random() * 28;
  let y = 40 + random() * 60;
  let path = `M -16 ${y.toFixed(1)}`;

  for (let segment = 0; segment < 3; segment += 1) {
    const startX = segment * 140 - 16;
    const endY = Math.max(
      18,
      Math.min(122, y + (random() - 0.5) * amplitude * 2.8)
    );
    const controlY1 = Math.max(
      12,
      Math.min(128, y + (random() - 0.5) * amplitude * 2.4)
    );
    const controlY2 = Math.max(
      12,
      Math.min(128, endY + (random() - 0.5) * amplitude * 2.4)
    );

    path += ` C ${(startX + 46).toFixed(1)} ${controlY1.toFixed(1)}, ${(startX + 94).toFixed(1)} ${controlY2.toFixed(1)}, ${(startX + 140).toFixed(1)} ${endY.toFixed(1)}`;
    y = endY;
  }

  return path;
}

function createDoodles(): Doodle[] {
  const random = createRandom(48271);
  const count = 22;

  return Array.from({ length: count }, (_, index) => {
    const band = index % 6;

    return {
      top: 2 + (index * 96) / (count - 1) + (random() - 0.5) * 2.5,
      left: Math.max(0, Math.min(86, band * 16 + (random() - 0.5) * 12)),
      width: 240 + random() * 520,
      rotation: (random() - 0.5) * 18,
      delay: random() * 0.65,
      depth: 0.15 + random() * 0.55,
      path: createSquiggle(random),
    };
  });
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

      pointerX = (event.clientX / window.innerWidth - 0.5) * 12;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 12;

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
          className={`doodle-line${index % 5 === 2 ? " doodle-line-accent" : ""}`}
          viewBox="0 0 404 140"
          preserveAspectRatio="none"
          style={{
            top: `${doodle.top}%`,
            left: `${doodle.left}%`,
            width: `${doodle.width}px`,
            animationDelay: `${doodle.delay}s`,
            transform: `rotate(${doodle.rotation}deg)`,
          }}
        >
          <g data-depth={doodle.depth}>
            <path d={doodle.path} />
          </g>
        </svg>
      ))}
    </div>
  );
}
