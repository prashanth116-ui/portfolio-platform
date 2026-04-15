"use client";

import { useState } from "react";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { StatusBadge } from "./status-badge";
import type { Project } from "@/data/projects";

function CompletionBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-[#2a2a2a]">
      <div
        className="h-1.5 rounded-full transition-all"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
}

const STATUS_COLORS: Record<string, string> = {
  COMPLETE: "#00d97e",
  ACTIVE: "#00d97e",
  IN_PROGRESS: "#2c7be5",
  RESEARCH: "#f6c343",
  EXPERIMENTAL: "#f6c343",
  IN_DEVELOPMENT: "#2c7be5",
  DEPRECATED: "#6e84a3",
  ARCHIVED: "#6e84a3",
};

export function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);
  const color = STATUS_COLORS[project.status] ?? "#6e84a3";

  return (
    <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-white">{project.name}</h3>
          <p className="mt-0.5 text-sm text-[#a0a0a0]">{project.tagline}</p>
        </div>
        <StatusBadge status={project.status} />
      </div>

      {project.completion > 0 && (
        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between text-xs text-[#a0a0a0]">
            <span>{project.completion}% complete</span>
          </div>
          <CompletionBar pct={project.completion} color={color} />
        </div>
      )}

      <p className="mt-3 text-sm leading-relaxed text-[#c0c0c0]">
        {project.description}
      </p>

      {project.tech_stack && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tech_stack.map((t) => (
            <span
              key={t}
              className="rounded-md bg-[#2a2a2a] px-2 py-0.5 text-xs text-[#a0a0a0]"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {(project.features || project.remaining) && (
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
        <div className="mt-3 space-y-3 border-t border-[#2a2a2a] pt-3">
          {project.features && (
            <div>
              <h4 className="mb-1 text-xs font-medium uppercase tracking-wider text-[#a0a0a0]">
                Key Features
              </h4>
              <ul className="space-y-0.5 text-sm text-[#c0c0c0]">
                {project.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[#5ba3e6]" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {project.remaining && (
            <div>
              <h4 className="mb-1 text-xs font-medium uppercase tracking-wider text-[#a0a0a0]">
                Remaining Work
              </h4>
              <ul className="space-y-0.5 text-sm text-[#c0c0c0]">
                {project.remaining.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-amber-500" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-3 flex items-center gap-3 text-xs">
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[#5ba3e6] hover:text-[#7bb8ed]"
          >
            <ExternalLink className="h-3 w-3" /> GitHub
          </a>
        )}
        {project.deployment && project.deployment !== "N/A" && (
          <span className="text-[#a0a0a0]">{project.deployment}</span>
        )}
      </div>
    </div>
  );
}

export function ProjectCardMini({ project }: { project: Project }) {
  const color = STATUS_COLORS[project.status] ?? "#6e84a3";

  return (
    <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-4 transition-colors hover:border-[#3a3a3a]">
      <h3 className="font-semibold text-white">{project.name}</h3>
      <p className="mt-0.5 text-xs text-[#a0a0a0] line-clamp-2">{project.tagline}</p>
      {project.completion > 0 && (
        <div className="mt-2">
          <CompletionBar pct={project.completion} color={color} />
        </div>
      )}
      <div className="mt-2">
        <StatusBadge status={project.status} />
      </div>
      {project.tech_stack && (
        <div className="mt-2 flex flex-wrap gap-1">
          {project.tech_stack.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded bg-[#2a2a2a] px-1.5 py-0.5 text-[10px] text-[#a0a0a0]"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
