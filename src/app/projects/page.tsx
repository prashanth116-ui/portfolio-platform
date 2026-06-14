import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";
import { MetricCard } from "@/components/metric-card";
import { ArchivedSection } from "@/components/archived-toggle";

export const metadata: Metadata = {
  title: "Software Projects — Prashanth Sundaram",
  description:
    "20 projects spanning cloud infrastructure, SaaS, AI tools, real estate, and market research.",
};

type ProjectStatus = "ACTIVE" | "COMPLETE" | "IN_PROGRESS" | "RESEARCH" | "ARCHIVED";

const STATUS_GROUPS: { label: string; statuses: ProjectStatus[] }[] = [
  { label: "Active / Complete", statuses: ["ACTIVE", "COMPLETE"] },
  { label: "In Progress", statuses: ["IN_PROGRESS"] },
  { label: "Research", statuses: ["RESEARCH"] },
];

export default function ProjectsPage() {
  const activeComplete = projects.filter(
    (p) => p.status === "ACTIVE" || p.status === "COMPLETE"
  );
  const inProgress = projects.filter((p) => p.status === "IN_PROGRESS");
  const research = projects.filter((p) => p.status === "RESEARCH");
  const archived = projects.filter((p) => p.status === "ARCHIVED");

  return (
    <div className="space-y-10">
      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Software Projects
        </h1>
        <p className="mt-2 text-[#a0a0a0]">
          {projects.length} projects spanning cloud infrastructure, SaaS, AI
          tools, real estate, and market research.
        </p>
      </section>

      {/* Metrics */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <MetricCard label="Active / Complete" value={activeComplete.length} />
        <MetricCard label="In Progress" value={inProgress.length} />
        <MetricCard label="Research" value={research.length} />
        <MetricCard label="Total" value={projects.length} />
      </section>

      {/* Project Groups (non-archived) */}
      {STATUS_GROUPS.map((group) => {
        const filtered = projects.filter((p) =>
          group.statuses.includes(p.status)
        );
        if (filtered.length === 0) return null;
        return (
          <section key={group.label}>
            <h2 className="mb-4 text-xl font-semibold text-white">
              {group.label}{" "}
              <span className="text-sm font-normal text-[#a0a0a0]">
                ({filtered.length})
              </span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        );
      })}

      {/* Archived — hidden by default */}
      <ArchivedSection projects={archived} />
    </div>
  );
}
