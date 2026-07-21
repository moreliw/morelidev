import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProjectsIndex } from "@/components/site/ProjectsIndex";
import { ScrollReveals } from "@/components/site/ScrollReveals";

export const metadata: Metadata = {
  title: "Projetos — William Moreli",
  description:
    "Sistemas corporativos, marketplaces, aplicativos e sites desenvolvidos por William Moreli para empresas no Brasil e em Angola.",
  alternates: { canonical: "https://morelidev.com/projetos" },
  openGraph: {
    title: "Projetos — William Moreli",
    description:
      "Sistemas corporativos, marketplaces, aplicativos e sites desenvolvidos para empresas no Brasil e em Angola.",
    url: "https://morelidev.com/projetos",
    type: "website",
  },
};

export default function ProjetosPage() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <ProjectsIndex />
      </main>
      <Footer />
      <ScrollReveals />
    </>
  );
}
