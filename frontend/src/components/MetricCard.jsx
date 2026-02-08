export default function MetricCard({ label, value }) {
  return (
    <div className="bg-surface border border-border rounded-md p-3">
      <p className="text-[11px] font-medium text-muted uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-foreground text-lg font-semibold tabular-nums">{value}</p>
    </div>
  );
}
