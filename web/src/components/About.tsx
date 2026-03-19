"use client";
import { PenTool, Code2, Settings2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Section } from "./Section";

export function About() {
  const { language } = useLanguage();
  const copy =
    language === "pt"
      ? {
          title: "Sobre mim",
          text: "Full Stack Software Engineer com mais de 5 anos de experiência em aplicações web escaláveis, seguras e de alta performance. Especialista em .NET, Angular e React, com foco em clean code, performance e manutenibilidade.",
          design: "Design",
          designDesc: "Interfaces elegantes, UI/UX para conversão e identidade visual consistente.",
          development: "Desenvolvimento",
          developmentDesc: "Frontend performático, backend escalável e integração com APIs e bancos de dados.",
          maintenance: "Manutenção",
          maintenanceDesc: "Ajustes rápidos, monitoramento contínuo e evolução constante dos sistemas.",
          explore: "Explorar",
        }
      : {
          title: "About me",
          text: "Full Stack Software Engineer with over 5 years of experience building scalable, secure, high-performance web applications. Specialist in .NET, Angular and React, focused on clean code, performance and maintainability.",
          design: "Design",
          designDesc: "Elegant interfaces, conversion-focused UI/UX and consistent visual identity.",
          development: "Development",
          developmentDesc: "High-performance frontend, scalable backend and API/database integration.",
          maintenance: "Maintenance",
          maintenanceDesc: "Fast fixes, continuous monitoring and constant system evolution.",
          explore: "Explore",
        };

  const pillars = [
    {
      icon: PenTool,
      title: copy.design,
      desc: copy.designDesc,
    },
    {
      icon: Code2,
      title: copy.development,
      desc: copy.developmentDesc,
    },
    {
      icon: Settings2,
      title: copy.maintenance,
      desc: copy.maintenanceDesc,
    },
  ];

  return (
    <Section id="about" title={copy.title.toUpperCase()}>
      <p className="text-center text-sm text-[#6b6b6b] leading-relaxed max-w-2xl mx-auto">
        {copy.text}
      </p>
      <div className="section-divider">
        <span>///</span>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-12">
        {pillars.map((p) => (
          <div key={p.title} className="relative text-center">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p.icon className="size-24 text-[#e5e5e5]" strokeWidth={1} />
            </div>
            <h3 className="relative text-sm font-bold uppercase tracking-wider text-black mb-3">
              {p.title}
            </h3>
            <p className="relative text-xs text-[#6b6b6b] leading-relaxed">
              {p.desc}
            </p>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <a href="#portfolio" className="link-pipe">
          {copy.explore}
        </a>
      </div>
    </Section>
  );
}
