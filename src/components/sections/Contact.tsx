import { PLACEHOLDER_TEXT, siteConfig } from "@/config/site";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactForm } from "./ContactForm";
import styles from "./Contact.module.css";

interface ContactRow {
  icon: IconName;
  label: string;
  value: string | null;
  /** Builds a link from the value once it exists (tel:, mailto:, wa.me). */
  toHref?: (value: string) => string;
}

export function Contact() {
  const { contact } = siteConfig;

  const rows: ContactRow[] = [
    { icon: "map-pin", label: "Clinic address", value: contact.address },
    {
      icon: "phone",
      label: "Phone",
      value: contact.phone,
      toHref: (v) => `tel:${v.replace(/[^\d+]/g, "")}`,
    },
    {
      icon: "whatsapp",
      label: "WhatsApp",
      value: contact.whatsapp,
      toHref: (v) => `https://wa.me/${v.replace(/\D/g, "")}`,
    },
    {
      icon: "mail",
      label: "Email",
      value: contact.email,
      toHref: (v) => `mailto:${v}`,
    },
    { icon: "clock", label: "Opening hours", value: contact.openingHours },
  ];

  return (
    <section
      id="contact"
      className="section section--soft"
      aria-labelledby="contact-title"
    >
      <div className="container">
        <SectionHeader
          id="contact-title"
          eyebrow="Contact"
          title="Get in touch with Sai Anurag"
          description="Have a question or want to schedule a visit? Reach out to us — we're here to help."
        />

        <div className={styles.grid}>
          <div className={styles.info}>
            <ul className={styles.list}>
              {rows.map((row) => (
                <li key={row.label} className={styles.row}>
                  <span className={styles.rowIcon}>
                    <Icon name={row.icon} size={20} />
                  </span>
                  <span className={styles.rowText}>
                    <span className={styles.rowLabel}>{row.label}</span>
                    {row.value ? (
                      row.toHref ? (
                        <a
                          href={row.toHref(row.value)}
                          className={styles.rowValue}
                          {...(row.icon === "whatsapp"
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          {row.value}
                        </a>
                      ) : (
                        <span className={styles.rowValue}>{row.value}</span>
                      )
                    ) : (
                      <span className={styles.placeholder}>{PLACEHOLDER_TEXT}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <div className={styles.map}>
              {contact.mapEmbedUrl ? (
                <iframe
                  src={contact.mapEmbedUrl}
                  title={`${siteConfig.name} location on Google Maps`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <div className={styles.mapPlaceholder}>
                  <span className={styles.mapPin}>
                    <Icon name="map-pin" size={26} />
                  </span>
                  <p className={styles.mapTitle}>Google Maps location</p>
                  <p className={styles.mapText}>{PLACEHOLDER_TEXT}</p>
                </div>
              )}
            </div>
          </div>

          <div className={styles.formCard}>
            <h3 className={styles.formTitle}>Send us a message</h3>
            <p className={styles.formIntro}>
              Fill in your details and our team will get back to you.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
