import { getPosts } from "@/lib/posts"
import { PostList } from "@/components/writing/post-list"

/** Home page: the latest posts. */
export function Writing() {
  const posts = getPosts().slice(0, 3)
  if (!posts.length) return null
  return (
    <section id="writing" className="border-t border-border">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold">Writing</h2>
          <a href="/writing/" className="font-mono text-xs text-graphite hover:text-foreground">
            all posts →
          </a>
        </div>
        <div className="mt-8">
          <PostList posts={posts} />
        </div>
      </div>
    </section>
  )
}
