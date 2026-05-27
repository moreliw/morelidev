"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface Testimonial {
  id: string;
  author: string;
  role?: string | null;
  company?: string | null;
  text: string;
  textEn?: string | null;
}

const FALLBACK: Testimonial[] = [
  {
    id: "1",
    author: "Carlos Silva",
    role: "CEO",
    company: "Cipritex",
    text: "A Will Tech entregou exatamente o que precisávamos. O sistema ficou intuitivo, o prazo foi cumprido e o atendimento durante todo o projeto foi impecável.",
    textEn: "Will Tech delivered exactly what we needed. The system is intuitive, deadlines were met and communication throughout the project was impeccable.",
  },
  {
    id: "2",
    author: "Ana Ferreira",
    role: "Diretora de Marketing",
    company: "Mameri",
    text: "Profissionalismo e cuidado em cada detalhe. O resultado ficou muito além das nossas expectativas e a parceria continua até hoje.",
    textEn: "Professionalism and care in every detail. The result far exceeded our expectations and the partnership continues to this day.",
  },
  {
    id: "3",
    author: "Ricardo Mendes",
    role: "Sócio-fundador",
    company: "Takki.ao",
    text: "Entrega rápida, comunicação clara e atenção real ao que importa para o negócio. A Will Tech virou parte do nosso time.",
    textEn: "Fast delivery, clear communication and real focus on what matters to the business. Will Tech became part of our team.",
  },
];

const CLIENTS = [
  "Cipritex",
  "Takki.ao",
  "Saldo Casa",
  "Mameri",
  "Padel App",
  "Will Market",
  "Atlas Studio",
  "Casa Vitória",
];

export function Testimonials() {
  const { language } = useLanguage();
  const [items, setItems] = useState<Testimonial[]>(FALLBACK);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetch("/api/admin/testimonials")
      .then((r) => r.json())
      .then((data: Testimonial[]) => {
        if (Array.isArray(data) && data.length) setItems(data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDirection("right");
      setCurrent((c) => (c + 1) % items.length);
    }, 6500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [items.length]);

  function go(idx: number) {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDirection(idx > current ? "right" : "left");
    setCurrent(idx);
  }

  const labels =
    language === "pt"
      ? {
          eyebrow: "Clientes",
          headline: "Empresas e marcas que crescem com a Will Tech.",
          testimonialsLabel: "Depoimentos",
        }
      : {
          eyebrow: "Clients",
          headline: "Brands and companies growing with Will Tech.",
          testimonialsLabel: "Testimonials",
        };

  const item = items[current];
  if (!item) return null;
  const text = language === "pt" ? item.text : item.textEn ?? item.text;

  const variants = {
    enter: (dir: string) => ({ x: dir === "right" ? 24 : -24, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: string) => ({ x: dir === "right" ? -24 : 24, opacity: 0 }),
  };

  return (
    <section id="clients" className="relative py-24 lg:py-36 bg-[color:var(--bg)]">
      <div
        className="relative mx-auto px-6 lg:px-10"
        style={{ maxWidth: "var(--max)" }}
      >
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-16">
          <div className="lg:col-span-3">
            <span className="eyebrow">{labels.eyebrow}</span>
            <p className="mt-6 text-xs font-mono tracking-widest text-[color:var(--muted-2)]">
              05 / 06
            </p>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-9 display text-[clamp(1.7rem,3.5vw,2.8rem)] max-w-3xl"
          >
            {labels.headline}
          </motion.h2>
        </div>

        {/* Client marquee */}
        <div className="relative -mx-6 lg:-mx-10 mb-20 overflow-hidden border-y border-[color:var(--hairline)] py-7 bg-[color:var(--bg-elevated)]">
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
            style={{ background: "linear-gradient(90deg, var(--bg-elevated), transparent)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
            style={{ background: "linear-gradient(-90deg, var(--bg-elevated), transparent)" }}
          />
          <div className="marquee gap-16 px-6">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <span
                key={`${c}-${i}`}
                className="font-serif text-2xl lg:text-[1.7rem] tracking-tight whitespace-nowrap text-[color:var(--muted-2)] hover:text-[color:var(--ink)] transition-colors"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-3">
            <span className="eyebrow">{labels.testimonialsLabel}</span>
          </div>
          <div className="lg:col-span-9">
            <div className="relative min-h-[260px]">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={item.id}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <p className="font-serif italic text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.4] text-[color:var(--ink)] max-w-3xl">
                    <span className="text-[color:var(--accent)]">“</span>
                    {text}
                    <span className="text-[color:var(--accent)]">”</span>
                  </p>
                  <div className="mt-8 flex items-center gap-4">
                    <div className="inline-flex items-center justify-center size-10 rounded-full bg-[color:var(--ink)] text-[color:var(--bg)] font-serif text-base">
                      {item.author
                        .split(" ")
                        .slice(0, 2)
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[color:var(--ink)]">
                        {item.author}
                      </p>
                      {(item.role || item.company) && (
                        <p className="text-xs text-[color:var(--muted)] mt-0.5">
                          {[item.role, item.company].filter(Boolean).join(" · ")}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination */}
            <div className="mt-10 flex items-center gap-3">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Depoimento ${i + 1}`}
                  className={
                    "h-px transition-all duration-500 " +
                    (i === current
                      ? "w-12 bg-[color:var(--ink)]"
                      : "w-6 bg-[color:var(--muted-2)] hover:bg-[color:var(--ink-soft)]")
                  }
                />
              ))}
              <span className="ml-3 font-mono text-[11px] tracking-widest text-[color:var(--muted-2)]">
                {String(current + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
