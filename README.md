# Matjar

Matjar is a Shopify-style commerce platform for independent sellers: a fast
storefront, a calm seller dashboard, and the essentials needed to launch and
run an online shop.

We are also a software engineering team. When a store or business needs
software that no product covers — a custom portal, an integration, an internal
tool — we design and build it alongside the Matjar platform.

This repository is an [Nx](https://nx.dev) monorepo built with Next.js, React,
TypeScript, and Tailwind CSS.

## Applications

| App     | Description                           | Path           | Dev port | Command               |
| ------- | ------------------------------------- | -------------- | -------- | --------------------- |
| Store   | The commerce app and seller dashboard | `apps/matjar`  | 3000     | `npm run dev:store`   |
| Landing | The public marketing site             | `apps/landing` | 3001     | `npm run dev:landing` |

## What we do

| Offer               | What it covers                                                                                     |
| ------------------- | -------------------------------------------------------------------------------------------------- |
| Matjar commerce     | Storefront, seller dashboard, products, inventory, orders, payments, and the essentials to launch. |
| Custom software     | Bespoke web applications, internal tools, and workflows built around your business.                |
| Integrations        | Connections to ERP, accounting, payment, and shipping systems so data stays in sync.               |
| Business portals    | Customer, partner, and staff portals that share data with the store.                               |
| Ongoing engineering | Support, maintenance, and new features after launch.                                               |

Our engineers have almost a decade of experience delivering software at
ITworx, Ejada, Bank Misr, and Suez Canal Bank. That experience sits behind both
Matjar and every custom engagement.

To discuss a project, write to [hello@matjar.store](mailto:hello@matjar.store).
See [Services](docs/services.md) for the full offer.

## Project structure

```
.
├── apps/
│   ├── landing/          # Marketing site (Next.js App Router)
│   └── matjar/           # Store app (Next.js App Router)
├── packages/             # Shared libraries (`@matjar/design-tokens`)
├── docs/                 # Project documentation and changelog
├── nx.json               # Nx workspace configuration
├── package.json          # Root scripts and shared dependencies
└── tsconfig.base.json    # Shared TypeScript options
```

## Requirements

- Node.js 24+
- npm 11+

## Getting started

```bash
npm install
```

Run both apps:

```bash
npm run dev
```

Or run them individually:

```bash
npm run dev:store    # http://localhost:3000
npm run dev:landing  # http://localhost:3001
```

## Commands

| Command               | What it does                       |
| --------------------- | ---------------------------------- |
| `npm run dev`         | Start both apps with Nx            |
| `npm run dev:store`   | Start the store app on port 3000   |
| `npm run dev:landing` | Start the landing app on port 3001 |
| `npm run build`       | Build every app                    |
| `npm run lint`        | Lint every app                     |
| `npm run test`        | Run unit and contract tests        |
| `npm run format`      | Format the workspace with Prettier |
| `npm run graph`       | Open the Nx project graph          |

You can also target a single project directly:

```bash
npx nx next:build matjar
npx nx next:dev landing
npx nx show project matjar
```

## Configuration

The landing app links its calls to action to the store app. Set the target URL
when the store is deployed:

```bash
NEXT_PUBLIC_STORE_URL=https://shop.example.com
```

It defaults to `http://localhost:3000` in development.

## Documentation

- [Services](docs/services.md) — commerce platform, custom software, and how we
  start an engagement
- [Design system](docs/design-system.md) — tokens, typography, color, logo
- [UI guidelines](docs/ui-guidelines.md) — look and feel, components, states,
  RTL, accessibility, review checklist
- [Changelog](docs/changelog.md)

## Git flow

Work on feature branches, merge into `dev`, and promote to `main` for releases.
