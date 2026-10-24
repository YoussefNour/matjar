"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

import {
  contactRecipients,
  deliverInquiry,
  reviewInquiry,
  takeInquirySlot,
  type FieldErrors,
} from "./inquiry";

export type TalkState =
  | { status: "idle" }
  | { status: "sent" }
  | { status: "invalid"; errors: FieldErrors }
  | { status: "error"; message: string };

const sendError =
  "We could not send your message right now. Please try again in a little while.";
const limitReached =
  "You have reached the limit of 10 messages today. Try again tomorrow.";

const inquiryCounts = new Map<string, number>();

function field(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

function clientAddress(headerList: Headers): string {
  const forwarded = headerList.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwarded) {
    return forwarded;
  }

  const realIp = headerList.get("x-real-ip")?.trim();
  if (realIp) {
    return realIp;
  }

  return "unknown";
}

export async function sendInquiry(
  _previous: TalkState,
  formData: FormData,
): Promise<TalkState> {
  const reviewed = reviewInquiry({
    name: field(formData, "name"),
    email: field(formData, "email"),
    phone: field(formData, "phone"),
    message: field(formData, "message"),
    company: field(formData, "company"),
  });

  if (reviewed.outcome === "discard") {
    return { status: "sent" };
  }

  if (reviewed.outcome === "invalid") {
    return { status: "invalid", errors: reviewed.errors };
  }

  const headerList = await headers();
  const day = new Date().toISOString().slice(0, 10);
  const allowed = takeInquirySlot(
    inquiryCounts,
    clientAddress(headerList),
    day,
  );

  if (!allowed) {
    return { status: "error", message: limitReached };
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

  console.error("Inquiry email failed:", delivery.reason);

  return { status: "error", message: `${sendError} ${delivery.reason}` };
}
