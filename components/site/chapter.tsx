"use client"

import { useEffect, useRef } from "react"
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
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
  // Wide screens pin the chapter and play the diagram as you scroll through it.
  // Phones keep the page flowing and play it as the diagram passes through the screen.
  const wide = useMedia("(min-width: 900px) and (min-height: 620px)")
  const pinned = useScroll({ target: scrollRef, offset: ["start start", "end end"] })
  const inline = useScroll({ target: stageRef, offset: ["start 85%", "end 30%"] })
  const p = useMotionValue(0)

  const sync = () => {
    if (reduce) return p.set(1)
    p.set((wide ? pinned : inline).scrollYProgress.get())
  }
  useEffect(sync, [wide, reduce]) // eslint-disable-line react-hooks/exhaustive-deps
  useMotionValueEvent(pinned.scrollYProgress, "change", () => wide && sync())
  useMotionValueEvent(inline.scrollYProgress, "change", () => !wide && sync())

  const Viz = VIZ[style.viz]
  const reveal = {
    initial: { opacity: 0, y: 30 },
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
          <div className="chapter__stage" ref={stageRef}>
            <Viz p={p} />
          </div>
        </div>
      </div>
    </section>
  )
}
