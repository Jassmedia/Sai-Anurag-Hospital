import type { DateString, DoctorSchedule, ScheduleSession } from "@/types";

/*
 * PLACEHOLDER availability — real doctor timings will be provided later.
 *
 * - Clinic-wide timings: edit DEFAULT_SESSIONS / DEFAULT_SCHEDULE.
 * - A doctor's own working hours: add an entry to `doctorSchedules`.
 * - Days off for one doctor: that doctor's `blockedDates`.
 * - Days the whole clinic is closed: `clinicClosedDates`.
 *
 * Once real bookings exist, availability will come from the backend instead
 * (see fetchAvailableSlots in src/lib/appointments.ts).
 */

const DEFAULT_SESSIONS: ScheduleSession[] = [
  { label: "Morning", firstSlot: "09:00", lastSlot: "12:00" },
  { label: "Evening", firstSlot: "16:00", lastSlot: "18:00" },
];

export const DEFAULT_SCHEDULE: DoctorSchedule = {
  slotMinutes: 30,
  weekly: {
    0: DEFAULT_SESSIONS,
    1: DEFAULT_SESSIONS,
    2: DEFAULT_SESSIONS,
    3: DEFAULT_SESSIONS,
    4: DEFAULT_SESSIONS,
    5: DEFAULT_SESSIONS,
    6: DEFAULT_SESSIONS,
  },
};

/**
 * Per-doctor schedules, keyed by doctor slug. Doctors without an entry use
 * DEFAULT_SCHEDULE. Example:
 *
 *   "dr-anu-v": {
 *     slotMinutes: 15,
 *     weekly: {
 *       1: [{ label: "Morning", firstSlot: "10:00", lastSlot: "13:00" }],
 *       4: [{ label: "Evening", firstSlot: "17:00", lastSlot: "19:00" }],
 *     },
 *     blockedDates: ["2026-12-25"],
 *   },
 */
export const doctorSchedules: Record<string, DoctorSchedule> = {};

/** Dates the clinic is closed for everyone ("YYYY-MM-DD"). */
export const clinicClosedDates: DateString[] = [];
