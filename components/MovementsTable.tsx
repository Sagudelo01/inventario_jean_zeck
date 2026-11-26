import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/format";
import type { Movement } from "@/lib/types";

export function MovementsTable({ movements }: { movements: Movement[] }) {
  if (movements.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-300 p-10 text-center text-sm text-zinc-500">
        No movements recorded yet. Use the movement action on a product to log stock in or out.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-50 text-zinc-500">
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
            <tr key={movement.id} className="border-t border-zinc-100">
              <td className="px-4 py-3 text-zinc-600">{formatDate(movement.createdAt)}</td>
              <td className="px-4 py-3">
                <span className="font-medium">{movement.productName}</span>{" "}
                <span className="font-mono text-xs text-zinc-500">{movement.sku}</span>
              </td>
              <td className="px-4 py-3">
                {movement.type === "in" ? (
                  <span className="inline-flex items-center gap-1 text-emerald-700"><ArrowDownLeft size={14} /> In</span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-rose-700"><ArrowUpRight size={14} /> Out</span>
                )}
              </td>
              <td className="px-4 py-3 text-right tabular-nums">{movement.type === "in" ? "+" : "−"}{movement.quantity}</td>
              <td className="px-4 py-3 text-right tabular-nums">{movement.resultingStock}</td>
              <td className="px-4 py-3 text-zinc-600">{movement.reason ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
