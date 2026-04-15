"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  ScanSearch,
} from "lucide-react";

interface ScanResult {
  symbol: string;
  name: string;
  price: number;
  change_pct: number;
  volume: number;
  market_cap: number | null;
  sector: string | null;
  signal: string | null;
  rsi_14: number | null;
  relative_volume: number | null;
}

type SortKey = "symbol" | "price" | "change_pct" | "volume" | "market_cap" | "rsi_14";

const SECTORS = [
  "All Sectors", "Technology", "Financial", "Healthcare", "Consumer Cycl.",
  "Consumer Def.", "Energy", "Industrials", "Utilities", "Real Estate",
];

const SIGNALS = ["All Signals", "Bullish", "Neutral", "Bearish"];

export default function ScannerPage() {
  const [results, setResults] = useState<ScanResult[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sector, setSector] = useState("All Sectors");
  const [signal, setSignal] = useState("All Signals");
  const [sortKey, setSortKey] = useState<SortKey>("change_pct");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const fetchResults = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (sector !== "All Sectors") params.set("sector", sector);
      if (signal !== "All Signals") params.set("signal", signal);
      params.set("sortBy", sortKey);
      params.set("sortDir", sortDir);

      const res = await fetch(`/api/scanner/results?${params}`);
      const data = await res.json();

      if (data.error && !data.results) {
        setError(data.error);
      } else {
        setResults(data.results ?? []);
        setLastUpdated(data.lastUpdated);
      }
    } catch {
      setError("Failed to fetch scanner data. Check your Supabase configuration.");
      setResults([]);
    }
    setLoading(false);
  }, [sector, signal, sortKey, sortDir]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ArrowUpDown className="ml-1 inline h-3 w-3 text-[#555]" />;
    return sortDir === "asc"
      ? <ArrowUp className="ml-1 inline h-3 w-3 text-[#5ba3e6]" />
      : <ArrowDown className="ml-1 inline h-3 w-3 text-[#5ba3e6]" />;
  };

  const formatMcap = (v: number | null) => {
    if (!v) return "—";
    if (v >= 1e12) return `$${(v / 1e12).toFixed(1)}T`;
    if (v >= 1e9) return `$${(v / 1e9).toFixed(0)}B`;
    if (v >= 1e6) return `$${(v / 1e6).toFixed(0)}M`;
    return `$${v.toLocaleString()}`;
  };

  const formatVol = (v: number) => {
    if (v >= 1e6) return `${(v / 1e6).toFixed(1)}M`;
    if (v >= 1e3) return `${(v / 1e3).toFixed(0)}K`;
    return String(v);
  };

  const signalColor = (s: string | null) => {
    if (s === "Bullish") return "text-green-400";
    if (s === "Bearish") return "text-red-400";
    return "text-[#a0a0a0]";
  };

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center gap-3">
          <ScanSearch className="h-8 w-8 text-[#5ba3e6]" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Stock Scanner
            </h1>
            <p className="mt-1 text-[#a0a0a0]">
              Pre-run TradingView screener data, updated every 15 minutes during
              market hours.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          className="rounded-md border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-2 text-sm text-[#e6e6e6]"
        >
          {SECTORS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select
          value={signal}
          onChange={(e) => setSignal(e.target.value)}
          className="rounded-md border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-2 text-sm text-[#e6e6e6]"
        >
          {SIGNALS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <button
          onClick={fetchResults}
          disabled={loading}
          className="flex items-center gap-1.5 rounded-md border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-2 text-sm text-[#a0a0a0] transition-colors hover:text-white disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>

        {lastUpdated && (
          <span className="text-xs text-[#a0a0a0]">
            Last updated: {new Date(lastUpdated).toLocaleString()}
          </span>
        )}
      </div>

      {/* Results */}
      {error ? (
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-6 text-center">
          <p className="text-sm text-amber-400">{error}</p>
        </div>
      ) : results.length === 0 && !loading ? (
        <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-12 text-center">
          <ScanSearch className="mx-auto h-12 w-12 text-[#333]" />
          <p className="mt-4 text-[#a0a0a0]">
            No scan results yet. Configure your Supabase connection and run the
            fetch script.
          </p>
          <p className="mt-2 text-xs text-[#555]">
            python scripts/fetch_tv_data.py
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#2a2a2a]">
          <table className="w-full text-sm">
            <thead className="bg-[#1a1a1a] text-xs uppercase text-[#a0a0a0]">
              <tr>
                <th className="cursor-pointer px-4 py-3 text-left" onClick={() => toggleSort("symbol")}>
                  Symbol <SortIcon col="symbol" />
                </th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="cursor-pointer px-4 py-3 text-right" onClick={() => toggleSort("price")}>
                  Price <SortIcon col="price" />
                </th>
                <th className="cursor-pointer px-4 py-3 text-right" onClick={() => toggleSort("change_pct")}>
                  Change % <SortIcon col="change_pct" />
                </th>
                <th className="cursor-pointer px-4 py-3 text-right" onClick={() => toggleSort("volume")}>
                  Volume <SortIcon col="volume" />
                </th>
                <th className="cursor-pointer px-4 py-3 text-right" onClick={() => toggleSort("market_cap")}>
                  Mkt Cap <SortIcon col="market_cap" />
                </th>
                <th className="px-4 py-3 text-left">Sector</th>
                <th className="px-4 py-3 text-center">Signal</th>
                <th className="cursor-pointer px-4 py-3 text-right" onClick={() => toggleSort("rsi_14")}>
                  RSI <SortIcon col="rsi_14" />
                </th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.symbol} className="border-t border-[#2a2a2a] transition-colors hover:bg-[#1a1a1a]">
                  <td className="px-4 py-2.5 font-medium text-white">{r.symbol}</td>
                  <td className="max-w-[200px] truncate px-4 py-2.5 text-[#a0a0a0]">{r.name}</td>
                  <td className="px-4 py-2.5 text-right text-[#e6e6e6]">${r.price.toFixed(2)}</td>
                  <td className={`px-4 py-2.5 text-right font-medium ${r.change_pct >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {r.change_pct >= 0 ? "+" : ""}{r.change_pct.toFixed(2)}%
                  </td>
                  <td className="px-4 py-2.5 text-right text-[#a0a0a0]">{formatVol(r.volume)}</td>
                  <td className="px-4 py-2.5 text-right text-[#a0a0a0]">{formatMcap(r.market_cap)}</td>
                  <td className="px-4 py-2.5 text-[#a0a0a0]">{r.sector ?? "—"}</td>
                  <td className={`px-4 py-2.5 text-center font-medium ${signalColor(r.signal)}`}>
                    {r.signal ?? "—"}
                  </td>
                  <td className="px-4 py-2.5 text-right text-[#a0a0a0]">{r.rsi_14?.toFixed(1) ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-xs text-[#555]">
        {results.length} symbols displayed
      </p>
    </div>
  );
}
