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

  const prompt = `You are an expert Elliott Wave analyst. Provide a concise deep analysis (~150 words) for ${data.ticker} (${data.name}).

Price data:
- ATH: $${data.ath.toFixed(2)} (${data.athDate})
- Low: $${data.low.toFixed(2)} (${data.lowDate})
- Current: $${data.current.toFixed(2)}
- Decline: ${data.declinePct.toFixed(1)}% over ${data.durationMonths.toFixed(0)} months
- Recovery: ${data.recoveryPct.toFixed(1)}% from low
- Mechanical score: ${data.score}/7
${data.label ? `- Quick label: ${data.label}` : ""}

Timeframes: ${data.htf} (primary) / ${data.ltf} (sub-waves)

Analyze:
1. Most likely Elliott Wave count (which wave are we in?)
2. Key price levels to watch (support/resistance)
3. Probable next move direction and target
4. Risk level (Low/Medium/High)

Be specific with price levels. Use standard EW notation (Wave 1-5, A-B-C).`;

  try {
    const client = new Anthropic();
    const msg = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 600,
      messages: [{ role: "user", content: prompt }],
    });

    const text =
      msg.content[0].type === "text" ? msg.content[0].text : "";

    return NextResponse.json({ analysis: text });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ analysis: `Error: ${message}` });
  }
}
