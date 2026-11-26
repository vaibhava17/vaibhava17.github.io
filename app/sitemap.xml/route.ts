import { SITE_URL } from "@/lib/seo"

// Static at build time: /sitemap.xml. A route handler, not app/sitemap.ts: Next 14's metadata sitemap
// needs generateStaticParams under output: "export".
export const dynamic = "force-static"

const PAGES = [
  { path: "/", priority: "1.0" },
  { path: "/index.md", priority: "0.5" },
  { path: "/llms.txt", priority: "0.5" },
  { path: "/profile.json", priority: "0.3" },
]

export function GET() {
  const lastmod = new Date().toISOString().slice(0, 10)
  const urls = PAGES.map(
    (p) =>
      `  <url><loc>${SITE_URL}${p.path}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>${p.priority}</priority></url>`,
  ).join("\n")
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  )
}
