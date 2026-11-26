export const EMAIL = "a7lal@uwaterloo.ca";

export const LINKS = {
  github: "https://github.com/lal-akshat",
  linkedin: "https://linkedin.com/in/lal-akshat",
  resume: "/resume.pdf",
};

export type ProjectArtworkType =
  | "caissa"
  | "tasks"
  | "portfolio"
  | "editor"
  | "simon"
  | "nba";

export interface ProjectItem {
  title: string;
  date: string;
  artwork: ProjectArtworkType;
  summary: string;
  description: string;
  tags: string[];
  github?: string;
  website?: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    title: "Caissa",
    date: "2026",
    artwork: "caissa",
    summary:
      "Chess engine in C# with an AI opponent across Standard, Chess960 and Atomic.",
    description:
      "A C# chess engine and WinForms desktop app built from scratch, with reusable board, piece, move, and game-state models. Implements full movement, check, checkmate, and capture logic for all 6 piece types across Standard, Chess960, and Atomic rule sets, plus an AI opponent with its own move-evaluation logic and a UI layer with move highlighting, clocks, and move history.",
    tags: ["C#", ".NET", "WinForms"],
    github: "https://github.com/lal-akshat",
  },
  {
    title: "Task Management Web App",
    date: "2026",
    artwork: "tasks",
    summary: "Full-stack task manager with Next.js, TypeScript and SQL.",
    description:
      "A full-stack task manager built with Next.js and TypeScript, supporting task creation, editing, organization, and status tracking end to end. Backed by a SQL schema and persistence layer so tasks and project state reliably survive across sessions.",
    tags: ["TypeScript", "Next.js", "SQL"],
    github: "https://github.com/lal-akshat",
  },
  {
    title: "Portfolio",
    date: "2026",
    artwork: "portfolio",
    summary: "This site. Next.js, TypeScript, and interactive cosmic UI.",
    description:
      "A responsive personal portfolio built with Next.js, TypeScript, Tailwind CSS, and Motion, featuring an interactive starfield hero, scroll-driven timeline & parallax, and a virtual desktop OS experience.",
    tags: ["Next.js", "TypeScript", "Motion"],
    github: "https://github.com/lal-akshat",
  },
  {
    title: "Java Image Editor",
    date: "2026",
    artwork: "editor",
    summary: "Desktop image editor with custom pixel-manipulation filters.",
    description:
      "A desktop image editor built in Java Swing, separating image data, editing operations, and UI into distinct components. Event-driven controls apply edits interactively, including grayscale, cropping, rotation, and brightness adjustment via custom pixel-manipulation algorithms.",
    tags: ["Java", "Swing", "OOP"],
    github: "https://github.com/lal-akshat",
  },
  {
    title: "Simon",
    date: "2026",
    artwork: "simon",
    summary: "Memory game on Arduino: buttons, LEDs and sequence timing.",
    description:
      "A memory game built on Arduino, focused on embedded programming and hardware interaction — reading button input, driving LEDs, and timing sequences directly on the board.",
    tags: ["Arduino", "C++", "Embedded"],
    github: "https://github.com/lal-akshat",
  },
  {
    title: "NBA Research",
    date: "2026",
    artwork: "nba",
    summary: "Player height vs. rebounding, using public NBA statistics.",
    description:
      "A data project exploring the relationship between player height and rebounding using publicly available NBA statistics, statistical modeling, and visual analysis.",
    tags: ["Python", "Data", "Analysis"],
    github: "https://github.com/lal-akshat",
  },
];

export interface ExperienceItem {
  year: string;
  term: string;
  role: string;
  org: string;
  location: string;
  date: string;
  bullets: string[];
  tags: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    year: "2026",
    term: "Present",
    role: "Electrical Team Member",
    org: "Student Design Team",
    location: "Waterloo",
    date: "2026 – Present",
    bullets: [
      "Design and lay out printed circuit boards in Altium Designer for onboard vehicle electronics",
      "Collaborate with senior electrical and mechanical members on component selection and board layout ahead of a moving robotic-arm subsystem build",
    ],
    tags: ["Altium Designer", "PCB Layout", "Hardware"],
  },
  {
    year: "2026",
    term: "2026 – 2031",
    role: "BASc Computer Engineering",
    org: "University of Waterloo",
    location: "Waterloo",
    date: "2026 – 2031",
    bullets: [
      "Bachelor of Applied Science in Computer Engineering, starting Fall 2026",
      "Building at the intersection of embedded systems, digital hardware, and full-stack software — actively seeking Spring 2027 co-op opportunities",
    ],
    tags: ["Computer Engineering", "Co-op", "Systems"],
  },
  {
    year: "2022",
    term: "2022 – 2026",
    role: "Team Lead",
    org: "VEX Robotics Team",
    location: "4 Seasons",
    date: "2022 – 2026",
    bullets: [
      "Competed for 4 consecutive seasons, progressing from team member to Team Lead directing the full design, build, test, and iteration cycle",
      "Directed mechanical design, robot assembly, and programming priorities to deliver a functioning competition robot each season",
      "Ran reliability tests ahead of competition to catch failure points early, reducing the risk of in-match breakdowns",
    ],
    tags: ["Robotics", "Leadership", "C++ / Systems"],
  },
];

export const COMMUNITY_CARDS = [
  {
    name: "VEX Robotics",
    role: "Team Lead",
    term: "2022 – 2026",
    badge: "4 Seasons",
    description:
      "Directed mechanical design, robot assembly, programming priorities, and pre-match reliability testing across four competitive seasons.",
    href: "#experience",
    external: false,
  },
  {
    name: "Student Design Team",
    role: "Electrical Team",
    term: "2026 – Present",
    badge: "Altium PCB",
    description:
      "Laying out printed circuit boards in Altium Designer for onboard vehicle electronics and a moving robotic-arm subsystem.",
    href: "#experience",
    external: false,
  },
  {
    name: "My Thoughts",
    role: "Personal Notebook",
    term: "Ongoing",
    badge: "Essays & Logs",
    description:
      "An evolving collection of beliefs, technology principles, project logs, and questions I am still figuring out.",
    href: "/thoughts",
    external: false,
  },
];

export const HIGHLIGHTS = [
  {
    title: "VEX Robotics Team Lead",
    year: "2022–2026",
    description:
      "Led design, build, programming, and reliability testing across 4 consecutive competitive seasons.",
    badge: "Leadership",
  },
  {
    title: "Altium PCB Design",
    year: "2026",
    description:
      "Designing and laying out onboard vehicle electronics PCBs for a robotic-arm subsystem.",
    badge: "Hardware",
  },
  {
    title: "Caissa Chess Engine",
    year: "2026",
    description:
      "Built a C# chess engine from scratch supporting Standard, Chess960, and Atomic with an AI opponent.",
    badge: "Systems",
  },
  {
    title: "University of Waterloo",
    year: "2026–2031",
    description:
      "BASc in Computer Engineering — seeking Spring 2027 co-op opportunities.",
    badge: "Education",
  },
  {
    title: "Full-Stack Web Apps",
    year: "2026",
    description:
      "Shipped end-to-end TypeScript, Next.js, and SQL applications with persistent data models.",
    badge: "Software",
  },
  {
    title: "Embedded Arduino",
    year: "2026",
    description:
      "Built hardware-driven Simon memory game with real-time LEDs, button debouncing, and timing.",
    badge: "Embedded",
  },
  {
    title: "Java Swing Editor",
    year: "2026",
    description:
      "Engineered custom pixel-manipulation filters, rotation, cropping, and OOP architecture.",
    badge: "OOP",
  },
];
