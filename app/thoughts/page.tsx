"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./thoughts.module.css";

type Note = {
  id: string;
  label: string;
};

type NoteGroup = {
  title: string;
  notes: Note[];
};

const NOTE_GROUPS: NoteGroup[] = [
  {
    title: "Collections",
    notes: [
      { id: "advice", label: "Advice" },
      { id: "beliefs", label: "Beliefs *" },
      { id: "green-flags", label: "Green Flags" },
      { id: "idea-adoption-center", label: "Idea Adoption Center" },
      { id: "questions", label: "Questions" },
      { id: "words", label: "Words" },
      { id: "working-modes", label: "Working Modes" },
    ],
  },
  {
    title: "Specific Collections",
    notes: [
      { id: "inventions-from-love", label: "Inventions from Love" },
      { id: "humans-are-awesome", label: "Humans are Awesome" },
    ],
  },
  {
    title: "Microblogs",
    notes: [
      { id: "notes-on-socratica", label: "Notes on Socratica *" },
      { id: "technological-wishlist", label: "Technological Wishlist" },
      { id: "to-contain-a-brain", label: "To Contain a Brain" },
    ],
  },
  {
    title: "Guides",
    notes: [
      { id: "make-a-documentary", label: "To Make a Documentary" },
      { id: "leave-a-company", label: "To Leave a Company" },
      { id: "meetings-well", label: "To Do Meetings Well" },
      { id: "radio-notes", label: "radio notes" },
      { id: "organize-road-trip", label: "To Organize a Road Trip" },
      { id: "shoot-on-set", label: "To Shoot on Set" },
      { id: "enjoy-uwaterloo", label: "To Enjoy UWaterloo *" },
    ],
  },
  {
    title: "Utils",
    notes: [
      {
        id: "electricity-napkin-math",
        label: "Electricity Napkin Math",
      },
    ],
  },
  {
    title: "Project Logs",
    notes: [
      { id: "electronics-learning-log", label: "Electronics Learning Log" },
      { id: "rust-log", label: "Rust Log" },
      { id: "documentary-log", label: "Documentary Log" },
    ],
  },
  {
    title: "Times",
    notes: [
      {
        id: "unnaturally-lucky",
        label: "Times I've Felt Unnaturally Lucky",
      },
      { id: "said-wow", label: "Times I've Said Wow" },
    ],
  },
  {
    title: "Ongoing",
    notes: [{ id: "beliefs", label: "Beliefs *" }],
  },
];

function ThoughtIllustration() {
  return (
    <svg
      className={styles.illustration}
      viewBox="0 0 180 130"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path
        d="M48 38c9-21 42-30 65-20 25 10 31 39 15 57-13 15-36 18-54 10L49 103l7-27C44 66 41 51 48 38Z"
        strokeWidth="5"
      />
      <path d="M67 48c7-4 13-4 20 0M97 48c7-4 13-4 20 0" strokeWidth="4" />
      <path d="M67 63c5 4 12 4 18 0 6 4 13 4 19 0 5 4 11 4 16 0" strokeWidth="4" />
    </svg>
  );
}

function BeliefsNote() {
  return (
    <div className={styles.noteBody}>
      <header className={styles.noteHeader}>
        <div className={styles.statusRow}>
          <span className={styles.statusDot} aria-hidden="true" />
          <span>Ongoing</span>
        </div>

        <h1>
          Beliefs <sup>*</sup>
        </h1>

        <p className={styles.subtitle}>
          A stream of consciousness from my screen to yours.
        </p>

        <p className={styles.updateNotice}>
          These are ever changing. I will try to keep them as updated as
          possible.
        </p>
      </header>

      <section className={styles.articleSection}>
        <h2>Meta-philosophy</h2>
        <p>Values are defined and refined by real-life actions.</p>
      </section>

      <section className={styles.articleSection}>
        <h2>Life</h2>

        <p>
          It is instrumentally useful to believe that brains are antennae for
          consciousness.
        </p>

        <p>
          Self-confidence comes from trusting yourself to follow through with
          hard things you say you will do. You can build this trust through
          hard conversations or challenging work, but there are also ways to
          microdose the feeling. Working out is definitely one.
        </p>

        <p>
          Having too little agency sucks, but having too much agency without
          certainty about how to direct it is worse.
        </p>

        <p>
          Accumulating knowledge is like accumulating debt. You have to do
          things with it to pay it off, or it builds up like a toxin in your
          body.
        </p>

        <p>
          Paying attention reveals and reinforces what you actually love.
          Hating counts as a form of attention.
        </p>
      </section>

      <section className={styles.articleSection}>
        <h2>People</h2>

        <p>
          Betting against human ingenuity is often a losing game, but we are
          bad at estimating time scales.
        </p>

        <p>
          Interactions become more enriching when we assume positive intent
          and believe the other person has something to teach us.
        </p>

        <p>
          Altruism comes from context. We do not have to worry too much about
          people initially doing good things for the “wrong reasons,” because
          that is how many people come to genuinely care more.
        </p>
      </section>

      <section className={styles.articleSection}>
        <h2>Work</h2>

        <p>
          People should be compensated for their work. If you cannot pay
          someone, give them equity, grant money, or the best recommendation
          letter of their life.
        </p>

        <p>
          Many of the most interesting new ideas appear at the intersection of
          three things. We do ourselves a disservice when we do not applaud
          people for trying, and possibly failing, at something new.
        </p>
      </section>

      <section className={styles.articleSection}>
        <h2>Technology</h2>

        <p>Technology really exists for two reasons:</p>

        <div className={styles.principleGrid}>
          <article className={styles.principle}>
            <span>01</span>
            <h3>Face to face</h3>
            <p>
              Technology should enable people to show up more fully for the
              people they love. Quality-of-life improvements can reduce the
              time and energy spent worrying about material needs.
            </p>
          </article>

          <article className={styles.principle}>
            <span>02</span>
            <h3>Shoulder to shoulder</h3>
            <p>
              Technology should help people have better experiences together,
              including the shared awe created by beautiful megastructures.
            </p>
          </article>
        </div>

        <p>
          All software, sufficiently advanced, is indistinguishable from a
          dating app.
        </p>

        <p>
          Generally, the goal of good software is to get the user off of it.
          Hinge, in its small area of application, got this right. Software
          should complete the task at hand and free the user’s time, energy,
          and resources.
        </p>

        <p>
          Along this thread, I subscribe to technology as intelligence
          augmentation rather than a replacement mechanism for jobs, social
          interaction, education, and other parts of life. The physical world
          contains tacit knowledge and patterns that are useful to engage
          with, even when we cannot fully explain them.
        </p>
      </section>

      <section className={styles.articleSection}>
        <h2>Climate</h2>

        <p>
          The alarmism of early-2000s and early-2010s activism served its
          purpose by bringing climate change to the surface of public
          attention. We now need a different mode of climate storytelling:
          pragmatic, focused on co-benefits, and politically neutral.
        </p>
      </section>

      <section className={styles.articleSection}>
        <h2>Urbanism</h2>

        <p>Bike highways are super cool. Extremely original thought.</p>

        <p>
          Plants and vertical wooden panels are aesthetically gorgeous ways to
          reduce echo in a space.
        </p>
      </section>

      <section className={styles.articleSection}>
        <h2>Education</h2>

        <p>
          The only certainty is that things will change faster and individuals
          will gain capabilities that once belonged to entire firms. The
          school of the future should:
        </p>

        <ul>
          <li>
            Set and demonstrate a standard of excellence that people can
            aspire to across a variety of ages and occupations.
          </li>
          <li>
            Provide social support systems while students figure things out.
          </li>
        </ul>
      </section>

      <section className={styles.articleSection}>
        <h2>Community</h2>

        <p>
          Communities need to be organized and cultivated by the people within
          them. At Socratica, we call this the “host mindset”: all participants
          are hosts, and all hosts are participants.
        </p>

        <p>
          A successful community is not necessarily one that lasts forever. It
          should inspire forks and downstream developments.
        </p>
      </section>

      <p className={styles.endMark}>Last updated as the thinking changes.</p>
    </div>
  );
}

function EmptyNote({ title }: { title: string }) {
  return (
    <div className={styles.emptyNote}>
      <p className={styles.emptyLabel}>Collection entry</p>
      <h1>{title.replace(" *", "")}</h1>
      <p>
        This note is still being written. Check back later as this collection
        grows.
      </p>
    </div>
  );
}

export default function ThoughtsPage() {
  const [activeNote, setActiveNote] = useState("beliefs");
  const [activeTitle, setActiveTitle] = useState("Beliefs *");

  function selectNote(note: Note) {
    setActiveNote(note.id);
    setActiveTitle(note.label);

    if (window.innerWidth <= 820) {
      window.setTimeout(() => {
        document
          .getElementById("thought-content")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    }
  }

  return (
    <main className={styles.page}>
      <header className={styles.appHeader}>
        <Link href="/" className={styles.brand}>
          Akshat&apos;s Notes
        </Link>

        <span className={styles.headerMeta}>personal notebook</span>

        <Link href="/" className={styles.backLink}>
          ← Portfolio
        </Link>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="Thought collections">
          <div className={styles.sidebarIntro}>
            <p>Notebook index</p>
            <span>
              A collection of ideas, guides, logs, questions, and unfinished
              thoughts.
            </span>
          </div>

          <nav className={styles.noteNavigation}>
            {NOTE_GROUPS.map((group) => (
              <section className={styles.noteGroup} key={group.title}>
                <h2>{group.title}</h2>

                <div className={styles.noteLinks}>
                  {group.notes.map((note) => (
                    <button
                      key={`${group.title}-${note.id}`}
                      type="button"
                      className={
                        note.id === activeNote
                          ? `${styles.noteLink} ${styles.activeNote}`
                          : styles.noteLink
                      }
                      aria-pressed={note.id === activeNote}
                      onClick={() => selectNote(note)}
                    >
                      {note.label}
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </nav>
        </aside>

        <article className={styles.content} id="thought-content">
          <div className={styles.banner}>
            <ThoughtIllustration />
          </div>

          {activeNote === "beliefs" ? (
            <BeliefsNote />
          ) : (
            <EmptyNote title={activeTitle} />
          )}
        </article>
      </div>

      <footer className={styles.notesFooter}>
        <span>© 2026 Akshat Lal</span>
        <Link href="/">Return to portfolio</Link>
      </footer>
    </main>
  );
}
