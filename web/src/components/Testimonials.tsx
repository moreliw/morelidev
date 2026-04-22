"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
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
    company: "Empresa Capixaba",
    text: "William entregou exatamente o que precisávamos. O sistema ficou intuitivo e o prazo foi cumprido rigorosamente.",
    textEn: "William delivered exactly what we needed. The system is intuitive and deadlines were strictly met.",
  },
  {
    id: "2",
    author: "Ana Ferreira",
    role: "Diretora",
    company: "StartupBR",
    text: "Profissionalismo e qualidade técnica excepcionais. O site ficou muito além das nossas expectativas.",
    textEn: "Exceptional professionalism and technical quality. The site far exceeded our expectations.",
  },
  {
    id: "3",
    author: "Ricardo Mendes",
    role: "CTO",
    company: "Takki",
    text: "Entrega rápida, código limpo e comunicação impecável durante todo o projeto.",
    textEn: "Fast delivery, clean code, and impeccable communication throughout the project.",
  },
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
      .then((data: Testimonial[]) => { if (data.length) setItems(data); })
      .catch(() => {});
  }, []);

  function startAutoplay() {
    intervalRef.current = setInterval(() => {
      setDirection("right");
      setCurrent((c) => (c + 1) % items.length);
    }, 5000);
  }

  useEffect(() => {
    startAutoplay();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [items.length]);

  function go(dir: "left" | "right") {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDirection(dir);
    setCurrent((c) =>
      dir === "right" ? (c + 1) % items.length : (c - 1 + items.length) % items.length
    );
    startAutoplay();
  }

  const copy = language === "pt"
    ? { title: "Depoimentos", sub: "O que dizem os clientes" }
    : { title: "Testimonials", sub: "What clients say" };

  const item = items[current];
  const text = language === "pt" ? item.text : (item.textEn ?? item.text);

  const variants = {
    enter: (dir: string) => ({ x: dir === "right" ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: string) => ({ x: dir === "right" ? -80 : 80, opacity: 0 }),
  };

  return (
    <section id="testimonials" className="bg-black py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-14">
          <h2 className="section-header bg-transparent border-white text-white">
            {copy.title.toUpperCase()}
          </h2>
          <p className="mt-4 text-sm text-white/40 uppercase tracking-widest">{copy.sub}</p>
        </div>

        <div className="relative">
          <Quote className="absolute -top-4 -left-2 size-12 text-white/10 rotate-180" />

          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={item.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-center px-8 md:px-16"
            >
              <p className="text-lg md:text-xl text-white/80 leading-relaxed italic mb-8">
                &ldquo;{text}&rdquo;
              </p>
              <div>
                <p className="text-sm font-bold text-white">{item.author}</p>
                {(item.role || item.company) && (
                  <p className="text-xs text-white/40 mt-1">
                    {[item.role, item.company].filter(Boolean).join(" · ")}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <Quote className="absolute -bottom-4 -right-2 size-12 text-white/10" />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={() => go("left")}
            className="p-2 text-white/30 hover:text-white transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="size-5" />
          </button>

          <div className="flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? "right" : "left"); setCurrent(i); }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? "bg-white w-6" : "bg-white/30"}`}
              />
            ))}
          </div>

          <button
            onClick={() => go("right")}
            className="p-2 text-white/30 hover:text-white transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
