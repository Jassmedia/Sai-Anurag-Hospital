import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Specialties } from "@/components/sections/Specialties";
import { Doctors } from "@/components/sections/Doctors";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { CTA } from "@/components/sections/CTA";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Specialties />
      <Doctors />
      <WhyChooseUs />
      <CTA />
      <Contact />
    </>
  );
}
