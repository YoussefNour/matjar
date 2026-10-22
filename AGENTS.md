<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

## General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->

# Matjar Repo

this repo is a shopify like project our aim is to create a virtual online store app like a saas or off the shelf software that could be configured and tailored by and for the seller and simple and straight forward. Alongside the Matjar product, the business delivers custom software for stores and businesses — portals, integrations, internal tools, and anything else the shop depends on. See `docs/services.md`.

## tech stack

Next js application to simplify hosting and development

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## UI Development and Look and Feel

UI work is governed by two documents, and they are part of the definition of
done — not background reading:

- `docs/design-system.md` — tokens, typography scale, logo, color pairs.
- `docs/ui-guidelines.md` — look and feel, component rules, states, RTL,
  accessibility, review checklist.

Agents should load the `matjar-ui` skill for any task that creates or changes a
page, layout, component, style, or visual asset.

Hard rules:

- Use semantic utilities (`bg-surface`, `text-foreground-muted`,
  `border-border`, `bg-primary`, `bg-primary-hover`). No hex values, no raw
  palettes in product UI (`bg-palm-700`), no arbitrary values (`text-[11px]`,
  `leading-[1.02]`).
- Use the typography scale (`text-display`, `text-h1` … `text-caption`). Do not
  re-declare size, weight, or tracking on top of it.
- Use logical direction utilities (`ms-`, `me-`, `ps-`, `pe-`, `start-`,
  `end-`, `text-start`, `text-end`). Physical `ml-`/`mr-`/`left-`/`right-` are
  review blockers.
- Dark mode comes from tokens; `dark:` is only for decorative palette art and
  image treatments. Test light, dark, LTR, and RTL for every new surface.
- Design the states: hover, focus-visible, active, disabled, loading, empty,
  error. Keep a visible focus ring and 44×44px touch targets.
- One primary action per view; mango is an accent, not a second primary.
- Reuse the nearest existing pattern before inventing one. A new pattern needs
  an entry in `docs/ui-guidelines.md`, not just a component.
- Do not copy `apps/matjar/app/page.tsx` (starter page) — it is a documented
  deviation.
- Do not add UI dependencies (icons, `clsx`/`tailwind-merge`, CVA, animation or
  component kits) without approval.
- Visual changes are product decisions: change tokens in
  `packages/design-tokens`, update `tokens.test.mjs`, `docs/design-system.md`,
  and the changelog together.
- Verify UI work with `npx nx run-many -t eslint:lint next:build test` and
  `npx nx format:check --all`.

## Coding and Collaboration Standards

### Follow Clean Coding Rules

1.Meaningful Naming

• Reveal intent: Names should answer why it exists, what it does, and how it is used (e.g., use daysSinceLastUpdate instead of d).
• Use pronounceable and searchable names: Avoid cryptic shorthand, magic numbers, or single-letter variables except for brief loop counters.
• Class vs. Method names: Classes should be nouns or noun phrases (Customer, ShapeFactory), while methods should be verbs or verb phrases (postPayment, deletePage).
• Avoid noise: Do not add redundant prefixes or suffixes like the, a, or appending List to a collection name (use plurals like animals).

2.Functions

• Keep them small: Functions should be small—and then smaller than that.
• Do one thing: Stick to the Single Responsibility Principle so a function has only one reason to change.
• Minimize arguments: Limit the number of parameters a function takes (ideally zero, one, or two; avoid three or more).
• No side effects: A function should not secretly modify hidden states or global variables.
• Use early returns: Guard clauses and early returns eliminate deep nesting and else blocks.

3.Comments

• Code should explain itself: Rely on clear naming and structure rather than writing comments.
• Write good comments only when necessary: Use comments strictly for legal notices, warning of consequences, or explaining intent (the why, not the what).
• Delete dead code: Never comment out code blocks; delete them and let version control (like Git) track history.

4.Code Structure & Formatting

• Separate concepts vertically: Keep related functions and variables close to each other, and separate distinct ideas with blank lines.
• Follow the DRY Principle: Don't Repeat Yourself; centralize duplicated logic into reusable functions or abstractions.
• Keep it simple (KISS): Avoid over-engineering solutions or building premature abstractions.
• Consistent formatting: Agree on a team style guide and use automated linters and formatters.

5.Objects, Data Structures, and Error Handling

• Hide internal structure: Objects should expose behavior and hide data, while data structures expose data with little behavior (avoid hybrid structures).
• Fail fast: Throw exceptions as early as possible when encountering an error condition rather than letting corrupted states propagate.
• Avoid nulls: Avoid returning or passing null where possible; use Null Object patterns or optional types instead

### Always clean unused code or modules or unused dependencies

### Never install untrusted or small packages with now support

### Avoid introducing Security Vulnerabilities

### Commits should follow standard <Commit-Intent> <scope>:<Commit-message>

### follow Git Flow featureBranch -> dev -> main

### Open PRs with the `create-pr` skill

- Base branch is `dev`; `main` only for release and hotfix PRs.
- PR title follows `<Commit-Intent> <scope>:<Commit-message>`.
- Describe intent, steps, decisions, verification, and risk — never replay the
  diff file by file. Target 300–450 words; split the PR before exceeding 600.
- PRs are opened with `gh pr create --body-file`, never with an inline body, and
  are never self-merged.

### Always manage the documents section in project read from it for details and update it if a change is requested in approach is requested by dev

### Keep a change log file in the docs to be able to see progress of app entry in this basic md file should be date: description - developer name. use git username if you don't know dev name

### Use TDD create unit test cases first and confirm with dev then start development
