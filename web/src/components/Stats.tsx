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
    <Section className="py-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="p-6 border border-[#e5e5e5] bg-white text-center flex flex-col items-center gap-3"
          >
            <s.icon className="size-8 text-black" strokeWidth={2} />
            <p className="text-2xl font-bold text-black">{s.value}</p>
            <p className="mt-2 text-xs font-medium uppercase tracking-wider text-[#6b6b6b]">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
