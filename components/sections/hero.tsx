"use client"

import Image from "next/image"
import { motion, type Variants } from "framer-motion"
import { profile } from "@/lib/data"
import { ResumeButton } from "@/components/resume-button"

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Hero() {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-20 pt-28 md:pt-36">
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.div variants={item} className="mb-8 flex items-center gap-4">
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={52}
            height={52}
            unoptimized
            className="rounded-full border border-border"
          />
          <div>
            <div className="text-sm font-medium">{profile.name}</div>
            <div className="mt-0.5 flex items-center gap-2 font-mono text-xs text-graphite">
              <span className="h-1.5 w-1.5 rounded-full bg-amber" />
              {profile.role}
            </div>
          </div>
        </motion.div>

        <motion.h1
          variants={item}
          className="max-w-2xl text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl"
        >
          {profile.headline}
        </motion.h1>

        <motion.p variants={item} className="mt-6 max-w-xl text-base text-graphite md:text-lg">
          {profile.tagline}
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-wrap gap-2">
          {profile.stack.map((tech) => (
            <span
              key={tech}
              className="rounded border border-border px-2.5 py-1 font-mono text-xs text-graphite"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-6 text-sm">
          <a href="#work" className="border-b border-foreground pb-0.5 font-medium">
            See the work
          </a>
          <ResumeButton className="text-graphite hover:text-foreground">Resume</ResumeButton>
          <a href="#contact" className="text-graphite hover:text-foreground">
            Get in touch
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
