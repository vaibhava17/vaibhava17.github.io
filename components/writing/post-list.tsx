import { formatDate, TYPE_LABEL, type Post } from "@/lib/posts"

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="divide-y divide-border border-t border-border">
      {posts.map((p) => (
        <a
          key={p.slug}
          href={`/writing/${p.slug}/`}
          className="group grid gap-2 py-6 md:grid-cols-[13rem_1fr]"
        >
          <div className="font-mono text-xs text-graphite">
            <div>{formatDate(p.date)}</div>
            <div className="mt-1 text-amber">{TYPE_LABEL[p.type]}</div>
          </div>
          <div>
            <h3 className="text-base font-semibold group-hover:underline group-hover:decoration-amber group-hover:underline-offset-4">
              {p.title}
            </h3>
            <p className="mt-2 text-sm text-graphite">{p.summary}</p>
            <div className="mt-3 font-mono text-xs text-graphite">{p.readingMinutes} min read</div>
          </div>
        </a>
      ))}
    </div>
  )
}
