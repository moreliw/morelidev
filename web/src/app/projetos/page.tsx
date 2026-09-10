import type { Metadata } from "next";
import { SiteChrome } from "@/components/site/SiteChrome";
import { Footer } from "@/components/site/Footer";
import { ProjectsIndex } from "@/components/site/ProjectsIndex";
import { Motion } from "@/components/site/Motion";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Sistemas corporativos, marketplaces, aplicativos e sites desenvolvidos pela MoreliDev para empresas de diferentes setores.",
  alternates: { canonical: "https://morelidev.com/projetos" },
  openGraph: {
    title: "Projetos — MoreliDev",
    description:
      "Sistemas corporativos, marketplaces, aplicativos e sites desenvolvidos pela MoreliDev para empresas de diferentes setores.",
    url: "https://morelidev.com/projetos",
    type: "website",
  },
};

export default function ProjetosPage() {
  return (
    <>
      <SiteChrome />
      <main id="conteudo">
        <ProjectsIndex />
      </main>
      <Footer />
      <Motion />
    </>
  );
}
