"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { COPY, LINKS, t } from "@/content/site";

export function Footer() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const year = new Date().getFullYear();

  const navLinks = [
    { id: "projetos", label: t(COPY.nav.projects, language) },
    { id: "servicos", label: t(COPY.nav.services, language) },
    { id: "processo", label: t(COPY.nav.process, language) },
    { id: "empresa", label: t(COPY.nav.company, language) },
    { id: "contato", label: t(COPY.nav.contact, language) },
  ];

  return (
    <footer className="border-t border-[color:var(--hairline)] py-14 lg:py-16">
      <div className="container-site">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
          <div>
            <Link
              href="/"
              className="inline-flex items-center font-semibold tracking-[0.02em] text-[0.95rem] text-[color:var(--ink)]"
            >
              MORELI<span className="text-[color:var(--accent)]">DEV</span>
            </Link>
            <p className="mt-3 text-[0.85rem] text-[color:var(--muted)]">
              {t(COPY.footer.tagline, language)}
            </p>
            <p className="mt-1 text-[0.85rem] text-[color:var(--muted)]">
              {t(COPY.footer.location, language)} · {t(COPY.footer.coverage, language)}
            </p>
          </div>

          <nav aria-label={language === "pt" ? "Rodapé" : "Footer"} className="flex gap-10 sm:gap-16">
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={isHome ? `#${link.id}` : `/#${link.id}`}
                    className="text-[0.87rem] text-[color:var(--muted)] hover:text-[color:var(--ink)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.87rem] text-[color:var(--muted)] hover:text-[color:var(--ink)] transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.87rem] text-[color:var(--muted)] hover:text-[color:var(--ink)] transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${LINKS.email}`}
                  className="text-[0.87rem] text-[color:var(--muted)] hover:text-[color:var(--ink)] transition-colors"
                >
                  {LINKS.email}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-[color:var(--hairline)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[0.78rem] text-[color:var(--muted-2)]">
            © {year} MoreliDev — William Moreli. {t(COPY.footer.rights, language)}
          </p>
          <a
            href="#top"
            className="text-[0.78rem] text-[color:var(--muted-2)] hover:text-[color:var(--ink)] transition-colors"
          >
            {t(COPY.footer.backToTop, language)} ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
