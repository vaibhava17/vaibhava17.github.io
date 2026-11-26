// Machine view of the site: the same facts as the human page (lib/data.ts), rendered as Markdown.
// Served as /index.md, /llms.txt, /llms-full.txt and shown in the "Machine" view (?view=machine).
// Edit lib/data.ts, never these outputs.

import {
  certifications,
  community,
  education,
  experience,
  flagshipProjects,
  links,
  otherProjects,
  profile,
  skillCategories,
  type Project,
} from "@/lib/data"
import { SITE_URL } from "@/lib/seo"
import { getPosts, TYPE_LABEL, type Post } from "@/lib/posts"

const projectLinks = (p: Project) =>
  [p.liveUrl && `[live](${p.liveUrl})`, p.repoUrl && `[code](${p.repoUrl})`]
    .filter(Boolean)
    .join(" · ")

function project(p: Project, level = "###") {
  const out = [`${level} ${p.title}`, "", `> ${p.tagline}`, ""]
  out.push(`- **Status:** ${p.status}`, `- **Category:** ${p.category}`)
  const l = projectLinks(p)
  if (l) out.push(`- **Links:** ${l}`)
  out.push(`- **Stack:** ${p.tech.join(", ")}`, "", p.description)
  if (p.value) out.push("", `**Why it matters:** ${p.value}`)
  return out.join("\n")
}

/** The whole profile as one Markdown document (/index.md, /llms-full.txt, machine view). */
export function profileMarkdown(): string {
  const s: string[] = []
  s.push(
    "---",
    `title: ${profile.name} | ${profile.role}`,
    `url: ${SITE_URL}/`,
    `location: ${profile.location}`,
    `email: ${profile.email}`,
    `open_to: ${profile.openTo}`,
    "---",
    "",
    `# ${profile.name}`,
    "",
    `**${profile.headline}.**`,
    "",
    profile.summary,
    "",
    `- **Role:** ${profile.role}`,
    `- **Location:** ${profile.location}`,
    `- **Open to:** ${profile.openTo}`,
    `- **Core stack:** ${profile.stack.join(", ")}`,
    `- **Contact:** [${profile.email}](mailto:${profile.email}) · [GitHub](${links.github}) · [LinkedIn](${links.linkedin})`,
    `- **Resume (PDF):** ${SITE_URL}/Vaibhav-Agarwal-Resume.pdf`,
    "",
    "## Experience",
    "",
  )
  for (const e of experience) {
    s.push(
      `### ${e.role}, ${e.company}`,
      "",
      `*${e.period} · ${e.location}*` +
        (e.website ? ` · [${e.website.replace(/^https?:\/\//, "")}](${e.website})` : ""),
      "",
    )
    for (const h of e.highlights) s.push(`- ${h}`)
    if (e.metrics?.length) {
      s.push("", "| Metric | Before | After |", "| --- | --- | --- |")
      for (const m of e.metrics) s.push(`| ${m.label} | ${m.from} | ${m.to} |`)
    }
    s.push("", `**Stack:** ${e.tech.join(", ")}`, "")
  }
  s.push("## Flagship projects", "")
  for (const p of flagshipProjects) s.push(project(p), "")
  s.push("## Other projects", "")
  for (const p of otherProjects) {
    const l = projectLinks(p)
    s.push(
      `- **${p.title}**: ${p.tagline}. ${p.description} *(${p.tech.join(", ")}${l ? "; " + l : ""})*`,
    )
  }
  s.push("", "## Skills", "")
  for (const c of skillCategories) {
    s.push(`### ${c.name}`, "")
    for (const k of c.skills) s.push(`- ${k.name}${k.context ? ` (${k.context})` : ""}`)
    s.push("")
  }
  s.push("## Education", "")
  for (const e of education)
    s.push(
      `- **${e.degree}, ${e.area}**, ${e.school} (${e.period}), ${e.grade}${e.notes ? `. ${e.notes}` : ""}`,
    )
  s.push("", "## Certifications", "")
  for (const c of certifications) s.push(`- ${c.title}, ${c.issuer} (${c.year})`)
  s.push("", "## Community", "")
  for (const c of community) s.push(`- **${c.role}**, ${c.organization} (${c.period}). ${c.notes}`)
  const posts = getPosts()
  if (posts.length) {
    s.push("", "## Writing", "")
    for (const p of posts)
      s.push(
        `- [${p.title}](${SITE_URL}/writing/${p.slug}/) (${TYPE_LABEL[p.type]}, ${p.date}): ${p.summary}`,
      )
  }
  s.push(
    "",
    "## Machine-readable versions",
    "",
    `- Markdown: ${SITE_URL}/index.md`,
    `- JSON: ${SITE_URL}/profile.json`,
    `- LLM index: ${SITE_URL}/llms.txt`,
    "",
  )
  return s.join("\n")
}

/** llms.txt (https://llmstxt.org): a short index pointing agents at the full documents. */
export function llmsTxt(): string {
  const s = [
    `# ${profile.name}`,
    "",
    `> ${profile.headline}. Based in ${profile.location}. Open to: ${profile.openTo}.`,
    "",
    profile.summary,
    "",
    "## Profile",
    "",
    `- [Full profile (Markdown)](${SITE_URL}/index.md): experience, projects, skills, education`,
    `- [Full profile (JSON)](${SITE_URL}/profile.json): the same facts as structured data`,
    `- [Resume (PDF)](${SITE_URL}/Vaibhav-Agarwal-Resume.pdf)`,
    "",
    "## Projects",
    "",
    ...flagshipProjects.map(
      (p) => `- [${p.title}](${p.liveUrl || p.repoUrl || `${SITE_URL}/#work`}): ${p.tagline}`,
    ),
    "",
    ...(getPosts().length
      ? [
          "## Writing",
          "",
          ...getPosts().map(
            (p) => `- [${p.title}](${SITE_URL}/writing/${p.slug}/index.md): ${p.summary}`,
          ),
          "",
        ]
      : []),
    "## Contact",
    "",
    `- [Email](mailto:${profile.email})`,
    `- [GitHub](${links.github})`,
    `- [LinkedIn](${links.linkedin})`,
    "",
    "## Optional",
    "",
    `- [Everything in one file](${SITE_URL}/llms-full.txt)`,
    "",
  ]
  return s.join("\n")
}

/** One post as a standalone Markdown document (/writing/<slug>/index.md and its machine view). */
export function postMarkdown(p: Post): string {
  return [
    "---",
    `title: ${p.title}`,
    `date: ${p.date}`,
    `type: ${p.type}`,
    `tags: [${p.tags.join(", ")}]`,
    `author: ${profile.name}`,
    `url: ${SITE_URL}/writing/${p.slug}/`,
    "---",
    "",
    `# ${p.title}`,
    "",
    `> ${p.summary}`,
    "",
    p.markdown.trim(),
    "",
  ].join("\n")
}

/** /writing/ as Markdown. */
export function writingIndexMarkdown(): string {
  const s = [`# Writing by ${profile.name}`, "", "Blog posts and case studies.", ""]
  for (const p of getPosts()) {
    s.push(
      `## [${p.title}](${SITE_URL}/writing/${p.slug}/)`,
      "",
      `*${TYPE_LABEL[p.type]} · ${p.date} · ${p.readingMinutes} min*`,
      "",
      p.summary,
      "",
      `Markdown: ${SITE_URL}/writing/${p.slug}/index.md`,
      "",
    )
  }
  return s.join("\n")
}

/** /llms-full.txt: the profile plus every post in full. */
export function llmsFullTxt(): string {
  return [profileMarkdown(), ...getPosts().map(postMarkdown)].join("\n\n")
}
