---
name: review-tutorial
description: Reviews a tutorial by simulating its intended audience. Spawns a persona-based subagent to evaluate the tutorial for gaps or unclear steps, then edits the tutorial with the findings.
argument-hint: "[tutorial-slug]"
---

Review the tutorial identified by `$ARGUMENTS` and improve it based on an audience
simulation. Work through the four phases below in order.

---

## Phase 1 — Locate and read the tutorial

Resolve `$ARGUMENTS` to a file path:

- If it looks like a slug (e.g. `cloudflare-pages-deploy`), the path is:
  `src/content/tutorials/$ARGUMENTS/index.mdx`
- If it already looks like a path, use it directly

Read the full file. Extract from frontmatter:
- `difficulty` — `beginner`, `intermediate`, or `advanced`
- `topics` — the subject tags
- `description` — what the tutorial promises to teach
- `repo` — if present, the project being discussed

Also read the tutorial body and note:
- What prerequisites are stated
- What domain knowledge is assumed but not stated
- What tools or concepts are introduced without explanation

---

## Phase 2 — Synthesize the persona

Using everything from Phase 1, write a concrete persona description. This is **not**
just a difficulty label — it is a specific person with specific knowledge gaps.

**Persona construction rules:**

1. Start from `difficulty`:
   - `beginner` → has surface-level familiarity with the topic area, limited hands-on experience
   - `intermediate` → comfortable day-to-day but hasn't gone deep on architecture or edge cases
   - `advanced` → experienced practitioner; only misses highly specific internal knowledge

2. Subtract what the tutorial's own prerequisites say the reader *already knows*

3. Subtract what the `topics` tags imply a reader interested in this subject would know

4. What remains are the **knowledge gaps** the tutorial must bridge

**Example persona (beginner, topics: Cloudflare, deployment, Astro):**
> "You are a junior developer. You have built static HTML/CSS sites and pushed code
> to GitHub. You understand what npm is and can run terminal commands when told to.
> You have never deployed a website to a hosting platform, don't know what a CDN is,
> and have never heard of Cloudflare before. Buzzwords like 'CI/CD' and 'build pipeline'
> mean nothing to you yet."

**Example persona (intermediate, topics: C++, OpenRCT2, game dev):**
> "You are a developer comfortable writing C++ — you understand classes, pointers,
> and the build system. You have contributed to small open-source projects before.
> You have never worked in a large game codebase, don't know OpenRCT2's architecture,
> and have no experience with game state machines or save-file serialisation."

Write the final persona into a variable you'll pass to the subagent in Phase 3.

---

## Phase 3 — Spawn the evaluator subagent

Use the **Agent tool** with `subagent_type: general-purpose`.

Give it this prompt, substituting `[TUTORIAL_PATH]` and `[PERSONA]`:

---

```
You are evaluating a tutorial from the perspective of a specific reader.

YOUR PERSONA:
[PERSONA]

TUTORIAL FILE:
[TUTORIAL_PATH]

INSTRUCTIONS:

Read the tutorial fully. Then evaluate it as this specific person would experience it —
going through each section, trying to follow the instructions, and noting every place
you would get confused, stuck, or lost.

Produce a structured findings report with this exact format:

## Findings

For each issue found, one entry:

### [Short title of the issue]
- **Location:** [Section heading or "Frontmatter" or "Prerequisites"]
- **Problem:** [What this person would not understand or what is missing]
- **Suggestion:** [Specific text, callout, or clarification to add]

Be specific. "The reader doesn't know what X means" is not enough — write the actual
sentence or callout that should be added. If a term needs defining, write the definition.
If a step is missing, write the step.

Limit to genuine gaps — do not flag things the stated prerequisites cover, and do not
suggest cosmetic rewrites of clear text.

## Summary
One paragraph: overall assessment and the 2–3 most impactful improvements.
```

---

Wait for the subagent to return its full findings report before proceeding.

---

## Phase 4 — Apply findings

For each finding in the subagent's report:

1. **Identify** the location in the tutorial (the section the finding references)
2. **Make the minimal targeted edit** that addresses the problem:
   - Undefined term on first use → add an inline parenthetical or a `callout-info` block
   - Missing prerequisite → add a bullet to the Prerequisites section
   - Skipped step → expand the relevant section with the missing step
   - Missing "why" → insert an explanatory sentence before the "what"
   - Confusing instruction → rewrite just that sentence, not the whole section

3. **Do not** rewrite sections that have no finding against them
4. **Do not** change the tutorial's difficulty level or scope

After all edits, run:

```bash
npm run build
```

Fix any errors (most likely a `className=` vs `class=` issue in new HTML you added),
then report:

```
Reviewed: [tutorial title] ([difficulty])
Persona: [one-sentence summary of the persona]

Findings applied: N
  - [Title of finding 1] → [what was added/changed]
  - [Title of finding 2] → [what was added/changed]
  ...

Findings skipped: N (explain why if any were skipped)

Build: passed
```
