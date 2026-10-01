import type { ReactNode } from "react";
import styles from "./SectionHeader.module.css";

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  /** id for the heading, so the parent <section> can use aria-labelledby. */
  id?: string;
  as?: "h1" | "h2";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  id,
  as: Heading = "h2",
}: SectionHeaderProps) {
  return (
    <div className={`${styles.header} ${styles[align]}`}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <Heading id={id} className={styles.title}>
        {title}
      </Heading>
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  );
}
