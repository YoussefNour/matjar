---
name: create-pr
description: "Open or refresh a GitHub pull request with a concise, review-ready description of the branch. USE WHEN: (1) the user asks to create, open, raise, or publish a PR; (2) a finished branch needs committing, pushing, and a PR body; (3) the user asks to rewrite, shorten, or improve an existing PR description; (4) a branch needs a pre-review readiness check."
---

# Create PR

The PR is the handoff to review. It should let someone understand the branch in
a few minutes and point them at the evidence. GitHub already renders the diff,
so the description explains intent, steps, and risk — it never repeats the diff
file by file.

## Ground rules

- Base branch is `dev` for features, fixes, chores, and docs. `main` only for
  release or hotfix PRs (`release/*`, `hotfix/*`).
- Branch names: `feat/…`, `fix/…`, `chore/…`, `docs/…`.
- Title follows the commit format `<type>(<scope>): <summary>` — imperative,
  lower-case, no trailing period.
- One concern per PR. If the branch carries unrelated work, split the PR
  instead of writing a longer description.
- Every user-visible or convention change has a `docs/changelog.md` entry
  (`date: description - developer`).
- Never commit secrets, `.env` files, build output, or unrelated formatting
  noise. Never force-push a shared branch, and never merge your own PR.

## Workflow

### 1. Establish scope

```bash
git fetch origin
git status --short
git log --oneline origin/dev..HEAD
git diff --stat origin/dev...HEAD
```

Read every changed file. If something is not part of this PR, leave it
uncommitted or move it to another branch — do not smuggle it in.

### 2. Verify before writing

Run the same gates as CI:

```bash
npx nx format:check --all
npx nx run-many -t eslint:lint next:build test
```

Fix failures before opening the PR. Keep the exact commands and results for the
Verification section. For UI work also check light/dark, LTR/RTL, mobile
width, keyboard path, and empty/error states.

### 3. Commit by intent

Split commits by intent, not by file count — feature code, docs, tests, and
tooling are separate commits. Message format:
`<Commit-Intent> <scope>:<Commit-message>`, for example
`feat(landing): add services section`. Stage explicit paths (`git add path`),
never `git add -A` blindly. Amend only before the first push.

### 4. Push

```bash
git push -u origin <branch>
```

Subsequent pushes are plain `git push`. Pull with `--rebase` if the base moved;
never rewrite history that others may have pulled.

### 5. Write the body to a file

Write the description to `$TMPDIR/pr-body.md` (outside the repo) so backticks
and tables need no shell escaping and the file cannot be committed. Use the
template below.

### 6. Create or update

```bash
gh pr create --base dev --head <branch> \
  --title "<type>(<scope>): <summary>" \
  --body-file "$TMPDIR/pr-body.md"
```

Use `--draft` only when the branch is not ready for review. If the PR already
exists, update it with `gh pr edit --body-file`. For UI changes, attach
before/after screenshots after creation — the CLI cannot upload them, so add
them in the web UI or link the files.

### 7. After creation

Report the URL, title, base branch, and check status. Watch CI
(`gh pr checks --watch`) and fix failures on the same branch. Do not merge.

## Description template

```md
## Summary

<2–4 sentences: what this branch delivers, for whom, and why.>

## What changed

- **<Area>** — <user-visible outcome>
- **<Area>** — <outcome, with a link when it helps>

## How it was done

1. <Step: what was explored, measured, or decided>
2. <Step: what was implemented, in dependency order>
3. <Step: what was verified and how>

## Key decisions

- <Decision> — <reason, and what was rejected>

## Verification

| Gate                                             | Result                      |
| ------------------------------------------------ | --------------------------- |
| `npx nx format:check --all`                      | pass                        |
| `npx nx run-many -t eslint:lint next:build test` | pass                        |
| Manual                                           | light/dark, LTR/RTL, mobile |

## Risk and follow-ups

- <Breaking change, migration, or known gap> — otherwise "None."

## Checklist

- [ ] Changelog updated
- [ ] Tests cover the new behaviour
- [ ] Docs updated where behaviour or conventions changed
- [ ] No secrets, debug output, or unrelated changes
```

Delete sections that genuinely have nothing to say. `Summary` and
`What changed` always stay; `Key decisions` and `Risk` are the two most useful
sections for a reviewer, so keep them unless truly empty. Add `Screenshots`
only for UI work.

## Length and tone

- Target 300–450 words (roughly 50–75 lines). Hard cap 600 words. If the PR
  needs more, it probably needs splitting.
- Bullets over paragraphs, one idea per bullet.
- Write outcomes and reasons, not file paths. Link a file when the reviewer
  must jump to it.
- Say what was not done when the boundary matters.
- No marketing adjectives, no emoji, no "This PR…", no restating the diff.

## Anti-patterns

- File-by-file changelog ("updated `page.tsx`, updated `layout.tsx`").
- Vague summaries ("various improvements", "minor fixes", "refactoring").
- Empty headings, unchecked checklist items, placeholder text.
- A wall of text that hides the one risky change.
- UI changes with no screenshots or reproduction steps.
- Hiding scope creep inside a "while here" bullet.

## Gotchas

- Confirm auth first: `gh auth status`.
- Use the commit message as the PR title when the branch is a single commit;
  summarise across commits when it is not.
- Check the remote base exists (`origin/dev`) before opening.
- If CI cannot run on a fork or draft, say so in `Verification` instead of
  leaving it blank.
- Note rollback when a change is not trivially revertible.
