import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { strategies } from "@/data/strategies";
import { tradingSystems } from "@/data/trading-systems";
import { StatusBadge } from "@/components/status-badge";
import { MetricCard } from "@/components/metric-card";
import {
  FolderKanban,
  TrendingUp,
  Layers,
  ScanSearch,
  ArrowRight,
  ExternalLink,
  BarChart3,
  BookOpen,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Prashanth Sundaram — Software Engineer & Algo Trader",
  description:
    "Software engineer building algorithmic trading systems, SaaS products, and cloud infrastructure tools. 20+ projects across trading, market research, and full-stack development.",
};

// IDs shown in the Tools section — exclude from Software Projects to avoid duplication
const TOOL_IDS = new Set(["ew_scanner", "ict_trading_dashboard"]);

const TOOLS = [
  {
    name: "EW Scanner",
    href: "https://ew-scanner.vercel.app",
    external: true,
    icon: BarChart3,
    description:
      "Algorithmic Elliott Wave scanner with Fibonacci analysis, multi-timeframe confirmation, and AI-powered deep analysis across 180+ stocks.",
    tech: ["Next.js", "Claude API", "Yahoo Finance", "lightweight-charts"],
  },
  {
    name: "ICT Dashboard",
    href: "https://ict-mastery.vercel.app",
    external: true,
    icon: BookOpen,
    description:
      "Smart Money Concepts reference with 30+ interactive tabs, live kill zone timer, confluence scorer, and trade journal. PWA with offline support.",
    tech: ["Next.js", "TypeScript", "Supabase", "PWA"],
  },
  {
    name: "Stock Scanner",
    href: "/scanner",
    external: false,
    icon: ScanSearch,
    description:
      "Pre-run TradingView screener data with filtering, sorting, and historical tracking. Updated every 15 minutes during market hours.",
    tech: ["Next.js", "Supabase", "TradingView", "Vercel Cron"],
  },
];

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    href: "https://github.com/prashanth116-ui",
    label: "GitHub",
    icon: GitHubIcon,
  },
  {
    href: "https://linkedin.com/in/prashanth-sundaram",
    label: "LinkedIn",
    icon: LinkedInIcon,
  },
  {
    href: "mailto:prashanth@example.com",
    label: "Email",
    icon: Mail,
  },
];

export default function HomePage() {
  const activeProjects = projects.filter(
    (p) => p.status !== "ARCHIVED" && !TOOL_IDS.has(p.id)
  );

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
        <div className="flex-shrink-0">
          <Image
            src="/photo.jpg"
            alt="Prashanth Sundaram"
            width={160}
            height={160}
            className="rounded-full border-2 border-[#2a2a2a]"
            priority
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Prashanth Sundaram
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-[#a0a0a0]">
            Software engineer building algorithmic trading systems, SaaS
            products, and cloud infrastructure tools. Focused on turning
            quantitative research into production-grade systems.
          </p>
          <div className="mt-4 flex items-center gap-4">
            {SOCIAL_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="flex items-center gap-1.5 text-sm text-[#a0a0a0] transition-colors hover:text-[#5ba3e6]"
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <MetricCard
          icon={FolderKanban}
          label="Active Projects"
          value={projects.filter((p) => p.status !== "ARCHIVED").length}
        />
        <MetricCard
          icon={TrendingUp}
          label="Trading Systems"
          value={tradingSystems.length}
        />
        <MetricCard
          icon={Layers}
          label="Strategies"
          value={strategies.length}
        />
        <MetricCard icon={ScanSearch} label="Tools" value={TOOLS.length} />
      </section>

      {/* Software Projects */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Software Projects</h2>
          <Link
            href="/projects"
            className="flex items-center gap-1 text-sm text-[#5ba3e6] hover:text-[#7bb8ed]"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {activeProjects.slice(0, 6).map((p) => {
            const Wrapper = p.url ? "a" : Link;
            const wrapperProps = p.url
              ? { href: p.url, target: "_blank" as const, rel: "noopener noreferrer" }
              : { href: p.has_detail ? `/projects/${p.id}` : "/projects" };
            return (
              <Wrapper key={p.id} {...wrapperProps}>
                <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-4 transition-colors hover:border-[#3a3a3a]">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white">{p.name}</h3>
                    {p.url && (
                      <ExternalLink className="h-3.5 w-3.5 text-green-400" />
                    )}
                  </div>
                  <p className="mt-1 text-xs text-[#a0a0a0] line-clamp-2">
                    {p.tagline}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <StatusBadge status={p.status} />
                    {p.tech_stack && (
                      <div className="flex gap-1">
                        {p.tech_stack.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="rounded bg-[#2a2a2a] px-1.5 py-0.5 text-[10px] text-[#a0a0a0]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </section>

      {/* Trading Systems */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Trading Systems</h2>
          <Link
            href="/trading"
            className="flex items-center gap-1 text-sm text-[#5ba3e6] hover:text-[#7bb8ed]"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tradingSystems.map((sys) => (
            <Link key={sys.name} href="/trading">
              <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-4 transition-colors hover:border-[#3a3a3a]">
                <h3 className="font-semibold text-white">{sys.name}</h3>
                <p className="mt-1 text-xs text-[#a0a0a0]">{sys.tagline}</p>
                <div className="mt-2 flex items-center gap-2">
                  <StatusBadge status={sys.status} />
                  <span className="text-xs text-[#a0a0a0]">{sys.version}</span>
                </div>
                <p className="mt-2 text-xs text-[#a0a0a0]">
                  {sys.instruments.join(", ")}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {sys.tech_stack.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-[#2a2a2a] px-1.5 py-0.5 text-[10px] text-[#a0a0a0]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section>
        <h2 className="text-2xl font-bold text-white">Tools</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            const Wrapper = tool.external ? "a" : Link;
            const wrapperProps = tool.external
              ? { href: tool.href, target: "_blank" as const, rel: "noopener noreferrer" }
              : { href: tool.href };
            return (
              <Wrapper key={tool.name} {...wrapperProps}>
                <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-4 transition-colors hover:border-[#3a3a3a]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-[#5ba3e6]" />
                      <h3 className="font-semibold text-white">{tool.name}</h3>
                    </div>
                    {tool.external && (
                      <ExternalLink className="h-3.5 w-3.5 text-green-400" />
                    )}
                  </div>
                  <p className="mt-1 text-xs text-[#a0a0a0]">
                    {tool.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {tool.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded bg-[#2a2a2a] px-1.5 py-0.5 text-[10px] text-[#a0a0a0]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </section>
    </div>
  );
}
