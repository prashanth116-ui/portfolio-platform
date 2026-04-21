"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Home,
  FolderKanban,
  TrendingUp,
  ScanSearch,
  Activity,
  Sparkles,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/trading", label: "Trading", icon: TrendingUp },
  { href: "/scanner", label: "Scanner", icon: ScanSearch },
  { href: "/ew-scanner", label: "EW Scanner", icon: Activity },
  { href: "/astrology", label: "Astrology", icon: Sparkles },
];

export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Standalone pages (shared on X) — show name only, no nav links
  const isStandalone = pathname.startsWith("/learn");

  return (
    <header className="sticky top-0 z-50 border-b border-[#2a2a2a] bg-[#0f0f0f]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href={isStandalone ? pathname : "/"} className="flex items-center gap-2">
          <span className="text-lg font-bold text-white">Prashanth Sundaram</span>
        </Link>

        {!isStandalone && (
          <>
            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-[#185FA5]/20 text-[#5ba3e6]"
                        : "text-[#a0a0a0] hover:bg-[#1a1a1a] hover:text-white"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-md p-2 text-[#a0a0a0] hover:bg-[#1a1a1a] md:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </>
        )}
      </div>

      {/* Mobile nav */}
      {!isStandalone && mobileOpen && (
        <nav className="border-t border-[#2a2a2a] bg-[#0f0f0f] px-4 py-3 md:hidden">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#185FA5]/20 text-[#5ba3e6]"
                    : "text-[#a0a0a0] hover:bg-[#1a1a1a] hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
