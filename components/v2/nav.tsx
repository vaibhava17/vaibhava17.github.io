"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
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
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Link
          href="/"
          className="pill pill--small"
          style={{
            fontSize: "11px",
            padding: "4px 10px",
            opacity: 0.7,
            textDecoration: "none",
          }}
          title="Return to standard v1.0 portfolio"
        >
          &larr; v1.0
        </Link>
        <a
          href="/Vaibhav-Agarwal-Resume.pdf"
          download="Vaibhav-Agarwal-Resume.pdf"
          className="pill pill--small"
          style={{ textDecoration: "none" }}
        >
          Résumé ↓
        </a>
      </div>
    </header>
  )
}
