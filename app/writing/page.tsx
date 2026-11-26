import type { Metadata } from "next"
import { Nav } from "@/components/sections/nav"
import { ViewProvider } from "@/components/view/view-context"
import { ViewShell } from "@/components/view/view-shell"
import { PostList } from "@/components/writing/post-list"
import { getPosts } from "@/lib/posts"
import { writingIndexMarkdown } from "@/lib/markdown"
import { profile } from "@/lib/data"

export const metadata: Metadata = {
  title: "Writing",
  description: `Blog posts and case studies by ${profile.name}: AI agents, RAG, production systems and what building them taught me.`,
  alternates: { canonical: "/writing/", types: { "text/markdown": "/writing/index.md" } },
}

export default function WritingIndex() {
  const posts = getPosts()
  return (
    <ViewProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        <ViewShell markdown={writingIndexMarkdown()} source="/writing/index.md">
          <main className="mx-auto max-w-4xl px-6 pb-24 pt-28 md:pt-36">
            <p className="font-mono text-xs text-amber">writing</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Writing</h1>
            <p className="mt-4 max-w-xl text-graphite">
              Blog posts and case studies: what I build, how it breaks, and what I learn.
            </p>
            <div className="mt-12">
              {posts.length ? (
                <PostList posts={posts} />
              ) : (
                <p className="text-graphite">Nothing here yet.</p>
              )}
            </div>
          </main>
        </ViewShell>
      </div>
    </ViewProvider>
  )
}
