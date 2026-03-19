"use client";
import { Section } from "./Section";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const usingNow = [
  "HTML5",
  "CSS3",
  "TypeScript",
  "Angular",
  "React",
  "Node.js",
  "Git",
  ".NET",
];

const learning = ["MySQL", "MongoDB", "AWS", "Docker"];

function TechGrid({
  items,
  label,
}: {
  items: string[];
  label: string;
}) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-widest text-black mb-6">
        {label}
      </h3>
      <div className="grid grid-cols-4 gap-6">
        {items.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="h-14 w-14 rounded-lg bg-[#e5e5e5] flex items-center justify-center text-black font-bold text-xs">
              {item.slice(0, 2)}
            </div>
            <span className="text-xs uppercase tracking-wider text-[#6b6b6b]">
              {item}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function Stack() {
  const { language } = useLanguage();
  const labels =
    language === "pt"
      ? { title: "Skills", usingNow: "Usando agora:", learning: "Aprendendo:" }
      : { title: "Skills", usingNow: "Using now:", learning: "Learning:" };

  return (
    <Section id="stack" title={labels.title.toUpperCase()}>
      <div className="section-divider">
        <span>///</span>
      </div>
      <div className="space-y-16 mt-12">
        <TechGrid items={usingNow} label={labels.usingNow} />
        <TechGrid items={learning} label={labels.learning} />
      </div>
    </Section>
  );
}
