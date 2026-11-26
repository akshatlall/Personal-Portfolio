"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Code2,
  Cpu,
  FileText,
  FolderKanban,
  Terminal,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import ProjectArtwork from "../components/ProjectArtwork";
import { EMAIL, EXPERIENCE, LINKS, PROJECTS } from "../portfolio-data";

type AppId = "about" | "projects" | "terminal" | "caissa";

interface WindowState {
  id: AppId;
  title: string;
  open: boolean;
  z: number;
}

const INITIAL_WINDOWS: WindowState[] = [
  { id: "about", title: "About.md", open: true, z: 2 },
  { id: "terminal", title: "Terminal — zsh", open: true, z: 3 },
  { id: "projects", title: "Projects", open: false, z: 1 },
  { id: "caissa", title: "Caissa Explorer", open: false, z: 1 },
];

export default function VirtualOSPage() {
  const [windows, setWindows] = useState<WindowState[]>(INITIAL_WINDOWS);
  const [topZ, setTopZ] = useState(4);
  const [selectedProjectIdx, setSelectedProjectIdx] = useState(0);
  const [clock, setClock] = useState("");
  const [cmdInput, setCmdInput] = useState("");
  const [terminalLog, setTerminalLog] = useState<string[]>([
    "AkshatOS v2.0 — Waterloo Computer Engineering",
    "Type 'help' for available commands.",
  ]);
  const [knightPos, setKnightPos] = useState<[number, number]>([4, 4]);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setClock(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    };
    updateClock();
    const id = setInterval(updateClock, 15000);
    return () => clearInterval(id);
  }, []);

  function focusOrOpen(id: AppId) {
    const nextZ = topZ + 1;
    setTopZ(nextZ);
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, open: true, z: nextZ } : w))
    );
  }

  function closeWindow(id: AppId) {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, open: false } : w))
    );
  }

  function runCommand(e: React.FormEvent) {
    e.preventDefault();
    const raw = cmdInput.trim();
    if (!raw) return;
    const cmd = raw.toLowerCase();

    let output: string[] = [];
    if (cmd === "help") {
      output = [
        "Commands: whoami | projects | experience | skills | contact | clear",
      ];
    } else if (cmd === "whoami") {
      output = [
        "Akshat Lal — BASc Computer Engineering @ University of Waterloo ('31)",
        "Seeking Spring 2027 co-op opportunities.",
      ];
    } else if (cmd === "projects") {
      output = PROJECTS.map(
        (p) => `• ${p.title} (${p.tags.join(", ")}) — ${p.summary}`
      );
    } else if (cmd === "experience") {
      output = EXPERIENCE.map(
        (ex) => `• ${ex.org} — ${ex.role} (${ex.date})`
      );
    } else if (cmd === "skills") {
      output = [
        "Languages: C#, TypeScript, Java, C++, Python, SQL",
        "Hardware/Tools: Altium Designer, Arduino, Next.js, WinForms, Git",
      ];
    } else if (cmd === "contact") {
      output = [
        `Email: ${EMAIL}`,
        `GitHub: ${LINKS.github}`,
        `LinkedIn: ${LINKS.linkedin}`,
      ];
    } else if (cmd === "clear") {
      setTerminalLog([]);
      setCmdInput("");
      return;
    } else {
      output = [`command not found: ${raw}. Type 'help'.`];
    }

    setTerminalLog((prev) => [...prev, `$ ${raw}`, ...output]);
    setCmdInput("");
  }

  function isKnightMove(r: number, c: number) {
    const dr = Math.abs(r - knightPos[0]);
    const dc = Math.abs(c - knightPos[1]);
    return (dr === 2 && dc === 1) || (dr === 1 && dc === 2);
  }

  const openWindows = windows.filter((w) => w.open);

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#04020e] text-[#eae5df]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(118,53,204,0.22),transparent_45%),radial-gradient(circle_at_75%_70%,rgba(71,123,201,0.18),transparent_45%)]"
      />

      <header className="relative z-30 flex h-10 w-full items-center justify-between border-b border-white/10 bg-[#14102c]/85 px-4 text-xs backdrop-blur-md">
        <div className="flex items-center gap-4">
          <span className="font-heading font-bold text-[#d1c8ff]">
            AkshatOS
          </span>
          <Link
            href="/"
            className="flex items-center gap-1 text-gray-300 transition-colors hover:text-[#d1c8ff]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Portfolio
          </Link>
        </div>
        <div className="flex items-center gap-4 text-gray-300">
          <span className="hidden sm:inline">UWaterloo CE &apos;31</span>
          <span className="font-mono-code text-[#d1c8ff]">{clock || "—"}</span>
        </div>
      </header>

      <main className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-5 p-4 sm:p-8 lg:grid-cols-2 items-start">
        {openWindows.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
            <p className="font-serif-accent text-2xl italic text-[#d1c8ff]">
              All windows minimized
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Use the dock below to open an app.
            </p>
          </div>
        )}

        {windows.map((win) => {
          if (!win.open) return null;

          return (
            <section
              key={win.id}
              onClick={() => focusOrOpen(win.id)}
              style={{ zIndex: win.z }}
              className="flex flex-col overflow-hidden rounded-xl border border-[#d1c8ff]/20 bg-[#0d0a1c]/95 shadow-2xl shadow-black/60 backdrop-blur-md"
            >
              <div className="flex items-center justify-between border-b border-white/10 bg-[#181333] px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={`Close ${win.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      closeWindow(win.id);
                    }}
                    className="h-3 w-3 rounded-full bg-rose-400/90 hover:bg-rose-400 cursor-pointer"
                  />
                  <span className="h-3 w-3 rounded-full bg-amber-300/70" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
                </div>
                <span className="font-mono-code text-xs text-gray-300">
                  {win.title}
                </span>
                <button
                  type="button"
                  aria-label={`Close ${win.title}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    closeWindow(win.id);
                  }}
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="p-5 text-sm leading-relaxed">
                {win.id === "about" && (
                  <div className="space-y-3">
                    <h2 className="font-serif-accent text-xl font-bold italic text-[#d1c8ff]">
                      Akshat Lal
                    </h2>
                    <p className="text-gray-300">
                      Computer Engineering student at the University of
                      Waterloo (graduating 2031). I build at the intersection of
                      hardware, software, and problem-solving.
                    </p>
                    <ul className="space-y-1.5 text-xs text-gray-300 list-disc pl-4">
                      <li>VEX Robotics Team Lead (4 seasons, 2022–2026)</li>
                      <li>Electrical Team — Altium PCB layout</li>
                      <li>Seeking Spring 2027 co-op opportunities</li>
                    </ul>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <a
                        href={LINKS.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-[#9284d9] px-3.5 py-1 text-xs font-bold text-[#151226] hover:bg-[#d1c8ff]"
                      >
                        Resume PDF
                      </a>
                      <Link
                        href="/thoughts"
                        className="rounded-full border border-[#d1c8ff]/30 px-3.5 py-1 text-xs text-[#d1c8ff] hover:bg-[#d1c8ff]/10"
                      >
                        Open Notes
                      </Link>
                    </div>
                  </div>
                )}

                {win.id === "terminal" && (
                  <div className="font-mono-code text-xs">
                    <div className="max-h-52 space-y-1 overflow-y-auto text-gray-300 mb-3">
                      {terminalLog.map((line, i) => (
                        <p
                          key={i}
                          className={
                            line.startsWith("$")
                              ? "text-[#d1c8ff]"
                              : "text-gray-300"
                          }
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                    <form
                      onSubmit={runCommand}
                      className="flex items-center gap-2 border-t border-white/10 pt-2"
                    >
                      <span className="text-[#d1c8ff]">$</span>
                      <input
                        type="text"
                        value={cmdInput}
                        onChange={(e) => setCmdInput(e.target.value)}
                        placeholder="type 'help'..."
                        className="w-full bg-transparent text-[#eae5df] placeholder:text-gray-500 focus:outline-none"
                      />
                    </form>
                  </div>
                )}

                {win.id === "projects" && (
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {PROJECTS.map((p, idx) => (
                        <button
                          key={p.title}
                          type="button"
                          onClick={() => setSelectedProjectIdx(idx)}
                          className={`cursor-pointer rounded-full px-3 py-1 text-xs transition-colors ${
                            idx === selectedProjectIdx
                              ? "bg-[#d1c8ff] text-[#04020e] font-bold"
                              : "bg-[#181333] text-gray-300 hover:text-white"
                          }`}
                        >
                          {p.title}
                        </button>
                      ))}
                    </div>

                    <div className="rounded-lg border border-white/10 bg-[#070512] p-3">
                      <div className="aspect-[16/9] w-full overflow-hidden rounded-md flex items-center justify-center">
                        <ProjectArtwork
                          type={PROJECTS[selectedProjectIdx].artwork}
                        />
                      </div>
                      <h3 className="mt-3 font-serif-accent text-base font-bold italic text-[#d1c8ff]">
                        {PROJECTS[selectedProjectIdx].title}
                      </h3>
                      <p className="mt-1 text-xs text-gray-300">
                        {PROJECTS[selectedProjectIdx].description}
                      </p>
                    </div>
                  </div>
                )}

                {win.id === "caissa" && (
                  <div className="flex flex-col items-center">
                    <p className="mb-3 text-xs text-gray-300">
                      Click any highlighted square to move the knight (inspired
                      by <span className="italic text-[#d1c8ff]">Caissa</span>).
                    </p>
                    <div className="grid grid-cols-8 overflow-hidden rounded-lg border border-[#d1c8ff]/30">
                      {Array.from({ length: 64 }).map((_, idx) => {
                        const r = Math.floor(idx / 8);
                        const c = idx % 8;
                        const isDark = (r + c) % 2 === 1;
                        const isHere = r === knightPos[0] && c === knightPos[1];
                        const valid = isKnightMove(r, c);

                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              if (valid) setKnightPos([r, c]);
                            }}
                            className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center text-base transition-colors ${
                              isHere
                                ? "bg-[#7635cc] text-white"
                                : valid
                                  ? "bg-[#d1c8ff]/35 hover:bg-[#d1c8ff]/55 cursor-pointer"
                                  : isDark
                                    ? "bg-[#17122c]"
                                    : "bg-[#261f47]"
                            }`}
                          >
                            {isHere ? "♞" : valid ? "•" : ""}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </main>

      <footer className="relative z-30 mx-auto mb-4 flex items-center gap-2 rounded-2xl border border-white/15 bg-[#14102c]/85 px-4 py-2.5 shadow-2xl backdrop-blur-md">
        <button
          type="button"
          onClick={() => focusOrOpen("about")}
          title="About.md"
          className="flex cursor-pointer flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-xs text-gray-300 transition-colors hover:bg-white/10 hover:text-[#d1c8ff]"
        >
          <User className="h-5 w-5" />
          <span className="hidden sm:inline">About</span>
        </button>

        <button
          type="button"
          onClick={() => focusOrOpen("projects")}
          title="Projects"
          className="flex cursor-pointer flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-xs text-gray-300 transition-colors hover:bg-white/10 hover:text-[#d1c8ff]"
        >
          <FolderKanban className="h-5 w-5" />
          <span className="hidden sm:inline">Projects</span>
        </button>

        <button
          type="button"
          onClick={() => focusOrOpen("terminal")}
          title="Terminal"
          className="flex cursor-pointer flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-xs text-gray-300 transition-colors hover:bg-white/10 hover:text-[#d1c8ff]"
        >
          <Terminal className="h-5 w-5" />
          <span className="hidden sm:inline">Terminal</span>
        </button>

        <button
          type="button"
          onClick={() => focusOrOpen("caissa")}
          title="Caissa Chess"
          className="flex cursor-pointer flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-xs text-gray-300 transition-colors hover:bg-white/10 hover:text-[#d1c8ff]"
        >
          <Code2 className="h-5 w-5" />
          <span className="hidden sm:inline">Caissa</span>
        </button>

        <span className="mx-1 h-7 w-px bg-white/15" aria-hidden="true" />

        <Link
          href="/thoughts"
          title="My Thoughts"
          className="flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-xs text-gray-300 transition-colors hover:bg-white/10 hover:text-[#d1c8ff]"
        >
          <BookOpen className="h-5 w-5" />
          <span className="hidden sm:inline">Notes</span>
        </Link>

        <a
          href={LINKS.resume}
          target="_blank"
          rel="noopener noreferrer"
          title="Resume PDF"
          className="flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-xs text-gray-300 transition-colors hover:bg-white/10 hover:text-[#d1c8ff]"
        >
          <FileText className="h-5 w-5" />
          <span className="hidden sm:inline">Resume</span>
        </a>

        <Link
          href="/"
          title="Exit AkshatOS"
          className="flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-xs text-[#d1c8ff] transition-colors hover:bg-white/10"
        >
          <Cpu className="h-5 w-5" />
          <span className="hidden sm:inline">Home</span>
        </Link>
      </footer>
    </div>
  );
}
