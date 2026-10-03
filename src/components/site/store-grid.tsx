"use client";

import { webPlans } from "@/lib/products";
import { ProductCard } from "./product-card";
import { useLanguage } from "@/lib/language-context";

export function StoreGrid() {
  const { t } = useLanguage();

  return (
    <div>
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
          {String(webPlans.length).padStart(2, "0")} {t.store.plansCountLabel}
        </p>
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {webPlans.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </div>
  );
}