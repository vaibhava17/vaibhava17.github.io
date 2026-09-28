import { profile, links } from "@/lib/data"
import { ResumeButton } from "@/components/resume-button"

const rows = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "LinkedIn", value: "linkedin.com/in/vaibhava17", href: links.linkedin },
  { label: "GitHub", value: "github.com/vaibhava17", href: links.github },
  { label: "Hortiprise", value: "hortiprise.com", href: links.hortiprise },
  { label: "DiffCommit AI", value: "VS Marketplace", href: links.diffcommit },
]

export function Contact() {
  return (
    <section id="contact" className="border-t border-border">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-lg font-semibold">Get in touch</h2>
        <p className="mt-3 max-w-md text-sm text-graphite">
          {profile.openTo}. {profile.location}.
        </p>

        <div className="mt-8 divide-y divide-border border-t border-border">
          {rows.map((row) => (
            <a
              key={row.label}
              href={row.href}
              target={row.href.startsWith("http") ? "_blank" : undefined}
              rel={row.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-center justify-between py-3.5 text-sm"
            >
              <span className="text-graphite">{row.label}</span>
              <span className="group-hover:text-amber">{row.value}</span>
            </a>
          ))}
          <ResumeButton className="group flex w-full items-center justify-between py-3.5 text-left text-sm">
            <span className="text-graphite">Resume</span>
            <span className="group-hover:text-amber">Download PDF</span>
          </ResumeButton>
        </div>
      </div>

      <div className="mx-auto flex max-w-4xl flex-col items-start justify-between gap-2 px-6 pb-10 text-xs text-graphite sm:flex-row sm:items-center">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span className="font-mono">Statically exported, deployed via GitHub Actions</span>
      </div>
    </section>
  )
}
