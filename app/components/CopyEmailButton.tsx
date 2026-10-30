"use client";

import { useState } from "react";

const EMAIL = "a7lal@uwaterloo.ca";

export default function CopyEmailButton({
  className,
}: {
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard?.writeText(EMAIL);
    } catch {
      // Clipboard access can be unavailable in browser preview environments.
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <button
      type="button"
      className={className}
      onClick={copyEmail}
      aria-label={copied ? "Email copied" : `Copy ${EMAIL}`}
    >
      {copied ? "Email copied" : EMAIL}
    </button>
  );
}
