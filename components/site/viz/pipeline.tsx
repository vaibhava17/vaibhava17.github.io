"use client"

import type { MotionValue } from "framer-motion"
import { cx, seg, useStepped } from "../motion"

// A fixed rubric, so the verdict is arithmetic rather than a model's mood. Illustrative weights.
const RUBRIC: [string, number, number][] = [
  ["Thesis fit", 34, 40],
  ["Team", 20, 25],
  ["Market", 16, 20],
  ["Traction", 12, 15],
]
const TOTAL = RUBRIC.reduce((a, [, s]) => a + s, 0)
const VERDICTS: [string, number][] = [
  ["Pass", 0],
  ["Watch", 50],
  ["Meeting", 75],
]
const STAGES = ["Source", "Analyze", "Recommend"]

export function PipelineViz({ p }: { p: MotionValue<number> }) {
  const v = useStepped(p)
  const stage = v < 0.15 ? 0 : v < 0.6 ? 1 : 2
  const fill = seg(v, 0.15, 0.6)
  const score = Math.round(fill * TOTAL)
  const verdict = v > 0.65 ? VERDICTS.filter(([, t]) => TOTAL >= t).pop()![0] : null

  return (
    <div
      className="viz"
      aria-label="Diagram: a startup is scored against a fixed rubric and given a verdict"
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
          <span>memo · startup #0412</span>
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
            <span>Score</span>
            <b>{score}</b>
            <span className="code__dim">/ 100</span>
          </div>
        </div>
        <ul className="verdicts">
          {VERDICTS.map(([name, t]) => (
            <li key={name} className={verdict === name ? "on" : ""}>
              {name}
              <small>{t ? `≥ ${t}` : "< 50"}</small>
            </li>
          ))}
        </ul>
      </div>
      <p className={cx("win__status replay", v > 0.85 && "on")}>
        <span className="code__dim">$</span> replay --from-cache · same verdict · 0 API calls
      </p>
      <p className="viz__cap">Source → analyze → recommend · illustration</p>
    </div>
  )
}
