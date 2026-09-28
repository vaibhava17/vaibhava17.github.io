"use client"

import { experience } from "@/lib/data"

export function Experience() {
  return (
    <section id="timeline" className="py-16 sm:py-20 border-b border-[#1e2029]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-10">
          <div>
            <div className="text-xs font-mono text-emerald-400 font-semibold tracking-wider">
              // 04. ENGINEERING TIMELINE & PRODUCTION EXPERIENCE
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 font-sans">
              Track Record of Shipping
            </h2>
          </div>
          <div className="text-xs font-mono text-slate-400">
            Enterprise platforms, AI document pipelines, and scalable backend infrastructure.
          </div>
        </div>

        <div className="space-y-8">
          {experience.map((job) => (
            <div
              key={job.company}
              className="p-6 sm:p-8 rounded-xl border border-[#272733] bg-[#0c0d14] hover:border-slate-600 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#1e2029] pb-4 mb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white font-sans">
                      {job.website ? (
                        <a
                          href={job.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
                        >
                          <span>{job.company}</span>
                          <span className="text-xs text-slate-500">&nearr;</span>
                        </a>
                      ) : (
                        job.company
                      )}
                    </h3>
                    {job.current && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-medium">
                        ACTIVE ROLE
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-mono text-emerald-400 mt-1">
                    {job.role}
                  </div>
                </div>

                <div className="text-xs font-mono text-slate-400 text-left sm:text-right">
                  <div>{job.period}</div>
                  <div className="text-slate-500">{job.location}</div>
                </div>
              </div>

              {/* Highlights */}
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                {job.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-mono mt-1 text-xs">&gt;</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {/* Metrics diff if present */}
              {job.metrics && job.metrics.length > 0 && (
                <div className="mt-5 pt-4 border-t border-[#1e2029] flex flex-wrap gap-4 font-mono text-xs">
                  {job.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="px-3 py-1.5 rounded border border-[#272733] bg-[#12131a] flex items-center gap-2"
                    >
                      <span className="text-rose-400 line-through">{m.from}</span>
                      <span className="text-slate-500">&rarr;</span>
                      <span className="text-emerald-400 font-semibold">{m.to}</span>
                      <span className="text-slate-400 text-[11px]">{m.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech stack */}
              <div className="mt-5 flex flex-wrap gap-1.5">
                {job.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded bg-[#181922] text-[11px] font-mono text-slate-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
