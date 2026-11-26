import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/format";
import type { Movement } from "@/lib/types";

export function MovementsTable({ movements }: { movements: Movement[] }) {
  if (movements.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-surface p-10 text-center text-sm text-muted">
        No movements recorded yet. Use the movement action on a product to log stock in or out.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-surface">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-border bg-surface-2 text-muted">
          <tr>
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">Product</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 text-right font-medium">Quantity</th>
            <th className="px-4 py-3 text-right font-medium">Resulting stock</th>
            <th className="px-4 py-3 font-medium">Reason</th>
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
                  <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400"><ArrowDownLeft size={14} /> In</span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400"><ArrowUpRight size={14} /> Out</span>
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
