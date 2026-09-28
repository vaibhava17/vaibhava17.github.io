"use client"

import type { MotionValue } from "framer-motion"
import { seg, useStepped } from "../motion"

const COLS = 16
const CELLS = 96
// The chunks a small commit touches: two neighbouring runs and a stray, like a real diff.
const CHANGED = new Set([19, 20, 21, 22, 55, 56, 57, 90])

export function SyntraViz({ p }: { p: MotionValue<number> }) {
  const v = useStepped(p)
  const indexed = Math.round(seg(v, 0.02, 0.32) * CELLS)
  const committed = v > 0.4
  const reembedded = committed ? Math.round(seg(v, 0.45, 0.75) * CHANGED.size) : 0
  const order = [...CHANGED]

  let status = `Initial index · ${indexed} / ${CELLS} chunks embedded`
  if (committed) status = `git diff · 3 files changed · ${reembedded} / ${CELLS} chunks re-embedded`
  if (v > 0.8) status = `${CELLS - CHANGED.size} chunks skipped by content hash · index current`

  return (
    <div
      className="viz"
      aria-label="Diagram: after a commit only the changed chunks are re-embedded"
    >
      <div className="win">
        <div className="win__bar">
          <i />
          <i />
          <i />
          <span>syntra · ~/code/service</span>
        </div>
        <div className="grid" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
          {Array.from({ length: CELLS }, (_, i) => {
            const changed = CHANGED.has(i)
            let cls = i < indexed ? "cell on" : "cell"
            if (committed && changed)
              cls = order.indexOf(i) < reembedded ? "cell hot" : "cell stale"
            else if (committed) cls = "cell on quiet"
            return <i key={i} className={cls} />
          })}
        </div>
        <p className="win__status" aria-live="polite">
          <span className="code__dim">$</span> {status}
        </p>
      </div>
      <p className="viz__cap viz__cap--lock">
        Runs on your machine. Code never leaves it · illustration
      </p>
    </div>
  )
}
