"use client"

import { flagshipProjects } from "@/lib/data"
import { chapters } from "@/lib/site"
import { Chapter } from "./chapter"

const pad = (n: number) => String(n).padStart(2, "0")
const work = chapters.map((c) => ({
  style: c,
  project: flagshipProjects.find((p) => p.title === c.title)!,
}))

export function Work() {
  return (
    <section id="work" className="work">
      <div className="wrap index" data-tone="dark" data-accent="#0a84ff">
        <p className="eyebrow">Selected work</p>
        <h2 className="h2">
          Four builds. <span className="grad">Each one running.</span>
        </h2>
        <ol className="index__list">
          {work.map(({ style, project }, i) => (
            <li key={project.title} style={{ ["--accent" as string]: style.accent }}>
              <a href={`#${style.viz}`}>
                <span className="index__num">{pad(i + 1)}</span>
                <span className="index__title">{project.title}</span>
                <span className="index__tag">{project.category}</span>
                <span className="index__arrow" aria-hidden="true">
                  ↓
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
      {work.map(({ style, project }, i) => (
        <Chapter
          key={project.title}
          project={project}
          style={style}
          n={i + 1}
          total={work.length}
        />
      ))}
    </section>
  )
}
