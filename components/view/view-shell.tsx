"use client"

import { useView } from "./view-context"
import { MachineView } from "./machine-view"

/** Renders the human page (children) or its Markdown twin. Both come from lib/data.ts. */
export function ViewShell({
  markdown,
  source,
  children,
}: {
  markdown: string
  source?: string // the .md path an agent can fetch for this page
  children: React.ReactNode
}) {
  const { view } = useView()
  return view === "machine" ? <MachineView markdown={markdown} source={source} /> : <>{children}</>
}
