"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const items = [
  {
    title: "Empresa Capixaba",
    image: "/projetos/empresa-capixaba.png",
    type: { pt: "Sistema de gestão", en: "Management system" },
    tags: ["Laravel", "Blade", "MySQL"],
  },
  {
    title: "Takki.ao",
    image: "/projetos/takki.png",
    type: { pt: "Marketplace", en: "Marketplace" },
    tags: ["React", "UX"],
  },
  {
    title: "Site Institucional",
    image: null,
    type: { pt: "Design", en: "Design" },
    tags: ["UI/UX", "Brand"],
  },
  {
    title: "Dashboard",
    image: null,
    type: { pt: "Dashboards", en: "Dashboards" },
    tags: ["Data", "UX"],
  },
  {
    title: "E-commerce B2B",
    image: null,
    type: { pt: "E-commerce", en: "E-commerce" },
    tags: ["B2B", "Checkout"],
  },
  {
    title: "Sistema de Gestão",
    image: null,
    type: { pt: "Sistema", en: "System" },
    tags: ["Laravel", "PHP"],
  },
];

export function Portfolio() {
  const { language } = useLanguage();
  const title =
    language === "pt" ? "Portfólio" : "Portfolio";
  const filterAll = language === "pt" ? "Todos" : "All";
  const filterCoded = language === "pt" ? "Código" : "Coded";
  const filterDesign = language === "pt" ? "Design" : "Designed";
  const more = language === "pt" ? "E mais por vir" : "And many more to come!";

  return (
    <section id="portfolio" className="relative">
      {/* Full-width header area */}
      <div className="relative h-48 lg:h-64 bg-[#1a1a1a] flex items-center justify-center">
        <h2 className="section-header bg-transparent border-white text-white">
          {title.toUpperCase()}
        </h2>
      </div>
      {/* Filter bar */}
      <div className="bg-black flex justify-center gap-8 py-4 text-xs font-medium uppercase tracking-wider text-white">
        <a href="#" className="border-b-2 border-white pb-1">{filterAll}</a>
        <a href="#" className="hover:underline">{filterCoded}</a>
        <a href="#" className="hover:underline">{filterDesign}</a>
      </div>
      {/* Grid — no gutters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <motion.article
            key={it.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group relative aspect-[4/3] overflow-hidden bg-[#0a0a0a]"
          >
            {it.image ? (
              <Image
                src={it.image}
                alt={it.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]" />
            )}
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
              <p className="text-xs italic text-white/80">
                {language === "pt" ? it.type.pt : it.type.en}
              </p>
              <h3 className="text-xl font-bold text-white mt-1">{it.title}</h3>
              <div className="flex gap-4 mt-4 text-xs font-bold uppercase tracking-wider text-white">
                <a href="#" className="hover:underline">Demo</a>
                <span className="text-white/50">|</span>
                <a href="#" className="hover:underline">More</a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
      <div className="bg-black py-8 text-center text-sm text-white/80">
        {more}
      </div>
    </section>
  );
}
