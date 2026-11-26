import { useSyncExternalStore } from "react";
import { loadProducts, saveProducts } from "./storage";
import { SEED_PRODUCTS } from "./seed";
import type { Product } from "./types";

let products: Product[] | null = null;
const listeners = new Set<() => void>();

function ensureLoaded(): Product[] {
  if (products === null) products = loadProducts();
  return products;
}

function commit(next: Product[]): void {
  products = next;
  saveProducts(next);
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): Product[] {
  return ensureLoaded();
}

function getServerSnapshot(): Product[] {
  return SEED_PRODUCTS;
}

export function resetInventory(): void {
  commit(SEED_PRODUCTS);
}

export function useProducts(): Product[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
