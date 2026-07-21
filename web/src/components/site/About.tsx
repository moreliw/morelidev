"use client";
import Image from "next/image";
import { Github, Linkedin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { COPY, LINKS, STACK_PRIMARY, STACK_SECONDARY, t } from "@/content/site";

export function About() {
  const { language } = useLanguage();
  const a = COPY.about;

  return (
    <section id="sobre" className="py-20 lg:py-28 scroll-mt-20 border-t border-[color:var(--hairline)]">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7">
            <p data-reveal className="eyebrow">
              {t(a.eyebrow, language)}
            </p>

            <div data-reveal className="mt-6 flex items-start gap-5">
              <Image
                src="/picture.png"
                alt={t(a.photoAlt, language)}
                width={72}
                height={72}
                className="rounded-xl object-cover border border-[color:var(--hairline-strong)]"
              />
              <div>
                <h2 className="section-title text-[color:var(--ink)]">
                  {t(a.title, language)}
                </h2>
                <p className="mt-1 text-[0.88rem] text-[color:var(--muted)]">
                  Software Engineer · Full Stack
                </p>
              </div>
            </div>

            <div data-reveal className="mt-7 space-y-4 max-w-xl">
              {(language === "pt" ? a.paragraphs.pt : a.paragraphs.en).map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="text-[0.95rem] leading-[1.8] text-[color:var(--muted)]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div data-reveal className="mt-8 flex flex-wrap gap-3">
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary !min-h-10 !py-2 text-[0.85rem]"
              >
                <Linkedin className="size-4" aria-hidden />
                LinkedIn
              </a>
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary !min-h-10 !py-2 text-[0.85rem]"
              >
                <Github className="size-4" aria-hidden />
                GitHub
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div data-reveal className="card p-7">
              <h3 className="text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-soft)]">
                {t(a.stackTitle, language)}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {STACK_PRIMARY.map((tech) => (
                  <li key={tech} className="chip">
                    {tech}
                  </li>
                ))}
              </ul>

              <h3 className="mt-8 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--muted)]">
                {t(a.stackMoreTitle, language)}
              </h3>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-[color:var(--muted)]">
                {STACK_SECONDARY.join(" · ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
