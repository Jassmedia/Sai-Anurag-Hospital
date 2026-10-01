import type { Doctor } from "@/types";

/**
 * Phase 2: add `photo`, `qualifications` and `bio` to each doctor.
 * Photos go in /public/images/doctors/ and are referenced as
 * { src: "/images/doctors/dr-kameswari-k.jpg", alt: "Dr. Kameswari K" }.
 */
export const doctors: Doctor[] = [
  {
    slug: "dr-kameswari-k",
    name: "Dr. Kameswari K",
    specialtySlug: "obstetrics-gynaecology",
    title: "Obstetrics & Gynaecology",
    summary:
      "Provides obstetric and gynaecological care for women at Sai Anurag, with a focus on listening and clear guidance.",
  },
  {
    slug: "dr-anu-v",
    name: "Dr. Anu V",
    specialtySlug: "obstetrics-gynaecology",
    title: "Obstetrics & Gynaecology",
    summary:
      "Supports women's health through every stage of life with attentive, compassionate consultations.",
  },
  {
    slug: "dr-v-v-srinivas",
    name: "Dr. V V Srinivas",
    specialtySlug: "general-surgery-family-physician",
    title: "General Surgery & Family Physician",
    summary:
      "Cares for patients and families across everyday health needs and general surgical concerns.",
  },
  {
    slug: "dr-m-rajendra",
    name: "Dr. M. Rajendra",
    specialtySlug: "paediatrics",
    title: "Paediatrician",
    summary:
      "Looks after the health and wellbeing of infants, children and adolescents with patience and warmth.",
  },
];
