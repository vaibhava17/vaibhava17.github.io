import type { Metadata } from "next"
import "@/components/v2/diagrams.css"
import { Nav } from "@/components/v2/nav"
import { Hero } from "@/components/v2/hero"
import { Telemetry } from "@/components/v2/telemetry"
import { Systems } from "@/components/v2/systems"
import { Workbench } from "@/components/v2/workbench"
import { Experience } from "@/components/v2/experience"
import { Toolbox } from "@/components/v2/toolbox"
import { Contact } from "@/components/v2/contact"

export const metadata: Metadata = {
  title: "Vaibhav Agarwal // Systems & AI Engineer (v2.0)",
  description:
    "Senior Full-Stack & AI Systems Engineer portfolio preview (v2.0). Flagship architectures, live pipeline visualizers, and measured production impact.",
}

export default function V2Portfolio() {
  return (
    <div className="min-h-screen bg-[#07080c] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-300">
      <Nav />
      <main>
        <Hero />
        <Telemetry />
        <Systems />
        <Workbench />
        <Experience />
        <Toolbox />
        <Contact />
      </main>
    </div>
  )
}
