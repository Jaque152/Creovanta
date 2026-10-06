"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowUpRight, Check, Plus, Layers } from "lucide-react";
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
  const taxLabel = lang === "es" ? "IVA" : "VAT";

  const handleAdd = () => {
    add(product);
    toast.success(t.store.addedToastTitle, {
      description: data.name,
      action: { label: t.store.viewCartBtn, onClick: () => open() },
    });
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white p-7 transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-[0_25px_60px_-15px_rgba(30,58,138,0.12)]">
      
      {/* Badge de Número Indexado */}
      <div className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200/80 bg-slate-50 font-mono text-base font-black text-slate-400 shadow-sm transition-all duration-300 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-inner">
        <img
          src={product.imageUrl}
          alt={data.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60" />
        <span className="absolute bottom-3 left-3 rounded-xl border border-white/20 bg-white/90 px-3 py-1 font-mono text-[0.65rem] font-bold uppercase tracking-widest text-blue-600 shadow-md backdrop-blur-md">
          MXN + {taxLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-7">
        <h3 className="display text-2xl font-extrabold leading-tight text-slate-900 transition-colors group-hover:text-blue-600">
          {data.name}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm font-medium leading-relaxed text-slate-500">
          {data.description}
        </p>

        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
          <div>
            <p className="display text-3xl font-black tracking-tight text-slate-900">
              {formatMXN(product.priceMXN)}
            </p>
            <p className="mt-0.5 font-mono text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
              MXN · + {taxLabel}
            </p>
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-700 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                {t.store.cardDetails}
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </DialogTrigger>
            
            <DialogContent className="max-h-[90dvh] w-[95vw] max-w-3xl overflow-y-auto rounded-[2.5rem] border border-slate-200 bg-white p-0 shadow-2xl">
              <div className="grid gap-0 md:grid-cols-2">
                <div className="relative flex flex-col justify-between overflow-hidden bg-slate-900 p-8 text-white">
                  <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-blue-600/20 blur-3xl" />
                  <div>
                    <div className="relative mb-6 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-800 shadow-2xl">
                      <img src={product.imageUrl} alt={data.name} className="h-full w-full object-cover" />
                    </div>
                    <DialogTitle className="display text-3xl font-bold leading-tight text-white">
                      {data.name}
                    </DialogTitle>
                    <p className="mt-4 font-mono text-sm leading-relaxed text-slate-300">
                      {data.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col justify-between bg-white p-8">
                  <div>
                    <div className="mb-6 flex items-center gap-2">
                      <Layers className="h-4 w-4 text-blue-600" />
                      <p className="font-mono text-xs font-bold uppercase tracking-widest text-blue-600">
                        {t.store.cardIncludes}
                      </p>
                    </div>
                    <ul className="space-y-4">
                      {data.features.map((f) => (
                        <li key={f} className="flex items-start gap-3.5 text-sm font-medium text-slate-700">
                          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-xl border border-blue-200 bg-blue-50 text-blue-600 shadow-sm">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-8 border-t border-slate-100 pt-6">
                    <div className="mb-6 flex items-baseline justify-between">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                        {t.store.cardTotalIva.replace("TAX", taxLabel).replace("IVA", taxLabel)}
                      </span>
                      <span className="display text-3xl font-black text-slate-900">
                        {formatMXN(product.priceMXN * (1 + IVA_RATE))}{" "}
                        <span className="text-base font-bold text-blue-600">MXN</span>
                      </span>
                    </div>
                    <Button
                      className="w-full rounded-2xl bg-blue-600 py-7 text-base font-bold text-white shadow-xl shadow-blue-500/25 transition-all hover:scale-[1.02] hover:bg-blue-700"
                      onClick={() => {
                        handleAdd();
                        setDialogOpen(false);
                      }}
                    >
                      {t.store.cardHire}
                      <Plus className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Button
          onClick={handleAdd}
          className="mt-6 w-full rounded-2xl bg-slate-900 py-6 text-sm font-bold text-white shadow-md transition-all hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-600/20"
        >
          {t.store.cardHire}
          <Plus className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </article>
  );
}