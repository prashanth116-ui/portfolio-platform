import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

interface DeepInput {
  ticker: string;
  name: string;
  ath: number;
  athDate: string;
  low: number;
  lowDate: string;
  current: number;
  declinePct: number;
  durationMonths: number;
  recoveryPct: number;
  score: number;
  label?: string;
  htf: string;
  ltf: string;
  // V2 enriched fields
  weeklyCloses?: number[];
  fibZone?: string;
  fibDepth?: number;
  goldenZone?: boolean;
  volumeTrend?: string;
  structure?: string;
  swingCount?: number;
  momentumScore?: number;
  scannerMode?: string;
  // V3 wave count fields
  waveCountValid?: boolean;
  waveCountScore?: number;
  waveCountPosition?: string;
  waveCountViolations?: string[];
  waveLabels?: string;
  alternatePosition?: string;
  fibExtensions?: { ratio: number; price: number; label: string }[];
  confluenceZones?: { price: number; levels: string[] }[];
}

export async function POST(request: NextRequest) {
  const data = (await request.json()) as DeepInput;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY not configured" },
      { status: 500 }
    );
  }

  // Build price series context if available
  let seriesContext = "";
  if (data.weeklyCloses?.length) {
    // Sample to ~50 data points for prompt efficiency
    const closes = data.weeklyCloses;
    const step = Math.max(1, Math.floor(closes.length / 50));
    const sampled = closes.filter((_, i) => i % step === 0);
    seriesContext = `\nWeekly closes (sampled, ${sampled.length} pts): [${sampled.map((p) => p.toFixed(2)).join(", ")}]`;
  }

  // Build analysis context
  let analysisContext = "";
  if (data.fibZone) {
    analysisContext += `\n- Fibonacci zone: ${data.fibZone} (depth: ${(data.fibDepth ?? 0).toFixed(1)}%, golden zone: ${data.goldenZone ? "yes" : "no"})`;
  }
  if (data.volumeTrend) analysisContext += `\n- Volume trend: ${data.volumeTrend}`;
  if (data.structure) analysisContext += `\n- Decline structure: ${data.structure} (${data.swingCount ?? 0} swings)`;
  if (data.momentumScore != null) analysisContext += `\n- Momentum score: ${data.momentumScore.toFixed(2)} (-1 bearish to +1 bullish)`;
  if (data.scannerMode) analysisContext += `\n- Scanner mode: ${data.scannerMode}`;

  // V3: Wave count context
  let waveCountContext = "";
  if (data.waveCountPosition) {
    waveCountContext += `\nAlgorithmic wave counting:`;
    waveCountContext += `\n- Position: ${data.waveCountPosition}`;
    waveCountContext += `\n- Valid: ${data.waveCountValid ? "yes" : "no"} (score: ${data.waveCountScore ?? 0}/100)`;
    if (data.waveLabels) waveCountContext += `\n- Wave labels: ${data.waveLabels}`;
    if (data.waveCountViolations?.length) waveCountContext += `\n- Rule violations: ${data.waveCountViolations.join(", ")}`;
    if (data.alternatePosition) waveCountContext += `\n- Alternate count: ${data.alternatePosition}`;
  }

  let extensionContext = "";
  if (data.fibExtensions?.length) {
    extensionContext += `\nFibonacci extensions (Wave 3/5 targets):`;
    for (const ext of data.fibExtensions) {
      extensionContext += `\n- ${ext.label}: $${ext.price.toFixed(2)}`;
    }
  }
  if (data.confluenceZones?.length) {
    extensionContext += `\nConfluence zones (multiple Fib levels cluster):`;
    for (const z of data.confluenceZones) {
      extensionContext += `\n- $${z.price.toFixed(2)}: ${z.levels.join(" + ")}`;
    }
  }

  const prompt = `You are an expert Elliott Wave analyst. Provide a deep analysis for ${data.ticker} (${data.name}).

Price data:
- ATH: $${data.ath.toFixed(2)} (${data.athDate})
- Low: $${data.low.toFixed(2)} (${data.lowDate})
- Current: $${data.current.toFixed(2)}
- Decline: ${data.declinePct.toFixed(1)}% over ${data.durationMonths.toFixed(0)} months
- Recovery: ${data.recoveryPct.toFixed(1)}% from low
- Mechanical score: ${data.score}/20
${data.label ? `- Quick label: ${data.label}` : ""}${seriesContext}${analysisContext ? `\nTechnical analysis:${analysisContext}` : ""}${waveCountContext}${extensionContext}

Timeframes: ${data.htf} (primary) / ${data.ltf} (sub-waves)

Reply with ONLY valid JSON in this exact format:
{
  "wavePosition": "e.g. Wave 2 bottom / Wave 4 correction / Wave 5 topping",
  "confidence": "high" | "medium" | "low",
  "primaryCount": "Primary EW count description",
  "alternateCount": "Alternate EW count description",
  "nextTarget": price_number_or_null,
  "invalidation": price_number_or_null,
  "keyLevels": [{"label": "Support 1", "price": 123.45}, {"label": "Resistance 1", "price": 234.56}],
  "riskLevel": "Low" | "Medium" | "High",
  "summary": "Concise 2-3 sentence analysis with specific price levels"
}`;

  try {
    const client = new Anthropic();
    const msg = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 800,
      messages: [{ role: "user", content: prompt }],
    });

    const text =
      msg.content[0].type === "text" ? msg.content[0].text : "";

    // Try JSON parse
    try {
      const parsed = JSON.parse(text);
      return NextResponse.json({ analysis: text, structured: parsed });
    } catch {
      // Fall back to wrapping raw text in summary field
      return NextResponse.json({
        analysis: text,
        structured: {
          wavePosition: "",
          confidence: "medium",
          primaryCount: "",
          alternateCount: "",
          nextTarget: null,
          invalidation: null,
          keyLevels: [],
          riskLevel: "Medium",
          summary: text,
        },
      });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ analysis: `Error: ${message}` });
  }
}
