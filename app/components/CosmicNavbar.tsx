"use client";

import Link from "next/link";
import { Menu, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Thoughts", href: "/thoughts", isRoute: true },
  { label: "Virtual", href: "/virtual", isRoute: true },
];

export default function CosmicNavbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  function toggleAmbientSound() {
    if (!soundOn) {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (!audioCtxRef.current) {
          const ctx = new AudioCtx();
          const masterGain = ctx.createGain();
          masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
          masterGain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 1.2);
          masterGain.connect(ctx.destination);

          const freqs = [110, 164.81, 246.94, 277.18];
          freqs.forEach((f, idx) => {
            const osc = ctx.createOscillator();
            osc.type = idx % 2 === 0 ? "sine" : "triangle";
            osc.frequency.setValueAtTime(f, ctx.currentTime);

            const oscGain = ctx.createGain();
            oscGain.gain.setValueAtTime(0.25 / freqs.length, ctx.currentTime);

            osc.connect(oscGain);
            oscGain.connect(masterGain);
            osc.start();
          });

          audioCtxRef.current = ctx;
          gainRef.current = masterGain;
        } else {
          if (audioCtxRef.current.state === "suspended") {
            audioCtxRef.current.resume();
          }
          if (gainRef.current) {
            gainRef.current.gain.setTargetAtTime(
              0.035,
              audioCtxRef.current.currentTime,
              0.3
            );
          }
        }
        setSoundOn(true);
      } catch {
        setSoundOn(false);
      }
    } else {
      if (audioCtxRef.current && gainRef.current) {
        gainRef.current.gain.setTargetAtTime(
          0.0001,
          audioCtxRef.current.currentTime,
          0.2
        );
      }
      setSoundOn(false);
    }
  }

  return (
    <header className="fixed top-0 left-0 z-[999] flex h-[60px] w-full items-center justify-center bg-[#14102c]/85 px-6 text-[#e6e6e6] shadow-lg shadow-black/30 backdrop-blur-md border-b border-white/5">
      <a
        href="#home"
        className="font-heading absolute left-6 sm:left-14 text-[18px] tracking-tight transition-colors hover:italic hover:text-[#d1c8ff]"
      >
        Akshat Lal
      </a>

      <nav
        aria-label="Primary navigation"
        className="hidden sm:flex flex-row items-center gap-7 text-[14px] font-medium"
      >
        {NAV_ITEMS.map((item) =>
          item.isRoute ? (
            <Link
              key={item.label}
              href={item.href}
              className="cursor-pointer transition-all hover:italic hover:text-[#d1c8ff]"
            >
              {item.label}
            </Link>
          ) : (
            <a
              key={item.label}
              href={item.href}
              className="cursor-pointer transition-all hover:italic hover:text-[#d1c8ff]"
            >
              {item.label}
            </a>
          )
        )}
      </nav>

      <div className="absolute right-6 sm:right-14 flex items-center gap-4">
        <button
          type="button"
          onClick={toggleAmbientSound}
          aria-label={soundOn ? "Mute ambient sound" : "Play ambient sound"}
          title={soundOn ? "Mute ambient synth" : "Play ambient synth"}
          className="cursor-pointer text-[#e6e6e6]/80 transition-colors hover:text-[#d1c8ff]"
        >
          {soundOn ? (
            <Volume2 className="h-5 w-5 text-[#d1c8ff]" />
          ) : (
            <VolumeX className="h-5 w-5" />
          )}
        </button>

        <button
          type="button"
          className="sm:hidden cursor-pointer text-[#e6e6e6] hover:text-[#d1c8ff]"
          aria-label={openMenu ? "Close menu" : "Open menu"}
          onClick={() => setOpenMenu((prev) => !prev)}
        >
          {openMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {openMenu && (
        <div className="sm:hidden fixed top-[68px] right-4 flex flex-col gap-2 rounded-xl border border-[#292442] bg-[#1a1536]/95 px-6 py-4 text-base text-[#e6e6e6] shadow-2xl backdrop-blur-md">
          {NAV_ITEMS.map((item, idx) =>
            item.isRoute ? (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpenMenu(false)}
                className="transition-colors hover:italic hover:text-[#d1c8ff]"
              >
                <span className="font-serif-accent italic font-bold text-[#d1c8ff]">
                  {idx + 1}.
                </span>{" "}
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpenMenu(false)}
                className="transition-colors hover:italic hover:text-[#d1c8ff]"
              >
                <span className="font-serif-accent italic font-bold text-[#d1c8ff]">
                  {idx + 1}.
                </span>{" "}
                {item.label}
              </a>
            )
          )}
        </div>
      )}
    </header>
  );
}
