"use client";

import { Download, Plus, RotateCcw, Search } from "lucide-react";
import { useT } from "@/lib/i18n";
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
  "rounded-md border border-border bg-surface px-2 py-2 text-sm text-fg focus:border-accent focus:outline-none";
const ghostButton =
  "flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-2 text-sm font-medium hover:bg-surface-2";

export function Toolbar({ filters, onChange, options, onAdd, onExport, onReset }: ToolbarProps) {
  const t = useT();
  return (
    <div className="flex flex-wrap items-center gap-3">
      <label className="relative min-w-48 flex-1">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <span className="sr-only">{t("toolbar.search")}</span>
        <input
          type="search"
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
          placeholder={t("toolbar.search")}
          className="w-full rounded-md border border-border bg-surface py-2 pl-9 pr-3 text-sm text-fg placeholder:text-muted focus:border-accent focus:outline-none"
        />
      </label>

      <select className={selectClass} value={filters.category} onChange={(e) => onChange({ category: e.target.value })} aria-label={t("toolbar.allCategories")}>
        <option value="">{t("toolbar.allCategories")}</option>
        {options.categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select className={selectClass} value={filters.size} onChange={(e) => onChange({ size: e.target.value })} aria-label={t("toolbar.allSizes")}>
        <option value="">{t("toolbar.allSizes")}</option>
        {options.sizes.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <select className={selectClass} value={filters.color} onChange={(e) => onChange({ color: e.target.value })} aria-label={t("toolbar.allColors")}>
        <option value="">{t("toolbar.allColors")}</option>
        {options.colors.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <label className="flex items-center gap-2 text-sm text-muted">
        <input
          type="checkbox"
          checked={filters.lowStockOnly}
          onChange={(e) => onChange({ lowStockOnly: e.target.checked })}
          className="h-4 w-4 rounded border-border accent-accent"
        />
        {t("toolbar.lowOnly")}
      </label>

      <div className="ml-auto flex items-center gap-2">
        <button type="button" onClick={onExport} className={ghostButton}>
          <Download size={16} /> <span className="hidden sm:inline">{t("toolbar.export")}</span> CSV
        </button>
        <button type="button" onClick={onReset} className={ghostButton}>
          <RotateCcw size={16} /> {t("toolbar.reset")}
        </button>
        <button type="button" onClick={onAdd} className="flex items-center gap-1.5 rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-fg hover:opacity-90">
          <Plus size={16} /> <span className="hidden sm:inline">{t("toolbar.add")}</span><span className="sm:hidden">{t("toolbar.addShort")}</span>
        </button>
      </div>
    </div>
  );
}
