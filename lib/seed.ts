import type { Product } from "./types";

type SeedProduct = Omit<Product, "createdAt" | "updatedAt">;

const CREATED_AT = "2025-01-10T09:00:00.000Z";

const items: SeedProduct[] = [
  { id: "p-1001", sku: "JN-SLIM-BLU-32", name: "Slim Fit Jeans", category: "Jeans", size: "32", color: "Indigo", price: 49.9, stock: 24, lowStockThreshold: 6 },
  { id: "p-1002", sku: "JN-SLIM-BLK-30", name: "Slim Fit Jeans", category: "Jeans", size: "30", color: "Black", price: 49.9, stock: 4, lowStockThreshold: 6 },
  { id: "p-1003", sku: "JN-MOM-LBL-28", name: "Mom Jeans", category: "Jeans", size: "28", color: "Light Blue", price: 54.0, stock: 0, lowStockThreshold: 5 },
  { id: "p-1004", sku: "JN-STR-GRY-34", name: "Straight Jeans", category: "Jeans", size: "34", color: "Grey", price: 52.5, stock: 17, lowStockThreshold: 6 },
  { id: "p-1005", sku: "JK-DEN-BLU-M", name: "Denim Jacket", category: "Jackets", size: "M", color: "Indigo", price: 79.0, stock: 9, lowStockThreshold: 4 },
  { id: "p-1006", sku: "JK-DEN-BLU-L", name: "Denim Jacket", category: "Jackets", size: "L", color: "Indigo", price: 79.0, stock: 3, lowStockThreshold: 4 },
  { id: "p-1007", sku: "SH-OXF-WHT-M", name: "Oxford Shirt", category: "Shirts", size: "M", color: "White", price: 39.0, stock: 31, lowStockThreshold: 8 },
  { id: "p-1008", sku: "SH-OXF-BLU-L", name: "Oxford Shirt", category: "Shirts", size: "L", color: "Sky Blue", price: 39.0, stock: 12, lowStockThreshold: 8 },
  { id: "p-1009", sku: "TS-BAS-WHT-M", name: "Basic Tee", category: "T-Shirts", size: "M", color: "White", price: 15.0, stock: 48, lowStockThreshold: 12 },
  { id: "p-1010", sku: "TS-BAS-BLK-S", name: "Basic Tee", category: "T-Shirts", size: "S", color: "Black", price: 15.0, stock: 7, lowStockThreshold: 12 },
  { id: "p-1011", sku: "TS-GRA-GRN-L", name: "Graphic Tee", category: "T-Shirts", size: "L", color: "Green", price: 19.9, stock: 0, lowStockThreshold: 10 },
  { id: "p-1012", sku: "HD-PUL-GRY-M", name: "Pullover Hoodie", category: "Hoodies", size: "M", color: "Grey", price: 59.0, stock: 15, lowStockThreshold: 6 },
  { id: "p-1013", sku: "HD-ZIP-NVY-XL", name: "Zip Hoodie", category: "Hoodies", size: "XL", color: "Navy", price: 64.0, stock: 2, lowStockThreshold: 6 },
  { id: "p-1014", sku: "AC-BELT-BRN-U", name: "Leather Belt", category: "Accessories", size: "One size", color: "Brown", price: 24.5, stock: 20, lowStockThreshold: 8 },
  { id: "p-1015", sku: "AC-CAP-BLK-U", name: "Logo Cap", category: "Accessories", size: "One size", color: "Black", price: 18.0, stock: 5, lowStockThreshold: 8 },
  { id: "p-1016", sku: "JN-SKT-BLK-S", name: "Denim Skirt", category: "Jeans", size: "S", color: "Black", price: 44.0, stock: 11, lowStockThreshold: 5 },
];

export const SEED_PRODUCTS: Product[] = items.map((item) => ({
  ...item,
  createdAt: CREATED_AT,
  updatedAt: CREATED_AT,
}));
