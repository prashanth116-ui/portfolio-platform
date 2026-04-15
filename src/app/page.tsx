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
} from "lucide-react";

export default function HomePage() {
  const activeProjects = projects.filter((p) => p.status !== "ARCHIVED");

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
          value={activeProjects.length}
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
        <MetricCard icon={ScanSearch} label="Tools" value={1} />
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
          {activeProjects.slice(0, 6).map((p) => (
            <Link key={p.id} href="/projects">
              <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-4 transition-colors hover:border-[#3a3a3a]">
                <h3 className="font-semibold text-white">{p.name}</h3>
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
            </Link>
          ))}
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
          <Link href="/scanner">
            <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-4 transition-colors hover:border-[#3a3a3a]">
              <div className="flex items-center gap-2">
                <ScanSearch className="h-5 w-5 text-[#5ba3e6]" />
                <h3 className="font-semibold text-white">Stock Scanner</h3>
              </div>
              <p className="mt-1 text-xs text-[#a0a0a0]">
                Pre-run TradingView screener data with filtering, sorting, and
                historical tracking. Updated every 15 minutes during market hours.
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {["Next.js", "Supabase", "TradingView", "Vercel Cron"].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded bg-[#2a2a2a] px-1.5 py-0.5 text-[10px] text-[#a0a0a0]"
                    >
                      {t}
                    </span>
                  )
                )}
              </div>
            </div>
          </Link>
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
