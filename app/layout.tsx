import type React from "react"
import type { Metadata, Viewport } from "next"
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { KEYWORDS, SITE_DESCRIPTION, SITE_TITLE, SITE_URL, jsonLd } from "@/lib/seo"
import { profile } from "@/lib/data"
import "./globals.css"

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
})

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${profile.name}` },
  description: SITE_DESCRIPTION,
  keywords: KEYWORDS,
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  alternates: {
    canonical: "/",
    // the same page for machines: Markdown + JSON (also linked from /llms.txt)
    types: { "text/markdown": "/index.md", "application/json": "/profile.json" },
  },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_IN",
    firstName: "Vaibhav",
    lastName: "Agarwal",
    username: "vaibhava17",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${profile.name}: ${profile.role}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plexSans.variable} ${plexMono.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
