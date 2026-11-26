import { AlertTriangle } from "lucide-react";
import type { Product } from "@/lib/types";

export function LowStockAlert({ products, onReview }: { products: Product[]; onReview: () => void }) {
  if (products.length === 0) return null;
  const names = products
    .slice(0, 3)
    .map((p) => `${p.name} (${p.sku})`)
    .join(", ");
  const extra = products.length > 3 ? ` and ${products.length - 3} more` : "";

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
      <AlertTriangle size={18} className="shrink-0" />
      <p>
        <span className="font-medium">{products.length} product(s) need restocking:</span> {names}
        {extra}.
      </p>
      <button
        type="button"
        onClick={onReview}
        className="ml-auto rounded-md border border-amber-300 px-3 py-1 font-medium hover:bg-amber-100"
      >
        Review
      </button>
    </div>
  );
}
