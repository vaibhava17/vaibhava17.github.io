"use client"

import { useState } from "react"

const FILENAME = "Vaibhav-Agarwal-Resume.pdf"

export function ResumeButton({
  className,
  children,
  onClick,
}: {
  className?: string
  children: React.ReactNode
  onClick?: () => void
}) {
  const [busy, setBusy] = useState(false)

  async function handleClick() {
    if (busy) return
    onClick?.()
    setBusy(true)
    try {
      const { buildResumePdf } = await import("@/lib/resume-pdf")
      const bytes = await buildResumePdf()
      const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = FILENAME
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
    } finally {
      setBusy(false)
    }
  }

  return (
    <button type="button" onClick={handleClick} disabled={busy} className={className}>
      {busy ? "Preparing…" : children}
    </button>
  )
}
