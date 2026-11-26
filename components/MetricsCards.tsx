import { formatCurrency } from "@/lib/format";
import type { InventoryMetrics, MovedProduct } from "@/lib/metrics";

function Card({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
      {hint ? <p className="text-xs text-muted">{hint}</p> : null}
    </div>
  );
}

export function MetricsCards({ metrics, moved }: { metrics: InventoryMetrics; moved: MovedProduct[] }) {
  return (
    <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" aria-label="Inventory metrics">
      <Card label="Inventory value" value={formatCurrency(metrics.inventoryValue)} hint={`${metrics.totalUnits} units in stock`} />
      <Card label="Products" value={String(metrics.totalProducts)} hint="distinct SKUs" />
      <Card label="Low stock" value={String(metrics.lowStock)} hint="at or below threshold" />
      <Card label="Out of stock" value={String(metrics.outOfStock)} hint="need restocking" />
      <div className="col-span-2 rounded-xl border border-border bg-surface p-4 lg:col-span-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">Most moved</p>
        {moved.length === 0 ? (
          <p className="mt-1 text-sm text-muted">No movements recorded yet.</p>
        ) : (
          <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm">
            {moved.map((item) => (
              <li key={item.productId} className="flex items-center gap-2">
                <span className="font-medium">{item.name}</span>
                <span className="font-mono text-xs text-muted">{item.sku}</span>
                <span className="text-muted">· {item.unitsMoved} units</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
