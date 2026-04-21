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
series: my-series-slug      # optional: links this tutorial to a series
seriesOrder: 1              # optional: position in the series (1-based)
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

Use a clear heading hierarchy (`##` for major sections, `###` for subsections)
so the table of contents is generated automatically.

## Tutorial series

Tutorials can be grouped into a **series** — an ordered sequence with a shared
landing page, breadcrumb navigation, prev/next buttons, and progress tracking.

### Adding a tutorial to an existing series

Set `series` and `seriesOrder` in the frontmatter:

```yaml
series: rust-macroquad-asteroid-dodger
seriesOrder: 5
```

The tutorial automatically gets:
- A **breadcrumb** at the top linking back to the series landing page
- **Prev/next** buttons at the bottom linking to adjacent tutorials
- A **progress bar** with checkboxes on each step heading
- Inclusion in the **series landing page** tutorial list

Shared prerequisites belong on the series landing page, not on individual
tutorials. Individual tutorials should only note their immediate dependency.

### Creating a new series

1. Create `src/content/series/your-series-slug/index.mdx`:

```yaml
---
title: "Series Title"
description: "What the reader will build across the whole series."
topics: ["Tag1", "Tag2"]
difficulty: "beginner → advanced"
publishDate: 2026-04-12
---
```

2. The MDX body becomes the series landing page. Include shared prerequisites
   using skill pills and tool cards (see Components below).
3. The tutorial list is auto-generated from all tutorials with a matching
   `series` field, sorted by `seriesOrder`.
4. The series gets its own URL at `/series/your-series-slug/`.

## Progress tracking

The site has built-in local progress tracking using `localStorage`. It works
automatically — no configuration needed per tutorial.

### How it works

- Every `### Step N —` heading (h3) or `## Step N —` heading (h2 in standalone
  tutorials) gets a clickable checkbox injected by JavaScript at runtime.
- A progress bar appears below the tutorial metadata showing step completion.
- Milestone headings (h2) show a green checkmark when all child steps are done.
- Progress persists across browser sessions via `localStorage`.

### What's tracked

| Key | Value | When |
|---|---|---|
| `tutorial-progress:{slug}` | `{ stepId: boolean }` | On checkbox toggle |
| `tutorial-version:{slug}` | Comma-joined step IDs | On page load |
| `tutorial-steps:{slug}` | Step ID array | On page load |
| `tutorial-bookmark:{slug}` | First incomplete step ID | On checkbox toggle |
| `tutorial-complete:{slug}` | Timestamp | When all steps checked |
| `series-last:{series}` | Tutorial slug | On checkbox toggle |

### Reconciliation

When tutorial content changes (steps added, removed, or renamed), the stored
progress is reconciled on next visit: unchanged steps keep their checkmarks,
orphaned entries are dropped, and new steps start unchecked.

### Series progress

Series landing pages show two progress bars:
- **Tutorials complete** — how many tutorials are fully checked off
- **Current tutorial steps** — step progress in the next incomplete tutorial

The home page shows a "Continue reading" card with the same two bars and a
link that jumps directly to the first incomplete step. Cards can be dismissed;
dismissals auto-clear when new progress is made.

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
> and `htmlFor=` not `for=`. Using `class=` will break the build with an
> acorn parse error. MDX compiles to JSX, so HTML attribute names must follow
> JSX conventions.

### Callouts

```html
<div className="callout callout-tip">
  <span className="callout-title">Tip</span>
  <p>Some helpful advice here.</p>
</div>
```

Available variants: `callout-info`, `callout-tip`, `callout-warning`

### Step badges

```html
<span className="step-badge">Milestone 1 of 3</span>
```

### Steps overview grid

```html
<div className="steps-grid">
  <div className="step-card">
    <span className="step-num">Step 1</span>
    <span className="step-name">Name</span>
    <span className="step-desc">Description</span>
  </div>
</div>
```

### Skill pills (for prerequisites)

```html
<div className="skill-row">
  <span className="skill-pill skill-need">Required skill</span>
  <span className="skill-pill skill-noneed">Not needed</span>
</div>
```

### Tool cards (for prerequisites)

```html
<div className="tools-grid">
  <div className="tool-card">
    <span className="tool-name">Tool</span>
    <span className="tool-rec">version</span>
    <span className="tool-desc">Description</span>
  </div>
</div>
```

### Code block headers

Use when a code block maps to a specific file in a repo:

```html
<div className="code-block">
  <div className="code-header">
    <span className="code-filename">src/main.rs</span>
    <a className="code-link" href="https://github.com/...#L1-L10">View on GitHub →</a>
  </div>
  <!-- code fence goes here -->
</div>
```

### File reference

```html
<span className="file-ref">src/game.rs</span>
```

### Token highlighting

For manual syntax control in code blocks:

```html
<span class="token-keyword">enum</span>
<span class="token-add">+ new line</span>
<span class="token-remove">- old line</span>
```

Available: `.token-keyword`, `.token-comment`, `.token-string`, `.token-number`,
`.token-type`, `.token-fn`, `.token-add`, `.token-remove`

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

The site deploys automatically to Cloudflare Workers on every push to `main`.
The build command is `npm run build` and the output directory is `dist`.
