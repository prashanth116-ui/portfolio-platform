import { NextRequest, NextResponse } from "next/server";

const YAHOO_CHART = "https://query1.finance.yahoo.com/v8/finance/chart";

export async function GET(request: NextRequest) {
  const ticker = request.nextUrl.searchParams.get("ticker");
  if (!ticker) {
    return NextResponse.json({ error: "ticker param required" }, { status: 400 });
  }

  try {
    const url = `${YAHOO_CHART}/${encodeURIComponent(ticker)}?range=10y&interval=1mo&includeTimestamps=true`;
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Yahoo returned ${res.status}` },
        { status: 502 }
      );
    }

    const data = await res.json();
    const result = data?.chart?.result?.[0];
    if (!result) {
      return NextResponse.json({ error: "No chart data" }, { status: 404 });
    }

    const timestamps: number[] = result.timestamp ?? [];
    const quote = result.indicators?.quote?.[0];
    if (!quote || !timestamps.length) {
      return NextResponse.json({ error: "No OHLC data" }, { status: 404 });
    }

    const highs: (number | null)[] = quote.high ?? [];
    const lows: (number | null)[] = quote.low ?? [];
    const current: number = result.meta?.regularMarketPrice ?? 0;

    // Find ATH (highest monthly high)
    let athIdx = 0;
    let athValue = -Infinity;
    for (let i = 0; i < highs.length; i++) {
      if (highs[i] != null && highs[i]! > athValue) {
        athValue = highs[i]!;
        athIdx = i;
      }
    }

    // Find lowest low AFTER ATH
    let lowIdx = athIdx;
    let lowValue = Infinity;
    for (let i = athIdx; i < lows.length; i++) {
      if (lows[i] != null && lows[i]! < lowValue) {
        lowValue = lows[i]!;
        lowIdx = i;
      }
    }

    if (lowValue === Infinity) lowValue = current;

    // Convert timestamps to fractional years (e.g. 2021.75 = Oct 2021)
    const toFracYear = (ts: number) => {
      const d = new Date(ts * 1000);
      return d.getFullYear() + d.getMonth() / 12;
    };

    return NextResponse.json({
      ath: Math.round(athValue * 100) / 100,
      low: Math.round(lowValue * 100) / 100,
      current: Math.round(current * 100) / 100,
      athYear: Math.round(toFracYear(timestamps[athIdx]) * 100) / 100,
      lowYear: Math.round(toFracYear(timestamps[lowIdx]) * 100) / 100,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Fetch failed" },
      { status: 502 }
    );
  }
}
