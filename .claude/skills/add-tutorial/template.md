---
title: "Your Tutorial Title"
description: "What the reader will accomplish in one or two sentences."
difficulty: beginner
topics: ["Topic1", "Topic2"]
publishDate: 2026-04-04
# series: my-series-slug    # uncomment for series tutorials
# seriesOrder: 1            # position in the series
---

{/* className= not class= — MDX compiles to JSX */}

Opening sentence or two — no heading, just context about what this covers and why it matters.

## What you'll build

Brief description of the end result. For series tutorials, this can be shorter since the series landing page has the full overview.

## Milestones overview

<div className="steps-grid">
  <div className="step-card">
    <span className="step-num">Milestone 1</span>
    <span className="step-name">First Major Section</span>
    <span className="step-desc">What this milestone covers</span>
  </div>
  <div className="step-card">
    <span className="step-num">Milestone 2</span>
    <span className="step-name">Second Major Section</span>
    <span className="step-desc">What this milestone covers</span>
  </div>
</div>

## Prerequisites

**What you need to know:**

<div className="skill-row">
  <span className="skill-pill skill-need">Required skill</span>
  <span className="skill-pill skill-need">Another requirement</span>
  <span className="skill-pill skill-noneed">Not needed</span>
</div>

**What you need installed:**

<div className="tools-grid">
  <div className="tool-card">
    <span className="tool-name">Tool Name</span>
    <span className="tool-rec">version or command</span>
    <span className="tool-desc">What it's for and how to get it</span>
  </div>
</div>

---

## Milestone 1 — First major action

<span className="step-badge">Milestone 1 of 2</span>

### Step 1 — First step

Explain what this step accomplishes and why before showing any code or commands.

```bash
some command here
```

<div className="callout callout-tip">
  <span className="callout-title">Run it</span>
  <p>What the reader should see after this step.</p>
</div>

### Step 2 — Second step

Continue the pattern. Show before/after when changing existing code.

---

## Milestone 2 — Second major action

<span className="step-badge">Milestone 2 of 2</span>

### Step 3 — Third step

For UI-heavy steps, reference a screenshot taken with Playwright:

![The settings panel showing the new option enabled](./screenshot-step-3.png)

<div className="callout callout-info">
  <span className="callout-title">What's next</span>
  <p>Optional: point to a related tutorial or next step in the series.</p>
</div>
