import { SEED_PRODUCTS } from "./seed";
import type { Product } from "./types";

const STORAGE_KEY = "jeanzeck:inventory:v1";

export function loadProducts(): Product[] {
  if (typeof window === "undefined") return SEED_PRODUCTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveProducts(SEED_PRODUCTS);
      return SEED_PRODUCTS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error("Stored inventory is not a list");
    return parsed as Product[];
  } catch {
    return SEED_PRODUCTS;
  }
}

export function saveProducts(products: Product[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch {
    // Writing can fail in private mode or when the quota is exceeded; the app
    // keeps working with in-memory state in that case.
  }
}

export function resetProducts(): Product[] {
  saveProducts(SEED_PRODUCTS);
  return SEED_PRODUCTS;
}
