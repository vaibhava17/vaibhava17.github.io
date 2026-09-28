"use client"

import { motion } from "framer-motion"
import { experience, education, skillCategories, community } from "@/lib/data"
import { EASE } from "./motion"

const rise = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-8% 0px" },
  transition: { duration: 1, ease: EASE },
}

export function Experience() {
  return (
    <section className="experience" id="experience" data-tone="light">
      <div className="wrap">
        <p className="eyebrow">Experience</p>
        <h2 className="h2">Four teams. One habit: ship it.</h2>

        <div className="cv">
          {experience.map((e) => (
            <motion.article className="cv__row" key={e.company} {...rise}>
              <div className="cv__when">
                {e.period.replace(" — ", " – ")}
                {e.current && <span className="cv__now">Now</span>}
              </div>
              <div className="cv__what">
                <h3>
                  {e.website ? (
                    <a href={e.website} target="_blank" rel="noopener">
                      {e.company}
                    </a>
                  ) : (
                    e.company
                  )}
                  <span>
                    {e.role} · {e.location}
                  </span>
                </h3>
                <p>{e.highlights[0]}</p>
                {e.metrics && (
                  <p className="cv__metrics">
                    {e.metrics.map((m) => (
                      <span key={m.label}>
                        <del className="diff diff--del">{m.from}</del>
                        <ins className="diff diff--add">{m.to}</ins> {m.label}
                      </span>
                    ))}
                  </p>
                )}
                {e.highlights.length > 1 && (
                  <details className="cv__more">
                    <summary>What else</summary>
                    <ul>
                      {e.highlights.slice(1).map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                    <p className="cv__tech">{e.tech.join(" · ")}</p>
                  </details>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="lower">
          <motion.div {...rise}>
            <h3 className="h3">Education</h3>
            {education.map((ed) => (
              <div className="mini" key={ed.school}>
                <b>
                  {ed.degree}, {ed.area}
                </b>
                <span>
                  {ed.school} · {ed.period.replace(" — ", " – ")}
                </span>
              </div>
            ))}
            <h3 className="h3">Community</h3>
            {community.map((c) => (
              <div className="mini" key={c.organization}>
                <b>{c.role}</b>
                <span>
                  {c.organization} · {c.period.replace(" — ", " – ")}
                </span>
              </div>
            ))}
          </motion.div>
          <motion.div {...rise}>
            <h3 className="h3">Toolbox</h3>
            <dl className="toolbox">
              {skillCategories.map((c) => (
                <div key={c.name}>
                  <dt>{c.name}</dt>
                  <dd>
                    {c.skills
                      .filter((s) => s.featured)
                      .map((s) => s.name)
                      .join(" · ")}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
