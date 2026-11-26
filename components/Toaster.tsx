"use client";

import { CheckCircle2 } from "lucide-react";
import { useT } from "@/lib/i18n";
import { TOAST_DURATION, useToasts } from "@/lib/toast";

export function Toaster() {
  const toasts = useToasts();
  const t = useT();

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-2" aria-live="polite">
      {toasts.map((item) => (
        <div
          key={item.id}
          data-toast
          style={{ animation: `toast-life ${TOAST_DURATION}ms ease forwards` }}
          className="pointer-events-auto flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm shadow-lg"
        >
          <CheckCircle2 size={16} className="text-emerald-500" />
          {t(item.messageKey)}
        </div>
      ))}
    </div>
  );
}
