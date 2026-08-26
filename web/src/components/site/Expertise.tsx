"use client";
import { useLanguage } from "@/context/LanguageContext";
import { COPY, t } from "@/content/site";

export function Expertise() {
  const { language } = useLanguage();
  const s = COPY.services;

  return (
    <section id="servicos" className="py-20 lg:py-28 scroll-mt-20 border-t border-[color:var(--hairline)]">
      <div className="container-site">
        <div className="max-w-xl mb-12 lg:mb-16">
          <p data-reveal className="eyebrow">
            {t(s.eyebrow, language)}
          </p>
          <h2 data-reveal className="section-title mt-3 text-[color:var(--ink)]">
            {t(s.title, language)}
          </h2>
        </div>

        <ul>
          {s.items.map((item, i) => (
            <li
              key={item.title.en}
              data-reveal
              className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-8 py-8 lg:py-10 border-t border-[color:var(--hairline)] last:border-b"
            >
              <div className="sm:col-span-5 flex items-baseline gap-4">
                <span className="num text-[0.85rem] font-semibold text-[color:var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="section-title !text-[1.35rem] sm:!text-[1.6rem] text-[color:var(--ink)]">
                  {t(item.title, language)}
                </h3>
              </div>
              <p className="sm:col-span-7 text-[0.96rem] leading-[1.7] text-[color:var(--muted)] max-w-lg">
                {t(item.desc, language)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
