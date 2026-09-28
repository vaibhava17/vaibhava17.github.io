import { Tone } from "@/components/site/tone"
import { Nav } from "@/components/site/nav"
import { Hero } from "@/components/site/hero"
import { Statement } from "@/components/site/statement"
import { Impact } from "@/components/site/impact"
import { Work } from "@/components/site/work"
import { More } from "@/components/site/more"
import { Experience } from "@/components/site/experience"
import { Contact } from "@/components/site/contact"

export default function Portfolio() {
  return (
    <>
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
    </>
  )
}
