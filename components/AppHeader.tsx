"use client";

import { useT } from "@/lib/i18n";
import { ThemeToggle } from "./ThemeToggle";
import { LangToggle } from "./LangToggle";

export function AppHeader() {
  const t = useT();
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg">
        {t("skip")}
      </a>
      <header className="sticky top-0 z-30 border-b border-border bg-surface/80 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-2 px-4">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-sm font-bold text-accent-fg">JZ</span>
          <span className="font-semibold">Jean Zeck</span>
          <div className="ml-auto flex items-center gap-2">
            <LangToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>
    </>
  );
}
