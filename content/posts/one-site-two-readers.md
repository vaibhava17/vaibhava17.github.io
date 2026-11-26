---
title: One site, two readers: building a portfolio for humans and machines
date: 2026-11-26
type: blog
tags: [llms.txt, SEO, Next.js, AI agents, portfolio]
summary: My portfolio now has a Human / Machine switch. Same facts, two renderings: a page for people and plain Markdown for the agents that increasingly read it first.
---

A recruiter used to read my site. Now, more often than not, an agent reads it first and summarises it for them. A search crawler, a chat assistant asked "who is this person", a hiring tool scoring profiles. They all get the same thing a person gets: a React page full of animation, nav, and layout they have to strip away before they reach a single fact.

Docker's new site has a small switch at the top: view the page as a human or as a machine. I liked the honesty of it, so I built the same thing here.

## What the switch does

Flip it to **Machine** (or open `?view=machine`) and the page becomes its own source: the whole profile as raw Markdown, with line numbers, front matter, and links to the files an agent can fetch directly. Nothing is hidden or added. It is the same data, shown the way a model will actually consume it.

Behind the switch there are real files, not just a styled view:

- `/index.md`: the full profile as one Markdown document
- `/llms.txt`: a short index for AI agents, following the [llms.txt](https://llmstxt.org) convention
- `/llms-full.txt`: everything, posts included, in one file
- `/profile.json`: the same facts as structured data

The HTML page points at them too, with `<link rel="alternate" type="text/markdown">`, so a crawler that lands on the page can find the clean version without guessing.

## One source of truth

The rule I cared about most: **the two views can never disagree.** Every fact lives in one TypeScript file. The human sections render it as components. A small generator renders the same objects as Markdown at build time. The JSON endpoint, the structured data, and the resume PDF all read the same file.

If I change my role in one place, the page, the Markdown, `llms.txt`, the JSON-LD and the resume all change with it. There is no second copy to forget.

## SEO, done properly this time

While I was in there I fixed what an audit of my own site turned up:

- no `robots.txt`, no sitemap, no canonical URL
- no Open Graph or Twitter card, so every shared link looked bare
- a description that still showed an old job title
- no structured data saying who the page is about

Now there is a `Person` / `WebSite` / `ProfilePage` JSON-LD graph, a proper preview card, a sitemap, and robots rules that welcome AI crawlers instead of ignoring them.

## Small things that bit me

- The site is a static export on GitHub Pages. Next.js's built-in `sitemap.ts` needs extra setup under static export, so the sitemap is a plain route handler, the same way the JSON profile already worked.
- A generated Open Graph image route gets written without a `.png` extension in a static export, and GitHub Pages then serves it with the wrong type. A static `og.png` is boring and works everywhere.
- The machine view reads the URL, not local storage, so either view can be linked and shared.

## Why bother

A portfolio is a document about you that you do not control the reading of. More and more of that reading is done by models. Giving them a clean, honest, single-source version is the same courtesy as writing good alt text: cheap, and it makes you legible to the reader you did not design for.

Try the switch in the nav.
