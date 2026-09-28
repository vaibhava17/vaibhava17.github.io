"use client"

import { otherProjects } from "@/lib/data"

export function Workbench() {
  return (
    <section id="workbench" className="py-16 sm:py-20 border-b border-[#1e2029]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-10">
          <div>
            <div className="text-xs font-mono text-emerald-400 font-semibold tracking-wider">
              // 03. ENGINEERING WORKBENCH
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 font-sans">
              Specialized Tools & Autonomous Agents
            </h2>
          </div>
          <div className="text-xs font-mono text-slate-400">
            Open-source utilities, computer vision pipelines, and developer tooling.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherProjects.map((p) => {
            const href = p.liveUrl || p.repoUrl
            return (
              <div
                key={p.title}
                className="p-5 rounded-lg border border-[#272733] bg-[#0c0d14] hover:border-slate-600 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400 uppercase tracking-wider">{p.category}</span>
                    <span className="text-emerald-400">{p.status}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-sans">
                    {p.title}
                  </h3>

                  <p className="text-xs font-mono text-slate-300">
                    {p.tagline}
                  </p>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {p.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#1e2029] space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-[#181922] text-[10px] font-mono text-slate-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {href && (
                    <div className="flex items-center justify-end font-mono text-xs">
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                      >
                        <span>{p.liveUrl ? "Live Demo" : "View Repository"}</span>
                        <span>&nearr;</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
