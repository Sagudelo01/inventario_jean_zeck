"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useT } from "@/lib/i18n";

interface PaginationProps {
  page: number;
  pageCount: number;
  total: number;
  onPageChange: (page: number) => void;
}

const navButton = "rounded-md border border-border p-1.5 hover:bg-surface-2 disabled:opacity-40 disabled:hover:bg-transparent";

export function Pagination({ page, pageCount, total, onPageChange }: PaginationProps) {
  const t = useT();
  return (
    <div className="flex items-center justify-between text-sm text-muted">
      <p>{t("page.count", { n: total })}</p>
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
