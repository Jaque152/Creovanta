"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Tag, X, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";

export function CouponInput({ compact = false }: { compact?: boolean }) {
  const { coupon, applyCoupon, removeCoupon } = useCart();
  const { t, lang } = useLanguage();
  const [code, setCode] = useState("");

  const handleApply = () => {
    if (!code.trim()) return;
    const res = applyCoupon(code);
    if (res.ok) {
      toast.success(t.coupon.appliedTitle, {
        description: coupon?.label[lang] ?? code.toUpperCase(),
      });
      setCode("");
    } else {
      toast.error(t.coupon.invalidTitle, {
        description: res.message || t.coupon.invalidDesc,
      });
    }
  };

  if (coupon) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-500 text-white">
            <Check className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-mono text-xs font-black uppercase tracking-widest text-emerald-700">
              {coupon.code}
            </p>
            <p className="truncate text-[0.72rem] font-semibold text-emerald-600">
              {coupon.label[lang]}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={removeCoupon}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-xl text-emerald-700 transition hover:bg-emerald-100"
          aria-label={t.coupon.removeAria}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className={compact ? "flex items-center gap-2" : "space-y-2"}>
      <div className="relative flex-1">
        <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === "Enter" && handleApply()}
          placeholder={t.coupon.placeholder}
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 font-mono text-sm font-bold uppercase tracking-wider text-slate-900 outline-none transition focus:border-[#1E3A8A] focus:bg-white focus:ring-4 focus:ring-blue-900/10"
        />
      </div>
      <button
        type="button"
        onClick={handleApply}
        className="h-11 shrink-0 rounded-xl bg-[#1E3A8A] px-5 font-mono text-xs font-bold uppercase tracking-wider text-white transition hover:bg-blue-700"
      >
        {t.coupon.apply}
      </button>
    </div>
  );
}