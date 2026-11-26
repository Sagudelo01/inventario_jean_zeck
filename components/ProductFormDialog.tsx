"use client";

import { useState, type FormEvent } from "react";
import { createProduct, updateProduct } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { hasErrors, validateProduct, type ProductDraft, type ProductErrors } from "@/lib/validation";
import type { Product } from "@/lib/types";
import { Modal } from "./Modal";

interface ProductFormDialogProps {
  open: boolean;
  onClose: () => void;
  editing: Product | null;
  products: Product[];
}

const EMPTY_DRAFT: ProductDraft = {
  sku: "",
  name: "",
  category: "",
  size: "",
  color: "",
  price: "",
  stock: "",
  lowStockThreshold: "",
};

function toDraft(product: Product | null): ProductDraft {
  if (!product) return EMPTY_DRAFT;
  return {
    sku: product.sku,
    name: product.name,
    category: product.category,
    size: product.size,
    color: product.color,
    price: String(product.price),
    stock: String(product.stock),
    lowStockThreshold: String(product.lowStockThreshold),
  };
}

export function ProductFormDialog({ open, onClose, editing, products }: ProductFormDialogProps) {
  const t = useT();
  const [draft, setDraft] = useState<ProductDraft>(() => toDraft(editing));
  const [errors, setErrors] = useState<ProductErrors>({});
  const err = (key?: string) => (key ? t(key) : undefined);

  function update(field: keyof ProductDraft, value: string) {
    setDraft((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const found = validateProduct(draft, products, editing?.id);
    setErrors(found);
    if (hasErrors(found)) return;
    if (editing) updateProduct(editing.id, draft);
    else createProduct(draft);
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title={editing ? t("form.edit") : t("form.add")}>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label={t("form.name")} error={err(errors.name)}>
            <input className={inputClass(errors.name)} value={draft.name} onChange={(e) => update("name", e.target.value)} />
          </Field>
          <Field label={t("form.sku")} error={err(errors.sku)}>
            <input className={inputClass(errors.sku)} value={draft.sku} onChange={(e) => update("sku", e.target.value)} />
          </Field>
          <Field label={t("form.category")} error={err(errors.category)}>
            <input className={inputClass(errors.category)} value={draft.category} onChange={(e) => update("category", e.target.value)} />
          </Field>
          <Field label={t("form.size")} error={err(errors.size)}>
            <input className={inputClass(errors.size)} value={draft.size} onChange={(e) => update("size", e.target.value)} />
          </Field>
          <Field label={t("form.color")} error={err(errors.color)}>
            <input className={inputClass(errors.color)} value={draft.color} onChange={(e) => update("color", e.target.value)} />
          </Field>
          <Field label={t("form.price")} error={err(errors.price)}>
            <input type="number" step="0.01" min="0" className={inputClass(errors.price)} value={draft.price} onChange={(e) => update("price", e.target.value)} />
          </Field>
          <Field label={t("form.stock")} error={err(errors.stock)}>
            <input type="number" step="1" min="0" className={inputClass(errors.stock)} value={draft.stock} onChange={(e) => update("stock", e.target.value)} />
          </Field>
          <Field label={t("form.threshold")} error={err(errors.lowStockThreshold)}>
            <input type="number" step="1" min="0" className={inputClass(errors.lowStockThreshold)} value={draft.lowStockThreshold} onChange={(e) => update("lowStockThreshold", e.target.value)} />
          </Field>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-surface-2">
            {t("form.cancel")}
          </button>
          <button type="submit" className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-fg hover:opacity-90">
            {editing ? t("form.save") : t("form.create")}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function inputClass(error?: string): string {
  return `w-full rounded-md border bg-surface px-3 py-2 text-sm text-fg focus:outline-none ${
    error ? "border-rose-400 focus:border-rose-500" : "border-border focus:border-accent"
  }`;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-fg">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-rose-600 dark:text-rose-400">{error}</span> : null}
    </label>
  );
}
