export interface ContactFormData {
  name: string;
  phone: string;
  /** Doctor slug (see src/data/doctors.ts), or GENERAL_ENQUIRY. */
  doctor: string;
  email: string;
  message: string;
}

/** "Select Doctor" value for messages not meant for a specific doctor. */
export const GENERAL_ENQUIRY = "general";

export type ContactFormResult =
  | { status: "success"; message: string }
  | { status: "unavailable"; message: string }
  | { status: "error"; message: string };

/**
 * Sends a contact enquiry.
 *
 * Phase 1: there is no backend yet, so this does not send anything.
 * Phase 2: replace the body with a call to the real endpoint, e.g.
 *
 *   const res = await fetch("/api/contact", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify(data),
 *   });
 *   return res.ok
 *     ? { status: "success", message: "Thank you! We'll be in touch soon." }
 *     : { status: "error", message: "Something went wrong. Please try again." };
 */
export async function submitContactForm(
  data: ContactFormData,
): Promise<ContactFormResult> {
  void data;
  return {
    status: "unavailable",
    message:
      "Thank you for your interest. Online enquiries are not active yet. Please contact the clinic directly for now.",
  };
}
