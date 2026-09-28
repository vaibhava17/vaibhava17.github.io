import type { Metadata } from "next"
import "@/components/v2/apple.css"
import { Tone } from "@/components/v2/tone"
import { Nav } from "@/components/v2/nav"
import { Hero } from "@/components/v2/hero"
import { Statement } from "@/components/v2/statement"
import { Impact } from "@/components/v2/impact"
import { Work } from "@/components/v2/work"
import { More } from "@/components/v2/more"
import { Experience } from "@/components/v2/experience"
import { Contact } from "@/components/v2/contact"

export const metadata: Metadata = {
  title: "Vaibhav Agarwal | Software Engineer",
  description:
    "Vaibhav Agarwal builds production SaaS, AI agents and developer tools. SDE II at Solfin, builder of Hortiprise.",
}

export default function V2Portfolio() {
  return (
    <div data-v2 data-tone="light" className="v2-page">
      <Tone />
      <Nav />
      <main>
        <Hero />
        <Statement />
        <Impact />
        <Work />
        <More />
        <Experience />
        <Contact />
      </main>
    </div>
  )
}
