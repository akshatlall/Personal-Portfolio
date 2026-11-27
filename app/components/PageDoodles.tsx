"use client";

import { useEffect, useRef } from "react";

const PATHS = [
  {
    depth: 0.7,
    d: "M80 -80 C390 110 1120 75 1310 350 C1490 610 1030 730 690 760 C350 790 120 980 240 1190 C365 1405 1045 1320 1210 1555 C1365 1770 1000 2030 660 2250",
  },
  {
    depth: 0.45,
    d: "M1450 -100 C1130 120 380 155 180 410 C-15 655 430 755 775 845 C1100 930 1360 1090 1190 1290 C1020 1495 380 1480 205 1710 C45 1925 410 2110 785 2300",
  },
  {
    depth: 0.25,
    d: "M-80 250 C260 90 510 290 730 390 C1010 520 1320 460 1500 650 C1660 820 1340 970 1080 1040 C770 1125 580 1275 670 1460 C780 1690 1330 1710 1510 1930 C1640 2090 1370 2220 1110 2330",
  },
] as const;

export default function PageDoodles() {
  const doodlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = doodlesRef.current;
    const layers = root?.querySelectorAll<SVGGElement>("[data-depth]");

    if (!root || !layers?.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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

      pointerX = (event.clientX / window.innerWidth - 0.5) * 9;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 9;

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
      {PATHS.map(({ depth, d }, index) => (
        <svg
          key={index}
          className={`doodle-line doodle-line-${index + 1}`}
          viewBox="0 0 1440 2300"
          preserveAspectRatio="none"
        >
          <g data-depth={depth}>
            <path d={d} />
          </g>
        </svg>
      ))}
    </div>
  );
}
