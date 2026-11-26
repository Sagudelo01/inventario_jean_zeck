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
    errors.sku = "SKU is required.";
  } else if (!SKU_PATTERN.test(sku)) {
    errors.sku = "Use letters, numbers and dashes only.";
  } else if (products.some((p) => p.sku.toLowerCase() === sku.toLowerCase() && p.id !== editingId)) {
    errors.sku = "This SKU already exists.";
  }

  if (!draft.name.trim()) errors.name = "Name is required.";
  if (!draft.category.trim()) errors.category = "Category is required.";
  if (!draft.size.trim()) errors.size = "Size is required.";
  if (!draft.color.trim()) errors.color = "Color is required.";

  const price = parseNumber(draft.price);
  if (price === null) errors.price = "Enter a valid price.";
  else if (price < 0) errors.price = "Price cannot be negative.";

  const stock = parseNumber(draft.stock);
  if (stock === null) errors.stock = "Enter a valid stock amount.";
  else if (stock < 0) errors.stock = "Stock cannot be negative.";
  else if (!Number.isInteger(stock)) errors.stock = "Stock must be a whole number.";

  const threshold = parseNumber(draft.lowStockThreshold);
  if (threshold === null) errors.lowStockThreshold = "Enter a low-stock threshold.";
  else if (threshold < 0) errors.lowStockThreshold = "Threshold cannot be negative.";
  else if (!Number.isInteger(threshold)) errors.lowStockThreshold = "Threshold must be a whole number.";

  return errors;
}

export function hasErrors(errors: ProductErrors): boolean {
  return Object.keys(errors).length > 0;
}
