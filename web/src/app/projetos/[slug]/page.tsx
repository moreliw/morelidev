import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProjectCase } from "@/components/site/ProjectCase";
import { ScrollReveals } from "@/components/site/ScrollReveals";
import { PROJECTS, getProject } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.title} — ${project.category.pt}`;
  const description = project.shortDesc.pt;
  const url = `https://morelidev.com/projetos/${project.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [{ url: `https://morelidev.com${project.poster}` }],
    },
  };
}

export default async function ProjetoPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: "https://morelidev.com" },
      { "@type": "ListItem", position: 2, name: "Projetos", item: "https://morelidev.com/projetos" },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `https://morelidev.com/projetos/${project.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main id="conteudo">
        <ProjectCase project={project} />
      </main>
      <Footer />
      <ScrollReveals />
    </>
  );
}
