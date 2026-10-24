"use server";

import { Resend } from "resend";

import {
  contactRecipients,
  deliverInquiry,
  reviewInquiry,
  type FieldErrors,
} from "./inquiry";

export type TalkState =
  | { status: "idle" }
  | { status: "sent" }
  | { status: "invalid"; errors: FieldErrors }
  | { status: "error"; message: string };

const sendError =
  "We could not send your message right now. Please try again in a little while.";

function field(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

export async function sendInquiry(
  _previous: TalkState,
  formData: FormData,
): Promise<TalkState> {
  const reviewed = reviewInquiry({
    name: field(formData, "name"),
    email: field(formData, "email"),
    message: field(formData, "message"),
    company: field(formData, "company"),
  });

  if (reviewed.outcome === "discard") {
    return { status: "sent" };
  }

  if (reviewed.outcome === "invalid") {
    return { status: "invalid", errors: reviewed.errors };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const delivery = await deliverInquiry(
    reviewed,
    {
      send: async (mail) => {
        const resend = new Resend(apiKey);
        const { error } = await resend.emails.send({
          from: mail.from,
          to: mail.to,
          replyTo: mail.replyTo,
          subject: mail.subject,
          text: mail.text,
        });

        if (error) {
          throw new Error(error.message);
        }
      },
    },
    {
      apiKey,
      to: contactRecipients(process.env.CONTACT_TO),
    },
  );

  if (delivery.outcome === "sent") {
    return { status: "sent" };
  }

  return { status: "error", message: sendError };
}
