"use client";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";
import { LanguageProvider } from "@/context/LanguageContext";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
