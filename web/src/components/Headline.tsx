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
          headline: "Full Stack Software Engineer",
          desc: "Building scalable web applications with .NET, Angular, React and modern architectures.",
        };

  return (
    <Section id="headline" title={copy.title}>
      <div className="card rounded-xl p-6">
        <h3 className="text-lg font-semibold text-zinc-100">{copy.headline}</h3>
        <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{copy.desc}</p>
      </div>
    </Section>
  );
}
