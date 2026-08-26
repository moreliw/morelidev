import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";

// Fonte de interface: variável, um único arquivo woff2 cobre todos os pesos.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Fonte editorial: só para títulos grandes — dá personalidade sem virar site de moda.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz"],
});

export const viewport: Viewport = {
  themeColor: "#f6f5f1",
};

const SITE = "https://morelidev.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "MoreliDev — Engenharia de software e produtos digitais",
    template: "%s — MoreliDev",
  },
  description:
    "A MoreliDev projeta e desenvolve sistemas sob medida, produtos digitais, SaaS, sites institucionais e integrações para empresas no Brasil e em Angola.",
  alternates: { canonical: SITE },
  icons: {
    icon: [{ url: "/icon-dev.png", type: "image/png" }],
    shortcut: ["/icon-dev.png"],
    apple: [{ url: "/icon-dev.png", type: "image/png" }],
  },
  openGraph: {
    title: "MoreliDev — Engenharia de software e produtos digitais",
    description:
      "Sistemas sob medida, produtos digitais, SaaS, sites institucionais e integrações para empresas no Brasil e em Angola.",
    type: "website",
    url: SITE,
    siteName: "MoreliDev",
    locale: "pt_BR",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MoreliDev — Engenharia de software e produtos digitais",
    description:
      "Sistemas sob medida, produtos digitais, SaaS, sites institucionais e integrações para empresas no Brasil e em Angola.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE}/#founder`,
      name: "William Moreli",
      jobTitle: "Software Engineer",
      sameAs: [
        "https://www.linkedin.com/in/william-moreli",
        "https://github.com/moreliw",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE}/#organization`,
      name: "MoreliDev",
      url: SITE,
      logo: `${SITE}/icon-dev.png`,
      founder: { "@id": `${SITE}/#founder` },
      areaServed: ["BR", "AO"],
      description:
        "Estúdio de engenharia de software especializado em sistemas sob medida, produtos digitais, SaaS, sites institucionais e integrações.",
      address: {
        "@type": "PostalAddress",
        addressCountry: "BR",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "MoreliDev",
      publisher: { "@id": `${SITE}/#organization` },
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
      <body className={`${inter.variable} ${fraunces.variable} font-sans antialiased`}>
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
