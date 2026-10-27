"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initAnalytics, trackPageview } from "@/lib/analytics";

/**
 * Liga as métricas próprias (lib/analytics.ts) ao site público: inicia os
 * ouvintes uma vez e registra uma página vista a cada mudança de rota.
 * Montado só pelo SiteChrome, nunca no /admin.
 */
export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackPageview(pathname);
  }, [pathname]);

  return null;
}
