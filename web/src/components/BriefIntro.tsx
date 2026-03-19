"use client";
import { useLanguage } from "@/context/LanguageContext";

export function BriefIntro() {
  const { language } = useLanguage();
  const text =
    language === "pt"
      ? "Engenharia de software, design e performance. Foco em aplicações web escaláveis com .NET, Angular e React."
      : "Software engineering, design and performance. Focus on scalable web applications with .NET, Angular and React.";

  return (
    <section className="bg-black py-16 lg:py-20">
      <p className="mx-auto max-w-2xl px-6 text-center text-sm leading-relaxed text-white/90">
        {text}
      </p>
    </section>
  );
}
