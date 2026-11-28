
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HeroName from "./components/HeroName";
import HoverPreview from "./components/HoverPreview";
import PageDoodles from "./components/PageDoodles";
import ProjectArtwork from "./components/ProjectArtwork";
import { EMAIL, EXPERIENCE, LINKS, PROJECTS } from "./portfolio";
import "./home-polish.css";

const FACTS: { text: React.ReactNode }[] = [
  {
    text: (
      <>
        built{" "}
        <HoverPreview
          title="Caissa"
          eyebrow="Chess engine"
          description="A C# and WinForms chess engine with an AI opponent and three rule sets."
          mark="C"
          className="chip chip-peach"
        >
          Caissa
        </HoverPreview>
        , a chess engine in{" "}
        <HoverPreview
          title="C#"
          eyebrow="Language"
          description="Used to build Caissa, including its chess rules, move evaluation, and interface."
          mark="C#"
          className="chip chip-lavender"
        >
          C#
        </HoverPreview>{" "}
        with an AI opponent across 3 rule sets
      </>
    ),
  },
  {
    text: (
      <>
        laying out PCBs in{" "}
        <HoverPreview
          title="Altium Designer"
          eyebrow="Student Design Team"
          description="Designing circuit boards for a robotic-arm subsystem."
          mark="AL"
          className="chip chip-mint"
        >
          Altium
        </HoverPreview>{" "}
        for a robotic arm on the Student Design Team
      </>
    ),
  },
  {
    text: (
      <>
        shipped a full-stack{" "}
        <HoverPreview
          title="TaskFlow"
          eyebrow="Full-stack web app"
          description="Built with Next.js, TypeScript, and SQL for task and project tracking."
          mark="TF"
          className="chip chip-rose"
        >
          task manager
        </HoverPreview>{" "}
        with Next.js, TypeScript &amp; SQL
      </>
    ),
  },
  {
    text: (
      <>
        built a{" "}
        <HoverPreview
          title="Java Image Editor"
          eyebrow="Java Swing"
          description="A desktop image editor with custom pixel-manipulation filters."
          mark="JS"
          className="chip chip-yellow"
        >
          Java Swing
        </HoverPreview>{" "}
        image editor with custom pixel-manipulation filters
      </>
    ),
  },
  {
    text: (
      <>
        incoming at{" "}
        <HoverPreview
          title="CIBC"
          eyebrow="Incoming"
          description="Incoming at CIBC."
          mark="CIBC"
          imageOnly
          previewImage={{
            src: "/cibc-preview.gif",
            width: 1920,
            height: 1080,
            alt: "Animated CIBC preview",
          }}
          className="chip chip-rose"
        >
          CIBC
        </HoverPreview>
      </>
    ),
  },
];

function NoteArrow({
  direction,
}: {
  direction: "contact" | "projects" | "aside";
}) {
  const paths = {
    contact:
      "M 54 2 C 60 11, 57 22, 49 30 C 41 39, 33 43, 25 43 M 31 37 Q 28 41 25 43 Q 30 43 34 40",
    projects:
      "M 3 2 C 14 6, 20 12, 24 20 C 27 25, 27 30, 25 33 M 20 27 Q 23 31 25 33 Q 29 31 32 27",
    aside:
      "M 48 59 C 41 48, 34 37, 26 27 C 18 18, 11 10, 5 5 M 14 6 Q 9 5 5 5 Q 5 10 7 14",
  };

  return (
    <svg
      className={`note-arrow note-arrow-${direction}`}
      viewBox={direction === "aside" ? "0 0 56 60" : "0 0 56 48"}
      fill="none"
      aria-hidden="true"
    >
      <path d={paths[direction]} />
    </svg>
  );
}

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
          href={LINKS.linkedin}
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
          href={LINKS.github}
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
          href={LINKS.resume}
          download
          aria-label="Download resume PDF"
          className="toolbar-btn toolbar-resume"
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
          <span>Resume</span>
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
          <span className="hero-greeting">hello, i&apos;m 👋</span>

          <HeroName />

          <p className="hero-role">
            <HoverPreview
              href="https://uwaterloo.ca/future-students/programs/computer-engineering"
              imageOnly
              previewImage={{
                src: "/waterloo-computer-engineering.png",
                width: 480,
                height: 320,
                alt: "Screenshot of the University of Waterloo Computer Engineering program page",
              }}
              className="chip chip-yellow chip-role"
            >
              Computer Engineering
            </HoverPreview>

            <span className="hero-role-muted">@University of Waterloo</span>
          </p>

          <p className="hero-bio">
            i build at the{" "}
            <HoverPreview
              title="Hardware meets software"
              eyebrow="My engineering focus"
              description="I build at the intersection of hardware and software."
              mark="HW/SW"
              className="circled"
            >
              intersection
              <svg
                className="circled-ring"
                viewBox="0 0 200 90"
                aria-hidden="true"
              >
                <path d="M20 45 C14 15 60 4 100 7 C152 10 188 20 181 46 C188 72 150 84 100 81 C53 84 13 73 20 45 Z" />
              </svg>
            </HoverPreview>{" "}
            of hardware and software
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

          <nav className="hero-nav" aria-label="Page sections">
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#thoughts">My Thoughts</a>
            <span className="contact-nav-item">
              <Link href="/contact">Contact</Link>
              <span className="contact-reply-note">
                (i actually reply)
                <NoteArrow direction="contact" />
              </span>
            </span>
          </nav>
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="container-wide projects-section reveal"
      >
        <p className="section-annotation">
          my work
          <NoteArrow direction="projects" />
        </p>
        <h2 className="section-title">Projects</h2>

        <div className="project-grid">
          {PROJECTS.map((project) => (
            <article className="project" key={project.title}>
              <div className="project-image-wrapper">
                <ProjectArtwork type={project.artwork} />
              </div>

              <div className="project-meta">
                <span>{project.title}</span>
                <span className="date">{project.date}</span>
              </div>

              <p className="project-description">{project.description}</p>

              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <p className="projects-aside">
          pretty cool, right?
          <NoteArrow direction="aside" />
        </p>
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

      {/* My Thoughts */}
      <section
        id="thoughts"
        className="container lower-section thoughts-preview reveal"
      >
        <p className="thoughts-preview-eyebrow">
          Notes, ideas &amp; questions
        </p>

        <h2 className="section-title">My Thoughts</h2>

        <p className="thoughts-preview-intro">
          An evolving notebook about technology, people, work, education,
          community, and the ideas I am still figuring out.
        </p>

        <Link className="thoughts-preview-card" href="/thoughts">
          <span className="thoughts-preview-icon" aria-hidden="true">
            <svg
              viewBox="0 0 64 64"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 13h38v29H29L17 52l2-10h-6V13Z" />
              <path d="M22 23h20M22 30h15M22 37h11" />
            </svg>
          </span>

          <span className="thoughts-preview-copy">
            <strong>Open my notes</strong>

            <span>
              Collections, beliefs, project logs, guides, questions, and more.
            </span>
          </span>

          <span className="thoughts-preview-arrow" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </span>
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
            href={LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>

          <a
            href={LINKS.github}
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
