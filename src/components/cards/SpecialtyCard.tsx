import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { getInitials } from "@/lib/data";
import type { Doctor, Specialty } from "@/types";
import styles from "./SpecialtyCard.module.css";

interface SpecialtyCardProps {
  specialty: Specialty;
  doctors: Doctor[];
}

export function SpecialtyCard({ specialty, doctors }: SpecialtyCardProps) {
  const headingId = `specialty-${specialty.slug}`;
  return (
    <article className={`${styles.card} ${styles[specialty.tone]}`} aria-labelledby={headingId}>
      <span className={styles.iconWrap}>
        <Icon name={specialty.icon} size={28} strokeWidth={1.7} />
      </span>

      <h3 id={headingId} className={styles.title}>
        {specialty.name}
      </h3>
      <p className={styles.summary}>{specialty.summary}</p>

      <div className={styles.doctors}>
        <p className={styles.label}>{doctors.length === 1 ? "Doctor" : "Doctors"}</p>
        <ul className={styles.doctorList}>
          {doctors.map((doctor) => (
            <li key={doctor.slug}>
              <span className={styles.avatar} aria-hidden="true">
                {getInitials(doctor.name)}
              </span>
              <Link href={`/doctors/${doctor.slug}`} className={styles.doctorLink}>
                {doctor.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <ButtonLink
        href={`/specialties/${specialty.slug}`}
        variant="ghost"
        icon="arrow-right"
        className={styles.more}
        aria-label={`Learn more about ${specialty.name}`}
      >
        Learn More
      </ButtonLink>
    </article>
  );
}
