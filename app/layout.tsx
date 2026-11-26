import type { Metadata } from "next";
import {
  IBM_Plex_Mono,
  Playfair_Display,
  Plus_Jakarta_Sans,
  Spectral,
} from "next/font/google";

import "./globals.css";

const heading = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Spectral({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Akshat Lal | Portfolio",
  description:
    "Computer Engineering student at the University of Waterloo building at the intersection of hardware, software, and problem-solving.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${sans.variable} ${serif.variable} ${mono.variable}`}
    >
      <body className="antialiased bg-[#04020e] text-[#eae5df] selection:bg-[#d1c8ff]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
