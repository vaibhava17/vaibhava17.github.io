import { llmsTxt } from "@/lib/markdown"

// Static at build time: /llms.txt (https://llmstxt.org), the index for AI agents.
export const dynamic = "force-static"

export function GET() {
  return new Response(llmsTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}
