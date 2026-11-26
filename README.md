# heyvaibhav.dev

Personal site of **Vaibhav Agarwal**, AI Lead and senior backend engineer. Live at **[heyvaibhav.dev](https://heyvaibhav.dev)**.

The site has two views of the same facts:

| View        | For                                | Where                                                                |
| ----------- | ---------------------------------- | -------------------------------------------------------------------- |
| **Human**   | people                             | [heyvaibhav.dev](https://heyvaibhav.dev)                             |
| **Machine** | LLMs, recruiters' agents, crawlers | [heyvaibhav.dev/?view=machine](https://heyvaibhav.dev/?view=machine) |

The Human / Machine switch in the nav swaps the page for its raw Markdown, with links to the files an agent can fetch directly.

## Machine-readable endpoints

All generated at build time from [`lib/data.ts`](lib/data.ts), so they never drift from the page.

| Path                                                     | Format             | What                                                           |
| -------------------------------------------------------- | ------------------ | -------------------------------------------------------------- |
| [`/index.md`](https://heyvaibhav.dev/index.md)           | `text/markdown`    | The whole profile as one Markdown document                     |
| [`/llms.txt`](https://heyvaibhav.dev/llms.txt)           | `text/plain`       | Short index for AI agents ([llmstxt.org](https://llmstxt.org)) |
| [`/llms-full.txt`](https://heyvaibhav.dev/llms-full.txt) | `text/plain`       | Everything in one file                                         |
| [`/profile.json`](https://heyvaibhav.dev/profile.json)   | `application/json` | The same facts as structured data                              |
| [`/sitemap.xml`](https://heyvaibhav.dev/sitemap.xml)     | `application/xml`  | Sitemap                                                        |
| [`/robots.txt`](https://heyvaibhav.dev/robots.txt)       | `text/plain`       | Crawl rules (AI crawlers welcome; `/v2` unlisted)              |

The HTML page also carries:

- `<link rel="alternate" type="text/markdown" href="/index.md">` and the JSON equivalent
- schema.org JSON-LD (`Person`, `WebSite`, `ProfilePage`)
- Open Graph and Twitter cards with a 1200×630 preview image (`public/og.png`)
- a canonical URL

## Editing content

Change **[`lib/data.ts`](lib/data.ts)** only. The human sections, the Markdown, `llms.txt`, `profile.json`, JSON-LD and the resume PDF all read from it.

| File                                          | Role                                                          |
| --------------------------------------------- | ------------------------------------------------------------- |
| [`lib/data.ts`](lib/data.ts)                  | Single source of truth: profile, experience, projects, skills |
| [`lib/markdown.ts`](lib/markdown.ts)          | Renders `data.ts` as Markdown and `llms.txt`                  |
| [`lib/seo.ts`](lib/seo.ts)                    | Site URL, title, description, keywords, JSON-LD               |
| [`app/layout.tsx`](app/layout.tsx)            | Metadata (Open Graph, alternates, robots) + JSON-LD           |
| [`components/view/`](components/view)         | Human / Machine toggle and the Markdown viewer                |
| [`components/sections/`](components/sections) | The human page                                                |

The preview image `public/og.png` is a static file. Regenerate it if the name, role or headline change.

## Stack

Next.js 14 (App Router, `output: "export"`), React 18, TypeScript, Tailwind CSS, Framer Motion, IBM Plex. Static files on GitHub Pages behind the custom domain in [`CNAME`](CNAME).

## Develop

```bash
npm ci --legacy-peer-deps
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
```

## Deploy

Manual only (no deploy on push):

```bash
gh workflow run deploy.yml -R vaibhava17/vaibhava17.github.io
```

The workflow builds the static export and publishes `out/` to GitHub Pages.
