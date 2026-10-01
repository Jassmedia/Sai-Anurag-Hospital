import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import styles from "./Logo.module.css";

interface LogoProps {
  /** "dark" for light backgrounds (header), "light" for dark backgrounds (footer). */
  variant?: "dark" | "light";
  onClick?: () => void;
}

/*
 * Brand logo, built from the clinic's logo (public/images/logo/sai-anurag-logo.png):
 * the symbol and the "Sai Anurag" wordmark are separate images so they fit a
 * horizontal header; "Clinic" is live text styled like the logo.
 */
const assets = {
  dark: { mark: "/images/logo/logo-mark.png", wordmark: "/images/logo/logo-wordmark.png" },
  light: { mark: "/images/logo/logo-mark-light.png", wordmark: "/images/logo/logo-wordmark-light.png" },
};

export function Logo({ variant = "dark", onClick }: LogoProps) {
  const src = assets[variant];
  const priority = variant === "dark"; // header logo is above the fold
  return (
    <Link
      href="/#home"
      className={`${styles.logo} ${styles[variant]}`}
      aria-label={`${siteConfig.name} ${siteConfig.tagline} — home`}
      onClick={onClick}
    >
      <Image src={src.mark} alt="" width={378} height={320} className={styles.mark} priority={priority} />
      <span className={styles.text}>
        <Image
          src={src.wordmark}
          alt={siteConfig.name}
          width={533}
          height={140}
          className={styles.wordmark}
          priority={priority}
        />
        <span className={styles.tagline}>{siteConfig.tagline}</span>
      </span>
    </Link>
  );
}
