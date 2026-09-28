// Presentation-only data for the site. Facts come from lib/data.ts (the résumé reads that too),
// this file only decides how they are shown.

export type Viz = "hortiprise" | "diffcommit" | "syntra" | "pipeline"

export interface ChapterStyle {
  title: string // matches flagshipProjects[].title
  viz: Viz
  accent: string
  headline: string
}

export const chapters: ChapterStyle[] = [
  {
    title: "Hortiprise",
    viz: "hortiprise",
    accent: "#30d158",
    headline: "From pen and paper to production.",
  },
  {
    title: "DiffCommit AI",
    viz: "diffcommit",
    accent: "#0a84ff",
    headline: "The diff writes its own message.",
  },
  {
    title: "Syntra",
    viz: "syntra",
    accent: "#bf5af2",
    headline: "Re-read only what changed.",
  },
  {
    title: "AI Investment Pipeline",
    viz: "pipeline",
    accent: "#ff9f0a",
    headline: "Same input. Same verdict. Every time.",
  },
]

export interface Stat {
  value: number
  prefix?: string
  suffix?: string
  label: string
  was?: string
  where: string
}

// Every number here is stated in lib/data.ts.
export const stats: Stat[] = [
  { value: 90, suffix: "%", label: "bill extraction accuracy", was: "70%", where: "Solfin" },
  { value: 7, suffix: "s", label: "average LLM response", was: "20s", where: "Solfin" },
  {
    value: 10,
    suffix: "k",
    label: "LLM calls a week at peak, under 1% failing",
    where: "Solfin",
  },
  { value: 9, label: "AI providers behind one commit button", where: "DiffCommit AI" },
  { value: 90, suffix: "%+", label: "less re-indexing on a busy branch", where: "Syntra" },
  { value: 1500, suffix: "+", label: "commits into one production SaaS", where: "Hortiprise" },
]
