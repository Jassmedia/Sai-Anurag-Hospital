import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/layout/PageIntro";
import { DoctorCard } from "@/components/cards/DoctorCard";
import { CTA } from "@/components/sections/CTA";
import { AppointmentButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getDoctorsForSpecialty, getSpecialties, getSpecialty } from "@/lib/data";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getSpecialties().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const specialty = getSpecialty((await params).slug);
  if (!specialty) return {};
  return { title: specialty.name, description: specialty.summary };
}

export default async function SpecialtyPage({ params }: Props) {
  const specialty = getSpecialty((await params).slug);
  if (!specialty) notFound();

  const doctors = getDoctorsForSpecialty(specialty);

  return (
    <>
      <PageIntro
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Specialties", href: "/#specialties" },
          { label: specialty.name },
        ]}
      >
        <div className={styles.intro}>
          <span className={`${styles.icon} ${styles[specialty.tone]}`}>
            <Icon name={specialty.icon} size={34} strokeWidth={1.6} />
          </span>
          <h1 className={styles.title}>{specialty.name}</h1>
          <p className={styles.summary}>{specialty.summary}</p>
          {/* Phase 2: detailed description, services and FAQs for this specialty. */}
          <AppointmentButton size="lg" />
        </div>
      </PageIntro>

      <section className="section" aria-labelledby="specialty-doctors-title">
        <div className="container">
          <SectionHeader
            id="specialty-doctors-title"
            eyebrow={doctors.length === 1 ? "Your doctor" : "Your doctors"}
            title={`${specialty.name} at Sai Anurag`}
          />
          <ul className={styles.grid}>
            {doctors.map((doctor) => (
              <li key={doctor.slug}>
                <DoctorCard doctor={doctor} tone={specialty.tone} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTA />
    </>
  );
}
