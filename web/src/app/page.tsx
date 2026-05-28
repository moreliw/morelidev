import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Stack } from "@/components/Stack";
import { Experience } from "@/components/Experience";
import { Portfolio } from "@/components/Portfolio";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="font-sans">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Stack />
      <Experience />
      <Portfolio />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
    </main>
  );
}
