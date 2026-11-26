import { useSyncExternalStore } from "react";

export interface Toast {
  id: number;
  messageKey: string;
}

export const TOAST_DURATION = 2600;

let toasts: Toast[] = [];
const EMPTY: Toast[] = [];
const listeners = new Set<() => void>();
let nextId = 1;

function emit(): void {
  listeners.forEach((listener) => listener());
}

export function toast(messageKey: string): void {
  const id = nextId++;
  toasts = [...toasts, { id, messageKey }];
  emit();
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    emit();
  }, TOAST_DURATION);
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useToasts(): Toast[] {
  return useSyncExternalStore(subscribe, () => toasts, () => EMPTY);
}
