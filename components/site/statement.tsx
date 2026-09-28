"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion"

// Plain text, with *stars* around the words that carry the point.
const TEXT =
  "I build software that leaves the demo and meets real users: a *plant* *nursery* that ran on pen and paper, a *solar* *lender* making up to ten thousand AI calls a week, and *developers* who would rather not write their next commit message."

function Word({ w, i, n, p }: { w: string; i: number; n: number; p: MotionValue<number> }) {
  const strong = w.startsWith("*")
  const opacity = useTransform(p, [i / n, (i + 1) / n], [0.16, 1])
  return (
    <motion.span className={strong ? "w w--strong" : "w"} style={{ opacity }}>
      {w.replace(/\*/g, "")}{" "}
    </motion.span>
  )
}

export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 45%"] })
  const words = TEXT.split(" ")
  return (
    <section className="statement" data-tone="light">
      <p ref={ref} className="statement__text">
        {reduce
          ? TEXT.replace(/\*/g, "")
          : words.map((w, i) => <Word key={i} w={w} i={i} n={words.length} p={scrollYProgress} />)}
      </p>
    </section>
  )
}
