"use client"

import { profile, links } from "@/lib/data"

export function Hero() {
  return (
    <section id="top" className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 border-b border-[#1e2029]">
      {/* Background terminal grid cue */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e2029_1px,transparent_1px),linear-gradient(to_bottom,#1e2029_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top status indicator */}
        <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 font-mono text-xs mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>PRODUCTION SYSTEMS READY // AVAILABLE FOR SENIOR AI & FULL-STACK ROLES</span>
        </div>

        {/* Headline block */}
        <div className="space-y-4 max-w-4xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-sans">
            {profile.name}
          </h1>

          <p className="text-lg sm:text-2xl font-mono text-emerald-400 font-medium">
            Senior AI & Full-Stack Systems Engineer
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl pt-2">
            I engineer production SaaS, autonomous AI agents, and local-first developer tooling.
            Focused on deterministic outputs, zero-dependency architectures, and systems that leave the demo to serve real users.
          </p>
        </div>

        {/* Fast system summary badges */}
        <div className="mt-8 flex flex-wrap gap-2.5 font-mono text-xs text-slate-400">
          <span className="px-3 py-1 rounded border border-[#272733] bg-[#12131a]">
            Current: SDE II at Solfin
          </span>
          <span className="px-3 py-1 rounded border border-[#272733] bg-[#12131a]">
            1,500+ Commits in Hortiprise SaaS
          </span>
          <span className="px-3 py-1 rounded border border-[#272733] bg-[#12131a]">
            9 AI Providers via VS Code
          </span>
          <span className="px-3 py-1 rounded border border-[#272733] bg-[#12131a]">
            Gurugram, India
          </span>
        </div>

        {/* Action button row */}
        <div className="mt-10 flex flex-wrap items-center gap-3 font-mono text-xs">
          <a
            href="#systems"
            className="px-4 py-2.5 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold transition-colors flex items-center gap-2"
          >
            <span>Explore Flagship Systems</span>
            <span>&darr;</span>
          </a>
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded border border-[#272733] bg-[#12131a] hover:bg-[#1a1c26] text-slate-200 transition-colors flex items-center gap-2"
          >
            <span>GitHub @vaibhava17</span>
            <span>&nearr;</span>
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded border border-[#272733] bg-[#12131a] hover:bg-[#1a1c26] text-slate-200 transition-colors flex items-center gap-2"
          >
            <span>LinkedIn</span>
            <span>&nearr;</span>
          </a>
          <a
            href="/Vaibhav-Agarwal-Resume.pdf"
            download="Vaibhav-Agarwal-Resume.pdf"
            className="px-4 py-2.5 rounded border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition-colors flex items-center gap-2"
          >
            <span>Download Résumé PDF</span>
            <span>&darr;</span>
          </a>
        </div>
      </div>
    </section>
  )
}
