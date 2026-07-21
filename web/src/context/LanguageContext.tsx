"use client";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

type Language = "pt" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

/* Store externo baseado em localStorage: o servidor sempre entrega "pt"
   e o cliente re-renderiza com a preferência salva após a hidratação —
   sem hydration mismatch e sem setState em effect. */
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot(): Language {
  return localStorage.getItem("language") === "en" ? "en" : "pt";
}

function getServerSnapshot(): Language {
  return "pt";
}

function setStoredLanguage(language: Language) {
  localStorage.setItem("language", language);
  listeners.forEach((cb) => cb());
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-br" : "en";
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage: setStoredLanguage }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
