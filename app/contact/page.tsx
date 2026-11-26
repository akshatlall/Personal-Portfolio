import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../components/BrandIcons";
import CopyEmailButton from "../components/CopyEmailButton";
import { LINKS } from "../portfolio-data";

export default function Contact() {
  return (
    <main className="min-h-screen w-full bg-[#04020e] px-6 py-24 text-[#eae5df]">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#d1c8ff] transition-colors hover:italic"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Link>

        <p className="mt-8 font-serif-accent text-lg italic text-[#d1c8ff]">
          Contact
        </p>
        <h1 className="mt-1 font-heading text-4xl sm:text-5xl text-white">
          Let&rsquo;s talk.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#eae5df]/85">
          Open to Spring 2027 co-op conversations, or just chatting about
          computer engineering, hardware, and software. Easiest ways to reach
          me:
        </p>

        <div className="mt-8 divide-y divide-white/10 rounded-xl border border-white/10 bg-[#0b0818] p-6">
          <div className="flex items-center justify-between py-4 first:pt-0">
            <span className="text-sm font-medium text-gray-400">Email</span>
            <CopyEmailButton className="cursor-pointer font-mono-code text-sm text-[#d1c8ff] hover:underline" />
          </div>

          <div className="flex items-center justify-between py-4">
            <span className="text-sm font-medium text-gray-400">GitHub</span>
            <a
              className="inline-flex items-center gap-2 text-sm text-[#d1c8ff] hover:underline"
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon className="h-4 w-4" />
              github.com/lal-akshat
            </a>
          </div>

          <div className="flex items-center justify-between py-4 last:pb-0">
            <span className="text-sm font-medium text-gray-400">LinkedIn</span>
            <a
              className="inline-flex items-center gap-2 text-sm text-[#d1c8ff] hover:underline"
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinIcon className="h-4 w-4" />
              linkedin.com/in/lal-akshat
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
