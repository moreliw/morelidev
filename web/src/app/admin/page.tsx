import { prisma } from "@/lib/prisma";
import { FolderKanban, MessageSquare, Eye, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const [projects, messages, unread] = await Promise.all([
    prisma.project.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { read: false } }),
  ]);

  const recentMessages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const stats = [
    { label: "Projetos", value: projects, icon: FolderKanban, href: "/admin/projects" },
    { label: "Mensagens", value: messages, icon: MessageSquare, href: "/admin/messages" },
    { label: "Não lidas", value: unread, icon: Eye, href: "/admin/messages" },
    { label: "Publicados", value: projects, icon: TrendingUp, href: "/admin/projects" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors"
          >
            <s.icon className="size-5 text-white/40 mb-3" />
            <p className="text-3xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-white/40 mt-1 uppercase tracking-wider">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Mensagens Recentes
          </h2>
          <Link href="/admin/messages" className="text-xs text-white/40 hover:text-white transition-colors">
            Ver todas →
          </Link>
        </div>

        {recentMessages.length === 0 ? (
          <p className="text-white/30 text-sm">Nenhuma mensagem ainda.</p>
        ) : (
          <div className="space-y-3">
            {recentMessages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${msg.read ? "bg-white/20" : "bg-green-400"}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white truncate">{msg.name}</p>
                  <p className="text-xs text-white/40 truncate">{msg.email}</p>
                  <p className="text-xs text-white/60 mt-1 truncate">{msg.message}</p>
                </div>
                <p className="text-xs text-white/30 shrink-0">
                  {new Date(msg.createdAt).toLocaleDateString("pt-BR")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
