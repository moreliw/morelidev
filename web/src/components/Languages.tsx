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
          englishLevel: "Intermediário (em evolução para entrevistas técnicas internacionais)",
          native: "Nativo",
        }
      : {
          title: "Languages",
          portuguese: "Portuguese",
          english: "English",
          englishLevel: "Intermediate (progressing to international technical interviews)",
          native: "Native",
        };

  return (
    <Section id="languages" title={copy.title}>
      <div className="card rounded-xl p-6">
        <div className="mt-2 grid gap-2 text-sm text-zinc-300">
          <div>
            <span className="text-zinc-500">{copy.portuguese}:</span> {copy.native}
          </div>
          <div>
            <span className="text-zinc-500">{copy.english}:</span> {copy.englishLevel}
          </div>
        </div>
      </div>
    </Section>
  );
}
