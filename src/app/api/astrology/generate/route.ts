import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import Anthropic from "@anthropic-ai/sdk";
import { calculateFullChart, geocodePlace } from "@/lib/vedic";
import { buildAstrologyPrompt } from "@/lib/astrology-prompt";
import type { BirthInput } from "@/lib/vedic/types";

const inputSchema = z.object({
  name: z.string().min(1).max(100),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  birthTime: z.string().regex(/^\d{2}:\d{2}$/),
  birthPlace: z.string().min(1).max(200),
  timezoneOffset: z.number().min(-12).max(14),
  email: z.string().email().optional().or(z.literal("")),
  context: z.string().max(500).optional().or(z.literal("")),
});

export const maxDuration = 60; // Vercel hobby limit

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: NextRequest) {
  const supabase = getSupabase();
  let reportId: string | null = null;

  try {
    const body = await request.json();
    const parsed = inputSchema.parse(body);

    // Clean optional fields
    const input: BirthInput = {
      name: parsed.name,
      birthDate: parsed.birthDate,
      birthTime: parsed.birthTime,
      birthPlace: parsed.birthPlace,
      timezoneOffset: parsed.timezoneOffset,
      email: parsed.email || undefined,
      context: parsed.context || undefined,
    };

    // 1. Create pending report
    const { data: report, error: insertError } = await supabase
      .from("astrology_reports")
      .insert({
        status: "calculating",
        name: input.name,
        birth_date: input.birthDate,
        birth_time: input.birthTime,
        birth_place: input.birthPlace,
        latitude: 0,
        longitude: 0,
        timezone_offset: input.timezoneOffset,
        email: input.email || null,
        context: input.context || null,
      })
      .select("id")
      .single();

    if (insertError || !report) {
      throw new Error(`Database insert failed: ${insertError?.message}`);
    }
    reportId = report.id;

    // 2. Geocode
    const location = await geocodePlace(input.birthPlace);

    // Update with geocoded coordinates
    await supabase
      .from("astrology_reports")
      .update({
        latitude: location.latitude,
        longitude: location.longitude,
      })
      .eq("id", reportId);

    // 3. Calculate chart
    const chartData = calculateFullChart(input, location);

    // Update with chart data
    await supabase
      .from("astrology_reports")
      .update({
        status: "generating",
        chart_data: chartData,
        validation_pass: chartData.validation.passed,
      })
      .eq("id", reportId);

    // 4. Generate report with Claude
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const prompt = buildAstrologyPrompt(chartData);

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }],
    });

    // Extract text content
    const textBlock = message.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("No text response from Claude");
    }

    // Parse JSON from response (handle potential markdown code blocks)
    let jsonStr = textBlock.text.trim();
    if (jsonStr.startsWith("```")) {
      jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    }

    let reportSections;
    try {
      reportSections = JSON.parse(jsonStr);
    } catch {
      // Retry: try to extract JSON from response
      const match = jsonStr.match(/\{[\s\S]*\}/);
      if (match) {
        reportSections = JSON.parse(match[0]);
      } else {
        throw new Error("Failed to parse Claude response as JSON");
      }
    }

    // 5. Save completed report
    await supabase
      .from("astrology_reports")
      .update({
        status: "complete",
        report_sections: reportSections,
        completed_at: new Date().toISOString(),
      })
      .eq("id", reportId);

    return NextResponse.json({ id: reportId, status: "complete" });
  } catch (error) {
    const message =
      error instanceof z.ZodError
        ? `Validation error: ${error.issues.map((e) => e.message).join(", ")}`
        : error instanceof Error
          ? error.message
          : "Unknown error";

    // Update report with error if we have an ID
    if (reportId) {
      await supabase
        .from("astrology_reports")
        .update({
          status: "error",
          error_message: message,
        })
        .eq("id", reportId);
    }

    const status = error instanceof z.ZodError ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
