import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({
      error: "Supabase not configured",
      results: [],
      lastUpdated: null,
      totalSymbols: 0,
      debug: {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseAnonKey,
        urlPreview: supabaseUrl ? supabaseUrl.slice(0, 40) + "..." : "MISSING",
      },
    });
  }

  // Validate URL format
  if (!supabaseUrl.includes("supabase.co")) {
    return NextResponse.json({
      error: `Invalid NEXT_PUBLIC_SUPABASE_URL — must be a supabase.co URL, got: ${supabaseUrl.slice(0, 50)}`,
      results: [],
      lastUpdated: null,
      totalSymbols: 0,
    });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const searchParams = request.nextUrl.searchParams;

    const sector = searchParams.get("sector");
    const signal = searchParams.get("signal");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const minVolume = searchParams.get("minVolume");
    const sortBy = searchParams.get("sortBy") ?? "change_pct";
    const sortDir = searchParams.get("sortDir") ?? "desc";
    const limit = parseInt(searchParams.get("limit") ?? "100", 10);

    // Get latest completed run
    const { data: latestRun, error: runError } = await supabase
      .from("scanner_runs")
      .select("id, completed_at")
      .eq("status", "completed")
      .order("completed_at", { ascending: false })
      .limit(1)
      .single();

    if (runError) {
      return NextResponse.json({
        error: `Run query failed: ${runError.message}`,
        results: [],
        lastUpdated: null,
        totalSymbols: 0,
      });
    }

    if (!latestRun) {
      return NextResponse.json({
        results: [],
        lastUpdated: null,
        totalSymbols: 0,
      });
    }

    let query = supabase
      .from("scanner_results")
      .select("*")
      .eq("run_id", latestRun.id);

    if (sector) query = query.eq("sector", sector);
    if (signal) query = query.eq("signal", signal);
    if (minPrice) query = query.gte("price", parseFloat(minPrice));
    if (maxPrice) query = query.lte("price", parseFloat(maxPrice));
    if (minVolume) query = query.gte("volume", parseInt(minVolume, 10));

    const ascending = sortDir === "asc";
    query = query.order(sortBy, { ascending }).limit(limit);

    const { data: results, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: `Results query failed: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      results: results ?? [],
      lastUpdated: latestRun.completed_at,
      totalSymbols: results?.length ?? 0,
    });
  } catch (e) {
    return NextResponse.json(
      { error: `Unexpected error: ${e instanceof Error ? e.message : String(e)}` },
      { status: 500 }
    );
  }
}
