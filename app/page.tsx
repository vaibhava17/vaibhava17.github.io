import { Nav } from "@/components/sections/nav"
import { Hero } from "@/components/sections/hero"
import { Experience } from "@/components/sections/experience"
import { Work } from "@/components/sections/work"
import { Skills } from "@/components/sections/skills"
import { Credentials } from "@/components/sections/credentials"
import { Contact } from "@/components/sections/contact"
import { ViewProvider } from "@/components/view/view-context"
import { ViewShell } from "@/components/view/view-shell"
import { profileMarkdown } from "@/lib/markdown"

export default function Portfolio() {
  return (
    <ViewProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        <ViewShell markdown={profileMarkdown()}>
          <main>
            <Hero />
            <Experience />
            <Work />
            <Skills />
            <Credentials />
            <Contact />
          </main>
        </ViewShell>
      </div>
    </ViewProvider>
  )
}
