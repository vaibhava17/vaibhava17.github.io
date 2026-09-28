import { Nav } from "@/components/sections/nav"
import { Hero } from "@/components/sections/hero"
import { Experience } from "@/components/sections/experience"
import { Work } from "@/components/sections/work"
import { Skills } from "@/components/sections/skills"
import { Credentials } from "@/components/sections/credentials"
import { Contact } from "@/components/sections/contact"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Experience />
        <Work />
        <Skills />
        <Credentials />
        <Contact />
      </main>
    </div>
  )
}
