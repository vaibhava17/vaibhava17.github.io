"use client"

import { Fragment, useState } from "react"
import { Check, Copy } from "lucide-react"

const ENDPOINTS = [
  { href: "/index.md", label: "index.md", type: "text/markdown" },
  { href: "/llms.txt", label: "llms.txt", type: "text/plain" },
  { href: "/profile.json", label: "profile.json", type: "application/json" },
]

// [text](url) and **bold**, kept visible as Markdown but with clickable links
const INLINE = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g

function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split(INLINE).map((part, i) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (link) {
          const external = /^https?:/.test(link[2])
          return (
            <Fragment key={i}>
              <span className="text-graphite">[</span>
              <a
                href={link[2]}
                {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                className="text-foreground underline decoration-amber/60 underline-offset-2 hover:decoration-amber"
              >
                {link[1]}
              </a>
              <span className="text-graphite">]({link[2]})</span>
            </Fragment>
          )
        }
        if (/^\*\*[^*]+\*\*$/.test(part)) {
          return (
            <span key={i} className="font-semibold text-foreground">
              <span className="text-graphite">**</span>
              {part.slice(2, -2)}
              <span className="text-graphite">**</span>
            </span>
          )
        }
        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}

function Line({ line, frontmatter }: { line: string; frontmatter: boolean }) {
  if (frontmatter || line === "---") return <span className="text-graphite">{line}</span>
  const h = line.match(/^(#{1,6}) (.*)$/)
  if (h) {
    return (
      <span className={`font-semibold text-foreground ${h[1].length <= 2 ? "text-base" : ""}`}>
        <span className="text-amber">{h[1]} </span>
        {h[2]}
      </span>
    )
  }
  if (line.startsWith("> ")) {
    return (
      <span className="italic text-graphite">
        <span className="text-amber">&gt; </span>
        <Inline text={line.slice(2)} />
      </span>
    )
  }
  if (line.startsWith("- ")) {
    return (
      <span className="text-foreground/85">
        <span className="text-diff-add">- </span>
        <Inline text={line.slice(2)} />
      </span>
    )
  }
  if (line.startsWith("|")) return <span className="text-foreground/75">{line}</span>
  return (
    <span className="text-foreground/85">
      <Inline text={line} />
    </span>
  )
}

/** The page as an agent reads it: the same facts, as raw Markdown, with the endpoints to fetch it. */
export function MachineView({ markdown }: { markdown: string }) {
  const [copied, setCopied] = useState(false)
  const lines = markdown.replace(/\n+$/, "").split("\n")
  const fmEnd = lines[0] === "---" ? lines.indexOf("---", 1) : -1

  async function copy() {
    try {
      await navigator.clipboard.writeText(markdown)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard blocked: the raw file is one click away */
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-24 sm:px-6 md:pt-28">
      <div className="mb-6 max-w-2xl">
        <p className="font-mono text-xs text-amber">view=machine</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
          The same page, for agents.
        </h1>
        <p className="mt-3 text-sm text-graphite md:text-base">
          Everything on the human page, as plain Markdown. Point an LLM, a recruiter&apos;s agent or
          a crawler at one of these files; they are generated from the same data at build time.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
          <div className="flex min-w-0 items-center gap-2 font-mono text-xs text-graphite">
            <span className="text-diff-add">$</span>
            <span className="truncate">curl -s heyvaibhav.dev/index.md</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {ENDPOINTS.map((e) => (
              <a
                key={e.href}
                href={e.href}
                type={e.type}
                className="rounded border border-border px-2 py-1 font-mono text-xs text-graphite hover:border-foreground/30 hover:text-foreground"
              >
                {e.label}
              </a>
            ))}
            <button
              type="button"
              onClick={copy}
              className="flex items-center gap-1.5 rounded border border-border px-2 py-1 font-mono text-xs text-graphite hover:border-foreground/30 hover:text-foreground"
              aria-label="Copy the Markdown"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? "copied" : "copy"}
            </button>
          </div>
        </div>

        <pre className="overflow-x-auto py-4 font-mono text-[12.5px] leading-6 sm:text-[13px]">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="flex">
                <span
                  aria-hidden
                  className="w-12 shrink-0 select-none pr-4 text-right text-graphite/50 sm:w-14"
                >
                  {i + 1}
                </span>
                <span className="min-w-0 whitespace-pre-wrap break-words pr-4">
                  <Line line={line} frontmatter={fmEnd > 0 && i > 0 && i < fmEnd} />
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </main>
  )
}
