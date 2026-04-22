import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/components/admin/ProjectForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditProject({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  let tags: string[] = [];
  try { tags = JSON.parse(project.tags); } catch { tags = []; }

  return (
    <div>
      <Link href="/admin/projects" className="flex items-center gap-1 text-white/40 hover:text-white text-sm mb-6 transition-colors">
        <ChevronLeft className="size-4" /> Voltar
      </Link>
      <h1 className="text-2xl font-bold text-white mb-8">Editar Projeto</h1>
      <ProjectForm
        mode="edit"
        initial={{
          id: project.id,
          title: project.title,
          titleEn: project.titleEn ?? "",
          description: project.description ?? "",
          descriptionEn: project.descriptionEn ?? "",
          type: project.type ?? "",
          typeEn: project.typeEn ?? "",
          tags,
          imageUrl: project.imageUrl ?? "",
          demoUrl: project.demoUrl ?? "",
          repoUrl: project.repoUrl ?? "",
          order: project.order,
          published: project.published,
        }}
      />
    </div>
  );
}
