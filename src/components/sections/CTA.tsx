import { AppointmentButton } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import styles from "./CTA.module.css";

interface CTAProps {
  title?: string;
  description?: string;
}

/** Appointment call-to-action banner. Reused on the home and detail pages. */
export function CTA({
  title = "Your Health Deserves the Right Care",
  description = "Connect with the Sai Anurag medical team and schedule a consultation.",
}: CTAProps) {
  return (
    <section className={styles.section} aria-labelledby="cta-title">
      <div className="container">
        <div className={styles.panel}>
          <div className={styles.decor} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div className={styles.content}>
            <h2 id="cta-title" className={styles.title}>
              {title}
            </h2>
            <p className={styles.description}>{description}</p>
          </div>

          <div className={styles.action}>
            <AppointmentButton variant="light" size="lg" fullWidth />
            <WhatsAppButton variant="solid" size="lg" fullWidth />
          </div>
        </div>
      </div>
    </section>
  );
}
