import type { Metadata } from "next";
import { EWLearnContent } from "@/components/ew-learn-content";

export const metadata: Metadata = {
  title: "Elliott Wave Guide — From First Principles to Professional Analysis",
  description:
    "A free, comprehensive 11-module guide covering impulse waves, corrections, Fibonacci targets, channeling, wave personality, and practical counting. Interactive SVG diagrams included.",
  openGraph: {
    title: "Elliott Wave Guide",
    description:
      "Free 11-module guide: impulse waves, corrections, Fibonacci, channeling, wave personality & practical counting. Interactive diagrams included.",
    type: "article",
    siteName: "Prashanth Sundaram",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elliott Wave Guide",
    description:
      "Free 11-module guide: impulse waves, corrections, Fibonacci, channeling, wave personality & practical counting.",
  },
};

export default function StandaloneEWLearnPage() {
  return <EWLearnContent standalone />;
}
