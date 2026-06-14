import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stock Scanner — Prashanth Sundaram",
  description:
    "TradingView screener data with sector/signal filtering, sortable columns, and historical tracking. Updated every 15 minutes during market hours.",
};

export default function ScannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
