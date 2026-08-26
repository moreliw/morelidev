"use client";
import { PropsWithChildren } from "react";
import { LanguageProvider } from "@/context/LanguageContext";

export function Providers({ children }: PropsWithChildren) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
