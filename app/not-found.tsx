"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n";

export default function NotFound() {
  const t = useT();
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-24 text-center">
      <p className="text-sm font-semibold text-accent">404</p>
      <h1 className="mt-2 text-xl font-semibold">{t("notfound.title")}</h1>
      <p className="mt-2 max-w-md text-sm text-muted">{t("notfound.body")}</p>
      <Link href="/" className="mt-6 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-fg hover:opacity-90">
        {t("notfound.back")}
      </Link>
    </main>
  );
}
