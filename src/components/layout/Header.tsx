"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { AppointmentButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "./Logo";
import styles from "./Header.module.css";

const DESKTOP_QUERY = "(min-width: 1024px)";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add a border/shadow once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the mobile menu is open: lock page scroll, close on Escape,
  // and close automatically if the viewport grows to desktop size.
  useEffect(() => {
    if (!menuOpen) return;

    document.body.classList.add("menu-open");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`${styles.header} ${scrolled || menuOpen ? styles.scrolled : ""}`}
    >
      <div className={`container ${styles.bar}`}>
        <Logo onClick={closeMenu} />

        <nav className={styles.desktopNav} aria-label="Main">
          <ul className={styles.navList}>
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.navLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <AppointmentButton className={styles.cta} size="md" />
          <button
            type="button"
            className={styles.menuToggle}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? "close" : "menu"} size={24} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Mobile / tablet menu */}
      <div
        className={`${styles.backdrop} ${menuOpen ? styles.backdropVisible : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
      <nav
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
        aria-label="Mobile"
        inert={!menuOpen}
      >
        <ul className={styles.mobileList}>
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={styles.mobileLink} onClick={closeMenu}>
                {item.label}
                <Icon name="arrow-right" size={18} />
              </Link>
            </li>
          ))}
        </ul>
        <AppointmentButton size="lg" fullWidth onClick={closeMenu} />
      </nav>
    </header>
  );
}
