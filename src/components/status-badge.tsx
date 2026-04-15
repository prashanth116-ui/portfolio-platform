import { cn } from "@/lib/utils";

type Status =
  | "ACTIVE"
  | "COMPLETE"
  | "IN_PROGRESS"
  | "RESEARCH"
  | "EXPERIMENTAL"
  | "IN_DEVELOPMENT"
  | "DEPRECATED"
  | "ARCHIVED";

const statusConfig: Record<Status, { label: string; bg: string; text: string; dot: string }> = {
  ACTIVE: { label: "Active", bg: "bg-[#EAF3DE]", text: "text-[#27500A]", dot: "bg-green-500" },
  COMPLETE: { label: "Complete", bg: "bg-[#EAF3DE]", text: "text-[#27500A]", dot: "bg-green-500" },
  IN_PROGRESS: { label: "In Progress", bg: "bg-blue-500/10", text: "text-blue-400", dot: "bg-blue-500" },
  IN_DEVELOPMENT: { label: "In Development", bg: "bg-blue-500/10", text: "text-blue-400", dot: "bg-blue-500" },
  RESEARCH: { label: "Research", bg: "bg-[#FAEEDA]", text: "text-[#633806]", dot: "bg-amber-500" },
  EXPERIMENTAL: { label: "Experimental", bg: "bg-[#FAEEDA]", text: "text-[#633806]", dot: "bg-amber-500" },
  DEPRECATED: { label: "Deprecated", bg: "bg-gray-500/10", text: "text-gray-400", dot: "bg-gray-500" },
  ARCHIVED: { label: "Archived", bg: "bg-gray-500/10", text: "text-gray-400", dot: "bg-gray-500" },
};

export function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const config = statusConfig[status as Status] ?? statusConfig.ARCHIVED;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.bg,
        config.text,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />
      {config.label}
    </span>
  );
}
