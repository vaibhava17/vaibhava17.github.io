import { getPost, getPosts } from "@/lib/posts"
import { postMarkdown } from "@/lib/markdown"

// Static at build time: /writing/<slug>/index.md, one post as Markdown.
export const dynamic = "force-static"

// Only the posts from generateStaticParams exist (static export). No `dynamicParams = false`:
// it breaks `next dev` under output: "export" in Next 14.
export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }))
}

export function GET(_req: Request, { params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) return new Response("Not found", { status: 404 })
  return new Response(postMarkdown(post), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
}
