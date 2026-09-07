import { Header } from "@/components/site/Header";
import { HomeExperience } from "@/components/site/HomeExperience";
import { Footer } from "@/components/site/Footer";
import { Motion } from "@/components/site/Motion";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <HomeExperience />
      </main>
      <Footer />
      <Motion />
    </>
  );
}
