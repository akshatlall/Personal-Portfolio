"use client";

import { HIGHLIGHTS } from "../portfolio-data";

function HighlightCard({
  title,
  year,
  description,
  badge,
}: {
  title: string;
  year: string;
  description: string;
  badge: string;
}) {
  return (
    <div className="flex h-full w-[280px] sm:w-[330px] shrink-0 flex-col justify-between rounded-xl border border-[#d1c8ff]/15 bg-gradient-to-b from-[#1a1435]/90 to-[#0a0714] p-5 shadow-lg">
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full border border-[#d1c8ff]/25 bg-[#14102c] px-2.5 py-0.5 text-[11px] font-medium text-[#d1c8ff]">
            {badge}
          </span>
          <span className="font-mono-code text-xs text-gray-400">{year}</span>
        </div>
        <h3 className="mt-3 font-serif-accent text-lg font-bold italic text-[#eae5df]">
          {title}
        </h3>
        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-gray-300">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function HighlightsMarquee() {
  const items = [...HIGHLIGHTS, ...HIGHLIGHTS];

  return (
    <section
      id="highlights"
      className="my-16 sm:my-24 w-full overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-16 mb-6">
        <h2 className="font-serif-accent text-2xl sm:text-3xl font-bold italic text-[#d1c8ff]">
          Milestones &amp; Craft
        </h2>
        <p className="mt-1 text-sm sm:text-base text-[#eae5df]/80">
          A quick snapshot of the hardware, software, and leadership work I have
          focused on.
        </p>
      </div>

      <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_12%,white_88%,transparent)]">
        <ul className="flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4 animate-scroll hover:[animation-play-state:paused]">
          {items.map((item, idx) => (
            <li key={`${item.title}-${idx}`}>
              <HighlightCard
                title={item.title}
                year={item.year}
                description={item.description}
                badge={item.badge}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
