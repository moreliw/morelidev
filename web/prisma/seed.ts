import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const hashedPw = await bcrypt.hash("admin123", 12);
  await prisma.adminUser.upsert({
    where: { email: "admin@morelidev.com" },
    update: {},
    create: { email: "admin@morelidev.com", password: hashedPw },
  });

  // Default projects
  const projects = [
    {
      title: "Empresa Capixaba",
      titleEn: "Empresa Capixaba",
      description: "Sistema de gestão completo para empresa de logística capixaba.",
      descriptionEn: "Complete management system for a logistics company.",
      type: "Sistema de gestão",
      typeEn: "Management system",
      tags: JSON.stringify(["Laravel", "Blade", "MySQL"]),
      imageUrl: "/projetos/empresa-capixaba.png",
      order: 1,
    },
    {
      title: "Takki.ao",
      titleEn: "Takki.ao",
      description: "Marketplace de moda angolano com experiência mobile-first.",
      descriptionEn: "Angolan fashion marketplace with mobile-first experience.",
      type: "Marketplace",
      typeEn: "Marketplace",
      tags: JSON.stringify(["React", "UX"]),
      imageUrl: "/projetos/takki.png",
      order: 2,
    },
    {
      title: "Site Institucional",
      titleEn: "Institutional Website",
      description: "Site institucional com design moderno e foco em conversão.",
      descriptionEn: "Institutional website with modern design and conversion focus.",
      type: "Design",
      typeEn: "Design",
      tags: JSON.stringify(["UI/UX", "Brand"]),
      order: 3,
    },
    {
      title: "Dashboard Analytics",
      titleEn: "Analytics Dashboard",
      description: "Dashboard de dados com visualizações interativas e relatórios.",
      descriptionEn: "Data dashboard with interactive visualizations and reports.",
      type: "Dashboards",
      typeEn: "Dashboards",
      tags: JSON.stringify(["React", "Data", "UX"]),
      order: 4,
    },
    {
      title: "E-commerce B2B",
      titleEn: "B2B E-commerce",
      description: "Plataforma B2B com checkout customizado e integração ERP.",
      descriptionEn: "B2B platform with custom checkout and ERP integration.",
      type: "E-commerce",
      typeEn: "E-commerce",
      tags: JSON.stringify(["B2B", "Checkout", "Angular"]),
      order: 5,
    },
    {
      title: "Sistema de Gestão",
      titleEn: "Management System",
      description: "ERP personalizado para pequenas e médias empresas.",
      descriptionEn: "Custom ERP for small and medium businesses.",
      type: "Sistema",
      typeEn: "System",
      tags: JSON.stringify(["Laravel", "PHP", ".NET"]),
      order: 6,
    },
  ];

  for (const p of projects) {
    await prisma.project.upsert({
      where: { id: p.title },
      update: p,
      create: { ...p, id: p.title.toLowerCase().replace(/\s+/g, "-") },
    });
  }

  // Default site content
  const content = [
    { key: "hero.hi.pt", value: "Olá, eu sou" },
    { key: "hero.hi.en", value: "Hi, I am" },
    { key: "hero.name", value: "William Moreli" },
    { key: "hero.headline.pt", value: "Software Engineer | Full Stack Developer" },
    { key: "hero.headline.en", value: "Software Engineer | Full Stack Developer" },
    { key: "hero.desc.pt", value: "Construo aplicações web escaláveis com .NET, Angular, React e arquiteturas modernas." },
    { key: "hero.desc.en", value: "Building scalable web applications with .NET, Angular, React and modern architectures." },
    { key: "contact.email", value: "contato@morelidev.com" },
    { key: "contact.whatsapp", value: "https://wa.me/5527999999999" },
    { key: "social.linkedin", value: "https://www.linkedin.com/in/william-moreli" },
    { key: "social.github", value: "https://github.com/moreliw" },
  ];

  for (const c of content) {
    await prisma.siteContent.upsert({
      where: { key: c.key },
      update: { value: c.value },
      create: c,
    });
  }

  // Default testimonials
  await prisma.testimonial.upsert({
    where: { id: "t1" },
    update: {},
    create: {
      id: "t1",
      author: "Carlos Silva",
      role: "CEO",
      company: "Empresa Capixaba",
      text: "William entregou exatamente o que precisávamos. O sistema ficou intuitivo e o prazo foi cumprido.",
      textEn: "William delivered exactly what we needed. The system is intuitive and deadlines were met.",
      order: 1,
    },
  });

  console.log("Seed completed.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
