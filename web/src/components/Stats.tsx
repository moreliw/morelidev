"use client";
import { Section } from "./Section";
import { motion } from "framer-motion";
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
    <Section className="py-16 lg:py-20">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="card flex items-center gap-5 rounded-2xl p-6"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/90 to-accent-dark text-zinc-950 shadow-[0_4px_14px_-2px_rgba(249,115,22,0.25)]">
              <s.icon className="size-6" strokeWidth={2} />
            </div>
            <div>
              <p className="font-display text-2xl font-bold leading-none text-zinc-100">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-zinc-500">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
