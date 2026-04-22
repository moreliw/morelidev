import { prisma } from "@/lib/prisma";
import { MarkReadButton } from "@/components/admin/MarkReadButton";

export default async function AdminMessages() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Mensagens</h1>

      {messages.length === 0 ? (
        <p className="text-white/30 text-sm">Nenhuma mensagem ainda.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-white/5 border rounded-xl p-5 ${msg.read ? "border-white/5" : "border-green-400/30"}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {!msg.read && (
                      <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                    )}
                    <p className="text-sm font-bold text-white">{msg.name}</p>
                    <span className="text-white/30 text-xs">·</span>
                    <a href={`mailto:${msg.email}`} className="text-xs text-white/40 hover:text-white transition-colors">
                      {msg.email}
                    </a>
                    {msg.phone && (
                      <>
                        <span className="text-white/30 text-xs">·</span>
                        <a href={`tel:${msg.phone}`} className="text-xs text-white/40 hover:text-white transition-colors">
                          {msg.phone}
                        </a>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">{msg.message}</p>
                  <p className="text-xs text-white/30 mt-2">
                    {new Date(msg.createdAt).toLocaleString("pt-BR")}
                  </p>
                </div>
                <MarkReadButton id={msg.id} read={msg.read} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
