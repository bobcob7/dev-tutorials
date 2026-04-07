Apply all pending lessons from `.claude/lessons/` to the tutorial system, then
delete the lesson files.

---

## Files that can receive lessons

| File | What it controls |
|---|---|
| `.claude/skills/add-tutorial/SKILL.md` | Instructions agents follow when creating tutorials |
| `.claude/skills/add-tutorial/template.md` | Starter MDX template for new tutorials |
| `CONTRIBUTING.md` | Human-readable authoring guide |
| `src/content.config.ts` | Frontmatter schema (field additions/changes) |
| `src/styles/global.css` | CSS classes available in MDX (callouts, etc.) |

Other files may be updated if a lesson explicitly names them.

---

## Process

**1. Find lessons**

Glob `.claude/lessons/*.md`, excluding `README.md`. If the result is empty, report
"No pending lessons." and stop.

**2. Read each lesson**

For every lesson file:
- Read the `affects` frontmatter to know which files need changes
- Read the lesson body to understand what specifically needs to change

**3. Apply changes**

For each affected file:
- Read the current file content
- Make the minimal targeted edit described by the lesson — do not rewrite sections
  that aren't mentioned
- Prefer adding or modifying over deleting unless the lesson says to remove something

**4. Delete lesson files**

After all changes are applied, delete every `.md` file in `.claude/lessons/` except
`README.md`.

**5. Report**

Output a summary:
```
Applied N lesson(s):

- mdx-jsx-attributes.md
  → .claude/skills/add-tutorial/SKILL.md  (promoted warning block)
  → .claude/skills/add-tutorial/template.md  (added inline comment)
  → CONTRIBUTING.md  (added JSX explanation sentence)
```

---

## Rules

- Apply lessons faithfully — don't editorialize or add unrequested changes
- If a lesson is ambiguous, make the most conservative interpretation
- If a lesson references a section or line that no longer exists, skip that part
  and note it in the report
- Never modify `.claude/lessons/README.md`
- Run `npm run build` after all changes to confirm nothing is broken; fix any
  errors before finishing
