import { NextRequest, NextResponse } from "next/server";

const YAHOO_CHART = "https://query1.finance.yahoo.com/v8/finance/chart";

export async function GET(request: NextRequest) {
  const ticker = request.nextUrl.searchParams.get("ticker");
  if (!ticker) {
    return NextResponse.json({ error: "ticker param required" }, { status: 400 });
  }

  const detail = request.nextUrl.searchParams.get("detail") === "1";

  try {
    const url = `${YAHOO_CHART}/${encodeURIComponent(ticker)}?interval=1wk&range=5y&includePrePost=false`;
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

    const opens: (number | null)[] = quote.open ?? [];
    const highs: (number | null)[] = quote.high ?? [];
    const lows: (number | null)[] = quote.low ?? [];
    const closes: (number | null)[] = quote.close ?? [];
    const volumes: (number | null)[] = quote.volume ?? [];
    const current: number = result.meta?.regularMarketPrice ?? 0;

    // Find ATH (highest weekly high)
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

    const toYear = (ts: number) => new Date(ts * 1000).getFullYear();

    const baseResponse: Record<string, unknown> = {
      ath: Math.round(athValue * 100) / 100,
      low: Math.round(lowValue * 100) / 100,
      current: Math.round(current * 100) / 100,
      athYear: toYear(timestamps[athIdx]),
      lowYear: toYear(timestamps[lowIdx]),
    };

    if (detail) {
      // Build clean arrays, replacing nulls with previous valid value
      const cleanOpen: number[] = [];
      const cleanHigh: number[] = [];
      const cleanLow: number[] = [];
      const cleanClose: number[] = [];
      const cleanVolume: number[] = [];
      const cleanTimestamps: number[] = [];

      for (let i = 0; i < timestamps.length; i++) {
        if (closes[i] == null) continue;
        cleanTimestamps.push(timestamps[i]);
        cleanOpen.push(opens[i] ?? closes[i]!);
        cleanHigh.push(highs[i] ?? closes[i]!);
        cleanLow.push(lows[i] ?? closes[i]!);
        cleanClose.push(closes[i]!);
        cleanVolume.push(volumes[i] ?? 0);
      }

      baseResponse.series = {
        timestamps: cleanTimestamps,
        open: cleanOpen,
        high: cleanHigh,
        low: cleanLow,
        close: cleanClose,
        volume: cleanVolume,
      };
      baseResponse.athIdx = athIdx;
      baseResponse.lowIdx = lowIdx;
    }

    return NextResponse.json(baseResponse);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Fetch failed" },
      { status: 502 }
    );
  }
}
