"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

const NAV_LINKS = [
  { id: "telemetry", label: "01.TELEMETRY" },
  { id: "systems", label: "02.SYSTEMS" },
  { id: "workbench", label: "03.WORKBENCH" },
  { id: "timeline", label: "04.TIMELINE" },
  { id: "stack", label: "05.STACK" },
  { id: "contact", label: "06.CONTACT" },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 font-mono ${
        scrolled
          ? "bg-[#090a0f]/90 backdrop-blur-md border-b border-[#272733] shadow-lg shadow-black/40 py-2.5"
          : "bg-transparent border-b border-[#1e2029] py-3.5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <a href="#top" className="text-xs sm:text-sm font-semibold text-slate-100 tracking-tight flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>vaibhava17</span>
            <span className="text-slate-500 font-normal">/ v2.0-preview</span>
          </a>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6 text-xs text-slate-400 font-mono">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="hover:text-emerald-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right action controls */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          <Link
            href="/"
            className="px-2.5 py-1 rounded border border-slate-700 bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:border-slate-500 transition-colors hidden sm:inline-flex items-center gap-1"
            title="Return to standard v1.0 portfolio"
          >
            <span>&larr;</span> v1.0
          </Link>
          <a
            href="/Vaibhav-Agarwal-Resume.pdf"
            download="Vaibhav-Agarwal-Resume.pdf"
            className="px-3 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <span>RESUME.PDF</span>
            <span className="text-[10px]">&darr;</span>
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-slate-200"
            aria-label="Toggle menu"
          >
            <span className="text-sm font-mono">{mobileOpen ? "[X]" : "[=]"}</span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#272733] bg-[#0c0d14] px-4 py-4 space-y-3 font-mono text-xs">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMobileOpen(false)}
              className="block text-slate-300 hover:text-emerald-400 py-1"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-[#1e2029]">
            <Link
              href="/"
              className="inline-block text-slate-400 hover:text-slate-200 py-1"
            >
              &larr; Switch to standard v1.0 view
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
