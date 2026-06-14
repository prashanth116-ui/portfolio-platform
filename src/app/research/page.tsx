import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  FlaskConical,
  Shield,
  Target,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Research — Prashanth Sundaram",
  description:
    "Market research methodology and deep-dive projects. Battle-tested prompt framework with anti-bias rules, validated across 400+ sources.",
};

const RESEARCH_PROJECTS = [
  {
    slug: "stablecoin",
    title: "Stablecoin Infrastructure Audit",
    tagline:
      "Deep market audit — 7 gaps analyzed, all corrected downward by avg -2.3 points across 400+ sources.",
    status: "Validated" as const,
    statusColor: "text-[#00d97e] bg-[#00d97e]/10",
    icon: Shield,
    stats: [
      { label: "Gaps Analyzed", value: "7" },
      { label: "Avg Correction", value: "-2.3 pts" },
      { label: "Sources", value: "400+" },
    ],
    href: "/research/stablecoin",
  },
  {
    slug: "healthcare-pa",
    title: "Healthcare PA SaaS",
    tagline:
      "Prior Authorization automation for specialty practices — $2.5-2.8B market, 17 competitor profiles.",
    status: "Coming Soon" as const,
    statusColor: "text-[#f6c343] bg-[#f6c343]/10",
    icon: FlaskConical,
    stats: [
      { label: "Market Size", value: "$2.5B+" },
      { label: "Competitors", value: "17" },
      { label: "Interviews", value: "Planned" },
    ],
    href: null,
  },
];

export default function ResearchPage() {
  return (
    <div className="space-y-12">
      {/* Methodology Hero */}
      <section className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#5ba3e6]/15">
            <BookOpen className="h-5 w-5 text-[#5ba3e6]" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Deep Research Methodology
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#a0a0a0]">
              A battle-tested prompt framework for market research and gap
              analysis — built after 3 rounds of stablecoin research proved that
              surface-level scoring hides fatal flaws. Every gap gets validated
              before it gets scored.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="rounded-md border border-[#2a2a2a] bg-[#0f0f0f] p-3 text-center">
            <div className="flex items-center justify-center gap-1.5">
              <Target className="h-3.5 w-3.5 text-[#5ba3e6]" />
              <p className="text-lg font-bold text-white">6</p>
            </div>
            <p className="mt-0.5 text-xs text-[#a0a0a0]">Phases</p>
          </div>
          <div className="rounded-md border border-[#2a2a2a] bg-[#0f0f0f] p-3 text-center">
            <div className="flex items-center justify-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-[#5ba3e6]" />
              <p className="text-lg font-bold text-white">12</p>
            </div>
            <p className="mt-0.5 text-xs text-[#a0a0a0]">Anti-Bias Rules</p>
          </div>
          <div className="rounded-md border border-[#2a2a2a] bg-[#0f0f0f] p-3 text-center">
            <div className="flex items-center justify-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#5ba3e6]" />
              <p className="text-lg font-bold text-white">14</p>
            </div>
            <p className="mt-0.5 text-xs text-[#a0a0a0]">V1 Failures Fixed</p>
          </div>
        </div>

        <div className="mt-6">
          <Link
            href="/research/methodology"
            className="inline-flex items-center gap-1.5 rounded-md bg-[#185FA5] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1a6dba]"
          >
            Read full methodology
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* Research Projects */}
      <section>
        <h2 className="text-2xl font-bold text-white">Research Projects</h2>
        <p className="mt-2 text-sm text-[#a0a0a0]">
          Deep-dive market analyses using the methodology above.
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {RESEARCH_PROJECTS.map((project) => {
            const Icon = project.icon;
            const inner = (
              <div
                className={`rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-5 transition-colors ${
                  project.href
                    ? "hover:border-[#5ba3e6]/30 hover:bg-[#1f1f1f]"
                    : "opacity-75"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#5ba3e6]/15">
                      <Icon className="h-4.5 w-4.5 text-[#5ba3e6]" />
                    </div>
                    <h3 className="font-semibold text-white">{project.title}</h3>
                  </div>
                  <span
                    className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${project.statusColor}`}
                  >
                    {project.status}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[#a0a0a0]">
                  {project.tagline}
                </p>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  {project.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-md border border-[#2a2a2a] bg-[#0f0f0f] p-2 text-center"
                    >
                      <p className="text-sm font-bold text-white">
                        {stat.value}
                      </p>
                      <p className="text-[10px] text-[#a0a0a0]">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                {project.href && (
                  <div className="mt-4 flex items-center gap-1 text-sm text-[#5ba3e6]">
                    View research <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>
            );

            return project.href ? (
              <Link key={project.slug} href={project.href}>
                {inner}
              </Link>
            ) : (
              <div key={project.slug}>{inner}</div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
