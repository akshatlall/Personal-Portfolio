"use client";

import { Globe } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import ProjectArtwork from "./ProjectArtwork";
import { PROJECTS, ProjectItem } from "../portfolio-data";

function CosmicProjectCard({ project }: { project: ProjectItem }) {
  const primaryLink = project.website || project.github || "#projects";

  return (
    <article className="flex flex-col rounded-xl bg-[#04020e] text-white w-full">
      <a
        href={primaryLink}
        target={primaryLink.startsWith("http") ? "_blank" : undefined}
        rel={primaryLink.startsWith("http") ? "noopener noreferrer" : undefined}
        className="group relative inline-flex w-full overflow-hidden rounded-xl p-[1.5px] focus:outline-none"
      >
        <span
          aria-hidden="true"
          className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#04020e_0%,#04020e_50%,#7635cc_75%,#477bc9_100%)]"
        />
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-[11px] bg-[#090714] flex items-center justify-center p-4 transition-transform duration-300 group-hover:scale-[1.01]">
          <ProjectArtwork type={project.artwork} />
        </div>
      </a>

      <div className="mt-4 flex flex-row items-center justify-between gap-2">
        <div className="flex flex-row items-baseline gap-2">
          <h3 className="font-serif-accent text-lg sm:text-xl font-bold italic text-[#d1c8ff]">
            {project.title}
          </h3>
          <span className="text-xs sm:text-sm italic text-gray-400">
            — {project.date}
          </span>
        </div>

        <div className="flex flex-row items-center gap-3">
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} website`}
              className="text-gray-300 transition-colors hover:text-[#d1c8ff]"
            >
              <Globe className="h-5 w-5" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub`}
              className="text-gray-300 transition-colors hover:text-[#d1c8ff]"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>

      <p className="mt-0.5 text-xs sm:text-sm text-gray-400">
        {project.tags.join(" | ")}
      </p>

      <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-[#eae5df]/90">
        {project.description}
      </p>
    </article>
  );
}

export default function ProjectsSection() {
  const rows: ProjectItem[][] = [];
  for (let i = 0; i < PROJECTS.length; i += 2) {
    rows.push(PROJECTS.slice(i, i + 2));
  }

  return (
    <section className="mx-auto mb-16 flex w-full max-w-7xl flex-col items-center justify-center bg-[#04020e] px-6 sm:px-12">
      {rows.map((pair, rowIdx) => (
        <div key={rowIdx} className="w-full">
          <div className="grid grid-cols-1 gap-8 py-4 sm:grid-cols-2 sm:py-8">
            {pair.map((project) => (
              <CosmicProjectCard key={project.title} project={project} />
            ))}
          </div>

          {rowIdx < rows.length - 1 && (
            <div
              aria-hidden="true"
              className="hidden sm:flex justify-center py-2 text-sm tracking-[0.5em] text-[#d1c8ff]/50 select-none"
            >
              ✧ ✦ ✧ ✦ ✧
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
