"use client";
import { useLanguage } from "@/context/LanguageContext";
import { COPY, t } from "@/content/site";

export function Process() {
  const { language } = useLanguage();
  const p = COPY.process;

  return (
    <section className="py-20 lg:py-28 border-t border-[color:var(--hairline)]">
      <div className="container-site">
        <div className="max-w-xl mb-12">
          <p data-reveal className="eyebrow">
            {t(p.eyebrow, language)}
          </p>
          <h2 data-reveal className="section-title mt-3 text-[color:var(--ink)]">
            {t(p.title, language)}
          </h2>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {p.steps.map((step, i) => (
            <li key={step.title.en} data-reveal className="relative">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="text-[0.8rem] font-semibold tabular-nums text-[color:var(--accent-ink)]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span aria-hidden className="hairline flex-1" />
              </div>
              <h3 className="mt-4 text-[1rem] font-semibold tracking-tight text-[color:var(--ink)]">
                {t(step.title, language)}
              </h3>
              <p className="mt-2 text-[0.87rem] leading-relaxed text-[color:var(--muted)]">
                {t(step.desc, language)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
