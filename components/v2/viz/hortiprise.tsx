"use client"

import type { MotionValue } from "framer-motion"
import { cx, seg, useStepped } from "../motion"

const FIELDS = [
  ["supplier", '"Sample Seeds & Co."'],
  ["items", "12"],
  ["gst", '"18%"'],
  ["total", "18400.00"],
]
const STAGES = ["Sown", "Germinated", "Batched", "Quoted", "Billed", "Dispatched"]

export function HortipriseViz({ p }: { p: MotionValue<number> }) {
  const v = useStepped(p)
  const scan = seg(v, 0.05, 0.35)
  const fields = Math.round(seg(v, 0.3, 0.5) * FIELDS.length)
  const stages = Math.round(seg(v, 0.5, 0.9) * STAGES.length)
  const done = stages === STAGES.length

  return (
    <div
      className="viz"
      aria-label="Diagram: invoice OCR parsing, lifecycle progression, and automated WhatsApp order dispatch"
    >
      <div className="viz__row">
        <div className="invoice">
          <b>Tax invoice // OCR stream</b>
          {[80, 55, 70, 40, 65, 50, 75].map((w, i) => (
            <i key={i} style={{ width: `${w}%` }} />
          ))}
          <div
            className="invoice__scan"
            style={{ top: `${scan * 100}%`, opacity: scan > 0 && scan < 1 ? 1 : 0 }}
          />
        </div>
        <pre className="code code--json">
          <span className="code__dim">{"{"}</span>
          {FIELDS.map(([k, val], i) => (
            <span key={k} className={i < fields ? "on" : "off"}>
              {"\n  "}
              <span className="code__key">{k}</span>: {val}
              {i < FIELDS.length - 1 ? "," : ""}
            </span>
          ))}
          <span className="code__dim">{"\n}"}</span>
        </pre>
      </div>
      <ol className="stages">
        {STAGES.map((s, i) => (
          <li key={s} className={i < stages ? "on" : ""}>
            <i />
            <span>{s}</span>
          </li>
        ))}
      </ol>
      <div className={cx("bubble", done && "on")}>
        Your order of 12 nursery trays is on its way. <small>WhatsApp API · delivered ✓✓</small>
      </div>
      <p className="viz__cap">
        <span>⚡</span> Pipeline: OCR invoice extraction → batch state machine → WhatsApp dispatch
      </p>
    </div>
  )
}
