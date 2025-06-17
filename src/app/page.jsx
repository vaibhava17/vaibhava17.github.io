// src/app/page.jsx
import Navigation from "../components/Navigation";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Experience from "../components/sections/Experience";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Contact from "../components/sections/Contact";
// import Analytics from "../components/Analytics";
import { StructuredData } from "../components/StructuredData";
import content from "../data/content.json";

export default function Home() {
  return (
    <>
      <StructuredData content={content} />
      {/* <Analytics /> */}
      <main className="relative">
        <Navigation />
        <Hero content={content} />
        <About content={content} />
        <Experience content={content} />
        <Skills content={content} />
        <Projects content={content} />
        <Contact content={content} />

        {/* Footer */}
        <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <span className="text-2xl font-bold gradient-text mr-3">
                  VA
                </span>
                <span className="text-muted-foreground">
                  {content.personal.name}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-muted-foreground">
                <span>Made with</span>
                <span className="text-red-500">❤️</span>
                <span>using Next.js & Tailwind CSS</span>
              </div>

              <div className="flex space-x-4 mt-4 md:mt-0">
                <a
                  href={content.personal.social.github}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  href={content.personal.social.linkedin}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href={content.personal.social.twitter}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-border text-center">
              <p className="text-muted-foreground">
                © 2025 {content.personal.name}. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
