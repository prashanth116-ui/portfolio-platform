"use client";

import { useEffect, useRef, useState } from "react";

export function MermaidDiagram({
  chart,
  id,
}: {
  chart: string;
  id: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          themeVariables: {
            primaryColor: "#185FA5",
            primaryTextColor: "#e6e6e6",
            primaryBorderColor: "#2a2a2a",
            lineColor: "#5ba3e6",
            secondaryColor: "#1a1a1a",
            tertiaryColor: "#262626",
            nodeBorder: "#2a2a2a",
            mainBkg: "#1a1a1a",
            clusterBkg: "#1a1a1a",
            clusterBorder: "#2a2a2a",
            titleColor: "#e6e6e6",
            edgeLabelBackground: "#1a1a1a",
            nodeTextColor: "#e6e6e6",
          },
          flowchart: { curve: "basis" },
          fontFamily: "var(--font-geist-sans), sans-serif",
        });

        const uniqueId = `mermaid-${id}-${Date.now()}`;
        const { svg: rendered } = await mermaid.render(uniqueId, chart);
        if (!cancelled) {
          setSvg(rendered);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to render diagram");
        }
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  if (error) {
    return (
      <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">
        Failed to render diagram: {error}
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="flex h-32 items-center justify-center text-sm text-[#a0a0a0]">
        Loading diagram...
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="overflow-x-auto rounded-lg bg-[#0f0f0f] p-4"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
