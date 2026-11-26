import { profileMarkdown } from "@/lib/markdown"

// Static at build time (output: "export"): served as /index.md, the machine view of the home page.
export const dynamic = "force-static"

export function GET() {
  return new Response(profileMarkdown(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
}
