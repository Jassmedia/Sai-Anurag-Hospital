import {
  DEFAULT_SCHEDULE,
  clinicClosedDates,
  doctorSchedules,
} from "@/data/availability";
import { getDoctor } from "@/lib/data";
import { isValidEmail, isValidPhone } from "@/lib/validation";
import type {
  AppointmentFormValues,
  AppointmentRequest,
  AppointmentResult,
  DateString,
  DoctorSchedule,
  TimeSlot,
  TimeString,
  Weekday,
} from "@/types";

/* ---------------------------------------------------------------------------
   Date & time helpers (local time — the clinic and patients share a timezone)
   ------------------------------------------------------------------------ */

const pad = (n: number) => String(n).padStart(2, "0");

export function toDateString(d: Date): DateString {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function todayDateString(): DateString {
  return toDateString(new Date());
}

/** Parses "YYYY-MM-DD" as a local date; null if invalid. */
export function parseDateString(value: DateString): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return toDateString(d) === value ? d : null;
}

const toMinutes = (t: TimeString) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

const fromMinutes = (mins: number): TimeString => `${pad(Math.floor(mins / 60))}:${pad(mins % 60)}`;

/** "16:30" -> "04:30 PM" */
export function formatTime(time: TimeString): string {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${pad(hour12)}:${pad(m)} ${suffix}`;
}

/** "2026-10-15" -> "Thu, 15 Oct 2026" */
export function formatDate(value: DateString): string {
  const d = parseDateString(value);
  if (!d) return value;
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* ---------------------------------------------------------------------------
   Availability
   ------------------------------------------------------------------------ */

export function getDoctorSchedule(doctorSlug: string): DoctorSchedule {
  return doctorSchedules[doctorSlug] ?? DEFAULT_SCHEDULE;
}

/** Whether a doctor sees patients on this date (ignores already-booked slots). */
export function isDateAvailable(doctorSlug: string, date: DateString): boolean {
  const d = parseDateString(date);
  if (!d) return false;
  if (clinicClosedDates.includes(date)) return false;
  const schedule = getDoctorSchedule(doctorSlug);
  if (schedule.blockedDates?.includes(date)) return false;
  return (schedule.weekly[d.getDay() as Weekday]?.length ?? 0) > 0;
}

function generateSlots(schedule: DoctorSchedule, weekday: Weekday): TimeSlot[] {
  const sessions = schedule.weekly[weekday] ?? [];
  return sessions.flatMap((session) => {
    const slots: TimeSlot[] = [];
    for (
      let t = toMinutes(session.firstSlot);
      t <= toMinutes(session.lastSlot);
      t += schedule.slotMinutes
    ) {
      const time = fromMinutes(t);
      slots.push({ time, label: formatTime(time), session: session.label, available: true });
    }
    return slots;
  });
}

/**
 * Time slots for a doctor on a date.
 *
 * Phase 1: generated from the placeholder schedules in src/data/availability.ts.
 * Later: replace the body with a request to the booking backend, e.g.
 *   const res = await fetch(`/api/availability?doctor=${doctorSlug}&date=${date}`);
 *   return res.json();
 * It is already async so the UI won't need to change.
 */
export async function fetchAvailableSlots(
  doctorSlug: string,
  date: DateString,
): Promise<TimeSlot[]> {
  if (!isDateAvailable(doctorSlug, date)) return [];
  const d = parseDateString(date)!;
  let slots = generateSlots(getDoctorSchedule(doctorSlug), d.getDay() as Weekday);

  // For today, hide times that have already passed.
  if (date === todayDateString()) {
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    slots = slots.filter((s) => toMinutes(s.time) > nowMinutes);
  }
  return slots;
}

/* ---------------------------------------------------------------------------
   Validation & submission
   ------------------------------------------------------------------------ */

export type AppointmentErrors = Partial<Record<keyof AppointmentFormValues, string>>;

/** Validates the date on its own, so the form can show feedback as soon as it's picked. */
export function validateDate(doctorSlug: string, date: DateString): string | undefined {
  if (!date) return "Please choose a preferred date.";
  if (!parseDateString(date)) return "Please enter a valid date.";
  if (date < todayDateString()) return "Please choose today or a future date.";
  if (doctorSlug && !isDateAvailable(doctorSlug, date)) {
    const doctor = getDoctor(doctorSlug);
    return `${doctor?.name ?? "The doctor"} is not available on this date. Please choose another date.`;
  }
  return undefined;
}

export function validateAppointment(values: AppointmentFormValues): AppointmentErrors {
  const errors: AppointmentErrors = {};
  if (!values.doctorSlug || !getDoctor(values.doctorSlug)) {
    errors.doctorSlug = "Please select a doctor.";
  }
  const dateError = validateDate(values.doctorSlug, values.date);
  if (dateError) errors.date = dateError;
  if (!values.time) errors.time = "Please select a preferred time.";
  if (!values.name.trim()) errors.name = "Please enter the patient's full name.";
  if (!values.phone.trim()) {
    errors.phone = "Please enter a phone or WhatsApp number.";
  } else if (!isValidPhone(values.phone)) {
    errors.phone = "Please enter a valid phone number (at least 10 digits).";
  }
  if (values.email.trim() && !isValidEmail(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  return errors;
}

export function toAppointmentRequest(values: AppointmentFormValues): AppointmentRequest {
  return {
    doctorSlug: values.doctorSlug,
    date: values.date,
    time: values.time,
    patient: {
      name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim() || undefined,
    },
    reason: values.reason.trim() || undefined,
  };
}

/**
 * Sends an appointment request.
 *
 * Phase 1: there is no backend, so nothing is sent.
 * Later: POST to the booking API and return "success" with a reference, e.g.
 *   const res = await fetch("/api/appointments", { method: "POST", body: JSON.stringify(request) });
 */
export async function submitAppointmentRequest(
  request: AppointmentRequest,
): Promise<AppointmentResult> {
  void request;
  return {
    status: "unavailable",
    message:
      "Online booking isn't active yet, so this request hasn't been sent. Please contact the clinic on WhatsApp or by phone to book this appointment.",
  };
}
