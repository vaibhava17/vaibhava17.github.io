"use client"

import { useEffect, useRef } from "react"
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"
import type { Project } from "@/lib/data"
import type { ChapterStyle } from "@/lib/site"
import { EASE, useMedia } from "./motion"
import { HortipriseViz } from "./viz/hortiprise"
import { DiffCommitViz } from "./viz/diffcommit"
import { SyntraViz } from "./viz/syntra"
import { PipelineViz } from "./viz/pipeline"

const VIZ = {
  hortiprise: HortipriseViz,
  diffcommit: DiffCommitViz,
  syntra: SyntraViz,
  pipeline: PipelineViz,
}
const pad = (n: number) => String(n).padStart(2, "0")

export function Chapter({
  project,
  style,
  n,
  total,
}: {
  project: Project
  style: ChapterStyle
  n: number
  total: number
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const wide = useMedia("(min-width: 900px) and (min-height: 620px)")
  const pinned = useScroll({ target: scrollRef, offset: ["start start", "end end"] })
  const mobileScroll = useScroll({ target: scrollRef, offset: ["start 70%", "end 30%"] })

  const p = useMotionValue(0)

  const sync = () => {
    if (reduce) return p.set(1)
    p.set((wide ? pinned : mobileScroll).scrollYProgress.get())
  }

  useEffect(sync, [wide, reduce])
  useMotionValueEvent(pinned.scrollYProgress, "change", () => wide && sync())
  useMotionValueEvent(mobileScroll.scrollYProgress, "change", () => !wide && sync())

  // Subtle parallax depth on the stage
  const stageParallaxY = useTransform(p, [0, 1], [16, -16])
  const stageParallaxScale = useTransform(p, [0, 0.5, 1], [0.98, 1, 0.99])

  const Viz = VIZ[style.viz]
  const reveal = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10% 0px" },
  }

  return (
    <section
      className="chapter"
      id={style.viz}
      data-tone="dark"
      data-accent={style.accent}
      style={{ ["--accent" as string]: style.accent }}
    >
      <div className="chapter__scroll" ref={scrollRef}>
        <div className="chapter__sticky">
          <div className="chapter__copy">
            <motion.p
              className="chapter__no"
              {...reveal}
              transition={{ duration: 0.8, ease: EASE }}
            >
              {pad(n)} / {pad(total)} · {project.status}
            </motion.p>
            <motion.h3
              className="chapter__title"
              {...reveal}
              transition={{ duration: 1, delay: 0.05, ease: EASE }}
            >
              {project.title}
            </motion.h3>
            <motion.p
              className="chapter__headline"
              {...reveal}
              transition={{ duration: 1, delay: 0.12, ease: EASE }}
            >
              {style.headline}
            </motion.p>
            <motion.div {...reveal} transition={{ duration: 1, delay: 0.2, ease: EASE }}>
              <p className="chapter__body">{project.description}</p>
              {project.value && <p className="chapter__value">{project.value}</p>}
              <p className="chapter__tech">{project.tech.join(" · ")}</p>
              {(project.liveUrl || project.repoUrl) && (
                <p className="chapter__links">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener" className="more-link">
                      {project.liveUrl.includes("marketplace") ? "Install" : "Visit"}
                    </a>
                  )}
                  {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noopener" className="more-link">
                      Source
                    </a>
                  )}
                </p>
              )}
            </motion.div>
          </div>
          <motion.div
            className="chapter__stage"
            ref={stageRef}
            style={{
              y: reduce ? 0 : stageParallaxY,
              scale: reduce ? 1 : stageParallaxScale,
            }}
          >
            <Viz p={p} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
