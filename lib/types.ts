export type ProductStatus = "in_stock" | "low_stock" | "out_of_stock";

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  size: string;
  color: string;
  price: number;
  stock: number;
  lowStockThreshold: number;
  createdAt: string;
  updatedAt: string;
}

export function productStatus(product: Product): ProductStatus {
  if (product.stock <= 0) return "out_of_stock";
  if (product.stock <= product.lowStockThreshold) return "low_stock";
  return "in_stock";
}

export const STATUS_LABELS: Record<ProductStatus, string> = {
  in_stock: "In stock",
  low_stock: "Low stock",
  out_of_stock: "Out of stock",
};

export type MovementType = "in" | "out";

export interface Movement {
  id: string;
  productId: string;
  sku: string;
  productName: string;
  type: MovementType;
  quantity: number;
  reason?: string;
  resultingStock: number;
  createdAt: string;
}
