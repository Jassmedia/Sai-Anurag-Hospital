import Image from "next/image";
import { getInitials } from "@/lib/data";
import type { Doctor, Tone } from "@/types";
import styles from "./DoctorPhoto.module.css";

interface DoctorPhotoProps {
  doctor: Doctor;
  tone?: Tone;
  /** `sizes` hint for next/image once real photos are added. */
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * Shows the doctor's photo when one is set in src/data/doctors.ts,
 * otherwise a neutral portrait placeholder with the doctor's initials.
 * The parent controls the size/aspect ratio.
 */
export function DoctorPhoto({
  doctor,
  tone = "teal",
  sizes = "(min-width: 1100px) 280px, (min-width: 640px) 45vw, 100vw",
  priority,
  className,
}: DoctorPhotoProps) {
  return (
    <div className={`${styles.frame} ${styles[tone]} ${className ?? ""}`}>
      {doctor.photo ? (
        <Image
          src={doctor.photo.src}
          alt={doctor.photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={styles.image}
        />
      ) : (
        <div className={styles.placeholder}>
          <span className={styles.rings} aria-hidden="true" />
          <span className={styles.monogram} aria-hidden="true">
            {getInitials(doctor.name)}
          </span>
          <span className="visually-hidden">Photo of {doctor.name} coming soon</span>
        </div>
      )}
    </div>
  );
}
