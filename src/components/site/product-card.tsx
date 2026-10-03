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
      <div className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 border border-slate-200/80 font-mono text-base font-black text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 shadow-sm">
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
        <span className="absolute bottom-3 left-3 rounded-xl bg-white/90 border border-white/20 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-blue-600 backdrop-blur-md font-bold shadow-md">
          MXN {lang === "es" ? "+ IVA" : "+ TAX"}
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-7">
        <h3 className="display text-2xl font-extrabold leading-tight text-slate-900 group-hover:text-blue-600 transition-colors">
          {data.name}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-500 font-medium">
          {data.description}
        </p>

        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
          <div>
            <p className="display text-3xl font-black text-slate-900 tracking-tight">
              {formatMXN(product.priceMXN)}
            </p>
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-slate-400 font-bold mt-0.5">
              MXN · {lang === "es" ? "+ IVA" : "+ TAX"}
            </p>
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 font-mono text-xs uppercase tracking-wider font-bold text-slate-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all shadow-sm"
              >
                {t.store.cardDetails}
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </DialogTrigger>
            
            <DialogContent className="max-h-[90dvh] w-[95vw] max-w-3xl overflow-y-auto rounded-[2.5rem] border border-slate-200 bg-white p-0 shadow-2xl">
              <div className="grid gap-0 md:grid-cols-2">
                <div className="bg-slate-900 p-8 text-white flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute -right-20 -bottom-20 h-60 w-60 rounded-full bg-blue-600/20 blur-3xl" />
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-800 shadow-2xl border border-white/10 mb-6">
                      <img src={product.imageUrl} alt={data.name} className="h-full w-full object-cover" />
                    </div>
                    <DialogTitle className="display text-3xl font-bold leading-tight text-white">
                      {data.name}
                    </DialogTitle>
                    <p className="mt-4 text-sm leading-relaxed text-slate-300 font-mono">
                      {product[lang].description}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col p-8 justify-between bg-white">
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <Layers className="h-4 w-4 text-blue-600" />
                      <p className="font-mono text-xs font-bold uppercase tracking-widest text-blue-600">{t.store.cardIncludes}</p>
                    </div>
                    <ul className="space-y-4">
                      {data.features.map((f) => (
                        <li key={f} className="flex items-start gap-3.5 text-sm text-slate-700 font-medium">
                          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600 border border-blue-200 shadow-sm">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-8 border-t border-slate-100 pt-6">
                    <div className="flex items-baseline justify-between mb-6">
                      <span className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold">
                        {t.store.cardTotalIva}
                      </span>
                      <span className="display text-3xl font-black text-slate-900">
                        {formatMXN(product.priceMXN * (1 + IVA_RATE))} <span className="text-base font-bold text-blue-600">MXN</span>
                      </span>
                    </div>
                    <Button
                      className="w-full rounded-2xl bg-blue-600 py-7 text-base font-bold text-white hover:bg-blue-700 shadow-xl shadow-blue-500/25 transition-all hover:scale-[1.02]"
                      onClick={() => {
                        handleAdd();
                        setDialogOpen(false);
                      }}
                    >
                      {t.store.cardHire}
                      <Plus className="h-5 w-5 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Button onClick={handleAdd} className="mt-6 w-full rounded-2xl bg-slate-900 py-6 text-sm font-bold text-white hover:bg-blue-600 transition-all shadow-md hover:shadow-xl hover:shadow-blue-600/20">
          {t.store.cardHire}
          <Plus className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </article>
  );
}