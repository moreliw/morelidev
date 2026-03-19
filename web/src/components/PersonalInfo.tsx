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
      <div className="card rounded-2xl p-6 lg:p-8">
        <div className="grid gap-4 text-sm text-zinc-300 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="text-zinc-500">{labels.name}:</span>{" "}
            <span className="font-medium text-zinc-100">{info.name}</span>
          </div>
          <div>
            <span className="text-zinc-500">{labels.location}:</span>{" "}
            {info.location}
          </div>
          <div>
            <span className="text-zinc-500">{labels.role}:</span> {info.role}
          </div>
          <div>
            <span className="text-zinc-500">{labels.linkedin}:</span>{" "}
            <a
              href="https://www.linkedin.com/in/william-moreli"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              {info.linkedin}
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
