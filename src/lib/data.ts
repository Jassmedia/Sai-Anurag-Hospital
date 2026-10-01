import { doctors } from "@/data/doctors";
import { specialties } from "@/data/specialties";
import type { Doctor, Specialty } from "@/types";

/*
 * Data access helpers. Components never import the raw data arrays directly,
 * so when doctors/specialties move to a CMS or database in a later phase,
 * only this file needs to change (e.g. to async fetches).
 */

export function getSpecialties(): Specialty[] {
  return specialties;
}

export function getSpecialty(slug: string): Specialty | undefined {
  return specialties.find((s) => s.slug === slug);
}

export function getDoctors(): Doctor[] {
  return doctors;
}

export function getDoctor(slug: string): Doctor | undefined {
  return doctors.find((d) => d.slug === slug);
}

export function getDoctorsForSpecialty(specialty: Specialty): Doctor[] {
  return specialty.doctorSlugs
    .map((slug) => getDoctor(slug))
    .filter((d): d is Doctor => Boolean(d));
}

/** "Dr. V V Srinivas" -> "VS" */
export function getInitials(name: string): string {
  const parts = name
    .replace(/^Dr\.?\s*/i, "")
    .split(/[\s.]+/)
    .filter(Boolean);
  if (parts.length === 0) return "";
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}
