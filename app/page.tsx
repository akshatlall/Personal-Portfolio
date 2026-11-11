"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PageDoodles from "./components/PageDoodles";
import ProjectArtwork from "./components/ProjectArtwork";
import "./home-polish.css";

const EMAIL = "a7lal@uwaterloo.ca";

const FACTS: { text: React.ReactNode }[] = [
  {
    text: (
      <>
        led <strong>VEX Robotics</strong> for four seasons, from team member
        to Team Lead
      </>
    ),
  },
  {
    text: (
      <>
        built <strong>Caissa</strong>, a chess engine in <strong>C#</strong>{" "}
        with an AI opponent across 3 rule sets
      </>
    ),
  },
  {
    text: (
      <>
        laying out PCBs in <strong>Altium</strong> for a robotic arm on the
        Student Design Team
      </>
    ),
  },
  {
    text: (
      <>
        shipped a full-stack <strong>task manager</strong> with Next.js,
        TypeScript &amp; SQL
      </>
    ),
  },
  {
    text: (
      <>
        working on <strong>humanoid robotics</strong> with{" "}
        <strong>WATonomous</strong>, the Waterloo Design Team
      </>
    ),
  },
  {
    text: (
      <>
        starting Computer Engineering <strong>@Waterloo</strong> this fall
      </>
    ),
  },
  {
    text: <>seeking summer 2027 co-op opportunities</>,
  },
];

const PROJECTS = [
  {
    title: "Caissa",
    date: "aug '26",
    artwork: "caissa" as const,
    description:
      "A C# chess engine and WinForms desktop app built from scratch, with reusable board, piece, move, and game-state models. Implements full movement, check, checkmate, and capture logic for all 6 piece types across Standard, Chess960, and Atomic rule sets, plus an AI opponent with its own move-evaluation logic and a UI layer with move highlighting, clocks, and move history.",
    tags: ["C#", ".NET", "WinForms"],
  },
  {
    title: "Task Management Web App",
    date: "jul '26",
    artwork: "tasks" as const,
    description:
      "A full-stack task manager built with Next.js and TypeScript, supporting task creation, editing, organization, and status tracking end to end. Backed by a SQL schema and persistence layer so tasks and project state reliably survive across sessions.",
    tags: ["TypeScript", "Next.js", "SQL"],
  },
  {
    title: "Portfolio",
    date: "aug '26",
    artwork: "portfolio" as const,
    description:
      "This site — a responsive personal portfolio built with Next.js and TypeScript, with a light/dark mode toggle and scroll-triggered animation. Deployed on Vercel with continuous deployment so every pushed change goes live automatically.",
    tags: ["Next.js", "TypeScript"],
  },
  {
    title: "Java Image Editor",
    date: "jun '26",
    artwork: "editor" as const,
    description:
      "A desktop image editor built in Java Swing, separating image data, editing operations, and UI into distinct components. Event-driven controls apply edits interactively, including grayscale, cropping, rotation, and brightness adjustment via custom pixel-manipulation algorithms.",
    tags: ["Java", "Swing", "OOP"],
  },
  {
    title: "Simon",
    date: "may '26",
    artwork: "simon" as const,
    description:
      "A memory game built on Arduino, focused on embedded programming and hardware interaction — reading button input, driving LEDs, and timing sequences directly on the board.",
    tags: ["Arduino", "C++"],
  },
  {
    title: "NBA Research",
    date: "apr '26",
    artwork: "nba" as const,
    description:
      "A data project exploring the relationship between player height and rebounding using publicly available NBA statistics.",
    tags: ["Python", "Data"],
  },
];

const EXPERIENCE = [
  {
    role: "Team Lead",
    org: "VEX Robotics Team",
    date: "2022 – 2026",
    bullets: [
      "Competed for 4 consecutive seasons, progressing from team member to Team Lead directing the full design, build, test, and iteration cycle",
      "Directed mechanical design, robot assembly, and programming priorities to deliver a functioning competition robot each season",
      "Ran reliability tests ahead of competition to catch failure points early, reducing the risk of in-match breakdowns",
    ],
  },
  {
    role: "New Member, Electrical Team",
    org: "Student Design Team",
    date: "2026 – Present",
    bullets: [
      "Design and lay out printed circuit boards in Altium Designer for onboard vehicle electronics",
      "Collaborate with senior electrical and mechanical members on component selection and board layout ahead of a moving robotic-arm subsystem build",
    ],
  },
  {
    role: "Computer Engineering",
    org: "University of Waterloo",
    date: "2026 – 2031",
    bullets: [
      "Bachelor of Applied Science, starting Computer Engineering this fall",
    ],
  },
];

async function writeEmailToClipboard() {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(EMAIL);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = EMAIL;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  // The top and footer copied states are intentionally separate.
  const [topEmailCopied, setTopEmailCopied] = useState(false);
  const [footerEmailCopied, setFooterEmailCopied] = useState(false);

  async function copyTopEmail() {
    try {
      await writeEmailToClipboard();
      setTopEmailCopied(true);
      window.setTimeout(() => setTopEmailCopied(false), 2400);
    } catch {
      setTopEmailCopied(false);
    }
  }

  async function copyFooterEmail() {
    try {
      await writeEmailToClipboard();
      setFooterEmailCopied(true);
      window.setTimeout(() => setFooterEmailCopied(false), 2200);
    } catch {
      setFooterEmailCopied(false);
    }
  }

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      document
        .querySelectorAll(".reveal")
        .forEach((element) => element.classList.add("is-visible"));

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="site">
      <PageDoodles />

      {/* Top-right toolbar */}
      <div className="top-toolbar">
        <button
          type="button"
          className="toolbar-btn"
          aria-label={
            topEmailCopied ? "Email copied" : "Copy email address"
          }
          title={topEmailCopied ? "Email copied" : "Copy email"}
          onClick={copyTopEmail}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
        </button>

        {topEmailCopied && (
          <div className="toolbar-email-status" role="status">
            <span className="toolbar-email-status-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>
            </span>

            <span className="toolbar-email-status-copy">
              <strong>Email copied</strong>
              <small>{EMAIL}</small>
            </span>
          </div>
        )}

        <a
          href="https://linkedin.com/in/lal-akshat"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="toolbar-btn"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-3.96 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.68-2.91V8.48Z" />
          </svg>
        </a>

        <a
          href="https://github.com/lal-akshat"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="toolbar-btn"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
          </svg>
        </a>

        <a
          href="/resume.pdf"
          download
          aria-label="Download resume"
          className="toolbar-btn"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 3v12" />
            <path d="m7 10 5 5 5-5" />
            <path d="M5 21h14" />
          </svg>
        </a>

        <span className="toolbar-divider" aria-hidden="true" />

        <button
          type="button"
          className="toolbar-btn theme-toggle"
          aria-label={
            darkMode ? "Switch to light mode" : "Switch to dark mode"
          }
          onClick={() => setDarkMode((currentMode) => !currentMode)}
        >
          {darkMode ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
            </svg>
          )}
        </button>
      </div>

      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <h1 className="hero-name">AKSHAT LAL</h1>

          <p className="hero-role">
            <strong className="hero-role-title">Computer Engineering</strong>
            <span className="hero-role-muted">University of Waterloo</span>
          </p>

          <p className="hero-bio">
            i build at the <span className="circled">intersection</span> of
            hardware, software, and problem-solving
          </p>

          <div className="facts-list">
            {FACTS.map((fact, index) => (
              <p
                key={index}
                className="fact-row"
                style={{ animationDelay: `${0.55 + index * 0.08}s` }}
              >
                <span className="fact-arrow">&gt;</span>
                {fact.text}
              </p>
            ))}
          </div>

          <div className="hero-actions">
            <a className="hero-primary-action" href={`mailto:${EMAIL}`}>
              Get in touch
            </a>
            <a className="hero-secondary-action" href="#projects">
              View selected work
            </a>
          </div>

          <nav className="hero-nav" aria-label="More links">
            <a href="#experience">Experience</a>
            <a href="#thoughts">Notes</a>
            <a href="/resume.pdf" download>
              Resume
            </a>
          </nav>
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="container-wide projects-section reveal"
      >
        <h2 className="section-title">Selected work</h2>

        <div className="project-grid">
          {PROJECTS.map((project, index) => (
            <article
              className={`project${index === 0 ? " project-featured" : ""}`}
              key={project.title}
            >
              <div className="project-image-wrapper">
                <ProjectArtwork type={project.artwork} />
              </div>

              <div className="project-meta">
                <span>{project.title}</span>
                <span className="date">{project.date}</span>
              </div>

              <p className="project-description">{project.description}</p>

              <p className="project-tags">{project.tags.join(" · ")}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="container lower-section reveal">
        <h2 className="section-title">Experience</h2>

        <div className="experience-list">
          {EXPERIENCE.map((job) => (
            <article
              className="experience-card"
              key={`${job.role}-${job.org}`}
            >
              <div className="experience-head">
                <div>
                  <p className="experience-role">{job.role}</p>
                  <p className="experience-org">{job.org}</p>
                </div>

                <span className="experience-date">{job.date}</span>
              </div>

              <ul className="experience-bullets">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Notes */}
      <section
        id="thoughts"
        className="container lower-section thoughts-preview reveal"
      >
        <h2 className="section-title">Notes</h2>

        <p className="thoughts-preview-intro">
          An evolving notebook about technology, people, work, education,
          community, and the ideas I am still figuring out.
        </p>

        <Link className="thoughts-preview-link" href="/thoughts">
          Read my thoughts <span aria-hidden="true">→</span>
        </Link>
      </section>

      {/* Footer */}
      <footer className="reveal">
        <span>© 2026 Akshat Lal</span>

        <div className="footer-links">
          <button
            type="button"
            className="footer-email-button"
            onClick={copyFooterEmail}
            aria-label={
              footerEmailCopied
                ? "Footer email copied"
                : "Copy email address"
            }
          >
            {footerEmailCopied ? "Email copied" : "Email"}
          </button>

          <Link href="/thoughts">My Thoughts</Link>

          <a
            href="https://linkedin.com/in/lal-akshat"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>

          <a
            href="https://github.com/lal-akshat"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </footer>
    </main>
  );
}
