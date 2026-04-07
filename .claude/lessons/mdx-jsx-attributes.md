---
affects: .claude/skills/add-tutorial/SKILL.md, .claude/skills/add-tutorial/template.md, CONTRIBUTING.md
---

# MDX silently accepts class= in some editors but breaks the build

Editors and linters don't always flag `class=` in `.mdx` files because they treat
the file as Markdown. The error only surfaces at build time as an acorn parse
failure with no clear pointer to the offending line.

The current SKILL.md mentions this rule once in a table. It should be elevated to
a dedicated warning block so it's harder to miss, and the template should include
an inline comment as a reminder.

## What to change

- **SKILL.md, Step 5 MDX rule:** Promote the JSX attribute table into a
  `callout-warning` block so it stands out visually rather than sitting in a table.
- **template.md:** Add an MDX comment `{/* className= not class= */}` above the
  first callout div as a point-of-use reminder.
- **CONTRIBUTING.md:** The current callout example already uses `className=` but
  the surrounding prose doesn't explain *why*. Add one sentence: "MDX compiles to
  JSX, so HTML attribute names must follow JSX conventions."
