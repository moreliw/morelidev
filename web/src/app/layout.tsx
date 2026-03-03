import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Moreli Dev — Engenharia, Design e Performance",
  description:
    "Portfolio profissional com foco em arquitetura, frontend moderno e entrega de alto padrão.",
  icons: {
    icon: [{ url: "/icon-dev.png", type: "image/png" }],
    shortcut: ["/icon-dev.png"],
    apple: [{ url: "/icon-dev.png", type: "image/png" }],
  },
  openGraph: {
    title: "Moreli Dev — Engenharia, Design e Performance",
    description:
      "Portfolio profissional com foco em arquitetura, frontend moderno e entrega de alto padrão.",
    type: "website",
    url: "https://morelidev.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`}>
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
