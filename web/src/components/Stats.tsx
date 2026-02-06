"use client";
import { Section } from "./Section";
import { Award, Briefcase, Gauge, ThumbsUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Stats() {
  const { language } = useLanguage();
  const stats =
    language === "pt"
      ? [
          { icon: ThumbsUp, label: "Satisfação", value: "98%" },
          { icon: Briefcase, label: "Projetos", value: "40+" },
          { icon: Award, label: "Experiência", value: "8+" },
          { icon: Gauge, label: "Performance", value: "90+" },
        ]
      : [
          { icon: ThumbsUp, label: "Satisfaction", value: "98%" },
          { icon: Briefcase, label: "Projects", value: "40+" },
          { icon: Award, label: "Experience", value: "8+" },
          { icon: Gauge, label: "Performance", value: "90+" },
        ];

  return (
    <Section className="py-12">
      <div className="grid sm:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="card rounded-xl p-6 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-[var(--accent)]/90 text-black flex items-center justify-center">
              <s.icon className="size-5" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-zinc-100 leading-none">{s.value}</p>
              <p className="text-xs text-zinc-400 mt-2">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
