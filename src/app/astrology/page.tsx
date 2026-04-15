import { Sparkles } from "lucide-react";

export default function AstrologyPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6">
      <div className="rounded-full bg-[#1a1a1a] p-6">
        <Sparkles className="h-12 w-12 text-[#5ba3e6]" />
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Astrology</h1>
        <p className="mt-2 text-[#a0a0a0]">
          Coming soon — astrology project details will appear here.
        </p>
      </div>
    </div>
  );
}
