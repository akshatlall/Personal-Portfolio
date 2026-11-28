
import type { Metadata } from "next";
import {
  Anton,
  Caveat,
  Inter,
  Permanent_Marker,
} from "next/font/google";

import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const marker = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-marker",
  display: "swap",
});

const handwriting = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-handwriting",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Akshat Lal",
  description:
    "Computer Engineering student at the University of Waterloo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${anton.variable} ${inter.variable} ${marker.variable} ${handwriting.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
