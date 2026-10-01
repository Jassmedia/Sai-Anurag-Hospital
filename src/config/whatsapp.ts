/**
 * Clinic WhatsApp number.
 *
 * Replace with the real number in international format, digits only
 * (country code + number, e.g. "91XXXXXXXXXX"). Until then, WhatsApp
 * buttons are shown but do not open a chat.
 */
export const WHATSAPP_NUMBER = "REPLACE_WITH_CLINIC_WHATSAPP";

/** Returns the configured number (digits only), or null while it is still a placeholder. */
export function getWhatsAppNumber(): string | null {
  const digits = WHATSAPP_NUMBER.replace(/\D/g, "");
  return digits.length >= 10 ? digits : null;
}
