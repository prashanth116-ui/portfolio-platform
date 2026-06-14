"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/data/projects";

export function ArchivedSection({ projects }: { projects: Project[] }) {
  const [expanded, setExpanded] = useState(false);

  if (projects.length === 0) return null;

  return (
    <section>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-sm text-[#a0a0a0] transition-colors hover:text-white"
      >
        {expanded ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
        {expanded ? "Hide" : "Show"} {projects.length} archived project
        {projects.length !== 1 && "s"}
      </button>

      {expanded && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
