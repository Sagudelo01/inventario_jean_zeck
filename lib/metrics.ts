import { productStatus, type Movement, type Product } from "./types";

export interface InventoryMetrics {
  totalProducts: number;
  totalUnits: number;
  inventoryValue: number;
  lowStock: number;
  outOfStock: number;
}

export function computeMetrics(products: Product[]): InventoryMetrics {
  return products.reduce<InventoryMetrics>(
    (acc, product) => {
      const status = productStatus(product);
      acc.totalProducts += 1;
      acc.totalUnits += product.stock;
      acc.inventoryValue += product.price * product.stock;
      if (status === "low_stock") acc.lowStock += 1;
      if (status === "out_of_stock") acc.outOfStock += 1;
      return acc;
    },
    { totalProducts: 0, totalUnits: 0, inventoryValue: 0, lowStock: 0, outOfStock: 0 },
  );
}

export interface MovedProduct {
  productId: string;
  name: string;
  sku: string;
  unitsMoved: number;
}

export function mostMoved(movements: Movement[], limit = 5): MovedProduct[] {
  const totals = new Map<string, MovedProduct>();
  for (const movement of movements) {
    const current = totals.get(movement.productId) ?? {
      productId: movement.productId,
      name: movement.productName,
      sku: movement.sku,
      unitsMoved: 0,
    };
    current.unitsMoved += movement.quantity;
    totals.set(movement.productId, current);
  }
  return [...totals.values()].sort((a, b) => b.unitsMoved - a.unitsMoved).slice(0, limit);
}
