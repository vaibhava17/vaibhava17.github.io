"use client"

import type { MotionValue } from "framer-motion"
import { cx, seg, useStepped } from "../motion"

const RUBRIC: [string, number, number][] = [
  ["Thesis fit", 34, 40],
  ["Team signal", 20, 25],
  ["Market size", 16, 20],
  ["Traction", 12, 15],
]
const TOTAL = RUBRIC.reduce((a, [, s]) => a + s, 0)
const VERDICTS: [string, number][] = [
  ["Pass", 0],
  ["Watch", 50],
  ["Meeting", 75],
]
const STAGES = ["Source", "Analyze", "Evaluate", "Verdict"]

export function PipelineViz({ p }: { p: MotionValue<number> }) {
  const v = useStepped(p)
  const stage = v < 0.15 ? 0 : v < 0.45 ? 1 : v < 0.75 ? 2 : 3
  const fill = seg(v, 0.15, 0.6)
  const score = Math.round(fill * TOTAL)
  const verdict = v > 0.65 ? VERDICTS.filter(([, t]) => TOTAL >= t).pop()![0] : null

  return (
    <div
      className="viz"
      aria-label="Diagram: autonomous VC deal scoring and deterministic rubric evaluation"
    >
      <ol className="steps">
        {STAGES.map((s, i) => (
          <li key={s} className={i <= stage ? "on" : ""}>
            {s}
          </li>
        ))}
      </ol>
      <div className="win">
        <div className="win__bar">
          <i />
          <i />
          <i />
          <span>deal-evaluator // startup #0412.json</span>
        </div>
        <div className="rubric">
          {RUBRIC.map(([name, s, max]) => (
            <div className="rubric__row" key={name}>
              <span>{name}</span>
              <span className="rubric__bar">
                <i style={{ width: `${(s / max) * fill * 100}%` }} />
              </span>
              <span className="rubric__n">
                {Math.round(s * fill)}/{max}
              </span>
            </div>
          ))}
          <div className="rubric__total">
            <span>Aggregated Score</span>
            <b>{score}</b>
            <span className="code__dim">/ 100</span>
          </div>
        </div>
        <ul className="verdicts">
          {VERDICTS.map(([name, t]) => (
            <li key={name} className={verdict === name ? "on" : ""}>
              {name}
              <small>{t ? `>= ${t}` : "< 50"}</small>
            </li>
          ))}
        </ul>
      </div>
      <p className={cx("win__status replay", v > 0.85 && "on")}>
        <span className="code__dim">$</span> eval --from-cache: exact verdict replayed (0 API tokens consumed)
      </p>
      <p className="viz__cap">
        <span>⚡</span> Multi-agent extraction → deterministic rubric scoring → JSON decision log
      </p>
    </div>
  )
}
