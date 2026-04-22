"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  id: string;
  title: string;
  titleEn?: string | null;
  description?: string | null;
  descriptionEn?: string | null;
  type?: string | null;
  typeEn?: string | null;
  tags: string;
  imageUrl?: string | null;
  demoUrl?: string | null;
  repoUrl?: string | null;
}

const STATIC_ITEMS: Project[] = [
  { id: "1", title: "Empresa Capixaba", type: "Sistema de gestão", typeEn: "Management system", tags: '["Laravel","Blade","MySQL"]', imageUrl: "/projetos/empresa-capixaba.png" },
  { id: "2", title: "Takki.ao", type: "Marketplace", typeEn: "Marketplace", tags: '["React","UX"]', imageUrl: "/projetos/takki.png" },
  { id: "3", title: "Site Institucional", type: "Design", typeEn: "Design", tags: '["UI/UX","Brand"]', imageUrl: null },
  { id: "4", title: "Dashboard Analytics", type: "Dashboard", typeEn: "Dashboard", tags: '["React","Data"]', imageUrl: null },
  { id: "5", title: "E-commerce B2B", type: "E-commerce", typeEn: "E-commerce", tags: '["Angular","B2B"]', imageUrl: null },
  { id: "6", title: "Sistema de Gestão", type: "Sistema", typeEn: "System", tags: '["Laravel","PHP"]', imageUrl: null },
];

export function Portfolio() {
  const { language } = useLanguage();
  const [items, setItems] = useState<Project[]>(STATIC_ITEMS);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data: Project[]) => { if (data.length) setItems(data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const tags = new Set<string>();
    for (const item of items) {
      try {
        (JSON.parse(item.tags) as string[]).forEach((t) => tags.add(t));
      } catch { /* noop */ }
    }
    setAllTags(Array.from(tags));
  }, [items]);

  const filtered =
    activeFilter === "all"
      ? items
      : items.filter((it) => {
          try { return (JSON.parse(it.tags) as string[]).includes(activeFilter); }
          catch { return false; }
        });

  const title = language === "pt" ? "Portfólio" : "Portfolio";
  const more = language === "pt" ? "E mais por vir" : "And many more to come!";
  const filterAll = language === "pt" ? "Todos" : "All";

  return (
    <section id="portfolio" className="relative">
      {/* Header */}
      <div className="relative h-48 lg:h-64 bg-[#1a1a1a] flex flex-col items-center justify-center gap-4">
        <h2 className="section-header bg-transparent border-white text-white">
          {title.toUpperCase()}
        </h2>
      </div>

      {/* Filter bar */}
      <div className="bg-black py-4 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setActiveFilter("all")}
            className={`text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full transition-all ${
              activeFilter === "all" ? "bg-white text-black" : "text-white/60 hover:text-white border border-white/20 hover:border-white/60"
            }`}
          >
            {filterAll}
          </button>
          {allTags.slice(0, 8).map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full transition-all ${
                activeFilter === tag ? "bg-white text-black" : "text-white/60 hover:text-white border border-white/20 hover:border-white/60"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((it, i) => {
            let tags: string[] = [];
            try { tags = JSON.parse(it.tags); } catch { tags = []; }
            const type = language === "pt" ? (it.type ?? "") : (it.typeEn ?? it.type ?? "");

            return (
              <motion.article
                key={it.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className="group relative aspect-[4/3] overflow-hidden bg-[#0a0a0a] cursor-pointer"
              >
                {it.imageUrl ? (
                  <Image
                    src={it.imageUrl}
                    alt={it.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#050505]">
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <span className="text-6xl font-extrabold text-white tracking-tighter">
                        {it.title.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-1">{type}</p>
                  <h3 className="text-xl font-bold text-white mb-2">{it.title}</h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tags.map((t) => (
                      <span key={t} className="text-xs bg-white/10 text-white/70 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    {it.demoUrl && (
                      <a
                        href={it.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white hover:text-white/70 transition-colors"
                      >
                        <ExternalLink className="size-3" /> Demo
                      </a>
                    )}
                    {it.repoUrl && (
                      <a
                        href={it.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white hover:text-white/70 transition-colors"
                      >
                        <Github className="size-3" /> Code
                      </a>
                    )}
                    {!it.demoUrl && !it.repoUrl && (
                      <span className="text-xs text-white/30">Em breve</span>
                    )}
                  </div>
                </div>

                {/* Number badge */}
                <div className="absolute top-3 left-3 text-xs font-mono text-white/20 group-hover:opacity-0 transition-opacity">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="bg-black py-8 text-center text-xs text-white/40 uppercase tracking-widest">
        {more}
      </div>
    </section>
  );
}
