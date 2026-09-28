"use client"

interface Metric {
  num: string
  label: string
  diff?: string
  diffType?: "add" | "del" | "neutral"
  context: string
  detail: string
}

const METRICS: Metric[] = [
  {
    num: "90%",
    label: "Bill Extraction Accuracy",
    diff: "was 70%",
    diffType: "add",
    context: "Solfin // Solar Lending AI",
    detail: "Vision LLM invoice parser with structured schema validation and auto-retry fallback.",
  },
  {
    num: "7s",
    label: "Mean LLM Response Time",
    diff: "was 20s",
    diffType: "del",
    context: "Solfin // Document Engine",
    detail: "Latency cut by 65% via payload streaming, cached context, and model tiering.",
  },
  {
    num: "10k/wk",
    label: "Peak LLM Invocations",
    diff: "<1% error rate",
    diffType: "add",
    context: "Solfin // Production Scale",
    detail: "High-volume extraction pipelines with graceful degradation and rate-limit smoothing.",
  },
  {
    num: "9",
    label: "AI Providers Integrated",
    diff: "0 dependencies",
    diffType: "neutral",
    context: "DiffCommit AI // VS Code",
    detail: "Supports Claude, GPT, Gemini, DeepSeek, Grok, Mistral, Groq, OpenRouter, and Ollama.",
  },
  {
    num: "90%+",
    label: "Indexing Reduction on Diffs",
    diff: "SHA hash cache",
    diffType: "add",
    context: "Syntra // Local-first RAG",
    detail: "AST chunking with git-diff change detection skips re-embedding unmutated files.",
  },
  {
    num: "1,500+",
    label: "Full-Stack Production Commits",
    diff: "Single builder",
    diffType: "neutral",
    context: "Hortiprise // SaaS Engine",
    detail: "End-to-end commercial ERP: inventory, batch state machine, billing, and WhatsApp dispatch.",
  },
]

export function Telemetry() {
  return (
    <section id="telemetry" className="py-16 sm:py-20 border-b border-[#1e2029]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section title */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8">
          <div>
            <div className="text-xs font-mono text-emerald-400 font-semibold tracking-wider">
              // 01. PRODUCTION TELEMETRY
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 font-sans">
              Measured Production Impact
            </h2>
          </div>
          <div className="text-xs font-mono text-slate-400">
            Real metrics extracted from live systems and git histories.
          </div>
        </div>

        {/* 6-grid metric cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="p-5 rounded-lg border border-[#272733] bg-[#0f1017] hover:border-slate-600 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-baseline justify-between gap-3">
                  <div className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight">
                    {m.num}
                  </div>
                  {m.diff && (
                    <span
                      className={`text-xs font-mono px-2 py-0.5 rounded ${
                        m.diffType === "add"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                          : m.diffType === "del"
                            ? "bg-sky-500/10 text-sky-400 border border-sky-500/30"
                            : "bg-slate-800 text-slate-300 border border-slate-700"
                      }`}
                    >
                      {m.diff}
                    </span>
                  )}
                </div>

                <div className="mt-3 text-sm font-semibold text-slate-100 font-sans">
                  {m.label}
                </div>
                <div className="mt-1 text-xs text-slate-400 leading-relaxed font-sans">
                  {m.detail}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1e2029] text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>{m.context}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
