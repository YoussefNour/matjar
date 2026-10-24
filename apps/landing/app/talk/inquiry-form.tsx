"use client";

import { useActionState, useState } from "react";

import { sendInquiry, type TalkState } from "./actions";

const initialState: TalkState = { status: "idle" };

export function InquiryForm() {
  const [state, formAction, pending] = useActionState(
    sendInquiry,
    initialState,
  );
  const [draft, setDraft] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const errors = state.status === "invalid" ? state.errors : {};

  function updateDraft(name: keyof typeof draft, value: string) {
    setDraft((current) => ({ ...current, [name]: value }));
  }

  if (state.status === "sent") {
    return (
      <section
        aria-live="polite"
        className="rounded-2xl border border-border bg-surface p-6"
      >
        <h2 className="text-h3">Message sent</h2>
        <p className="mt-2 max-w-prose text-small leading-6 text-foreground-muted">
          Thanks for writing. We will reply to the email you gave us.
        </p>
        <a
          href="/"
          className="mt-6 inline-flex min-h-11 items-center rounded-lg border border-border bg-surface px-4 text-small font-medium text-foreground transition-colors hover:bg-surface-muted"
        >
          Back home
        </a>
      </section>
    );
  }

  return (
    <form
      action={formAction}
      aria-busy={pending}
      className="grid gap-5 rounded-2xl border border-border bg-surface p-6"
      noValidate
    >
      {state.status === "error" ? (
        <p role="alert" className="text-small text-danger">
          {state.message}
        </p>
      ) : null}

      <Field
        label="Name"
        name="name"
        autoComplete="name"
        error={errors.name}
        value={draft.name}
        onChange={(value) => updateDraft("name", value)}
      />
      <Field
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        error={errors.email}
        value={draft.email}
        onChange={(value) => updateDraft("email", value)}
      />
      <Field
        label="Phone"
        name="phone"
        type="tel"
        autoComplete="tel"
        error={errors.phone}
        value={draft.phone}
        onChange={(value) => updateDraft("phone", value)}
      />
      <Field
        label="Message"
        name="message"
        autoComplete="off"
        error={errors.message}
        multiline
        hint="Tell us about your shop, or the software you need."
        value={draft.message}
        onChange={(value) => updateDraft("message", value)}
      />

      <div className="sr-only" aria-hidden="true">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-4 text-small font-medium text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-60"
        >
          {pending ? "Sending" : "Send"}
        </button>
        <a
          href="/"
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border bg-surface px-4 text-small font-medium text-foreground transition-colors hover:bg-surface-muted"
        >
          Back home
        </a>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  autoComplete,
  error,
  value,
  onChange,
  type = "text",
  multiline = false,
  hint,
}: {
  label: string;
  name: string;
  autoComplete: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel";
  multiline?: boolean;
  hint?: string;
}) {
  const hintId = hint ? `${name}-hint` : undefined;
  const errorId = error ? `${name}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const controlClassName = `mt-2 block w-full rounded-lg border bg-surface px-3 text-body text-foreground placeholder:text-foreground-subtle ${
    multiline ? "min-h-32 py-3" : "min-h-11"
  } ${error ? "border-danger" : "border-border"}`;

  return (
    <label className="block">
      <span className="text-small font-medium text-foreground">{label}</span>
      {multiline ? (
        <textarea
          name={name}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={controlClassName}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          name={name}
          type={type}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={controlClassName}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
      {hint ? (
        <span
          id={hintId}
          className="mt-1.5 block text-caption text-foreground-muted"
        >
          {hint}
        </span>
      ) : null}
      {error ? (
        <span id={errorId} className="mt-1.5 block text-caption text-danger">
          {error}
        </span>
      ) : null}
    </label>
  );
}
