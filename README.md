# vaibhava17.github.io

Portfolio of Vaibhav Agarwal, live at https://vaibhava17.github.io.

Next.js 14 static export, deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Editing content

All facts live in `lib/data.ts`: profile, experience, projects, skills, education. The site and the
downloadable résumé (`lib/resume-pdf.ts`) both read it, so one edit updates both.

`lib/site.ts` only controls presentation: which four projects get a scroll-driven chapter, each
chapter's accent colour and headline, and the numbers in the Impact section.

## Structure

- `components/site/` — one file per section, in page order (`app/page.tsx`)
- `components/site/viz/` — the four project diagrams; each takes a 0→1 scroll progress value
- `components/site/tone.tsx` — repaints the page light/dark and sets the accent as sections reach mid-screen

## Commands

```sh
npm install --legacy-peer-deps
npm run dev        # http://localhost:3000
npm run build      # static site in out/
npm run resume     # writes resume-preview.pdf from lib/data.ts
```
