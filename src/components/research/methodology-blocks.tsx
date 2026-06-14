"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, ArrowDown } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Verdict Badge                                                      */
/* ------------------------------------------------------------------ */

const VERDICT_COLORS: Record<string, { bg: string; text: string }> = {
  KILL: { bg: "bg-[#e63946]/15", text: "text-[#e63946]" },
  "NO-GO": { bg: "bg-[#f6c343]/15", text: "text-[#f6c343]" },
  CONDITIONAL: { bg: "bg-[#f6c343]/10", text: "text-[#ddb040]" },
  INVESTIGATE: { bg: "bg-[#5ba3e6]/15", text: "text-[#5ba3e6]" },
  GO: { bg: "bg-[#00d97e]/15", text: "text-[#00d97e]" },
};

export function VerdictBadge({ verdict }: { verdict: string }) {
  const colors = VERDICT_COLORS[verdict] ?? VERDICT_COLORS.KILL;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors.bg} ${colors.text}`}
    >
      {verdict}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Correction Row                                                     */
/* ------------------------------------------------------------------ */

interface CorrectionRowProps {
  rank: number;
  name: string;
  original: number;
  validated: number;
  verdict: string;
}

export function CorrectionRow({
  rank,
  name,
  original,
  validated,
  verdict,
}: CorrectionRowProps) {
  const drop = (validated - original).toFixed(1);
  return (
    <div className="flex items-center gap-3 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-3">
      <span className="w-6 text-center text-sm font-medium text-[#666]">
        {rank}
      </span>
      <span className="min-w-0 flex-1 truncate text-sm font-medium text-white">
        {name}
      </span>
      <span className="text-sm text-[#a0a0a0] line-through">{original.toFixed(1)}</span>
      <ArrowDown className="h-3.5 w-3.5 text-[#e63946]" />
      <span className="text-sm font-semibold text-white">{validated.toFixed(1)}</span>
      <span className="text-xs font-medium text-[#e63946]">{drop}</span>
      <VerdictBadge verdict={verdict} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Correction Chart                                                   */
/* ------------------------------------------------------------------ */

interface GapData {
  rank: number;
  name: string;
  original: number;
  validated: number;
  verdict: string;
}

export function CorrectionChart({ gaps }: { gaps: GapData[] }) {
  return (
    <div className="space-y-2">
      {gaps.map((g) => (
        <CorrectionRow key={g.rank} {...g} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Collapsible Phase                                                  */
/* ------------------------------------------------------------------ */

interface CollapsiblePhaseProps {
  title: string;
  summary: string;
  badge?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function CollapsiblePhase({
  title,
  summary,
  badge,
  children,
  defaultOpen = false,
}: CollapsiblePhaseProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-[#222]"
      >
        {open ? (
          <ChevronDown className="h-4 w-4 flex-shrink-0 text-[#5ba3e6]" />
        ) : (
          <ChevronRight className="h-4 w-4 flex-shrink-0 text-[#5ba3e6]" />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">{title}</span>
            {badge && (
              <span className="rounded-full bg-[#5ba3e6]/15 px-2 py-0.5 text-[10px] font-medium text-[#5ba3e6]">
                {badge}
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-[#a0a0a0]">{summary}</p>
        </div>
      </button>
      {open && (
        <div className="border-t border-[#2a2a2a] px-5 py-4 text-sm leading-relaxed text-[#c0c0c0]">
          {children}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Failure → Fix Table                                                */
/* ------------------------------------------------------------------ */

interface FailureFix {
  failure: string;
  fix: string;
}

export function FailureFixTable({ rows }: { rows: FailureFix[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[#2a2a2a]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#2a2a2a] bg-[#1a1a1a]">
            <th className="px-4 py-3 text-left font-semibold text-[#e63946]">
              V1 Failure
            </th>
            <th className="px-4 py-3 text-left font-semibold text-[#00d97e]">
              V2 Fix
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={i}
              className="border-b border-[#2a2a2a] last:border-b-0"
            >
              <td className="px-4 py-3 text-[#c0c0c0]">{r.failure}</td>
              <td className="px-4 py-3 text-[#c0c0c0]">{r.fix}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Rule Card                                                          */
/* ------------------------------------------------------------------ */

interface RuleCardProps {
  number: number;
  name: string;
  description: string;
}

export function RuleCard({ number, name, description }: RuleCardProps) {
  return (
    <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-4">
      <div className="flex items-start gap-3">
        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#5ba3e6]/15 text-xs font-bold text-[#5ba3e6]">
          {number}
        </span>
        <div>
          <p className="text-sm font-semibold text-white">{name}</p>
          <p className="mt-1 text-xs leading-relaxed text-[#a0a0a0]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Round Summary                                                      */
/* ------------------------------------------------------------------ */

interface RoundSummaryProps {
  round: number;
  label: string;
  gapsTested: number;
  avgCorrection: string;
  finding: string;
  details: string[];
}

export function RoundSummary({
  round,
  label,
  gapsTested,
  avgCorrection,
  finding,
  details,
}: RoundSummaryProps) {
  return (
    <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-5">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5ba3e6]/15 text-sm font-bold text-[#5ba3e6]">
          {round}
        </span>
        <div>
          <p className="text-sm font-semibold text-white">{label}</p>
          <p className="text-xs text-[#a0a0a0]">
            {gapsTested} gaps tested &middot; avg correction {avgCorrection}
          </p>
        </div>
      </div>
      <p className="mb-3 text-sm font-medium text-[#f6c343]">{finding}</p>
      <ul className="space-y-1.5">
        {details.map((d, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-[#a0a0a0]">
            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[#5ba3e6]" />
            {d}
          </li>
        ))}
      </ul>
    </div>
  );
}
