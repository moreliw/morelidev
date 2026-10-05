import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
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

// Serifa itálica só para a palavra de ênfase dos títulos — o contraste
// grotesk + itálico é a assinatura tipográfica da home.
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#05070d",
};

const SITE = "https://morelidev.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "MoreliDev | Desenvolvimento de software sob medida",
    template: "%s | MoreliDev",
  },
  description:
    "Desenvolvimento de sistemas, produtos digitais e sites sob medida para empresas.",
  alternates: { canonical: SITE },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo-icon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png" }],
  },
  openGraph: {
    title: "MoreliDev | Desenvolvimento de software sob medida",
    description: "Desenvolvimento de sistemas, produtos digitais e sites sob medida para empresas.",
    type: "website",
    url: SITE,
    siteName: "MoreliDev",
    locale: "pt_BR",
    alternateLocale: "en_US",
    images: [
      {
        url: "/open-graph-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "MoreliDev",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MoreliDev | Desenvolvimento de software sob medida",
    images: ["/social-card-1200x675.jpg"],
    description: "Desenvolvimento de sistemas, produtos digitais e sites sob medida para empresas.",
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
      logo: `${SITE}/android-chrome-512x512.png`,
      founder: { "@id": `${SITE}/#founder` },
      description:
        "Estúdio de desenvolvimento de software: sistemas, produtos digitais e sites sob medida.",
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

// Também marca se o preloader já rodou nesta sessão — assim ele nunca
// pisca numa segunda navegação para a home.
const MOTION_FLAG =
  "try{var d=document.documentElement;if(!matchMedia('(prefers-reduced-motion: reduce)').matches)d.dataset.motion='on';if(sessionStorage.getItem('md-loaded'))d.dataset.loaded='1'}catch(e){}";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      id="top"
      data-scroll-behavior="smooth"
      className={`${geist.variable} ${geistMono.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Marca o documento antes da primeira pintura: só assim os reveals
            partem escondidos — e nunca para quem pede movimento reduzido. */}
        <script dangerouslySetInnerHTML={{ __html: MOTION_FLAG }} />
      </head>
      <body className="font-sans antialiased">
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
