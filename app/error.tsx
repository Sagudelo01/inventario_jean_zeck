"use client";

import { AlertTriangle } from "lucide-react";
import { useT } from "@/lib/i18n";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  const t = useT();
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-24 text-center">
      <AlertTriangle className="mb-4 text-amber-500" size={32} />
      <h1 className="text-xl font-semibold">{t("error.title")}</h1>
      <p className="mt-2 max-w-md text-sm text-muted">{t("error.body")}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-fg hover:opacity-90"
      >
        {t("error.retry")}
      </button>
    </main>
  );
}
