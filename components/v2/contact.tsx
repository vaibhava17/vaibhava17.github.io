"use client"

import Link from "next/link"
import { profile, links } from "@/lib/data"

export function Contact() {
  return (
    <footer id="contact" className="py-16 sm:py-20 bg-[#08090e]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-10">
          <div>
            <div className="text-xs font-mono text-emerald-400 font-semibold tracking-wider">
              // 06. CONTACT & COMMUNICATION
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 font-sans">
              Let&apos;s Build Production Systems
            </h2>
          </div>
          <div className="text-xs font-mono text-slate-400">
            Open to Senior AI / Full-Stack Engineer roles, consulting, and architectural collaborations.
          </div>
        </div>

        {/* Developer terminal contact panel */}
        <div className="p-6 sm:p-8 rounded-xl border border-[#272733] bg-[#0c0d14] space-y-6">
          <div className="flex items-center justify-between border-b border-[#1e2029] pb-4 text-xs font-mono text-slate-400">
            <span className="text-slate-300 font-semibold">$ connect --channel=direct</span>
            <span className="text-emerald-400">STATUS: ACCEPTING_INQUIRIES</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 rounded-lg bg-[#12131a] border border-[#1e2029] space-y-1">
              <div className="text-slate-400 text-[11px]">EMAIL DIRECT</div>
              <a
                href={`mailto:${links.email}`}
                className="text-emerald-400 hover:text-emerald-300 font-semibold break-all"
              >
                {links.email}
              </a>
            </div>

            <div className="p-4 rounded-lg bg-[#12131a] border border-[#1e2029] space-y-1">
              <div className="text-slate-400 text-[11px]">LINKEDIN PROFILE</div>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-200 hover:text-emerald-400 flex items-center justify-between"
              >
                <span>in/vaibhava17</span>
                <span>&nearr;</span>
              </a>
            </div>

            <div className="p-4 rounded-lg bg-[#12131a] border border-[#1e2029] space-y-1">
              <div className="text-slate-400 text-[11px]">GITHUB REPOSITORIES</div>
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-200 hover:text-emerald-400 flex items-center justify-between"
              >
                <span>github.com/vaibhava17</span>
                <span>&nearr;</span>
              </a>
            </div>

            <div className="p-4 rounded-lg bg-[#12131a] border border-[#1e2029] space-y-1">
              <div className="text-slate-400 text-[11px]">CURRICULUM VITAE</div>
              <a
                href="/Vaibhav-Agarwal-Resume.pdf"
                download="Vaibhav-Agarwal-Resume.pdf"
                className="text-emerald-400 hover:text-emerald-300 flex items-center justify-between font-semibold"
              >
                <span>Download PDF</span>
                <span>&darr;</span>
              </a>
            </div>
          </div>
        </div>

        {/* Clean copyright and navigation bar */}
        <div className="mt-12 pt-6 border-t border-[#1e2029] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} {profile.name} · Gurugram, India. All systems operational.
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <span>&larr; Switch to standard v1.0 portfolio</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
