"use server";

import { contactSchema } from "@/lib/validation/contact";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<string, string>>;
  values?: Record<string, string>;
};

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw = Object.fromEntries(formData) as Record<string, string>;

  // Honeypot: real users never fill this hidden field.
  if (raw.website) return { status: "success" };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", fieldErrors, values: raw };
  }

  try {
    // TODO: deliver the message. Pick one:
    //  1) POST to your Workers backend (e.g. /contact) and store in D1
    //  2) Send an email to CONTACT.email via Resend / MailChannels
    console.log("[contact]", parsed.data);
    return { status: "success" };
  } catch {
    return {
      status: "error",
      message: "Message nahi ja paya. Kripya WhatsApp par likh dijiye.",
      values: raw,
    };
  }
}
