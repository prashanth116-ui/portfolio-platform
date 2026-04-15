import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  // Verify cron secret for security
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json(
      { error: "Supabase not configured" },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, serviceKey);

  // Create a new run record
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
    const finnhubKey = process.env.FINNHUB_API_KEY;
    if (!finnhubKey) {
      throw new Error("FINNHUB_API_KEY not configured");
    }

    // Fetch S&P 500 constituents
    const symbolsRes = await fetch(
      `https://finnhub.io/api/v1/index/constituents?symbol=^GSPC&token=${finnhubKey}`
    );
    const symbolsData = await symbolsRes.json();
    const symbols: string[] = (symbolsData.constituents ?? []).slice(0, 100);

    const results = [];

    // Fetch quotes in batches (Finnhub rate limit: 60/min on free tier)
    for (const symbol of symbols) {
      try {
        const quoteRes = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${finnhubKey}`
        );
        const quote = await quoteRes.json();

        if (quote.c && quote.c > 0) {
          const changePct =
            quote.pc > 0 ? ((quote.c - quote.pc) / quote.pc) * 100 : 0;

          results.push({
            run_id: run.id,
            symbol,
            name: symbol,
            price: quote.c,
            change_pct: Math.round(changePct * 100) / 100,
            volume: quote.v ?? 0,
          });
        }
      } catch {
        // Skip individual symbol errors
      }

      // Rate limit: ~30 requests/second
      await new Promise((r) => setTimeout(r, 35));
    }

    // Insert results
    if (results.length > 0) {
      const { error: insertError } = await supabase
        .from("scanner_results")
        .insert(results);

      if (insertError) {
        throw new Error(`Insert failed: ${insertError.message}`);
      }
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
    });
  } catch (err) {
    // Mark run as failed
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
