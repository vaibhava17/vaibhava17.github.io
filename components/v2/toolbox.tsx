"use client"

import { skillCategories, education, certifications } from "@/lib/data"

export function Toolbox() {
  return (
    <section id="stack" className="py-16 sm:py-20 border-b border-[#1e2029]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-10">
          <div>
            <div className="text-xs font-mono text-emerald-400 font-semibold tracking-wider">
              // 05. TECHNICAL MATRIX & CREDENTIALS
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 font-sans">
              Stack Architecture & Background
            </h2>
          </div>
          <div className="text-xs font-mono text-slate-400">
            Categorized production proficiency.
          </div>
        </div>

        {/* Skill categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {skillCategories.map((cat) => (
            <div
              key={cat.name}
              className="p-5 rounded-lg border border-[#272733] bg-[#0c0d14] flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                  {cat.name}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((s) => (
                    <span
                      key={s.name}
                      className={`px-2.5 py-1 rounded text-xs font-mono ${
                        s.featured
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium"
                          : "bg-[#181922] text-slate-300 border border-[#272733]"
                      }`}
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education & Certifications Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-[#1e2029]">
          {/* Education */}
          <div className="p-6 rounded-lg border border-[#272733] bg-[#0c0d14] space-y-4">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              // ACADEMIC EDUCATION
            </div>
            <div className="space-y-4">
              {education.map((ed) => (
                <div key={ed.degree} className="space-y-1">
                  <div className="text-sm font-bold text-white font-sans">
                    {ed.degree} in {ed.area}
                  </div>
                  <div className="text-xs text-slate-300 font-sans">
                    {ed.school}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">
                    {ed.period} · {ed.grade}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="p-6 rounded-lg border border-[#272733] bg-[#0c0d14] space-y-4">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              // TECHNICAL CERTIFICATIONS
            </div>
            <div className="space-y-4">
              {certifications.map((c) => (
                <div key={c.title} className="space-y-1">
                  <div className="text-sm font-bold text-white font-sans">
                    {c.title}
                  </div>
                  <div className="text-xs text-slate-300 font-sans">
                    {c.issuer}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">
                    Verified {c.year}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
