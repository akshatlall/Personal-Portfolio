"use client";

import Link from "next/link";
import { BookOpen, Check, Cpu, FileText, Mail } from "lucide-react";
import { useState } from "react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { EMAIL, LINKS } from "../portfolio-data";

export default function AboutSection() {
  const [copied, setCopied] = useState(false);

  async function handleCopyEmail() {
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
    <section
      id="about"
      className="relative flex min-h-screen w-full items-center justify-center bg-[#04020e] px-6 py-24 sm:px-16"
    >
      <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-center gap-10 md:flex-row md:gap-16">
        <div className="relative flex w-full max-w-[360px] shrink-0 items-center justify-center">
          <div className="group relative w-full overflow-hidden rounded-2xl border border-[#d1c8ff]/20 bg-gradient-to-b from-[#1a1435] via-[#0d0a1f] to-[#04020e] p-6 shadow-2xl shadow-[#7635cc]/15 transition-transform duration-500 hover:-translate-y-1">
            <svg
              viewBox="0 0 320 360"
              className="w-full h-auto"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="coreGlow" cx="50%" cy="46%" r="50%">
                  <stop offset="0%" stopColor="#d1c8ff" stopOpacity="0.35" />
                  <stop offset="60%" stopColor="#7635cc" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#04020e" stopOpacity="0" />
                </radialGradient>
              </defs>

              <rect width="320" height="360" rx="14" fill="#070514" />
              <circle cx="160" cy="160" r="130" fill="url(#coreGlow)" />

              <circle
                cx="160"
                cy="160"
                r="105"
                stroke="#d1c8ff"
                strokeOpacity="0.18"
                strokeDasharray="4 6"
              />
              <circle
                cx="160"
                cy="160"
                r="74"
                stroke="#9284d9"
                strokeOpacity="0.28"
              />

              <path
                d="M28 64 H88 L112 88 M292 64 H232 L208 88 M28 256 H88 L112 232 M292 256 H232 L208 232"
                stroke="#d1c8ff"
                strokeOpacity="0.25"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="28" cy="64" r="3.5" fill="#d1c8ff" fillOpacity="0.6" />
              <circle cx="292" cy="64" r="3.5" fill="#d1c8ff" fillOpacity="0.6" />
              <circle cx="28" cy="256" r="3.5" fill="#d1c8ff" fillOpacity="0.6" />
              <circle cx="292" cy="256" r="3.5" fill="#d1c8ff" fillOpacity="0.6" />

              <rect
                x="118"
                y="118"
                width="84"
                height="84"
                rx="16"
                fill="#14102c"
                stroke="#d1c8ff"
                strokeOpacity="0.5"
                strokeWidth="1.5"
              />
              <text
                x="160"
                y="168"
                textAnchor="middle"
                fill="#eae5df"
                fontSize="30"
                fontWeight="800"
                fontFamily="Georgia, serif"
              >
                AL
              </text>

              <text
                x="24"
                y="324"
                fill="#9284d9"
                fontSize="11"
                fontFamily="monospace"
              >
                43.4723° N, 80.5449° W
              </text>
              <text
                x="296"
                y="324"
                textAnchor="end"
                fill="#d1c8ff"
                fontSize="11"
                fontFamily="monospace"
              >
                CE &apos;31
              </text>
            </svg>

            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-gray-400">
              <span className="flex items-center gap-1.5 text-[#d1c8ff]">
                <Cpu className="h-3.5 w-3.5" />
                Hardware × Software
              </span>
              <span className="font-mono-code">Waterloo, ON</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <h2 className="mb-3 font-serif-accent text-2xl sm:text-3xl font-bold italic text-[#d1c8ff]">
            About me
          </h2>

          <p className="mb-3 text-sm sm:text-lg leading-relaxed text-[#eae5df]">
            Hi! My name is Akshat. I am a{" "}
            <span className="font-serif-accent font-bold italic text-white">
              Computer Engineering
            </span>{" "}
            student at the{" "}
            <span className="font-serif-accent font-bold italic text-white">
              University of Waterloo
            </span>
            , graduating 2031.
          </p>

          <p className="mb-3 text-sm sm:text-lg leading-relaxed text-[#eae5df]/90">
            I love building at the intersection of{" "}
            <span className="group relative inline-block font-serif-accent font-bold italic text-[#d1c8ff] cursor-default">
              VEX Robotics
              <span className="pointer-events-none absolute left-0 top-7 z-30 hidden w-56 rounded-lg border border-[#d1c8ff]/30 bg-[#14102c] p-3 text-xs font-sans font-normal not-italic text-[#eae5df] shadow-xl group-hover:block">
                4 consecutive seasons — progressing from member to Team Lead
                directing design, build, and test.
              </span>
            </span>
            ,{" "}
            <span className="group relative inline-block font-serif-accent font-bold italic text-[#d1c8ff] cursor-default">
              Altium PCBs
              <span className="pointer-events-none absolute left-0 top-7 z-30 hidden w-56 rounded-lg border border-[#d1c8ff]/30 bg-[#14102c] p-3 text-xs font-sans font-normal not-italic text-[#eae5df] shadow-xl group-hover:block">
                Designing onboard vehicle electronics and robotic-arm subsystem
                boards on the Student Design Team.
              </span>
            </span>
            , and{" "}
            <span className="group relative inline-block font-serif-accent font-bold italic text-[#d1c8ff] cursor-default">
              chess engines
              <span className="pointer-events-none absolute left-0 top-7 z-30 hidden w-56 rounded-lg border border-[#d1c8ff]/30 bg-[#14102c] p-3 text-xs font-sans font-normal not-italic text-[#eae5df] shadow-xl group-hover:block">
                Built Caissa in C# from scratch with Standard, Chess960, and
                Atomic rules plus an AI opponent.
              </span>
            </span>
            . Currently seeking{" "}
            <span className="font-serif-accent font-bold italic text-[#d1c8ff]">
              Spring 2027
            </span>{" "}
            co-op opportunities.
          </p>

          <p className="text-sm sm:text-lg text-[#eae5df]/80">
            Thanks for checking out my projects and portfolio :)
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="text-white transition-colors hover:text-[#d1c8ff]"
            >
              <GithubIcon className="h-5 w-5" />
            </a>

            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="text-white transition-colors hover:text-[#d1c8ff]"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              title={`Copy ${EMAIL}`}
              className="flex cursor-pointer items-center gap-1.5 text-white transition-colors hover:text-[#d1c8ff]"
            >
              {copied ? (
                <>
                  <Check className="h-5 w-5 text-emerald-400" />
                  <span className="text-xs text-emerald-400">
                    Copied {EMAIL}
                  </span>
                </>
              ) : (
                <Mail className="h-5 w-5" />
              )}
            </button>

            <a
              href={LINKS.resume}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Resume PDF"
              title="View Resume"
              className="text-white transition-colors hover:text-[#d1c8ff]"
            >
              <FileText className="h-5 w-5" />
            </a>

            <Link
              href="/thoughts"
              aria-label="My Thoughts Notebook"
              title="My Thoughts"
              className="flex items-center gap-1.5 rounded-full border border-[#d1c8ff]/30 px-3 py-1 text-xs font-medium text-[#d1c8ff] transition-colors hover:bg-[#d1c8ff] hover:text-[#04020e]"
            >
              <BookOpen className="h-3.5 w-3.5" />
              My Thoughts
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
