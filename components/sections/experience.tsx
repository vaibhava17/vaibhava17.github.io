import { experience } from "@/lib/data"
import { DiffMetric } from "@/components/diff-metric"

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="text-lg font-semibold">Experience</h2>

      <div className="mt-8 divide-y divide-border border-t border-border">
        {experience.map((job) => (
          <div key={job.company} className="grid gap-4 py-8 md:grid-cols-[13rem_1fr]">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{job.company}</span>
                {job.current && <span className="h-1.5 w-1.5 rounded-full bg-amber" />}
              </div>
              <div className="mt-1 text-sm text-graphite">{job.role}</div>
              <div className="mt-2 font-mono text-xs text-graphite">{job.period}</div>
              <div className="font-mono text-xs text-graphite">{job.location}</div>
            </div>

            <div>
              <ul className="space-y-2.5 text-sm leading-relaxed text-foreground/90">
                {job.highlights.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-graphite" />
                    {line}
                  </li>
                ))}
              </ul>

              {job.metrics && (
                <div className="mt-4 flex flex-col gap-2 border-l-2 border-border pl-4">
                  {job.metrics.map((metric) => (
                    <DiffMetric key={metric.label} {...metric} />
                  ))}
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-graphite">
                {job.tech.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
