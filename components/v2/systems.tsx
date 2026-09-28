"use client"

import { useState } from "react"
import { useMotionValue } from "framer-motion"
import { HortipriseViz } from "./viz/hortiprise"
import { DiffCommitViz } from "./viz/diffcommit"
import { SyntraViz } from "./viz/syntra"
import { PipelineViz } from "./viz/pipeline"

interface SystemItem {
  id: string
  name: string
  category: string
  tagline: string
  description: string
  accent: string
  metrics: string[]
  stack: string[]
  liveUrl?: string
  repoUrl?: string
  component: React.ComponentType<{ p: any }>
}

const SYSTEMS: SystemItem[] = [
  {
    id: "hortiprise",
    name: "Hortiprise",
    category: "COMMERCIAL SAAS // AGRICULTURE ERP",
    accent: "#30d158",
    tagline: "Replacing manual pen-and-paper operations with automated nursery lifecycle management",
    description:
      "Full-stack production platform for commercial plant nurseries. Features multi-format tax invoice OCR ingestion, seed batch tracking state machines, inventory valuation, and automated customer dispatch alerts via WhatsApp Cloud API.",
    metrics: [
      "1,500+ commits across full-stack repositories",
      "End-to-end batch lifecycle state machine",
      "Multi-tenant Docker deployment on GCP Linux VM",
      "Automated customer dispatch via WhatsApp Cloud API",
    ],
    stack: ["Next.js 14", "TypeScript", "FastAPI (Python)", "MySQL", "Docker", "WhatsApp Cloud API"],
    liveUrl: "https://hortiprise.com",
    repoUrl: "https://github.com/vaibhava17/nursery-cms",
    component: HortipriseViz,
  },
  {
    id: "diffcommit",
    name: "DiffCommit AI",
    category: "DEV TOOLS // VS CODE MARKETPLACE",
    accent: "#0a84ff",
    tagline: "Zero-dependency staged git diff parser & structured AI commit generator",
    description:
      "Analyzes git diffs directly inside VS Code's Source Control panel and constructs structured conventional commits. Implements local OS keychain credential isolation via VS Code SecretStorage, bypassing unsafe settings.json token storage. Supports 9 AI providers with token-budgeted prompt construction.",
    metrics: [
      "Zero external runtime dependencies",
      "Direct VS Code SecretStorage keychain integration",
      "9 AI providers: Claude, GPT, Gemini, DeepSeek, Grok, Mistral, Groq, OpenRouter, Ollama",
      "Token-budgeted diff windowing & prompt optimization",
    ],
    stack: ["TypeScript", "VS Code Extension API", "SecretStorage", "Git CLI", "9 LLM APIs"],
    liveUrl: "https://marketplace.visualstudio.com/items?itemName=vaibhava17.diffcommit-ai",
    repoUrl: "https://github.com/vaibhava17/vscode-ext",
    component: DiffCommitViz,
  },
  {
    id: "syntra",
    name: "Syntra",
    category: "LOCAL-FIRST AI // CODEBASE RAG",
    accent: "#bf5af2",
    tagline: "Incremental git-diff indexing engine with zero-leak local vector embeddings",
    description:
      "Local-first developer assistant that indexes proprietary codebases into local vector stores. Uses tree-sitter AST chunking and hooks into git diffs to detect unmutated files via SHA-256 caching, eliminating 90%+ of redundant re-embeddings on busy development branches. 100% air-gapped and local.",
    metrics: [
      "90%+ indexing time saved on branch diffs",
      "AST-aware syntax chunking",
      "SHA-256 file content hash cache",
      "100% air-gapped local embeddings (zero code leakage)",
    ],
    stack: ["Python", "TypeScript", "Rust", "SQLite / Vector", "Local Ollama Embeddings"],
    repoUrl: "https://github.com/vaibhava17/syntra",
    component: SyntraViz,
  },
  {
    id: "pipeline",
    name: "AI Investment Pipeline",
    category: "AUTONOMOUS AGENTS // DEAL SOURCING",
    accent: "#ff9f0a",
    tagline: "Deterministic startup evaluation pipeline with verifiable decision caching",
    description:
      "Autonomous multi-agent pipeline (Source -> Analyze -> Evaluate -> Verdict) that screens startups against AI infrastructure theses. Evaluates pitch materials against a weighted rubric to prevent LLM hallucinations, generating structured investment memos with an on-disk JSON cache for deterministic zero-token replays.",
    metrics: [
      "Deterministic 100-point evaluation rubric",
      "Zero LLM hallucination drift in financial verdicts",
      "On-disk JSON cache for instant zero-cost replays",
      "Comprehensive Pytest coverage & decision audit logs",
    ],
    stack: ["Python", "LangChain", "Pytest", "FastAPI", "Pydantic V2"],
    repoUrl: "https://github.com/vaibhava17/task-assignment",
    component: PipelineViz,
  },
]

function SystemCard({ system, index }: { system: SystemItem; index: number }) {
  const [val, setVal] = useState(0.85)
  const motionVal = useMotionValue(val)

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value)
    setVal(v)
    motionVal.set(v)
  }

  const VizComponent = system.component

  return (
    <article
      id={system.id}
      className="p-6 sm:p-8 rounded-xl border border-[#272733] bg-[#0c0d14] hover:border-slate-600 transition-colors"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Technical Context */}
        <div className="lg:col-span-6 space-y-5">
          <div className="space-y-1.5">
            <div className="text-[11px] font-mono text-emerald-400 font-semibold tracking-wider">
              {system.category}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans tracking-tight">
              {system.name}
            </h3>
            <p className="text-sm font-mono text-slate-300 font-medium">
              {system.tagline}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            {system.description}
          </p>

          {/* Key technical highlights */}
          <div className="space-y-2 pt-2">
            <div className="text-xs font-mono text-slate-400 font-medium">
              // ARCHITECTURAL HIGHLIGHTS
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
              {system.metrics.map((m) => (
                <li key={m} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono mt-0.5">&gt;</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack tags */}
          <div className="pt-2">
            <div className="flex flex-wrap gap-1.5">
              {system.stack.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded bg-[#181922] border border-[#272733] text-[11px] font-mono text-slate-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-3 pt-3 font-mono text-xs">
            {system.liveUrl && (
              <a
                href={system.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold transition-colors flex items-center gap-1.5"
              >
                <span>{system.liveUrl.includes("marketplace") ? "Install Extension" : "Live Product"}</span>
                <span>&nearr;</span>
              </a>
            )}
            {system.repoUrl && (
              <a
                href={system.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded border border-[#272733] bg-[#12131a] hover:bg-[#1a1c26] text-slate-300 transition-colors flex items-center gap-1.5"
              >
                <span>Source Repository</span>
                <span>&nearr;</span>
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Live Interactive Architectural Visualizer */}
        <div className="lg:col-span-6 w-full space-y-3">
          <div
            className="v2-stage p-4 sm:p-5 rounded-lg border border-[#272733] bg-[#08090e]"
            style={{ ["--v2-accent" as string]: system.accent }}
          >
            <VizComponent p={motionVal} />
          </div>

          {/* Scrubber slider for interactive inspection */}
          <div className="flex items-center justify-between gap-3 px-2 py-1.5 bg-[#12131a] rounded border border-[#1e2029] font-mono text-[11px] text-slate-400">
            <span>SCRUB LIFECYCLE:</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={val}
              onChange={handleSlider}
              className="w-48 sm:w-64 accent-emerald-500 cursor-pointer"
              aria-label={`Scrub ${system.name} pipeline state`}
            />
            <span className="w-12 text-right text-slate-200">
              {Math.round(val * 100)}%
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Systems() {
  return (
    <section id="systems" className="py-16 sm:py-20 border-b border-[#1e2029]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-10">
          <div>
            <div className="text-xs font-mono text-emerald-400 font-semibold tracking-wider">
              // 02. FLAGSHIP SYSTEMS & ARCHITECTURE
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 font-sans">
              Core Engineered Systems
            </h2>
          </div>
          <div className="text-xs font-mono text-slate-400">
            Interactive live architectural visualizers. Scrub stages in real time.
          </div>
        </div>

        <div className="space-y-8">
          {SYSTEMS.map((system, idx) => (
            <SystemCard key={system.id} system={system} index={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}
