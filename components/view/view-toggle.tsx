"use client"

import { useView, type View } from "./view-context"

const OPTIONS: { value: View; label: string }[] = [
  { value: "human", label: "Human" },
  { value: "machine", label: "Machine" },
]

export function ViewToggle({ className = "" }: { className?: string }) {
  const { view, setView } = useView()
  return (
    <div
      role="radiogroup"
      aria-label="View this page as"
      className={`flex items-center rounded-full border border-border p-0.5 font-mono text-xs ${className}`}
    >
      {OPTIONS.map((o) => {
        const active = view === o.value
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setView(o.value)}
            className={`rounded-full px-2.5 py-1.5 transition-colors sm:px-3 ${
              active
                ? o.value === "machine"
                  ? "bg-amber text-ink"
                  : "bg-foreground text-background"
                : "text-graphite hover:text-foreground"
            }`}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
