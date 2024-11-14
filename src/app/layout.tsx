import Content from "@/content";
import "../styles/globals.css";
import type { Metadata, Viewport } from "next";
import { Fira_Code } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";

const fira_code = Fira_Code({ subsets: ["latin"] });

export const viewport: Viewport = {
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
};

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
  // viewport: "width=device-width, initial-scale=1",
  creator: Content.AUTHOR,
  publisher: "Github Pages",
  robots: "follow, index",
  alternates: {
    canonical: Content.URL,
    types: {
      "application/atom+xml": [
        { url: `${Content.URL}/blogs`, title: "Blogs" },
        { url: `${Content.URL}/projects`, title: "Projects" },
      ],
    },
  },
  icons: [
    { rel: "icon", url: `${Content.URL}/logo-light.svg` },
    {
      rel: "apple-touch-icon",
      url: `${Content.URL}/logo-light.svg`,
    },
  ],
  // manifest: `${Content.URL}/manifest.json`,
  openGraph: {
    type: "website",
    url: Content.URL,
    title: Content.AUTHOR,
    description: Content.APP_DESCRIPTION,
    siteName: Content.APP_NAME,
    images: [
      {
        url: `${Content.URL}/main.png`,
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
