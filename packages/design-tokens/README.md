# @matjar/design-tokens

Matjar's shared design tokens. CSS-first, Tailwind CSS v4 native, with Arabic
and English typography baked in.

```css
@import "@matjar/design-tokens";
```

## What is included

- The brand mark and app icon in `assets/` (`matjar-mark.svg`,
  `matjar-mark-mono.svg`, `matjar-app-icon.svg`).
- Semantic color tokens for light and dark mode (`background`, `surface`,
  `foreground`, `primary`, `accent`, `danger`, …) plus warm Egyptian palettes.
- Fluid display and heading type scales with line height and tracking metadata.
- Radii, warm shadows, easing curves, animations, containers, and an extra
  `xs` breakpoint.
- Base styles for focus, selection, reduced motion, Arabic leading/tracking,
  and RTL icon mirroring.

## Example

```tsx
<article className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
  <h2 className="text-h3 text-foreground">New order</h2>
  <p className="text-small text-foreground-muted">Order #1042 · just now</p>
  <button className="mt-4 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary-hover">
    Fulfil order
  </button>
</article>
```

Set `lang` and `dir` on `<html>` from the active locale:

```tsx
<html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
```

Load the font variables with `next/font` in each app:

- `--font-latin-sans`
- `--font-latin-mono`
- `--font-arabic-sans`

## Testing

```bash
npx nx test design-tokens
```

The contract test validates the full palette, light/dark semantic parity, the
Tailwind aliases, typography metadata, logical-property usage, and WCAG AA
contrast for core text pairs.

See [the design system guide](../../docs/design-system.md) for the full token
reference and usage rules, and the
[UI guidelines](../../docs/ui-guidelines.md) for composition, states, RTL, and
review checklists.
