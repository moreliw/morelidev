import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Stack } from "@/components/Stack";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <Section id="about" title="Sobre mim">
        <About />
      </Section>
      <Experience />
      <Stack />
      <Projects />
      <Services />
      <Contact />
      <footer className="mx-auto max-w-6xl px-6 py-16 text-sm text-zinc-500">
        © {new Date().getFullYear()} Moreli Dev — Qualidade, performance e design.
      </footer>
    </div>
  );
}
