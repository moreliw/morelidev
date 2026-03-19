"use client";
import { Section } from "./Section";
import { useLanguage } from "@/context/LanguageContext";

const info = {
  name: "William Moreli",
  location: "Brasil",
  role: "Software Engineer",
  linkedin: "linkedin.com/in/william-moreli",
};

export function PersonalInfo() {
  const { language } = useLanguage();
  const labels =
    language === "pt"
      ? {
          title: "Informações pessoais",
          name: "Nome",
          location: "Localização",
          role: "Cargo atual",
          linkedin: "LinkedIn",
        }
      : {
          title: "Personal info",
          name: "Name",
          location: "Location",
          role: "Current role",
          linkedin: "LinkedIn",
        };

  return (
    <Section id="info" title={labels.title.toUpperCase()}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
        <div className="p-4 border border-[#e5e5e5] bg-white">
          <span className="text-xs font-medium uppercase tracking-wider text-[#6b6b6b]">
            {labels.name}:
          </span>{" "}
          <span className="font-semibold text-black">{info.name}</span>
        </div>
        <div className="p-4 border border-[#e5e5e5] bg-white">
          <span className="text-xs font-medium uppercase tracking-wider text-[#6b6b6b]">
            {labels.location}:
          </span>{" "}
          {info.location}
        </div>
        <div className="p-4 border border-[#e5e5e5] bg-white">
          <span className="text-xs font-medium uppercase tracking-wider text-[#6b6b6b]">
            {labels.role}:
          </span>{" "}
          {info.role}
        </div>
        <div className="p-4 border border-[#e5e5e5] bg-white">
          <span className="text-xs font-medium uppercase tracking-wider text-[#6b6b6b]">
            {labels.linkedin}:
          </span>{" "}
          <a
            href="https://www.linkedin.com/in/william-moreli"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black font-medium hover:underline"
          >
            {info.linkedin}
          </a>
        </div>
      </div>
    </Section>
  );
}
