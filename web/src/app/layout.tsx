import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "./chrome.css";
import "./home.css";
import { Providers } from "./providers";

// Uma única família para toda a interface — grotesk geométrica, boa em
// pesos extremos (100–900), o suficiente para carregar o site sozinha.
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

// Mono só para detalhes técnicos: labels, índices, coordenadas — nunca corpo de texto.
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

const SITE = "https://morelidev.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "MoreliDev — Creative Technology Studio",
    template: "%s — MoreliDev",
  },
  description:
    "MoreliDev é um estúdio de tecnologia criativa: estratégia, design e engenharia para produtos digitais, sistemas sob medida e experiências web que empresas realmente usam.",
  alternates: { canonical: SITE },
  icons: {
    icon: [{ url: "/icon-dev.png", type: "image/png" }],
    shortcut: ["/icon-dev.png"],
    apple: [{ url: "/icon-dev.png", type: "image/png" }],
  },
  openGraph: {
    title: "MoreliDev — Creative Technology Studio",
    description:
      "Estratégia, design e engenharia para produtos digitais, sistemas sob medida e experiências web.",
    type: "website",
    url: SITE,
    siteName: "MoreliDev",
    locale: "pt_BR",
    alternateLocale: "en_US",
    images: [
      {
        url: "/images/premium/mameri-studio.webp",
        width: 1536,
        height: 1024,
        alt: "MoreliDev — Creative Technology Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MoreliDev — Creative Technology Studio",
    images: ["/images/premium/mameri-studio.webp"],
    description:
      "Estratégia, design e engenharia para produtos digitais, sistemas sob medida e experiências web.",
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
      description:
        "Estúdio de tecnologia criativa especializado em produtos digitais, sistemas sob medida e experiências web.",
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

const MOTION_FLAG =
  "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.dataset.motion='on'}catch(e){}";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" id="top" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Marca o documento antes da primeira pintura: só assim os reveals
            partem escondidos — e nunca para quem pede movimento reduzido. */}
        <script dangerouslySetInnerHTML={{ __html: MOTION_FLAG }} />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
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
