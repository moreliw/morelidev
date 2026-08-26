import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Manifesto } from "@/components/site/Manifesto";
import { Cases } from "@/components/site/Cases";
import { Expertise } from "@/components/site/Expertise";
import { CaseInterlude } from "@/components/site/CaseInterlude";
import { Process } from "@/components/site/Process";
import { Principles } from "@/components/site/Principles";
import { About } from "@/components/site/About";
import { ContactCTA } from "@/components/site/ContactCTA";
import { Footer } from "@/components/site/Footer";
import { ScrollReveals } from "@/components/site/ScrollReveals";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Manifesto />
        <Cases />
        <Expertise />
        <CaseInterlude />
        <Process />
        <Principles />
        <About />
        <ContactCTA />
      </main>
      <Footer />
      <ScrollReveals />
    </>
  );
}
