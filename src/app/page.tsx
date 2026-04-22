import Link from "next/link";
import { projects } from "@/data/projects";
import { strategies } from "@/data/strategies";
import { tradingSystems } from "@/data/trading-systems";
import { StatusBadge } from "@/components/status-badge";
import {
  FolderKanban,
  TrendingUp,
  Layers,
  ScanSearch,
  ArrowRight,
  ExternalLink,
  BarChart3,
  BookOpen,
} from "lucide-react";

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

export default function HomePage() {
  const activeProjects = projects.filter(
    (p) => p.status !== "ARCHIVED" && !TOOL_IDS.has(p.id)
  );

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Prashanth Sundaram
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-[#a0a0a0]">
          Software engineer building algorithmic trading systems, SaaS products,
          and cloud infrastructure tools.
        </p>
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
              : { href: "/projects" };
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

function MetricCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number | string;
}) {
  return (
    <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-4">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-[#5ba3e6]" />
        <span className="text-xs text-[#a0a0a0]">{label}</span>
      </div>
      <p className="mt-1 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
