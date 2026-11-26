import { productStatus, type Product } from "./types";

export interface Filters {
  search: string;
  category: string;
  size: string;
  color: string;
  lowStockOnly: boolean;
}

export const EMPTY_FILTERS: Filters = {
  search: "",
  category: "",
  size: "",
  color: "",
  lowStockOnly: false,
};

export type SortKey = "name" | "sku" | "category" | "price" | "stock";
export type SortDirection = "asc" | "desc";

export function uniqueValues(products: Product[], key: "category" | "size" | "color"): string[] {
  return [...new Set(products.map((p) => p[key]))].sort((a, b) => a.localeCompare(b));
}

export function filterProducts(products: Product[], filters: Filters): Product[] {
  const search = filters.search.trim().toLowerCase();
  return products.filter((product) => {
    if (search) {
      const haystack = `${product.sku} ${product.name} ${product.color}`.toLowerCase();
      if (!haystack.includes(search)) return false;
    }
    if (filters.category && product.category !== filters.category) return false;
    if (filters.size && product.size !== filters.size) return false;
    if (filters.color && product.color !== filters.color) return false;
    if (filters.lowStockOnly && productStatus(product) === "in_stock") return false;
    return true;
  });
}

export function sortProducts(products: Product[], key: SortKey, direction: SortDirection): Product[] {
  const factor = direction === "asc" ? 1 : -1;
  return [...products].sort((a, b) => {
    if (key === "price" || key === "stock") return (a[key] - b[key]) * factor;
    return a[key].localeCompare(b[key]) * factor;
  });
}

export interface Page<T> {
  items: T[];
  page: number;
  pageCount: number;
  total: number;
}

export function paginate<T>(items: T[], page: number, pageSize: number): Page<T> {
  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), pageCount);
  const start = (safePage - 1) * pageSize;
  return { items: items.slice(start, start + pageSize), page: safePage, pageCount, total };
}
