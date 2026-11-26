// Writing: blog posts and case studies, one Markdown file each in content/posts/<slug>.md.
// Optional <slug>.linkedin.txt next to it = the ready-to-paste LinkedIn post ("Copy for LinkedIn").
// Read at build time only (output: "export").

import fs from "node:fs"
import path from "node:path"
import { Marked } from "marked"

// Posts are published without review (Portfolio Keeper), so raw HTML in a post is shown as text, never run.
const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
const SAFE_URL = /^(https?:|mailto:|\/|#)/i
const marked = new Marked({
  walkTokens(token) {
    // only http(s), mailto and site-relative links/images
    if ((token.type === "link" || token.type === "image") && !SAFE_URL.test(token.href))
      token.href = "#"
  },
  renderer: { html: ({ text }: { text: string }) => escapeHtml(text) },
})

export type PostType = "blog" | "case-study"

export interface PostMeta {
  slug: string
  title: string
  date: string // YYYY-MM-DD
  type: PostType
  tags: string[]
  summary: string
}

export interface Post extends PostMeta {
  markdown: string // body, without front matter
  html: string
  linkedin: string // complete LinkedIn post, ready to paste ("" = generated from the summary)
  readingMinutes: number
}

const DIR = path.join(process.cwd(), "content", "posts")
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

/** Minimal front matter: `key: value` lines, `tags: [a, b]`. No YAML dependency needed for this shape. */
function parse(raw: string, slug: string): { meta: PostMeta; body: string } {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!m) throw new Error(`content/posts/${slug}.md: missing front matter`)
  const fm: Record<string, string> = {}
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*(.*)$/)
    if (kv) fm[kv[1]] = kv[2].trim().replace(/^"(.*)"$/, "$1")
  }
  for (const k of ["title", "date", "type", "summary"]) {
    if (!fm[k]) throw new Error(`content/posts/${slug}.md: front matter needs "${k}"`)
  }
  if (fm.type !== "blog" && fm.type !== "case-study") {
    throw new Error(`content/posts/${slug}.md: type must be blog or case-study`)
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fm.date))
    throw new Error(`content/posts/${slug}.md: date must be YYYY-MM-DD`)
  const tags = (fm.tags || "")
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
  return {
    meta: { slug, title: fm.title, date: fm.date, type: fm.type, tags, summary: fm.summary },
    body: m[2].trim() + "\n",
  }
}

let cache: Post[] | null = null

/** All posts, newest first. */
export function getPosts(): Post[] {
  if (cache) return cache
  if (!fs.existsSync(DIR)) return (cache = [])
  cache = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const slug = f.slice(0, -3)
      if (!SLUG.test(slug))
        throw new Error(`content/posts/${f}: file name must be a lowercase-hyphen slug`)
      const { meta, body } = parse(fs.readFileSync(path.join(DIR, f), "utf8"), slug)
      const li = path.join(DIR, `${slug}.linkedin.txt`)
      return {
        ...meta,
        markdown: body,
        html: marked.parse(body, { async: false }) as string,
        linkedin: fs.existsSync(li) ? fs.readFileSync(li, "utf8").trim() : "",
        readingMinutes: Math.max(1, Math.round(body.split(/\s+/).length / 220)),
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)))
  return cache
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug)
}

export const TYPE_LABEL: Record<PostType, string> = { blog: "Blog", "case-study": "Case study" }

export function formatDate(d: string) {
  return new Date(`${d}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
}
