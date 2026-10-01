import type { Metadata } from "next";
import { AppointmentForm } from "@/components/appointment/AppointmentForm";
import { PageIntro } from "@/components/layout/PageIntro";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Request an appointment at Sai Anurag Clinic — Obstetrics & Gynaecology, General Surgery & Family Medicine, and Paediatrics.",
};

export default function BookAppointmentPage() {
  return (
    <>
      <PageIntro
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Book an Appointment" },
        ]}
      >
        <SectionHeader
          as="h1"
          eyebrow="Appointments"
          title="Book an Appointment"
          description="Choose your doctor and a preferred date and time, then share a few details so the clinic can arrange your visit."
          align="left"
        />
      </PageIntro>

      <section
        className="section"
        style={{ paddingTop: 0 }}
        aria-label="Appointment form"
      >
        <div className="container">
          <AppointmentForm />
        </div>
      </section>
    </>
  );
}
