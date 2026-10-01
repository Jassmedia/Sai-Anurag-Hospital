import { SpecialtyCard } from "@/components/cards/SpecialtyCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getDoctorsForSpecialty, getSpecialties } from "@/lib/data";
import styles from "./Specialties.module.css";

export function Specialties() {
  const specialties = getSpecialties();

  return (
    <section
      id="specialties"
      className="section section--soft"
      aria-labelledby="specialties-title"
    >
      <div className="container">
        <SectionHeader
          id="specialties-title"
          eyebrow="Our Specialties"
          title="Focused care for every stage of life"
          description="Our doctors offer care across multiple specialties, so women, children and families can find the right support in one place."
        />

        <ul className={styles.grid}>
          {specialties.map((specialty) => (
            <li key={specialty.slug}>
              <SpecialtyCard
                specialty={specialty}
                doctors={getDoctorsForSpecialty(specialty)}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
