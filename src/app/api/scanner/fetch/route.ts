import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Top S&P 500 stocks with names and sectors (avoids extra API calls)
const STOCK_META: Record<string, { name: string; sector: string }> = {
  AAPL: { name: "Apple Inc.", sector: "Technology" },
  MSFT: { name: "Microsoft Corp.", sector: "Technology" },
  NVDA: { name: "NVIDIA Corp.", sector: "Technology" },
  GOOGL: { name: "Alphabet Inc.", sector: "Technology" },
  AMZN: { name: "Amazon.com Inc.", sector: "Consumer Cycl." },
  META: { name: "Meta Platforms Inc.", sector: "Technology" },
  TSLA: { name: "Tesla Inc.", sector: "Consumer Cycl." },
  "BRK.B": { name: "Berkshire Hathaway B", sector: "Financial" },
  AVGO: { name: "Broadcom Inc.", sector: "Technology" },
  JPM: { name: "JPMorgan Chase & Co.", sector: "Financial" },
  LLY: { name: "Eli Lilly & Co.", sector: "Healthcare" },
  V: { name: "Visa Inc.", sector: "Financial" },
  UNH: { name: "UnitedHealth Group", sector: "Healthcare" },
  XOM: { name: "Exxon Mobil Corp.", sector: "Energy" },
  MA: { name: "Mastercard Inc.", sector: "Financial" },
  JNJ: { name: "Johnson & Johnson", sector: "Healthcare" },
  PG: { name: "Procter & Gamble Co.", sector: "Consumer Def." },
  COST: { name: "Costco Wholesale", sector: "Consumer Def." },
  HD: { name: "Home Depot Inc.", sector: "Consumer Cycl." },
  ABBV: { name: "AbbVie Inc.", sector: "Healthcare" },
  CRM: { name: "Salesforce Inc.", sector: "Technology" },
  AMD: { name: "Advanced Micro Devices", sector: "Technology" },
  NFLX: { name: "Netflix Inc.", sector: "Technology" },
  WMT: { name: "Walmart Inc.", sector: "Consumer Def." },
  BAC: { name: "Bank of America Corp.", sector: "Financial" },
  MRK: { name: "Merck & Co.", sector: "Healthcare" },
  ORCL: { name: "Oracle Corp.", sector: "Technology" },
  CVX: { name: "Chevron Corp.", sector: "Energy" },
  KO: { name: "Coca-Cola Co.", sector: "Consumer Def." },
  PEP: { name: "PepsiCo Inc.", sector: "Consumer Def." },
  TMO: { name: "Thermo Fisher Scientific", sector: "Healthcare" },
  ACN: { name: "Accenture plc", sector: "Technology" },
  CSCO: { name: "Cisco Systems Inc.", sector: "Technology" },
  MCD: { name: "McDonald's Corp.", sector: "Consumer Cycl." },
  ABT: { name: "Abbott Laboratories", sector: "Healthcare" },
  DHR: { name: "Danaher Corp.", sector: "Healthcare" },
  ADBE: { name: "Adobe Inc.", sector: "Technology" },
  TXN: { name: "Texas Instruments", sector: "Technology" },
  CMCSA: { name: "Comcast Corp.", sector: "Technology" },
  WFC: { name: "Wells Fargo & Co.", sector: "Financial" },
  DIS: { name: "Walt Disney Co.", sector: "Consumer Cycl." },
  PM: { name: "Philip Morris Int'l", sector: "Consumer Def." },
  VZ: { name: "Verizon Communications", sector: "Technology" },
  INTC: { name: "Intel Corp.", sector: "Technology" },
  NEE: { name: "NextEra Energy Inc.", sector: "Utilities" },
  RTX: { name: "RTX Corp.", sector: "Industrials" },
  UNP: { name: "Union Pacific Corp.", sector: "Industrials" },
  HON: { name: "Honeywell Int'l", sector: "Industrials" },
  INTU: { name: "Intuit Inc.", sector: "Technology" },
  QCOM: { name: "Qualcomm Inc.", sector: "Technology" },
  LOW: { name: "Lowe's Companies", sector: "Consumer Cycl." },
  SPGI: { name: "S&P Global Inc.", sector: "Financial" },
  CAT: { name: "Caterpillar Inc.", sector: "Industrials" },
  GS: { name: "Goldman Sachs Group", sector: "Financial" },
  BA: { name: "Boeing Co.", sector: "Industrials" },
  IBM: { name: "IBM Corp.", sector: "Technology" },
  BLK: { name: "BlackRock Inc.", sector: "Financial" },
  AMAT: { name: "Applied Materials", sector: "Technology" },
  GE: { name: "General Electric Co.", sector: "Industrials" },
  ISRG: { name: "Intuitive Surgical", sector: "Healthcare" },
  AXP: { name: "American Express Co.", sector: "Financial" },
  MDLZ: { name: "Mondelez Int'l", sector: "Consumer Def." },
  SYK: { name: "Stryker Corp.", sector: "Healthcare" },
  BKNG: { name: "Booking Holdings", sector: "Consumer Cycl." },
  LRCX: { name: "Lam Research Corp.", sector: "Technology" },
  ADI: { name: "Analog Devices Inc.", sector: "Technology" },
  GILD: { name: "Gilead Sciences Inc.", sector: "Healthcare" },
  MMC: { name: "Marsh & McLennan", sector: "Financial" },
  PFE: { name: "Pfizer Inc.", sector: "Healthcare" },
  T: { name: "AT&T Inc.", sector: "Technology" },
  VRTX: { name: "Vertex Pharmaceuticals", sector: "Healthcare" },
  ADP: { name: "Automatic Data Processing", sector: "Industrials" },
  AMT: { name: "American Tower Corp.", sector: "Real Estate" },
  DE: { name: "Deere & Company", sector: "Industrials" },
  PANW: { name: "Palo Alto Networks", sector: "Technology" },
  ETN: { name: "Eaton Corp.", sector: "Industrials" },
  CB: { name: "Chubb Limited", sector: "Financial" },
  SO: { name: "Southern Company", sector: "Utilities" },
  DUK: { name: "Duke Energy Corp.", sector: "Utilities" },
  CI: { name: "Cigna Group", sector: "Healthcare" },
  SCHW: { name: "Charles Schwab Corp.", sector: "Financial" },
  CME: { name: "CME Group Inc.", sector: "Financial" },
  BSX: { name: "Boston Scientific", sector: "Healthcare" },
  PLD: { name: "Prologis Inc.", sector: "Real Estate" },
  FI: { name: "Fiserv Inc.", sector: "Financial" },
  MO: { name: "Altria Group Inc.", sector: "Consumer Def." },
  CL: { name: "Colgate-Palmolive Co.", sector: "Consumer Def." },
  SHW: { name: "Sherwin-Williams Co.", sector: "Industrials" },
  ZTS: { name: "Zoetis Inc.", sector: "Healthcare" },
  ICE: { name: "Intercontinental Exchange", sector: "Financial" },
  NOC: { name: "Northrop Grumman Corp.", sector: "Industrials" },
  LMT: { name: "Lockheed Martin Corp.", sector: "Industrials" },
  GD: { name: "General Dynamics Corp.", sector: "Industrials" },
  COP: { name: "ConocoPhillips", sector: "Energy" },
  EOG: { name: "EOG Resources Inc.", sector: "Energy" },
  SLB: { name: "Schlumberger NV", sector: "Energy" },
  PSA: { name: "Public Storage", sector: "Real Estate" },
  WM: { name: "Waste Management Inc.", sector: "Industrials" },
  USB: { name: "U.S. Bancorp", sector: "Financial" },
  PNC: { name: "PNC Financial Services", sector: "Financial" },
  TGT: { name: "Target Corp.", sector: "Consumer Cycl." },
  F: { name: "Ford Motor Co.", sector: "Consumer Cycl." },
  GM: { name: "General Motors Co.", sector: "Consumer Cycl." },
  SBUX: { name: "Starbucks Corp.", sector: "Consumer Cycl." },
  NKE: { name: "Nike Inc.", sector: "Consumer Cycl." },
  PYPL: { name: "PayPal Holdings Inc.", sector: "Financial" },
  SQ: { name: "Block Inc.", sector: "Financial" },
  UBER: { name: "Uber Technologies", sector: "Technology" },
  ABNB: { name: "Airbnb Inc.", sector: "Consumer Cycl." },
  COIN: { name: "Coinbase Global", sector: "Financial" },
  SNAP: { name: "Snap Inc.", sector: "Technology" },
  PLTR: { name: "Palantir Technologies", sector: "Technology" },
  RIVN: { name: "Rivian Automotive", sector: "Consumer Cycl." },
  MRVL: { name: "Marvell Technology", sector: "Technology" },
  MU: { name: "Micron Technology", sector: "Technology" },
  KLAC: { name: "KLA Corp.", sector: "Technology" },
  SNPS: { name: "Synopsys Inc.", sector: "Technology" },
  CDNS: { name: "Cadence Design Systems", sector: "Technology" },
  FTNT: { name: "Fortinet Inc.", sector: "Technology" },
  CRWD: { name: "CrowdStrike Holdings", sector: "Technology" },
  DDOG: { name: "Datadog Inc.", sector: "Technology" },
  SNOW: { name: "Snowflake Inc.", sector: "Technology" },
  NET: { name: "Cloudflare Inc.", sector: "Technology" },
  ZS: { name: "Zscaler Inc.", sector: "Technology" },
  WDAY: { name: "Workday Inc.", sector: "Technology" },
  NOW: { name: "ServiceNow Inc.", sector: "Technology" },
  TEAM: { name: "Atlassian Corp.", sector: "Technology" },
  TTD: { name: "The Trade Desk Inc.", sector: "Technology" },
  DASH: { name: "DoorDash Inc.", sector: "Technology" },
  RBLX: { name: "Roblox Corp.", sector: "Technology" },
  U: { name: "Unity Software Inc.", sector: "Technology" },
  SE: { name: "Sea Limited", sector: "Technology" },
  SHOP: { name: "Shopify Inc.", sector: "Technology" },
  MELI: { name: "MercadoLibre Inc.", sector: "Consumer Cycl." },
  SQ2: { name: "Block Inc.", sector: "Financial" },
  ENPH: { name: "Enphase Energy Inc.", sector: "Technology" },
  FSLR: { name: "First Solar Inc.", sector: "Technology" },
  XEL: { name: "Xcel Energy Inc.", sector: "Utilities" },
  AEP: { name: "American Electric Power", sector: "Utilities" },
  D: { name: "Dominion Energy Inc.", sector: "Utilities" },
  EXC: { name: "Exelon Corp.", sector: "Utilities" },
  O: { name: "Realty Income Corp.", sector: "Real Estate" },
  SPG: { name: "Simon Property Group", sector: "Real Estate" },
  WELL: { name: "Welltower Inc.", sector: "Real Estate" },
  EQR: { name: "Equity Residential", sector: "Real Estate" },
};

const ALL_SYMBOLS = Object.keys(STOCK_META);

function classifySignal(changePct: number, prevClose: number, currentPrice: number): string {
  let bullish = 0;
  let bearish = 0;

  // Price change direction
  if (changePct > 1.5) bullish += 2;
  else if (changePct > 0.5) bullish += 1;
  else if (changePct < -1.5) bearish += 2;
  else if (changePct < -0.5) bearish += 1;

  // Gap direction (current vs prev close)
  const gap = prevClose > 0 ? ((currentPrice - prevClose) / prevClose) * 100 : 0;
  if (gap > 0.3) bullish += 1;
  else if (gap < -0.3) bearish += 1;

  if (bullish >= 2) return "Bullish";
  if (bearish >= 2) return "Bearish";
  return "Neutral";
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const finnhubKey = process.env.FINNHUB_API_KEY;

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  if (!finnhubKey) {
    return NextResponse.json({ error: "FINNHUB_API_KEY not configured" }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, serviceKey);

  const { data: run, error: runError } = await supabase
    .from("scanner_runs")
    .insert({ status: "running", source: "finnhub" })
    .select()
    .single();

  if (runError || !run) {
    return NextResponse.json(
      { error: `Failed to create run: ${runError?.message}` },
      { status: 500 }
    );
  }

  try {
    const results = [];
    const errors: string[] = [];

    // Fetch quotes in parallel batches of 10 (Finnhub free: 60/min)
    const BATCH_SIZE = 10;
    const BATCH_DELAY_MS = 1200; // ~10 calls per 1.2s = 50/min (safe margin)

    for (let i = 0; i < ALL_SYMBOLS.length; i += BATCH_SIZE) {
      const batch = ALL_SYMBOLS.slice(i, i + BATCH_SIZE);

      const quotes = await Promise.allSettled(
        batch.map(async (symbol) => {
          const res = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${finnhubKey}`
          );
          const quote = await res.json();
          return { symbol, quote };
        })
      );

      for (const result of quotes) {
        if (result.status === "rejected") continue;

        const { symbol, quote } = result.value;
        if (!quote.c || quote.c <= 0) continue;

        const changePct = quote.pc > 0 ? ((quote.c - quote.pc) / quote.pc) * 100 : 0;
        const meta = STOCK_META[symbol] ?? { name: symbol, sector: null };

        results.push({
          run_id: run.id,
          symbol,
          name: meta.name,
          price: Math.round(quote.c * 100) / 100,
          change_pct: Math.round(changePct * 100) / 100,
          volume: quote.v ?? 0,
          sector: meta.sector,
          signal: classifySignal(changePct, quote.pc, quote.c),
        });
      }

      // Rate limit between batches
      if (i + BATCH_SIZE < ALL_SYMBOLS.length) {
        await new Promise((r) => setTimeout(r, BATCH_DELAY_MS));
      }
    }

    // Insert results in one batch
    if (results.length > 0) {
      const { error: insertError } = await supabase
        .from("scanner_results")
        .insert(results);

      if (insertError) throw new Error(`Insert failed: ${insertError.message}`);
    }

    // Mark run as completed
    await supabase
      .from("scanner_runs")
      .update({
        status: "completed",
        completed_at: new Date().toISOString(),
        total_symbols: results.length,
      })
      .eq("id", run.id);

    return NextResponse.json({
      success: true,
      runId: run.id,
      symbolsFetched: results.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (err) {
    await supabase
      .from("scanner_runs")
      .update({
        status: "failed",
        completed_at: new Date().toISOString(),
        error_message: err instanceof Error ? err.message : "Unknown error",
      })
      .eq("id", run.id);

    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
