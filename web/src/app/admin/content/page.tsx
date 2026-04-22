import { prisma } from "@/lib/prisma";
import { ContentEditor } from "@/components/admin/ContentEditor";

export default async function AdminContent() {
  const items = await prisma.siteContent.findMany();
  const content: Record<string, string> = {};
  for (const item of items) content[item.key] = item.value;

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Conteúdo do Site</h1>
      <p className="text-sm text-white/40 mb-8">Edite os textos principais exibidos no site.</p>
      <ContentEditor initial={content} />
    </div>
  );
}
