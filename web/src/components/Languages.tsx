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
          englishLevel: "Intermediário",
          native: "Nativo",
        }
      : {
          title: "Languages",
          portuguese: "Portuguese",
          english: "English",
          englishLevel: "Intermediate",
          native: "Native",
        };

  return (
    <Section id="languages" title={copy.title.toUpperCase()}>
      <div className="max-w-xl mx-auto p-6 border border-[#e5e5e5] bg-white">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-[#6b6b6b]">
              {copy.portuguese}:
            </span>{" "}
            <span className="font-semibold text-black">{copy.native}</span>
          </div>
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-[#6b6b6b]">
              {copy.english}:
            </span>{" "}
            {copy.englishLevel}
          </div>
        </div>
      </div>
    </Section>
  );
}
