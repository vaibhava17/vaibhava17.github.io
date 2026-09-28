import type { Metric } from "@/lib/data"

export function DiffMetric({ label, from, to }: Metric) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 font-mono text-sm">
      <span className="text-graphite">{label}</span>
      <span className="text-diff-remove line-through decoration-1">- {from}</span>
      <span className="text-diff-add">+ {to}</span>
    </div>
  )
}
