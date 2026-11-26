"use client";

import Link from "next/link";
import { FastForward, SquareArrowDownRight } from "lucide-react";
import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  alpha: number;
  speed: number;
  twinklePhase: number;
  hue: string;
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const starCount = Math.min(180, Math.floor((width * height) / 7500));
    const hues = ["#ffffff", "#d1c8ff", "#9db4ff", "#eae5df"];

    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.7 + 0.4,
      alpha: Math.random() * 0.7 + 0.2,
      speed: Math.random() * 0.18 + 0.04,
      twinklePhase: Math.random() * Math.PI * 2,
      hue: hues[Math.floor(Math.random() * hues.length)],
    }));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    let tick = 0;
    const render = () => {
      tick += 0.015;
      ctx.clearRect(0, 0, width, height);

      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.42,
        40,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.85
      );
      bgGrad.addColorStop(0, "#151030");
      bgGrad.addColorStop(0.45, "#09061a");
      bgGrad.addColorStop(1, "#04020e");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx > 0 && my > 0) {
        const glow = ctx.createRadialGradient(mx, my, 0, mx, my, 240);
        glow.addColorStop(0, "rgba(209, 200, 255, 0.10)");
        glow.addColorStop(0.5, "rgba(118, 53, 204, 0.04)");
        glow.addColorStop(1, "rgba(4, 2, 14, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      }

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.y -= s.speed;
        if (s.y < -4) {
          s.y = height + 4;
          s.x = Math.random() * width;
        }

        const twinkle =
          0.65 + 0.35 * Math.sin(tick * 2 + s.twinklePhase);
        ctx.globalAlpha = s.alpha * twinkle;
        ctx.fillStyle = s.hue;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        const dx = s.x - mx;
        const dy = s.y - my;
        const dist = Math.hypot(dx, dy);
        if (dist < 130) {
          ctx.globalAlpha = (1 - dist / 130) * 0.25;
          ctx.strokeStyle = "#d1c8ff";
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(mx, my);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#04020e] text-[#e6e6e6]"
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-[480px] w-[480px] sm:h-[680px] sm:w-[680px] rounded-full border border-[#d1c8ff]/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-[340px] w-[340px] sm:h-[500px] sm:w-[500px] rounded-full border border-dashed border-[#7635cc]/15"
      />

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <div className="font-serif-accent italic text-[14px] sm:text-[20px] mb-4 text-[#d1c8ff]/90 tracking-wide">
          Engineer · Builder · Designer
        </div>

        <div className="flex flex-col items-center font-heading text-[44px] leading-[46px] sm:text-[86px] sm:leading-[88px] md:text-[112px] md:leading-[112px] tracking-tight select-none">
          <div className="text-[#e6e6e6]/40">AKSHAT LAL</div>

          <a href="#about" aria-label="Scroll to About section">
            <div className="group flex flex-row items-center justify-center cursor-pointer">
              <div className="text-[52px] sm:text-[98px] md:text-[128px] text-[#eae5df] text-glow transition-transform duration-300 sm:group-hover:-translate-x-10">
                AKSHAT LAL
              </div>
              <div className="hidden group-hover:flex items-center transition-all duration-300 -translate-x-4 translate-y-1">
                <FastForward className="h-14 w-14 md:h-20 md:w-20 text-[#d1c8ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </a>

          <div className="text-[#e6e6e6]/40">AKSHAT LAL</div>
        </div>

        <div className="font-serif-accent italic text-[14px] sm:text-[20px] mt-6 text-[#eae5df]/90">
          Computer Engineering Student
        </div>
        <div className="font-serif-accent italic text-[14px] sm:text-[20px] text-[#d1c8ff]/80">
          University of Waterloo · Seeking Spring 2027 Co-op
        </div>
      </div>

      <Link
        href="/virtual"
        className="group absolute bottom-6 right-6 z-20 flex flex-col items-center justify-center text-[#eae5df] transition-colors hover:text-[#d1c8ff]"
      >
        <SquareArrowDownRight className="h-12 w-12 sm:h-[70px] sm:w-[70px] animate-wiggle stroke-1" />
        <span className="mt-1 text-xs sm:text-base font-medium tracking-wide">
          Click me!
        </span>
      </Link>
    </section>
  );
}
