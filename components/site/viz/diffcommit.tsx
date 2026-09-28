"use client"

import type { MotionValue } from "framer-motion"
import { seg, useStepped } from "../motion"

const DIFF: [string, string][] = [
  [" ", "export async function getKey(ctx) {"],
  ["-", '  return config.get("apiKey")'],
  ["+", '  const key = await ctx.secrets.get("apiKey")'],
  ["+", "  return key ?? promptForKey(ctx)"],
  [" ", "}"],
]
const MESSAGE =
  "fix(auth): read provider keys from the OS keychain\n\nMove API keys out of settings into VS Code SecretStorage\nand prompt once when a key is missing."
const PROVIDERS = [
  "Claude",
  "GPT",
  "Gemini",
  "DeepSeek",
  "Grok",
  "Mistral",
  "Groq",
  "OpenRouter",
  "Ollama",
]

export function DiffCommitViz({ p }: { p: MotionValue<number> }) {
  const v = useStepped(p)
  const lines = Math.round(seg(v, 0.02, 0.22) * DIFF.length)
  const typed = MESSAGE.slice(0, Math.round(seg(v, 0.28, 0.72) * MESSAGE.length))
  const provider = Math.min(PROVIDERS.length - 1, Math.floor(seg(v, 0.75, 0.98) * PROVIDERS.length))
  const cycling = v > 0.75

  return (
    <div
      className="viz"
      aria-label="Diagram: a staged diff becomes a commit message, from any of nine providers"
    >
      <div className="win">
        <div className="win__bar">
          <i />
          <i />
          <i />
          <span>Source Control · 1 staged</span>
        </div>
        <pre className="code">
          {DIFF.map(([s, t], i) => (
            <span
              key={i}
              className={`diffline diffline--${s === "+" ? "add" : s === "-" ? "del" : "ctx"} ${i < lines ? "on" : "off"}`}
            >
              {s} {t}
              {"\n"}
            </span>
          ))}
        </pre>
        <div className="commitbox">
          <pre>
            {typed}
            <span className="caret" />
          </pre>
          <span className="commitbox__btn">✓ Commit</span>
        </div>
      </div>
      <ul className="chips" aria-label="Supported providers">
        {PROVIDERS.map((name, i) => (
          <li key={name} className={cycling && i === provider ? "on" : ""}>
            {name}
          </li>
        ))}
      </ul>
      <p className="viz__cap">Staged diff → message, from any of 9 providers · illustration</p>
    </div>
  )
}
