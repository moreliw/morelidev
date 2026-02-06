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
    <Section id="info" title={labels.title}>
      <div className="card rounded-xl p-6">
        <div className="mt-2 grid gap-2 text-sm text-zinc-300">
          <div>
            <span className="text-zinc-500">{labels.name}:</span> {info.name}
          </div>
          <div>
            <span className="text-zinc-500">{labels.location}:</span> {info.location}
          </div>
          <div>
            <span className="text-zinc-500">{labels.role}:</span> {info.role}
          </div>
          <div>
            <span className="text-zinc-500">{labels.linkedin}:</span> {info.linkedin}
          </div>
        </div>
      </div>
    </Section>
  );
}
