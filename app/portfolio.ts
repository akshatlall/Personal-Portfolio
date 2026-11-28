export const EMAIL = "a7lal@uwaterloo.ca";

export const LINKS = {
  github: "https://github.com/lal-akshat",
  linkedin: "https://linkedin.com/in/lal-akshat",
  resume: "/resume.pdf",
};

export const PROJECTS = [
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
      "This responsive personal portfolio is built with Next.js and TypeScript, with light/dark mode and scroll-triggered animation. It is deployed on Vercel with continuous deployment.",
    tags: ["Next.js", "TypeScript"],
  },
  {
    title: "Java Image Editor",
    date: "jun '26",
    artwork: "editor" as const,
    description:
      "A desktop image editor built in Java Swing, separating image data, editing operations, and UI into distinct components. Interactive controls apply grayscale, cropping, rotation, brightness, and custom pixel-manipulation filters.",
    tags: ["Java", "Swing", "OOP"],
  },
  {
    title: "Simon",
    date: "may '26",
    artwork: "simon" as const,
    description:
      "A memory game built on Arduino, using button input, LEDs, and timed sequences.",
    tags: ["Arduino", "C++"],
  },
  {
    title: "NBA Research",
    date: "apr '26",
    artwork: "nba" as const,
    description:
      "A data project exploring the relationship between player height and rebounding using public NBA statistics.",
    tags: ["Python", "Data"],
  },
];

export const EXPERIENCE = [
  {
    role: "Team Lead",
    org: "VEX Robotics Team",
    date: "2022 - 2026",
    accent: "peach",
    bullets: [
      "Led four seasons, progressing from team member to Team Lead across design, build, test, and iteration.",
      "Directed mechanical design and robot assembly priorities.",
      "Ran reliability tests before competitions to catch failure points early.",
    ],
  },
  {
    role: "New Member, Electrical Team",
    org: "Student Design Team",
    date: "2026 - Present",
    accent: "mint",
    bullets: [
      "Design and lay out circuit boards in Altium Designer.",
      "Collaborate with electrical and mechanical members on a robotic-arm subsystem.",
    ],
  },
  {
    role: "Computer Engineering",
    org: "University of Waterloo",
    date: "2026 - 2031",
    accent: "sky",
    bullets: [
      "Bachelor of Applied Science in Computer Engineering (co-op).",
    ],
  },
];
