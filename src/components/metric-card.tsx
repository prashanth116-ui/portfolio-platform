export function MetricCard({
  icon: Icon,
  label,
  value,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  value: number | string;
}) {
  return (
    <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-4">
      {Icon ? (
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-[#5ba3e6]" />
          <span className="text-xs text-[#a0a0a0]">{label}</span>
        </div>
      ) : (
        <span className="text-xs text-[#a0a0a0]">{label}</span>
      )}
      <p className="mt-1 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
