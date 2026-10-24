---
name: matjar-ui
description: "Build or change Matjar UI following the project design system. USE WHEN: (1) creating a page, layout, component, form, table, empty state, or navigation; (2) choosing colors, typography, spacing, radii, shadows, or motion; (3) adding dark mode, RTL/Arabic support, or accessibility behaviour; (4) reviewing UI code or a screenshot for look and feel. Always read docs/design-system.md and docs/ui-guidelines.md before writing markup."
---

# Matjar UI

Matjar's visual language is warm, calm, and token-driven. This skill is the
short path for agents; the full contract is in `docs/ui-guidelines.md`.

## Read first

1. `docs/design-system.md` — available tokens, type scale, logo rules.
2. `docs/ui-guidelines.md` — composition rules, recipes, states, checklist.

Do not write UI from memory. Do not invent a visual language for one screen.

## Workflow

1. Find the nearest existing pattern in `apps/*/app/components` and in the
   recipes section of `docs/ui-guidelines.md`. Reuse it.
2. List the states the surface needs (default, hover, focus, disabled, loading,
   empty, error) before writing markup.
3. Build mobile-first with semantic tokens only.
4. Verify light/dark and LTR/RTL.
5. Run `npx nx run-many -t eslint:lint next:build test` and
   `npx nx format:check --all`.
6. If you introduced a pattern, add it to `docs/ui-guidelines.md` and add a
   changelog entry.

## Hard rules

- Semantic utilities only: `bg-surface`, `text-foreground-muted`,
  `border-border`, `bg-primary`, `bg-primary-hover`. No hex, no raw palettes
  (`bg-palm-700`), no arbitrary values (`text-[11px]`, `leading-[1.02]`).
- Typography utilities already set size, line height, tracking, and weight. Use
  `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-lead`, `text-small`,
  `text-caption` and stop there.
- Logical direction only: `ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`,
  `text-start`, `text-end`, `border-s`, `border-e`. Physical equivalents are
  review blockers.
- Dark mode comes from tokens. `dark:` is only for decorative palette art or
  image treatments, never for a second layout.
- One primary action per view. Mango is an accent, not a second primary.
- Elevation is a signal: `shadow-sm` at rest, `shadow-lg`+ for overlays. Hover
  motion is at most `-translate-y-0.5`.
- Real `button`/`a`/`input` elements, programmatic labels, visible focus ring,
  44×44px touch targets.
- Status colors: solid pairs (`bg-danger text-danger-foreground`) or the tested
  subtle pairs (`primary-subtle`, `accent-subtle`). Never `bg-warning/10
text-warning` — it fails AA.
- Containers: `max-w-page` with `px-5 sm:px-8`; `max-w-wide` for data; never
  `max-w-6xl` in new pages.
- No new UI dependency (icons, clsx/tailwind-merge, CVA, animation or component
  kits) without approval.
- Do not copy `apps/matjar/app/page.tsx` (starter page); it is listed as a
  deviation in the guidelines.

## Quick references

| Need              | Use                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------- |
| Card              | `rounded-2xl border border-border bg-surface p-6`                                                           |
| Primary button    | `min-h-11 rounded-lg bg-primary px-4 text-small font-medium text-primary-foreground hover:bg-primary-hover` |
| Secondary button  | `min-h-11 rounded-lg border border-border bg-surface px-4 text-small font-medium hover:bg-surface-muted`    |
| Input             | `min-h-11 w-full rounded-lg border border-border bg-surface px-3 text-body`                                 |
| Metadata          | `text-caption text-foreground-subtle`                                                                       |
| Quiet band        | `bg-surface-muted` or `border-y border-border bg-surface/50`                                                |
| Inverted panel    | `bg-foreground text-background`                                                                             |
| Directional arrow | add `icon-directional` so it mirrors in RTL                                                                 |

## Definition of done

Only semantic tokens. States designed. Keyboard path works. Light and dark
verified. LTR and RTL verified. AA contrast. 44px targets. Lint, build, and
tests green. Patterns and changelog updated when something new was introduced.
