import type { IconName } from "@/components/ui/Icon";

/** Visual tone used to tint cards, icons and photo placeholders. */
export type Tone = "teal" | "cyan" | "green";

export interface Photo {
  src: string;
  alt: string;
}

export interface Specialty {
  slug: string;
  name: string;
  icon: IconName;
  tone: Tone;
  /** Short description shown on the specialty card. */
  summary: string;
  /** One-line description for compact places like the hero. */
  tagline: string;
  /** Slugs of doctors in this specialty (see src/data/doctors.ts). */
  doctorSlugs: string[];
}

export interface Doctor {
  slug: string;
  name: string;
  /** Specialty this doctor belongs to (see src/data/specialties.ts). */
  specialtySlug: string;
  /** How the doctor's specialty is displayed, e.g. "Paediatrician". */
  title: string;
  /** Short description shown on the doctor card. */
  summary: string;
  /** Phase 2: real photo. Until then a placeholder portrait is rendered. */
  photo?: Photo;
  /** Phase 2: qualifications, e.g. ["MBBS", "MS (OBG)"]. */
  qualifications?: string[];
  /** Phase 2: longer biography for the profile page. */
  bio?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Highlight {
  icon: IconName;
  title: string;
  description: string;
}

/** A contact field is `null` until the real value is provided. */
export interface ContactDetails {
  address: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  openingHours: string | null;
  /** Google Maps embed URL (the `src` of the iframe from "Share → Embed a map"). */
  mapEmbedUrl: string | null;
}

export interface SocialLink {
  label: string;
  icon: IconName;
  href: string | null;
}

/* ---------------------------------------------------------------------------
   Appointments
   ------------------------------------------------------------------------ */

/** Calendar date, "YYYY-MM-DD". */
export type DateString = string;

/** Time of day, 24-hour "HH:mm". */
export type TimeString = string;

/** 0 = Sunday … 6 = Saturday (same as Date.getDay()). */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** A block of consultation time, e.g. a morning or evening session. */
export interface ScheduleSession {
  label: string;
  /** Time of the first bookable slot. */
  firstSlot: TimeString;
  /** Time of the last bookable slot (inclusive). */
  lastSlot: TimeString;
}

export interface DoctorSchedule {
  /** Minutes between consecutive slots. */
  slotMinutes: number;
  /** Sessions for each weekday. Leave a weekday out when the doctor is not available. */
  weekly: Partial<Record<Weekday, ScheduleSession[]>>;
  /** Specific dates the doctor is unavailable (leave, conferences…). */
  blockedDates?: DateString[];
}

export interface TimeSlot {
  time: TimeString;
  /** Display label, e.g. "09:30 AM". */
  label: string;
  /** Session the slot belongs to, e.g. "Morning". */
  session: string;
  /** False once real bookings exist and the slot is taken. */
  available: boolean;
}

/** The form's working state. */
export interface AppointmentFormValues {
  doctorSlug: string;
  date: DateString;
  time: TimeString;
  name: string;
  phone: string;
  email: string;
  reason: string;
}

/** What gets sent to the backend once booking is connected. */
export interface AppointmentRequest {
  doctorSlug: string;
  date: DateString;
  time: TimeString;
  patient: { name: string; phone: string; email?: string };
  reason?: string;
}

export type AppointmentResult =
  | { status: "success"; message: string; reference?: string }
  | { status: "unavailable"; message: string }
  | { status: "error"; message: string };
