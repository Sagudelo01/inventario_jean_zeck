"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useT } from "@/lib/i18n";

interface PaginationProps {
  page: number;
  pageCount: number;
  total: number;
  pageSize: number;
  pageSizes: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const navButton = "rounded-md border border-border p-1.5 hover:bg-surface-2 disabled:opacity-40 disabled:hover:bg-transparent";

export function Pagination({ page, pageCount, total, pageSize, pageSizes, onPageChange, onPageSizeChange }: PaginationProps) {
  const t = useT();
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
      <div className="flex items-center gap-3">
        <span>{t("page.count", { n: total })}</span>
        <label className="flex items-center gap-1.5">
          <span>{t("page.rows")}</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="rounded-md border border-border bg-surface px-2 py-1 text-fg focus:border-accent focus:outline-none"
          >
            {pageSizes.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="flex items-center gap-1">
        <button type="button" onClick={() => onPageChange(page - 1)} disabled={page <= 1} aria-label={t("page.prev")} className={navButton}>
          <ChevronLeft size={16} />
        </button>
        <span className="px-2">{t("page.of", { p: page, total: pageCount })}</span>
        <button type="button" onClick={() => onPageChange(page + 1)} disabled={page >= pageCount} aria-label={t("page.next")} className={navButton}>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
