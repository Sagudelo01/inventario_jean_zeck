import { STATUS_LABELS, type ProductStatus } from "@/lib/types";

const STYLES: Record<ProductStatus, string> = {
  in_stock: "bg-emerald-100 text-emerald-700",
  low_stock: "bg-amber-100 text-amber-700",
  out_of_stock: "bg-rose-100 text-rose-700",
};

export function StatusBadge({ status }: { status: ProductStatus }) {
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${STYLES[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
