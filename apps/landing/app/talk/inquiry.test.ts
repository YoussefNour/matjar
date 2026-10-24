import assert from "node:assert/strict";
import test from "node:test";

import {
  DEFAULT_RECIPIENTS,
  INQUIRY_FROM,
  MESSAGE_MAX_LENGTH,
  contactRecipients,
  deliverInquiry,
  reviewInquiry,
  type InquiryMail,
} from "./inquiry.ts";

const readyFields = {
  name: "Amina",
  email: "amina@example.com",
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

test("sends to both default inboxes and replies to the visitor", async () => {
  assert.deepEqual(contactRecipients(undefined), DEFAULT_RECIPIENTS);
  assert.deepEqual(contactRecipients(" one@example.com, two@example.com "), [
    "one@example.com",
    "two@example.com",
  ]);

  const sent: InquiryMail[] = [];
  const inquiry = {
    name: "Amina",
    email: "amina@example.com",
    message: "Hello",
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
});

test("reports a sender failure without throwing", async () => {
  const delivered = await deliverInquiry(
    { name: "Amina", email: "amina@example.com", message: "Hello" },
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
});
