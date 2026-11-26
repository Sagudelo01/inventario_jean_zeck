import { productStatus, STATUS_LABELS, type Movement, type Product } from "./types";

function toCsvRow(values: (string | number)[]): string {
  return values
    .map((value) => {
      const text = String(value);
      return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
    })
    .join(",");
}

export function productsToCsv(products: Product[]): string {
  const header = ["SKU", "Name", "Category", "Size", "Color", "Price", "Stock", "Status"];
  const rows = products.map((product) =>
    toCsvRow([
      product.sku,
      product.name,
      product.category,
      product.size,
      product.color,
      product.price.toFixed(2),
      product.stock,
      STATUS_LABELS[productStatus(product)],
    ]),
  );
  return [toCsvRow(header), ...rows].join("\n");
}

export function movementsToCsv(movements: Movement[]): string {
  const header = ["Date", "SKU", "Product", "Type", "Quantity", "Resulting stock", "Reason"];
  const rows = movements.map((m) =>
    toCsvRow([
      m.createdAt,
      m.sku,
      m.productName,
      m.type,
      m.quantity,
      m.resultingStock,
      m.reason ?? "",
    ]),
  );
  return [toCsvRow(header), ...rows].join("\n");
}

export function downloadCsv(filename: string, csv: string): void {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
