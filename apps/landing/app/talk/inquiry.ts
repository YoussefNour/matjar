export const NAME_MAX_LENGTH = 80;
export const MESSAGE_MAX_LENGTH = 2000;
export const DAILY_INQUIRY_LIMIT = 10;

export const INQUIRY_FROM = "Matjar <onboarding@resend.dev>";

export const DEFAULT_RECIPIENTS = ["ahmedbahaa.6251@gmail.com"];

export type InquiryFields = {
  name: string;
  email: string;
  phone: string;
  message: string;
  company: string;
};

export type FieldErrors = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

export type SentInquiry = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type ReviewedInquiry =
  | { outcome: "invalid"; errors: FieldErrors }
  | { outcome: "discard" }
  | ({ outcome: "send" } & SentInquiry);

export type InquiryMail = {
  from: string;
  to: string[];
  replyTo: string;
  subject: string;
  text: string;
};

export type MailSender = {
  send: (mail: InquiryMail) => Promise<void>;
};

export type Delivery =
  | { outcome: "sent" }
  | { outcome: "unconfigured"; reason: string }
  | { outcome: "failed"; reason: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?\d{8,15}$/;

export function reviewInquiry(fields: InquiryFields): ReviewedInquiry {
  if (fields.company.trim() !== "") {
    return { outcome: "discard" };
  }

  const name = fields.name.trim();
  const email = fields.email.trim();
  const phone = fields.phone.trim();
  const message = fields.message.trim();
  const errors: FieldErrors = {};

  if (name.length === 0) {
    errors.name = "Enter your name.";
  } else if (name.length > NAME_MAX_LENGTH) {
    errors.name = "Use a shorter name.";
  }

  if (email.length === 0) {
    errors.email = "Enter your email.";
  } else if (!emailPattern.test(email)) {
    errors.email = "Enter a valid email.";
  }

  if (phone.length === 0) {
    errors.phone = "Enter your phone number.";
  } else if (!phonePattern.test(phone.replace(/[\s()-]/g, ""))) {
    errors.phone = "Enter a valid phone number.";
  }

  if (message.length === 0) {
    errors.message = "Tell us what you need.";
  } else if (message.length > MESSAGE_MAX_LENGTH) {
    errors.message = "Use a shorter message.";
  }

  if (errors.name || errors.email || errors.phone || errors.message) {
    return { outcome: "invalid", errors };
  }

  return { outcome: "send", name, email, phone, message };
}

export function inquiryText(inquiry: SentInquiry): string {
  return [
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone}`,
    "",
    "Message:",
    inquiry.message,
  ].join("\n");
}

export function takeInquirySlot(
  store: Map<string, number>,
  ip: string,
  day: string,
): boolean {
  const key = `${day}:${ip}`;
  const used = store.get(key) ?? 0;

  if (used >= DAILY_INQUIRY_LIMIT) {
    return false;
  }

  store.set(key, used + 1);
  return true;
}

export function contactRecipients(contactTo: string | undefined): string[] {
  if (!contactTo || contactTo.trim().length === 0) {
    return [...DEFAULT_RECIPIENTS];
  }

  return contactTo
    .split(",")
    .map((address) => address.trim())
    .filter((address) => address.length > 0);
}

export async function deliverInquiry(
  inquiry: SentInquiry,
  sender: MailSender,
  settings: {
    apiKey: string | undefined;
    to: string[];
  },
): Promise<Delivery> {
  const apiKey = settings.apiKey?.trim() ?? "";

  if (apiKey.length === 0) {
    return { outcome: "unconfigured", reason: "RESEND_API_KEY is not set." };
  }

  if (settings.to.length === 0) {
    return { outcome: "unconfigured", reason: "No recipients are configured." };
  }

  const mail: InquiryMail = {
    from: INQUIRY_FROM,
    to: settings.to,
    replyTo: inquiry.email,
    subject: `Let's talk: ${inquiry.name.replace(/[\r\n]+/g, " ")}`,
    text: inquiryText(inquiry),
  };

  try {
    await sender.send(mail);
    return { outcome: "sent" };
  } catch (error) {
    const reason =
      error instanceof Error
        ? error.message
        : "The email service returned an unknown error.";

    return { outcome: "failed", reason };
  }
}
