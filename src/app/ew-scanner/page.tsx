"use client";

import { useState, useCallback } from "react";
import {
  Activity,
  Search,
  FileSpreadsheet,
  FileDown,
  Loader2,
  ChevronRight,
  X,
  TrendingDown,
  TrendingUp,
  Clock,
  BarChart3,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { UNIVERSES, UNIVERSE_KEYS, type UniverseKey } from "@/data/ew-universes";
import { scoreBatch, type QuoteData, type ScoredCandidate } from "@/lib/ew-scoring";
import { exportToExcel, exportToCsv } from "@/lib/ew-export";

const HTF_OPTIONS = ["Monthly", "Weekly"] as const;
const LTF_OPTIONS = ["Daily", "4H", "1H"] as const;

const BATCH_SIZE = 10;
const BATCH_DELAY = 300;

export default function EWScannerPage() {
  const [htf, setHtf] = useState<string>("Monthly");
  const [ltf, setLtf] = useState<string>("Daily");
  const [universe, setUniverse] = useState<UniverseKey>("SP500");
  const [minDecline, setMinDecline] = useState(20);
  const [minMonths, setMinMonths] = useState(3);
  const [minRecovery, setMinRecovery] = useState(10);

  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState("");
  const [results, setResults] = useState<ScoredCandidate[]>([]);
  const [labels, setLabels] = useState<Record<string, string>>({});
  const [labeling, setLabeling] = useState(false);

  const [deepTicker, setDeepTicker] = useState<string | null>(null);
  const [deepAnalysis, setDeepAnalysis] = useState<string>("");
  const [deepLoading, setDeepLoading] = useState(false);

  const passed = results.filter((r) => r.passed);
  const failed = results.filter((r) => !r.passed);

  // --- Scan ---
  const runScan = useCallback(async () => {
    setScanning(true);
    setResults([]);
    setLabels({});

    const tickers = UNIVERSES[universe];
    const total = tickers.length;
    const quotes: QuoteData[] = [];

    // Fetch in parallel batches of 10 with 300ms delay
    for (let i = 0; i < total; i += BATCH_SIZE) {
      const batch = tickers.slice(i, i + BATCH_SIZE);
      setProgress(`Fetching ${Math.min(i + BATCH_SIZE, total)}/${total}...`);

      const settled = await Promise.allSettled(
        batch.map(async (t) => {
          const res = await fetch(`/api/ew-quote?ticker=${encodeURIComponent(t.symbol)}`);
          if (!res.ok) return null;
          const data = await res.json();
          if (data.error) return null;
          return { ...data, ticker: t.symbol, name: t.name } as QuoteData;
        })
      );

      for (const r of settled) {
        if (r.status === "fulfilled" && r.value) {
          quotes.push(r.value);
        }
      }

      // 300ms delay between batches
      if (i + BATCH_SIZE < total) {
        await new Promise((r) => setTimeout(r, BATCH_DELAY));
      }
    }

    if (!quotes.length) {
      setProgress("No data returned. Try again.");
      setScanning(false);
      return;
    }

    // Score all tickers locally (pure JS)
    setProgress("Scoring candidates...");
    const scored = scoreBatch(quotes, {
      minDecline,
      minDuration: minMonths,
      minRecovery,
    });

    setResults(scored);
    const passingCandidates = scored.filter((s) => s.passed);

    // Single Claude call for all passing candidates
    if (passingCandidates.length > 0) {
      setProgress(`${passingCandidates.length} candidates found. Labeling...`);
      setLabeling(true);

      try {
        const labelRes = await fetch("/api/ew-label", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            candidates: passingCandidates.map((c) => ({
              ticker: c.ticker,
              ath: c.ath,
              low: c.low,
              current: c.current,
              declinePct: c.declinePct,
              monthsDecline: c.monthsDecline,
              recoveryPct: c.recoveryPct,
            })),
            htf,
            ltf,
          }),
        });

        const labelData = await labelRes.json();
        setLabels(labelData.labels ?? {});
      } catch {
        // Labels are non-critical — cards still show without them
      }
      setLabeling(false);
    }

    setProgress("");
    setScanning(false);
  }, [universe, htf, ltf, minDecline, minMonths, minRecovery]);

  // --- Deep Analysis ---
  const runDeep = useCallback(
    async (candidate: ScoredCandidate) => {
      setDeepTicker(candidate.ticker);
      setDeepAnalysis("");
      setDeepLoading(true);

      try {
        const res = await fetch("/api/ew-deep", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ticker: candidate.ticker,
            name: candidate.name,
            ath: candidate.ath,
            athDate: candidate.athYear.toFixed(1),
            low: candidate.low,
            lowDate: candidate.lowYear.toFixed(1),
            current: candidate.current,
            declinePct: candidate.declinePct,
            durationMonths: candidate.monthsDecline,
            recoveryPct: candidate.recoveryPct,
            score: candidate.score,
            label: labels[candidate.ticker],
            htf,
            ltf,
          }),
        });

        const data = await res.json();
        setDeepAnalysis(data.analysis ?? "No analysis returned.");
      } catch {
        setDeepAnalysis("Failed to generate analysis.");
      }
      setDeepLoading(false);
    },
    [htf, ltf, labels]
  );

  // --- Helpers ---
  const scoreTextColor = (n: number) => {
    if (n >= 0.7) return "text-green-400";
    if (n >= 0.4) return "text-yellow-400";
    return "text-red-400";
  };

  const scoreBgColor = (n: number) => {
    if (n >= 0.7) return "bg-green-500";
    if (n >= 0.4) return "bg-yellow-500";
    return "bg-red-500";
  };

  const fmtYear = (y: number) => String(y);

  type DotStatus = "pass" | "warn" | "fail";
  const getDot = (value: number, threshold: number): DotStatus => {
    if (value >= threshold) return "pass";
    if (value >= threshold * 0.5) return "warn";
    return "fail";
  };
  const dotCss: Record<DotStatus, string> = {
    pass: "bg-green-400",
    warn: "bg-yellow-400",
    fail: "bg-red-400",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section>
        <div className="flex items-center gap-3">
          <Activity className="h-8 w-8 text-[#5ba3e6]" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              EW Scanner
            </h1>
            <p className="mt-1 text-[#a0a0a0]">
              Elliott Wave live scanner with mechanical scoring and AI wave labeling.
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* ── Left Panel ── */}
        <aside className="w-full shrink-0 space-y-5 lg:w-72">
          {/* HTF */}
          <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-4">
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#a0a0a0]">
              HTF (Primary)
            </label>
            <div className="flex gap-2">
              {HTF_OPTIONS.map((o) => (
                <button
                  key={o}
                  onClick={() => setHtf(o)}
                  className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    htf === o
                      ? "bg-[#185FA5]/30 text-[#5ba3e6] ring-1 ring-[#185FA5]"
                      : "bg-[#262626] text-[#a0a0a0] hover:text-white"
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>

          {/* LTF */}
          <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-4">
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#a0a0a0]">
              LTF (Sub-wave)
            </label>
            <div className="flex gap-2">
              {LTF_OPTIONS.map((o) => (
                <button
                  key={o}
                  onClick={() => setLtf(o)}
                  className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    ltf === o
                      ? "bg-[#185FA5]/30 text-[#5ba3e6] ring-1 ring-[#185FA5]"
                      : "bg-[#262626] text-[#a0a0a0] hover:text-white"
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>

          {/* Universe */}
          <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-4">
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#a0a0a0]">
              Universe
            </label>
            <select
              value={universe}
              onChange={(e) => setUniverse(e.target.value as UniverseKey)}
              className="w-full rounded-md border border-[#2a2a2a] bg-[#262626] px-3 py-2 text-sm text-[#e6e6e6]"
            >
              {UNIVERSE_KEYS.map((k) => (
                <option key={k} value={k}>
                  {k} ({UNIVERSES[k].length})
                </option>
              ))}
            </select>
          </div>

          {/* Sliders */}
          <div className="space-y-4 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-4">
            <label className="block text-xs font-medium uppercase tracking-wider text-[#a0a0a0]">
              Filters
            </label>

            {/* Min Decline */}
            <div>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-[#a0a0a0]">Min Decline %</span>
                <span className="font-mono text-[#5ba3e6]">{minDecline}%</span>
              </div>
              <input
                type="range"
                min={5}
                max={80}
                value={minDecline}
                onChange={(e) => setMinDecline(Number(e.target.value))}
                className="ew-slider w-full"
              />
            </div>

            {/* Min Months */}
            <div>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-[#a0a0a0]">Min Duration</span>
                <span className="font-mono text-[#5ba3e6]">{minMonths}mo</span>
              </div>
              <input
                type="range"
                min={1}
                max={36}
                value={minMonths}
                onChange={(e) => setMinMonths(Number(e.target.value))}
                className="ew-slider w-full"
              />
            </div>

            {/* Min Recovery */}
            <div>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-[#a0a0a0]">Min Recovery %</span>
                <span className="font-mono text-[#5ba3e6]">{minRecovery}%</span>
              </div>
              <input
                type="range"
                min={5}
                max={200}
                value={minRecovery}
                onChange={(e) => setMinRecovery(Number(e.target.value))}
                className="ew-slider w-full"
              />
            </div>
          </div>

          {/* Scan Button */}
          <button
            onClick={runScan}
            disabled={scanning}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#185FA5] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1a6dba] disabled:opacity-50"
          >
            {scanning ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            {scanning ? "Scanning..." : "Scan"}
          </button>

          {progress && (
            <p className="text-center text-xs text-[#a0a0a0]">{progress}</p>
          )}
        </aside>

        {/* ── Right Panel ── */}
        <div className="flex-1 space-y-4">
          {/* Export + Stats bar */}
          {results.length > 0 && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-[#a0a0a0]">
                    <span className="font-bold text-white">{passed.length}</span> passed
                  </span>
                  <span className="text-[#a0a0a0]">
                    <span className="font-bold text-white">{failed.length}</span> filtered
                  </span>
                  {labeling && (
                    <span className="flex items-center gap-1 text-[#5ba3e6]">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Labeling...
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => exportToExcel(passed, labels)}
                    className="flex items-center gap-1.5 rounded-md border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-1.5 text-xs text-[#a0a0a0] transition-colors hover:text-white"
                  >
                    <FileSpreadsheet className="h-3.5 w-3.5" />
                    Excel
                  </button>
                  <button
                    onClick={() => exportToCsv(passed, labels)}
                    className="flex items-center gap-1.5 rounded-md border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-1.5 text-xs text-[#a0a0a0] transition-colors hover:text-white"
                  >
                    <FileDown className="h-3.5 w-3.5" />
                    CSV
                  </button>
                </div>
              </div>

              {/* Summary stats */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard
                  icon={<BarChart3 className="h-4 w-4 text-[#5ba3e6]" />}
                  label="Scanned"
                  value={String(results.length)}
                />
                <StatCard
                  icon={<TrendingDown className="h-4 w-4 text-red-400" />}
                  label="Avg Decline"
                  value={`${(passed.reduce((s, r) => s + r.declinePct, 0) / (passed.length || 1)).toFixed(1)}%`}
                />
                <StatCard
                  icon={<Clock className="h-4 w-4 text-yellow-400" />}
                  label="Avg Duration"
                  value={`${(passed.reduce((s, r) => s + r.monthsDecline, 0) / (passed.length || 1)).toFixed(0)}mo`}
                />
                <StatCard
                  icon={<TrendingUp className="h-4 w-4 text-green-400" />}
                  label="Avg Recovery"
                  value={`${(passed.reduce((s, r) => s + r.recoveryPct, 0) / (passed.length || 1)).toFixed(1)}%`}
                />
              </div>
            </>
          )}

          {/* Empty state */}
          {results.length === 0 && !scanning && (
            <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-16 text-center">
              <Activity className="mx-auto h-12 w-12 text-[#333]" />
              <p className="mt-4 text-[#a0a0a0]">
                Select a universe and filters, then click Scan to find Elliott Wave candidates.
              </p>
            </div>
          )}

          {/* Scanning skeleton */}
          {scanning && results.length === 0 && (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-4"
                >
                  <div className="mb-3 h-5 w-20 rounded bg-[#262626]" />
                  <div className="mb-2 h-3 w-full rounded bg-[#262626]" />
                  <div className="h-3 w-3/4 rounded bg-[#262626]" />
                </div>
              ))}
            </div>
          )}

          {/* Result cards */}
          {passed.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {passed.map((c, idx) => {
                const pct = Math.round(c.normalizedScore * 100);
                const isHigh = c.normalizedScore >= 0.7;
                const declineDot = getDot(c.declinePct, minDecline);
                const directionDot: DotStatus = c.athYear <= c.lowYear ? "pass" : "fail";
                const durationDot = getDot(c.monthsDecline, minMonths);
                const recoveryDot = getDot(c.recoveryPct, minRecovery);

                return (
                  <div
                    key={c.ticker}
                    className={`ew-card-in group rounded-lg border bg-[#1a1a1a] transition-colors hover:border-[#3a3a3a] ${
                      isHigh
                        ? "border-green-500/40"
                        : "border-[#2a2a2a]"
                    }`}
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    {/* ── Top: Ticker + Score ── */}
                    <div className="flex items-center justify-between border-b border-[#2a2a2a] px-4 py-3">
                      <div className="min-w-0">
                        <span className="text-base font-bold text-white">{c.ticker}</span>
                        <span className="ml-2 truncate text-xs text-[#a0a0a0]">{c.name}</span>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <div className="h-1.5 w-10 overflow-hidden rounded-full bg-[#262626]">
                          <div
                            className={`h-full rounded-full ${scoreBgColor(c.normalizedScore)}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className={`text-sm font-bold ${scoreTextColor(c.normalizedScore)}`}>
                          {pct}%
                        </span>
                      </div>
                    </div>

                    {/* ── Body: Finding rows ── */}
                    <div className="space-y-1.5 px-4 pt-3 pb-2">
                      <FindingRow dot={declineDot} dotCss={dotCss} label="Decline" value={`${c.declinePct.toFixed(1)}% (≥${minDecline}%)`} />
                      <FindingRow dot={directionDot} dotCss={dotCss} label="Direction" value={directionDot === "pass" ? "ATH → Low correct" : "ATH after Low"} />
                      <FindingRow dot={durationDot} dotCss={dotCss} label="Duration" value={`${c.monthsDecline.toFixed(0)}mo (≥${minMonths}mo)`} />
                      <FindingRow dot={recoveryDot} dotCss={dotCss} label="Recovery" value={`${c.recoveryPct.toFixed(1)}% (≥${minRecovery}%)`} />

                      {/* EW Label (cyan dot) */}
                      {labels[c.ticker] ? (
                        <div className="flex items-start gap-2 text-xs">
                          <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
                          <span className="text-[#5ba3e6]">{labels[c.ticker]}</span>
                        </div>
                      ) : labeling ? (
                        <div className="flex items-center gap-2">
                          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#333]" />
                          <div className="h-3 w-3/4 animate-pulse rounded bg-[#262626]" />
                        </div>
                      ) : null}
                    </div>

                    {/* ── Price Grid ── */}
                    <div className="mx-4 grid grid-cols-3 gap-2 border-t border-[#2a2a2a] py-3 text-center text-xs">
                      <div>
                        <p className="text-[#666]">ATH</p>
                        <p className="font-mono font-medium text-[#e6e6e6]">${c.ath.toFixed(2)}</p>
                        <p className="text-[#555]">{fmtYear(c.athYear)}</p>
                      </div>
                      <div>
                        <p className="text-[#666]">Low</p>
                        <p className="font-mono font-medium text-red-400">${c.low.toFixed(2)}</p>
                        <p className="text-[#555]">{fmtYear(c.lowYear)}</p>
                      </div>
                      <div>
                        <p className="text-[#666]">Current</p>
                        <p className="font-mono font-medium text-green-400">${c.current.toFixed(2)}</p>
                      </div>
                    </div>

                    {/* ── Footer: Stats + Deep Analysis ── */}
                    <div className="flex items-center justify-between border-t border-[#2a2a2a] px-4 py-2.5">
                      <div className="flex gap-3 text-xs text-[#a0a0a0]">
                        <span>
                          <TrendingDown className="mr-0.5 inline h-3 w-3 text-red-400" />
                          {c.declinePct.toFixed(1)}%
                        </span>
                        <span>
                          <Clock className="mr-0.5 inline h-3 w-3 text-yellow-400" />
                          {c.monthsDecline.toFixed(0)}mo
                        </span>
                        <span>
                          <TrendingUp className="mr-0.5 inline h-3 w-3 text-green-400" />
                          {c.recoveryPct.toFixed(1)}%
                        </span>
                      </div>
                      <button
                        onClick={() => runDeep(c)}
                        className="flex items-center gap-1 rounded-md border border-[#2a2a2a] bg-[#262626] px-2.5 py-1 text-xs text-[#a0a0a0] transition-colors hover:border-[#3a3a3a] hover:text-white"
                      >
                        Deep Analysis
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Filtered out (collapsed) */}
          {failed.length > 0 && (
            <details className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a]">
              <summary className="cursor-pointer px-4 py-3 text-sm text-[#a0a0a0] hover:text-white">
                {failed.length} tickers filtered out
              </summary>
              <div className="border-t border-[#2a2a2a] px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  {failed.map((c) => (
                    <span
                      key={c.ticker}
                      className="rounded bg-[#262626] px-2 py-0.5 text-xs text-[#666]"
                      title={`Score: ${c.score}/7 | Decline: ${c.declinePct.toFixed(1)}% | ${c.monthsDecline.toFixed(0)}mo | Recovery: ${c.recoveryPct.toFixed(1)}%`}
                    >
                      {c.ticker}
                    </span>
                  ))}
                </div>
              </div>
            </details>
          )}
        </div>
      </div>

      {/* ── Deep Analysis Modal ── */}
      {deepTicker && (
        <Dialog.Root open onOpenChange={() => setDeepTicker(null)}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
            <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-6 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <Dialog.Title className="text-lg font-bold text-white">
                  {deepTicker} — Deep Analysis
                </Dialog.Title>
                <Dialog.Close className="rounded-md p-1 text-[#a0a0a0] hover:text-white">
                  <X className="h-5 w-5" />
                </Dialog.Close>
              </div>

              {deepLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-[#5ba3e6]" />
                  <span className="ml-2 text-sm text-[#a0a0a0]">Analyzing...</span>
                </div>
              ) : (
                <div className="max-h-[60vh] overflow-y-auto pr-2">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed text-[#c0c0c0]">
                    {deepAnalysis}
                  </div>
                </div>
              )}
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </div>
  );
}

function FindingRow({
  dot,
  dotCss,
  label,
  value,
}: {
  dot: "pass" | "warn" | "fail";
  dotCss: Record<string, string>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2 text-xs">
      <span className={`mt-1 inline-block h-2 w-2 shrink-0 rounded-full ${dotCss[dot]}`} />
      <span className="text-[#a0a0a0]">
        <span className="text-[#c0c0c0]">{label}:</span> {value}
      </span>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-3">
      <div className="mb-1 flex items-center gap-1.5">
        {icon}
        <p className="text-xs text-[#a0a0a0]">{label}</p>
      </div>
      <p className="text-xl font-bold text-white">{value}</p>
    </div>
  );
}
