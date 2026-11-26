import { useSyncExternalStore } from "react";

export type Lang = "en" | "es";

const STORAGE_KEY = "jeanzeck:lang";

type Dict = Record<string, string>;

const en: Dict = {
  "app.title": "Inventory",
  "app.subtitle": "Clothing stock, movements and metrics",
  "metric.value": "Inventory value",
  "metric.value.hint": "{n} units in stock",
  "metric.products": "Products",
  "metric.products.hint": "distinct SKUs",
  "metric.low": "Low stock",
  "metric.low.hint": "at or below threshold",
  "metric.out": "Out of stock",
  "metric.out.hint": "need restocking",
  "metric.moved": "Most moved",
  "metric.moved.empty": "No movements recorded yet.",
  "metric.moved.units": "{n} units",
  "metric.byCategory": "Value by category",
  "alert.restock": "{n} product(s) need restocking:",
  "alert.more": " and {n} more",
  "alert.review": "Review",
  "tab.inventory": "Inventory",
  "tab.movements": "Movements",
  "toolbar.search": "Search by SKU, name or color",
  "toolbar.allCategories": "All categories",
  "toolbar.allSizes": "All sizes",
  "toolbar.allColors": "All colors",
  "toolbar.lowOnly": "Low stock only",
  "toolbar.export": "Export",
  "toolbar.reset": "Reset",
  "toolbar.add": "Add product",
  "toolbar.addShort": "Add",
  "col.sku": "SKU",
  "col.product": "Product",
  "col.category": "Category",
  "col.price": "Price",
  "col.stock": "Stock",
  "col.sizeColor": "Size / Color",
  "col.status": "Status",
  "col.actions": "Actions",
  "action.move": "Record movement for {name}",
  "action.edit": "Edit {name}",
  "action.delete": "Delete {name}",
  "status.in_stock": "In stock",
  "status.low_stock": "Low stock",
  "status.out_of_stock": "Out of stock",
  "page.count": "{n} product(s)",
  "page.of": "Page {p} of {total}",
  "page.prev": "Previous page",
  "page.next": "Next page",
  "page.rows": "Rows",
  "empty.filters": "No products match the current filters.",
  "mv.empty": "No movements recorded yet. Use the movement action on a product to log stock in or out.",
  "mv.date": "Date",
  "mv.product": "Product",
  "mv.type": "Type",
  "mv.qty": "Quantity",
  "mv.result": "Resulting stock",
  "mv.reason": "Reason",
  "mv.in": "In",
  "mv.out": "Out",
  "mv.exportCsv": "Export CSV",
  "form.add": "Add product",
  "form.edit": "Edit product",
  "form.name": "Name",
  "form.sku": "SKU",
  "form.category": "Category",
  "form.size": "Size",
  "form.color": "Color",
  "form.price": "Price (USD)",
  "form.stock": "Stock",
  "form.threshold": "Low-stock threshold",
  "form.cancel": "Cancel",
  "form.save": "Save changes",
  "form.create": "Add product",
  "movement.title": "Record movement",
  "movement.currentStock": "current stock",
  "movement.stockIn": "Stock in",
  "movement.stockOut": "Stock out",
  "movement.quantity": "Quantity",
  "movement.reason": "Reason",
  "movement.optional": "(optional)",
  "movement.reasonPlaceholder": "e.g. new shipment, sale, correction",
  "movement.record": "Record",
  "confirm.deleteTitle": "Delete product",
  "confirm.deleteMsg": '“{name}” ({sku}) will be removed. This cannot be undone.',
  "confirm.delete": "Delete",
  "err.sku.required": "SKU is required.",
  "err.sku.format": "Use letters, numbers and dashes only.",
  "err.sku.duplicate": "This SKU already exists.",
  "err.name.required": "Name is required.",
  "err.category.required": "Category is required.",
  "err.size.required": "Size is required.",
  "err.color.required": "Color is required.",
  "err.price.invalid": "Enter a valid price.",
  "err.price.negative": "Price cannot be negative.",
  "err.stock.invalid": "Enter a valid stock amount.",
  "err.stock.negative": "Stock cannot be negative.",
  "err.stock.integer": "Stock must be a whole number.",
  "err.threshold.invalid": "Enter a low-stock threshold.",
  "err.threshold.negative": "Threshold cannot be negative.",
  "err.threshold.integer": "Threshold must be a whole number.",
  "err.qty.invalid": "Enter a whole number greater than zero.",
  "err.qty.available": "Only {n} unit(s) available.",
  "toast.created": "Product added",
  "toast.updated": "Product updated",
  "toast.deleted": "Product deleted",
  "toast.movement": "Movement recorded",
  "toast.reset": "Inventory reset",
  "toast.exported": "CSV downloaded",
  "theme.toggle": "Toggle light and dark theme",
  "lang.toggle": "Switch language",
  "skip": "Skip to content",
  "error.title": "Something went wrong",
  "error.body": "The inventory could not be displayed. You can try again; your saved data is not affected.",
  "error.retry": "Try again",
  "notfound.title": "Page not found",
  "notfound.body": "The page you are looking for does not exist.",
  "notfound.back": "Back to inventory",
};

const es: Dict = {
  "app.title": "Inventario",
  "app.subtitle": "Stock de ropa, movimientos y métricas",
  "metric.value": "Valor del inventario",
  "metric.value.hint": "{n} unidades en stock",
  "metric.products": "Productos",
  "metric.products.hint": "SKUs distintos",
  "metric.low": "Stock bajo",
  "metric.low.hint": "en o bajo el umbral",
  "metric.out": "Agotados",
  "metric.out.hint": "a reponer",
  "metric.moved": "Más movidos",
  "metric.moved.empty": "Aún no hay movimientos.",
  "metric.moved.units": "{n} unidades",
  "metric.byCategory": "Valor por categoría",
  "alert.restock": "{n} producto(s) a reponer:",
  "alert.more": " y {n} más",
  "alert.review": "Revisar",
  "tab.inventory": "Inventario",
  "tab.movements": "Movimientos",
  "toolbar.search": "Buscar por SKU, nombre o color",
  "toolbar.allCategories": "Todas las categorías",
  "toolbar.allSizes": "Todas las tallas",
  "toolbar.allColors": "Todos los colores",
  "toolbar.lowOnly": "Solo stock bajo",
  "toolbar.export": "Exportar",
  "toolbar.reset": "Restablecer",
  "toolbar.add": "Agregar producto",
  "toolbar.addShort": "Agregar",
  "col.sku": "SKU",
  "col.product": "Producto",
  "col.category": "Categoría",
  "col.price": "Precio",
  "col.stock": "Stock",
  "col.sizeColor": "Talla / Color",
  "col.status": "Estado",
  "col.actions": "Acciones",
  "action.move": "Registrar movimiento de {name}",
  "action.edit": "Editar {name}",
  "action.delete": "Eliminar {name}",
  "status.in_stock": "En stock",
  "status.low_stock": "Stock bajo",
  "status.out_of_stock": "Agotado",
  "page.count": "{n} producto(s)",
  "page.of": "Página {p} de {total}",
  "page.prev": "Página anterior",
  "page.next": "Página siguiente",
  "page.rows": "Filas",
  "empty.filters": "Ningún producto coincide con los filtros.",
  "mv.empty": "Aún no hay movimientos. Usa la acción de movimiento en un producto para registrar entradas o salidas.",
  "mv.date": "Fecha",
  "mv.product": "Producto",
  "mv.type": "Tipo",
  "mv.qty": "Cantidad",
  "mv.result": "Stock resultante",
  "mv.reason": "Motivo",
  "mv.in": "Entrada",
  "mv.out": "Salida",
  "mv.exportCsv": "Exportar CSV",
  "form.add": "Agregar producto",
  "form.edit": "Editar producto",
  "form.name": "Nombre",
  "form.sku": "SKU",
  "form.category": "Categoría",
  "form.size": "Talla",
  "form.color": "Color",
  "form.price": "Precio (USD)",
  "form.stock": "Stock",
  "form.threshold": "Umbral de stock bajo",
  "form.cancel": "Cancelar",
  "form.save": "Guardar cambios",
  "form.create": "Agregar producto",
  "movement.title": "Registrar movimiento",
  "movement.currentStock": "stock actual",
  "movement.stockIn": "Entrada",
  "movement.stockOut": "Salida",
  "movement.quantity": "Cantidad",
  "movement.reason": "Motivo",
  "movement.optional": "(opcional)",
  "movement.reasonPlaceholder": "ej. nuevo envío, venta, corrección",
  "movement.record": "Registrar",
  "confirm.deleteTitle": "Eliminar producto",
  "confirm.deleteMsg": "Se eliminará “{name}” ({sku}). No se puede deshacer.",
  "confirm.delete": "Eliminar",
  "err.sku.required": "El SKU es obligatorio.",
  "err.sku.format": "Usa solo letras, números y guiones.",
  "err.sku.duplicate": "Este SKU ya existe.",
  "err.name.required": "El nombre es obligatorio.",
  "err.category.required": "La categoría es obligatoria.",
  "err.size.required": "La talla es obligatoria.",
  "err.color.required": "El color es obligatorio.",
  "err.price.invalid": "Ingresa un precio válido.",
  "err.price.negative": "El precio no puede ser negativo.",
  "err.stock.invalid": "Ingresa un stock válido.",
  "err.stock.negative": "El stock no puede ser negativo.",
  "err.stock.integer": "El stock debe ser un número entero.",
  "err.threshold.invalid": "Ingresa un umbral de stock bajo.",
  "err.threshold.negative": "El umbral no puede ser negativo.",
  "err.threshold.integer": "El umbral debe ser un número entero.",
  "err.qty.invalid": "Ingresa un número entero mayor que cero.",
  "err.qty.available": "Solo hay {n} unidad(es) disponible(s).",
  "toast.created": "Producto agregado",
  "toast.updated": "Producto actualizado",
  "toast.deleted": "Producto eliminado",
  "toast.movement": "Movimiento registrado",
  "toast.reset": "Inventario restablecido",
  "toast.exported": "CSV descargado",
  "theme.toggle": "Cambiar tema claro/oscuro",
  "lang.toggle": "Cambiar idioma",
  "skip": "Saltar al contenido",
  "error.title": "Algo salió mal",
  "error.body": "No se pudo mostrar el inventario. Puedes reintentar; tus datos guardados no se ven afectados.",
  "error.retry": "Reintentar",
  "notfound.title": "Página no encontrada",
  "notfound.body": "La página que buscas no existe.",
  "notfound.back": "Volver al inventario",
};

const DICTS: Record<Lang, Dict> = { en, es };

let lang: Lang | null = null;
const listeners = new Set<() => void>();

function loadLang(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "es") return saved;
  } catch {
    // ignore
  }
  return typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("es") ? "es" : "en";
}

function currentLang(): Lang {
  if (lang === null) lang = loadLang();
  return lang;
}

export function setLang(next: Lang): void {
  lang = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // ignore
  }
  document.documentElement.lang = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useLang(): Lang {
  return useSyncExternalStore(subscribe, currentLang, () => "en");
}

function format(text: string, params?: Record<string, string | number>): string {
  if (!params) return text;
  return text.replace(/\{(\w+)\}/g, (_, key) => (params[key] != null ? String(params[key]) : `{${key}}`));
}

export type TranslateFn = (key: string, params?: Record<string, string | number>) => string;

export function useT(): TranslateFn {
  const current = useLang();
  return (key, params) => format(DICTS[current][key] ?? DICTS.en[key] ?? key, params);
}
