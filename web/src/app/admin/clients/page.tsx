import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { TestimonialsManager } from "@/components/admin/TestimonialsManager";

export default async function AdminClients() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Clientes & Depoimentos</h1>
      <p className="text-sm text-white/40 mb-8">Gerencie os depoimentos exibidos no site.</p>
      <TestimonialsManager initial={testimonials} />
    </div>
  );
}
