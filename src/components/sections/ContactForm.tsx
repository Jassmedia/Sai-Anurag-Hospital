"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import {
  GENERAL_ENQUIRY,
  submitContactForm,
  type ContactFormData,
  type ContactFormResult,
} from "@/lib/contact";
import { getDoctors } from "@/lib/data";
import { isValidEmail, isValidPhone } from "@/lib/validation";
import form from "@/components/ui/Form.module.css";
import styles from "./Contact.module.css";

type Errors = Partial<Record<keyof ContactFormData, string>>;

const EMPTY: ContactFormData = { name: "", phone: "", doctor: "", email: "", message: "" };

function validate(data: ContactFormData): Errors {
  const errors: Errors = {};
  if (!data.name.trim()) errors.name = "Please enter your name.";
  if (!data.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  } else if (!isValidPhone(data.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (!data.doctor) errors.doctor = "Please select a doctor, or choose General enquiry.";
  if (data.email.trim() && !isValidEmail(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.message.trim()) errors.message = "Please enter a message.";
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<ContactFormData>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<ContactFormResult | null>(null);

  const update =
    (field: keyof ContactFormData) =>
    (e: { target: { value: string } }) => {
      setValues((v) => ({ ...v, [field]: e.target.value }));
      if (errors[field]) setErrors((errs) => ({ ...errs, [field]: undefined }));
    };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setResult(null);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    setSubmitting(true);
    const res = await submitContactForm(values);
    setSubmitting(false);
    setResult(res);
    if (res.status === "success") setValues(EMPTY);
  }

  const fieldProps = (field: keyof ContactFormData) => ({
    id: `contact-${field}`,
    name: field,
    value: values[field],
    onChange: update(field),
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
    className: form.input,
  });

  const errorText = (field: keyof ContactFormData) =>
    errors[field] ? (
      <span id={`contact-${field}-error`} className={form.error}>
        {errors[field]}
      </span>
    ) : null;

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row2}>
        <div className={form.field}>
          <label htmlFor="contact-name" className={form.label}>
            Name <span className={form.required} aria-hidden="true">*</span>
          </label>
          <input type="text" autoComplete="name" placeholder="Your full name" {...fieldProps("name")} />
          {errorText("name")}
        </div>

        <div className={form.field}>
          <label htmlFor="contact-phone" className={form.label}>
            Phone <span className={form.required} aria-hidden="true">*</span>
          </label>
          <input type="tel" autoComplete="tel" inputMode="tel" placeholder="Your phone number" {...fieldProps("phone")} />
          {errorText("phone")}
        </div>
      </div>

      <div className={form.field}>
        <label htmlFor="contact-doctor" className={form.label}>
          Select Doctor <span className={form.required} aria-hidden="true">*</span>
        </label>
        <select
          {...fieldProps("doctor")}
          className={`${form.input} ${form.select} ${values.doctor ? "" : form.selectEmpty}`}
        >
          <option value="" disabled>
            Choose a doctor
          </option>
          {getDoctors().map((doctor) => (
            <option key={doctor.slug} value={doctor.slug}>
              {doctor.name} — {doctor.title}
            </option>
          ))}
          <option value={GENERAL_ENQUIRY}>No preference / General enquiry</option>
        </select>
        {errorText("doctor")}
      </div>

      <div className={form.field}>
        <label htmlFor="contact-email" className={form.label}>
          Email <span className={form.optional}>(optional)</span>
        </label>
        <input type="email" autoComplete="email" placeholder="you@example.com" {...fieldProps("email")} />
        {errorText("email")}
      </div>

      <div className={form.field}>
        <label htmlFor="contact-message" className={form.label}>
          Message <span className={form.required} aria-hidden="true">*</span>
        </label>
        <textarea rows={5} placeholder="How can we help you?" {...fieldProps("message")} />
        {errorText("message")}
      </div>

      <p className={styles.formNote}>
        Please don&rsquo;t share detailed medical information here. For
        emergencies, contact your nearest emergency service.
      </p>

      <Button type="submit" size="lg" icon="send" fullWidth disabled={submitting}>
        {submitting ? "Sending…" : "Submit"}
      </Button>

      <div aria-live="polite" role="status">
        {result ? (
          <p
            className={`${styles.status} ${
              result.status === "success" ? styles.statusSuccess : styles.statusInfo
            }`}
          >
            <Icon name={result.status === "success" ? "check" : "info"} size={18} />
            {result.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
