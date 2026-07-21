"use client";
import { useLanguage } from "@/context/LanguageContext";
import { PROOF } from "@/content/site";

/**
 * Números reais renderizados direto no HTML inicial —
 * nada de contadores começando em zero.
 */
export function ProofStrip() {
  const { language } = useLanguage();

  return (
    <section aria-label={language === "pt" ? "Números" : "Numbers"}>
      <div className="container-site">
        <ul
          data-reveal
          className="card grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[color:var(--hairline)]"
        >
          {PROOF.map((item) => (
            <li key={item.value} className="flex items-center gap-4 px-7 py-6">
              <span className="text-[1.7rem] font-semibold tracking-tight text-[color:var(--ink)] tabular-nums">
                {item.value}
              </span>
              <span className="text-[0.85rem] leading-snug text-[color:var(--muted)]">
                {language === "pt" ? item.pt : item.en}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
