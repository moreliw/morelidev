"use client";
import { Mail, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { COPY, LINKS, t } from "@/content/site";
import { ContactForm } from "./ContactForm";

export function ContactCTA() {
  const { language } = useLanguage();
  const c = COPY.contact;

  return (
    <section id="contato" className="py-20 lg:py-32 scroll-mt-20 border-t border-[color:var(--hairline)]">
      <div className="container-site">
        <p data-reveal className="eyebrow">
          {t(c.eyebrow, language)}
        </p>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-6">
            <h2
              data-reveal
              className="display whitespace-pre-line text-[clamp(2.2rem,5vw,3.6rem)] text-[color:var(--ink)]"
            >
              {t(c.title, language)}
            </h2>
            <p data-reveal className="mt-6 text-[1rem] leading-[1.8] text-[color:var(--muted)] max-w-md">
              {t(c.sub, language)}
            </p>
            <div data-reveal className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              <a
                href={LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-2 text-[0.92rem] font-medium text-[color:var(--ink)]"
              >
                <MessageCircle className="size-4" aria-hidden />
                {t(c.whatsapp, language)}
              </a>
              <a
                href={`mailto:${LINKS.email}`}
                className="link-underline inline-flex items-center gap-2 text-[0.92rem] font-medium text-[color:var(--ink)]"
              >
                <Mail className="size-4" aria-hidden />
                {LINKS.email}
              </a>
            </div>
          </div>

          <div data-reveal className="lg:col-span-6">
            <div className="card p-6 lg:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
