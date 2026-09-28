"use client"

import { useRef } from "react"
import { otherProjects } from "@/lib/data"

export function More() {
  const rail = useRef<HTMLUListElement>(null)
  const step = (dir: number) => {
    const el = rail.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" })
  }

  return (
    <section className="more" data-tone="light">
      <div className="wrap more__head">
        <div>
          <p className="eyebrow">More from the workbench</p>
          <h2 className="h2">Smaller tools. Same standard.</h2>
        </div>
        <div className="more__nav">
          <button type="button" onClick={() => step(-1)} aria-label="Previous projects">
            ‹
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Next projects">
            ›
          </button>
        </div>
      </div>
      <ul className="rail" ref={rail}>
        {otherProjects.map((p) => {
          const href = p.liveUrl || p.repoUrl
          const body = (
            <>
              <span className="card__cat">{p.category}</span>
              <span className="card__title">{p.title}</span>
              <span className="card__tag">{p.tagline}</span>
              <span className="card__tech">{p.tech.slice(0, 4).join(" · ")}</span>
              <span className="card__foot">
                {p.status}
                {href && <span className="card__go">{p.liveUrl ? "Visit" : "Source"} ↗</span>}
              </span>
            </>
          )
          return (
            <li key={p.title} className="card">
              {href ? (
                <a href={href} target="_blank" rel="noopener">
                  {body}
                </a>
              ) : (
                <div>{body}</div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
