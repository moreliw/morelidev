"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function About() {
  const { language } = useLanguage();
  const copy =
    language === "pt"
      ? {
          eyebrow: "Sobre",
          headline:
            "Software de qualidade nasce do equilíbrio entre arquitetura, performance e cuidado com o usuário.",
          paragraphs: [
            "Sou um Software Engineer Full Stack com mais de 5 anos de experiência projetando e construindo aplicações web escaláveis, seguras e elegantes. Trabalho lado a lado com empresas e empreendedores para transformar ideias em produtos digitais que funcionam — com clareza, confiabilidade e estética.",
            "Especialista em .NET, Angular e React, prezo por código limpo, performance de verdade e arquiteturas que envelhecem bem. Cada detalhe é pensado: do gesto na interface ao tempo de resposta da API.",
          ],
          pillars: [
            { label: "Foco", text: "Soluções pontuais, sem ruído." },
            { label: "Método", text: "Processo claro do briefing à entrega." },
            { label: "Detalhe", text: "Polimento em cada camada do produto." },
          ],
          cta: "Trabalhar comigo",
          credit: "—  William Moreli",
        }
      : {
          eyebrow: "About",
          headline:
            "Great software is born from the balance between architecture, performance and care for the user.",
          paragraphs: [
            "I'm a Full Stack Software Engineer with 5+ years of experience designing and building scalable, secure and elegant web applications. I partner with companies and founders to turn ideas into digital products that simply work — with clarity, reliability and craft.",
            "Specialist in .NET, Angular and React, I'm guided by clean code, real performance and architecture that ages well. Every detail matters — from the gesture in the interface to the response time of the API.",
          ],
          pillars: [
            { label: "Focus", text: "Sharp solutions, no noise." },
            { label: "Method", text: "Clear process from brief to launch." },
            { label: "Detail", text: "Polish in every layer of the product." },
          ],
          cta: "Work with me",
          credit: "—  William Moreli",
        };

  return (
    <section id="about" className="relative py-24 lg:py-36">
      <div
        className="relative mx-auto px-6 lg:px-10"
        style={{ maxWidth: "var(--max)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Sticky label */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-32"
            >
              <span className="eyebrow">{copy.eyebrow}</span>
              <p className="mt-6 text-xs font-mono tracking-widest text-[color:var(--muted-2)]">
                01 / 06
              </p>
            </motion.div>
          </div>

          {/* Main */}
          <div className="lg:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
              className="display text-[clamp(1.7rem,3.5vw,2.8rem)] max-w-3xl text-[color:var(--ink)]"
            >
              {copy.headline.split(" ").map((word, i) => {
                const isAccent =
                  word.toLowerCase().includes("cuidado") ||
                  word.toLowerCase().includes("care");
                return (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0.18 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.025 }}
                    className={isAccent ? "italic text-[color:var(--accent)]" : ""}
                  >
                    {word}{" "}
                  </motion.span>
                );
              })}
            </motion.h2>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
              {copy.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                  className="text-[15px] leading-[1.8] text-[color:var(--ink-soft)]"
                >
                  {p}
                </motion.p>
              ))}
            </div>

            <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-y-8 gap-x-8 border-t border-[color:var(--hairline)] pt-10">
              {copy.pillars.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <span className="font-serif text-2xl text-[color:var(--ink)]">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ink)]">
                    {p.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">
                    {p.text}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-12 flex items-center justify-between flex-wrap gap-4"
            >
              <a href="#contact" className="btn-ghost">
                {copy.cta} →
              </a>
              <span className="font-serif italic text-[color:var(--muted)]">
                {copy.credit}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
