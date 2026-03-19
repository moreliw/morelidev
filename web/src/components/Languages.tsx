"use client";
import { Section } from "./Section";
import { useLanguage } from "@/context/LanguageContext";

export function Languages() {
  const { language } = useLanguage();
  const copy =
    language === "pt"
      ? {
          title: "Idiomas",
          portuguese: "Português",
          english: "Inglês",
          englishLevel:
            "Intermediário (em evolução para entrevistas técnicas internacionais)",
          native: "Nativo",
        }
      : {
          title: "Languages",
          portuguese: "Portuguese",
          english: "English",
          englishLevel:
            "Intermediate (progressing to international technical interviews)",
          native: "Native",
        };

  return (
    <Section id="languages" title={copy.title}>
      <div className="card rounded-2xl p-6 lg:p-8">
        <div className="grid gap-4 text-sm text-zinc-300 sm:grid-cols-2">
          <div>
            <span className="text-zinc-500">{copy.portuguese}:</span>{" "}
            <span className="font-medium text-zinc-100">{copy.native}</span>
          </div>
          <div>
            <span className="text-zinc-500">{copy.english}:</span>{" "}
            {copy.englishLevel}
          </div>
        </div>
      </div>
    </Section>
  );
}
