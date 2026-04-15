import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";

type ProjectStatus = "ACTIVE" | "COMPLETE" | "IN_PROGRESS" | "RESEARCH" | "ARCHIVED";

const STATUS_GROUPS: { label: string; statuses: ProjectStatus[] }[] = [
  { label: "Active / Complete", statuses: ["ACTIVE", "COMPLETE"] },
  { label: "In Progress", statuses: ["IN_PROGRESS"] },
  { label: "Research", statuses: ["RESEARCH"] },
  { label: "Archived", statuses: ["ARCHIVED"] },
];

export default function ProjectsPage() {
  const activeComplete = projects.filter(
    (p) => p.status === "ACTIVE" || p.status === "COMPLETE"
  );
  const inProgress = projects.filter((p) => p.status === "IN_PROGRESS");
  const research = projects.filter((p) => p.status === "RESEARCH");

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
        <MetricBox label="Active / Complete" value={activeComplete.length} />
        <MetricBox label="In Progress" value={inProgress.length} />
        <MetricBox label="Research" value={research.length} />
        <MetricBox label="Total" value={projects.length} />
      </section>

      {/* Project Groups */}
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
    </div>
  );
}

function MetricBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-4">
      <span className="text-xs text-[#a0a0a0]">{label}</span>
      <p className="mt-1 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
