import Content from "../content/content";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `${Content.URL}/sitemap.xml`,
  };
}
