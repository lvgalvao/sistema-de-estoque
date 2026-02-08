export default function MetricCard({ label, value }) {
  return (
    <div className="bg-white border-l-4 border-navy-blue rounded-lg px-5 py-4 shadow-sm">
      <p className="text-navy-mid text-xs font-semibold uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-navy-dark text-2xl font-bold">{value}</p>
    </div>
  );
}
