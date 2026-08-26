"use client";
import { useLanguage } from "@/context/LanguageContext";
import { COPY, t } from "@/content/site";

export function Manifesto() {
  const { language } = useLanguage();

  return (
    <section className="py-16 lg:py-24 border-t border-[color:var(--hairline)]">
      <div className="container-site">
        <p
          data-reveal
          className="display max-w-3xl text-[clamp(1.5rem,3.4vw,2.5rem)] text-[color:var(--ink-soft)]"
        >
          {t(COPY.manifesto.text, language)}
        </p>
      </div>
    </section>
  );
}
