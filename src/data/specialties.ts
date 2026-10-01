import type { Specialty } from "@/types";

export const specialties: Specialty[] = [
  {
    slug: "obstetrics-gynaecology",
    tagline: "Women’s health and pregnancy care",
    name: "Obstetrics & Gynaecology",
    icon: "venus",
    tone: "teal",
    summary:
      "Thoughtful, supportive care for women's health, pregnancy and every stage of life in between.",
    doctorSlugs: ["dr-kameswari-k", "dr-anu-v"],
  },
  {
    slug: "general-surgery-family-physician",
    tagline: "Everyday care and surgical consultations",
    name: "General Surgery & Family Physician",
    icon: "stethoscope",
    tone: "cyan",
    summary:
      "Everyday healthcare for the whole family, along with consultation and care for general surgical concerns.",
    doctorSlugs: ["dr-v-v-srinivas"],
  },
  {
    slug: "paediatrics",
    tagline: "Care for infants, children and teens",
    name: "Paediatrics",
    icon: "baby",
    tone: "green",
    summary:
      "Gentle, attentive care for infants, children and adolescents as they grow.",
    doctorSlugs: ["dr-m-rajendra"],
  },
];
