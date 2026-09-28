import { skillCategories } from "@/lib/data"

function ProficiencyDots({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-sm ${i < level ? "bg-amber" : "bg-border"}`}
        />
      ))}
    </div>
  )
}

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="text-lg font-semibold">Skills</h2>

      <div className="mt-8 divide-y divide-border border-t border-border">
        {skillCategories.map((category) => {
          const featured = category.skills.filter((s) => s.featured)
          const rest = category.skills.filter((s) => !s.featured)

          return (
            <div key={category.name} className="grid gap-4 py-8 md:grid-cols-[13rem_1fr]">
              <div className="text-sm text-graphite">{category.name}</div>

              <div>
                <div className="space-y-3">
                  {featured.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4"
                    >
                      <div className="flex min-w-[16rem] items-center gap-3">
                        <ProficiencyDots level={skill.proficiency} />
                        <span className="text-sm">{skill.name}</span>
                      </div>
                      {skill.context && (
                        <span className="font-mono text-xs text-graphite">{skill.context}</span>
                      )}
                    </div>
                  ))}
                </div>

                {rest.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-graphite">
                    {rest.map((skill) => (
                      <span key={skill.name}>{skill.name}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
