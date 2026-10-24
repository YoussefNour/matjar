import assert from "node:assert/strict";
import test from "node:test";

import {
  DAILY_INQUIRY_LIMIT,
  DEFAULT_RECIPIENTS,
  INQUIRY_FROM,
  MESSAGE_MAX_LENGTH,
  contactRecipients,
  deliverInquiry,
  reviewInquiry,
  takeInquirySlot,
  type InquiryMail,
} from "./inquiry.ts";

const readyFields = {
  name: "Amina",
  email: "amina@example.com",
  phone: "+20 100 000 0000",
  message: "I need a customer portal next to my store.",
  company: "",
};

test("rejects a missing name, email, or message", () => {
  const missingName = reviewInquiry({ ...readyFields, name: "  " });
  const missingEmail = reviewInquiry({ ...readyFields, email: "" });
  const missingMessage = reviewInquiry({ ...readyFields, message: "" });

  assert.equal(missingName.outcome, "invalid");
  assert.equal(missingEmail.outcome, "invalid");
  assert.equal(missingMessage.outcome, "invalid");

  if (missingName.outcome !== "invalid") return;
  if (missingEmail.outcome !== "invalid") return;
  if (missingMessage.outcome !== "invalid") return;

  assert.equal(missingName.errors.name, "Enter your name.");
  assert.equal(missingEmail.errors.email, "Enter your email.");
  assert.equal(missingMessage.errors.message, "Tell us what you need.");
});

test("rejects a missing or invalid phone number", () => {
  const missingPhone = reviewInquiry({ ...readyFields, phone: "  " });
  const shortPhone = reviewInquiry({ ...readyFields, phone: "12345" });
  const letters = reviewInquiry({ ...readyFields, phone: "call-me-now" });

  assert.equal(missingPhone.outcome, "invalid");
  assert.equal(shortPhone.outcome, "invalid");
  assert.equal(letters.outcome, "invalid");

  if (missingPhone.outcome !== "invalid") return;
  if (shortPhone.outcome !== "invalid") return;
  if (letters.outcome !== "invalid") return;

  assert.equal(missingPhone.errors.phone, "Enter your phone number.");
  assert.equal(shortPhone.errors.phone, "Enter a valid phone number.");
  assert.equal(letters.errors.phone, "Enter a valid phone number.");
});

test("rejects a malformed email and an oversized message", () => {
  const badEmail = reviewInquiry({ ...readyFields, email: "not-an-email" });
  const longMessage = reviewInquiry({
    ...readyFields,
    message: "a".repeat(MESSAGE_MAX_LENGTH + 1),
  });

  assert.equal(badEmail.outcome, "invalid");
  assert.equal(longMessage.outcome, "invalid");

  if (badEmail.outcome !== "invalid") return;
  if (longMessage.outcome !== "invalid") return;

  assert.equal(badEmail.errors.email, "Enter a valid email.");
  assert.equal(longMessage.errors.message, "Use a shorter message.");
});

test("accepts a normal inquiry", () => {
  const reviewed = reviewInquiry({
    ...readyFields,
    name: "  Amina  ",
    email: " amina@example.com ",
  });

  assert.deepEqual(reviewed, {
    outcome: "send",
    name: "Amina",
    email: "amina@example.com",
    phone: readyFields.phone,
    message: readyFields.message,
  });
});

test("treats a filled honeypot as do not send", () => {
  const reviewed = reviewInquiry({
    ...readyFields,
    company: "https://spam.example",
  });

  assert.deepEqual(reviewed, { outcome: "discard" });
});

test("sends to the default inbox and replies to the visitor", async () => {
  assert.deepEqual(contactRecipients(undefined), DEFAULT_RECIPIENTS);
  assert.deepEqual(contactRecipients(" one@example.com, two@example.com "), [
    "one@example.com",
    "two@example.com",
  ]);

  const sent: InquiryMail[] = [];
  const inquiry = {
    name: "Amina",
    email: "amina@example.com",
    phone: "+20 100 000 0000",
    message: "I need a customer portal.",
  };

  const skipped = await deliverInquiry(
    inquiry,
    {
      send: async () => Promise.resolve(),
    },
    {
      apiKey: undefined,
      to: [...DEFAULT_RECIPIENTS],
    },
  );
  assert.equal(skipped.outcome, "unconfigured");
  if (skipped.outcome === "unconfigured") {
    assert.equal(skipped.reason, "RESEND_API_KEY is not set.");
  }
  assert.equal(sent.length, 0);

  const delivered = await deliverInquiry(
    inquiry,
    {
      send: async (mail) => {
        sent.push(mail);
      },
    },
    {
      apiKey: "re_test",
      to: contactRecipients(undefined),
    },
  );

  assert.equal(delivered.outcome, "sent");
  assert.equal(sent.length, 1);
  assert.equal(sent[0]?.from, INQUIRY_FROM);
  assert.deepEqual(sent[0]?.to, [...DEFAULT_RECIPIENTS]);
  assert.equal(sent[0]?.replyTo, "amina@example.com");
  assert.equal(sent[0]?.subject, "Let's talk: Amina");
  assert.equal(
    sent[0]?.text,
    [
      "Name: Amina",
      "Email: amina@example.com",
      "Phone: +20 100 000 0000",
      "",
      "Message:",
      "I need a customer portal.",
    ].join("\n"),
  );
});

test("reports a sender failure without throwing", async () => {
  const delivered = await deliverInquiry(
    {
      name: "Amina",
      email: "amina@example.com",
      phone: "+20 100 000 0000",
      message: "Hello",
    },
    {
      send: async () => {
        throw new Error("resend down");
      },
    },
    {
      apiKey: "re_test",
      to: [...DEFAULT_RECIPIENTS],
    },
  );

  assert.equal(delivered.outcome, "failed");
  if (delivered.outcome === "failed") {
    assert.equal(delivered.reason, "resend down");
  }
});

test("allows 10 submits per IP per day and still allows another IP", () => {
  const store = new Map<string, number>();
  const day = "2026-10-24";

  for (let attempt = 0; attempt < DAILY_INQUIRY_LIMIT; attempt += 1) {
    assert.equal(takeInquirySlot(store, "203.0.113.8", day), true);
  }

  assert.equal(takeInquirySlot(store, "203.0.113.8", day), false);
  assert.equal(takeInquirySlot(store, "203.0.113.9", day), true);
});
