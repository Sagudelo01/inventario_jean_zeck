import { SEED_PRODUCTS } from "./seed";
import type { Movement, Product } from "./types";

const PRODUCTS_KEY = "jeanzeck:inventory:v1";
const MOVEMENTS_KEY = "jeanzeck:movements:v1";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error("Stored value is not a list");
    return parsed as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Writing can fail in private mode or when the quota is exceeded; the app
    // keeps working with in-memory state in that case.
  }
}

export function loadProducts(): Product[] {
  if (typeof window === "undefined") return SEED_PRODUCTS;
  const raw = window.localStorage.getItem(PRODUCTS_KEY);
  if (raw === null) {
    saveProducts(SEED_PRODUCTS);
    return SEED_PRODUCTS;
  }
  return read<Product[]>(PRODUCTS_KEY, SEED_PRODUCTS);
}

export function saveProducts(products: Product[]): void {
  write(PRODUCTS_KEY, products);
}

export function loadMovements(): Movement[] {
  return read<Movement[]>(MOVEMENTS_KEY, []);
}

export function saveMovements(movements: Movement[]): void {
  write(MOVEMENTS_KEY, movements);
}
