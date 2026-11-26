"use client";

import { formatCurrency } from "@/lib/format";
import { useT } from "@/lib/i18n";
import type { CategoryValue } from "@/lib/metrics";

export function CategoryBreakdown({ data }: { data: CategoryValue[] }) {
  const t = useT();
  if (data.length === 0) return null;
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <section className="animate-rise rounded-xl border border-border bg-surface p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-muted">{t("metric.byCategory")}</p>
      <ul className="mt-3 space-y-2">
        {data.map((item) => (
          <li key={item.category} className="grid grid-cols-[7rem_1fr_auto] items-center gap-3 text-sm">
            <span className="truncate text-muted">{item.category}</span>
            <span className="h-2 overflow-hidden rounded-full bg-surface-2">
              <span
                className="block h-full rounded-full bg-accent transition-[width] duration-500"
                style={{ width: `${Math.max(2, (item.value / max) * 100)}%` }}
              />
            </span>
            <span className="tabular-nums font-medium">{formatCurrency(item.value)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
