"use client";
import { useEffect, useRef, useState } from "react";
import { Section } from "./Section";
import { motion, useInView } from "framer-motion";
import { Award, Briefcase, Gauge, ThumbsUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

function useCounter(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const steps = 40;
    const step = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  suffix: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useCounter(value, 1200, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="p-6 border border-[#e5e5e5] bg-white text-center flex flex-col items-center gap-3 hover:border-black hover:shadow-[4px_4px_0_0_#000] transition-all duration-200"
    >
      <Icon className="size-8 text-black" strokeWidth={1.5} />
      <p className="text-3xl font-extrabold text-black tabular-nums">
        {count}{suffix}
      </p>
      <p className="mt-1 text-xs font-medium uppercase tracking-widest text-[#6b6b6b]">
        {label}
      </p>
    </motion.div>
  );
}

export function Stats() {
  const { language } = useLanguage();
  const stats =
    language === "pt"
      ? [
          { icon: ThumbsUp, label: "Satisfação", value: 98, suffix: "%" },
          { icon: Briefcase, label: "Projetos", value: 40, suffix: "+" },
          { icon: Award, label: "Anos de exp.", value: 8, suffix: "+" },
          { icon: Gauge, label: "Performance", value: 90, suffix: "+" },
        ]
      : [
          { icon: ThumbsUp, label: "Satisfaction", value: 98, suffix: "%" },
          { icon: Briefcase, label: "Projects", value: 40, suffix: "+" },
          { icon: Award, label: "Years exp.", value: 8, suffix: "+" },
          { icon: Gauge, label: "Performance", value: 90, suffix: "+" },
        ];

  return (
    <Section className="py-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} delay={i * 0.1} />
        ))}
      </div>
    </Section>
  );
}
