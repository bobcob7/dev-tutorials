---
name: add-tutorial
description: Create a new tutorial for the Dev Tutorials site. Use when asked to add, write, or create a tutorial on any topic.
argument-hint: "[tutorial topic or title]"
---

Create a new tutorial for the Dev Tutorials site located at the project root.

**Tutorial topic:** $ARGUMENTS

---

## Step 1 — Research

Use `WebFetch` and/or `WebSearch` to gather accurate, up-to-date information.
Prefer official documentation over blog posts. Note exact UI labels, button names,
and field values — readers will be following along live.

If the tutorial involves a web UI, use Playwright browser tools to capture screenshots
of the relevant steps. Save PNGs directly into the tutorial's content folder (Step 3).

---

## Step 2 — Choose a slug

The slug becomes the URL: `/tutorials/YOUR-SLUG`

- Lowercase, hyphenated: `deploy-to-vercel`, `setup-github-actions`
- 3–5 words max, no version numbers unless essential

---

## Step 3 — Create files

```
src/content/tutorials/YOUR-SLUG/
├── index.mdx
└── screenshot-name.png   ← only if screenshots were taken
```

---

## Step 4 — Frontmatter

All fields except `repo` are required:

```yaml
---
title: "Short, specific title (under 60 chars)"
description: "One or two sentences: what the reader will build or learn."
difficulty: beginner        # beginner | intermediate | advanced
topics: ["Tag1", "Tag2"]
publishDate: YYYY-MM-DD
repo: "https://github.com/owner/repo"  # omit if not applicable
---
```

Difficulty guide:

| Level | Audience |
|---|---|
| `beginner` | New to the concept — explain every step |
| `intermediate` | Comfortable with the language, unfamiliar with the patterns |
| `advanced` | Experienced; complex subsystems or cross-cutting changes |

---

## Step 5 — Content conventions

See [template.md](template.md) for a complete starter template.

**Structure:** Open with 1–2 sentences of context (no heading), then `##` for major
sections (appear in the TOC sidebar), `###` for subsections.

**Callouts** — three variants, always `className=` (never `class=`):

```html
<div className="callout callout-info">
  <span className="callout-title">Note</span>
  <p>General context or links.</p>
</div>

<div className="callout callout-tip">
  <span className="callout-title">Tip</span>
  <p>Helpful shortcut or recommendation.</p>
</div>

<div className="callout callout-warning">
  <span className="callout-title">Warning</span>
  <p>Something the reader must not miss.</p>
</div>
```

**Images** — Astro optimises them automatically at build time:

```mdx
![Description of what's shown](./screenshot-name.png)
```

**CRITICAL — MDX is JSX, not HTML:**

| HTML attribute | MDX/JSX |
|---|---|
| `class=` | `className=` |
| `for=` | `htmlFor=` |
| `style="color:red"` | `style={{ color: "red" }}` |

Using `class=` breaks the build with an acorn parse error.

---

## Step 6 — Verify

```bash
npm run build
```

The build must complete with:
- No errors
- Your new page listed under `generating static routes`
- Pagefind word count increased

Fix any errors before finishing.

---

## Step 7 — Record lessons

If you discovered anything about *how this tutorial system works* that future agents
or authors should know — a build gotcha, a missing convention, an undocumented
constraint — write a lesson file:

```
.claude/lessons/short-kebab-title.md
```

Format:
```markdown
---
affects: [comma-separated list of files that need updating]
---

# [Short lesson title]

[What was discovered and why it matters.]

## What to change

- **File, section:** Specific change needed
```

Lessons are about the **system**, not tutorial content. Run `/apply-lessons` to
apply pending lessons and clean up the files.
