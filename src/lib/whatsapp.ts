import { siteConfig } from "@/config/site";
import { getWhatsAppNumber } from "@/config/whatsapp";

const clinicName = `${siteConfig.name} ${siteConfig.tagline}`;

export const DEFAULT_WHATSAPP_MESSAGE = `Hello ${clinicName}, I would like to enquire about an appointment.`;

export interface AppointmentMessageDetails {
  /** Full display name, e.g. "Dr. Anu V". */
  doctorName?: string;
  /** Display date, e.g. "Thu, 15 Oct 2026". */
  date?: string;
  /** Display time, e.g. "10:30 AM". */
  time?: string;
  patientName?: string;
}

/**
 * Builds the pre-filled WhatsApp message. Without a selected doctor it falls
 * back to the general enquiry message.
 */
export function buildAppointmentMessage(details: AppointmentMessageDetails = {}): string {
  const { doctorName, date, time, patientName } = details;
  if (!doctorName) return DEFAULT_WHATSAPP_MESSAGE;

  let message = `Hello ${clinicName}, I would like to book an appointment with ${doctorName}`;
  if (date) message += ` on ${date}`;
  if (time) message += ` at ${time}`;
  message += ".";
  if (patientName?.trim()) message += ` My name is ${patientName.trim()}.`;
  return message;
}

/** wa.me link with the message pre-filled, or null until the clinic number is configured. */
export function getWhatsAppUrl(message: string = DEFAULT_WHATSAPP_MESSAGE): string | null {
  const number = getWhatsAppNumber();
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
