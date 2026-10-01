import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PLACEHOLDER_TEXT, siteConfig } from "@/config/site";
import { PageIntro } from "@/components/layout/PageIntro";
import { CTA } from "@/components/sections/CTA";
import { AppointmentButton, ButtonLink } from "@/components/ui/Button";
import { DoctorPhoto } from "@/components/ui/DoctorPhoto";
import { Icon } from "@/components/ui/Icon";
import { getDoctor, getDoctors, getSpecialty } from "@/lib/data";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getDoctors().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const doctor = getDoctor((await params).slug);
  if (!doctor) return {};
  return {
    title: `${doctor.name} — ${doctor.title}`,
    description: doctor.summary,
  };
}

export default async function DoctorPage({ params }: Props) {
  const doctor = getDoctor((await params).slug);
  if (!doctor) notFound();

  const specialty = getSpecialty(doctor.specialtySlug);
  const tone = specialty?.tone ?? "teal";

  return (
    <>
      <PageIntro
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Doctors", href: "/#doctors" },
          { label: doctor.name },
        ]}
      >
        <div className={`${styles.layout} ${siteConfig.showDoctorPhotos ? styles.withPhoto : ""}`}>
          {siteConfig.showDoctorPhotos ? (
            <div className={styles.photo}>
              <DoctorPhoto
                doctor={doctor}
                tone={tone}
                priority
                sizes="(min-width: 900px) 380px, 100vw"
              />
            </div>
          ) : null}

          <div className={styles.content}>
            {!siteConfig.showDoctorPhotos && specialty ? (
              <span className={`${styles.icon} ${styles[tone]}`} aria-hidden="true">
                <Icon name={specialty.icon} size={32} strokeWidth={1.6} />
              </span>
            ) : null}
            <p className={`${styles.pill} ${styles[tone]}`}>{doctor.title}</p>
            <h1 className={styles.name}>{doctor.name}</h1>
            <p className={styles.summary}>{doctor.summary}</p>

            <dl className={styles.details}>
              <div>
                <dt>Specialty</dt>
                <dd>
                  {specialty ? (
                    <Link href={`/specialties/${specialty.slug}`}>{specialty.name}</Link>
                  ) : (
                    doctor.title
                  )}
                </dd>
              </div>
              <div>
                <dt>Qualifications</dt>
                <dd>
                  {doctor.qualifications?.length ? (
                    doctor.qualifications.join(", ")
                  ) : (
                    <span className={styles.placeholder}>{PLACEHOLDER_TEXT}</span>
                  )}
                </dd>
              </div>
              <div className={styles.full}>
                <dt>About</dt>
                <dd>
                  {doctor.bio ?? (
                    <span className={styles.placeholder}>
                      A detailed profile for {doctor.name} will be added soon.
                    </span>
                  )}
                </dd>
              </div>
            </dl>

            <div className={styles.actions}>
              <AppointmentButton size="lg" doctorSlug={doctor.slug} />
              <ButtonLink href="/#doctors" variant="secondary" size="lg" icon="arrow-left" iconPosition="start">
                All Doctors
              </ButtonLink>
            </div>
          </div>
        </div>
      </PageIntro>

      <CTA />
    </>
  );
}
