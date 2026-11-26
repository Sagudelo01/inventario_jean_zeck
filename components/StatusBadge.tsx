"use client";

import { useT } from "@/lib/i18n";
import type { ProductStatus } from "@/lib/types";

const STYLES: Record<ProductStatus, string> = {
  in_stock: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  low_stock: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  out_of_stock: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
};

export function StatusBadge({ status }: { status: ProductStatus }) {
  const t = useT();
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${STYLES[status]}`}>
      {t(`status.${status}`)}
    </span>
  );
}
