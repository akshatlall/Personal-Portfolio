type Doodle = {
  className: string;
  viewBox: string;
  path: string;
};

const DOODLES: Doodle[] = [
  {
    className: "doodle doodle-hero-loop",
    viewBox: "0 0 52 52",
    path: "M5 26C5 10 16 4 28 5c14 1 21 11 18 24-3 14-15 19-27 16",
  },
  {
    className: "doodle doodle-hero-wave",
    viewBox: "0 0 76 30",
    path: "M3 17C14 3 23 29 35 15S57 2 72 15",
  },
  {
    className: "doodle doodle-project-curl",
    viewBox: "0 0 54 54",
    path: "M5 28C4 11 16 4 30 6c15 2 21 17 15 29-5 11-17 15-27 10",
  },
  {
    className: "doodle doodle-project-wave",
    viewBox: "0 0 76 30",
    path: "M3 17C14 3 23 29 35 15S57 2 72 15",
  },
  {
    className: "doodle doodle-experience-loop",
    viewBox: "0 0 52 52",
    path: "M7 28C5 13 14 5 28 6c15 1 22 13 18 27-4 13-18 17-30 11",
  },
  {
    className: "doodle doodle-notes-wave",
    viewBox: "0 0 76 30",
    path: "M3 17C14 3 23 29 35 15S57 2 72 15",
  },
];

export default function PageDoodles() {
  return (
    <div className="page-doodles" aria-hidden="true">
      {DOODLES.map((doodle) => (
        <svg
          key={doodle.className}
          className={doodle.className}
          viewBox={doodle.viewBox}
        >
          <path d={doodle.path} />
        </svg>
      ))}
    </div>
  );
}
