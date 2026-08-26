"use client";
import { useLanguage } from "@/context/LanguageContext";
import { COPY, t } from "@/content/site";

export function Principles() {
  const { language } = useLanguage();
  const p = COPY.principles;
  const items = language === "pt" ? p.items.pt : p.items.en;

  return (
    <section className="py-20 lg:py-28 border-t border-[color:var(--hairline)]">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-6">
            <h2
              data-reveal
              className="display whitespace-pre-line text-[clamp(2rem,4.4vw,3.2rem)] text-[color:var(--ink)]"
            >
              {t(p.title, language)}
            </h2>
            <p data-reveal className="mt-6 max-w-md text-[0.98rem] leading-[1.75] text-[color:var(--muted)]">
              {t(p.lead, language)}
            </p>
          </div>

          <div className="lg:col-span-6 lg:pt-2">
            <ul>
              {items.map((item) => (
                <li
                  key={item}
                  data-reveal
                  className="py-5 border-t border-[color:var(--hairline)] last:border-b text-[1.05rem] leading-snug text-[color:var(--ink-soft)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
