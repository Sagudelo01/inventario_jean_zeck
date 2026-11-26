"use client";

import { Moon, Sun } from "lucide-react";
import { useT } from "@/lib/i18n";

const STORAGE_KEY = "jeanzeck:theme";

export function ThemeToggle() {
  const t = useT();

  function toggle() {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage failures; the theme still applies for this session.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t("theme.toggle")}
      className="grid h-8 w-8 place-items-center rounded-lg border border-border text-muted hover:text-fg"
    >
      <Moon size={16} className="block dark:hidden" />
      <Sun size={16} className="hidden dark:block" />
    </button>
  );
}
