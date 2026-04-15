import Link from "next/link";
import { strategies } from "@/data/strategies";
import { StrategyCard } from "@/components/strategy-card";
import { ArrowRight, GitBranch, Clock, BarChart3 } from "lucide-react";

const STATUS_GROUPS = [
  { label: "Active", statuses: ["ACTIVE"] },
  { label: "In Development", statuses: ["IN_DEVELOPMENT"] },
  { label: "Experimental", statuses: ["EXPERIMENTAL"] },
  { label: "Deprecated", statuses: ["DEPRECATED"] },
] as const;

const subPages = [
  { href: "/trading/flows", label: "Strategy Flows", desc: "9 architecture diagrams", icon: GitBranch },
  { href: "/trading/timeline", label: "Version Timeline", desc: "V6 through V10.16", icon: Clock },
  { href: "/trading/performance", label: "Performance", desc: "Backtest charts & metrics", icon: BarChart3 },
];

export default function TradingPage() {
  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Trading Strategies
        </h1>
        <p className="mt-2 text-[#a0a0a0]">
          6 strategies across 3 repositories — futures and equities. V10 FVG is
          the active production strategy; others are in research/development.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <MetricBox label="Active Version" value="V10.16" />
        <MetricBox label="Instruments" value="7" />
        <MetricBox label="Strategies" value="6" />
        <MetricBox label="Repos" value="3" />
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        {subPages.map((p) => (
          <Link key={p.href} href={p.href}>
            <div className="flex items-center gap-3 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-4 transition-colors hover:border-[#3a3a3a]">
              <p.icon className="h-5 w-5 text-[#5ba3e6]" />
              <div className="flex-1">
                <span className="font-medium text-white">{p.label}</span>
                <p className="text-xs text-[#a0a0a0]">{p.desc}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-[#a0a0a0]" />
            </div>
          </Link>
        ))}
      </section>

      {STATUS_GROUPS.map((group) => {
        const filtered = strategies.filter((s) =>
          (group.statuses as readonly string[]).includes(s.status)
        );
        if (filtered.length === 0) return null;
        return (
          <section key={group.label}>
            <h2 className="mb-4 text-xl font-semibold text-white">
              {group.label}{" "}
              <span className="text-sm font-normal text-[#a0a0a0]">
                ({filtered.length})
              </span>
            </h2>
            <div className="grid gap-4 lg:grid-cols-2">
              {filtered.map((s) => (
                <StrategyCard key={s.id} strategy={s} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function MetricBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-4">
      <span className="text-xs text-[#a0a0a0]">{label}</span>
      <p className="mt-1 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
