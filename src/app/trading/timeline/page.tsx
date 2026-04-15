"use client";

import { useState } from "react";
import { versions, type Version } from "@/data/versions";
import { ChevronDown, ChevronUp } from "lucide-react";

const CATEGORY_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  feature: { label: "New Feature", color: "text-blue-400", bg: "bg-blue-500/10" },
  performance: { label: "Performance", color: "text-green-400", bg: "bg-green-500/10" },
  risk: { label: "Risk Management", color: "text-amber-400", bg: "bg-amber-500/10" },
  filter: { label: "Filter/Signal", color: "text-yellow-400", bg: "bg-yellow-500/10" },
  bugfix: { label: "Bug Fix", color: "text-red-400", bg: "bg-red-500/10" },
};

const ALL_CATEGORIES = Object.keys(CATEGORY_CONFIG);

export default function TimelinePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(ALL_CATEGORIES);
  const [expandedVersions, setExpandedVersions] = useState<Record<string, boolean>>({});

  const toggle = (v: string) =>
    setExpandedVersions((prev) => ({ ...prev, [v]: !prev[v] }));

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filtered = versions.filter((v) => selectedCategories.includes(v.category));

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Version Timeline
        </h1>
        <p className="mt-2 text-[#a0a0a0]">
          Strategy evolution from V6 through V10.16 — {versions.length} versions
          over 5 months.
        </p>
      </section>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {ALL_CATEGORIES.map((cat) => {
          const cfg = CATEGORY_CONFIG[cat];
          const active = selectedCategories.includes(cat);
          return (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                active
                  ? `${cfg.bg} ${cfg.color}`
                  : "bg-[#1a1a1a] text-[#a0a0a0] opacity-50"
              }`}
            >
              {cfg.label}
            </button>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="space-y-3">
        {[...filtered].reverse().map((v) => (
          <VersionCard
            key={v.version}
            version={v}
            expanded={!!expandedVersions[v.version]}
            onToggle={() => toggle(v.version)}
          />
        ))}
      </div>
    </div>
  );
}

function VersionCard({
  version: v,
  expanded,
  onToggle,
}: {
  version: Version;
  expanded: boolean;
  onToggle: () => void;
}) {
  const cfg = CATEGORY_CONFIG[v.category] ?? CATEGORY_CONFIG.feature;

  return (
    <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a]">
      <button
        onClick={onToggle}
        className="flex w-full items-start gap-4 p-4 text-left sm:items-center"
      >
        <div className="w-16 flex-shrink-0">
          <span className="text-lg font-bold text-white">{v.version}</span>
          <p className="text-xs text-[#a0a0a0]">{v.date}</p>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-white">{v.title}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${cfg.bg} ${cfg.color}`}
            >
              {cfg.label}
            </span>
          </div>
          <p className="mt-0.5 text-sm text-[#a0a0a0]">{v.impact}</p>
        </div>
        {expanded ? (
          <ChevronUp className="h-4 w-4 flex-shrink-0 text-[#a0a0a0]" />
        ) : (
          <ChevronDown className="h-4 w-4 flex-shrink-0 text-[#a0a0a0]" />
        )}
      </button>

      {expanded && (
        <div className="border-t border-[#2a2a2a] p-4">
          <p className="text-sm leading-relaxed text-[#c0c0c0]">
            {v.description}
          </p>
          {v.ab_test && (
            <div className="mt-4">
              <h4 className="mb-2 text-xs font-medium uppercase tracking-wider text-[#a0a0a0]">
                A/B Test Results
              </h4>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <MiniMetric label="Test Period" value={`${v.ab_test.days} days`} />
                {v.ab_test.baseline_pl && (
                  <MiniMetric label="Baseline P/L" value={v.ab_test.baseline_pl} />
                )}
                <MiniMetric label="Improvement" value={v.ab_test.improvement} />
                {v.ab_test.wr_old && v.ab_test.wr_new && (
                  <MiniMetric
                    label="Win Rate"
                    value={`${v.ab_test.wr_old} → ${v.ab_test.wr_new}`}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-[#0f0f0f] p-2.5">
      <span className="text-[10px] uppercase tracking-wider text-[#a0a0a0]">
        {label}
      </span>
      <p className="mt-0.5 text-sm font-medium text-white">{value}</p>
    </div>
  );
}
