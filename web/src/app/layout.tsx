import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";

// Fonte variável: um único arquivo woff2 cobre todos os pesos,
// acelerando o swap e o LCP em conexões lentas.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#05080f",
};

const SITE = "https://morelidev.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default:
      "William Moreli — Engenharia de software para sistemas web, SaaS e integrações",
    template: "%s",
  },
  description:
    "Engenheiro de software full-stack com 5+ anos de experiência. Desenvolvo sistemas web, plataformas SaaS, dashboards e integrações para empresas no Brasil e em Angola.",
  alternates: { canonical: SITE },
  icons: {
    icon: [{ url: "/icon-dev.png", type: "image/png" }],
    shortcut: ["/icon-dev.png"],
    apple: [{ url: "/icon-dev.png", type: "image/png" }],
  },
  openGraph: {
    title: "William Moreli — Engenharia de software",
    description:
      "Sistemas web, plataformas SaaS, dashboards e integrações para empresas que precisam substituir processos manuais por produtos digitais confiáveis.",
    type: "website",
    url: SITE,
    siteName: "moreli.dev",
    locale: "pt_BR",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "William Moreli — Engenharia de software",
    description:
      "Sistemas web, plataformas SaaS, dashboards e integrações para empresas no Brasil e em Angola.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE}/#person`,
      name: "William Moreli",
      url: SITE,
      image: `${SITE}/picture.png`,
      jobTitle: "Software Engineer",
      description:
        "Engenheiro de software full-stack especializado em sistemas web, plataformas SaaS e integrações.",
      sameAs: [
        "https://www.linkedin.com/in/william-moreli",
        "https://github.com/moreliw",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Vitória",
        addressRegion: "ES",
        addressCountry: "BR",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE}/#service`,
      name: "moreli.dev",
      url: SITE,
      founder: { "@id": `${SITE}/#person` },
      areaServed: ["BR", "AO"],
      description:
        "Desenvolvimento de sistemas web, plataformas SaaS, dashboards e integrações sob medida.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "moreli.dev",
      publisher: { "@id": `${SITE}/#person` },
      inLanguage: ["pt-BR", "en"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" id="top" suppressHydrationWarning>
      <head>
        {/* Marca JS ativo antes do primeiro paint — controla o estado
            inicial das revelações sem nunca esconder conteúdo sem JS. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');if(matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('reduced-motion');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID &&
          process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL && (
            <Script
              defer
              src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}
              data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
              strategy="afterInteractive"
            />
          )}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
