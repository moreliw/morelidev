import { ProjectForm } from "@/components/admin/ProjectForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function NewProject() {
  return (
    <div>
      <Link href="/admin/projects" className="flex items-center gap-1 text-white/40 hover:text-white text-sm mb-6 transition-colors">
        <ChevronLeft className="size-4" /> Voltar
      </Link>
      <h1 className="text-2xl font-bold text-white mb-8">Novo Projeto</h1>
      <ProjectForm mode="create" />
    </div>
  );
}
