"use client"

import { useEffect } from "react"

// The page repaints as you scroll: whichever [data-tone] section crosses the middle of the
// screen sets the body's tone (light/dark) and accent colour. Sections stay transparent,
// so the colour change is one continuous surface rather than hard edges.
export function Tone() {
  useEffect(() => {
    const body = document.body
    const sections = [...document.querySelectorAll<HTMLElement>("[data-tone]")].filter(
      (el) => el !== body,
    )
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const el = e.target as HTMLElement
          body.dataset.tone = el.dataset.tone
          body.style.setProperty("--accent", el.dataset.accent || "")
        })
      },
      { rootMargin: "-50% 0px -50% 0px" },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])
  return null
}
