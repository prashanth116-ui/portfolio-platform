"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import {
  Home,
  FolderKanban,
  TrendingUp,
  ScanSearch,
  Sparkles,
  BookOpen,
  Menu,
  X,
  Wrench,
  ChevronDown,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/research", label: "Research", icon: BookOpen },
  { href: "/trading", label: "Trading", icon: TrendingUp },
];

const toolItems = [
  { href: "/scanner", label: "Scanner", icon: ScanSearch },
  { href: "/astrology", label: "Astrology", icon: Sparkles },
];

export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);

  // Standalone pages (shared on X) — show name only, no nav links
  const isStandalone = pathname.startsWith("/learn");

  const isToolsActive = toolItems.some((t) => pathname.startsWith(t.href));

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    }
    if (toolsOpen) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [toolsOpen]);

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

              {/* Tools dropdown */}
              <div className="relative" ref={toolsRef}>
                <button
                  onClick={() => setToolsOpen(!toolsOpen)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    isToolsActive
                      ? "bg-[#185FA5]/20 text-[#5ba3e6]"
                      : "text-[#a0a0a0] hover:bg-[#1a1a1a] hover:text-white"
                  )}
                >
                  <Wrench className="h-4 w-4" />
                  Tools
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 transition-transform",
                      toolsOpen && "rotate-180"
                    )}
                  />
                </button>

                {toolsOpen && (
                  <div className="absolute right-0 top-full mt-1 w-44 rounded-md border border-[#2a2a2a] bg-[#1a1a1a] py-1 shadow-lg">
                    {toolItems.map((item) => {
                      const isActive = pathname.startsWith(item.href);
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setToolsOpen(false)}
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 text-sm transition-colors",
                            isActive
                              ? "text-[#5ba3e6]"
                              : "text-[#a0a0a0] hover:bg-[#2a2a2a] hover:text-white"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
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

          {/* Tools section */}
          <div className="mt-2 border-t border-[#2a2a2a] pt-2">
            <span className="px-3 text-[10px] font-medium uppercase tracking-wider text-[#666]">
              Tools
            </span>
            {toolItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
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
          </div>
        </nav>
      )}
    </header>
  );
}
