import type { Product } from "./types";

export interface ProductDraft {
  sku: string;
  name: string;
  category: string;
  size: string;
  color: string;
  price: string;
  stock: string;
  lowStockThreshold: string;
}

export type ProductErrors = Partial<Record<keyof ProductDraft, string>>;

const SKU_PATTERN = /^[A-Za-z0-9-]+$/;

function parseNumber(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === "") return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

export function validateProduct(
  draft: ProductDraft,
  products: Product[],
  editingId?: string,
): ProductErrors {
  const errors: ProductErrors = {};

  const sku = draft.sku.trim();
  if (!sku) {
    errors.sku = "err.sku.required";
  } else if (!SKU_PATTERN.test(sku)) {
    errors.sku = "err.sku.format";
  } else if (products.some((p) => p.sku.toLowerCase() === sku.toLowerCase() && p.id !== editingId)) {
    errors.sku = "err.sku.duplicate";
  }

  if (!draft.name.trim()) errors.name = "err.name.required";
  if (!draft.category.trim()) errors.category = "err.category.required";
  if (!draft.size.trim()) errors.size = "err.size.required";
  if (!draft.color.trim()) errors.color = "err.color.required";

  const price = parseNumber(draft.price);
  if (price === null) errors.price = "err.price.invalid";
  else if (price < 0) errors.price = "err.price.negative";

  const stock = parseNumber(draft.stock);
  if (stock === null) errors.stock = "err.stock.invalid";
  else if (stock < 0) errors.stock = "err.stock.negative";
  else if (!Number.isInteger(stock)) errors.stock = "err.stock.integer";

  const threshold = parseNumber(draft.lowStockThreshold);
  if (threshold === null) errors.lowStockThreshold = "err.threshold.invalid";
  else if (threshold < 0) errors.lowStockThreshold = "err.threshold.negative";
  else if (!Number.isInteger(threshold)) errors.lowStockThreshold = "err.threshold.integer";

  return errors;
}

export function hasErrors(errors: ProductErrors): boolean {
  return Object.keys(errors).length > 0;
}
