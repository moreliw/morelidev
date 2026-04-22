import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { DeleteProjectButton } from "@/components/admin/DeleteProjectButton";

export default async function AdminProjects() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Projetos</h1>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 bg-white text-black text-sm font-bold px-4 py-2 rounded-lg hover:bg-white/90 transition-colors"
        >
          <Plus className="size-4" />
          Novo projeto
        </Link>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        {projects.length === 0 ? (
          <p className="text-white/30 text-sm p-6">Nenhum projeto ainda.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-xs text-white/40 uppercase tracking-wider p-4">Ordem</th>
                <th className="text-left text-xs text-white/40 uppercase tracking-wider p-4">Título</th>
                <th className="text-left text-xs text-white/40 uppercase tracking-wider p-4 hidden sm:table-cell">Tipo</th>
                <th className="text-left text-xs text-white/40 uppercase tracking-wider p-4 hidden md:table-cell">Tags</th>
                <th className="text-left text-xs text-white/40 uppercase tracking-wider p-4">Status</th>
                <th className="text-right text-xs text-white/40 uppercase tracking-wider p-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => {
                let tags: string[] = [];
                try { tags = JSON.parse(p.tags); } catch { tags = []; }
                return (
                  <tr key={p.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                    <td className="p-4 text-white/40 text-sm">{p.order}</td>
                    <td className="p-4">
                      <p className="text-sm font-medium text-white">{p.title}</p>
                      {p.description && (
                        <p className="text-xs text-white/40 truncate max-w-xs">{p.description}</p>
                      )}
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <span className="text-xs text-white/60">{p.type ?? "—"}</span>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {tags.map((t) => (
                          <span key={t} className="text-xs bg-white/10 text-white/70 px-2 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      {p.published ? (
                        <span className="flex items-center gap-1 text-xs text-green-400">
                          <Eye className="size-3" /> Publicado
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-white/30">
                          <EyeOff className="size-3" /> Oculto
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/projects/${p.id}/edit`}
                          className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <Pencil className="size-4" />
                        </Link>
                        <DeleteProjectButton id={p.id} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
