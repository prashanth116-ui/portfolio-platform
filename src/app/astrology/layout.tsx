import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vedic Birth Chart — Prashanth Sundaram",
  description:
    "Vedic astrology birth chart calculator with precise planetary positions, Vimshottari Dasha timeline, and AI-powered interpretation.",
};

export default function AstrologyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
