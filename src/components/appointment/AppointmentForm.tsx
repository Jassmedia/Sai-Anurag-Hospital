"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { WhatsAppButton, WhatsAppGlyph } from "@/components/ui/WhatsAppButton";
import fieldStyles from "@/components/ui/Form.module.css";
import {
  fetchAvailableSlots,
  formatDate,
  formatTime,
  submitAppointmentRequest,
  toAppointmentRequest,
  todayDateString,
  validateAppointment,
  validateDate,
  type AppointmentErrors,
} from "@/lib/appointments";
import { getDoctor, getDoctors, getSpecialty } from "@/lib/data";
import { buildAppointmentMessage } from "@/lib/whatsapp";
import type { AppointmentFormValues, AppointmentResult, TimeSlot } from "@/types";
import { AppointmentSummary } from "./AppointmentSummary";
import { DoctorPicker } from "./DoctorPicker";
import { TimeSlotPicker, timeInputId } from "./TimeSlotPicker";
import styles from "./Appointment.module.css";

const EMPTY: AppointmentFormValues = {
  doctorSlug: "",
  date: "",
  time: "",
  name: "",
  phone: "",
  email: "",
  reason: "",
};

/** Order used to focus the first invalid field on submit. */
const FIELD_ORDER: (keyof AppointmentFormValues)[] = ["doctorSlug", "date", "time", "name", "phone", "email"];

function hasErrors(errors: AppointmentErrors) {
  return Object.values(errors).some(Boolean);
}

export function AppointmentForm() {
  const doctors = getDoctors();
  const [values, setValues] = useState<AppointmentFormValues>(EMPTY);
  const [errors, setErrors] = useState<AppointmentErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [today, setToday] = useState<string>();
  const [slots, setSlots] = useState<TimeSlot[] | null>(null);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<AppointmentResult | null>(null);

  // Client-only: today's date for the date picker, and ?doctor=<slug> pre-selection
  // (used by the "Book an Appointment" button on each doctor's profile page).
  useEffect(() => {
    setToday(todayDateString());
    const slug = new URLSearchParams(window.location.search).get("doctor");
    if (slug && getDoctor(slug)) setValues((v) => ({ ...v, doctorSlug: slug }));
  }, []);

  const dateIsValid = Boolean(values.date) && !validateDate(values.doctorSlug, values.date);
  const slotsReady = Boolean(values.doctorSlug) && dateIsValid;

  // Load time slots whenever the doctor or date changes.
  useEffect(() => {
    if (!slotsReady) {
      setSlots(null);
      setValues((v) => (v.time ? { ...v, time: "" } : v));
      return;
    }
    let cancelled = false;
    setSlotsLoading(true);
    fetchAvailableSlots(values.doctorSlug, values.date).then((list) => {
      if (cancelled) return;
      setSlots(list);
      setSlotsLoading(false);
      // Drop a previously chosen time that isn't offered for this doctor/date.
      setValues((v) =>
        list.some((s) => s.available && s.time === v.time) ? v : { ...v, time: "" },
      );
    });
    return () => {
      cancelled = true;
    };
  }, [slotsReady, values.doctorSlug, values.date]);

  function setField(field: keyof AppointmentFormValues, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
    setResult(null);
  }

  function handleDoctorChange(slug: string) {
    setField("doctorSlug", slug);
    // A different doctor may not be available on the chosen date.
    if (values.date) setErrors((e) => ({ ...e, date: validateDate(slug, values.date) }));
  }

  function handleDateChange(date: string) {
    setField("date", date);
    if (date) setErrors((e) => ({ ...e, date: validateDate(values.doctorSlug, date) }));
  }

  function focusField(field: keyof AppointmentFormValues) {
    let el: HTMLElement | null = null;
    if (field === "doctorSlug") {
      el = document.getElementById(`appt-doctor-${doctors[0]?.slug}`);
    } else if (field === "time") {
      const first = slots?.find((s) => s.available);
      el = first ? document.getElementById(timeInputId(first.time)) : document.getElementById("appt-date");
    } else {
      el = document.getElementById(`appt-${field}`);
    }
    el?.focus();
    el?.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAttempted(true);
    setResult(null);
    const found = validateAppointment(values);
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((f) => found[f]);
    if (firstInvalid) {
      focusField(firstInvalid);
      return;
    }

    setSubmitting(true);
    const res = await submitAppointmentRequest(toAppointmentRequest(values));
    setSubmitting(false);
    setResult(res);
  }

  // Derived display values for the summary and WhatsApp message.
  const doctor = values.doctorSlug ? getDoctor(values.doctorSlug) : undefined;
  const specialty = doctor ? getSpecialty(doctor.specialtySlug) : undefined;
  const dateLabel = dateIsValid ? formatDate(values.date) : undefined;
  const timeLabel = values.time ? formatTime(values.time) : undefined;
  const whatsappMessage = buildAppointmentMessage({
    doctorName: doctor?.name,
    date: dateLabel,
    time: timeLabel,
    patientName: values.name,
  });

  const slotPrompt = !values.doctorSlug
    ? values.date
      ? "Select a doctor to see available times."
      : "Select a doctor and date to see available times."
    : "Choose a date to see available times.";

  const inputProps = (field: "name" | "phone" | "email" | "reason") => ({
    id: `appt-${field}`,
    name: field,
    value: values[field],
    onChange: (e: { target: { value: string } }) => setField(field, e.target.value),
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `appt-${field}-error` : undefined,
    className: fieldStyles.input,
  });

  const errorText = (field: keyof AppointmentFormValues) =>
    errors[field] ? (
      <p id={`appt-${field}-error`} className={fieldStyles.error}>
        <Icon name="alert" size={15} /> {errors[field]}
      </p>
    ) : null;

  return (
    <form className={styles.layout} onSubmit={handleSubmit} noValidate aria-label="Appointment request">
      <div className={styles.steps}>
        {/* 1. Doctor */}
        <section className={styles.card} aria-labelledby="step-doctor">
          <StepHeader
            number={1}
            id="step-doctor"
            title={<>Select Doctor <span className={fieldStyles.required} aria-hidden="true">*</span></>}
            hint="Choose the doctor you would like to consult."
          />
          <DoctorPicker
            doctors={doctors}
            value={values.doctorSlug}
            onChange={handleDoctorChange}
            error={errors.doctorSlug}
            labelledBy="step-doctor"
          />
        </section>

        {/* 2. Date & time */}
        <section className={styles.card} aria-labelledby="step-datetime">
          <StepHeader
            number={2}
            id="step-datetime"
            title="Date & Time"
            hint="Pick your preferred date, then choose a time."
          />
          <div className={`${fieldStyles.field} ${styles.dateField}`}>
            <label htmlFor="appt-date" className={fieldStyles.label}>
              Preferred Date <span className={fieldStyles.required} aria-hidden="true">*</span>
            </label>
            <InputWithIcon icon="calendar">
              <input
                type="date"
                id="appt-date"
                name="date"
                min={today}
                value={values.date}
                onChange={(e) => handleDateChange(e.target.value)}
                aria-invalid={errors.date ? true : undefined}
                aria-describedby={errors.date ? "appt-date-error" : undefined}
                className={fieldStyles.input}
              />
            </InputWithIcon>
            {errorText("date")}
          </div>

          <TimeSlotPicker
            slots={slotsReady ? slots : null}
            loading={slotsReady && (slotsLoading || slots === null)}
            value={values.time}
            onChange={(time) => setField("time", time)}
            error={errors.time}
            prompt={slotPrompt}
          />
        </section>

        {/* 3. Patient */}
        <section className={styles.card} aria-labelledby="step-patient">
          <StepHeader
            number={3}
            id="step-patient"
            title="Patient Information"
            hint="So the clinic knows who the appointment is for and how to reach you."
          />
          <div className={styles.grid2}>
            <div className={`${fieldStyles.field} ${styles.full}`}>
              <label htmlFor="appt-name" className={fieldStyles.label}>
                Full Name <span className={fieldStyles.required} aria-hidden="true">*</span>
              </label>
              <InputWithIcon icon="user">
                <input type="text" autoComplete="name" placeholder="Patient's full name" {...inputProps("name")} />
              </InputWithIcon>
              {errorText("name")}
            </div>

            <div className={fieldStyles.field}>
              <label htmlFor="appt-phone" className={fieldStyles.label}>
                Phone / WhatsApp Number <span className={fieldStyles.required} aria-hidden="true">*</span>
              </label>
              <InputWithIcon icon="phone">
                <input type="tel" autoComplete="tel" inputMode="tel" placeholder="Mobile number" {...inputProps("phone")} />
              </InputWithIcon>
              {errorText("phone")}
            </div>

            <div className={fieldStyles.field}>
              <label htmlFor="appt-email" className={fieldStyles.label}>
                Email Address <span className={fieldStyles.optional}>(optional)</span>
              </label>
              <InputWithIcon icon="mail">
                <input type="email" autoComplete="email" placeholder="you@example.com" {...inputProps("email")} />
              </InputWithIcon>
              {errorText("email")}
            </div>

            <div className={`${fieldStyles.field} ${styles.full}`}>
              <label htmlFor="appt-reason" className={fieldStyles.label}>
                Reason for Visit / Message <span className={fieldStyles.optional}>(optional)</span>
              </label>
              <textarea rows={4} placeholder="Briefly tell us what the visit is about" {...inputProps("reason")} />
            </div>
          </div>
          <p className={styles.note}>
            Please don&rsquo;t share detailed medical information here. For
            emergencies, contact your nearest emergency service.
          </p>
        </section>
      </div>

      <aside className={styles.aside}>
        <div className={styles.summaryCard}>
          <AppointmentSummary
            doctorName={doctor?.name}
            specialtyName={specialty?.name}
            date={dateLabel}
            time={timeLabel}
            patientName={values.name}
          />

          <Button
            type="submit"
            size="lg"
            icon="calendar-check"
            iconPosition="start"
            fullWidth
            disabled={submitting}
          >
            {submitting ? "Sending…" : "Request Appointment"}
          </Button>

          {attempted && hasErrors(errors) ? (
            <p className={styles.formError} role="alert">
              <Icon name="alert" size={18} /> Please complete the highlighted fields.
            </p>
          ) : null}

          <div role="status" aria-live="polite">
            {result ? (
              <p className={`${styles.status} ${result.status === "success" ? styles.statusSuccess : ""}`}>
                <Icon name={result.status === "success" ? "check" : "info"} size={18} />
                <span>{result.message}</span>
              </p>
            ) : null}
          </div>

          <p className={styles.finePrint}>
            Appointment requests are subject to confirmation by the clinic.
          </p>
        </div>

        <div className={`${styles.whatsappCard} ${result && result.status !== "success" ? styles.whatsappHighlight : ""}`}>
          <p className={styles.whatsappTitle}>
            <WhatsAppGlyph size={20} className={styles.whatsappTitleIcon} /> Prefer WhatsApp?
          </p>
          <p className={styles.whatsappText}>
            {doctor
              ? "Send these appointment details to the clinic on WhatsApp."
              : "Message the clinic on WhatsApp to enquire about an appointment."}
          </p>
          <WhatsAppButton message={whatsappMessage} fullWidth />
        </div>
      </aside>
    </form>
  );
}

function StepHeader({
  number,
  id,
  title,
  hint,
}: {
  number: number;
  id: string;
  title: ReactNode;
  hint?: string;
}) {
  return (
    <div className={styles.stepHeader}>
      <span className={styles.stepNumber} aria-hidden="true">
        {number}
      </span>
      <div>
        <h2 id={id} className={styles.stepTitle}>
          {title}
        </h2>
        {hint ? <p className={styles.stepHint}>{hint}</p> : null}
      </div>
    </div>
  );
}

function InputWithIcon({ icon, children }: { icon: IconName; children: ReactNode }) {
  return (
    <div className={styles.withIcon}>
      <Icon name={icon} size={18} />
      {children}
    </div>
  );
}
