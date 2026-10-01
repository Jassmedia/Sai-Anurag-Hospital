import { DoctorCard } from "@/components/cards/DoctorCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getDoctors, getSpecialty } from "@/lib/data";
import styles from "./Doctors.module.css";

export function Doctors() {
  const doctors = getDoctors();

  return (
    <section id="doctors" className="section" aria-labelledby="doctors-title">
      <div className="container">
        <SectionHeader
          id="doctors-title"
          eyebrow="Our Doctors"
          title="Meet the doctors who care for you"
          description="A dedicated team committed to attentive, compassionate care for every patient who walks through our doors."
        />

        <ul className={styles.grid}>
          {doctors.map((doctor) => (
            <li key={doctor.slug}>
              <DoctorCard
                doctor={doctor}
                tone={getSpecialty(doctor.specialtySlug)?.tone}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
