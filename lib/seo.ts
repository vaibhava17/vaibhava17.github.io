import { experience, links, profile, skillCategories } from "@/lib/data"

export const SITE_URL = "https://heyvaibhav.dev"

export const SITE_TITLE = `${profile.name} | AI Lead & Senior Backend Engineer`

export const SITE_DESCRIPTION =
  "Vaibhav Agarwal is an AI Lead and senior backend engineer in Gurugram, India, building autonomous AI agents, local-first RAG, and production SaaS (Nova, Hortiprise, DiffCommit AI)."

export const KEYWORDS = [
  "Vaibhav Agarwal",
  "AI Lead",
  "AI engineer",
  "senior backend engineer",
  "full-stack engineer",
  "autonomous AI agents",
  "RAG",
  "LLM orchestration",
  "FastAPI",
  "Next.js",
  "Python",
  "TypeScript",
  "Hortiprise",
  "DiffCommit AI",
  "Gurugram",
  "Delhi NCR",
]

/** schema.org JSON-LD: who this site is about, for search engines and AI crawlers. */
export function jsonLd() {
  const current = experience.find((e) => e.current)
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: profile.name,
        url: `${SITE_URL}/`,
        image: profile.avatar,
        email: `mailto:${profile.email}`,
        jobTitle: profile.role,
        description: profile.summary,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Gurugram",
          addressRegion: "Haryana",
          addressCountry: "IN",
        },
        ...(current && {
          worksFor: {
            "@type": "Organization",
            name: current.company,
            ...(current.website && { url: current.website }),
          },
        }),
        sameAs: [links.github, links.linkedin],
        knowsAbout: skillCategories.flatMap((c) =>
          c.skills.filter((s) => s.featured).map((s) => s.name),
        ),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: profile.name,
        description: SITE_DESCRIPTION,
        publisher: { "@id": `${SITE_URL}/#person` },
        inLanguage: "en",
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url: `${SITE_URL}/`,
        mainEntity: { "@id": `${SITE_URL}/#person` },
      },
    ],
  }
}
