"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowUpRight, Check, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCart, IVA_RATE } from "@/lib/cart-context";
import { formatMXN, type ProductPlan } from "@/lib/products";
import { useLanguage } from "@/lib/language-context";

export function ProductCard({
  product,
  index,
}: {
  product: ProductPlan;
  index: number;
}) {
  const { add, open } = useCart();
  const { t, lang } = useLanguage();
  const [dialogOpen, setDialogOpen] = useState(false);

  const data = product[lang];

  const handleAdd = () => {
    add(product);
    toast(t.store.addedToastTitle, {
      description: data.name,
      action: { label: t.store.viewCartBtn, onClick: () => open() },
    });
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-ink-2/30 bg-cream-paper p-4 transition-all duration-300 hover:-translate-y-1 hover:border-clay/40 hover:shadow-[0_12px_30px_rgba(0,229,255,0.1)] sm:p-5">
      <span className="pointer-events-none absolute right-4 top-3 z-10 display text-4xl font-bold text-ink/10 drop-shadow-sm transition-colors group-hover:text-clay/20">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-ink/5">
        <img
          src={product.imageUrl}
          alt={data.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-sm bg-ink/90 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-clay backdrop-blur">
          MXN {lang === "es" ? "+ IVA" : "+ TAX"}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-1 pt-5">
        <h3 className="display text-xl font-bold leading-snug text-ink">
          {data.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/60">
          {data.description}
        </p>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="display text-2xl font-bold text-clay-deep">
              {formatMXN(product.priceMXN)}
            </p>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink/50 mt-1">
              MXN · {lang === "es" ? "+ IVA" : "+ TAX"}
            </p>
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] font-semibold text-clay-deep transition-colors hover:text-clay"
              >
                {t.store.cardDetails}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </DialogTrigger>
            
            <DialogContent className="max-h-[92dvh] w-[95vw] max-w-2xl overflow-y-auto overflow-x-hidden rounded-xl border border-clay/20 bg-cream-paper p-0 sm:w-full [&>button]:right-4 [&>button]:top-4 [&>button]:z-50 [&>button]:rounded-md [&>button]:bg-ink/10 [&>button]:p-1.5 [&>button]:text-ink [&>button]:shadow-sm">
              <div className="grid gap-0 md:grid-cols-2">
                <div className="bg-sand/30 p-6">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-ink/5">
                    <img
                      src={product.imageUrl}
                      alt={data.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <DialogTitle className="display mt-5 text-2xl font-bold leading-tight text-ink">
                    {data.name}
                  </DialogTitle>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70 font-mono text-[0.8rem]">
                    {data.description}
                  </p>
                </div>
                <div className="flex flex-col p-6">
                  <p className="eyebrow text-clay-deep">{t.store.cardIncludes}</p>
                  <ul className="mt-4 flex-1 space-y-3">
                    {data.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-ink/80 font-medium">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-sm bg-clay/20 text-clay-deep border border-clay/30">
                          <Check className="h-3 w-3" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 border-t border-ink/10 pt-5">
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink/60 font-bold">
                        {t.store.cardTotalIva}
                      </span>
                      <span className="display text-2xl font-bold text-ink">
                        {formatMXN(product.priceMXN * (1 + IVA_RATE))} <span className="text-lg text-clay-deep">MXN</span>
                      </span>
                    </div>
                    <Button
                      className="mt-4 w-full bg-clay text-ink hover:bg-ink hover:text-cream-paper rounded-md font-bold"
                      size="lg"
                      onClick={() => {
                        handleAdd();
                        setDialogOpen(false);
                      }}
                    >
                      {t.store.cardHire}
                      <Plus className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Button onClick={handleAdd} className="mt-5 w-full bg-ink text-white hover:bg-clay-deep rounded-md">
          {t.store.cardHire}
          <Plus className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </article>
  );
}