"use client";

import { useRouter } from "next/navigation";
import { Moon, Star, Sparkles } from "lucide-react";
import BirthForm from "@/components/astrology/birth-form";

export default function AstrologyPage() {
  const router = useRouter();

  const handleReportGenerated = (reportId: string) => {
    router.push(`/astrology/report/${reportId}`);
  };

  return (
    <div className="space-y-8 py-8">
      {/* Header */}
      <div className="text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <Moon className="h-6 w-6 text-[#5ba3e6]" />
          <Sparkles className="h-8 w-8 text-[#5ba3e6]" />
          <Star className="h-6 w-6 text-[#5ba3e6]" />
        </div>
        <h1 className="text-3xl font-bold text-white">
          Vedic Birth Chart Analysis
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-[#a0a0a0]">
          Enter your birth details to generate a comprehensive Vedic astrology
          report powered by astronomical calculations and AI interpretation.
        </p>
      </div>

      {/* Form */}
      <BirthForm onSubmit={handleReportGenerated} />

      {/* Features */}
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
        <FeatureCard
          title="Precise Calculations"
          description="Planetary positions via astronomy-engine with Lahiri ayanamsa"
        />
        <FeatureCard
          title="Full Dasha Timeline"
          description="Vimshottari Dasha periods with current and upcoming predictions"
        />
        <FeatureCard
          title="AI Interpretation"
          description="Detailed report by Claude analyzing your unique planetary combinations"
        />
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-4 text-center">
      <h3 className="text-sm font-medium text-white">{title}</h3>
      <p className="mt-1 text-xs text-[#a0a0a0]">{description}</p>
    </div>
  );
}
