import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prashanth Sundaram — Portfolio & Tools",
  description:
    "Software engineer building algorithmic trading systems, SaaS products, and cloud infrastructure tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="flex min-h-full flex-col bg-[#0f0f0f] text-[#e6e6e6]">
        <Nav />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
          {children}
        </main>
        <footer className="border-t border-[#2a2a2a] py-6">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 text-xs text-[#666] sm:px-6">
            <span>&copy; {new Date().getFullYear()} Prashanth Sundaram</span>
            <a
              href="https://github.com/prashanth116-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#666] transition-colors hover:text-[#a0a0a0]"
            >
              GitHub
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
