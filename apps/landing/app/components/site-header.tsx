import { ArrowRight } from "./arrow-right";
import { MatjarMark } from "./matjar-mark";

export function SiteHeader({ talkCurrent = false }: { talkCurrent?: boolean }) {
  return (
    <header className="sticky top-0 z-50 border-b border-foreground/5 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-page items-center justify-between px-5 py-4 sm:px-8">
        <a
          href="/"
          className="flex items-center gap-2.5"
          aria-label="Matjar home"
        >
          <MatjarMark className="size-9 text-primary" />
          <span className="text-lead font-semibold tracking-tight">matjar</span>
        </a>

        <nav className="hidden items-center gap-7 text-small text-foreground-muted md:flex">
          <a
            className="transition-colors hover:text-foreground"
            href="/#features"
          >
            Features
          </a>
          <a
            className="transition-colors hover:text-foreground"
            href="/#services"
          >
            Services
          </a>
          <a
            className="transition-colors hover:text-foreground"
            href="/#how-it-works"
          >
            How it works
          </a>
          <a className="transition-colors hover:text-foreground" href="/#faq">
            FAQ
          </a>
        </nav>

        <a
          href="/talk"
          aria-current={talkCurrent ? "page" : undefined}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-small font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          Let&apos;s talk
          <ArrowRight className="size-4 icon-directional" />
        </a>
      </div>
    </header>
  );
}
