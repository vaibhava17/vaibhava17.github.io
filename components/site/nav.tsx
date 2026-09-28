"use client"

import { useEffect, useState } from "react"
import { ResumeButton } from "@/components/resume-button"
import { cx } from "./motion"

const LINKS = [
  ["Impact", "#impact"],
  ["Work", "#work"],
  ["Experience", "#experience"],
  ["Contact", "#contact"],
]

export function Nav() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Out of the way while reading down, back as soon as you scroll up.
  useEffect(() => {
    let last = 0
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      if (Math.abs(y - last) > 8) {
        setHidden(y > last && y > 400)
        last = y
      }
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className={cx("nav", scrolled && "is-scrolled", hidden && "is-hidden")}>
      <a href="#top" className="nav__name">
        Vaibhav Agarwal
      </a>
      <nav className="nav__links" aria-label="Sections">
        {LINKS.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <ResumeButton className="pill pill--small">Résumé</ResumeButton>
    </header>
  )
}
