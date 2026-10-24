# Changelog

All notable changes to this project are documented here. Format:
`date: description - developer`.

## 2026-10-24: Added a Let's talk form that sends through Resend - Ahmed Bahaa

- Replaced the landing store and mailto calls to action with a Let's talk
  screen at `/talk`.
- The form asks for a name, email, and message, then sends the message through
  Resend from `ahmedbahaa.6251@gmail.com` to both default inboxes, with the
  visitor's address as the reply-to.
- Added inquiry validation tests and documented `RESEND_API_KEY` and optional
  `CONTACT_TO`.

## 2026-10-24: Fixed the Vercel landing build command - Ahmed Bahaa

- The landing `build` script now runs Next from the workspace install instead
  of calling `nx`, which is not on the path when Vercel builds `apps/landing`.
- Declared `@matjar/design-tokens` as a landing dependency so Vercel's install
  links the shared styles. The app imports that package, and a filtered
  install does not include workspace packages that are not dependencies.
- Set the Next file-tracing root to the monorepo so the shared design tokens
  are included in the deployment.
- Added `@types/node` to the landing app so Vercel's filtered install can
  typecheck `next.config.ts`.

## 2026-10-22: Added a pull request skill and description style - Youssef Ossama

- Added `.opencode/skills/create-pr/` with the branch-to-PR workflow: scope
  check, CI gates, commit split, push, `gh pr create`, and CI follow-up.
- Defined the PR description template and its length budget (300–450 words,
  hard cap 600) so reviewers get intent, steps, decisions, verification, and
  risk without a file-by-file diff recap.
- Documented the anti-patterns and gotchas to keep PRs consistent across the
  team.

## 2026-10-22: Documented custom software services alongside the Matjar platform - Youssef Ossama

- Added a services section to the landing page covering custom software,
  integrations, business portals, and ongoing engineering, with the team's
  almost decade of experience at ITworx, Ejada, Bank Misr, and Suez Canal Bank.
- Updated the hero, metadata, FAQ, header, and footer to state that Matjar is a
  commerce platform backed by a professional engineering team, and that custom
  work is available whether or not a business runs a Matjar store.
- Added `docs/services.md`, expanded the README with the services offer and
  contact, and linked the new document from the documentation index.
- Brought the landing page onto the design contract: `max-w-page` containers,
  the typography scale, semantic inverted panel, token shadows, and no
  arbitrary text, tracking, or radius values. Removed it from the known
  deviations table.
- Added the service card and credentials recipe to `docs/ui-guidelines.md`.

## 2026-10-22: Added UI guidelines and agent rules for look and feel - Youssef Ossama

- Added `docs/ui-guidelines.md`: personality, composition rules, non-negotiables,
  component conventions, recipes, interaction states, responsive and dark mode
  rules, RTL/Arabic requirements, accessibility, anti-patterns, page templates,
  agent workflow, and the definition of done.
- Added the `matjar-ui` skill so agents load the design contract before writing
  UI, and added a "UI Development and Look and Feel" section to `AGENTS.md`.
- Recorded known deviations in the landing and starter pages so they are not
  copied as references.
- Cross-linked the design system and README documentation index.

## 2026-10-22: Added the Matjar arcade logo and app icon - Youssef Ossama

- Designed the brand mark: an arcade of three columns and two round arches that
  reads as an `m`, with a mango sun above.
- Added `matjar-mark.svg`, `matjar-mark-mono.svg`, and `matjar-app-icon.svg` to
  `@matjar/design-tokens/assets`.
- Wired the mark into the landing header and added an SVG favicon via
  `app/icon.svg`.
- Documented the logo, clear space, and colour rules in the design system.

## 2026-10-22: Converted to an Nx monorepo and added the landing app - YoussefNour

- Created an Nx workspace at the repository root with npm workspaces.
- Moved the existing Next.js store app to `apps/matjar`.
- Added a standalone Next.js marketing site in `apps/landing`.
- Added shared root scripts, project documentation, and CI.

## 2026-10-22: Added the shared design token library and Arabic-ready theming - Youssef Ossama

- Created `@matjar/design-tokens` with semantic light/dark color tokens, warm
  sand/palm/mango palettes, fluid typography, radii, shadows, motion, and an
  `xs` breakpoint.
- Added RTL and Arabic typography foundations: logical-property rules, mirrored
  directional icons, LTR contact inputs, and Arabic leading/tracking overrides.
- Wired both apps to the shared theme and loaded Geist plus IBM Plex Sans Arabic
  through `next/font`.
- Added contract tests for token parity, Tailwind aliases, RTL safety, and WCAG
  AA contrast, and connected them to CI.
