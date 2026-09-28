import { education, certifications, community } from "@/lib/data"

export function Credentials() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto grid max-w-4xl gap-12 px-6 py-16 md:grid-cols-3">
        <div>
          <h2 className="text-sm font-medium text-graphite">Education</h2>
          <div className="mt-6 space-y-6">
            {education.map((item) => (
              <div key={item.school}>
                <div className="text-sm font-medium">
                  {item.degree}, {item.area}
                </div>
                <div className="mt-1 text-sm text-graphite">{item.school}</div>
                <div className="mt-1 font-mono text-xs text-graphite">
                  {item.period} · {item.grade}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-graphite">Certifications</h2>
          <div className="mt-6 space-y-6">
            {certifications.map((item) => (
              <div key={item.title}>
                <div className="text-sm font-medium">{item.title}</div>
                <div className="mt-1 font-mono text-xs text-graphite">
                  {item.issuer} · {item.year}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-graphite">Beyond the code</h2>
          <div className="mt-6 space-y-6">
            {community.map((item) => (
              <div key={item.organization}>
                <div className="text-sm font-medium">{item.organization}</div>
                <div className="mt-1 text-sm text-graphite">{item.role}</div>
                <div className="mt-1 font-mono text-xs text-graphite">{item.period}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
