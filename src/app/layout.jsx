// src/app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ui/theme-provider";
import { cn } from "../lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Vaibhav Agarwal - Software Development Engineer",
  description:
    "Passionate software engineer specializing in React, Python, and modern web technologies. Building scalable applications with LLM integrations.",
  keywords: [
    "Software Engineer",
    "React Developer",
    "Frontend Developer",
    "Full Stack Developer",
    "JavaScript",
    "Python",
    "Next.js",
  ],
  authors: [{ name: "Vaibhav Agarwal" }],
  creator: "Vaibhav Agarwal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vaibhava17.github.io",
    title: "Vaibhav Agarwal - Software Development Engineer",
    description:
      "Passionate software engineer specializing in React, Python, and modern web technologies.",
    siteName: "Vaibhav Agarwal Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vaibhav Agarwal - Software Development Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaibhav Agarwal - Software Development Engineer",
    description:
      "Passionate software engineer specializing in React, Python, and modern web technologies.",
    creator: "@heyvybav",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
