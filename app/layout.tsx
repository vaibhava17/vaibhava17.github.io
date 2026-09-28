import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "Vaibhav Agarwal — Software Engineer",
  description:
    "Vaibhav Agarwal builds production SaaS, AI agents and developer tools. SDE II at Solfin, builder of Hortiprise.",
  metadataBase: new URL("https://vaibhava17.github.io"),
  openGraph: {
    title: "Vaibhav Agarwal — Software Engineer",
    description: "Production SaaS, AI agents and developer tools. Built to ship, not to demo.",
    type: "website",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbfbfd",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${mono.variable}`} data-tone="light">
        {children}
      </body>
    </html>
  )
}
