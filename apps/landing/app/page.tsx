import type { ReactNode } from "react";

import { MatjarMark } from "./components/matjar-mark";

const storeUrl = process.env.NEXT_PUBLIC_STORE_URL ?? "http://localhost:3000";

const features = [
  {
    title: "A storefront that sells",
    description:
      "Fast, responsive pages with clean product, collection, and checkout flows — tuned for mobile shoppers.",
    icon: <path d="M3 9.5 5 4h14l2 5.5M4 9.5V20h16V9.5M9 20v-6h6v6" />,
  },
  {
    title: "Products and inventory",
    description:
      "Variants, stock levels, collections, and imports that stay out of your way while you grow.",
    icon: (
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Zm0 9 8-4.5M12 12 4 7.5M12 12v9" />
    ),
  },
  {
    title: "Orders in one place",
    description:
      "Follow payments, fulfilment, and returns from a single dashboard built for busy days.",
    icon: <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />,
  },
  {
    title: "Payments that fit",
    description:
      "Cards, wallets, and cash on delivery, with payouts and fees you can actually follow.",
    icon: <path d="M3 7h18v10H3V7Zm0 4h18M7 15h3" />,
  },
  {
    title: "Your brand, your domain",
    description:
      "Custom domains, colours, and content. Make the shop feel like yours, without fighting templates.",
    icon: (
      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0c2.5-2.4 4-5.5 4-9s-1.5-6.6-4-9c-2.5 2.4-4 5.5-4 9s1.5 6.6 4 9ZM3.5 9h17M3.5 15h17" />
    ),
  },
  {
    title: "Numbers that matter",
    description:
      "Revenue, conversion, and best sellers, updated as orders come in. No spreadsheet gymnastics.",
    icon: <path d="M4 19V5m0 14h16M8 16v-5m4 5V8m4 8v-3" />,
  },
];

const services = [
  {
    title: "Custom software",
    description:
      "A workflow no product covers? We design and build it with you, from first sketch to production.",
    icon: <path d="m9 8-4 4 4 4M15 8l4 4-4 4M13 5l-2 14" />,
  },
  {
    title: "Integrations",
    description:
      "Connect Matjar to your ERP, accounting, payment, and shipping systems so data moves without re-typing.",
    icon: (
      <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
    ),
  },
  {
    title: "Business portals",
    description:
      "Customer, partner, and staff portals that sit next to your store and work from the same data.",
    icon: <path d="M3 5h18v14H3V5Zm0 4h18M7 6.5h.01M9.5 6.5h.01M12 6.5h.01" />,
  },
  {
    title: "Ongoing engineering",
    description:
      "Support, maintenance, and new features after launch, with the same team that built the system.",
    icon: (
      <>
        <path d="M12 3 4 6v6c0 4.5 3.4 7.6 8 9 4.6-1.4 8-4.5 8-9V6l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
];

const steps = [
  {
    number: "01",
    title: "Create your store",
    description:
      "Pick a name and a look. Matjar sets up your storefront, dashboard, and default pages.",
  },
  {
    number: "02",
    title: "Add your products",
    description:
      "Upload products one by one or import a CSV. Set variants, prices, images, and stock.",
  },
  {
    number: "03",
    title: "Share and sell",
    description:
      "Connect your domain, share your link, and start taking orders from day one.",
  },
];

const faqs = [
  {
    question: "Do I need a developer?",
    answer:
      "No. Matjar is built for sellers. You can launch, add products, and manage orders entirely from the dashboard.",
  },
  {
    question: "Can you build something custom for my business?",
    answer:
      "Yes. Matjar is the commerce platform, and our engineering team builds the custom pieces around it: portals, integrations, internal tools, and new products. We have almost a decade of experience delivering software at ITworx, Ejada, Bank Misr, and Suez Canal Bank. Write to hello@matjar.store with what you need.",
  },
  {
    question: "Can I use my own domain?",
    answer:
      "Yes. Connect a domain you already own, or start on a free matjar.store address and move over later.",
  },
  {
    question: "How do payments work?",
    answer:
      "Connect your payment provider to accept cards and wallets. Cash on delivery is available for local orders.",
  },
  {
    question: "Is Matjar free?",
    answer:
      "Matjar is free while in private beta. You only pay for your domain and payment processing fees.",
  },
];

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function FeatureIcon({ children }: { children: ReactNode }) {
  return (
    <span className="grid size-10 place-items-center rounded-xl bg-primary-subtle text-primary-subtle-foreground ring-1 ring-primary/10">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-5"
      >
        {children}
      </svg>
    </span>
  );
}

function HeroPreview() {
  const bars = [38, 54, 44, 68, 58, 82, 72, 94];

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div
        aria-hidden="true"
        className="absolute -inset-5 -z-10 rounded-3xl bg-linear-to-br from-palm-200/70 via-nile-100/60 to-mango-100/70 blur-2xl"
      />

      <div className="overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-border bg-surface-muted/80 px-4 py-3">
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="ms-2 truncate rounded-md bg-surface px-2 py-1 text-caption text-foreground-muted ring-1 ring-border">
            matjar.store/your-shop
          </span>
        </div>

        <div className="grid gap-4 p-4 sm:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-2xl border border-border bg-surface-muted/60 p-3">
            <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-linear-to-br from-palm-200 via-nile-100 to-mango-100">
              <span className="absolute start-2.5 top-2.5 rounded-full bg-surface/80 px-2 py-0.5 text-caption font-medium text-primary-subtle-foreground backdrop-blur">
                New drop
              </span>
              <div className="absolute inset-0 grid place-items-center">
                <div className="h-24 w-16 rounded-t-full rounded-b-lg bg-surface/70 shadow-sm" />
              </div>
            </div>

            <div className="mt-3 flex items-start justify-between gap-2">
              <div>
                <p className="text-small font-semibold">Linen overshirt</p>
                <p className="text-caption text-foreground-muted">Sand · M</p>
              </div>
              <p className="font-mono text-small">$89</p>
            </div>

            <div className="mt-3 rounded-lg bg-foreground py-2 text-center text-caption font-medium text-background">
              Add to cart
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-3 sm:mt-8">
            <div className="flex items-center justify-between">
              <p className="text-caption uppercase tracking-widest text-foreground-subtle">
                Revenue
              </p>
              <span className="rounded-full bg-primary-subtle px-1.5 py-0.5 text-caption font-medium text-primary-subtle-foreground">
                Live
              </span>
            </div>
            <p className="mt-1 font-mono text-h3">$1,284</p>
            <p className="text-caption text-success">+18% today</p>

            <div className="mt-4 flex h-16 items-end gap-1" aria-hidden="true">
              {bars.map((height, index) => (
                <span
                  key={index}
                  style={{ height: `${height}%` }}
                  className="flex-1 rounded-sm bg-chart-1"
                />
              ))}
            </div>

            <div className="mt-4 space-y-2 border-t border-border pt-3 text-caption">
              <div className="flex items-center justify-between">
                <span className="text-foreground-muted">#1042 · Order</span>
                <span className="font-mono">$89</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground-muted">#1041 · Order</span>
                <span className="font-mono">$142</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-5 -start-3 hidden items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-caption shadow-lg sm:flex">
        <span className="grid size-6 place-items-center rounded-full bg-primary-subtle text-primary-subtle-foreground">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-3.5"
          >
            <path d="m5 12 4 4L19 6" />
          </svg>
        </span>
        <span>
          <span className="font-medium">New order</span>
          <span className="text-foreground-muted"> · just now</span>
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-foreground/5 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-page items-center justify-between px-5 py-4 sm:px-8">
          <a
            href="#"
            className="flex items-center gap-2.5"
            aria-label="Matjar home"
          >
            <MatjarMark className="size-9 text-primary" />
            <span className="text-lead font-semibold tracking-tight">
              matjar
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-small text-foreground-muted md:flex">
            <a
              className="transition-colors hover:text-foreground"
              href="#features"
            >
              Features
            </a>
            <a
              className="transition-colors hover:text-foreground"
              href="#services"
            >
              Services
            </a>
            <a
              className="transition-colors hover:text-foreground"
              href="#how-it-works"
            >
              How it works
            </a>
            <a className="transition-colors hover:text-foreground" href="#faq">
              FAQ
            </a>
          </nav>

          <a
            href={storeUrl}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-small font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            Open store
            <ArrowRight className="size-4" />
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 end-0 size-128 rounded-full bg-palm-200/40 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -start-40 top-40 size-104 rounded-full bg-mango-100/60 blur-3xl"
          />

          <div className="relative mx-auto grid max-w-page gap-16 px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-12 lg:pb-28 lg:pt-24">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary-subtle px-3 py-1 text-caption font-medium text-primary-subtle-foreground">
                <span className="size-1.5 rounded-full bg-primary" />
                Private beta · now onboarding
              </p>

              <h1 className="mt-6 text-balance text-display">
                Your store,
                <br />
                <span className="text-primary">live by lunch.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lead leading-8 text-foreground-muted">
                Matjar gives independent sellers a beautiful storefront, a calm
                dashboard, and everything needed to take orders — without hiring
                a developer. When you need something custom, our engineering
                team can build that too.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={storeUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-small font-semibold text-primary-foreground shadow-lg transition-colors hover:bg-primary-hover"
                >
                  Start selling free
                  <ArrowRight className="size-4" />
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-full border border-border-strong bg-surface/60 px-6 py-3.5 text-small font-medium text-foreground-muted transition-colors hover:border-foreground-subtle hover:text-foreground"
                >
                  See how it works
                </a>
              </div>

              <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6">
                <div>
                  <dt className="text-caption uppercase tracking-widest text-foreground-subtle">
                    Launch
                  </dt>
                  <dd className="mt-1 text-small font-semibold">2 minutes</dd>
                </div>
                <div>
                  <dt className="text-caption uppercase tracking-widest text-foreground-subtle">
                    Code
                  </dt>
                  <dd className="mt-1 text-small font-semibold">None needed</dd>
                </div>
                <div>
                  <dt className="text-caption uppercase tracking-widest text-foreground-subtle">
                    Dashboard
                  </dt>
                  <dd className="mt-1 text-small font-semibold">One place</dd>
                </div>
              </dl>
            </div>

            <HeroPreview />
          </div>
        </section>

        <section
          id="features"
          className="scroll-mt-24 border-y border-border/70 bg-surface/50"
        >
          <div className="mx-auto max-w-page px-5 py-20 sm:px-8 lg:py-28">
            <div className="max-w-2xl">
              <p className="text-caption uppercase tracking-widest text-primary">
                Everything included
              </p>
              <h2 className="mt-3 text-balance text-h2">
                Everything you need to open shop
              </h2>
              <p className="mt-4 text-body leading-7 text-foreground-muted">
                No plugin sprawl, no setup weekend. Matjar keeps the essentials
                together so you can focus on your products.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-border/80 bg-surface p-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <FeatureIcon>{feature.icon}</FeatureIcon>
                  <h3 className="mt-4 text-h3">{feature.title}</h3>
                  <p className="mt-2 text-small leading-6 text-foreground-muted">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="scroll-mt-24">
          <div className="mx-auto max-w-page px-5 py-20 sm:px-8 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div>
                <p className="text-caption uppercase tracking-widest text-primary">
                  Software services
                </p>
                <h2 className="mt-3 text-balance text-h2">
                  More than a storefront
                </h2>
                <p className="mt-4 text-lead text-foreground-muted">
                  Matjar is a commerce platform, but our business does not stop
                  at shops. We build the software your business needs around
                  them — even when that software does not exist yet.
                </p>
                <p className="mt-4 text-body text-foreground-muted">
                  If your store or business needs a custom portal, an
                  integration, or a tool no product covers, our engineers design
                  and build it with you.
                </p>

                <div className="mt-6 rounded-2xl border border-border bg-surface-muted/60 p-5">
                  <p className="text-caption uppercase tracking-widest text-foreground-subtle">
                    Engineering background
                  </p>
                  <p className="mt-2 text-small leading-6 text-foreground-muted">
                    Almost a decade of experience delivering software at{" "}
                    <span className="font-medium text-foreground">ITworx</span>,{" "}
                    <span className="font-medium text-foreground">Ejada</span>,{" "}
                    <span className="font-medium text-foreground">
                      Bank Misr
                    </span>
                    , and{" "}
                    <span className="font-medium text-foreground">
                      Suez Canal Bank
                    </span>
                    .
                  </p>
                </div>

                <a
                  href="mailto:hello@matjar.store?subject=Custom%20software"
                  className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-surface px-4 text-small font-medium text-foreground transition-colors hover:border-border-strong hover:bg-surface-muted"
                >
                  Tell us what you need
                  <ArrowRight className="size-4 icon-directional" />
                </a>
              </div>

              <ul className="grid gap-4 sm:grid-cols-2">
                {services.map((service) => (
                  <li
                    key={service.title}
                    className="rounded-2xl border border-border bg-surface p-6 transition duration-200 hover:shadow-lg"
                  >
                    <FeatureIcon>{service.icon}</FeatureIcon>
                    <h3 className="mt-4 text-h3">{service.title}</h3>
                    <p className="mt-2 text-small leading-6 text-foreground-muted">
                      {service.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-24">
          <div className="mx-auto max-w-page px-5 py-20 sm:px-8 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div>
                <p className="text-caption uppercase tracking-widest text-primary">
                  How it works
                </p>
                <h2 className="mt-3 text-balance text-h2">
                  From idea to first order in three steps
                </h2>
                <p className="mt-4 text-body leading-7 text-foreground-muted">
                  Skip the setup spiral. Matjar handles the scaffolding so you
                  can get your products in front of people.
                </p>
              </div>

              <ol className="grid gap-4">
                {steps.map((step) => (
                  <li
                    key={step.number}
                    className="flex gap-5 rounded-2xl border border-border/80 bg-surface p-6"
                  >
                    <span className="font-mono text-small text-primary">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="text-h3">{step.title}</h3>
                      <p className="mt-1.5 text-small leading-6 text-foreground-muted">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="scroll-mt-24 border-y border-border/70 bg-surface/50"
        >
          <div className="mx-auto grid max-w-page gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-28">
            <div>
              <p className="text-caption uppercase tracking-widest text-primary">
                FAQ
              </p>
              <h2 className="mt-3 text-h2">Good questions</h2>
              <p className="mt-4 text-body leading-7 text-foreground-muted">
                Still curious? Write to us at{" "}
                <a
                  className="font-medium text-primary underline-offset-4 hover:underline"
                  href="mailto:hello@matjar.store"
                >
                  hello@matjar.store
                </a>
                .
              </p>
            </div>

            <div className="divide-y divide-border border-y border-border">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-small font-medium [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      className="size-4 shrink-0 text-foreground-subtle transition-transform group-open:rotate-45"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </summary>
                  <p className="mt-3 max-w-xl text-small leading-6 text-foreground-muted">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 lg:py-24">
          <div className="relative mx-auto max-w-page overflow-hidden rounded-3xl bg-foreground px-6 py-16 text-center sm:px-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -end-20 -top-24 size-80 rounded-full bg-primary/20 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -start-20 size-80 rounded-full bg-mango-400/10 blur-3xl"
            />

            <div className="relative">
              <h2 className="text-balance text-h2 text-background">
                Ready to open your shop?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-body leading-7 text-background">
                Bring your products. Matjar brings the storefront, dashboard,
                and checkout. You could be live before your coffee goes cold.
              </p>
              <a
                href={storeUrl}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-small font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
              >
                Open your store
                <ArrowRight className="size-4" />
              </a>
              <p className="mt-4 text-caption text-background">
                Free while in beta · No credit card required
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/70">
        <div className="mx-auto flex max-w-page flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-2.5">
            <span className="grid size-7 place-items-center rounded-md bg-primary text-caption font-semibold text-primary-foreground">
              m
            </span>
            <span className="text-small font-semibold">matjar</span>
            <span className="text-small text-foreground-subtle">
              · commerce software and custom builds
            </span>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-small text-foreground-muted">
            <a className="hover:text-foreground" href="#features">
              Features
            </a>
            <a className="hover:text-foreground" href="#services">
              Services
            </a>
            <a className="hover:text-foreground" href="#how-it-works">
              How it works
            </a>
            <a
              className="hover:text-foreground"
              href="https://github.com/YoussefNour/matjar"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <span className="text-foreground-subtle">
              © {new Date().getFullYear()} Matjar
            </span>
          </nav>
        </div>
      </footer>
    </>
  );
}
