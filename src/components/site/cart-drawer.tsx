"use client";

import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, Sparkles } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart, IVA_RATE } from "@/lib/cart-context";
import { formatMXN } from "@/lib/products";
import { useLanguage } from "@/lib/language-context";

export function CartDrawer() {
  const {
    items,
    count,
    subtotal,
    iva,
    total,
    isOpen,
    close,
    setQty,
    remove,
    clear,
  } = useCart();
  const { t, lang } = useLanguage();

  return (
    <Sheet open={isOpen} onOpenChange={(o) => !o && close()}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 border-l border-slate-200 bg-[#F8FAFC] p-0 text-slate-900 sm:max-w-lg shadow-2xl backdrop-blur-3xl"
      >
        <SheetHeader className="relative overflow-hidden bg-gradient-to-br from-[#1E3A8A] via-[#3730A3] to-[#4F46E5] px-8 py-8 text-left text-white">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-blue-200 font-bold mb-2">
                <Sparkles className="h-3 w-3" /> {t.cart.title}
              </span>
              <SheetTitle className="display text-3xl font-extrabold text-white">
                {t.cart.selection}
              </SheetTitle>
            </div>
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 font-mono text-base font-bold text-white backdrop-blur-md border border-white/20">
              {String(count).padStart(2, "0")}
            </span>
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
            <div className="grid h-24 w-24 place-items-center rounded-3xl bg-blue-50 border border-blue-100 shadow-inner">
              <ShoppingBag className="h-10 w-10 text-blue-600/60" />
            </div>
            <div className="space-y-2">
              <p className="display text-2xl font-bold text-slate-900">
                {t.cart.emptyTitle}
              </p>
              <p className="text-sm text-slate-500 max-w-[280px]">
                {t.cart.emptyDesc}
              </p>
            </div>
            <Button asChild className="rounded-full bg-[#1E3A8A] px-8 py-6 text-base font-bold text-white hover:bg-blue-700 shadow-lg shadow-blue-900/20 transition-all hover:scale-105">
              <Link href="/servicios" onClick={close}>
                {t.cart.viewServices}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
              {items.map(({ product, qty }) => {
                const data = product[lang];
                
                return (
                  <div key={product.id} className="group relative flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all hover:border-blue-500/40 hover:shadow-md">
                    <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl bg-slate-100 shadow-inner">
                      <img src={product.imageUrl} alt={data.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-mono text-[0.55rem] uppercase tracking-widest text-[#1E3A8A] font-bold bg-blue-50 px-2 py-0.5 rounded-md">
                        {product.currency}
                      </span>
                      <p className="display mt-1.5 truncate text-base font-bold text-slate-900">
                        {data.name}
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50 p-0.5 shadow-sm">
                          <button
                            type="button"
                            onClick={() => setQty(product.id, qty - 1)}
                            className="grid h-7 w-7 place-items-center rounded-lg text-slate-600 hover:bg-white hover:text-[#1E3A8A] transition-all"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center font-mono text-xs font-bold text-slate-900">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(product.id, qty + 1)}
                            className="grid h-7 w-7 place-items-center rounded-lg text-slate-600 hover:bg-white hover:text-[#1E3A8A] transition-all"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="font-mono text-sm font-extrabold text-slate-900">
                          {formatMXN(product.priceMXN * qty)} <span className="text-[0.6rem] text-slate-400 font-normal">MXN</span>
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(product.id)}
                      aria-label={t.cart.removeAria}
                      className="absolute right-3 top-3 rounded-lg p-1.5 text-slate-300 hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="rounded-t-[2.5rem] border-t border-slate-200 bg-white px-8 py-8 shadow-[0_-10px_40px_rgba(0,0,0,0.04)]">
              <dl className="space-y-3 font-mono text-sm">
                <div className="flex justify-between text-slate-500 text-xs">
                  <dt>{t.cart.subtotal}</dt>
                  <dd className="font-bold text-slate-800">{formatMXN(subtotal)} MXN</dd>
                </div>
                <div className="flex justify-between text-slate-500 text-xs">
                  <dt>IVA ({Math.round(IVA_RATE * 100)}%)</dt>
                  <dd className="font-bold text-slate-800">{formatMXN(iva)} MXN</dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-slate-100 pt-4">
                  <dt className="display text-lg font-extrabold text-slate-900">
                    {t.cart.total}
                  </dt>
                  <dd className="display text-2xl font-black text-[#1E3A8A]">
                    {formatMXN(total)} <span className="text-sm font-bold text-slate-500">MXN</span>
                  </dd>
                </div>
              </dl>
              
              <div className="mt-6 space-y-3">
                <Button asChild size="lg" className="w-full rounded-2xl bg-gradient-to-r from-[#1E3A8A] to-[#4F46E5] py-7 text-base font-bold text-white hover:opacity-95 shadow-xl shadow-blue-900/20 transition-all hover:scale-[1.02]" onClick={close}>
                  <Link href="/checkout">
                    {t.cart.checkoutBtn}
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
                <button
                  type="button"
                  onClick={clear}
                  className="block w-full text-center font-mono text-[0.68rem] uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors pt-1 font-semibold"
                >
                  {t.cart.clearBtn}
                </button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}