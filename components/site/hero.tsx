"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { profile, experience } from "@/lib/data"
import { EASE } from "./motion"

const now = experience.filter((e) => e.current)

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.88])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const rise = (d: number) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.1, delay: d, ease: EASE },
  })

  return (
    <section className="hero" id="top" ref={ref} data-tone="light">
      <motion.div className="hero__inner" style={{ scale, opacity: fade }}>
        <motion.p className="eyebrow" {...rise(0.1)}>
          Software engineer · {profile.location.split(" / ")[0]}
        </motion.p>
        <h1 className="hero__name" aria-label={profile.name}>
          {profile.name.split(" ").map((w, i) => (
            <span className="line" key={w}>
              <motion.span
                className="line__in"
                initial={reduce ? false : { y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.3, delay: 0.2 + i * 0.12, ease: EASE }}
              >
                {w}
                {i === 1 && "."}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p className="hero__lede" {...rise(0.55)}>
          Production SaaS, AI agents and developer tools.{" "}
          <span className="grad">Built to ship, not to demo.</span>
        </motion.p>
        <motion.ul className="hero__now" {...rise(0.7)} aria-label="Currently">
          {now.map((e) => (
            <li key={e.company}>
              <i className="live" aria-hidden="true" />
              {e.role.replace(" (Side Project)", "")} at{" "}
              <a href={e.website} target="_blank" rel="noopener">
                {e.company}
              </a>
            </li>
          ))}
        </motion.ul>
      </motion.div>
      <a href="#impact" className="hero__cue" aria-label="Scroll to impact">
        <span />
      </a>
    </section>
  )
}
