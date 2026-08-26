"use client";
import Image from "next/image";
import { Github, Linkedin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { COPY, LINKS, STACK, t } from "@/content/site";

export function About() {
  const { language } = useLanguage();
  const c = COPY.company;

  return (
    <section id="empresa" className="py-20 lg:py-28 scroll-mt-20 border-t border-[color:var(--hairline)]">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7">
            <p data-reveal className="eyebrow">
              {t(c.eyebrow, language)}
            </p>
            <h2 data-reveal className="display mt-4 text-[clamp(2.1rem,4.4vw,3.4rem)] text-[color:var(--ink)]">
              {t(c.title, language)}
            </h2>

            <div data-reveal className="mt-7 space-y-4 max-w-xl">
              {(language === "pt" ? c.paragraphs.pt : c.paragraphs.en).map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="text-[1rem] leading-[1.8] text-[color:var(--ink-soft)]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div data-reveal className="mt-10 pt-8 border-t border-[color:var(--hairline)] flex items-start gap-4 max-w-xl">
              <Image
                src="/picture.png"
                alt="William Moreli"
                width={44}
                height={44}
                className="object-cover border border-[color:var(--hairline-strong)] shrink-0"
              />
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[color:var(--muted-2)]">
                  {t(c.founderLabel, language)}
                </p>
                <p className="mt-1.5 text-[0.9rem] leading-relaxed text-[color:var(--muted)]">
                  {t(c.founderText, language)}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                  <a
                    href={LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-[color:var(--muted)] hover:text-[color:var(--ink)]"
                  >
                    <Linkedin className="size-3.5" aria-hidden />
                    LinkedIn
                  </a>
                  <a
                    href={LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-[color:var(--muted)] hover:text-[color:var(--ink)]"
                  >
                    <Github className="size-3.5" aria-hidden />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div data-reveal className="border border-[color:var(--hairline)] p-7 lg:p-8">
              <h3 className="text-[0.8rem] font-semibold text-[color:var(--ink-soft)]">
                {t(c.stackLabel, language)}
              </h3>
              <p className="mt-4 text-[0.92rem] leading-[1.9] text-[color:var(--muted)]">
                {STACK.join(" · ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
