"use client";
import { Section } from "./Section";
import { useLanguage } from "@/context/LanguageContext";

export function Headline() {
  const { language } = useLanguage();
  const copy =
    language === "pt"
      ? {
          title: "Título profissional",
          headline: "Software Engineer | Full Stack Developer",
          desc: "Especialista em .NET, Angular, React, Node.js, ASP.NET Core e PHP.",
        }
      : {
          title: "Headline",
          headline: "Software Engineer | Full Stack Developer",
          desc: "Specialist in .NET, Angular, React, Node.js, ASP.NET Core and PHP.",
        };

  return (
    <Section id="headline" title={copy.title.toUpperCase()}>
      <div className="max-w-2xl mx-auto text-center p-6 border border-[#e5e5e5] bg-white">
        <h3 className="text-lg font-bold text-black">{copy.headline}</h3>
        <p className="mt-3 text-sm text-[#6b6b6b] leading-relaxed">
          {copy.desc}
        </p>
      </div>
    </Section>
  );
}
