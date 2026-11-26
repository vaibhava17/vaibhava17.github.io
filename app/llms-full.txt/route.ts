import { profileMarkdown } from "@/lib/markdown"

// Static at build time: /llms-full.txt, the whole profile in one file for AI agents.
export const dynamic = "force-static"

export function GET() {
  return new Response(profileMarkdown(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
