import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/data/projects";
import { researchContent } from "@/data/research-content";
import { StatusBadge } from "@/components/status-badge";
import { ContentBlockRenderer } from "@/components/research/content-blocks";

/** Map URL slugs to project IDs in the data layer */
const SLUG_MAP: Record<string, string> = {
  stablecoin: "stablecoin_research",
};

function resolveProject(slug: string) {
  const projectId = SLUG_MAP[slug];
  if (!projectId) return null;
  const project = projects.find((p) => p.id === projectId);
  const content = researchContent[projectId];
  if (!project?.has_detail || !content) return null;
  return { project, content };
}

export function generateStaticParams() {
  return Object.keys(SLUG_MAP).map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const resolved = resolveProject(id);
  if (!resolved) return { title: "Not Found" };
  return {
    title: `${resolved.project.name} — Prashanth Sundaram`,
    description: resolved.project.tagline,
  };
}

export default async function ResearchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const resolved = resolveProject(id);

  if (!resolved) {
    notFound();
  }

  const { project, content } = resolved;

  return (
    <div className="space-y-8">
      {/* Back link */}
      <Link
        href="/research"
        className="inline-flex items-center gap-1.5 text-sm text-[#5ba3e6] hover:text-[#7bb8ed]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Research
      </Link>

      {/* Header */}
      <section>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {project.name}
            </h1>
            <p className="mt-2 text-[#a0a0a0]">{content.subtitle}</p>
            <div className="mt-1 flex items-center gap-3 text-xs text-[#666]">
              <span>{content.date}</span>
              {content.lastValidated && (
                <span className="rounded-full bg-[#00d97e]/10 px-2 py-0.5 text-[10px] font-medium text-[#00d97e]">
                  Validated {content.lastValidated}
                </span>
              )}
            </div>
          </div>
          <StatusBadge status={project.status} />
        </div>
      </section>

      {/* Content Sections */}
      {content.sections.map((block, i) => (
        <section key={i}>
          <h2 className="mb-4 text-xl font-semibold text-white">
            {block.title}
          </h2>
          <ContentBlockRenderer block={block} />
        </section>
      ))}

      {/* Remaining Work */}
      {project.remaining && project.remaining.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold text-white">
            Remaining Work
          </h2>
          <ul className="space-y-1.5">
            {project.remaining.map((r, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-[#c0c0c0]"
              >
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-amber-500" />
                {r}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
