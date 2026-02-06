"use client";
import { useTheme } from "next-themes";
import { useCallback } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const toggle = useCallback(() => setTheme(isDark ? "light" : "dark"), [isDark, setTheme]);

  return (
    <button
      aria-label="Alternar tema"
      className="rounded-full border border-zinc-300 dark:border-zinc-700 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      onClick={toggle}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
