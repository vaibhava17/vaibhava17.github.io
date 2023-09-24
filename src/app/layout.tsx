import Content from "@/content";
import "./globals.css";
import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";

const fira_code = Fira_Code({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: Content.AUTHOR, template: "%s | Protfolio" },
  description: Content.APP_DESCRIPTION,
  applicationName: Content.APP_NAME,
  generator: "Next.js",
  keywords: Content.APP_KEYWORDS,
  authors: {
    name: Content.AUTHOR,
    url: Content.URL,
  },
  referrer: "origin-when-cross-origin",
  themeColor: [
    {
      media: "(prefers-color-scheme: dark)",
      color: Content.THEME_COLOR_PRIMARY_DARK,
    },
    {
      media: "(prefers-color-scheme: light)",
      color: Content.THEME_COLOR_PRIMARY_LIGHT,
    },
  ],
  colorScheme: "light dark",
  viewport: "width=device-width, initial-scale=1",
  creator: Content.AUTHOR,
  publisher: "Github Pages",
  robots: "follow, index",
  alternates: {
    canonical: Content.URL,
    types: {
      "application/atom+xml": [
        { url: "blogs", title: "Blogs" },
        { url: "projects", title: "Projects" },
      ],
    },
  },
  icons: [
    { rel: "icon", url: Content.APP_LOGO_LIGHT },
    {
      rel: "apple-touch-icon",
      url: Content.APP_LOGO_LIGHT,
    },
  ],
  manifest: `${Content.URL}/manifest.json`,
  openGraph: {
    type: "website",
    url: Content.URL,
    title: Content.AUTHOR,
    description: Content.APP_DESCRIPTION,
    siteName: Content.APP_NAME,
    images: [
      {
        url: Content.APP_LOGO_LIGHT,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={fira_code.className}>{children}</body>
    </html>
  );
}
