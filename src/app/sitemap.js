// src/app/sitemap.js
export default function sitemap() {
  return [
    {
      url: "https://vaibhava17.github.io",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://vaibhava17.github.io/#about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://vaibhava17.github.io/#projects",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://vaibhava17.github.io/#contact",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
