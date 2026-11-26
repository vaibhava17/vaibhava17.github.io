"use client"

import { useView } from "./view-context"
import { MachineView } from "./machine-view"

/** Renders the human page (children) or its Markdown twin. Both come from lib/data.ts. */
export function ViewShell({ markdown, children }: { markdown: string; children: React.ReactNode }) {
  const { view } = useView()
  return view === "machine" ? <MachineView markdown={markdown} /> : <>{children}</>
}
