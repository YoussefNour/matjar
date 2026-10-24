import type { Metadata } from "next";

import { SiteHeader } from "../components/site-header";
import { InquiryForm } from "./inquiry-form";

export const metadata: Metadata = {
  title: "Let's talk — Matjar",
  description:
    "Tell us about your store or the custom software you need. We reply by email.",
};

export default function TalkPage() {
  return (
    <>
      <SiteHeader talkCurrent />
      <main>
        <div className="mx-auto max-w-page px-5 py-16 sm:px-8 lg:py-24">
          <div className="max-w-prose">
            <p className="text-caption uppercase tracking-widest text-primary">
              Contact
            </p>
            <h1 className="mt-3 text-h1">Let&apos;s talk</h1>
            <p className="mt-4 text-body leading-7 text-foreground-muted">
              Tell us about your shop, or the software your business needs. We
              read every message and reply by email.
            </p>
            <div className="mt-8">
              <InquiryForm />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
