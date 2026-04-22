"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import type { ReportSections } from "@/lib/vedic/types";

interface ReportViewProps {
  sections: ReportSections;
}

const TAB_CONFIG = [
  { key: "overview", label: "Overview" },
  { key: "planets", label: "Planets" },
  { key: "houses", label: "Houses" },
  { key: "dashas", label: "Dashas" },
  { key: "nakshatras", label: "Nakshatras" },
  { key: "yogas", label: "Yogas" },
  { key: "predictions", label: "Predictions" },
  { key: "home_context", label: "Your Question" },
  { key: "remedies", label: "Remedies" },
] as const;

export default function ReportView({ sections }: ReportViewProps) {
  // Filter out tabs that don't have content
  const activeTabs = TAB_CONFIG.filter(
    (tab) => sections[tab.key as keyof ReportSections]
  );

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="flex flex-wrap gap-1">
        {activeTabs.map((tab) => (
          <TabsTrigger key={tab.key} value={tab.key}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {activeTabs.map((tab) => {
        const content = sections[tab.key as keyof ReportSections];
        if (!content) return null;

        return (
          <TabsContent key={tab.key} value={tab.key}>
            <Card>
              <CardContent className="pt-6">
                <div
                  className="prose prose-invert max-w-none text-[#e6e6e6] prose-headings:text-white prose-strong:text-white prose-li:text-[#e6e6e6] [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-lg [&_h3]:font-semibold [&_li]:my-0.5 [&_p]:my-2 [&_ul]:my-2"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </CardContent>
            </Card>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
