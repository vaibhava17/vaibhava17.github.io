"use client"

import { useState } from "react"
import { Check, Copy, Linkedin, Link2 } from "lucide-react"

/** "Copy for LinkedIn" copies the complete post (text + link), ready to paste and publish as is. */
export function ShareBar({ url, linkedin }: { url: string; linkedin: string }) {
  const [copied, setCopied] = useState<"" | "linkedin" | "link">("")
  const post = linkedin.includes(url) ? linkedin : `${linkedin}\n\n${url}`

  async function copy(text: string, what: "linkedin" | "link") {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(what)
      setTimeout(() => setCopied(""), 1800)
    } catch {
      /* clipboard blocked: nothing else to do */
    }
  }

  const btn =
    "flex items-center gap-1.5 rounded border border-border px-2.5 py-1.5 font-mono text-xs text-graphite transition-colors hover:border-foreground/30 hover:text-foreground"

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" onClick={() => copy(post, "linkedin")} className={btn}>
        {copied === "linkedin" ? <Check size={13} /> : <Copy size={13} />}
        {copied === "linkedin" ? "copied, paste into LinkedIn" : "Copy for LinkedIn"}
      </button>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
      >
        <Linkedin size={13} />
        Share link
      </a>
      <button type="button" onClick={() => copy(url, "link")} className={btn}>
        {copied === "link" ? <Check size={13} /> : <Link2 size={13} />}
        {copied === "link" ? "copied" : "Copy link"}
      </button>
    </div>
  )
}
