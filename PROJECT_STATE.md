# Project state

Durable agent memory for this repository. Not a README. Capture only what future sessions would otherwise rediscover the hard way.

## Snapshot

- **What this is:** Personal portfolio site (Next.js) for Roy Ho — projects, hero, theme toggle, Atlas chat, live demos.
- **Current phase / constraints:** Git repo lives in `project/` (parent `personal-website/` folder is not the repo root).

## Learnings

### 2026-09-03 — Wine project is R, not Python
- **Learning:** `wine-quality-classification` is an R multivariate stats project (tidyverse, caret, MASS, pROC). Site + Atlas briefly mislabeled it as Python/scikit-learn.
- **Why it matters:** Easy to reintroduce from muscle memory (other ML cards are Python) or from old copy.
- **Implication:** Keep wine tech/tags as R (+ Machine Learning). Do not retag as Python.

### 2026-09-03 — Keep Atlas knowledge in sync with site copy
- **Learning:** When About, bio, projects, experience, education, or other visitor-facing facts change, also update `app/lib/atlasKnowledge.ts` in the same change. User explicitly wants this pattern kept.
- **Why it matters:** Atlas answers from that string; stale knowledge drifts from the live site.
- **Implication:** Treat `atlasKnowledge.ts` as part of the content surface, not a separate follow-up.

### 2026-09-03 — Project card media dark gradients
- **Learning:** `ProjectCardMedia` used to force `dark:from-slate-800 dark:via-slate-900 dark:to-slate-800`, which wiped per-project hue. Each project’s `gradient` string now includes matching `dark:from-*` / `dark:via-*` / `dark:to-*` classes; do not reintroduce a global slate dark override.
- **Why it matters:** Dark mode looked colorless even though light mode had distinct card colors.
- **Implication:** When adding a project, include both light and dark gradient utilities in the same `gradient` field.

## Nuances and gotchas

- Workspace path for agents should be `.../personal-website/project`, not the parent folder.

## Decisions

## Do not store

Secrets, tokens, `.env` values, session transcripts, or content that already lives in the README unless it is easy to miss.
