"use client"

import { useEffect, useRef, useState } from "react"
import { animate, motion, useInView, useReducedMotion } from "framer-motion"
import { stats, type Stat } from "@/lib/site"
import { EASE } from "./motion"

function Count({ s }: { s: Stat }) {
  const ref = useRef<HTMLSpanElement>(null)
  const seen = useInView(ref, { once: true, margin: "-15% 0px" })
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? s.value : 0)
  useEffect(() => {
    if (!seen || reduce) return setN(s.value)
    const a = animate(0, s.value, { duration: 1.8, ease: EASE, onUpdate: (v) => setN(v) })
    return () => a.stop()
  }, [seen, reduce, s.value])
  return (
    <span ref={ref} className="stat__num">
      {s.prefix}
      {Math.round(n).toLocaleString("en-IN")}
      {s.suffix}
    </span>
  )
}

export function Impact() {
  return (
    <section className="impact" id="impact" data-tone="dark" data-accent="#0a84ff">
      <div className="wrap">
        <p className="eyebrow">Impact</p>
        <h2 className="h2">
          Numbers that <span className="grad">moved.</span>
        </h2>
        <ul className="stats">
          {stats.map((s, i) => (
            <motion.li
              className="stat"
              key={s.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1, delay: (i % 3) * 0.08, ease: EASE }}
            >
              <Count s={s} />
              <span className="stat__label">{s.label}</span>
              <span className="stat__foot">
                {s.was && <del className="diff diff--del">was {s.was}</del>}
                <span>{s.where}</span>
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
