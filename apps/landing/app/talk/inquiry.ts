export const NAME_MAX_LENGTH = 80;
export const MESSAGE_MAX_LENGTH = 2000;

export const INQUIRY_FROM = "ahmedbahaa.6251@gmail.com";

export const DEFAULT_RECIPIENTS = [
  "ahmedbahaa.6251@gmail.com",
  "youssef.ossama2@gmail.com",
];

export type InquiryFields = {
  name: string;
  email: string;
  message: string;
  company: string;
};

export type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export type ReviewedInquiry =
  | { outcome: "invalid"; errors: FieldErrors }
  | { outcome: "discard" }
  | { outcome: "send"; name: string; email: string; message: string };

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
  { outcome: "sent" } | { outcome: "unconfigured" } | { outcome: "failed" };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function reviewInquiry(fields: InquiryFields): ReviewedInquiry {
  if (fields.company.trim() !== "") {
    return { outcome: "discard" };
  }

  const name = fields.name.trim();
  const email = fields.email.trim();
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

  if (message.length === 0) {
    errors.message = "Tell us what you need.";
  } else if (message.length > MESSAGE_MAX_LENGTH) {
    errors.message = "Use a shorter message.";
  }

  if (errors.name || errors.email || errors.message) {
    return { outcome: "invalid", errors };
  }

  return { outcome: "send", name, email, message };
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
  inquiry: { name: string; email: string; message: string },
  sender: MailSender,
  settings: {
    apiKey: string | undefined;
    to: string[];
  },
): Promise<Delivery> {
  if (!settings.apiKey || settings.to.length === 0) {
    return { outcome: "unconfigured" };
  }

  const mail: InquiryMail = {
    from: INQUIRY_FROM,
    to: settings.to,
    replyTo: inquiry.email,
    subject: `Let's talk: ${inquiry.name.replace(/[\r\n]+/g, " ")}`,
    text: `${inquiry.name} <${inquiry.email}>\n\n${inquiry.message}`,
  };

  try {
    await sender.send(mail);
    return { outcome: "sent" };
  } catch {
    return { outcome: "failed" };
  }
}
