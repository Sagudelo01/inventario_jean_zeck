"use client";

import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/format";
import { useT } from "@/lib/i18n";
import type { Movement } from "@/lib/types";

export function MovementsTable({ movements }: { movements: Movement[] }) {
  const t = useT();
  if (movements.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface p-10 text-center text-sm text-muted">
        {t("mv.empty")}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-surface">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-border bg-surface-2 text-muted">
          <tr>
            <th className="px-4 py-3 font-medium">{t("mv.date")}</th>
            <th className="px-4 py-3 font-medium">{t("mv.product")}</th>
            <th className="px-4 py-3 font-medium">{t("mv.type")}</th>
            <th className="px-4 py-3 text-right font-medium">{t("mv.qty")}</th>
            <th className="px-4 py-3 text-right font-medium">{t("mv.result")}</th>
            <th className="px-4 py-3 font-medium">{t("mv.reason")}</th>
          </tr>
        </thead>
        <tbody>
          {movements.map((movement) => (
            <tr key={movement.id} className="border-t border-border first:border-t-0">
              <td className="px-4 py-3 text-muted">{formatDate(movement.createdAt)}</td>
              <td className="px-4 py-3">
                <span className="font-medium">{movement.productName}</span>{" "}
                <span className="font-mono text-xs text-muted">{movement.sku}</span>
              </td>
              <td className="px-4 py-3">
                {movement.type === "in" ? (
                  <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400"><ArrowDownLeft size={14} /> {t("mv.in")}</span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400"><ArrowUpRight size={14} /> {t("mv.out")}</span>
                )}
              </td>
              <td className="px-4 py-3 text-right tabular-nums">{movement.type === "in" ? "+" : "−"}{movement.quantity}</td>
              <td className="px-4 py-3 text-right tabular-nums">{movement.resultingStock}</td>
              <td className="px-4 py-3 text-muted">{movement.reason ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
