"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail, Menu, Phone, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const NAV_LINKS = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
]

const STATS = [
  { value: "3+", label: "Years in production" },
  { value: "15+", label: "Projects shipped" },
  { value: "3", label: "Companies" },
  { value: "70%", label: "Manual work automated away" },
]

const EXPERIENCE = [
  {
    company: "Solfin",
    role: "Software Development Engineer II",
    period: "Jan 2025 — Present",
    current: true,
    achievements: [
      "Developed scalable UI components in React used across the core product",
      "Built and fine-tuned an internal LLM wrapper for document workflows",
      "Automated document processing, cutting manual effort by 70%",
      "Optimized LLM prompts and system integration for reliability and cost",
    ],
  },
  {
    company: "TalentXO",
    role: "Software Development Engineer I",
    period: "Sept 2023 — Dec 2024",
    current: false,
    achievements: [
      "Improved application performance by 30%",
      "Cut third-party integration time by 40%",
      "Held 99.9% uptime on production services",
      "Reduced post-deployment issues by 95%",
    ],
  },
  {
    company: "Guni SMS",
    role: "Frontend Engineer",
    period: "Dec 2021 — Sept 2023",
    current: false,
    achievements: [
      "Improved user engagement by 20%",
      "Cut integration time by 30%",
      "Led a team of 4 developers",
      "Reduced pre-release issues by 70%",
    ],
  },
]

const PROJECTS = [
  {
    name: "Talent Partner Dashboard",
    url: "https://talentxo.com",
    description: "Recruitment management system for partner agencies to source, track, and place candidates.",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    name: "Guni SMS Platform",
    url: "https://app.gunisms.com.au",
    description: "SMS campaign management and analytics platform for business messaging at scale.",
    tags: ["React", "Redux", "Express"],
  },
  {
    name: "Magic Exports",
    url: "https://magicexports.in",
    description: "Business management system for an export operation — catalogue, orders, and clients.",
    tags: ["Next.js", "Tailwind"],
  },
  {
    name: "Motoworld",
    url: "https://manaliladakhmotoworld.com/",
    description: "Marketing and booking site for a motorcycle rental and tourism business.",
    tags: ["Next.js", "TypeScript"],
  },
  {
    name: "Club Events Handler",
    url: "https://intense-shelf-96174.herokuapp.com/",
    description: "Event management system for college club activities — registrations and scheduling.",
    tags: ["Node.js", "MySQL"],
  },
]

const SKILLS = [
  {
    name: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Redux", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    name: "Backend",
    items: ["Node.js", "Python", "FastAPI", "Flask", "Express.js", "MongoDB", "MySQL", "JWT"],
  },
  {
    name: "Tools",
    items: ["Git", "AWS", "Google Cloud", "Docker", "JIRA", "Postman", "VS Code", "Linux"],
  },
]

const EDUCATION = [
  {
    title: "Minor in Computer Science & Engineering",
    place: "Indian Institute of Technology Mandi",
    period: "Sept 2024 — Present",
  },
  {
    title: "B.Tech, Computer Science",
    place: "Shri Siddhi Vinayak Group of Institutions",
    period: "Graduated 2022",
  },
]

const CERTIFICATIONS = [
  { title: "Project Engineer", place: "Wipro Ltd.", year: "2022" },
  { title: "Node.js Developer", place: "Udemy", year: "2022" },
  { title: "Django Python", place: "CETPA Infotech", year: "2020" },
]

const CONTACT_LINKS = [
  { label: "Email", value: "iamvaibhav.agarwal@gmail.com", href: "mailto:iamvaibhav.agarwal@gmail.com", icon: Mail },
  { label: "LinkedIn", value: "linkedin.com/in/vaibhava17", href: "https://linkedin.com/in/vaibhava17", icon: Linkedin },
  { label: "GitHub", value: "github.com/vaibhava17", href: "https://github.com/vaibhava17", icon: Github },
  { label: "Phone", value: "+91 82798 75697", href: "tel:+918279875697", icon: Phone },
]

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors ${
          scrolled ? "border-b border-border bg-background/80 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <button onClick={() => scrollTo("top")} className="text-sm font-semibold tracking-tight">
            Vaibhav Agarwal
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border md:hidden"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-border bg-background px-6 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main id="top">
        {/* Hero */}
        <section className="mx-auto flex max-w-5xl flex-col px-6 pb-24 pt-40 md:pt-48">
          <motion.p {...fadeUp(0)} className="mb-6 text-sm font-medium text-muted-foreground">
            Software Engineer II · Solfin
          </motion.p>

          <motion.h1
            {...fadeUp(0.05)}
            className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl"
          >
            I build software that ships, scales, and runs without babysitting.
          </motion.h1>

          <motion.p {...fadeUp(0.1)} className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            Three years shipping full-stack products in React, Node, and Python — from recruitment platforms to
            LLM-backed automation that cut manual work by 70%.
          </motion.p>

          <motion.div {...fadeUp(0.15)} className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollTo("work")}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              See the work
              <ArrowRight size={15} />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-foreground/30"
            >
              Get in touch
            </button>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="border-y border-border">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 py-16 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div key={stat.label} {...fadeUp(i * 0.05)}>
                <div className="text-3xl font-semibold tracking-tight md:text-4xl">{stat.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="mx-auto max-w-5xl px-6 py-24">
          <motion.div {...fadeUp(0)} className="mb-12">
            <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Experience</h2>
          </motion.div>

          <div className="flex flex-col divide-y divide-border">
            {EXPERIENCE.map((job, i) => (
              <motion.div key={job.company} {...fadeUp(i * 0.05)} className="grid gap-4 py-8 md:grid-cols-[1fr_2fr]">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{job.company}</h3>
                    {job.current && (
                      <span className="rounded-full bg-foreground/5 px-2 py-0.5 text-xs font-medium text-muted-foreground">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{job.role}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{job.period}</p>
                </div>
                <ul className="space-y-2">
                  {job.achievements.map((achievement) => (
                    <li key={achievement} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Work */}
        <section id="work" className="border-t border-border bg-secondary/40">
          <div className="mx-auto max-w-5xl px-6 py-24">
            <motion.div {...fadeUp(0)} className="mb-12">
              <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Selected work</h2>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2">
              {PROJECTS.map((project, i) => (
                <motion.a
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...fadeUp((i % 2) * 0.05)}
                  className="group flex flex-col justify-between rounded-2xl border border-border bg-background p-6 transition-colors hover:border-foreground/30"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-base font-semibold">{project.name}</h3>
                      <ArrowUpRight
                        size={18}
                        className="flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{project.description}</p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mx-auto max-w-5xl px-6 py-24">
          <motion.div {...fadeUp(0)} className="mb-12">
            <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Skills</h2>
          </motion.div>

          <div className="grid gap-10 md:grid-cols-3">
            {SKILLS.map((group, i) => (
              <motion.div key={group.name} {...fadeUp(i * 0.05)}>
                <h3 className="mb-4 text-sm font-semibold">{group.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="border-t border-border bg-secondary/40">
          <div className="mx-auto grid max-w-5xl gap-16 px-6 py-24 md:grid-cols-2">
            <motion.div {...fadeUp(0)}>
              <h2 className="mb-8 text-sm font-medium uppercase tracking-widest text-muted-foreground">Education</h2>
              <div className="space-y-6">
                {EDUCATION.map((item) => (
                  <div key={item.title}>
                    <div className="font-semibold">{item.title}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{item.place}</div>
                    <div className="text-sm text-muted-foreground">{item.period}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.05)}>
              <h2 className="mb-8 text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Certifications
              </h2>
              <div className="space-y-6">
                {CERTIFICATIONS.map((item) => (
                  <div key={item.title}>
                    <div className="font-semibold">{item.title}</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {item.place} · {item.year}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-5xl px-6 py-24">
          <motion.div {...fadeUp(0)} className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Let's build something.</h2>
            <p className="mt-4 text-muted-foreground">
              Open to full-stack roles and interesting freelance work. Reach out through any of the channels below.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {CONTACT_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                {...fadeUp(i * 0.05)}
                className="group flex items-center gap-4 rounded-2xl border border-border p-5 transition-colors hover:border-foreground/30"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-secondary">
                  <link.icon size={16} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium">{link.label}</div>
                  <div className="truncate text-sm text-muted-foreground">{link.value}</div>
                </div>
                <ArrowUpRight
                  size={16}
                  className="ml-auto flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </motion.a>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Vaibhav Agarwal</span>
          <span>Built with Next.js & Tailwind CSS</span>
        </div>
      </footer>
    </div>
  )
}
