import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { ProofStrip } from "@/components/site/ProofStrip";
import { FeaturedProjects } from "@/components/site/FeaturedProjects";
import { Capabilities } from "@/components/site/Capabilities";
import { Process } from "@/components/site/Process";
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
        <ProofStrip />
        <FeaturedProjects />
        <Capabilities />
        <Process />
        <About />
        <ContactCTA />
      </main>
      <Footer />
      <ScrollReveals />
    </>
  );
}
