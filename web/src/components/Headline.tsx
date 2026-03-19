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
      <div className="card rounded-2xl p-6 lg:p-8">
        <h3 className="font-display text-xl font-semibold text-zinc-100">
          {copy.headline}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-zinc-400">
          {copy.desc}
        </p>
      </div>
    </Section>
  );
}
