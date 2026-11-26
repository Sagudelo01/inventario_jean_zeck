import { formatCurrency } from "@/lib/format";
import type { InventoryMetrics, MovedProduct } from "@/lib/metrics";

function Card({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
      {hint ? <p className="text-xs text-zinc-500">{hint}</p> : null}
    </div>
  );
}

export function MetricsCards({ metrics, moved }: { metrics: InventoryMetrics; moved: MovedProduct[] }) {
  return (
    <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <Card label="Inventory value" value={formatCurrency(metrics.inventoryValue)} hint={`${metrics.totalUnits} units in stock`} />
      <Card label="Products" value={String(metrics.totalProducts)} hint="distinct SKUs" />
      <Card label="Low stock" value={String(metrics.lowStock)} hint="at or below threshold" />
      <Card label="Out of stock" value={String(metrics.outOfStock)} hint="need restocking" />
      <div className="col-span-2 rounded-lg border border-zinc-200 bg-white p-4 lg:col-span-4">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Most moved</p>
        {moved.length === 0 ? (
          <p className="mt-1 text-sm text-zinc-500">No movements recorded yet.</p>
        ) : (
          <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm">
            {moved.map((item) => (
              <li key={item.productId} className="flex items-center gap-2">
                <span className="font-medium">{item.name}</span>
                <span className="font-mono text-xs text-zinc-500">{item.sku}</span>
                <span className="text-zinc-500">· {item.unitsMoved} units</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
