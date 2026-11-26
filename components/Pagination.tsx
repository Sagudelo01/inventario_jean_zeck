"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  pageCount: number;
  total: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, pageCount, total, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-between text-sm text-zinc-500">
      <p>{total} product(s)</p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
          className="rounded-md border border-zinc-300 p-1.5 disabled:opacity-40"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="px-2">Page {page} of {pageCount}</span>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= pageCount}
          aria-label="Next page"
          className="rounded-md border border-zinc-300 p-1.5 disabled:opacity-40"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
