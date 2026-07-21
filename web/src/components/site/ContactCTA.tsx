"use client";
import { Mail, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { COPY, LINKS, t } from "@/content/site";
import { ContactForm } from "./ContactForm";

export function ContactCTA() {
  const { language } = useLanguage();
  const c = COPY.contact;

  return (
    <section id="contato" className="py-20 lg:py-28 scroll-mt-20 border-t border-[color:var(--hairline)]">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 data-reveal className="display text-[clamp(1.7rem,3.2vw,2.4rem)] text-[color:var(--ink)]">
              {t(c.title, language)}
            </h2>
            <p data-reveal className="mt-5 text-[0.95rem] leading-[1.8] text-[color:var(--muted)] max-w-md">
              {t(c.sub, language)}
            </p>
            <div data-reveal className="mt-8 flex flex-wrap gap-3">
              <a
                href={LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <MessageCircle className="size-4" aria-hidden />
                {t(c.whatsapp, language)}
              </a>
              <a href={`mailto:${LINKS.email}`} className="btn btn-secondary">
                <Mail className="size-4" aria-hidden />
                {t(c.email, language)}
              </a>
            </div>
          </div>

          <div data-reveal className="lg:col-span-7">
            <div className="card p-6 lg:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
