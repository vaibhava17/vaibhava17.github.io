import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { buildResumePdf } from "../lib/resume-pdf.ts"

// Local dev-only preview — the live site generates this in-browser on click
// (see components/resume-button.tsx), nothing here is part of the build/deploy.
async function main() {
  const bytes = await buildResumePdf()
  const outPath = join(process.cwd(), "resume-preview.pdf")
  writeFileSync(outPath, bytes)
  console.log(`preview written to ${outPath}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
