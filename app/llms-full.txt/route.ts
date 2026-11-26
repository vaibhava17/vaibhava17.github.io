import { llmsFullTxt } from "@/lib/markdown"

// Static at build time: /llms-full.txt, the whole profile plus every post in one file for AI agents.
export const dynamic = "force-static"

export function GET() {
  return new Response(llmsFullTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
