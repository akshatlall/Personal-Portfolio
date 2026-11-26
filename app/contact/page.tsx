import CopyEmailButton from "../components/CopyEmailButton";
import { LINKS } from "../portfolio";

export default function Contact() {
  return (
    <>
      <p className="eyebrow">Contact</p>
      <h1 className="page-heading">Let&rsquo;s talk.</h1>
      <p className="body-text">
        Open to Winter 2027 co-op conversations, or just chatting about
        computer engineering. Easiest ways to reach me:
      </p>

      <div className="panel-reserved">
        <div className="contact-row">
          <span className="reserved-label">Email</span>
          <CopyEmailButton className="trace-link" />
        </div>
        <div className="contact-row">
          <span className="reserved-label">GitHub</span>
          <a
            className="trace-link"
            href={LINKS.github}
            target="_blank"
            rel="noreferrer"
          >
            github.com/lal-akshat
          </a>
        </div>
        <div className="contact-row">
          <span className="reserved-label">LinkedIn</span>
          <a
            className="trace-link"
            href={LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            linkedin.com/in/lal-akshat
          </a>
        </div>
      </div>
    </>
  );
}
