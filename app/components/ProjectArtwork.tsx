type Artwork = "caissa" | "tasks" | "portfolio" | "editor" | "simon" | "nba";

const labels: Record<Artwork, string> = {
  caissa: "Illustration of a chess board and knight",
  tasks: "Illustration of a task management board",
  portfolio: "Illustration of a portfolio web page",
  editor: "Illustration of an image editor",
  simon: "Illustration of an Arduino memory game",
  nba: "Illustration of basketball data research",
};

export default function ProjectArtwork({ type }: { type: Artwork }) {
  return (
    <div className={`project-art project-art-${type}`} role="img" aria-label={labels[type]}>
      <span className="art-dot art-dot-one" />
      <span className="art-dot art-dot-two" />

      {type === "caissa" && (
        <>
          <div className="art-chessboard">
            {Array.from({ length: 64 }, (_, index) => <span key={index} />)}
          </div>
          <span className="art-knight">♞</span>
          <span className="art-label">CAISSA</span>
        </>
      )}

      {type === "tasks" && (
        <>
          <div className="art-window">
            <span /><span /><span />
            <div className="art-task-columns">
              <div><i /><i /><i /></div>
              <div><i /><i /></div>
              <div><i /><i /><i /></div>
            </div>
          </div>
          <span className="art-label">TASKS</span>
        </>
      )}

      {type === "portfolio" && (
        <>
          <div className="art-browser">
            <div className="art-browser-bar"><span /><span /><span /></div>
            <div className="art-browser-content"><b>AL</b><i /><i /><i /></div>
          </div>
          <span className="art-code">&lt;/&gt;</span>
          <span className="art-label">WEB</span>
        </>
      )}

      {type === "editor" && (
        <>
          <div className="art-editor-frame">
            <div className="art-editor-photo"><span /><span /></div>
            <div className="art-editor-tools"><i /><i /><i /></div>
          </div>
          <span className="art-cursor">↖</span>
          <span className="art-label">PIXELS</span>
        </>
      )}

      {type === "simon" && (
        <>
          <div className="art-simon-board"><span /><span /><span /><span /></div>
          <div className="art-wire art-wire-one" /><div className="art-wire art-wire-two" />
          <span className="art-label">SIMON</span>
        </>
      )}

      {type === "nba" && (
        <>
          <div className="art-chart"><i /><i /><i /><i /></div>
          <span className="art-basketball">●</span>
          <span className="art-hoop">⌒</span>
          <span className="art-label">DATA</span>
        </>
      )}
    </div>
  );
}
