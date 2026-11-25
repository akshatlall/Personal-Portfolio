export const EMAIL = "a7lal@uwaterloo.ca";

export const LINKS = {
  github: "https://github.com/lal-akshat",
  linkedin: "https://linkedin.com/in/lal-akshat",
  resume: "/resume.pdf",
};

export const PROJECTS = [
  {
    title: "Caissa",
    date: "Aug 2026",
    artwork: "caissa" as const,
    summary:
      "Chess engine in C# with an AI opponent across Standard, Chess960 and Atomic.",
    description:
      "A C# chess engine and WinForms desktop app built from scratch, with reusable board, piece, move, and game-state models. Implements full movement, check, checkmate, and capture logic for all 6 piece types across Standard, Chess960, and Atomic rule sets, plus an AI opponent with its own move-evaluation logic and a UI layer with move highlighting, clocks, and move history.",
    tags: ["C#", ".NET", "WinForms"],
  },
  {
    title: "Task Management Web App",
    date: "Jul 2026",
    artwork: "tasks" as const,
    summary: "Full-stack task manager with Next.js, TypeScript and SQL.",
    description:
      "A full-stack task manager built with Next.js and TypeScript, supporting task creation, editing, organization, and status tracking end to end. Backed by a SQL schema and persistence layer so tasks and project state reliably survive across sessions.",
    tags: ["TypeScript", "Next.js", "SQL"],
  },
  {
    title: "Portfolio",
    date: "Aug 2026",
    artwork: "portfolio" as const,
    summary: "This site. Next.js and TypeScript, deployed on Vercel.",
    description:
      "This site — a responsive personal portfolio built with Next.js and TypeScript, with a light/dark mode toggle and scroll-triggered animation. Deployed on Vercel with continuous deployment so every pushed change goes live automatically.",
    tags: ["Next.js", "TypeScript"],
  },
  {
    title: "Java Image Editor",
    date: "Jun 2026",
    artwork: "editor" as const,
    summary: "Desktop image editor with custom pixel-manipulation filters.",
    description:
      "A desktop image editor built in Java Swing, separating image data, editing operations, and UI into distinct components. Event-driven controls apply edits interactively, including grayscale, cropping, rotation, and brightness adjustment via custom pixel-manipulation algorithms.",
    tags: ["Java", "Swing", "OOP"],
  },
  {
    title: "Simon",
    date: "May 2026",
    artwork: "simon" as const,
    summary: "Memory game on Arduino: buttons, LEDs and sequence timing.",
    description:
      "A memory game built on Arduino, focused on embedded programming and hardware interaction — reading button input, driving LEDs, and timing sequences directly on the board.",
    tags: ["Arduino", "C++"],
  },
  {
    title: "NBA Research",
    date: "Apr 2026",
    artwork: "nba" as const,
    summary: "Player height vs. rebounding, using public NBA statistics.",
    description:
      "A data project exploring the relationship between player height and rebounding using publicly available NBA statistics.",
    tags: ["Python", "Data"],
  },
];

export const EXPERIENCE = [
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