"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChartWheel from "@/components/astrology/chart-wheel";
import PlanetTable from "@/components/astrology/planet-table";
import DashaTimeline from "@/components/astrology/dasha-timeline";
import ReportView from "@/components/astrology/report-view";
import type { AstrologyReport } from "@/lib/vedic/types";

export default function ReportPage() {
  const params = useParams();
  const id = params.id as string;
  const [report, setReport] = useState<AstrologyReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchReport() {
      try {
        const res = await fetch(`/api/astrology/report/${id}`);
        if (!res.ok) {
          throw new Error(
            res.status === 404
              ? "Report not found"
              : "Failed to load report"
          );
        }
        const data = await res.json();
        setReport(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load report");
      } finally {
        setLoading(false);
      }
    }

    fetchReport();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#5ba3e6]" />
          <p className="mt-3 text-[#a0a0a0]">Loading your birth chart...</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-8 w-8 text-red-400" />
          <p className="mt-3 text-red-400">{error || "Report not found"}</p>
          <Link href="/astrology">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Astrology
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (report.status === "error") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-8 w-8 text-red-400" />
          <p className="mt-3 text-red-400">
            Report generation failed: {report.error_message}
          </p>
          <Link href="/astrology">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const chart = report.chart_data;

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/astrology"
            className="mb-2 inline-flex items-center text-sm text-[#a0a0a0] hover:text-white"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back
          </Link>
          <h1 className="text-2xl font-bold text-white">
            {report.name}&apos;s Birth Chart
          </h1>
          <p className="text-sm text-[#a0a0a0]">
            {report.birth_date} at {report.birth_time} &mdash;{" "}
            {report.birth_place}
          </p>
        </div>
        {report.validation_pass && (
          <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
            Validated
          </span>
        )}
      </div>

      {/* Chart + Planet Table */}
      {chart && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Chart Wheel */}
          <Card>
            <CardHeader>
              <CardTitle>Birth Chart (North Indian)</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartWheel chart={chart} />
            </CardContent>
          </Card>

          {/* Planet Table */}
          <Card>
            <CardHeader>
              <CardTitle>Planetary Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <PlanetTable planets={chart.planets} />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Dasha Timeline */}
      {chart && (
        <Card>
          <CardHeader>
            <CardTitle>Vimshottari Dasha Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <DashaTimeline dashas={chart.dashas} />
          </CardContent>
        </Card>
      )}

      {/* AI Report */}
      {report.report_sections && (
        <div>
          <h2 className="mb-3 text-xl font-bold text-white">
            Detailed Analysis
          </h2>
          <ReportView sections={report.report_sections} />
        </div>
      )}

      {/* Chart Metadata */}
      {chart && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Technical Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#a0a0a0] sm:grid-cols-4">
              <div>
                <span className="text-[#666]">Ayanamsa: </span>
                {chart.ayanamsa.toFixed(4)}&deg;
              </div>
              <div>
                <span className="text-[#666]">Julian Date: </span>
                {chart.julianDate.toFixed(4)}
              </div>
              <div>
                <span className="text-[#666]">LST: </span>
                {chart.localSiderealTime.toFixed(4)}&deg;
              </div>
              <div>
                <span className="text-[#666]">Location: </span>
                {chart.location.latitude.toFixed(2)}&deg;N,{" "}
                {chart.location.longitude.toFixed(2)}&deg;E
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
