# Project state

Durable agent memory for this repository. Not a README. Capture only what future sessions would otherwise rediscover the hard way.

## Snapshot

- **What this is:** Personal portfolio site (Next.js) for Roy Ho — projects, hero, theme toggle, Atlas chat, live demos.
- **Current phase / constraints:** Git repo lives in `project/` (parent `personal-website/` folder is not the repo root).

## Learnings

### 2026-09-03 — Project card media dark gradients
- **Learning:** `ProjectCardMedia` used to force `dark:from-slate-800 dark:via-slate-900 dark:to-slate-800`, which wiped per-project hue. Each project’s `gradient` string now includes matching `dark:from-*` / `dark:via-*` / `dark:to-*` classes; do not reintroduce a global slate dark override.
- **Why it matters:** Dark mode looked colorless even though light mode had distinct card colors.
- **Implication:** When adding a project, include both light and dark gradient utilities in the same `gradient` field.

## Nuances and gotchas

- Workspace path for agents should be `.../personal-website/project`, not the parent folder.

## Decisions

## Do not store

Secrets, tokens, `.env` values, session transcripts, or content that already lives in the README unless it is easy to miss.
