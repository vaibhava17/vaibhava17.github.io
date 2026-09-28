import { flagshipProjects, otherProjects } from "@/lib/data"

export function Work() {
  return (
    <section id="work" className="border-t border-border">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-lg font-semibold">Selected work</h2>

        <div className="mt-8 divide-y divide-border border-t border-border">
          {flagshipProjects.map((project) => (
            <div key={project.title} className="grid gap-4 py-8 md:grid-cols-[13rem_1fr]">
              <div>
                <div className="font-mono text-xs text-graphite">{project.category}</div>
                <div className="mt-2 font-mono text-xs text-amber">{project.status}</div>
                <div className="mt-4 flex flex-col gap-1 text-sm">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
                    >
                      Visit
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
                    >
                      Repository
                    </a>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold">{project.title}</h3>
                <p className="mt-1 text-sm text-graphite">{project.tagline}</p>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/90">
                  {project.description}
                </p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-graphite">
                  {project.value}
                </p>

                <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-graphite">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="mt-16 text-sm font-medium text-graphite">More projects</h3>
        <div className="mt-4 divide-y divide-border border-t border-border">
          {otherProjects.map((project) => (
            <a
              key={project.title}
              href={project.liveUrl ?? project.repoUrl ?? "#"}
              target={project.liveUrl || project.repoUrl ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                <span className="text-sm font-medium group-hover:text-amber">{project.title}</span>
                <span className="text-sm text-graphite">{project.tagline}</span>
              </div>
              <span className="font-mono text-xs text-graphite">
                {project.tech.slice(0, 3).join(", ")}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
