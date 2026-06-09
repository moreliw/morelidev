"use client";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { MagneticLink } from "@/components/motion/MagneticButton";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

export function CTA() {
  const { language } = useLanguage();
  const reduced = useReducedMotion();
  const copy =
    language === "pt"
      ? {
          eyebrow: "Próximo passo",
          headline: "Vamos construir algo acima da média?",
          desc: "Me envie uma ideia, problema ou projeto. Eu te ajudo a transformar isso em uma solução digital profissional, escalável e pronta para crescer.",
          cta: "Solicitar orçamento",
          ghost: "Falar no WhatsApp",
        }
      : {
          eyebrow: "Next step",
          headline: "Let's build something above the bar?",
          desc: "Send me an idea, problem or project. I'll help you turn it into a professional, scalable digital solution ready to grow.",
          cta: "Request a quote",
          ghost: "Chat on WhatsApp",
        };

  return (
    <section className="relative py-28 lg:py-40 bg-[color:var(--bg-deep)] overflow-hidden">
      {/* Big glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        animate={
          reduced
            ? undefined
            : {
                opacity: [0.55, 0.8, 0.55],
                scale: [1, 1.06, 1],
              }
        }
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
      >
        <div
          className="h-[60vmax] w-[60vmax] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,147,255,0.20) 0%, rgba(124,147,255,0.06) 35%, transparent 65%)",
          }}
        />
      </motion.div>

      {/* Grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-bg grid-bg-fade opacity-40"
      />

      <div
        className="relative mx-auto px-6 lg:px-10 text-center"
        style={{ maxWidth: "900px" }}
      >
        <RevealOnScroll>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[10.5px] tracking-[0.22em] uppercase text-[color:var(--ink-soft)]">
            <Sparkles className="size-3 text-[color:var(--accent)]" />
            {copy.eyebrow}
          </span>
        </RevealOnScroll>

        <h2 className="mt-8 display text-[clamp(2.2rem,5.5vw,4.4rem)] text-[color:var(--ink)]">
          {copy.headline.split(" ").map((w, i) => (
            <motion.span
              key={i}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.8,
                delay: 0.1 + i * 0.05,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className={
                "inline-block mr-[0.22em] " +
                (w.toLowerCase().includes("acima") ||
                w.toLowerCase().includes("above")
                  ? "italic"
                  : "")
              }
              style={
                w.toLowerCase().includes("acima") ||
                w.toLowerCase().includes("above")
                  ? {
                      background:
                        "linear-gradient(120deg, var(--accent), var(--accent-2))",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }
                  : undefined
              }
            >
              {w}
            </motion.span>
          ))}
        </h2>

        <RevealOnScroll delay={0.2}>
          <p className="mt-8 max-w-2xl mx-auto text-[15px] lg:text-[16px] leading-[1.8] text-[color:var(--muted)]">
            {copy.desc}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.3}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <MagneticLink href="#contact" className="btn-primary">
              {copy.cta}
              <ArrowUpRight className="size-4" />
            </MagneticLink>
            <MagneticLink
              href="https://wa.me/5527999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              {copy.ghost}
            </MagneticLink>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
