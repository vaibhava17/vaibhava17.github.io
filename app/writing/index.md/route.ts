import { writingIndexMarkdown } from "@/lib/markdown"

// Static at build time: /writing/index.md, the machine view of /writing/.
export const dynamic = "force-static"

export function GET() {
  return new Response(writingIndexMarkdown(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
}
