import Link from "next/link";
import { PLACEHOLDER_TEXT, siteConfig } from "@/config/site";
import { getSpecialties } from "@/lib/data";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Logo } from "./Logo";
import styles from "./Footer.module.css";

export function Footer() {
  const { contact, social, nav, appointmentHref } = siteConfig;
  const specialties = getSpecialties();
  const year = new Date().getFullYear();

  const contactRows: { icon: IconName; label: string; value: string | null }[] = [
    { icon: "map-pin", label: "Address", value: contact.address },
    { icon: "phone", label: "Phone", value: contact.phone },
    { icon: "mail", label: "Email", value: contact.email },
    { icon: "clock", label: "Opening hours", value: contact.openingHours },
  ];

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Logo variant="light" />
          <p className={styles.audience}>
            {siteConfig.audience.map((item, i) => (
              <span key={item}>
                {i > 0 ? <span className={styles.dot} aria-hidden="true" /> : null}
                {item}
              </span>
            ))}
          </p>
          <p className={styles.description}>
            Compassionate, patient-first healthcare for women, children and
            families — with trusted doctors across multiple specialties.
          </p>
          <ul className={styles.social} aria-label="Social media">
            {social.map((item) => (
              <li key={item.label}>
                {item.href ? (
                  <a
                    href={item.href}
                    className={styles.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                  >
                    <Icon name={item.icon} size={18} />
                  </a>
                ) : (
                  <span
                    className={`${styles.socialLink} ${styles.socialPlaceholder}`}
                    title={`${item.label} — coming soon`}
                  >
                    <Icon name={item.icon} size={18} />
                    <span className="visually-hidden">{item.label} (coming soon)</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <h2 className={styles.heading}>Quick Links</h2>
          <ul className={styles.links}>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li>
              <Link href={appointmentHref}>Book an Appointment</Link>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <h2 className={styles.heading}>Specialties</h2>
          <ul className={styles.links}>
            {specialties.map((s) => (
              <li key={s.slug}>
                <Link href={`/specialties/${s.slug}`}>{s.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <h2 className={styles.heading}>Contact</h2>
          <ul className={styles.contactList}>
            {contactRows.map((row) => (
              <li key={row.label}>
                <Icon name={row.icon} size={18} className={styles.contactIcon} />
                <span>
                  <span className="visually-hidden">{row.label}: </span>
                  {row.value ?? (
                    <span className={styles.placeholder}>
                      {row.label} — {PLACEHOLDER_TEXT.toLowerCase()}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container">
        <div className={styles.bottom}>
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className={styles.note}>
            Information on this website is for general guidance and is not a
            substitute for professional medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
