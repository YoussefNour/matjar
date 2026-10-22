# Matjar UI Guidelines

This is the working guide for every Matjar surface: the marketing site, the
storefront, and the seller dashboard. It defines the look and feel, how UI code
is written, and how a change is reviewed. Read it before writing UI, and update
it whenever a new pattern is introduced.

**Companion documents**

- [`design-system.md`](./design-system.md) — the token reference (color,
  typography, radii, shadows, motion, logo). That file owns token values; this
  file owns how those tokens are composed into UI.
- [`changelog.md`](./changelog.md) — log every meaningful visual or pattern
  change here.

**Authority order.** Tokens in `@matjar/design-tokens` define what exists.
`design-system.md` explains the tokens. This document explains composition.
If code, docs, and this guide disagree, fix the code and update the guide in the
same change. A visual decision that is not written down here does not exist yet.

## The Matjar look and feel

Matjar should feel like a well-run shop on a warm street: calm, tidy, and
confident. Sellers are busy; the interface should lower their heart rate, not
sell them a dashboard.

### Personality

- **Warm, not corporate.** Limestone sand neutrals, palm green, mango accents.
  Egyptian by reference, never by cliché.
- **Calm and dense where it counts.** Marketing pages breathe; dashboards
  prioritise scanability and frequent actions.
- **Crisp, not flashy.** Structure comes from borders, spacing, and typography.
  Gradients, glows, and large shadows are accents, not the default.
- **Plain language.** Short sentences, concrete verbs, no hype.
- **Arabic is first-class.** Right-to-left and Arabic typography are designed,
  not patched on afterwards.

### Composition rules

| Concern         | Rule                                                                                                                 |
| --------------- | -------------------------------------------------------------------------------------------------------------------- |
| Density         | Marketing: generous whitespace, one idea per section. Dashboard: compact rows, `text-small` for detail.              |
| Surfaces        | Page on `background`; cards and inputs on `surface`; subtle bands on `surface-muted`.                                |
| Borders         | One hairline `border-border` defines most containers. Use `border-border-strong` only on interaction.                |
| Elevation       | Resting cards get `shadow-sm` at most. `shadow-lg`/`shadow-xl` are for hover overlays, popovers, and modals.         |
| Radii           | Product UI: `rounded-lg` inputs/buttons, `rounded-2xl` cards. Marketing CTAs may be `rounded-full`.                  |
| Color intensity | One primary action per view. Mango is a highlight, not a second primary button color.                                |
| Motion          | 180ms default. Small state changes only; no entrance animations on dense screens.                                    |
| Icons           | 24×24 grid, `strokeWidth` 1.5–1.8, `currentColor`, `size-4`/`size-5`, always `aria-hidden` with a text label nearby. |
| Imagery         | Real product photography over abstract art. Decorative art must be `aria-hidden` and token-colored.                  |

## Non-negotiables

1. Use semantic utilities only: `bg-surface`, `text-foreground-muted`,
   `border-border`, `bg-primary`. Raw palettes (`bg-palm-700`) and hex values
   are not allowed in product UI.
2. Never hardcode a color, size, radius, or shadow that a token already covers.
3. Build mobile-first and test at 320px, 375px, 768px, and 1440px.
4. Use logical direction utilities (`ms-`, `me-`, `ps-`, `pe-`, `start-`,
   `end-`, `text-start`, `text-end`). Physical equivalents are forbidden.
5. Use the typography scale (`text-h2`, `text-body`, `text-small`,
   `text-caption`) instead of re-declaring size, weight, and tracking.
6. Dark mode comes from tokens. A component that needs a second layout for dark
   mode is designed wrong.
7. Every interactive element is a real `button`, `a`, or form control, is
   keyboard reachable, and keeps a visible focus ring.
8. Every element that can change has designed hover, focus, active, disabled,
   loading, empty, and error states as applicable.
9. Touch targets are at least 44×44px; desktop-only controls still need 32px.
10. Do not add a UI dependency (icons, `clsx`/`tailwind-merge`, CVA,
    animation libraries, component kits) without approval. Compose with what is
    installed.
11. Reuse an existing pattern before inventing one. A new pattern is a docs
    change, not just a component.
12. Copy is written for sellers in plain English and Arabic — no lorem ipsum,
    no placeholder "Lorem", no "Click here".

## Color

Full token tables live in [`design-system.md`](./design-system.md#color). The
rules that matter when composing:

- **Backgrounds:** `bg-background` for the page, `bg-surface` for cards and
  inputs, `bg-surface-muted` for subtle bands and code, `bg-surface-raised` for
  menus and popovers.
- **Text:** `text-foreground` for primary copy, `text-foreground-muted` for
  supporting copy, `text-foreground-subtle` for metadata only. Never use subtle
  text for prices, totals, errors, or anything legally required.
- **Primary:** `bg-primary` + `text-primary-foreground`, hover
  `bg-primary-hover`. One primary action per view.
- **Accent:** `bg-accent` + `text-accent-foreground` for promotional or
  secondary emphasis. `bg-primary-subtle` / `bg-accent-subtle` with their
  `-foreground` partner are the only contrast-tested tinted pairs.
- **Status:** solid pairs are guaranteed: `success`, `warning`, `danger`,
  `info` with their `-foreground`. Do **not** tint a fill token and reuse it as
  text — `bg-warning/10 text-warning` fails AA in light mode. For a quiet badge,
  use `bg-primary-subtle text-primary-subtle-foreground`, or a bordered chip
  whose text is `success`/`danger`/`info` on `surface` (those pairs pass).
- **Charts:** `chart-1` … `chart-6` are for data marks only, never for UI
  chrome.
- **Opacity:** opacity modifiers are fine on backgrounds and borders
  (`bg-primary/10`, `border-border/70`). Avoid opacity on text, and never use
  opacity to fake a disabled state on text that must remain readable.
- **Inverted panels:** prefer `bg-foreground text-background` over a raw
  `bg-sand-950 dark:bg-sand-900` pair. It inverts correctly in both themes.

Decision rule for a new visual: if you need a color that is not in the token
set, stop and propose a token (see [Changing the visual
language](#changing-the-visual-language)).

## Typography

- One `text-*` utility per element. `text-h1` already sets size, line height,
  tracking, and weight — do not append `font-bold` or `tracking-tight`.
- Map content to the scale:

  | Content                    | Utility                 |
  | -------------------------- | ----------------------- |
  | Hero headline              | `text-display-lg`       |
  | Large section headline     | `text-display`          |
  | Page title                 | `text-h1`               |
  | Section title              | `text-h2`               |
  | Card or subsection title   | `text-h3`               |
  | Intro paragraph            | `text-lead`             |
  | Default copy               | `text-body` (inherited) |
  | Supporting copy, table     | `text-small`            |
  | Labels, metadata, eyebrows | `text-caption`          |

- Eyebrows may add `uppercase tracking-widest`, but only with `text-caption` or
  `text-small`.
- Prices, totals, order IDs, SKUs, and metrics use `font-mono` and tabular
  alignment where numbers compare.
- Never use arbitrary text sizes (`text-[11px]`) or arbitrary leading
  (`leading-[1.02]`). If a size is missing, extend the token scale.
- Arabic text inherits looser leading and zero tracking from
  `html[lang="ar"]`. Never add tracking utilities to text that can render in
  Arabic.

## Layout and spacing

- Spacing follows Tailwind's `0.25rem` base. Keep vertical rhythm to a few
  steps: `2`, `3`, `4`, `6`, `8`, `12`, `16`, `20`, `28`.
- Containers:

  | Use                          | Utility                          |
  | ---------------------------- | -------------------------------- |
  | Marketing and dashboard page | `max-w-page` with `px-5 sm:px-8` |
  | Wide data tables             | `max-w-wide`                     |
  | Long-form prose              | `max-w-prose`                    |

- Marketing sections use `py-20 lg:py-28`. Dashboard pages use `py-8 lg:py-12`.
- Section anchors need `scroll-mt-24` so the sticky header does not cover them.
- Grids: `gap-4` for tight card grids, `gap-6`/`gap-8` between content blocks,
  `gap-12`/`gap-16` between major columns.
- Never use `h-screen`; use `min-h-dvh` so mobile browser chrome does not clip.
- Avoid absolute positioning for layout. Reserve it for decorative glows,
  badges pinned to a corner, and overlays.

## Shape, elevation, and motion

- Radii scale: `rounded-xs` 4px, `sm` 6px, `md` 10px, `lg` 14px, `xl` 20px,
  `2xl` 28px, `3xl` 40px. Use exactly one radius per surface; do not mix.
- Elevation is a signal, not decoration. A list of cards at rest should not all
  carry `shadow-lg`.
- Hover movement is limited to a `0.5`–`1` step translate (`hover:-translate-y-0.5`).
  Never scale cards.
- Animations available out of the box: `animate-rise`, `animate-fade-in`.
  Anything longer or looping needs a reason and a reduced-motion check.
- `prefers-reduced-motion` is handled globally. Do not re-enable motion with
  `motion-safe:` unless the motion is decorative and optional.
- Use `transition` or `transition-colors`; the default duration is 180ms and
  the default easing is `ease-snappy`.

## Components

### Where UI code lives

| Scope                          | Location                             |
| ------------------------------ | ------------------------------------ |
| Used by one app                | `apps/<app>/app/components/`         |
| Used by both apps              | `packages/ui` (create with approval) |
| Tokens, brand assets, base CSS | `packages/design-tokens`             |

Do not import across apps. If two apps need the same component, promote it to a
shared package instead of duplicating behaviour.

### Component conventions

- Files are kebab-case (`product-card.tsx`); exports are named PascalCase
  (`export function ProductCard`). Default exports are reserved for Next.js
  page, layout, and route files.
- Server Components by default. Add `"use client"` to the smallest interactive
  leaf (a menu, a form), never to a page for convenience.
- Props are a named `type <Component>Props`, typed from `ComponentProps<"…">`
  where an intrinsic element exists. Do not use `React.FC`.
- Accept and append `className` last so callers can adjust spacing. Do not add
  a class-merging library; conflicting utilities are the caller's problem.
- Variants are a union prop resolved through a typed lookup table. No nested
  ternaries in `className`.
- Keep components presentational. Data fetching, formatting, and business rules
  stay with the page or feature.
- Every component starts with no `dark:` classes. Add `dark:` only for
  decorative palette art that has no semantic equivalent.

```tsx
import type { ComponentProps } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
};

const baseButton =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-small font-medium transition disabled:pointer-events-none disabled:opacity-50";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
  secondary:
    "border border-border bg-surface text-foreground hover:border-border-strong hover:bg-surface-muted",
  ghost: "text-foreground-muted hover:bg-surface-muted hover:text-foreground",
  danger: "bg-danger text-danger-foreground hover:bg-danger/90",
};

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${baseButton} ${buttonVariants[variant]} ${className ?? ""}`}
      {...props}
    />
  );
}
```

### Recipes

**Card**

```tsx
<article className="rounded-2xl border border-border bg-surface p-6">
  <h3 className="text-h3">New order</h3>
  <p className="mt-1 text-small text-foreground-muted">#1042 · just now</p>
</article>
```

**Service card and credentials**

Service cards reuse the card recipe. Pair them with a quiet credential panel
when the claim is about the team rather than the product.

```tsx
<div className="rounded-2xl border border-border bg-surface-muted/60 p-5">
  <p className="text-caption uppercase tracking-widest text-foreground-subtle">
    Engineering background
  </p>
  <p className="mt-2 text-small leading-6 text-foreground-muted">
    Almost a decade of experience delivering software at{" "}
    <span className="font-medium text-foreground">ITworx</span>,{" "}
    <span className="font-medium text-foreground">Ejada</span>.
  </p>
</div>
```

**Status badge**

```tsx
<span className="inline-flex items-center gap-1.5 rounded-full bg-primary-subtle px-2.5 py-0.5 text-caption font-medium text-primary-subtle-foreground">
  Paid
</span>
```

**Form field**

```tsx
<label className="block">
  <span className="text-small font-medium text-foreground">Store name</span>
  <input
    name="storeName"
    aria-describedby="store-name-hint"
    className="mt-2 block min-h-11 w-full rounded-lg border border-border bg-surface px-3 text-body text-foreground placeholder:text-foreground-subtle"
  />
  <span
    id="store-name-hint"
    className="mt-1.5 block text-caption text-foreground-muted"
  >
    This appears in your store URL.
  </span>
</label>
```

Errors use `text-danger` plus `aria-describedby`, and `aria-invalid` on the
control. Never signal an error with colour alone.

**Page header**

```tsx
<header className="flex flex-wrap items-end justify-between gap-4">
  <div>
    <p className="text-caption uppercase tracking-widest text-foreground-subtle">
      Orders
    </p>
    <h1 className="mt-2 text-h1">Orders</h1>
  </div>
  <Button>Export CSV</Button>
</header>
```

**Empty state**

```tsx
<section className="rounded-2xl border border-dashed border-border-strong bg-surface-muted/50 px-6 py-16 text-center">
  <h2 className="text-h3">No orders yet</h2>
  <p className="mx-auto mt-2 max-w-prose text-small text-foreground-muted">
    Share your store link or add a product to start selling.
  </p>
  <Button className="mt-6">Add a product</Button>
</section>
```

**Data row**

```tsx
<div className="flex items-center justify-between gap-4 border-b border-border py-3 last:border-0">
  <span className="font-mono text-small text-foreground">#1042</span>
  <span className="text-small text-foreground-muted">Linen overshirt</span>
  <span className="ms-auto font-mono text-small tabular-nums">$89.00</span>
</div>
```

## Interaction states

Design the state matrix before writing markup. Not every component needs every
state, but every state that exists must be visible and intentional.

| State         | Requirement                                                                          |
| ------------- | ------------------------------------------------------------------------------------ |
| Default       | Uses semantic tokens only.                                                           |
| Hover         | Colour or elevation change within 180ms; never moves layout.                         |
| Focus-visible | Base 2px `ring` outline with 2px offset. Never `outline-none` without a replacement. |
| Active        | Slightly stronger fill (`bg-primary-hover`) or 1px press offset.                     |
| Disabled      | Reduced opacity plus a non-interactive cursor; keep text readable.                   |
| Loading       | Keep layout stable, replace label with a status, set `aria-busy`.                    |
| Empty         | Explain what is missing and the next action.                                         |
| Error         | Plain-language cause and fix, tied to the field with `aria-describedby`.             |
| Success       | Confirm what changed; do not use a toast as the only record of state.                |

## Responsive layout

- Mobile-first: base classes target small screens; add `sm:`, `md:`, `lg:`
  overrides as space appears.
- Breakpoints: `xs` 30rem, `sm` 40rem, `md` 48rem, `lg` 64rem, `xl` 80rem,
  `2xl` 96rem.
- Dashboards may stack cards on mobile and switch to columns at `lg:`, but
  primary actions stay above the fold.
- Tables become stacked rows or a horizontally scrollable region with a visible
  affordance; never let the page scroll sideways.
- Sticky headers and bottom action bars must not cover focused fields. Use
  `scroll-mt-*` and `pb-24` on the scroll container.
- Text never truncates essential information. Truncate names, not prices.

## Dark mode

- Tokens are remapped in `.dark`; most components need no `dark:` classes.
- Allowed `dark:` cases: decorative gradients and illustrations that use raw
  palette utilities, and image treatments (for example `dark:invert` for a
  monochrome logo). Everything else is a token bug.
- Test both themes for every new surface. A component is not done in one theme.
- Respect `color-scheme`; do not set background colors inline.

## RTL and Arabic

- Direction comes from `<html dir="rtl">`; components must not read the locale
  to switch classes.
- Use logical utilities: `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`,
  `text-start`, `text-end`, `border-s`, `border-e`. `ml-*`, `mr-*`, `left-*`,
  and `right-*` are review blockers.
- Add `icon-directional` to arrows, chevrons, and back/forward icons so they
  mirror. Logos, charts, and product imagery never mirror.
- Phone, email, and URL inputs are already forced LTR; keep them that way.
- Format numbers, currency, and dates with `Intl.NumberFormat` and
  `Intl.DateTimeFormat` using the active locale. Do not build currency strings
  by concatenation.
- Arabic copy is not a translation afterthought: when a feature ships in both
  locales, both strings land in the same change.
- Test every new screen with `dir="rtl"` and `lang="ar"`, including icon
  direction, padding, and truncation.

## Accessibility

- Prefer native semantics: `button`, `a href`, `label`, `table`, `details`.
  A `div` with `onClick` is a defect.
- Every input has a programmatic label. Placeholders are not labels.
- One `h1` per page; headings descend in order.
- Link text describes the destination. "Learn more" needs surrounding context.
- Images need `alt`; decorative images use `alt=""` and `aria-hidden` is set on
  decorative SVGs.
- Text meets WCAG AA: 4.5:1 for body, 3:1 for large text and UI boundaries.
  If you cannot prove it with tokens, do not ship it.
- Keyboard: full tab order, visible focus, `Escape` closes overlays, focus
  returns to the trigger.
- Motion respects `prefers-reduced-motion`, which the base layer enforces.
- Use `aria-live="polite"` for async status, and announce errors on submit.
- Touch targets are 44×44px minimum; adjacent targets have at least 8px between
  them.

## Content and microcopy

- Sentence case for headings, labels, and buttons. No Title Case, no ALL CAPS
  except eyebrow labels.
- Buttons are verbs: "Start selling", "Add product", "Save changes". Never
  "Submit", "OK", or "Click here".
- Errors say what happened and what to do next: "Card was declined. Try another
  payment method." Not "Error 402".
- Empty states explain the value and the next step, never just "No data".
- Numbers in marketing copy are concrete ("live by lunch", "2 minutes") and
  must be true.
- Keep English and Arabic at the same level of specificity; do not shorten the
  Arabic string into a different promise.
- Prices display with currency and two decimals in dashboards; storefronts may
  drop trailing zeros only if consistent across the page.

## Anti-patterns

| Instead of                                   | Write                                                 | Why                                 |
| -------------------------------------------- | ----------------------------------------------------- | ----------------------------------- |
| `bg-[#086245]` / `bg-palm-700` in product UI | `bg-primary`                                          | Tokens keep light/dark parity.      |
| `hover:bg-primary/90`                        | `hover:bg-primary-hover`                              | The hover pair is contrast-checked. |
| `bg-warning/10 text-warning`                 | `bg-accent-subtle text-accent-subtle-foreground`      | Tinted warning text fails AA.       |
| `text-3xl font-bold tracking-tight`          | `text-h2`                                             | One utility owns the scale.         |
| `text-[11px] leading-[1.02]`                 | `text-caption`                                        | Arbitrary values break the scale.   |
| `ml-4` / `pl-6` / `left-0` / `text-left`     | `ms-4` / `ps-6` / `start-0` / `text-start`            | RTL correctness.                    |
| `bg-gradient-to-br`                          | `bg-linear-to-br`                                     | Tailwind v4 syntax.                 |
| `h-screen`                                   | `min-h-dvh`                                           | Mobile browser chrome.              |
| `<div onClick={…}>`                          | `<button type="button">`                              | Keyboard and semantics.             |
| `focus:outline-none`                         | keep the base focus ring                              | Keyboard users lose their place.    |
| `max-w-6xl` for a new page                   | `max-w-page` / `max-w-wide`                           | One container per intent.           |
| `shadow-lg` on every card at rest            | `shadow-sm` at rest, elevate on hover                 | Elevation must mean something.      |
| `!p-0` to beat a class                       | fix the component API or remove the conflicting class | `!important` hides design debt.     |
| Inline `style={{ color: … }}`                | a token-backed utility                                | Theme switches break otherwise.     |
| A new icon library                           | inline SVG on the 24×24 grid                          | Dependency and visual drift.        |

## Page templates

Marketing pages:

```tsx
<div className="min-h-dvh bg-background text-foreground">
  <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
    <div className="mx-auto flex max-w-page items-center justify-between px-5 py-4 sm:px-8">
      {/* brand + nav + primary CTA */}
    </div>
  </header>

  <main>
    <section className="mx-auto max-w-page px-5 py-20 sm:px-8 lg:py-28">
      <h1 className="text-display text-balance">Your store, live by lunch.</h1>
      <p className="mt-6 max-w-prose text-lead text-foreground-muted">
        Matjar gives independent sellers a beautiful storefront and a calm
        dashboard.
      </p>
    </section>
  </main>
</div>
```

Dashboard pages:

```tsx
<main className="mx-auto w-full max-w-wide px-5 py-8 sm:px-8 lg:py-12">
  <header className="flex flex-wrap items-end justify-between gap-4">
    <div>
      <p className="text-caption uppercase tracking-widest text-foreground-subtle">
        Today
      </p>
      <h1 className="mt-2 text-h1">Overview</h1>
    </div>
    <Button>Add product</Button>
  </header>

  <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {/* cards */}
  </section>
</main>
```

## Workflow for humans and agents

Follow this order on every UI task:

1. **Read.** Skim [`design-system.md`](./design-system.md) for available tokens
   and this file for composition rules.
2. **Find the nearest pattern.** Look in `apps/*/app/components` and the
   recipes above. Reuse it. Copying a page is not reuse.
3. **Design the states.** List the states the component needs before writing
   markup.
4. **Build mobile-first, in one theme, with semantic tokens.** Add `dark:` only
   where the rules allow it.
5. **Check RTL and Arabic** by toggling `dir` and `lang` in the root layout.
6. **Self-review** against the checklist below. Fix, do not rationalise.
7. **Verify**: `npx nx run-many -t eslint:lint next:build test` and
   `npx nx format:check --all`.
8. **Document.** New pattern → add it to this file. New token → follow
   `design-system.md`. Either way, add a changelog entry.

Agents must not:

- invent a new visual language for a single screen;
- copy the Create Next App starter page in `apps/matjar` as a design reference;
- add a dependency or a token to make one screen work;
- disable lint, types, or tests to get a build green;
- edit `packages/design-tokens` without updating the token tests and
  `design-system.md`;
- delete or rewrite an existing pattern without updating its call sites and the
  docs.

## Definition of done

- [ ] Only semantic tokens; no hex values, raw palettes, or arbitrary values
      (except justified one-offs like gradient stops).
- [ ] Typography uses the scale; no manual weight, size, or tracking overrides.
- [ ] Logical properties throughout; no `ml-`, `mr-`, `pl-`, `pr-`, `left-`,
      `right-`, `text-left`, `text-right`.
- [ ] Hover, focus-visible, active, disabled, and (where relevant) loading,
      empty, and error states exist.
- [ ] Focus ring is visible; keyboard path works end to end.
- [ ] Mobile 320px, tablet 768px, and desktop 1440px verified.
- [ ] Light and dark verified.
- [ ] LTR and RTL verified, including directional icons.
- [ ] Text contrast meets AA with token pairs; 44px touch targets.
- [ ] Copy is plain, specific, and exists in both locales when the feature does.
- [ ] `npx nx run-many -t eslint:lint next:build test` passes.
- [ ] `npx nx format:check --all` passes.
- [ ] New patterns documented here; tokens documented in
      `design-system.md`; changelog updated.

## Changing the visual language

A visual change is a product decision, not a styling detail. To change a token,
add a pattern, or shift the look:

1. Describe the problem the change solves and where it applies.
2. Change tokens in `packages/design-tokens/src/theme.css` (and `base.css` for
   document-level rules).
3. Update `tokens.test.mjs` — semantic parity, Tailwind aliases, and contrast
   pairs.
4. `npx nx test design-tokens`.
5. Update `design-system.md` and, when composition changes, this file.
6. Add a changelog entry and get the change reviewed before applying it across
   apps.

Do not ship a one-off component that quietly introduces a new radius, shadow,
colour, font, or motion curve. It will be copied.

## Current known deviations

New code follows this guide. These existing spots predate it and should be
brought in line when they are next touched; do not use them as references.

| Location                   | Deviation                              | Follow                           |
| -------------------------- | -------------------------------------- | -------------------------------- |
| `apps/matjar/app/page.tsx` | Still the Create Next App starter page | Rebuild from the templates above |
