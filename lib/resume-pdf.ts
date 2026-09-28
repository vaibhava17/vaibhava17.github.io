import { jsPDF } from "jspdf"
import { autoTable } from "jspdf-autotable"
import {
  profile,
  experience,
  skillCategories,
  education,
  certifications,
  links,
  type Metric,
} from "./data.ts"

const PAGE_WIDTH = 612 // US Letter, pt
const PAGE_HEIGHT = 792
const MARGIN = 40
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2
const HEADER_HEIGHT = 96

const INK: [number, number, number] = [16, 20, 31]
const PAPER: [number, number, number] = [237, 239, 234]
const GRAPHITE: [number, number, number] = [91, 97, 105]
const AMBER: [number, number, number] = [232, 163, 61]
const DIFF_ADD: [number, number, number] = [63, 143, 95]
const DIFF_REMOVE: [number, number, number] = [166, 75, 65]
const RULE: [number, number, number] = [222, 223, 217]

/** Builds the resume PDF from lib/data.ts. Runs in Node or the browser (jsPDF + autotable). */
export async function buildResumePdf(): Promise<Uint8Array> {
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
    const size = opts.size ?? 9.5
    const x = opts.x ?? MARGIN
    const width = opts.width ?? CONTENT_WIDTH - (x - MARGIN)
    const lineGap = opts.gap ?? size * 1.35
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

  function sectionHeading(label: string) {
    spacer(10)
    checkPage(20)
    doc.setFillColor(...AMBER)
    doc.rect(MARGIN, y, 7, 7, "F")
    doc.setFont("helvetica", "bold")
    doc.setFontSize(10.5)
    doc.setTextColor(...INK)
    doc.text(label.toUpperCase(), MARGIN + 13, y + 7)
    y += 16
    doc.setDrawColor(...RULE)
    doc.setLineWidth(0.75)
    doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y)
    y += 12
  }

  function metricRow(metric: Metric) {
    checkPage(14)
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

    y += 13
  }

  // ---- Header band ----
  doc.setFillColor(...INK)
  doc.rect(0, 0, PAGE_WIDTH, HEADER_HEIGHT, "F")

  doc.setFont("helvetica", "bold")
  doc.setFontSize(22)
  doc.setTextColor(255, 255, 255)
  doc.text(profile.name, MARGIN, 40)

  doc.setFont("helvetica", "normal")
  doc.setFontSize(11)
  doc.setTextColor(...AMBER)
  doc.text(profile.role, MARGIN, 58)

  doc.setFontSize(9)
  doc.setTextColor(...PAPER)
  const contactLine = `${profile.email}   ·   ${links.github.replace("https://", "")}   ·   ${links.linkedin.replace("https://", "")}   ·   ${profile.location}`
  doc.text(contactLine, MARGIN, 76)

  y = HEADER_HEIGHT + 22

  // ---- Summary ----
  paragraph(profile.summary, { size: 9.5, color: INK, gap: 13 })

  // ---- Experience ----
  sectionHeading("Experience")
  experience.forEach((job, i) => {
    checkPage(30)
    doc.setFont("helvetica", "bold")
    doc.setFontSize(11)
    doc.setTextColor(...INK)
    doc.text(`${job.company}`, MARGIN, y + 8.8)
    const companyWidth = doc.getTextWidth(`${job.company}   `)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(...GRAPHITE)
    doc.text(job.role, MARGIN + companyWidth, y + 8.8)
    y += 15

    doc.setFont("helvetica", "italic")
    doc.setFontSize(8.5)
    doc.setTextColor(...GRAPHITE)
    doc.text(`${job.period}   ·   ${job.location}`, MARGIN, y + 7)
    y += 14

    for (const line of job.highlights.slice(0, 4)) {
      paragraph(`•  ${line}`, { size: 9, color: INK, gap: 12.2 })
    }

    if (job.metrics) {
      spacer(2)
      for (const m of job.metrics) metricRow(m)
    }

    if (i < experience.length - 1) spacer(10)
  })

  // ---- Skills (table) ----
  sectionHeading("Skills")
  autoTable(doc, {
    startY: y,
    margin: { left: MARGIN, right: MARGIN },
    theme: "grid",
    head: [["Category", "Skills"]],
    body: skillCategories.map((c) => [c.name, c.skills.map((s) => s.name).join(", ")]),
    headStyles: { fillColor: INK, textColor: [255, 255, 255], fontStyle: "bold", fontSize: 8.5 },
    bodyStyles: { textColor: INK, fontSize: 8, cellPadding: 6, lineColor: RULE, lineWidth: 0.5 },
    alternateRowStyles: { fillColor: [246, 247, 244] },
    columnStyles: {
      0: { cellWidth: 140, fontStyle: "bold", textColor: INK },
      1: { textColor: GRAPHITE },
    },
  })
  // @ts-expect-error - lastAutoTable is attached at runtime by jspdf-autotable
  y = doc.lastAutoTable.finalY + 18

  // ---- Education (table) ----
  sectionHeading("Education")
  autoTable(doc, {
    startY: y,
    margin: { left: MARGIN, right: MARGIN },
    theme: "grid",
    head: [["School", "Degree", "Period", "Grade"]],
    body: education.map((e) => [e.school, `${e.degree}, ${e.area}`, e.period, e.grade]),
    headStyles: { fillColor: INK, textColor: [255, 255, 255], fontStyle: "bold", fontSize: 8.5 },
    bodyStyles: { textColor: INK, fontSize: 8, cellPadding: 6, lineColor: RULE, lineWidth: 0.5 },
    alternateRowStyles: { fillColor: [246, 247, 244] },
    columnStyles: { 2: { cellWidth: 90 }, 3: { cellWidth: 70 } },
  })
  // @ts-expect-error - lastAutoTable is attached at runtime by jspdf-autotable
  y = doc.lastAutoTable.finalY + 18

  // ---- Certifications (table) ----
  sectionHeading("Certifications")
  autoTable(doc, {
    startY: y,
    margin: { left: MARGIN, right: MARGIN },
    theme: "grid",
    head: [["Title", "Issuer", "Year"]],
    body: certifications.map((c) => [c.title, c.issuer, c.year]),
    headStyles: { fillColor: INK, textColor: [255, 255, 255], fontStyle: "bold", fontSize: 8.5 },
    bodyStyles: { textColor: INK, fontSize: 8, cellPadding: 6, lineColor: RULE, lineWidth: 0.5 },
    alternateRowStyles: { fillColor: [246, 247, 244] },
    columnStyles: { 2: { cellWidth: 70 } },
  })
  // @ts-expect-error - lastAutoTable is attached at runtime by jspdf-autotable
  y = doc.lastAutoTable.finalY + 16

  // ---- Footer ----
  const pageCount = doc.getNumberOfPages()
  for (let p = 1; p <= pageCount; p++) {
    doc.setPage(p)
    doc.setDrawColor(...RULE)
    doc.setLineWidth(0.5)
    doc.line(MARGIN, PAGE_HEIGHT - 28, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 28)
    doc.setFont("helvetica", "normal")
    doc.setFontSize(7.5)
    doc.setTextColor(...GRAPHITE)
    doc.text("vaibhava17.github.io", MARGIN, PAGE_HEIGHT - 17)
    doc.text(`${p} / ${pageCount}`, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 17, { align: "right" })
  }

  return new Uint8Array(doc.output("arraybuffer"))
}
