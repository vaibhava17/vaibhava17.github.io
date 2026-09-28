"use client"

import { useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { profile, links } from "@/lib/data"
import { ResumeButton } from "@/components/resume-button"
import { EASE } from "./motion"

export function Contact() {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 150, damping: 12 })
  const y = useSpring(useMotionValue(0), { stiffness: 150, damping: 12 })

  // The hello button leans toward a mouse pointer; touch screens just tap it.
  const lean = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.35)
    y.set((e.clientY - r.top - r.height / 2) * 0.35)
  }
  const rest = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <section className="contact" id="contact" data-tone="dark" data-accent="#0a84ff">
      <div className="wrap">
        <p className="eyebrow">Contact</p>
        <h2 className="contact__big">
          Let’s build <span className="grad">something real.</span>
        </h2>
        <p className="contact__open">
          Open to {profile.openTo.charAt(0).toLowerCase() + profile.openTo.slice(1)}.
        </p>
        <div className="contact__row">
          <motion.a
            ref={ref}
            href={`mailto:${links.email}`}
            className="hello"
            aria-label={`Email ${profile.name}`}
            style={{ x, y }}
            onPointerMove={lean}
            onPointerLeave={rest}
            initial={{ scale: 0, rotate: -90 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE }}
          >
            <svg className="hello__ring" viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <path id="ring" d="M100 100 m-86 0 a86 86 0 1 1 172 0 a86 86 0 1 1 -172 0" />
              </defs>
              <text>
                <textPath href="#ring" textLength="536" lengthAdjust="spacing">
                  SAY HELLO ✦ SAY HELLO ✦ SAY HELLO ✦{" "}
                </textPath>
              </text>
            </svg>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="hello__face" src={profile.avatar} alt="" width={240} height={240} />
          </motion.a>
          <ul className="contact__links">
            <li>
              <a href={`mailto:${links.email}`}>{links.email}</a>
            </li>
            <li>
              <a href={links.linkedin} target="_blank" rel="noopener">
                LinkedIn ↗
              </a>
            </li>
            <li>
              <a href={links.github} target="_blank" rel="noopener">
                GitHub ↗
              </a>
            </li>
            <li>
              <ResumeButton className="linkbtn">Download résumé ↓</ResumeButton>
            </li>
          </ul>
        </div>
      </div>
      <footer className="foot">
        <span>
          © {new Date().getFullYear()} {profile.name} · {profile.location.split(" / ")[0]}
        </span>
        <a className="made" href="https://anamaya.fyi" target="_blank" rel="noopener">
          <span className="dot" aria-hidden="true" />
          made by anamaya
        </a>
      </footer>
    </section>
  )
}
