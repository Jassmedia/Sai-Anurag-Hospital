import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/ui/Icon";
import fieldStyles from "@/components/ui/Form.module.css";
import { getInitials, getSpecialty } from "@/lib/data";
import type { Doctor } from "@/types";
import styles from "./Appointment.module.css";

interface DoctorPickerProps {
  doctors: Doctor[];
  value: string;
  onChange: (slug: string) => void;
  error?: string;
  /** id of the element that labels this group. */
  labelledBy: string;
}

/** Doctor selection as a group of radio cards. */
export function DoctorPicker({ doctors, value, onChange, error, labelledBy }: DoctorPickerProps) {
  const errorId = "appt-doctor-error";
  return (
    <div
      role="radiogroup"
      aria-labelledby={labelledBy}
      aria-describedby={error ? errorId : undefined}
      aria-invalid={error ? true : undefined}
      aria-required="true"
    >
      <div className={styles.doctorGrid}>
        {doctors.map((doctor) => {
          const tone = getSpecialty(doctor.specialtySlug)?.tone ?? "teal";
          const checked = value === doctor.slug;
          return (
            <label
              key={doctor.slug}
              className={`${styles.doctorOption} ${styles[tone]} ${checked ? styles.checked : ""}`}
            >
              <input
                type="radio"
                name="doctor"
                id={`appt-doctor-${doctor.slug}`}
                value={doctor.slug}
                checked={checked}
                onChange={() => onChange(doctor.slug)}
                className={styles.radioInput}
              />
              <span className={styles.doctorAvatar} aria-hidden="true">
                {siteConfig.showDoctorPhotos && doctor.photo ? (
                  <Image src={doctor.photo.src} alt="" width={52} height={52} />
                ) : (
                  getInitials(doctor.name)
                )}
              </span>
              <span className={styles.doctorInfo}>
                <span className={styles.doctorName}>{doctor.name}</span>
                <span className={styles.doctorSpecialty}>{doctor.title}</span>
              </span>
              <span className={styles.radioMark} aria-hidden="true">
                <Icon name="check" size={14} strokeWidth={3} />
              </span>
            </label>
          );
        })}
      </div>
      {error ? (
        <p id={errorId} className={`${fieldStyles.error} ${styles.groupError}`}>
          <Icon name="alert" size={15} /> {error}
        </p>
      ) : null}
    </div>
  );
}
