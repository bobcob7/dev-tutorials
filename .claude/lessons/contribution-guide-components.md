---
affects: .claude/skills/add-tutorial/SKILL.md, .claude/skills/add-tutorial/template.md, CONTRIBUTING.md
---

# New CSS components from the contribution-guide integration

The following CSS component classes were added to `src/styles/global.css` and should
be used in all new tutorials going forward. They were ported from the standalone
OpenRCT2 contribution-guide site to create a consistent, polished tutorial experience.

## New components available

1. **Step badges** (`.step-badge`) — Progress indicator pill placed after each step
   or milestone H2 heading. Format: `<span className="step-badge">Step 1 of 5</span>`

2. **Steps overview grid** (`.steps-grid` + `.step-card`) — Visual card grid for
   the "Steps overview" or "Milestones overview" section. Each card has `.step-num`,
   `.step-name`, and `.step-desc` spans.

3. **Skill pills** (`.skill-row` + `.skill-pill`) — Used in Prerequisites to show
   what knowledge is needed (`.skill-need`, green) vs not needed (`.skill-noneed`,
   strikethrough). Replaces plain bullet lists for prerequisite knowledge.

4. **Tool cards** (`.tools-grid` + `.tool-card`) — Used in Prerequisites for tools
   the reader needs installed. Each card has `.tool-name`, `.tool-rec` (recommended
   version), and `.tool-desc`.

5. **Code block headers** (`.code-block` + `.code-header`) — Wraps a code fence
   with a header bar showing filename (`.code-filename`) and optional GitHub link
   (`.code-link`). Use when a code block maps to a specific file in a repo.

6. **File reference** (`.file-ref`) — Inline monospace badge for referencing a file
   path in prose.

7. **Token highlighting** (`.token-keyword`, `.token-add`, `.token-remove`, etc.) —
   Manual syntax spans for precise control over what's highlighted in code blocks,
   especially for showing diffs with green/red backgrounds.

## What to change

- **SKILL.md, Step 5 (Write the MDX):** Add a subsection documenting these new
  component classes. The current guidance only covers callouts. New tutorials should
  use step badges, skill pills, and overview grids by default.
- **template.md:** Update the template to include: a step badge after the first
  `## Step 1` heading, a skill-pills block in Prerequisites replacing the plain
  bullet list, and a tools-grid block. Add a commented-out overview grid section
  as an optional pattern for multi-step tutorials.
- **CONTRIBUTING.md:** Add a "Components" section (or extend the existing Callouts
  section) listing the new CSS classes with usage examples. Mention that `.code-block`
  headers should be used when tutorials reference code in an external repo.
