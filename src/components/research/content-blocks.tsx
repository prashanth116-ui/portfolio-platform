"use client";

import { useState } from "react";
import type {
  ContentBlock,
  StatItem,
  Gap,
  Competitor,
  Regulation,
} from "@/data/research-content";

// ── Stat Card ──────────────────────────────────────────────────────

function StatCard({ item }: { item: StatItem }) {
  return (
    <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-4">
      <p className="text-2xl font-bold text-white">{item.value}</p>
      <p className="mt-1 text-sm font-medium text-[#c0c0c0]">{item.label}</p>
      {item.subtitle && (
        <p className="mt-0.5 text-xs text-[#666]">{item.subtitle}</p>
      )}
    </div>
  );
}

function StatsGrid({ items }: { items: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <StatCard key={item.label} item={item} />
      ))}
    </div>
  );
}

// ── Gap Card ───────────────────────────────────────────────────────

function ScoreBar({ score, max = 10 }: { score: number; max?: number }) {
  const pct = (score / max) * 100;
  const color =
    score >= 8 ? "#00d97e" : score >= 7 ? "#5ba3e6" : score >= 6 ? "#f6c343" : "#6e84a3";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 rounded-full bg-[#2a2a2a]">
        <div
          className="h-1.5 rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="w-6 text-right text-xs text-[#a0a0a0]">{score}</span>
    </div>
  );
}

function GapCard({ gap }: { gap: Gap }) {
  const color =
    gap.score >= 8 ? "#00d97e" : gap.score >= 7 ? "#5ba3e6" : "#f6c343";
  return (
    <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2a2a2a] text-xs font-bold text-white">
              {gap.rank}
            </span>
            <h4 className="font-semibold text-white">{gap.name}</h4>
          </div>
        </div>
        <span
          className="flex-shrink-0 rounded-full px-2.5 py-0.5 text-sm font-bold"
          style={{ color, backgroundColor: `${color}15` }}
        >
          {gap.score}/10
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-[#c0c0c0]">
        {gap.summary}
      </p>

      {(gap.addressableMarket || gap.timeWindow) && (
        <div className="mt-3 flex flex-wrap gap-3 text-xs">
          {gap.addressableMarket && (
            <span className="text-[#a0a0a0]">
              TAM: <span className="font-medium text-white">{gap.addressableMarket}</span>
            </span>
          )}
          {gap.timeWindow && (
            <span className="text-[#a0a0a0]">
              Window: <span className="font-medium text-white">{gap.timeWindow}</span>
            </span>
          )}
        </div>
      )}

      <div className="mt-4 space-y-1.5">
        {gap.dimensions.map((d) => (
          <div key={d.name} className="flex items-center gap-2">
            <span className="w-20 text-xs text-[#a0a0a0]">{d.name}</span>
            <div className="flex-1">
              <ScoreBar score={d.score} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GapGrid({ items }: { items: Gap[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((gap) => (
        <GapCard key={gap.rank} gap={gap} />
      ))}
    </div>
  );
}

// ── Competitor Table ───────────────────────────────────────────────

function CompetitorTable({
  items,
  categories,
}: {
  items: Competitor[];
  categories: string[];
}) {
  const [active, setActive] = useState(categories[0]);
  const filtered = items.filter((c) => c.category === active);

  return (
    <div>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-1.5">
        {categories.map((cat) => {
          const count = items.filter((c) => c.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                active === cat
                  ? "bg-[#185FA5]/20 text-[#5ba3e6]"
                  : "bg-[#1a1a1a] text-[#a0a0a0] hover:text-white"
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Desktop table */}
      <div className="mt-4 hidden overflow-x-auto sm:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#2a2a2a] text-xs text-[#a0a0a0]">
              <th className="pb-2 pr-4 font-medium">Company</th>
              <th className="pb-2 pr-4 font-medium">Description</th>
              <th className="pb-2 pr-4 font-medium">Funding</th>
              <th className="pb-2 font-medium">Stage</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr
                key={c.name}
                className="border-b border-[#2a2a2a]/50 last:border-0"
              >
                <td className="py-2.5 pr-4 font-medium text-white whitespace-nowrap">
                  {c.name}
                </td>
                <td className="py-2.5 pr-4 text-[#c0c0c0]">{c.description}</td>
                <td className="py-2.5 pr-4 text-[#a0a0a0] whitespace-nowrap">
                  {c.funding ?? "-"}
                </td>
                <td className="py-2.5 text-[#a0a0a0] whitespace-nowrap">
                  {c.stage ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="mt-4 grid gap-3 sm:hidden">
        {filtered.map((c) => (
          <div
            key={c.name}
            className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-3"
          >
            <p className="font-medium text-white">{c.name}</p>
            <p className="mt-1 text-xs text-[#c0c0c0]">{c.description}</p>
            <div className="mt-2 flex gap-3 text-xs text-[#a0a0a0]">
              {c.funding && <span>Funding: {c.funding}</span>}
              {c.stage && <span>Stage: {c.stage}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Regulatory Card ────────────────────────────────────────────────

function RegulatoryCard({ reg }: { reg: Regulation }) {
  const statusColor =
    reg.status.includes("Signed") || reg.status.includes("Enforcement")
      ? "#00d97e"
      : "#f6c343";
  return (
    <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-semibold text-white">{reg.name}</h4>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-[#2a2a2a] px-2 py-0.5 text-[#a0a0a0]">
              {reg.jurisdiction}
            </span>
            <span
              className="rounded-full px-2 py-0.5 font-medium"
              style={{ color: statusColor, backgroundColor: `${statusColor}15` }}
            >
              {reg.status}
            </span>
            {reg.date && (
              <span className="text-[#666]">{reg.date}</span>
            )}
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[#c0c0c0]">{reg.impact}</p>
    </div>
  );
}

function RegulationsList({ items }: { items: Regulation[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((reg) => (
        <RegulatoryCard key={reg.name} reg={reg} />
      ))}
    </div>
  );
}

// ── Text & List Blocks ─────────────────────────────────────────────

function TextBlock({ body }: { body: string }) {
  return <p className="text-sm leading-relaxed text-[#c0c0c0]">{body}</p>;
}

function ListBlock({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-[#c0c0c0]">
          <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[#5ba3e6]" />
          {item}
        </li>
      ))}
    </ul>
  );
}

// ── Main Renderer ──────────────────────────────────────────────────

export function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "stats":
      return <StatsGrid items={block.items} />;
    case "gaps":
      return <GapGrid items={block.items} />;
    case "competitors":
      return (
        <CompetitorTable items={block.items} categories={block.categories} />
      );
    case "regulations":
      return <RegulationsList items={block.items} />;
    case "text":
      return <TextBlock body={block.body} />;
    case "list":
      return <ListBlock items={block.items} />;
  }
}
