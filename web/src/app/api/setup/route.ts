import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST() {
  if (process.env.NODE_ENV === "production" && !process.env.ALLOW_SETUP) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const existing = await prisma.adminUser.count();
  if (existing > 0) {
    return NextResponse.json({ message: "Already seeded" });
  }

  const hash = await bcrypt.hash("admin123", 12);
  await prisma.adminUser.create({
    data: { email: "admin@willtech.com.br", password: hash },
  });

  const projects = [
    { id: "cipritex", title: "Cipritex", titleEn: "Cipritex", type: "Sistema corporativo", typeEn: "Corporate system", tags: JSON.stringify(["Gestão","Relatórios","Multi-usuário"]), order: 1 },
    { id: "takki", title: "Takki.ao", titleEn: "Takki.ao", type: "Marketplace", typeEn: "Marketplace", tags: JSON.stringify(["Vendas online","Catálogo","Experiência"]), imageUrl: "/projetos/takki.png", order: 2 },
    { id: "saldo-casa", title: "Saldo Casa", titleEn: "Saldo Casa", type: "Aplicativo financeiro", typeEn: "Finance app", tags: JSON.stringify(["Mobile","Dashboards","Controle"]), order: 3 },
    { id: "mameri", title: "Mameri", titleEn: "Mameri", type: "Site institucional", typeEn: "Institutional site", tags: JSON.stringify(["Branding","Conteúdo","SEO"]), order: 4 },
    { id: "padel", title: "Padel App", titleEn: "Padel App", type: "Aplicativo esportivo", typeEn: "Sports app", tags: JSON.stringify(["Reservas","Comunidade","Mobile"]), order: 5 },
    { id: "will-market", title: "Will Market", titleEn: "Will Market", type: "Loja online", typeEn: "Online store", tags: JSON.stringify(["E-commerce","Pagamentos","Painel"]), order: 6 },
  ];
  for (const p of projects) {
    await prisma.project.upsert({ where: { id: p.id }, update: {}, create: p });
  }

  const content = [
    { key: "hero.name", value: "Will Tech" },
    { key: "contact.email", value: "contato@willtech.com.br" },
    { key: "social.linkedin", value: "https://www.linkedin.com/company/will-tech" },
    { key: "social.instagram", value: "https://instagram.com/willtech" },
  ];
  for (const c of content) {
    await prisma.siteContent.upsert({ where: { key: c.key }, update: {}, create: c });
  }

  await prisma.testimonial.upsert({
    where: { id: "t1" },
    update: {},
    create: {
      id: "t1",
      author: "Carlos Silva",
      role: "CEO",
      company: "Cipritex",
      text: "A Will Tech entregou exatamente o que precisávamos. Sistema intuitivo, prazo cumprido e atendimento impecável.",
      textEn: "Will Tech delivered exactly what we needed. Intuitive system, on-time delivery and impeccable support.",
      order: 1,
    },
  });

  return NextResponse.json({ ok: true, message: "Database seeded. Login: admin@willtech.com.br / admin123" });
}
