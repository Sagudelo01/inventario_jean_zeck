"use client";

import { useMemo, useState } from "react";
import { deleteProduct, resetInventory, useMovements, useProducts } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { toast } from "@/lib/toast";
import { productStatus, type Product } from "@/lib/types";
import { computeMetrics, mostMoved, valueByCategory } from "@/lib/metrics";
import { productsToCsv, movementsToCsv, downloadCsv } from "@/lib/csv";
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
import { CategoryBreakdown } from "@/components/CategoryBreakdown";
import { Download } from "lucide-react";
import { LowStockAlert } from "@/components/LowStockAlert";
import { Toolbar } from "@/components/Toolbar";
import { InventoryTable } from "@/components/InventoryTable";
import { Pagination } from "@/components/Pagination";
import { MovementsTable } from "@/components/MovementsTable";
import { ProductFormDialog } from "@/components/ProductFormDialog";
import { MovementDialog } from "@/components/MovementDialog";
import { ConfirmDialog } from "@/components/ConfirmDialog";

const PAGE_SIZES = [8, 16, 24];
type Tab = "inventory" | "movements";

export default function Page() {
  const t = useT();
  const products = useProducts();
  const movements = useMovements();

  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
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
  const categoryValues = useMemo(() => valueByCategory(products), [products]);
  const lowStockProducts = useMemo(() => products.filter((p) => productStatus(p) !== "in_stock"), [products]);

  const sorted = useMemo(
    () => sortProducts(filterProducts(products, filters), sortKey, sortDirection),
    [products, filters, sortKey, sortDirection],
  );
  const pageData = useMemo(() => paginate(sorted, page, pageSize), [sorted, page, pageSize]);

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

  const today = () => new Date().toISOString().slice(0, 10);

  function exportCsv() {
    downloadCsv(`jean-zeck-inventory-${today()}.csv`, productsToCsv(sorted));
    toast("toast.exported");
  }

  function exportMovements() {
    downloadCsv(`jean-zeck-movements-${today()}.csv`, movementsToCsv(movements));
    toast("toast.exported");
  }

  function handleReset() {
    resetInventory();
    setFilters(EMPTY_FILTERS);
    setPage(1);
  }

  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">{t("app.title")}</h1>
        <p className="text-sm text-muted">{t("app.subtitle")}</p>
      </header>

      <div className="space-y-6">
        <MetricsCards metrics={metrics} moved={moved} />
        <CategoryBreakdown data={categoryValues} />
        <LowStockAlert products={lowStockProducts} onReview={reviewLowStock} />

        <div role="tablist" aria-label="Inventory views" className="flex gap-1 border-b border-border">
          <TabButton id="inventory" active={tab === "inventory"} onClick={() => setTab("inventory")}>{t("tab.inventory")}</TabButton>
          <TabButton id="movements" active={tab === "movements"} onClick={() => setTab("movements")}>
            {t("tab.movements")} {movements.length > 0 ? `(${movements.length})` : ""}
          </TabButton>
        </div>

        {tab === "inventory" ? (
          <div id="panel-inventory" role="tabpanel" aria-labelledby="tab-inventory" className="animate-rise space-y-4">
            <Toolbar filters={filters} onChange={changeFilters} options={options} onAdd={() => setProductDialog({ open: true, editing: null })} onExport={exportCsv} onReset={handleReset} />
            {pageData.total === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-surface p-10 text-center text-sm text-muted">
                {t("empty.filters")}
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
                <Pagination
                  page={pageData.page}
                  pageCount={pageData.pageCount}
                  total={pageData.total}
                  pageSize={pageSize}
                  pageSizes={PAGE_SIZES}
                  onPageChange={setPage}
                  onPageSizeChange={(size) => {
                    setPageSize(size);
                    setPage(1);
                  }}
                />
              </>
            )}
          </div>
        ) : (
          <div id="panel-movements" role="tabpanel" aria-labelledby="tab-movements" className="animate-rise space-y-4">
            {movements.length > 0 ? (
              <div className="flex justify-end">
                <button type="button" onClick={exportMovements} className="flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-2 text-sm font-medium hover:bg-surface-2">
                  <Download size={16} /> {t("mv.exportCsv")}
                </button>
              </div>
            ) : null}
            <MovementsTable movements={movements} />
          </div>
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
        title={t("confirm.deleteTitle")}
        message={deleteTarget ? t("confirm.deleteMsg", { name: deleteTarget.name, sku: deleteTarget.sku }) : ""}
        confirmLabel={t("confirm.delete")}
        onConfirm={() => {
          if (deleteTarget) deleteProduct(deleteTarget.id);
          setDeleteTarget(null);
        }}
        onClose={() => setDeleteTarget(null)}
      />
    </main>
  );
}

function TabButton({ id, active, onClick, children }: { id: string; active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      role="tab"
      id={`tab-${id}`}
      aria-selected={active}
      aria-controls={`panel-${id}`}
      onClick={onClick}
      className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium ${
        active ? "border-accent text-fg" : "border-transparent text-muted hover:text-fg"
      }`}
    >
      {children}
    </button>
  );
}
