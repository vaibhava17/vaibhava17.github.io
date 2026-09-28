"use client"

import { useEffect } from "react"

export function Tone() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-v2]")
    if (!root) return
    const sections = [...document.querySelectorAll<HTMLElement>("[data-v2] [data-tone]")].filter(
      (el) => el !== root,
    )
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const el = e.target as HTMLElement
          root.dataset.tone = el.dataset.tone
          root.style.setProperty("--accent", el.dataset.accent || "")
        })
      },
      { rootMargin: "-50% 0px -50% 0px" },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])
  return null
}
