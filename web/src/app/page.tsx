import { SiteChrome } from "@/components/site/SiteChrome";
import { HomeExperience } from "@/components/site/HomeExperience";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  return (
    <>
      <SiteChrome />
      <main id="conteudo">
        <HomeExperience />
      </main>
      <Footer />
    </>
  );
}
