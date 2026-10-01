import type { ContactDetails, NavItem, SocialLink } from "@/types";
import { getWhatsAppNumber } from "./whatsapp";

/**
 * Central site configuration.
 *
 * Phase 2: fill in the `null` contact values, social links and SEO copy here.
 * Every component reads from this file, so nothing else needs to change.
 */
export const siteConfig = {
  name: "Sai Anurag",
  tagline: "Clinic",
  /** Brand line from the logo: "Women • Children • Families". */
  audience: ["Women", "Children", "Families"],
  description:
    "Compassionate, patient-first healthcare for women, children and families. Obstetrics & Gynaecology, General Surgery & Family Medicine, and Paediatrics at Sai Anurag.",
  /** Production URL, used for SEO metadata once the site is deployed. */
  url: null as string | null,

  /**
   * Where every "Book an Appointment" button points.
   * Can be changed to an external booking link later.
   */
  appointmentHref: "/book-appointment",

  /**
   * Show the photo area on doctor cards and profile pages. Until a doctor's
   * `photo` is set in src/data/doctors.ts, a placeholder with initials is shown.
   */
  showDoctorPhotos: true,

  nav: [
    { label: "Home", href: "/#home" },
    { label: "About", href: "/#about" },
    { label: "Specialties", href: "/#specialties" },
    { label: "Doctors", href: "/#doctors" },
    { label: "Contact", href: "/#contact" },
  ] satisfies NavItem[],

  contact: {
    address: null,
    phone: null,
    // Set the number in src/config/whatsapp.ts
    whatsapp: getWhatsAppNumber(),
    email: null,
    openingHours: null,
    mapEmbedUrl: null,
  } satisfies ContactDetails as ContactDetails,

  social: [
    { label: "Facebook", icon: "facebook", href: null },
    { label: "Instagram", icon: "instagram", href: null },
    { label: "YouTube", icon: "youtube", href: null },
  ] satisfies SocialLink[] as SocialLink[],
};

/** Text shown wherever a detail has not been provided yet. */
export const PLACEHOLDER_TEXT = "To be updated";
