"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Loader2 } from "lucide-react";

// Common timezone offsets
const TIMEZONES = [
  { label: "UTC-12:00 (Baker Island)", value: -12 },
  { label: "UTC-11:00 (Samoa)", value: -11 },
  { label: "UTC-10:00 (Hawaii)", value: -10 },
  { label: "UTC-09:00 (Alaska)", value: -9 },
  { label: "UTC-08:00 (Pacific)", value: -8 },
  { label: "UTC-07:00 (Mountain)", value: -7 },
  { label: "UTC-06:00 (Central)", value: -6 },
  { label: "UTC-05:00 (Eastern)", value: -5 },
  { label: "UTC-04:00 (Atlantic)", value: -4 },
  { label: "UTC-03:00 (Argentina)", value: -3 },
  { label: "UTC-02:00", value: -2 },
  { label: "UTC-01:00 (Azores)", value: -1 },
  { label: "UTC+00:00 (London)", value: 0 },
  { label: "UTC+01:00 (Paris)", value: 1 },
  { label: "UTC+02:00 (Cairo)", value: 2 },
  { label: "UTC+03:00 (Moscow)", value: 3 },
  { label: "UTC+03:30 (Tehran)", value: 3.5 },
  { label: "UTC+04:00 (Dubai)", value: 4 },
  { label: "UTC+04:30 (Kabul)", value: 4.5 },
  { label: "UTC+05:00 (Karachi)", value: 5 },
  { label: "UTC+05:30 (India)", value: 5.5 },
  { label: "UTC+05:45 (Nepal)", value: 5.75 },
  { label: "UTC+06:00 (Dhaka)", value: 6 },
  { label: "UTC+06:30 (Myanmar)", value: 6.5 },
  { label: "UTC+07:00 (Bangkok)", value: 7 },
  { label: "UTC+08:00 (Singapore)", value: 8 },
  { label: "UTC+09:00 (Tokyo)", value: 9 },
  { label: "UTC+09:30 (Adelaide)", value: 9.5 },
  { label: "UTC+10:00 (Sydney)", value: 10 },
  { label: "UTC+11:00 (Solomon Is.)", value: 11 },
  { label: "UTC+12:00 (Auckland)", value: 12 },
  { label: "UTC+13:00 (Tonga)", value: 13 },
];

interface BirthFormProps {
  onSubmit: (reportId: string) => void;
}

export default function BirthForm({ onSubmit }: BirthFormProps) {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [timezoneOffset, setTimezoneOffset] = useState(-5);
  const [email, setEmail] = useState("");
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setLoadingStage("Geocoding birth location...");

    try {
      const response = await fetch("/api/astrology/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          birthDate,
          birthTime,
          birthPlace,
          timezoneOffset,
          email: email || undefined,
          context: context || undefined,
        }),
      });

      setLoadingStage("Calculating planetary positions...");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate report");
      }

      setLoadingStage("Report complete!");
      onSubmit(data.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full rounded-md border border-[#2a2a2a] bg-[#0f0f0f] px-3 py-2 text-sm text-[#e6e6e6] placeholder:text-[#666] focus:outline-none focus:ring-1 focus:ring-[#185FA5]";

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#5ba3e6]" />
          Birth Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-[#a0a0a0]">
              Full Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              className={inputClasses}
            />
          </div>

          {/* Date and Time row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-[#a0a0a0]">
                Date of Birth *
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
                className={inputClasses}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#a0a0a0]">
                Time of Birth *
              </label>
              <input
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                required
                className={inputClasses}
              />
            </div>
          </div>

          {/* Birth Place */}
          <div>
            <label className="mb-1 block text-sm font-medium text-[#a0a0a0]">
              Birth Place *
            </label>
            <input
              type="text"
              value={birthPlace}
              onChange={(e) => setBirthPlace(e.target.value)}
              placeholder="City, State/Country (e.g., Mumbai, India)"
              required
              className={inputClasses}
            />
          </div>

          {/* Timezone */}
          <div>
            <label className="mb-1 block text-sm font-medium text-[#a0a0a0]">
              Timezone at Birth *
            </label>
            <select
              value={timezoneOffset}
              onChange={(e) => setTimezoneOffset(parseFloat(e.target.value))}
              className={inputClasses}
            >
              {TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>

          {/* Email (optional) */}
          <div>
            <label className="mb-1 block text-sm font-medium text-[#a0a0a0]">
              Email{" "}
              <span className="text-[#666]">(optional)</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className={inputClasses}
            />
          </div>

          {/* Context (optional) */}
          <div>
            <label className="mb-1 block text-sm font-medium text-[#a0a0a0]">
              Area of Focus{" "}
              <span className="text-[#666]">(optional)</span>
            </label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="e.g., Career growth, marriage timing, health concerns..."
              rows={3}
              maxLength={500}
              className={inputClasses + " resize-none"}
            />
            <p className="mt-1 text-xs text-[#666]">
              {context.length}/500 characters
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading || !name || !birthDate || !birthTime || !birthPlace}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {loadingStage}
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Vedic Birth Chart
              </>
            )}
          </Button>

          {/* Loading overlay */}
          {loading && (
            <div className="rounded-md border border-[#2a2a2a] bg-[#1a1a1a] p-4">
              <div className="space-y-3">
                <LoadingStep
                  label="Geocoding birth location"
                  active={loadingStage.includes("Geocoding")}
                  done={!loadingStage.includes("Geocoding")}
                />
                <LoadingStep
                  label="Calculating planetary positions"
                  active={loadingStage.includes("Calculating")}
                  done={loadingStage.includes("complete")}
                />
                <LoadingStep
                  label="Generating AI analysis"
                  active={
                    !loadingStage.includes("Geocoding") &&
                    !loadingStage.includes("Calculating") &&
                    !loadingStage.includes("complete")
                  }
                  done={loadingStage.includes("complete")}
                />
              </div>
              <p className="mt-3 text-center text-xs text-[#666]">
                This typically takes 15-30 seconds
              </p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}

function LoadingStep({
  label,
  active,
  done,
}: {
  label: string;
  active: boolean;
  done: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      {done ? (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20 text-green-400">
          <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6L5 9L10 3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ) : active ? (
        <Loader2 className="h-5 w-5 animate-spin text-[#5ba3e6]" />
      ) : (
        <div className="h-5 w-5 rounded-full border border-[#2a2a2a]" />
      )}
      <span
        className={
          active
            ? "text-sm text-white"
            : done
              ? "text-sm text-[#a0a0a0]"
              : "text-sm text-[#666]"
        }
      >
        {label}
      </span>
    </div>
  );
}
