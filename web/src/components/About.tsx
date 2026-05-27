"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function About() {
  const { language } = useLanguage();
  const copy =
    language === "pt"
      ? {
          eyebrow: "Sobre a Will Tech",
          headline:
            "Somos um estúdio de software focado em entregar produtos digitais que funcionam, vendem e duram.",
          paragraphs: [
            "A Will Tech é um estúdio digital que une engenharia de software e design para criar soluções sob medida — sites institucionais, lojas virtuais, aplicativos e sistemas internos. Trabalhamos lado a lado com cada cliente, do briefing à evolução do produto, para garantir uma entrega clara, estável e alinhada ao negócio.",
            "Acreditamos que a tecnologia precisa servir ao resultado: gerar leads, vender mais, organizar a operação e elevar a percepção da marca. Por isso unimos estratégia, estética e robustez em cada projeto que assumimos.",
          ],
          pillars: [
            { label: "Parceria", text: "Atendimento próximo, sem intermediários." },
            { label: "Método", text: "Processo claro do briefing à entrega." },
            { label: "Resultado", text: "Foco em vendas, leads e operação." },
          ],
          cta: "Conversar com a Will Tech",
          credit: "—  Will Tech Studio",
        }
      : {
          eyebrow: "About Will Tech",
          headline:
            "We are a software studio focused on delivering digital products that work, sell and last.",
          paragraphs: [
            "Will Tech is a digital studio that blends software engineering and design to build tailored solutions — institutional sites, online stores, apps and internal systems. We work closely with every client, from the brief to long-term evolution, ensuring a clear, stable delivery aligned with the business.",
            "We believe technology must serve the outcome: generate leads, drive sales, streamline operations and elevate brand perception. That's why we combine strategy, craft and reliability in every project we take on.",
          ],
          pillars: [
            { label: "Partnership", text: "Close support, no middlemen." },
            { label: "Method", text: "Clear process from brief to launch." },
            { label: "Outcome", text: "Focused on sales, leads and operations." },
          ],
          cta: "Talk to Will Tech",
          credit: "—  Will Tech Studio",
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
                const w = word.toLowerCase();
                const isAccent =
                  w.includes("duram") ||
                  w.includes("vendem") ||
                  w.includes("last") ||
                  w.includes("sell");
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
