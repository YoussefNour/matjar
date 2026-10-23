import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const sourceDirectory = dirname(fileURLToPath(import.meta.url));

const readSource = (fileName) =>
  readFile(join(sourceDirectory, fileName), "utf8");

const indexCss = await readSource("index.css");
const themeCss = await readSource("theme.css");
const baseCss = await readSource("base.css");

const PALETTE_SCALES = ["sand", "palm", "mango", "nile", "hibiscus"];
const PALETTE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const SEMANTIC_TOKENS = [
  "background",
  "surface",
  "surface-raised",
  "surface-muted",
  "foreground",
  "foreground-muted",
  "foreground-subtle",
  "border",
  "border-strong",
  "ring",
  "primary",
  "primary-hover",
  "primary-foreground",
  "primary-subtle",
  "primary-subtle-foreground",
  "accent",
  "accent-hover",
  "accent-foreground",
  "accent-subtle",
  "accent-subtle-foreground",
  "success",
  "success-foreground",
  "warning",
  "warning-foreground",
  "danger",
  "danger-foreground",
  "info",
  "info-foreground",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "chart-6",
];

const TEXT_SCALES = [
  "display-lg",
  "display",
  "h1",
  "h2",
  "h3",
  "lead",
  "body",
  "small",
  "caption",
];

const MINIMUM_TEXT_CONTRAST = 4.5;

function extractBlock(css, selector) {
  const selectorIndex = css.indexOf(selector);
  assert.notEqual(
    selectorIndex,
    -1,
    `Expected to find "${selector}" in the stylesheet`,
  );

  const openingBrace = css.indexOf("{", selectorIndex);
  assert.notEqual(openingBrace, -1, `Expected "${selector}" to open a block`);

  let depth = 0;

  for (let index = openingBrace; index < css.length; index += 1) {
    if (css[index] === "{") depth += 1;

    if (css[index] === "}") {
      depth -= 1;
      if (depth === 0) return css.slice(openingBrace + 1, index);
    }
  }

  throw new Error(`Unclosed block for "${selector}"`);
}

function readVariables(block) {
  const variables = new Map();

  for (const match of block.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) {
    variables.set(`--${match[1]}`, match[2].trim());
  }

  return variables;
}

function resolveVariable(name, scopes) {
  let value = name;
  let resolutionDepth = 0;

  while (value.startsWith("var(")) {
    resolutionDepth += 1;
    assert.ok(
      resolutionDepth < 10,
      `Circular variable reference while resolving ${name}`,
    );

    const reference = value.slice(4, -1).trim();
    const commaIndex = reference.indexOf(",");
    const referencedName = (
      commaIndex === -1 ? reference : reference.slice(0, commaIndex)
    ).trim();
    const fallback =
      commaIndex === -1 ? undefined : reference.slice(commaIndex + 1).trim();

    const resolved =
      scopes.map((scope) => scope.get(referencedName)).find(Boolean) ??
      fallback;

    assert.ok(
      resolved,
      `Could not resolve ${referencedName} referenced by ${name}`,
    );
    value = resolved;
  }

  return value;
}

function channelToLinear(channel) {
  const normalized = channel / 255;
  return normalized <= 0.03928
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance(hexColor) {
  const value = hexColor.replace("#", "");
  assert.match(
    value,
    /^[0-9a-f]{6}$/i,
    `Expected a six digit hex color, received ${hexColor}`,
  );

  const [red, green, blue] = [0, 2, 4].map((offset) =>
    channelToLinear(Number.parseInt(value.slice(offset, offset + 2), 16)),
  );

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrastRatio(firstColor, secondColor) {
  const firstLuminance = relativeLuminance(firstColor);
  const secondLuminance = relativeLuminance(secondColor);

  return (
    (Math.max(firstLuminance, secondLuminance) + 0.05) /
    (Math.min(firstLuminance, secondLuminance) + 0.05)
  );
}

const themeVariables = readVariables(extractBlock(themeCss, "@theme {"));
const inlineThemeVariables = readVariables(
  extractBlock(themeCss, "@theme inline"),
);
const lightVariables = readVariables(extractBlock(themeCss, ":root {"));
const darkVariables = readVariables(extractBlock(themeCss, ".dark {"));

const palettes = { light: lightVariables, dark: darkVariables };
const resolveIn = (themeMode, tokenName) =>
  resolveVariable(`var(--${tokenName})`, [palettes[themeMode], themeVariables]);

test("the Tailwind entry point loads the theme before the base layer", () => {
  assert.match(indexCss, /@import\s+"tailwindcss";/);
  assert.match(indexCss, /@import\s+"\.\/theme\.css";/);
  assert.match(indexCss, /@import\s+"\.\/base\.css";/);
  assert.ok(
    indexCss.indexOf('"tailwindcss"') < indexCss.indexOf('"./theme.css"'),
    "tailwindcss must be imported before the custom theme",
  );
});

test("the theme enables class based dark mode", () => {
  assert.match(
    themeCss,
    /@custom-variant\s+dark\s+\(&:where\(\.dark,\s*\.dark \*\)\);/,
  );
});

test("every palette scale contains the full 50 to 950 range", () => {
  for (const scale of PALETTE_SCALES) {
    for (const step of PALETTE_STEPS) {
      assert.ok(
        themeVariables.has(`--color-${scale}-${step}`),
        `Missing --color-${scale}-${step}`,
      );
    }
  }
});

test("both color schemes define every semantic token", () => {
  for (const token of SEMANTIC_TOKENS) {
    assert.ok(
      lightVariables.has(`--${token}`),
      `Light theme is missing --${token}`,
    );
    assert.ok(
      darkVariables.has(`--${token}`),
      `Dark theme is missing --${token}`,
    );
  }
});

test("semantic Tailwind utilities are backed by themable CSS variables", () => {
  for (const token of SEMANTIC_TOKENS) {
    assert.equal(
      inlineThemeVariables.get(`--color-${token}`),
      `var(--${token})`,
      `--color-${token} should alias --${token} inside @theme inline`,
    );
  }
});

test("core text and surface pairs meet WCAG AA contrast", () => {
  const contrastPairs = [
    ["background", "foreground"],
    ["surface", "foreground"],
    ["surface-muted", "foreground"],
    ["background", "foreground-muted"],
    ["surface", "foreground-muted"],
    ["background", "foreground-subtle"],
    ["surface", "foreground-subtle"],
    ["primary-subtle", "primary-subtle-foreground"],
    ["accent-subtle", "accent-subtle-foreground"],
    ["primary", "primary-foreground"],
    ["accent", "accent-foreground"],
    ["success", "success-foreground"],
    ["warning", "warning-foreground"],
    ["danger", "danger-foreground"],
    ["info", "info-foreground"],
  ];

  for (const themeMode of ["light", "dark"]) {
    for (const [backgroundToken, foregroundToken] of contrastPairs) {
      const background = resolveIn(themeMode, backgroundToken);
      const foreground = resolveIn(themeMode, foregroundToken);
      const ratio = contrastRatio(background, foreground);

      assert.ok(
        ratio >= MINIMUM_TEXT_CONTRAST,
        `${themeMode}: ${backgroundToken} (${background}) and ${foregroundToken} (${foreground}) only reach ${ratio.toFixed(2)}:1`,
      );
    }
  }
});

test("typography scales ship line height and tracking metadata", () => {
  for (const scale of TEXT_SCALES) {
    assert.ok(themeVariables.has(`--text-${scale}`), `Missing --text-${scale}`);
    assert.ok(
      themeVariables.has(`--text-${scale}--line-height`),
      `Missing line height for --text-${scale}`,
    );
  }

  for (const scale of ["display-lg", "display", "h1", "h2", "h3"]) {
    assert.ok(
      themeVariables.has(`--text-${scale}--letter-spacing`),
      `Missing letter spacing for --text-${scale}`,
    );
  }
});

test("Latin and Arabic font stacks are available", () => {
  const sansStack = themeVariables.get("--font-sans") ?? "";
  const arabicStack = themeVariables.get("--font-arabic") ?? "";

  assert.match(sansStack, /--font-arabic-sans/);
  assert.match(sansStack, /IBM Plex Sans Arabic/);
  assert.match(arabicStack, /--font-arabic-sans/);
  assert.match(arabicStack, /IBM Plex Sans Arabic/);
});

test("Arabic locales get looser leading and no negative tracking", () => {
  const arabicTypography = extractBlock(baseCss, 'html[lang="ar"]');

  assert.match(arabicTypography, /--text-display-lg--line-height:\s*1\.15/);
  assert.match(arabicTypography, /--text-display-lg--letter-spacing:\s*0em/);
  assert.match(arabicTypography, /--text-h1--letter-spacing:\s*0em/);
  assert.match(arabicTypography, /--text-h3--letter-spacing:\s*0em/);
});

test("base styles support RTL, focus visibility, and reduced motion", () => {
  assert.match(baseCss, /\[dir="rtl"\]/);
  assert.match(baseCss, /:focus-visible/);
  assert.match(baseCss, /prefers-reduced-motion/);
});

test("the library only uses logical direction properties", () => {
  const physicalProperties = [
    /margin-(left|right)\s*:/,
    /padding-(left|right)\s*:/,
    /border-(left|right)(-\w+)?\s*:/,
    /\b(left|right)\s*:/,
  ];

  for (const stylesheet of [themeCss, baseCss, indexCss]) {
    for (const physicalProperty of physicalProperties) {
      assert.doesNotMatch(stylesheet, physicalProperty);
    }
  }
});
