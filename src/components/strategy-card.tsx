"use client";

import { useState } from "react";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { StatusBadge } from "./status-badge";
import type { Strategy } from "@/data/strategies";

export function StrategyCard({ strategy }: { strategy: Strategy }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-white">{strategy.name}</h3>
          <p className="mt-0.5 text-sm text-[#a0a0a0]">
            {strategy.version} | {strategy.instruments.join(", ")}
          </p>
        </div>
        <StatusBadge status={strategy.status} />
      </div>

      <p className="mt-3 text-sm leading-relaxed text-[#c0c0c0]">
        {strategy.description}
      </p>

      {strategy.tech_stack && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {strategy.tech_stack.map((t) => (
            <span
              key={t}
              className="rounded-md bg-[#2a2a2a] px-2 py-0.5 text-xs text-[#a0a0a0]"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {(strategy.entry_types || strategy.exit_structure || strategy.filters) && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 flex items-center gap-1 text-xs text-[#5ba3e6] hover:text-[#7bb8ed]"
        >
          {expanded ? (
            <>
              <ChevronUp className="h-3.5 w-3.5" /> Hide details
            </>
          ) : (
            <>
              <ChevronDown className="h-3.5 w-3.5" /> Show details
            </>
          )}
        </button>
      )}

      {expanded && (
        <div className="mt-3 space-y-4 border-t border-[#2a2a2a] pt-3">
          {strategy.entry_types && (
            <div>
              <h4 className="mb-2 text-xs font-medium uppercase tracking-wider text-[#a0a0a0]">
                Entry Types
              </h4>
              <div className="space-y-2">
                {strategy.entry_types.map((et) => (
                  <div key={et.type} className="rounded-md bg-[#0f0f0f] p-2.5">
                    <span className="text-sm font-medium text-white">
                      Type {et.type}: {et.name}
                    </span>
                    <p className="mt-0.5 text-xs text-[#a0a0a0]">
                      {et.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {strategy.exit_structure && (
            <div>
              <h4 className="mb-2 text-xs font-medium uppercase tracking-wider text-[#a0a0a0]">
                Exit Structure
              </h4>
              <div className="space-y-1 text-sm text-[#c0c0c0]">
                <p>
                  <span className="font-medium text-white">T1:</span>{" "}
                  {strategy.exit_structure.t1}
                </p>
                <p>
                  <span className="font-medium text-white">T2:</span>{" "}
                  {strategy.exit_structure.t2}
                </p>
                <p>
                  <span className="font-medium text-white">Runner:</span>{" "}
                  {strategy.exit_structure.runner}
                </p>
                {strategy.exit_structure.trail_trigger && (
                  <p>
                    <span className="font-medium text-white">Trail Trigger:</span>{" "}
                    {strategy.exit_structure.trail_trigger}
                  </p>
                )}
              </div>
            </div>
          )}

          {strategy.filters && (
            <div>
              <h4 className="mb-2 text-xs font-medium uppercase tracking-wider text-[#a0a0a0]">
                Filter Pipeline
              </h4>
              <div className="space-y-1">
                <p className="text-xs font-medium text-white">
                  Mandatory (must pass):
                </p>
                {strategy.filters.slice(0, 2).map((f, i) => (
                  <p key={i} className="flex items-start gap-2 text-sm text-[#c0c0c0]">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-red-400" />
                    {f}
                  </p>
                ))}
                <p className="mt-2 text-xs font-medium text-white">
                  Optional (2 of 3 must pass):
                </p>
                {strategy.filters.slice(2).map((f, i) => (
                  <p key={i} className="flex items-start gap-2 text-sm text-[#c0c0c0]">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[#5ba3e6]" />
                    {f}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {strategy.github_url && (
        <div className="mt-3">
          <a
            href={strategy.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-[#5ba3e6] hover:text-[#7bb8ed]"
          >
            <ExternalLink className="h-3 w-3" /> GitHub
          </a>
        </div>
      )}
    </div>
  );
}
