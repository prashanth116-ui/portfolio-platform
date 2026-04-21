import { NextRequest, NextResponse } from "next/server";

interface ChartResult {
  ticker: string;
  name: string;
  timestamps: number[];
  highs: number[];
  lows: number[];
  closes: number[];
  current: number;
}

const YAHOO_BASE = "https://query1.finance.yahoo.com/v8/finance/chart";

async function fetchChart(
  symbol: string,
  range: string,
  interval: string
): Promise<ChartResult | null> {
  const url = `${YAHOO_BASE}/${encodeURIComponent(symbol)}?range=${range}&interval=${interval}&includeTimestamps=true`;

  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  });

  if (!res.ok) return null;

  const data = await res.json();
  const result = data?.chart?.result?.[0];
  if (!result) return null;

  const quote = result.indicators?.quote?.[0];
  if (!quote) return null;

  return {
    ticker: symbol,
    name: "",
    timestamps: result.timestamp ?? [],
    highs: quote.high ?? [],
    lows: quote.low ?? [],
    closes: quote.close ?? [],
    current: result.meta?.regularMarketPrice ?? 0,
  };
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { tickers, names, range = "5y", interval = "1mo" } = body as {
    tickers: string[];
    names: Record<string, string>;
    range?: string;
    interval?: string;
  };

  if (!tickers?.length) {
    return NextResponse.json({ error: "No tickers provided" }, { status: 400 });
  }

  const BATCH_SIZE = 8;
  const BATCH_DELAY = 300;
  const results: ChartResult[] = [];

  for (let i = 0; i < tickers.length; i += BATCH_SIZE) {
    const batch = tickers.slice(i, i + BATCH_SIZE);

    const settled = await Promise.allSettled(
      batch.map((t) => fetchChart(t, range, interval))
    );

    for (let j = 0; j < settled.length; j++) {
      const r = settled[j];
      if (r.status === "fulfilled" && r.value) {
        r.value.name = names[r.value.ticker] || r.value.ticker;
        results.push(r.value);
      }
    }

    if (i + BATCH_SIZE < tickers.length) {
      await new Promise((r) => setTimeout(r, BATCH_DELAY));
    }
  }

  return NextResponse.json({ results });
}
