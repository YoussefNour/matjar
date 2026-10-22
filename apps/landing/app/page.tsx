import type { ReactNode } from "react";

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
    <span className="grid size-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10">
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
        className="absolute -inset-5 -z-10 rounded-[2.5rem] bg-linear-to-br from-emerald-200/70 via-lime-100/60 to-amber-100/70 blur-2xl"
      />

      <div className="overflow-hidden rounded-[1.75rem] border border-stone-200/80 bg-white shadow-2xl shadow-stone-900/10">
        <div className="flex items-center gap-1.5 border-b border-stone-100 bg-stone-50/80 px-4 py-3">
          <span className="size-2.5 rounded-full bg-stone-300" />
          <span className="size-2.5 rounded-full bg-stone-200" />
          <span className="size-2.5 rounded-full bg-stone-200" />
          <span className="ml-2 truncate rounded-md bg-white px-2 py-1 text-[11px] text-stone-500 ring-1 ring-stone-200">
            matjar.store/your-shop
          </span>
        </div>

        <div className="grid gap-4 p-4 sm:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-2xl border border-stone-100 bg-stone-50/60 p-3">
            <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-linear-to-br from-emerald-200 via-teal-100 to-amber-100">
              <span className="absolute left-2.5 top-2.5 rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-medium text-emerald-800 backdrop-blur">
                New drop
              </span>
              <div className="absolute inset-0 grid place-items-center">
                <div className="h-24 w-16 rounded-t-full rounded-b-lg bg-white/70 shadow-sm" />
              </div>
            </div>

            <div className="mt-3 flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold">Linen overshirt</p>
                <p className="text-[11px] text-stone-500">Sand · M</p>
              </div>
              <p className="font-mono text-sm">$89</p>
            </div>

            <div className="mt-3 rounded-lg bg-stone-900 py-2 text-center text-[11px] font-medium text-white">
              Add to cart
            </div>
          </div>

          <div className="rounded-2xl border border-stone-100 bg-white p-3 sm:mt-8">
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.14em] text-stone-400">
                Revenue
              </p>
              <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700">
                Live
              </span>
            </div>
            <p className="mt-1 font-mono text-2xl tracking-tight">$1,284</p>
            <p className="text-[10px] text-emerald-600">+18% today</p>

            <div className="mt-4 flex h-16 items-end gap-1" aria-hidden="true">
              {bars.map((height, index) => (
                <span
                  key={index}
                  style={{ height: `${height}%` }}
                  className="flex-1 rounded-sm bg-emerald-500/80"
                />
              ))}
            </div>

            <div className="mt-4 space-y-2 border-t border-stone-100 pt-3 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-stone-500">#1042 · Order</span>
                <span className="font-mono">$89</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">#1041 · Order</span>
                <span className="font-mono">$142</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-5 -left-3 hidden items-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs shadow-lg shadow-stone-900/10 sm:flex">
        <span className="grid size-6 place-items-center rounded-full bg-emerald-100 text-emerald-700">
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
          <span className="text-stone-500"> · just now</span>
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-stone-900/5 bg-[#faf9f6]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a
            href="#"
            className="flex items-center gap-2.5"
            aria-label="Matjar home"
          >
            <span className="grid size-8 place-items-center rounded-lg bg-emerald-600 text-sm font-semibold text-white">
              m
            </span>
            <span className="text-lg font-semibold tracking-tight">matjar</span>
          </a>

          <nav className="hidden items-center gap-7 text-sm text-stone-600 md:flex">
            <a
              className="transition-colors hover:text-stone-950"
              href="#features"
            >
              Features
            </a>
            <a
              className="transition-colors hover:text-stone-950"
              href="#how-it-works"
            >
              How it works
            </a>
            <a className="transition-colors hover:text-stone-950" href="#faq">
              FAQ
            </a>
          </nav>

          <a
            href={storeUrl}
            className="inline-flex items-center gap-1.5 rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-700"
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
            className="pointer-events-none absolute -top-40 right-0 size-[32rem] rounded-full bg-emerald-200/40 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-40 top-40 size-[26rem] rounded-full bg-amber-100/60 blur-3xl"
          />

          <div className="relative mx-auto grid max-w-6xl gap-16 px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-12 lg:pb-28 lg:pt-24">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-600/15 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Private beta · now onboarding
              </p>

              <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                Your store,
                <br />
                <span className="text-emerald-700">live by lunch.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
                Matjar gives independent sellers a beautiful storefront, a calm
                dashboard, and everything needed to take orders — without hiring
                a developer.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={storeUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-colors hover:bg-emerald-700"
                >
                  Start selling free
                  <ArrowRight className="size-4" />
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white/60 px-6 py-3.5 text-sm font-medium text-stone-700 transition-colors hover:border-stone-400 hover:text-stone-950"
                >
                  See how it works
                </a>
              </div>

              <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-stone-200 pt-6">
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.12em] text-stone-400">
                    Launch
                  </dt>
                  <dd className="mt-1 text-sm font-semibold">2 minutes</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.12em] text-stone-400">
                    Code
                  </dt>
                  <dd className="mt-1 text-sm font-semibold">None needed</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.12em] text-stone-400">
                    Dashboard
                  </dt>
                  <dd className="mt-1 text-sm font-semibold">One place</dd>
                </div>
              </dl>
            </div>

            <HeroPreview />
          </div>
        </section>

        <section
          id="features"
          className="scroll-mt-24 border-y border-stone-200/70 bg-white/50"
        >
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Everything included
              </p>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                Everything you need to open shop
              </h2>
              <p className="mt-4 text-base leading-7 text-stone-600">
                No plugin sprawl, no setup weekend. Matjar keeps the essentials
                together so you can focus on your products.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-stone-200/80 bg-white p-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-stone-900/5"
                >
                  <FeatureIcon>{feature.icon}</FeatureIcon>
                  <h3 className="mt-4 text-base font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-24">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  How it works
                </p>
                <h2 className="mt-3 text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                  From idea to first order in three steps
                </h2>
                <p className="mt-4 text-base leading-7 text-stone-600">
                  Skip the setup spiral. Matjar handles the scaffolding so you
                  can get your products in front of people.
                </p>
              </div>

              <ol className="grid gap-4">
                {steps.map((step) => (
                  <li
                    key={step.number}
                    className="flex gap-5 rounded-2xl border border-stone-200/80 bg-white p-6"
                  >
                    <span className="font-mono text-sm text-emerald-700">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold">{step.title}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-stone-600">
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
          className="scroll-mt-24 border-y border-stone-200/70 bg-white/50"
        >
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-28">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                FAQ
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                Good questions
              </h2>
              <p className="mt-4 text-base leading-7 text-stone-600">
                Still curious? Write to us at{" "}
                <a
                  className="font-medium text-emerald-700 underline-offset-4 hover:underline"
                  href="mailto:hello@matjar.store"
                >
                  hello@matjar.store
                </a>
                .
              </p>
            </div>

            <div className="divide-y divide-stone-200 border-y border-stone-200">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      className="size-4 shrink-0 text-stone-400 transition-transform group-open:rotate-45"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </summary>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-stone-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 lg:py-24">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-stone-900 px-6 py-16 text-center sm:px-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 size-80 rounded-full bg-emerald-500/20 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -left-20 size-80 rounded-full bg-amber-400/10 blur-3xl"
            />

            <div className="relative">
              <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                Ready to open your shop?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-stone-300">
                Bring your products. Matjar brings the storefront, dashboard,
                and checkout. You could be live before your coffee goes cold.
              </p>
              <a
                href={storeUrl}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-emerald-950 transition-colors hover:bg-emerald-400"
              >
                Open your store
                <ArrowRight className="size-4" />
              </a>
              <p className="mt-4 text-xs text-stone-400">
                Free while in beta · No credit card required
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-200/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-2.5">
            <span className="grid size-7 place-items-center rounded-md bg-emerald-600 text-xs font-semibold text-white">
              m
            </span>
            <span className="text-sm font-semibold">matjar</span>
            <span className="text-sm text-stone-400">
              · built for independent sellers
            </span>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-stone-500">
            <a className="hover:text-stone-900" href="#features">
              Features
            </a>
            <a className="hover:text-stone-900" href="#how-it-works">
              How it works
            </a>
            <a
              className="hover:text-stone-900"
              href="https://github.com/YoussefNour/matjar"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <span className="text-stone-400">
              © {new Date().getFullYear()} Matjar
            </span>
          </nav>
        </div>
      </footer>
    </>
  );
}
