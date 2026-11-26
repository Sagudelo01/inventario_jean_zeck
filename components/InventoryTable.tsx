"use client";

import { ArrowDown, ArrowUp, ArrowLeftRight, Pencil, Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { productStatus, type Product } from "@/lib/types";
import type { SortDirection, SortKey } from "@/lib/query";
import { StatusBadge } from "./StatusBadge";

interface InventoryTableProps {
  products: Product[];
  sortKey: SortKey;
  sortDirection: SortDirection;
  onSort: (key: SortKey) => void;
  onEdit: (product: Product) => void;
  onMove: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const COLUMNS: { key: SortKey; label: string; numeric?: boolean }[] = [
  { key: "sku", label: "SKU" },
  { key: "name", label: "Product" },
  { key: "category", label: "Category" },
  { key: "price", label: "Price", numeric: true },
  { key: "stock", label: "Stock", numeric: true },
];

export function InventoryTable({ products, sortKey, sortDirection, onSort, onEdit, onMove, onDelete }: InventoryTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-50 text-zinc-500">
          <tr>
            {COLUMNS.map((column) => {
              const active = sortKey === column.key;
              return (
                <th key={column.key} className={`px-4 py-3 font-medium ${column.numeric ? "text-right" : ""}`} aria-sort={active ? (sortDirection === "asc" ? "ascending" : "descending") : "none"}>
                  <button
                    type="button"
                    onClick={() => onSort(column.key)}
                    className={`inline-flex items-center gap-1 hover:text-zinc-900 ${column.numeric ? "flex-row-reverse" : ""}`}
                  >
                    {column.label}
                    {active ? (sortDirection === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />) : null}
                  </button>
                </th>
              );
            })}
            <th className="px-4 py-3 font-medium">Size / Color</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t border-zinc-100">
              <td className="px-4 py-3 font-mono text-xs">{product.sku}</td>
              <td className="px-4 py-3 font-medium">{product.name}</td>
              <td className="px-4 py-3">{product.category}</td>
              <td className="px-4 py-3 text-right">{formatCurrency(product.price)}</td>
              <td className="px-4 py-3 text-right tabular-nums">{product.stock}</td>
              <td className="px-4 py-3 text-zinc-600">{product.size} · {product.color}</td>
              <td className="px-4 py-3"><StatusBadge status={productStatus(product)} /></td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-1">
                  <button type="button" onClick={() => onMove(product)} aria-label={`Record movement for ${product.name}`} className="rounded-md p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900">
                    <ArrowLeftRight size={16} />
                  </button>
                  <button type="button" onClick={() => onEdit(product)} aria-label={`Edit ${product.name}`} className="rounded-md p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900">
                    <Pencil size={16} />
                  </button>
                  <button type="button" onClick={() => onDelete(product)} aria-label={`Delete ${product.name}`} className="rounded-md p-1.5 text-zinc-500 hover:bg-rose-50 hover:text-rose-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
