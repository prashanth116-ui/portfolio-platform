"use client";

import { useState } from "react";
import { diagrams } from "@/data/diagrams";
import { MermaidDiagram } from "@/components/mermaid-diagram";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FlowsPage() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    [diagrams[0].id]: true,
  });

  const toggle = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Strategy Flow Diagrams
        </h1>
        <p className="mt-2 text-[#a0a0a0]">
          Visual architecture of the V10 FVG trading system — from signal
          detection through exit management.
        </p>
      </section>

      <div className="space-y-4">
        {diagrams.map((d) => (
          <div
            key={d.id}
            className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a]"
          >
            <button
              onClick={() => toggle(d.id)}
              className="flex w-full items-center justify-between p-5 text-left"
            >
              <div>
                <h3 className="text-lg font-semibold text-white">{d.title}</h3>
                <p className="mt-0.5 text-sm text-[#a0a0a0]">
                  {d.description}
                </p>
              </div>
              {expanded[d.id] ? (
                <ChevronUp className="h-5 w-5 flex-shrink-0 text-[#a0a0a0]" />
              ) : (
                <ChevronDown className="h-5 w-5 flex-shrink-0 text-[#a0a0a0]" />
              )}
            </button>
            {expanded[d.id] && (
              <div className="border-t border-[#2a2a2a] p-5">
                <MermaidDiagram chart={d.mermaid} id={d.id} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
