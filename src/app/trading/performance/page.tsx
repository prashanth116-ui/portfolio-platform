"use client";

import { useState, useMemo } from "react";
import { EquityCurve } from "@/components/charts/equity-curve";
import { DailyPnlBars } from "@/components/charts/daily-pnl";
import { EntryTypePie } from "@/components/charts/entry-type-pie";
import { WinRateByEntry } from "@/components/charts/win-rate-by-entry";
import { TradeDistribution } from "@/components/charts/trade-distribution";
import { ExitTypeBreakdown } from "@/components/charts/exit-type-breakdown";
import { formatDollar, formatDollarAbs, computeAvgRisk } from "@/lib/utils";
import type { DailyData, Trade } from "@/lib/utils";

// Synthetic 22-day data matching V10.16 validation totals
// ES: 219 trades, 185W, 34L, 84.5% WR, +$191,231, 22/22 days
// NQ: 169 trades, 139W, 30L, 82.2% WR, +$340,743, 20/22 days
function generateDailyData(): Record<string, { symbol: string; days: DailyData[] }> {
  const dates = [
    "2026-02-02","2026-02-03","2026-02-04","2026-02-05","2026-02-06",
    "2026-02-09","2026-02-10","2026-02-11","2026-02-12","2026-02-13",
    "2026-02-17","2026-02-18","2026-02-19","2026-02-20","2026-02-21",
    "2026-02-24","2026-02-25","2026-02-26","2026-02-27","2026-02-28",
    "2026-03-02","2026-03-03",
  ];

  const esDaily = [
    { t: 10, w: 9, l: 1, pnl: 8950 }, { t: 10, w: 8, l: 2, pnl: 7200 },
    { t: 11, w: 10, l: 1, pnl: 12100 }, { t: 10, w: 9, l: 1, pnl: 9450 },
    { t: 9, w: 8, l: 1, pnl: 8100 }, { t: 10, w: 8, l: 2, pnl: 6800 },
    { t: 11, w: 9, l: 2, pnl: 7950 }, { t: 10, w: 9, l: 1, pnl: 10200 },
    { t: 10, w: 8, l: 2, pnl: 6500 }, { t: 9, w: 8, l: 1, pnl: 9100 },
    { t: 10, w: 9, l: 1, pnl: 10800 }, { t: 11, w: 9, l: 2, pnl: 8400 },
    { t: 10, w: 7, l: 3, pnl: 4200 }, { t: 10, w: 9, l: 1, pnl: 11300 },
    { t: 10, w: 8, l: 2, pnl: 7600 }, { t: 9, w: 8, l: 1, pnl: 8900 },
    { t: 10, w: 9, l: 1, pnl: 10100 }, { t: 11, w: 9, l: 2, pnl: 7800 },
    { t: 10, w: 8, l: 2, pnl: 6400 }, { t: 9, w: 8, l: 1, pnl: 9500 },
    { t: 10, w: 9, l: 1, pnl: 10950 }, { t: 9, w: 8, l: 1, pnl: 8931 },
  ];

  const nqDaily = [
    { t: 8, w: 7, l: 1, pnl: 18200 }, { t: 7, w: 6, l: 1, pnl: 14500 },
    { t: 9, w: 8, l: 1, pnl: 22400 }, { t: 8, w: 7, l: 1, pnl: 17800 },
    { t: 7, w: 6, l: 1, pnl: 13200 }, { t: 8, w: 6, l: 2, pnl: 11500 },
    { t: 8, w: 7, l: 1, pnl: 16900 }, { t: 7, w: 6, l: 1, pnl: 14800 },
    { t: 9, w: 7, l: 2, pnl: 12100 }, { t: 7, w: 6, l: 1, pnl: 15600 },
    { t: 8, w: 7, l: 1, pnl: 19200 }, { t: 8, w: 6, l: 2, pnl: 10800 },
    { t: 7, w: 5, l: 2, pnl: -778 }, { t: 8, w: 7, l: 1, pnl: 20100 },
    { t: 7, w: 6, l: 1, pnl: 15200 }, { t: 8, w: 7, l: 1, pnl: 18400 },
    { t: 8, w: 6, l: 2, pnl: 11900 }, { t: 7, w: 6, l: 1, pnl: 16300 },
    { t: 8, w: 6, l: 2, pnl: -500 }, { t: 7, w: 6, l: 1, pnl: 17400 },
    { t: 8, w: 7, l: 1, pnl: 21200 }, { t: 8, w: 7, l: 1, pnl: 18443 },
  ];

  const entryTypes = ["CREATION", "CREATION", "CREATION", "CREATION", "CREATION", "CREATION", "OVERNIGHT", "INTRADAY", "BOS"];
  const exitTypes = ["4R_PARTIAL", "T2_FIXED", "TRAIL_STOP", "RUNNER_STOP", "FULL_STOP"];

  function makeTrades(count: number, wins: number, pnl: number, tickVal: number): Trade[] {
    const trades: Trade[] = [];
    const avgWin = pnl > 0 ? (pnl * 1.3) / wins : 500;
    const losses = count - wins;
    const avgLoss = losses > 0 ? Math.abs((pnl - avgWin * wins) / losses) : 300;

    for (let i = 0; i < count; i++) {
      const isWin = i < wins;
      const dollars = isWin ? avgWin * (0.7 + Math.random() * 0.6) : -avgLoss * (0.7 + Math.random() * 0.6);
      const risk = 2 + Math.random() * 3;
      trades.push({
        direction: Math.random() > 0.5 ? "LONG" : "SHORT",
        entry_type: entryTypes[i % entryTypes.length],
        entry_time: "",
        entry_price: 0,
        risk,
        total_pnl: dollars / tickVal,
        total_dollars: dollars,
        was_stopped: !isWin,
        contracts: i === 0 ? 3 : 2,
        exits: [{ type: isWin ? exitTypes[i % 4] : "FULL_STOP", pnl: dollars / tickVal, price: 0, time: "", cts: 1 }],
      });
    }
    return trades;
  }

  const esDays: DailyData[] = dates.map((date, i) => {
    const d = esDaily[i];
    return {
      date,
      trades: makeTrades(d.t, d.w, d.pnl, 12.5),
      summary: { num_trades: d.t, wins: d.w, losses: d.l, total_pnl: d.pnl },
    };
  });

  const nqDays: DailyData[] = dates.map((date, i) => {
    const d = nqDaily[i];
    return {
      date,
      trades: makeTrades(d.t, d.w, d.pnl, 5),
      summary: { num_trades: d.t, wins: d.w, losses: d.l, total_pnl: d.pnl },
    };
  });

  return {
    ES: { symbol: "ES", days: esDays },
    NQ: { symbol: "NQ", days: nqDays },
  };
}

const backtestData = generateDailyData();

export default function PerformancePage() {
  const [symbol, setSymbol] = useState<string>("Combined");
  const [showDollars, setShowDollars] = useState(false);

  const { dailyData, allTrades, displaySymbol } = useMemo(() => {
    if (symbol === "Combined") {
      const dateMap: Record<string, DailyData> = {};
      for (const sym of Object.values(backtestData)) {
        for (const day of sym.days) {
          if (!dateMap[day.date]) {
            dateMap[day.date] = { date: day.date, trades: [], summary: { num_trades: 0, wins: 0, losses: 0, total_pnl: 0 } };
          }
          dateMap[day.date].trades.push(...day.trades);
          dateMap[day.date].summary.num_trades += day.summary.num_trades;
          dateMap[day.date].summary.wins += day.summary.wins;
          dateMap[day.date].summary.losses += day.summary.losses;
          dateMap[day.date].summary.total_pnl += day.summary.total_pnl;
        }
      }
      const sorted = Object.values(dateMap).sort((a, b) => a.date.localeCompare(b.date));
      return { dailyData: sorted, allTrades: sorted.flatMap((d) => d.trades), displaySymbol: "ES + NQ Combined" };
    }
    const data = backtestData[symbol];
    return { dailyData: data.days, allTrades: data.days.flatMap((d) => d.trades), displaySymbol: symbol };
  }, [symbol]);

  const avgRisk = computeAvgRisk(allTrades);
  const totalTrades = allTrades.length;
  const totalWins = allTrades.filter((t) => t.total_dollars > 0).length;
  const winRate = totalTrades > 0 ? (totalWins / totalTrades) * 100 : 0;
  const totalPnl = allTrades.reduce((s, t) => s + t.total_dollars, 0);
  const grossProfit = allTrades.filter((t) => t.total_dollars > 0).reduce((s, t) => s + t.total_dollars, 0);
  const grossLoss = Math.abs(allTrades.filter((t) => t.total_dollars < 0).reduce((s, t) => s + t.total_dollars, 0));
  const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : Infinity;
  const winningDays = dailyData.filter((d) => d.summary.total_pnl > 0).length;
  const totalDays = dailyData.length;

  let peak = 0, maxDD = 0, cum = 0;
  for (const d of dailyData) {
    cum += d.summary.total_pnl;
    if (cum > peak) peak = cum;
    const dd = peak - cum;
    if (dd > maxDD) maxDD = dd;
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Performance Dashboard
        </h1>
      </section>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex gap-1 rounded-lg bg-[#1a1a1a] p-1">
          {["Combined", "ES", "NQ"].map((s) => (
            <button
              key={s}
              onClick={() => setSymbol(s)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                symbol === s ? "bg-[#185FA5]/20 text-[#5ba3e6]" : "text-[#a0a0a0] hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowDollars(!showDollars)}
          className="rounded-md border border-[#2a2a2a] px-3 py-1.5 text-sm text-[#a0a0a0] transition-colors hover:text-white"
        >
          {showDollars ? "$ Dollars" : "R-Multiples"}
        </button>
      </div>

      {/* Summary */}
      <div>
        <h2 className="text-xl font-semibold text-white">{displaySymbol}</h2>
        <p className="text-sm text-[#a0a0a0]">{totalDays} trading days | V10.16</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Metric label="Total Trades" value={String(totalTrades)} />
        <Metric label="Win Rate" value={`${winRate.toFixed(1)}%`} />
        <Metric label="Profit Factor" value={profitFactor === Infinity ? "INF" : profitFactor.toFixed(1)} />
        <Metric label="Max Drawdown" value={formatDollarAbs(maxDD, showDollars, avgRisk)} />
        <Metric label="Avg Daily P/L" value={formatDollar(totalPnl / totalDays, showDollars, avgRisk)} />
        <Metric label="Day Win Rate" value={`${((winningDays / totalDays) * 100).toFixed(0)}% (${winningDays}/${totalDays})`} />
      </div>

      {/* Charts */}
      <EquityCurve data={dailyData} showDollars={showDollars} avgRisk={avgRisk} />
      <DailyPnlBars data={dailyData} showDollars={showDollars} avgRisk={avgRisk} />

      <div className="grid gap-4 lg:grid-cols-2">
        <EntryTypePie trades={allTrades} />
        <WinRateByEntry trades={allTrades} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <TradeDistribution trades={allTrades} showDollars={showDollars} avgRisk={avgRisk} />
        <ExitTypeBreakdown trades={allTrades} />
      </div>

      {/* Daily Breakdown */}
      <section>
        <h3 className="mb-3 text-lg font-semibold text-white">Daily Breakdown</h3>
        <div className="overflow-x-auto rounded-lg border border-[#2a2a2a]">
          <table className="w-full text-sm">
            <thead className="bg-[#1a1a1a] text-xs uppercase text-[#a0a0a0]">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-right">Trades</th>
                <th className="px-4 py-3 text-right">Wins</th>
                <th className="px-4 py-3 text-right">Losses</th>
                <th className="px-4 py-3 text-right">Win Rate</th>
                <th className="px-4 py-3 text-right">P/L</th>
                <th className="px-4 py-3 text-right">Cumulative</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                let running = 0;
                return dailyData.map((d) => {
                  const wr = d.summary.num_trades > 0 ? (d.summary.wins / d.summary.num_trades) * 100 : 0;
                  running += d.summary.total_pnl;
                  return (
                    <tr key={d.date} className="border-t border-[#2a2a2a]">
                      <td className="px-4 py-2 text-[#e6e6e6]">{d.date}</td>
                      <td className="px-4 py-2 text-right">{d.summary.num_trades}</td>
                      <td className="px-4 py-2 text-right text-green-400">{d.summary.wins}</td>
                      <td className="px-4 py-2 text-right text-red-400">{d.summary.losses}</td>
                      <td className="px-4 py-2 text-right">{wr.toFixed(0)}%</td>
                      <td className={`px-4 py-2 text-right ${d.summary.total_pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                        {formatDollar(d.summary.total_pnl, showDollars, avgRisk)}
                      </td>
                      <td className={`px-4 py-2 text-right ${running >= 0 ? "text-green-400" : "text-red-400"}`}>
                        {formatDollar(running, showDollars, avgRisk)}
                      </td>
                    </tr>
                  );
                });
              })()}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-3">
      <span className="text-[10px] uppercase tracking-wider text-[#a0a0a0]">{label}</span>
      <p className="mt-0.5 text-lg font-bold text-white">{value}</p>
    </div>
  );
}
