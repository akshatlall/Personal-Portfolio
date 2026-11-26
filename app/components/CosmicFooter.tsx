"use client";

import Link from "next/link";
import { useState } from "react";
import { EMAIL, LINKS } from "../portfolio-data";

export default function CosmicFooter() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(EMAIL);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  }

  return (
    <footer className="relative w-full overflow-hidden rounded-t-[2rem] bg-[#1e1a30] cosmic-noise px-8 pt-12 pb-8 sm:px-20 sm:pt-16">
      <h2 className="font-heading text-4xl sm:text-7xl md:text-8xl tracking-tight text-[#eae5df] not-italic">
        Akshat <span className="italic text-[#e6e6e6]/45">Lal</span>
      </h2>

      <div className="relative flex flex-row flex-wrap gap-10 sm:gap-20 md:gap-28 pt-8 pb-10">
        <div className="flex flex-col gap-1.5">
          <div className="font-serif-accent text-sm sm:text-xl italic font-bold text-[#d1c8ff]">
            Social &amp; Links
          </div>
          <a
            href={LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-base text-gray-300 transition-all hover:italic hover:text-[#d1c8ff]"
          >
            1. LinkedIn
          </a>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-base text-gray-300 transition-all hover:italic hover:text-[#d1c8ff]"
          >
            2. GitHub
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="cursor-pointer text-left text-xs sm:text-base text-gray-300 transition-all hover:italic hover:text-[#d1c8ff]"
          >
            {copied ? `3. Copied (${EMAIL})` : "3. Email"}
          </button>
          <a
            href={LINKS.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-base text-gray-300 transition-all hover:italic hover:text-[#d1c8ff]"
          >
            4. Resume
          </a>
        </div>

        <div className="hidden sm:flex flex-col gap-1.5">
          <div className="font-serif-accent text-sm sm:text-xl italic font-bold text-[#d1c8ff]">
            Navigate
          </div>
          <a
            href="#home"
            className="text-xs sm:text-base text-gray-300 transition-all hover:italic hover:text-[#d1c8ff]"
          >
            1. Home
          </a>
          <a
            href="#about"
            className="text-xs sm:text-base text-gray-300 transition-all hover:italic hover:text-[#d1c8ff]"
          >
            2. About
          </a>
          <a
            href="#experience"
            className="text-xs sm:text-base text-gray-300 transition-all hover:italic hover:text-[#d1c8ff]"
          >
            3. Experience
          </a>
          <a
            href="#projects"
            className="text-xs sm:text-base text-gray-300 transition-all hover:italic hover:text-[#d1c8ff]"
          >
            4. Projects
          </a>
          <Link
            href="/thoughts"
            className="text-xs sm:text-base text-gray-300 transition-all hover:italic hover:text-[#d1c8ff]"
          >
            5. Thoughts
          </Link>
          <Link
            href="/virtual"
            className="text-xs sm:text-base text-gray-300 transition-all hover:italic hover:text-[#d1c8ff]"
          >
            6. Virtual OS
          </Link>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="font-serif-accent text-sm sm:text-xl italic font-bold text-[#d1c8ff]">
            Elsewhere
          </div>
          <Link
            href="/contact"
            className="text-xs sm:text-base text-gray-300 transition-all hover:italic hover:text-[#d1c8ff]"
          >
            1. Contact Page
          </Link>
          <span className="text-xs sm:text-base text-gray-400">
            2. UWaterloo CE &apos;31
          </span>
          <span className="text-xs sm:text-base text-gray-400">
            3. Spring 2027 Co-op
          </span>
        </div>

        <svg
          viewBox="0 0 180 180"
          className="pointer-events-none hidden md:block absolute right-0 bottom-0 h-44 w-44 opacity-25"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="110" cy="110" r="65" stroke="#d1c8ff" strokeDasharray="3 5" />
          <circle cx="110" cy="110" r="42" stroke="#9284d9" />
          <circle cx="110" cy="110" r="6" fill="#d1c8ff" />
          <circle cx="68" cy="70" r="3" fill="#eae5df" />
          <circle cx="152" cy="84" r="3" fill="#eae5df" />
          <path d="M68 70 L110 110 L152 84" stroke="#d1c8ff" strokeOpacity="0.6" />
        </svg>
      </div>

      <hr className="mb-3 border-t border-white/10" />
      <p className="text-xs sm:text-sm text-gray-400">
        Made with ♡ | Akshat Lal © 2026
      </p>
    </footer>
  );
}
