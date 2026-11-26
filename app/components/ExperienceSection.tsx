"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { COMMUNITY_CARDS, EXPERIENCE } from "../portfolio-data";
import { Timeline, TimelineEntry } from "./Timeline";

function ExperienceCard({
  org,
  role,
  location,
  bullets,
  tags,
}: {
  org: string;
  role: string;
  location: string;
  bullets: string[];
  tags: string[];
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0b0818]/90 p-5 sm:p-6 shadow-xl shadow-[#412e82]/10 transition-colors hover:border-[#d1c8ff]/30">
      <div className="flex flex-row items-center justify-between gap-2 mb-3">
        <p className="text-base md:text-xl font-bold text-[#eae5df]">
          {org}{" "}
          <span className="font-normal text-gray-300">— {role}</span>
        </p>
        <p className="hidden sm:block text-sm md:text-base font-semibold text-gray-400">
          {location}
        </p>
      </div>

      <ul className="space-y-2 text-xs md:text-[15px] leading-relaxed text-[#eae5df]/85 list-disc pl-5">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[#d1c8ff]/20 bg-[#1a1536] px-3 py-0.5 text-xs font-medium text-[#d1c8ff]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const timelineData: TimelineEntry[] = EXPERIENCE.map((exp) => ({
    title: exp.year,
    subtitle: exp.term,
    content: (
      <ExperienceCard
        org={exp.org}
        role={exp.role}
        location={exp.location}
        bullets={exp.bullets}
        tags={exp.tags}
      />
    ),
  }));

  return (
    <section
      id="experience"
      className="relative w-full overflow-clip bg-gradient-to-b from-[#1c192a]/60 to-[#04020e]"
    >
      <Timeline data={timelineData} />

      <div
        className="mx-auto max-w-7xl px-6 sm:px-16 mt-12 pb-16"
        aria-labelledby="focus-heading"
      >
        <div className="mb-8 max-w-4xl sm:mb-10">
          <h2
            id="focus-heading"
            className="font-serif-accent text-2xl sm:text-3xl font-bold italic text-[#d1c8ff]"
          >
            Teams + Notebook
          </h2>
          <p className="mt-2 text-sm leading-relaxed sm:text-lg text-[#eae5df]/90">
            Outside of coursework, I love building with{" "}
            <span className="font-serif-accent font-bold italic text-white">
              student-led engineering teams
            </span>{" "}
            and writing down{" "}
            <span className="font-serif-accent font-bold italic text-white">
              ideas and project logs
            </span>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {COMMUNITY_CARDS.map((card) => (
            <Link
              key={card.name}
              href={card.href}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-gradient-to-t from-[#2d2247]/60 via-[#2d2247]/20 to-[#080612] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#d1c8ff]/30 hover:shadow-2xl hover:shadow-black/40"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-[#d1c8ff]/25 bg-[#14102c] px-2.5 py-0.5 text-[11px] font-medium text-[#d1c8ff]">
                    {card.badge}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#d1c8ff]" />
                </div>

                <h3 className="mt-4 text-lg font-bold tracking-tight text-[#f2eef8]">
                  {card.name}
                </h3>
                <p className="mt-1 flex flex-wrap items-baseline gap-x-2 font-serif-accent text-sm font-bold italic text-[#d1c8ff]">
                  <span>{card.role}</span>
                  <span className="font-sans text-xs font-semibold not-italic text-gray-400">
                    · {card.term}
                  </span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#eae5df]/85">
                  {card.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
