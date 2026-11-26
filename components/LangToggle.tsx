"use client";

import { setLang, useLang, useT } from "@/lib/i18n";

export function LangToggle() {
  const lang = useLang();
  const t = useT();
  return (
    <button
      type="button"
      onClick={() => setLang(lang === "en" ? "es" : "en")}
      aria-label={t("lang.toggle")}
      className="grid h-8 min-w-8 place-items-center rounded-lg border border-border px-2 text-xs font-semibold text-muted hover:text-fg"
    >
      {lang.toUpperCase()}
    </button>
  );
}
