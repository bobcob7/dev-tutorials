# Lessons

Drop a `.md` file here whenever you discover something about *how this tutorial
system works* that should change the skills, templates, or documentation.

**Lessons are about the system, not tutorial content.**

Good lesson subjects:
- A build rule or gotcha that `add-tutorial` doesn't warn about
- A convention that `template.md` should model
- A workflow step that `CONTRIBUTING.md` is missing
- A new callout variant, CSS class, or frontmatter field added to the site

Not a lesson (specific content):
- "Cloudflare Pages uses Node 22" — that belongs in the Cloudflare tutorial itself
- "OpenRCT2 uses CMake" — that belongs in the OpenRCT2 tutorial

## File format

```markdown
---
affects: .claude/skills/add-tutorial/SKILL.md, CONTRIBUTING.md
---

# [Short lesson title]

[What was discovered and why it matters to future tutorial authors or agents.]

## What to change

- **File A, section X:** [Specific change needed]
- **File B:** [Specific change needed]
```

The `affects` frontmatter lists the files that need updating.
Run `/apply-lessons` to apply all pending lessons and delete the files.
