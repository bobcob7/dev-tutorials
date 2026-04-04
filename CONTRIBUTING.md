# Adding a Tutorial

Anyone can add a tutorial. This document explains the structure and conventions.

## Quick start

1. Create a folder under `src/content/tutorials/your-tutorial-slug/`
2. Add an `index.mdx` file with the required frontmatter
3. Write your content in Markdown/MDX
4. Open a pull request

## Frontmatter

Every tutorial requires this frontmatter block at the top of `index.mdx`:

```yaml
---
title: "Short, descriptive title"
description: "One or two sentences explaining what the reader will build or learn."
difficulty: beginner        # beginner | intermediate | advanced
topics: ["C++", "OpenRCT2"] # array of relevant tags shown on the card
publishDate: 2026-04-03     # ISO date — the day you're publishing
repo: "https://github.com/..."  # optional: link to the repo the tutorial is about
---
```

### Difficulty guide

| Level | Who it's for |
|---|---|
| `beginner` | Someone new to the codebase or language. Hand-holds through concepts. |
| `intermediate` | Assumes comfort with the language; focuses on patterns and architecture. |
| `advanced` | Assumes deep familiarity; covers complex subsystems or cross-cutting changes. |

## File structure

```
src/content/tutorials/
└── your-tutorial-slug/
    └── index.mdx          ← required
```

Multi-page tutorials are not currently supported — keep everything in `index.mdx`.
Use a clear heading hierarchy (`##` for major sections, `###` for subsections)
so the table of contents is generated automatically.

## Writing style

- Write for a **novice** unless the difficulty is explicitly `advanced`
- Explain **why** a file lives where it does, not just what to change
- Show the **before** state of code before showing the change
- Use callouts for important notes (see below)
- Include links to specific lines in GitHub using permalinks (point to a fixed commit SHA, not `main`)

## MDX components

You can use JSX-style HTML inside `.mdx` files. The site's global CSS provides
these utility classes.

> **Important:** MDX follows JSX rules — always use `className=` not `class=`,
> and `htmlFor=` not `for=`. Using `class=` will break the build.

### Callouts

```html
<div className="callout callout-tip">
  <span className="callout-title">Tip</span>
  <p>Some helpful advice here.</p>
</div>
```

Available variants: `callout-info`, `callout-tip`, `callout-warning`

## Search

Tutorials are indexed by [Pagefind](https://pagefind.app) at build time.
Everything inside the tutorial content area is searchable automatically —
no extra configuration needed.

## Local development

```bash
npm install
npm run dev      # dev server (search won't work — needs a build)
npm run build    # full build + generates search index
npm run preview  # preview the built site with search working
```

## Deployment

The site deploys automatically to Cloudflare Pages on every push to `main`.
The build command is `npm run build` and the output directory is `dist`.
