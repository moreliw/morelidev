import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "./premium.css";
import { Providers } from "./providers";

// Fonte de interface: variável, um único arquivo woff2 cobre todos os pesos.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Fonte editorial: só para títulos grandes — dá personalidade sem virar site de moda.
const editorial = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-editorial",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f6f5f1",
};

const SITE = "https://morelidev.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "MoreliDev — Software que move negócios",
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
    title: "MoreliDev — Software que move negócios",
    description:
      "Sistemas sob medida, produtos digitais, SaaS, sites institucionais e integrações para empresas no Brasil e em Angola.",
    type: "website",
    url: SITE,
    siteName: "MoreliDev",
    locale: "pt_BR",
    alternateLocale: "en_US",
    images: [
      {
        url: "/images/premium/software-hero.webp",
        width: 1536,
        height: 1024,
        alt: "MoreliDev — Software que move negócios",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MoreliDev — Software que move negócios",
    images: ["/images/premium/software-hero.webp"],
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
    <html lang="pt-br" id="top" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${editorial.variable} font-sans antialiased`}
      >
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
