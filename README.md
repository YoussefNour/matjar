# Matjar

Matjar is a Shopify-style commerce platform for independent sellers: a fast
storefront, a calm seller dashboard, and the essentials needed to launch and
run an online shop.

This repository is an [Nx](https://nx.dev) monorepo built with Next.js, React,
TypeScript, and Tailwind CSS.

## Applications

| App     | Description                           | Path           | Dev port | Command               |
| ------- | ------------------------------------- | -------------- | -------- | --------------------- |
| Store   | The commerce app and seller dashboard | `apps/matjar`  | 3000     | `npm run dev:store`   |
| Landing | The public marketing site             | `apps/landing` | 3001     | `npm run dev:landing` |

## Project structure

```
.
├── apps/
│   ├── landing/          # Marketing site (Next.js App Router)
│   └── matjar/           # Store app (Next.js App Router)
├── packages/             # Shared libraries (reserved)
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

- [Changelog](docs/changelog.md)

## Git flow

Work on feature branches, merge into `dev`, and promote to `main` for releases.
