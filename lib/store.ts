import { useSyncExternalStore } from "react";
import { loadMovements, loadProducts, saveMovements, saveProducts } from "./storage";
import { SEED_PRODUCTS } from "./seed";
import { toast } from "./toast";
import type { Movement, MovementType, Product } from "./types";
import type { ProductDraft } from "./validation";

const EMPTY_MOVEMENTS: Movement[] = [];

let products: Product[] | null = null;
let movements: Movement[] | null = null;
const listeners = new Set<() => void>();

function currentProducts(): Product[] {
  if (products === null) products = loadProducts();
  return products;
}

function currentMovements(): Movement[] {
  if (movements === null) movements = loadMovements();
  return movements;
}

function emit(): void {
  listeners.forEach((listener) => listener());
}

function commitProducts(next: Product[]): void {
  products = next;
  saveProducts(next);
}

function commitMovements(next: Movement[]): void {
  movements = next;
  saveMovements(next);
}

function newId(prefix: string): string {
  const random =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}-${random}`;
}

function draftToFields(draft: ProductDraft) {
  return {
    sku: draft.sku.trim(),
    name: draft.name.trim(),
    category: draft.category.trim(),
    size: draft.size.trim(),
    color: draft.color.trim(),
    price: Number(draft.price),
    stock: Math.trunc(Number(draft.stock)),
    lowStockThreshold: Math.trunc(Number(draft.lowStockThreshold)),
  };
}

export function createProduct(draft: ProductDraft): Product {
  const now = new Date().toISOString();
  const product: Product = { id: newId("p"), ...draftToFields(draft), createdAt: now, updatedAt: now };
  commitProducts([product, ...currentProducts()]);
  emit();
  toast("toast.created");
  return product;
}

export function updateProduct(id: string, draft: ProductDraft): void {
  const now = new Date().toISOString();
  commitProducts(
    currentProducts().map((p) => (p.id === id ? { ...p, ...draftToFields(draft), updatedAt: now } : p)),
  );
  emit();
  toast("toast.updated");
}

export function deleteProduct(id: string): void {
  commitProducts(currentProducts().filter((p) => p.id !== id));
  emit();
  toast("toast.deleted");
}

export function recordMovement(
  productId: string,
  type: MovementType,
  quantity: number,
  reason?: string,
): void {
  const product = currentProducts().find((p) => p.id === productId);
  if (!product || quantity <= 0) return;

  const delta = type === "in" ? quantity : -quantity;
  const resultingStock = Math.max(0, product.stock + delta);
  const now = new Date().toISOString();

  commitProducts(
    currentProducts().map((p) => (p.id === productId ? { ...p, stock: resultingStock, updatedAt: now } : p)),
  );

  const movement: Movement = {
    id: newId("m"),
    productId,
    sku: product.sku,
    productName: product.name,
    type,
    quantity,
    reason: reason?.trim() || undefined,
    resultingStock,
    createdAt: now,
  };
  commitMovements([movement, ...currentMovements()]);
  emit();
  toast("toast.movement");
}

export function resetInventory(): void {
  commitProducts(SEED_PRODUCTS);
  commitMovements([]);
  emit();
  toast("toast.reset");
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useProducts(): Product[] {
  return useSyncExternalStore(subscribe, currentProducts, () => SEED_PRODUCTS);
}

export function useMovements(): Movement[] {
  return useSyncExternalStore(subscribe, currentMovements, () => EMPTY_MOVEMENTS);
}
