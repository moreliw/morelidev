"use client";
import { MonitorCog, Gauge, Workflow } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { COPY, t } from "@/content/site";

const ICONS = [MonitorCog, Gauge, Workflow] as const;

export function Capabilities() {
  const { language } = useLanguage();
  const c = COPY.capabilities;

  return (
    <section id="especialidades" className="py-20 lg:py-28 scroll-mt-20 border-t border-[color:var(--hairline)]">
      <div className="container-site">
        <div className="max-w-xl mb-12">
          <p data-reveal className="eyebrow">
            {t(c.eyebrow, language)}
          </p>
          <h2 data-reveal className="section-title mt-3 text-[color:var(--ink)]">
            {t(c.title, language)}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12">
          {c.groups.map((group, i) => {
            const Icon = ICONS[i];
            return (
              <div key={group.title.en} data-reveal>
                <Icon
                  className="size-5 text-[color:var(--accent-ink)]"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <h3 className="mt-4 text-[1.02rem] font-semibold tracking-tight text-[color:var(--ink)]">
                  {t(group.title, language)}
                </h3>
                <p className="mt-2.5 text-[0.9rem] leading-relaxed text-[color:var(--muted)]">
                  {t(group.desc, language)}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {(language === "pt" ? group.items.pt : group.items.en).map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[0.87rem] text-[color:var(--ink-soft)]"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.5em] size-1 rounded-full bg-[color:var(--accent)] shrink-0"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
