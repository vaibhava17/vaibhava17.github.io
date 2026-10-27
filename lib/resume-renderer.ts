import { jsPDF } from "jspdf"
import { autoTable } from "jspdf-autotable"

export interface Metric {
  label: string
  from: string
  to: string
}

export interface Experience {
  company: string
  role: string
  period: string
  location: string
  website?: string
  current: boolean
  highlights: string[]
  metrics?: Metric[]
  tech: string[]
}

export interface SkillCategory {
  name: string
  skills: { name: string }[]
}

export interface Education {
  school: string
  degree: string
  area: string
  period: string
  grade: string
}

export interface Certification {
  title: string
  issuer: string
  year: string
}

export interface ResumeData {
  profile: {
    name: string
    role: string
    summary: string
    location: string
    email: string
    github: string
    linkedin: string
  }
  experience: Experience[]
  skillCategories: SkillCategory[]
  education: Education[]
  certifications: Certification[]
  projects?: {
    name: string
    tag: string
    description: string
    highlights?: string[]
  }[]
}

const PAGE_WIDTH = 612 // US Letter, pt
const PAGE_HEIGHT = 792
const MARGIN = 38
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2
const HEADER_HEIGHT = 96

const INK: [number, number, number] = [16, 20, 31]
const PAPER: [number, number, number] = [237, 239, 234]
const GRAPHITE: [number, number, number] = [91, 97, 105]
const AMBER: [number, number, number] = [232, 163, 61]
const DIFF_ADD: [number, number, number] = [63, 143, 95]
const DIFF_REMOVE: [number, number, number] = [166, 75, 65]
const RULE: [number, number, number] = [222, 223, 217]

export function renderResume(data: ResumeData): Uint8Array {
  const doc = new jsPDF({ unit: "pt", format: "letter" })
  let y = MARGIN

  function checkPage(needed: number) {
    if (y + needed > PAGE_HEIGHT - MARGIN) {
      doc.addPage()
      y = MARGIN
    }
  }

  function paragraph(
    str: string,
    opts: {
      size?: number
      color?: [number, number, number]
      bold?: boolean
      gap?: number
      x?: number
      width?: number
    } = {},
  ) {
    const size = opts.size ?? 9.0
    const x = opts.x ?? MARGIN
    const width = opts.width ?? CONTENT_WIDTH - (x - MARGIN)
    const lineGap = opts.gap ?? size * 1.30
    doc.setFont("helvetica", opts.bold ? "bold" : "normal")
    doc.setFontSize(size)
    doc.setTextColor(...(opts.color ?? INK))
    const lines = doc.splitTextToSize(str, width) as string[]
    for (const line of lines) {
      checkPage(lineGap)
      doc.text(line, x, y + size * 0.8)
      y += lineGap
    }
  }

  function spacer(h: number) {
    checkPage(h)
    y += h
  }

  function sectionHeading(label: string, minNextSpace = 20) {
    spacer(8)
    checkPage(minNextSpace)
    doc.setFillColor(...AMBER)
    doc.rect(MARGIN, y, 7, 7, "F")
    doc.setFont("helvetica", "bold")
    doc.setFontSize(10.5)
    doc.setTextColor(...INK)
    doc.text(label.toUpperCase(), MARGIN + 13, y + 7)
    y += 15
    doc.setDrawColor(...RULE)
    doc.setLineWidth(0.75)
    doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y)
    y += 10
  }

  function metricRow(metric: Metric) {
    checkPage(13)
    const size = 8.5
    doc.setFontSize(size)
    let x = MARGIN

    doc.setFont("helvetica", "normal")
    doc.setTextColor(...GRAPHITE)
    doc.text(`${metric.label}:  `, x, y + size * 0.8)
    x += doc.getTextWidth(`${metric.label}:  `)

    doc.setFont("helvetica", "bold")
    doc.setTextColor(...DIFF_REMOVE)
    const fromLabel = metric.from
    doc.text(fromLabel, x, y + size * 0.8)
    const fromWidth = doc.getTextWidth(fromLabel)
    doc.setDrawColor(...DIFF_REMOVE)
    doc.setLineWidth(0.7)
    doc.line(x, y + size * 0.45, x + fromWidth, y + size * 0.45)
    x += fromWidth + 8

    doc.setFont("helvetica", "normal")
    doc.setTextColor(...GRAPHITE)
    doc.text("->", x, y + size * 0.8)
    x += doc.getTextWidth("->") + 8

    doc.setFont("helvetica", "bold")
    doc.setTextColor(...DIFF_ADD)
    doc.text(metric.to, x, y + size * 0.8)

    y += 12.5
  }

  // ---- Header band ----
  doc.setFillColor(...INK)
  doc.rect(0, 0, PAGE_WIDTH, HEADER_HEIGHT, "F")

  doc.setFont("helvetica", "bold")
  doc.setFontSize(21)
  doc.setTextColor(255, 255, 255)
  doc.text(data.profile.name, MARGIN, 38)

  doc.setFont("helvetica", "normal")
  doc.setFontSize(10.5)
  doc.setTextColor(...AMBER)
  doc.text(data.profile.role, MARGIN, 56)

  doc.setFontSize(8.5)
  doc.setTextColor(...PAPER)
  const contactLine = `${data.profile.email}   ·   ${data.profile.github.replace("https://", "")}   ·   ${data.profile.linkedin.replace("https://", "")}   ·   ${data.profile.location}`
  doc.text(contactLine, MARGIN, 74)

  y = HEADER_HEIGHT + 18

  // ---- Summary ----
  paragraph(data.profile.summary, { size: 9.0, color: INK, gap: 12.2 })

  // ---- Experience ----
  sectionHeading("Experience")
  data.experience.forEach((job, i) => {
    checkPage(28)
    doc.setFont("helvetica", "bold")
    doc.setFontSize(10.5)
    doc.setTextColor(...INK)
    doc.text(`${job.company}`, MARGIN, y + 8.5)
    const companyWidth = doc.getTextWidth(`${job.company}   `)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(...GRAPHITE)
    doc.text(job.role, MARGIN + companyWidth, y + 8.5)
    y += 14

    doc.setFont("helvetica", "italic")
    doc.setFontSize(8.2)
    doc.setTextColor(...GRAPHITE)
    doc.text(`${job.period}   ·   ${job.location}`, MARGIN, y + 6.5)
    y += 13

    for (const line of job.highlights) {
      paragraph(`•  ${line}`, { size: 8.75, color: INK, gap: 11.8 })
    }

    if (job.metrics) {
      spacer(2)
      for (const m of job.metrics) metricRow(m)
    }

    if (i < data.experience.length - 1) spacer(8)
  })

  // ---- Featured Projects ----
  if (data.projects && data.projects.length > 0) {
    sectionHeading("Featured AI & Systems Projects")
    data.projects.forEach((proj, idx) => {
      checkPage(20)
      doc.setFont("helvetica", "bold")
      doc.setFontSize(9.8)
      doc.setTextColor(...INK)
      doc.text(proj.name, MARGIN, y + 8)
      const nameWidth = doc.getTextWidth(proj.name + "  ")

      doc.setFont("helvetica", "normal")
      doc.setFontSize(8.5)
      doc.setTextColor(...GRAPHITE)
      doc.text(`·  ${proj.tag}`, MARGIN + nameWidth, y + 8)
      y += 13

      paragraph(proj.description, { size: 8.5, color: INK, gap: 11.5 })
      if (proj.highlights) {
        for (const h of proj.highlights) {
          paragraph(`•  ${h}`, { size: 8.5, color: INK, gap: 11.5 })
        }
      }
      if (idx < (data.projects?.length ?? 0) - 1) spacer(5)
    })
  }

  // ---- Skills (table) ----
  sectionHeading("Skills", 60)
  autoTable(doc, {
    startY: y,
    margin: { left: MARGIN, right: MARGIN },
    theme: "grid",
    head: [["Category", "Skills"]],
    body: data.skillCategories.map((c) => [c.name, c.skills.map((s) => s.name).join(", ")]),
    headStyles: { fillColor: INK, textColor: [255, 255, 255], fontStyle: "bold", fontSize: 8.2 },
    bodyStyles: { textColor: INK, fontSize: 7.8, cellPadding: 4.5, lineColor: RULE, lineWidth: 0.5 },
    alternateRowStyles: { fillColor: [246, 247, 244] },
    columnStyles: {
      0: { cellWidth: 135, fontStyle: "bold", textColor: INK },
      1: { textColor: GRAPHITE },
    },
  })
  // @ts-expect-error - lastAutoTable attached at runtime
  y = doc.lastAutoTable.finalY + 14

  // ---- Education (table) ----
  sectionHeading("Education", 50)
  autoTable(doc, {
    startY: y,
    margin: { left: MARGIN, right: MARGIN },
    theme: "grid",
    head: [["School", "Degree", "Period", "Grade"]],
    body: data.education.map((e) => [e.school, `${e.degree}, ${e.area}`, e.period, e.grade]),
    headStyles: { fillColor: INK, textColor: [255, 255, 255], fontStyle: "bold", fontSize: 8.2 },
    bodyStyles: { textColor: INK, fontSize: 7.8, cellPadding: 4.5, lineColor: RULE, lineWidth: 0.5 },
    alternateRowStyles: { fillColor: [246, 247, 244] },
    columnStyles: { 2: { cellWidth: 85 }, 3: { cellWidth: 65 } },
  })
  // @ts-expect-error - lastAutoTable attached at runtime
  y = doc.lastAutoTable.finalY + 14

  // ---- Certifications (table) ----
  sectionHeading("Certifications", 40)
  autoTable(doc, {
    startY: y,
    margin: { left: MARGIN, right: MARGIN },
    theme: "grid",
    head: [["Title", "Issuer", "Year"]],
    body: data.certifications.map((c) => [c.title, c.issuer, c.year]),
    headStyles: { fillColor: INK, textColor: [255, 255, 255], fontStyle: "bold", fontSize: 8.2 },
    bodyStyles: { textColor: INK, fontSize: 7.8, cellPadding: 4.5, lineColor: RULE, lineWidth: 0.5 },
    alternateRowStyles: { fillColor: [246, 247, 244] },
    columnStyles: { 2: { cellWidth: 65 } },
  })
  // @ts-expect-error - lastAutoTable attached at runtime
  y = doc.lastAutoTable.finalY + 14

  // ---- Footer ----
  const pageCount = doc.getNumberOfPages()
  for (let p = 1; p <= pageCount; p++) {
    doc.setPage(p)
    doc.setDrawColor(...RULE)
    doc.setLineWidth(0.5)
    doc.line(MARGIN, PAGE_HEIGHT - 24, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 24)
    doc.setFont("helvetica", "normal")
    doc.setFontSize(7.5)
    doc.setTextColor(...GRAPHITE)
    doc.text("vaibhava17.github.io", MARGIN, PAGE_HEIGHT - 14)
    doc.text(`${p} / ${pageCount}`, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 14, { align: "right" })
  }

  return new Uint8Array(doc.output("arraybuffer"))
}
