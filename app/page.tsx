"use client";

import { useProducts } from "@/lib/store";
import { formatCurrency } from "@/lib/format";
import { productStatus, STATUS_LABELS, type ProductStatus } from "@/lib/types";

const STATUS_STYLES: Record<ProductStatus, string> = {
  in_stock: "bg-emerald-100 text-emerald-700",
  low_stock: "bg-amber-100 text-amber-700",
  out_of_stock: "bg-rose-100 text-rose-700",
};

export default function Page() {
  const products = useProducts();

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">Jean Zeck Inventory</h1>
        <p className="text-sm text-zinc-500">Clothing stock overview</p>
      </header>

      {products.length === 0 ? (
        <p className="text-sm text-zinc-500">No products yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-zinc-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 text-zinc-500">
              <tr>
                <th className="px-4 py-3 font-medium">SKU</th>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Size</th>
                <th className="px-4 py-3 font-medium">Color</th>
                <th className="px-4 py-3 text-right font-medium">Price</th>
                <th className="px-4 py-3 text-right font-medium">Stock</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const status = productStatus(product);
                return (
                  <tr key={product.id} className="border-t border-zinc-100">
                    <td className="px-4 py-3 font-mono text-xs">{product.sku}</td>
                    <td className="px-4 py-3">{product.name}</td>
                    <td className="px-4 py-3">{product.category}</td>
                    <td className="px-4 py-3">{product.size}</td>
                    <td className="px-4 py-3">{product.color}</td>
                    <td className="px-4 py-3 text-right">{formatCurrency(product.price)}</td>
                    <td className="px-4 py-3 text-right">{product.stock}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}>
                        {STATUS_LABELS[status]}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
