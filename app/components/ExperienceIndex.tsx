"use client";

import { useState } from "react";

type Entry = {
  role: string;
  org: string;
  date: string;
  bullets: string[];
};

export default function ExperienceIndex({ entries }: { entries: Entry[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ul className="pf-list">
      {entries.map((entry, i) => {
        const isOpen = open === i;
        const panelId = `experience-panel-${i}`;

        return (
          <li
            key={`${entry.role}-${entry.org}`}
            className={`pf-row${isOpen ? " is-open" : ""}`}
            data-reveal
          >
            <button
              type="button"
              className="pf-row-head pf-row-head--plain"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="pf-row-date">{entry.date}</span>

              <span className="pf-row-main">
                <span className="pf-row-title">{entry.role}</span>
                <span className="pf-row-summary">{entry.org}</span>
              </span>

              <span className="pf-row-icon" aria-hidden="true" />
            </button>

            <div
              className="pf-row-panel"
              id={panelId}
              role="region"
              aria-hidden={!isOpen}
            >
              <div className="pf-row-panel-inner">
                <div className="pf-row-body">
                  <ul className="pf-bullets">
                    {entry.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}