"use client";

import { useMemo, useState } from "react";
import { deleteProduct, resetInventory, useMovements, useProducts } from "@/lib/store";
import { productStatus, type Product } from "@/lib/types";
import { computeMetrics, mostMoved } from "@/lib/metrics";
import { productsToCsv, downloadCsv } from "@/lib/csv";
import {
  EMPTY_FILTERS,
  filterProducts,
  paginate,
  sortProducts,
  uniqueValues,
  type Filters,
  type SortDirection,
  type SortKey,
} from "@/lib/query";
import { MetricsCards } from "@/components/MetricsCards";
import { LowStockAlert } from "@/components/LowStockAlert";
import { Toolbar } from "@/components/Toolbar";
import { InventoryTable } from "@/components/InventoryTable";
import { Pagination } from "@/components/Pagination";
import { MovementsTable } from "@/components/MovementsTable";
import { ProductFormDialog } from "@/components/ProductFormDialog";
import { MovementDialog } from "@/components/MovementDialog";
import { ConfirmDialog } from "@/components/ConfirmDialog";

const PAGE_SIZE = 8;
type Tab = "inventory" | "movements";

export default function Page() {
  const products = useProducts();
  const movements = useMovements();

  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState<Tab>("inventory");

  const [productDialog, setProductDialog] = useState<{ open: boolean; editing: Product | null }>({ open: false, editing: null });
  const [movementProduct, setMovementProduct] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const options = useMemo(
    () => ({
      categories: uniqueValues(products, "category"),
      sizes: uniqueValues(products, "size"),
      colors: uniqueValues(products, "color"),
    }),
    [products],
  );

  const metrics = useMemo(() => computeMetrics(products), [products]);
  const moved = useMemo(() => mostMoved(movements), [movements]);
  const lowStockProducts = useMemo(() => products.filter((p) => productStatus(p) !== "in_stock"), [products]);

  const sorted = useMemo(
    () => sortProducts(filterProducts(products, filters), sortKey, sortDirection),
    [products, filters, sortKey, sortDirection],
  );
  const pageData = useMemo(() => paginate(sorted, page, PAGE_SIZE), [sorted, page]);

  function changeFilters(patch: Partial<Filters>) {
    setFilters((prev) => ({ ...prev, ...patch }));
    setPage(1);
  }

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDirection((dir) => (dir === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  }

  function reviewLowStock() {
    setFilters({ ...EMPTY_FILTERS, lowStockOnly: true });
    setPage(1);
    setTab("inventory");
  }

  function exportCsv() {
    downloadCsv(`jean-zeck-inventory-${new Date().toISOString().slice(0, 10)}.csv`, productsToCsv(sorted));
  }

  function handleReset() {
    resetInventory();
    setFilters(EMPTY_FILTERS);
    setPage(1);
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Jean Zeck Inventory</h1>
        <p className="text-sm text-zinc-500">Clothing stock, movements and metrics</p>
      </header>

      <div className="space-y-6">
        <MetricsCards metrics={metrics} moved={moved} />
        <LowStockAlert products={lowStockProducts} onReview={reviewLowStock} />

        <div className="flex gap-1 border-b border-zinc-200">
          <TabButton active={tab === "inventory"} onClick={() => setTab("inventory")}>Inventory</TabButton>
          <TabButton active={tab === "movements"} onClick={() => setTab("movements")}>
            Movements {movements.length > 0 ? `(${movements.length})` : ""}
          </TabButton>
        </div>

        {tab === "inventory" ? (
          <div className="space-y-4">
            <Toolbar filters={filters} onChange={changeFilters} options={options} onAdd={() => setProductDialog({ open: true, editing: null })} onExport={exportCsv} onReset={handleReset} />
            {pageData.total === 0 ? (
              <div className="rounded-lg border border-dashed border-zinc-300 p-10 text-center text-sm text-zinc-500">
                No products match the current filters.
              </div>
            ) : (
              <>
                <InventoryTable
                  products={pageData.items}
                  sortKey={sortKey}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                  onEdit={(product) => setProductDialog({ open: true, editing: product })}
                  onMove={(product) => setMovementProduct(product)}
                  onDelete={(product) => setDeleteTarget(product)}
                />
                <Pagination page={pageData.page} pageCount={pageData.pageCount} total={pageData.total} onPageChange={setPage} />
              </>
            )}
          </div>
        ) : (
          <MovementsTable movements={movements} />
        )}
      </div>

      <ProductFormDialog
        key={productDialog.editing?.id ?? "new"}
        open={productDialog.open}
        editing={productDialog.editing}
        products={products}
        onClose={() => setProductDialog((prev) => ({ ...prev, open: false }))}
      />
      <MovementDialog
        key={movementProduct?.id ?? "none"}
        open={movementProduct !== null}
        product={movementProduct}
        onClose={() => setMovementProduct(null)}
      />
      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete product"
        message={deleteTarget ? `Delete "${deleteTarget.name}" (${deleteTarget.sku})? This cannot be undone.` : ""}
        onConfirm={() => {
          if (deleteTarget) deleteProduct(deleteTarget.id);
          setDeleteTarget(null);
        }}
        onClose={() => setDeleteTarget(null)}
      />
    </main>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium ${
        active ? "border-zinc-900 text-zinc-900" : "border-transparent text-zinc-500 hover:text-zinc-800"
      }`}
    >
      {children}
    </button>
  );
}
