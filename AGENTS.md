# Matjar Repo

this repo is a shopify like project our aim is to create a virtual online store app like a saas or off the shelf software that could be configured and tailored by and for the seller and simple and straight forward

## tech stack
Next js application to simplify hosting and development

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

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

### Always manage the documents section in project read from it for details and update it if a change is requested in approach is requested by dev

### Keep a change log file in the docs to be able to see progress of app entry in this basic md file should be date: description - developer name. use git username if you don't know dev name

### Use TDD create unit test cases first and confirm with dev then start development
