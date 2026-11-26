import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Nav } from "@/components/sections/nav"
import { ViewProvider } from "@/components/view/view-context"
import { ViewShell } from "@/components/view/view-shell"
import { ShareBar } from "@/components/writing/share-bar"
import { formatDate, getPost, getPosts, TYPE_LABEL } from "@/lib/posts"
import { postMarkdown } from "@/lib/markdown"
import { SITE_URL } from "@/lib/seo"
import { profile } from "@/lib/data"

// Only the posts from generateStaticParams exist (static export). No `dynamicParams = false`:
// it breaks `next dev` under output: "export" in Next 14.
export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug)
  if (!post) return {}
  const url = `/writing/${post.slug}/`
  return {
    title: post.title,
    description: post.summary,
    keywords: post.tags,
    alternates: { canonical: url, types: { "text/markdown": `${url}index.md` } },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      authors: [SITE_URL],
      tags: post.tags,
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: ["/og.png"],
    },
  }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) notFound()
  const url = `${SITE_URL}/writing/${post.slug}/`
  const linkedin = post.linkedin || `${post.title}\n\n${post.summary}`
  const ld = {
    "@context": "https://schema.org",
    "@type": post.type === "case-study" ? "TechArticle" : "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    keywords: post.tags.join(", "),
    url,
    mainEntityOfPage: url,
    image: `${SITE_URL}/og.png`,
    author: {
      "@id": `${SITE_URL}/#person`,
      "@type": "Person",
      name: profile.name,
      url: `${SITE_URL}/`,
    },
  }

  return (
    <ViewProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        <ViewShell markdown={postMarkdown(post)} source={`/writing/${post.slug}/index.md`}>
          <main className="mx-auto max-w-3xl px-6 pb-24 pt-28 md:pt-36">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }}
            />
            <a href="/writing/" className="font-mono text-xs text-graphite hover:text-foreground">
              ← writing
            </a>
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-graphite">
              <span className="text-amber">{TYPE_LABEL[post.type]}</span>
              <span>·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>·</span>
              <span>{post.readingMinutes} min read</span>
            </div>
            <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-graphite">{post.summary}</p>
            <div className="mt-6">
              <ShareBar url={url} linkedin={linkedin} />
            </div>
            <article
              className="post-body mt-10 border-t border-border pt-10"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
            {post.tags.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-border px-2 py-1 font-mono text-xs text-graphite"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-8 border-t border-border pt-8">
              <ShareBar url={url} linkedin={linkedin} />
            </div>
          </main>
        </ViewShell>
      </div>
    </ViewProvider>
  )
}
