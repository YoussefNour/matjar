# Matjar Design System

The Matjar design system lives in `packages/design-tokens` as the
`@matjar/design-tokens` workspace package. It is CSS-first: Tailwind CSS v4
reads the tokens directly, so there is no build step and no duplicated
JavaScript theme object.

This file owns token values and usage. For how tokens are composed into pages,
components, and states — plus the review checklist — read the
[UI guidelines](./ui-guidelines.md).

## Principles

- **Warm, not corporate.** Limestone sand neutrals, palm green, and mango
  accents feel Egyptian without leaning on pyramids or clichés.
- **Arabic is a first-class script.** Arabic typography gets its own font
  stack, leading, and tracking rules instead of inheriting Latin defaults.
- **Semantic tokens over raw values.** Product code should use
  `bg-background`, `text-foreground`, and `bg-primary` rather than
  `bg-sand-50` or `bg-palm-700`. Palettes can change without touching pages.
- **Accessible by default.** Core text pairs are tested against WCAG AA, focus
  rings are visible, and reduced-motion preferences are respected.

## Using the tokens

Import the package once in an app's global stylesheet:

```css
/* apps/*/app/globals.css */
@import "@matjar/design-tokens";
```

Load the font variables in the root layout with `next/font`:

```tsx
const latinSans = Geist({ variable: "--font-latin-sans", subsets: ["latin"] });
const latinMono = Geist_Mono({ variable: "--font-latin-mono", subsets: ["latin"] });
const arabicSans = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic-sans",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

<html lang="en" dir="ltr" className={`${latinSans.variable} ${latinMono.variable} ${arabicSans.variable}`}>
```

Then style with Tailwind utilities backed by the tokens:

```tsx
<main className="bg-background text-foreground">
  <h1 className="text-h1">Your store, live by lunch.</h1>
  <button className="rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary-hover">
    Start selling
  </button>
</main>
```

## Logo

The Matjar mark is an **arcade**: three columns and two round arches that also
read as the letter **m**, with a mango sun overhead. It stands for a store that
is open to the street and a new day of selling. The round arches echo the
system's radii, and the two colours are the brand pair: palm for the shop,
mango for the sun.

| File                          | Use                                                       |
| ----------------------------- | --------------------------------------------------------- |
| `assets/matjar-mark.svg`      | Primary mark, reads `--primary` / `--accent` when inlined |
| `assets/matjar-mark-mono.svg` | Single colour via `currentColor`                          |
| `assets/matjar-app-icon.svg`  | 512px rounded tile for favicons and app icons             |

Rules:

- Pair the mark with the wordmark set in `font-sans` at semibold with tight
  tracking — never redraw the wordmark, and do not add a second symbol.
- Keep clear space of at least a quarter of the mark's height on every side.
- Minimum size is 16px. Below that, use the tile icon so the sun stays legible.
- Do not mirror the mark in RTL. Logos are exempt from directional mirroring.
- Recolour only with `primary` and `accent`. In one-colour contexts, use the
  mono file in `foreground`, `primary-foreground`, or white.

```tsx
import { MatjarMark } from "./components/matjar-mark";

<a href="/" aria-label="Matjar home" className="flex items-center gap-2.5">
  <MatjarMark className="size-9 text-primary" />
  <span className="text-lg font-semibold tracking-tight">matjar</span>
</a>;
```

The landing app also serves the tile as `app/icon.svg`, which Next.js turns
into the favicon.

## Color

### Semantic colors

| Token                 | Light     | Dark      | Use                                       |
| --------------------- | --------- | --------- | ----------------------------------------- |
| `background`          | `#FBF8F2` | `#12100C` | App canvas                                |
| `surface`             | `#FFFFFF` | `#1B1712` | Cards, sheets, inputs                     |
| `surface-raised`      | `#FFFFFF` | `#241F19` | Menus, popovers                           |
| `surface-muted`       | `#F4EFE4` | `#211D17` | Subtle sections, code blocks              |
| `foreground`          | `#12100C` | `#FBF8F2` | Primary text                              |
| `foreground-muted`    | `#6E6250` | `#D6CAB4` | Secondary text                            |
| `foreground-subtle`   | `#7C6E58` | `#B5A78C` | Metadata and non-essential labels         |
| `border`              | `#E8E0D0` | `#332D24` | Default borders and dividers              |
| `border-strong`       | `#D6CAB4` | `#51483A` | Hovered or emphasized borders             |
| `ring`                | `#077A54` | `#6CCEA4` | Focus rings                               |
| `primary`             | `#086245` | `#35B27F` | Primary actions and brand moments         |
| `primary-foreground`  | `#FFFFFF` | `#04241B` | Text on primary                           |
| `primary-subtle`      | `#D2F1E2` | `#093F2F` | Brand-tinted badges and highlights        |
| `accent`              | `#FFC155` | `#FFC155` | Promotional highlights and secondary CTAs |
| `accent-foreground`   | `#12100C` | `#12100C` | Text on accent                            |
| `success`             | `#077A54` | `#35B27F` | Successful payments and stock             |
| `warning`             | `#FCA82A` | `#FFC155` | Low stock and attention states            |
| `danger`              | `#C4322A` | `#F97066` | Destructive actions and errors            |
| `info`                | `#116B8A` | `#79C2DB` | Informational callouts                    |
| `chart-1` … `chart-6` | mixed     | mixed     | Dashboard data visualisation              |

### Palettes

Raw scales exist for charts, illustrations, and decorative gradients:

- `sand`: warm limestone neutrals, `50`–`950`
- `palm`: primary green, `50`–`950`
- `mango`: warm accent, `50`–`950`
- `nile`: cool blue, `50`–`950`
- `hibiscus`: grounded red, `50`–`950`
- `plum`: a single accent for chart series

Use raw palette utilities only when a semantic token does not fit. Never
hardcode hex values in components.

### Contrast

`packages/design-tokens/src/tokens.test.mjs` resolves the token graph and
checks core text pairs at **4.5:1 or higher** in both light and dark themes.
If you add a semantic pair, add it to the contrast test.

## Typography

| Utility           | Size                                      | Use                        |
| ----------------- | ----------------------------------------- | -------------------------- |
| `text-display-lg` | `clamp(3.5rem, 2.6rem + 4.5vw, 6.5rem)`   | Hero headlines             |
| `text-display`    | `clamp(2.75rem, 2.1rem + 3.25vw, 4.5rem)` | Large section headlines    |
| `text-h1`         | `clamp(2.25rem, 1.9rem + 1.75vw, 3.5rem)` | Page titles                |
| `text-h2`         | `clamp(1.75rem, 1.5rem + 1.25vw, 2.5rem)` | Section titles             |
| `text-h3`         | `1.375rem`                                | Card and subsection titles |
| `text-lead`       | `1.125rem`                                | Intro paragraphs           |
| `text-body`       | `1rem`                                    | Default body copy          |
| `text-small`      | `0.875rem`                                | Supporting copy            |
| `text-caption`    | `0.75rem`                                 | Labels and metadata        |

Display and heading utilities ship their own line height, tracking, and weight,
so `text-h1` is enough; do not stack `text-4xl font-bold tracking-tight`.

Font stacks:

- `font-sans`: Latin sans (`Geist`) with an Arabic fallback (`IBM Plex Sans
Arabic`)
- `font-arabic`: Arabic-first stack for Arabic-only surfaces
- `font-mono`: Latin mono (`Geist Mono`) for prices, order IDs, and code

## Layout, shape, and depth

- Spacing follows Tailwind's `0.25rem` base scale.
- Containers: `max-w-page` (75rem), `max-w-wide` (90rem),
  `max-w-prose` (42rem).
- An extra `xs` breakpoint sits at `30rem` for small phones.
- Radii: `rounded-xs` through `rounded-3xl`, from 4px to 40px.
- Shadows: `shadow-xs` through `shadow-2xl`, plus `shadow-glow` for primary
  emphasis. Shadows are warm-tinted in light mode and deeper in dark mode.
- Motion: `ease-snappy` (default), `ease-out-soft`, `ease-spring`; transitions
  default to `180ms`. `animate-rise` and `animate-fade-in` are available.

## Dark mode

Dark mode is class-based so a seller can choose it independently of their OS:

```tsx
<html className="dark">
```

Use the `dark:` variant for one-off adjustments. Because semantics are
remapped, most components need no `dark:` classes at all.

## Arabic and English

The design system is direction-agnostic. Apps own the locale:

```tsx
<html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
```

Rules:

- Use **logical utilities**: `ps-*`/`pe-*`, `ms-*`/`me-*`, `start-*`/`end-*`,
  `text-start`/`text-end`, `border-s`/`border-e`. Avoid `left-*`, `right-*`,
  `ml-*`, `mr-*`, `pl-*`, and `pr-*`.
- Add `icon-directional` to arrows and chevrons that should mirror in RTL.
  Decorative art and logos should not mirror.
- Phone, email, and URL inputs stay LTR automatically in RTL documents.
- Arabic typography overrides live in `base.css` under `html[lang="ar"]`. They
  loosen display leading and remove negative tracking so Arabic glyphs are not
  cramped.
- Do not apply negative tracking manually on Arabic text. Use the typography
  utilities and let the locale override handle it.
- Numbers, currency, and dates should be formatted per locale with
  `Intl.NumberFormat`/`Intl.DateTimeFormat`, not hardcoded in the design layer.

## Accessibility

- Focus uses a 2px `ring` outline with a 2px offset.
- `prefers-reduced-motion` collapses animations and transitions.
- Text selection uses palette-aware colors in both themes.
- Avoid `foreground-subtle` for legally required or essential information; it
  is intentionally quieter.
- Interactive targets should be at least 44×44px on touch layouts.

## Testing and extending

```bash
npm run test
npx nx test design-tokens
```

When adding a token:

1. Add the raw value to `@theme` in `theme.css` (or a semantic value to
   `:root` and `.dark`).
2. Alias it in `@theme inline` if it should become a utility.
3. Add it to `SEMANTIC_TOKENS` and the contrast pairs in `tokens.test.mjs` when
   it is a semantic color.
4. Document it in this file.
