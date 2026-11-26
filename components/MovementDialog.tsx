"use client";

import { useState, type FormEvent } from "react";
import { recordMovement } from "@/lib/store";
import type { MovementType, Product } from "@/lib/types";
import { Modal } from "./Modal";

interface MovementDialogProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
}

export function MovementDialog({ open, onClose, product }: MovementDialogProps) {
  const [type, setType] = useState<MovementType>("in");
  const [quantity, setQuantity] = useState("1");
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string>();

  if (!product) return null;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!product) return;
    const amount = Number(quantity);
    if (!Number.isInteger(amount) || amount <= 0) {
      setError("Enter a whole number greater than zero.");
      return;
    }
    if (type === "out" && amount > product.stock) {
      setError(`Only ${product.stock} unit(s) available.`);
      return;
    }
    recordMovement(product.id, type, amount, reason);
    onClose();
  }

  const tabClass = (active: boolean) =>
    `flex-1 rounded-md border px-3 py-2 text-sm font-medium ${
      active ? "border-accent bg-accent text-accent-fg" : "border-border bg-surface text-fg hover:bg-surface-2"
    }`;

  return (
    <Modal open={open} onClose={onClose} title="Record movement">
      <p className="mb-4 text-sm text-muted">
        {product.name} <span className="font-mono text-xs">{product.sku}</span> · current stock{" "}
        <span className="font-medium text-fg">{product.stock}</span>
      </p>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="flex gap-2">
          <button type="button" className={tabClass(type === "in")} onClick={() => setType("in")}>Stock in</button>
          <button type="button" className={tabClass(type === "out")} onClick={() => setType("out")}>Stock out</button>
        </div>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-fg">Quantity</span>
          <input
            type="number"
            min="1"
            step="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className={`w-full rounded-md border bg-surface px-3 py-2 text-sm text-fg focus:outline-none ${error ? "border-rose-400" : "border-border focus:border-accent"}`}
          />
          {error ? <span className="mt-1 block text-xs text-rose-600 dark:text-rose-400">{error}</span> : null}
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-fg">Reason <span className="text-muted">(optional)</span></span>
          <input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. new shipment, sale, correction"
            className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-fg placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </label>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-surface-2">Cancel</button>
          <button type="submit" className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-fg hover:opacity-90">Record</button>
        </div>
      </form>
    </Modal>
  );
}
