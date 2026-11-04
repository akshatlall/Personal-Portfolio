import Image from "next/image";

type Artwork = "caissa" | "tasks" | "portfolio" | "editor" | "simon" | "nba";

const artwork: Record<Artwork, { src: string; alt: string }> = {
  caissa: {
    src: "/projects/caissa.svg",
    alt: "Caissa chess application interface with a chessboard, game clock, and move history",
  },
  tasks: {
    src: "/projects/tasks.svg",
    alt: "Task management application interface with organized project columns and task cards",
  },
  portfolio: {
    src: "/projects/portfolio.svg",
    alt: "Responsive portfolio displayed across desktop and mobile browser windows",
  },
  editor: {
    src: "/projects/editor.svg",
    alt: "Image editor interface demonstrating photo adjustments and editing tools",
  },
  simon: {
    src: "/projects/simon.svg",
    alt: "Arduino Simon memory game with illuminated controls and connected electronics",
  },
  nba: {
    src: "/projects/nba.svg",
    alt: "NBA research dashboard charting player height against rebounds",
  },
};

export default function ProjectArtwork({ type }: { type: Artwork }) {
  const image = artwork[type];

  return (
    <div className={`project-art project-art-${type}`}>
      <Image
        className="project-image"
        src={image.src}
        alt={image.alt}
        width={1600}
        height={1000}
        sizes="(max-width: 700px) calc(100vw - 40px), 420px"
      />
    </div>
  );
}
