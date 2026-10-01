import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { DoctorPhoto } from "@/components/ui/DoctorPhoto";
import { Icon } from "@/components/ui/Icon";
import { getSpecialty } from "@/lib/data";
import type { Doctor, Tone } from "@/types";
import styles from "./DoctorCard.module.css";

interface DoctorCardProps {
  doctor: Doctor;
  /** Defaults to the doctor's specialty tone. */
  tone?: Tone;
}

export function DoctorCard({ doctor, tone }: DoctorCardProps) {
  const specialty = getSpecialty(doctor.specialtySlug);
  const cardTone = tone ?? specialty?.tone ?? "teal";
  const headingId = `doctor-${doctor.slug}`;

  return (
    <article className={`${styles.card} ${styles[cardTone]}`} aria-labelledby={headingId}>
      {siteConfig.showDoctorPhotos ? (
        <div className={styles.photo}>
          <DoctorPhoto doctor={doctor} tone={cardTone} />
        </div>
      ) : null}

      <div className={styles.body}>
        {!siteConfig.showDoctorPhotos && specialty ? (
          <span className={styles.icon} aria-hidden="true">
            <Icon name={specialty.icon} size={26} strokeWidth={1.7} />
          </span>
        ) : null}
        <p className={styles.specialty}>{doctor.title}</p>
        <h3 id={headingId} className={styles.name}>
          {doctor.name}
        </h3>
        <p className={styles.summary}>{doctor.summary}</p>

        <ButtonLink
          href={`/doctors/${doctor.slug}`}
          variant="secondary"
          size="sm"
          icon="arrow-right"
          fullWidth
          className={styles.button}
          aria-label={`View profile of ${doctor.name}`}
        >
          View Profile
        </ButtonLink>
      </div>
    </article>
  );
}
