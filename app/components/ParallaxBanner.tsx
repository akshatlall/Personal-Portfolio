"use client";

import { useEffect, useRef, useState } from "react";

export default function ParallaxBanner() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setOffset(-rect.top);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div id="projects" className="pt-8">
      <section
        ref={sectionRef}
        className="relative flex h-[48vw] max-h-[520px] min-h-[260px] w-full items-center justify-center overflow-hidden bg-[#04020e]"
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#04020e] via-[#130d2e] to-[#04020e]"
          style={{ transform: `translateY(${Math.max(0, offset * 0.15)}px)` }}
        />

        <div
          className="absolute top-[16%] right-[22%] h-16 w-16 sm:h-28 sm:w-28 rounded-full bg-gradient-to-br from-[#eae5df] via-[#d1c8ff] to-[#6d3fd1] opacity-80 blur-[1px] shadow-[0_0_60px_rgba(209,200,255,0.45)]"
          style={{
            transform: `translate(${offset * 0.18}px, ${offset * -0.14}px)`,
          }}
        />

        <svg
          viewBox="0 0 1440 400"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 h-full w-full"
          style={{ transform: `translateX(${Math.min(0, offset * -0.2)}px)` }}
          aria-hidden="true"
        >
          <path
            d="M0,260 Q240,140 520,230 T1040,180 T1440,240 L1440,400 L0,400 Z"
            fill="#191236"
            fillOpacity="0.85"
          />
        </svg>

        <svg
          viewBox="0 0 1440 400"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 h-full w-full"
          style={{ transform: `translateX(${Math.max(0, offset * 0.18)}px)` }}
          aria-hidden="true"
        >
          <path
            d="M0,310 Q320,210 680,290 T1200,230 T1440,290 L1440,400 L0,400 Z"
            fill="#100b24"
            fillOpacity="0.95"
          />
        </svg>

        <svg
          viewBox="0 0 1440 400"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 h-full w-full"
          aria-hidden="true"
        >
          <path
            d="M0,355 Q360,295 760,345 T1440,320 L1440,400 L0,400 Z"
            fill="#04020e"
          />
        </svg>

        <h1 className="text-glow relative z-10 font-serif-accent text-4xl sm:text-7xl font-bold italic text-white tracking-tight">
          Projects
        </h1>
      </section>
    </div>
  );
}
