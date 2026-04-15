import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDollar(value: number, showDollars: boolean, avgRisk: number = 375): string {
  if (showDollars) {
    if (value === 0) return "$0";
    const sign = value > 0 ? "+" : "";
    return `${sign}$${Math.abs(value).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  }
  const rVal = avgRisk > 0 ? value / avgRisk : 0;
  const sign = rVal > 0 ? "+" : "";
  return `${sign}${rVal.toFixed(1)}R`;
}

export function formatDollarAbs(value: number, showDollars: boolean, avgRisk: number = 375): string {
  if (showDollars) {
    return `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  }
  const rVal = avgRisk > 0 ? value / avgRisk : 0;
  return `${rVal.toFixed(1)}R`;
}

export function computeAvgRisk(trades: Trade[]): number {
  const risks: number[] = [];
  for (const t of trades) {
    const totalPnl = t.total_pnl ?? 0;
    const totalDollars = t.total_dollars ?? 0;
    const riskPts = t.risk ?? 0;
    if (totalPnl !== 0 && totalDollars !== 0) {
      const dollarPerPoint = Math.abs(totalDollars / totalPnl);
      risks.push(riskPts * dollarPerPoint);
    }
  }
  if (risks.length > 0) {
    return risks.reduce((a, b) => a + b, 0) / risks.length;
  }
  return 375;
}

export interface Trade {
  direction: string;
  entry_type: string;
  entry_time: string;
  entry_price: number;
  risk: number;
  total_pnl: number;
  total_dollars: number;
  was_stopped: boolean;
  contracts: number;
  exits: TradeExit[];
  [key: string]: unknown;
}

export interface TradeExit {
  type: string;
  pnl: number;
  price: number;
  time: string;
  cts: number;
}

export interface DailyData {
  date: string;
  trades: Trade[];
  summary: {
    num_trades: number;
    wins: number;
    losses: number;
    total_pnl: number;
  };
}

export interface BacktestSymbolData {
  symbol: string;
  tick_value: number;
  strategy_version: string;
  exported_at: string;
  days: DailyData[];
}
