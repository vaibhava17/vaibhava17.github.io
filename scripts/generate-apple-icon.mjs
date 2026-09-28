// One-off generator for app/apple-icon.png — rasterizes app/icon.svg (the same
// mark used for the favicon) at 180x180 for iOS home-screen icons. Not part of
// the build; app/apple-icon.png is a static file Next serves as-is.
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import React from "react"
import { ImageResponse } from "next/og.js"

async function main() {
  const svg = readFileSync(join(process.cwd(), "app/icon.svg"), "utf8")
  const dataUri = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`

  const response = new ImageResponse(
    React.createElement("img", { src: dataUri, width: 180, height: 180 }),
    { width: 180, height: 180 },
  )

  const buf = Buffer.from(await response.arrayBuffer())
  writeFileSync(join(process.cwd(), "app/apple-icon.png"), buf)
  console.log("wrote app/apple-icon.png")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
