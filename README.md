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

To discuss a project, use the Let's talk form on the landing site.
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

The landing Let's talk form sends mail through [Resend](https://resend.com).
Set these in the environment for `apps/landing` (a local `.env` is fine; do not
commit the API key):

```bash
RESEND_API_KEY=re_xxxxxxxx
```

Every message is sent from `Matjar <onboarding@resend.dev>` to
`ahmedbahaa.6251@gmail.com`. That test sender only delivers to the email
address on the Resend account.
Set `CONTACT_TO` to a comma-separated list if those inboxes should change.

The visitor's address is the reply-to, so a reply from either inbox goes
back to the person who wrote in.

## Deployment

Deploy the landing app on Vercel with the project root set to `apps/landing`.
The app build runs Next from the workspace install, so Vercel does not need
`nx` on the command path.

## Documentation

- [Services](docs/services.md) — commerce platform, custom software, and how we
  start an engagement
- [Design system](docs/design-system.md) — tokens, typography, color, logo
- [UI guidelines](docs/ui-guidelines.md) — look and feel, components, states,
  RTL, accessibility, review checklist
- [Changelog](docs/changelog.md)

## Git flow

Work on feature branches, merge into `dev`, and promote to `main` for releases.
