"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowRight,
  Check,
  Lock,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCart, IVA_RATE } from "@/lib/cart-context";
import { formatMXN } from "@/lib/products";
import { useLanguage } from "@/lib/language-context";
import { CouponInput } from "./coupon-input";
import {
  processCheckout,
  type CheckoutFormState,
  type CheckoutItem,
} from "@/app/actions/checkout";

const REQUIRED: (keyof CheckoutFormState)[] = [
  "nombre",
  "apellidos",
  "email",
  "telefono",
  "direccion",
  "ciudad",
  "estado",
  "cp",
  "card",
  "cardName",
  "exp",
  "cvc",
];

function Field({
  label,
  children,
  error,
  className,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider text-slate-700">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 font-mono text-[0.66rem] font-bold uppercase tracking-wide text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

function SectionTitle({ n, title }: { n: string; title: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="grid h-8 w-8 place-items-center rounded-xl border border-blue-200 bg-blue-50 font-mono text-xs font-bold text-blue-600">
        {n}
      </span>
      <h2 className="display text-xl font-bold text-slate-900">{title}</h2>
    </div>
  );
}

const inputBase =
  "flex h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-900 transition-all focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-600/15";

export function CheckoutClient() {
  const {
    items,
    subtotal,
    discountAmount,
    iva,
    total,
    coupon,
    hydrated,
    setQty,
    remove,
    clear,
  } = useCart();
  const { t, lang } = useLanguage();

  const [form, setForm] = useState<Partial<CheckoutFormState>>({ pais: "México" });
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormState, string>>>({});
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<{ no: string; total: number } | null>(null);

  const update = (k: keyof CheckoutFormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const fmtCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const fmtExp = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const validate = () => {
    const e: Partial<Record<keyof CheckoutFormState, string>> = {};
    for (const k of REQUIRED) if (!form[k]?.trim()) e[k] = t.checkout.requiredErr;
    if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      e.email = t.checkout.invalidEmail;
    if (form.cp && !/^\d{5}$/.test(form.cp)) e.cp = t.checkout.digits5;
    if (form.card && form.card.replace(/\s/g, "").length < 15)
      e.card = t.checkout.incompleteNum;
    if (form.exp && !/^\d{2}\/\d{2}$/.test(form.exp)) e.exp = "MM/AA";
    if (form.cvc && !/^\d{3,4}$/.test(form.cvc)) e.cvc = "3–4";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (items.length === 0) return;

    if (!validate()) {
      toast(t.checkout.toastReview, { description: t.checkout.toastReviewDesc });
      const first = document.querySelector("[data-error='true']");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setLoading(true);

    const checkoutItems: CheckoutItem[] = items.map((i) => ({
      product: {
        id: i.product.id,
        priceMXN: i.product.priceMXN,
        es: { name: i.product.es.name },
        en: { name: i.product.en.name },
      },
      qty: i.qty,
    }));

        const result = await processCheckout({
      form: form as CheckoutFormState,
      items: checkoutItems,
      totals: { subtotal, iva, total },
      coupon: coupon ? { code: coupon.code, discount: coupon.discount } : null,
      lang: lang as "es" | "en",
    });

    setLoading(false);

    if (result.success) {
      if (result.redirectTo) {
        window.location.href = result.redirectTo;
        return;
      }

      setOrder({ no: result.orderId!, total });
      clear();
      toast(t.checkout.toastConfirmed, {
        description: `${t.checkout.toastFolio} ${result.orderId}`,
      });
    } else {
      toast.error("Error en el pago", { description: result.error });
    }
  };

  if (order) {
    return (
      <div className="mx-auto max-w-2xl container-px py-24 text-center sm:py-32">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-blue-200 bg-blue-50 text-blue-600 shadow-lg">
          <Check className="h-9 w-9" />
        </span>
        <h1 className="display mt-8 text-4xl font-extrabold text-slate-900 sm:text-5xl">
          {t.checkout.successThankYou}
        </h1>
        <p className="mt-4 text-base font-medium text-slate-600">
          {t.checkout.successDesc}
        </p>
        <div className="mx-auto mt-10 max-w-sm rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
              {t.checkout.folioLabel}
            </span>
            <span className="font-mono text-sm font-bold text-slate-900">
              {order.no}
            </span>
          </div>
          <div className="flex items-center justify-between pt-4">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
              {t.checkout.totalPaid}
            </span>
            <span className="display text-2xl font-black text-blue-600">
              {formatMXN(order.total)}{" "}
              <span className="text-sm font-bold text-slate-500">MXN</span>
            </span>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button
            asChild
            className="rounded-full bg-blue-600 px-8 py-6 text-base font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700"
          >
            <Link href="/servicios">{t.checkout.exploreMore}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-slate-300 px-8 py-6 font-bold"
          >
            <Link href="/">{t.checkout.backHome}</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (hydrated && items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center container-px py-28 text-center">
        <span className="grid h-24 w-24 place-items-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 text-slate-400">
          <ShoppingBag className="h-10 w-10" />
        </span>
        <h1 className="display mt-8 text-3xl font-extrabold text-slate-900">
          {t.checkout.emptyTitle}
        </h1>
        <p className="mt-3 text-sm text-slate-600">{t.checkout.emptyDesc}</p>
        <Button
          asChild
          className="mt-8 rounded-full bg-blue-600 px-8 py-6 font-bold text-white hover:bg-blue-700"
        >
          <Link href="/servicios">
            {t.checkout.viewServices}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-[1400px] bg-[#F8FAFC] py-20 container-px">
      <div className="mb-12">
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-50 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-blue-600 shadow-sm">
          <ShieldCheck className="h-4 w-4" /> {t.checkout.eyebrow}
        </span>
        <h1 className="display mt-6 text-4xl font-black uppercase tracking-tight text-slate-900 sm:text-6xl">
          {t.checkout.title}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="grid items-start gap-10 lg:grid-cols-[1fr_0.8fr] lg:gap-12"
      >
        <div className="space-y-8">
          {/* Sección 01: Contacto */}
          <div className="rounded-[2.5rem] border border-slate-200/80 bg-white p-8 shadow-xl sm:p-10">
            <SectionTitle n="01" title={t.checkout.contactSec} />
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label={t.checkout.name} error={errors.nombre}>
                <Input
                  className={inputBase}
                  data-error={!!errors.nombre}
                  value={form.nombre || ""}
                  onChange={(e) => update("nombre", e.target.value)}
                  placeholder={t.checkout.name}
                />
              </Field>
              <Field label={t.checkout.lastName} error={errors.apellidos}>
                <Input
                  className={inputBase}
                  value={form.apellidos || ""}
                  onChange={(e) => update("apellidos", e.target.value)}
                  placeholder={t.checkout.lastName}
                />
              </Field>
              <Field label="Email" error={errors.email}>
                                <Input
                  className={inputBase}
                  type="email"
                  value={form.email || ""}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder={t.checkout.emailPlaceholder}
                />
              </Field>
              <Field label={t.contact.phone} error={errors.telefono}>
                <Input
                  className={inputBase}
                  value={form.telefono || ""}
                  onChange={(e) => update("telefono", e.target.value)}
                  placeholder="55 5557 5699"
                />
              </Field>
            </div>
          </div>

          {/* Sección 02: Facturación */}
          <div className="rounded-[2.5rem] border border-slate-200/80 bg-white p-8 shadow-xl sm:p-10">
            <SectionTitle n="02" title={t.checkout.billingSec} />
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label={t.checkout.company}>
                <Input
                  className={inputBase}
                  value={form.empresa || ""}
                  onChange={(e) => update("empresa", e.target.value)}
                  placeholder={t.checkout.companyPlaceholder}
                />
              </Field>
              <Field label={t.checkout.rfc}>
                <Input
                  className={inputBase}
                  value={form.rfc || ""}
                  onChange={(e) => update("rfc", e.target.value.toUpperCase())}
                  placeholder="XAXX010101000"
                />
              </Field>
              <Field
                label={t.checkout.address}
                error={errors.direccion}
                className="sm:col-span-2"
              >
                <Input
                  className={inputBase}
                  value={form.direccion || ""}
                  onChange={(e) => update("direccion", e.target.value)}
                  placeholder={t.checkout.addressPlaceholder}
                />
              </Field>
              <Field label={t.checkout.city} error={errors.ciudad}>
                <Input
                  className={inputBase}
                  value={form.ciudad || ""}
                  onChange={(e) => update("ciudad", e.target.value)}
                  placeholder={t.checkout.city}
                />
              </Field>
              <Field label={t.checkout.state} error={errors.estado}>
                <Input
                  className={inputBase}
                  value={form.estado || ""}
                  onChange={(e) => update("estado", e.target.value)}
                  placeholder={t.checkout.state}
                />
              </Field>
              <Field label={t.checkout.zip} error={errors.cp}>
                <Input
                  className={inputBase}
                  value={form.cp || ""}
                  onChange={(e) =>
                    update("cp", e.target.value.replace(/\D/g, "").slice(0, 5))
                  }
                  placeholder="53398"
                  inputMode="numeric"
                />
              </Field>
              <Field label={t.checkout.country}>
                <select
                  value={form.pais || "México"}
                  onChange={(e) => update("pais", e.target.value)}
                  className={inputBase}
                >
                  <option>México</option>
                  <option>Estados Unidos</option>
                  <option>Colombia</option>
                  <option>Argentina</option>
                  <option>España</option>
                </select>
              </Field>
            </div>
          </div>

          {/* Sección 03: Pago */}
          <div className="rounded-[2.5rem] border border-slate-200/80 bg-white p-8 shadow-xl sm:p-10">
            <SectionTitle n="03" title={t.checkout.paymentSec} />

            <div className="mb-6 flex items-center justify-between gap-2 rounded-2xl border border-blue-100 bg-blue-50/50 px-5 py-4 text-xs font-semibold text-slate-700">
                            <div className="flex items-center gap-2.5">
                <Lock className="h-4 w-4 shrink-0 text-blue-600" />
                {t.checkout.paymentSecureLine}
              </div>
              <span className="font-mono font-bold tracking-wider text-blue-600">
                SSL SECURED
              </span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                label={t.checkout.cardNumber}
                error={errors.card}
                className="sm:col-span-2"
              >
                <Input
                  className={inputBase}
                  value={form.card || ""}
                  onChange={(e) => update("card", fmtCard(e.target.value))}
                  placeholder="4242 4242 4242 4242"
                  inputMode="numeric"
                />
              </Field>
              <Field
                label={t.checkout.cardName}
                error={errors.cardName}
                className="sm:col-span-2"
              >
                <Input
                  className={inputBase}
                  value={form.cardName || ""}
                  onChange={(e) => update("cardName", e.target.value)}
                  placeholder={t.checkout.cardNamePlaceholder}
                />
              </Field>
              <Field label={t.checkout.exp} error={errors.exp}>
                <Input
                  className={inputBase}
                  value={form.exp || ""}
                  onChange={(e) => update("exp", fmtExp(e.target.value))}
                  placeholder="MM/AA"
                  inputMode="numeric"
                />
              </Field>
              <Field label="CVV" error={errors.cvc}>
                <Input
                  className={inputBase}
                  type="password"
                  value={form.cvc || ""}
                  onChange={(e) =>
                    update("cvc", e.target.value.replace(/\D/g, "").slice(0, 4))
                  }
                  placeholder="***"
                  inputMode="numeric"
                />
              </Field>
              <Field label={t.checkout.notes} className="sm:col-span-2">
                <Textarea
                  className="resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-900 transition-all focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-600/15"
                  value={form.notas || ""}
                  onChange={(e) => update("notas", e.target.value)}
                  placeholder={t.checkout.notesPlaceholder}
                  rows={3}
                />
              </Field>
            </div>
          </div>
        </div>

        {/* Resumen lateral flotante */}
        <aside className="lg:sticky lg:top-28">
          <div className="rounded-[2.5rem] border border-slate-200/80 bg-white p-8 shadow-2xl">
            <p className="mb-6 font-mono text-xs font-bold uppercase tracking-widest text-blue-600">
              {t.checkout.summaryEyebrow}
            </p>

            <div className="max-h-[340px] space-y-4 overflow-y-auto pr-1">
              {items.map(({ product, qty }) => {
                const data = product[lang];

                return (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-3"
                  >
                    <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-slate-200">
                      <img
                        src={product.imageUrl}
                        alt={data.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-slate-900">
                        {data.name}
                      </p>
                      <div className="mt-1 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-1">
                          <button
                            type="button"
                            onClick={() => setQty(product.id, qty - 1)}
                            className="grid h-5 w-5 place-items-center text-slate-500 hover:text-blue-600"
                          >
                            <Minus className="h-2.5 w-2.5" />
                          </button>
                          <span className="w-5 text-center font-mono text-xs font-bold">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(product.id, qty + 1)}
                            className="grid h-5 w-5 place-items-center text-slate-500 hover:text-blue-600"
                          >
                            <Plus className="h-2.5 w-2.5" />
                          </button>
                        </div>
                        <span className="font-mono text-xs font-bold text-slate-900">
                          {formatMXN(product.priceMXN * qty)}{" "}
                          <span className="text-[0.6rem] font-normal text-slate-400">
                            MXN
                          </span>
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(product.id)}
                      className="p-1 text-slate-300 transition-colors hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Cupón */}
            <div className="mt-6">
              <CouponInput />
            </div>

            <dl className="mt-6 space-y-3 border-t border-slate-100 pt-6 font-mono text-sm">
              <div className="flex justify-between text-xs text-slate-500">
                <dt>{t.cart.subtotal}</dt>
                <dd className="font-bold text-slate-800">
                  {formatMXN(subtotal)} MXN
                </dd>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-xs text-emerald-600">
                  <dt className="font-bold uppercase tracking-wide">
                    {t.coupon.discountLabel} ({coupon?.code})
                  </dt>
                  <dd className="font-bold">−{formatMXN(discountAmount)} MXN</dd>
                </div>
              )}
                            <div className="flex justify-between text-xs text-slate-500">
                <dt>{t.checkout.ivaLabel}</dt>
                <dd className="font-bold text-slate-800">{formatMXN(iva)} MXN</dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-slate-100 pt-4">
                <dt className="display text-base font-bold text-slate-900">
                  {t.cart.total}
                </dt>
                <dd className="display text-2xl font-black text-blue-600">
                  {formatMXN(total)}{" "}
                  <span className="text-sm font-bold text-slate-500">MXN</span>
                </dd>
              </div>
            </dl>

            <Button
              type="submit"
              size="lg"
              className="mt-8 w-full rounded-2xl bg-blue-600 py-7 text-base font-bold text-white shadow-xl shadow-blue-500/25 transition-all hover:scale-[1.02] hover:bg-blue-700"
              disabled={loading || items.length === 0}
            >
              {loading ? (
                <>
                  {t.checkout.processing}
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  {t.checkout.placeOrder}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
            <p className="mt-5 flex items-center justify-center gap-2 font-mono text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
              <Lock className="h-3.5 w-3.5 text-blue-600" />
              {t.checkout.protected}
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}