"use client";

import { Download, Plus, RotateCcw, Search } from "lucide-react";
import type { Filters } from "@/lib/query";

interface ToolbarProps {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  options: { categories: string[]; sizes: string[]; colors: string[] };
  onAdd: () => void;
  onExport: () => void;
  onReset: () => void;
}

const selectClass =
  "rounded-md border border-zinc-300 bg-white px-2 py-2 text-sm focus:border-zinc-500 focus:outline-none";

export function Toolbar({ filters, onChange, options, onAdd, onExport, onReset }: ToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <label className="relative flex-1 min-w-48">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
        <span className="sr-only">Search products</span>
        <input
          type="search"
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
          placeholder="Search by SKU, name or color"
          className="w-full rounded-md border border-zinc-300 bg-white py-2 pl-9 pr-3 text-sm focus:border-zinc-500 focus:outline-none"
        />
      </label>

      <select className={selectClass} value={filters.category} onChange={(e) => onChange({ category: e.target.value })} aria-label="Filter by category">
        <option value="">All categories</option>
        {options.categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select className={selectClass} value={filters.size} onChange={(e) => onChange({ size: e.target.value })} aria-label="Filter by size">
        <option value="">All sizes</option>
        {options.sizes.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <select className={selectClass} value={filters.color} onChange={(e) => onChange({ color: e.target.value })} aria-label="Filter by color">
        <option value="">All colors</option>
        {options.colors.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <label className="flex items-center gap-2 text-sm text-zinc-600">
        <input
          type="checkbox"
          checked={filters.lowStockOnly}
          onChange={(e) => onChange({ lowStockOnly: e.target.checked })}
          className="h-4 w-4 rounded border-zinc-300"
        />
        Low stock only
      </label>

      <div className="ml-auto flex items-center gap-2">
        <button type="button" onClick={onExport} className="flex items-center gap-1.5 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-medium hover:bg-zinc-50">
          <Download size={16} /> Export CSV
        </button>
        <button type="button" onClick={onReset} className="flex items-center gap-1.5 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-medium hover:bg-zinc-50">
          <RotateCcw size={16} /> Reset
        </button>
        <button type="button" onClick={onAdd} className="flex items-center gap-1.5 rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-700">
          <Plus size={16} /> Add product
        </button>
      </div>
    </div>
  );
}
