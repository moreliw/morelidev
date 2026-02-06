import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { Stats } from "@/components/Stats";
import { Portfolio } from "@/components/Portfolio";
import { PersonalInfo } from "@/components/PersonalInfo";
import { Headline } from "@/components/Headline";
import { Stack } from "@/components/Stack";
import { Experience } from "@/components/Experience";
import { Languages } from "@/components/Languages";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <PersonalInfo />
      <Headline />
      <Services />
      <About />
      <Stack />
      <Experience />
      <Stats />
      <Portfolio />
      <Languages />
      <Contact />
      <Footer />
    </div>
  );
}
