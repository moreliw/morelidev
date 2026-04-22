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
    data: { email: "admin@morelidev.com", password: hash },
  });

  const projects = [
    { id: "empresa-capixaba", title: "Empresa Capixaba", titleEn: "Empresa Capixaba", type: "Sistema de gestão", typeEn: "Management system", tags: JSON.stringify(["Laravel","Blade","MySQL"]), imageUrl: "/projetos/empresa-capixaba.png", order: 1 },
    { id: "takki", title: "Takki.ao", titleEn: "Takki.ao", type: "Marketplace", typeEn: "Marketplace", tags: JSON.stringify(["React","UX"]), imageUrl: "/projetos/takki.png", order: 2 },
    { id: "site-inst", title: "Site Institucional", titleEn: "Institutional Website", type: "Design", typeEn: "Design", tags: JSON.stringify(["UI/UX","Brand"]), order: 3 },
    { id: "dashboard", title: "Dashboard Analytics", titleEn: "Analytics Dashboard", type: "Dashboard", typeEn: "Dashboard", tags: JSON.stringify(["React","Data"]), order: 4 },
    { id: "ecom-b2b", title: "E-commerce B2B", titleEn: "B2B E-commerce", type: "E-commerce", typeEn: "E-commerce", tags: JSON.stringify(["Angular","B2B"]), order: 5 },
    { id: "sistema", title: "Sistema de Gestão", titleEn: "Management System", type: "Sistema", typeEn: "System", tags: JSON.stringify(["Laravel","PHP"]), order: 6 },
  ];
  for (const p of projects) {
    await prisma.project.upsert({ where: { id: p.id }, update: {}, create: p });
  }

  const content = [
    { key: "hero.name", value: "William Moreli" },
    { key: "contact.email", value: "contato@morelidev.com" },
    { key: "social.linkedin", value: "https://www.linkedin.com/in/william-moreli" },
    { key: "social.github", value: "https://github.com/moreliw" },
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
      company: "Empresa Capixaba",
      text: "William entregou exatamente o que precisávamos. O sistema ficou intuitivo e o prazo foi cumprido.",
      textEn: "William delivered exactly what we needed. Intuitive system, on-time delivery.",
      order: 1,
    },
  });

  return NextResponse.json({ ok: true, message: "Database seeded. Login: admin@morelidev.com / admin123" });
}
