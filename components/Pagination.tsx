"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  pageCount: number;
  total: number;
  onPageChange: (page: number) => void;
}

const navButton = "rounded-md border border-border p-1.5 hover:bg-surface-2 disabled:opacity-40 disabled:hover:bg-transparent";

export function Pagination({ page, pageCount, total, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-between text-sm text-muted">
      <p>{total} product(s)</p>
      <div className="flex items-center gap-1">
        <button type="button" onClick={() => onPageChange(page - 1)} disabled={page <= 1} aria-label="Previous page" className={navButton}>
          <ChevronLeft size={16} />
        </button>
        <span className="px-2">Page {page} of {pageCount}</span>
        <button type="button" onClick={() => onPageChange(page + 1)} disabled={page >= pageCount} aria-label="Next page" className={navButton}>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
