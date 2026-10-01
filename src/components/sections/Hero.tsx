import Link from "next/link";
import { AppointmentButton, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { getSpecialties } from "@/lib/data";
import styles from "./Hero.module.css";

/** Short value statements shown under the buttons. */
const assurances = ["Patient-first care", "Experienced doctors", "Easy appointment booking"];

export function Hero() {
  const specialties = getSpecialties();

  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.bgDecor} aria-hidden="true" />
      <SideDecor className={styles.decorLeft} />
      <SideDecor className={`${styles.decorRight} ${styles.mirrored}`} />

      <div className={`container ${styles.grid}`}>
        <div className={styles.content}>
          <p className={styles.badge}>
            <span className={styles.badgeDot} aria-hidden="true" />
            Welcome to Sai Anurag
          </p>

          <h1 id="hero-title" className={styles.title}>
            Compassionate Healthcare for{" "}
            <span className={styles.highlight}>You and Your Family</span>
          </h1>

          <p className={styles.lead}>
            Expert medical care with trusted doctors and a patient-first
            approach at Sai Anurag.
          </p>

          <div className={styles.actions}>
            <AppointmentButton size="lg" />
            <ButtonLink href="/#doctors" variant="secondary" size="lg" icon="arrow-right">
              Explore Our Doctors
            </ButtonLink>
          </div>

          <ul className={styles.assurances}>
            {assurances.map((item) => (
              <li key={item}>
                <span className={styles.check} aria-hidden="true">
                  <Icon name="check" size={12} strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`container ${styles.cardsWrap}`}>
        <ul className={styles.cards} aria-label="Our specialties">
          {specialties.map((s) => (
            <li key={s.slug}>
              <Link href={`/specialties/${s.slug}`} className={`${styles.card} ${styles[s.tone]}`}>
                <span className={styles.cardIcon} aria-hidden="true">
                  <Icon name={s.icon} size={24} strokeWidth={1.8} />
                </span>
                <span className={styles.cardText}>
                  <span className={styles.cardTitle}>{s.name}</span>
                  <span className={styles.cardTagline}>{s.tagline}</span>
                </span>
                <Icon name="arrow-right" size={18} className={styles.cardArrow} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Very faint rings and crosses that soften the empty edges on wide screens. */
function SideDecor({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 320 520" fill="none" aria-hidden="true">
      <circle cx="40" cy="260" r="120" stroke="#12717f" strokeOpacity="0.1" strokeWidth="1.5" />
      <circle cx="40" cy="260" r="180" stroke="#12717f" strokeOpacity="0.07" strokeWidth="1.5" />
      <circle
        cx="40"
        cy="260"
        r="240"
        stroke="#12717f"
        strokeOpacity="0.12"
        strokeWidth="1.5"
        strokeDasharray="2 10"
        strokeLinecap="round"
      />
      <circle cx="160" cy="92" r="5" fill="#6ccbd9" fillOpacity="0.55" />
      <circle cx="210" cy="400" r="4" fill="#2f9e7c" fillOpacity="0.4" />
      <g stroke="#12717f" strokeOpacity="0.28" strokeWidth="2.5" strokeLinecap="round">
        <path d="M232 170v16M224 178h16" />
        <path d="M120 470v12M114 476h12" />
      </g>
    </svg>
  );
}
