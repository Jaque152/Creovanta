"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ChevronsRight, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useCart } from "@/lib/cart-context";
import { ProductPlan } from "@/lib/products";

type Fields = "nombre" | "correo" | "referencia" | "monto";
type FormState = Record<Fields, string>;

const EMPTY: FormState = {
  nombre: "",
  correo: "",
  referencia: "",
  monto: "",
};

export function PagoPersonalizadoClient() {
  const { t } = useLanguage();
  const { add, open } = useCart();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const update = (k: Fields, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.nombre.trim()) e.nombre = t.customPayment.errName;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.correo)) e.correo = t.customPayment.errEmail;
    if (!form.referencia.trim()) e.referencia = t.customPayment.errRef;
    
    const amountVal = parseFloat(form.monto);
    if (isNaN(amountVal) || amountVal <= 0) e.monto = t.customPayment.errAmount;

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    const customProduct: ProductPlan = {
      id: `custom-payment-${Date.now()}`,
      priceMXN: parseFloat(form.monto),
      taxIncluded: false,
      currency: "MXN + IVA",
      sku: "INN-CUSTOM",
      category: "Personalizado",
      imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80", 
      es: {
        name: `${form.referencia}`,
        description: `Pago personalizado. Nombre: ${form.nombre} | Correo: ${form.correo}`,
        features: ["Pago personalizado", "Procesamiento seguro"],
      },
      en: {
        name: `${form.referencia}`,
        description: `Custom payment. Name: ${form.nombre} | Email: ${form.correo}`,
        features: ["Custom payment", "Secure processing"],
      },
    };

    add(customProduct);
    open();
    
    toast.success(t.customPayment.toastAdded);
    setForm(EMPTY);
  };

  return (
    <section className="relative isolate min-h-[calc(100vh-68px)] bg-[#F8FAFC] py-28 overflow-hidden">
      <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

      <div className="mx-auto grid max-w-[1300px] gap-16 container-px lg:grid-cols-[1fr_1.2fr] lg:items-center">
        
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-50 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-[#1E3A8A] shadow-sm">
            <ShieldCheck className="h-4 w-4" /> Secure Portal
          </div>
          <h1 className="display text-5xl font-black uppercase tracking-tight text-slate-900 sm:text-7xl leading-[1.02]">
            {t.customPayment.title1}
            <span className="text-[#1E3A8A] block mt-2">{t.customPayment.title2}</span>
          </h1>
          <p className="text-lg leading-relaxed text-slate-600 font-medium max-w-md">
            {t.customPayment.desc}
          </p>
        </div>

        <div className="rounded-[2.5rem] border border-slate-200/80 bg-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1E3A8A] via-[#3730A3] to-[#4F46E5]" />
          
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-slate-700 font-bold">
                  {t.customPayment.nameLabel}
                </label>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={(e) => update("nombre", e.target.value)}
                  placeholder="Tu nombre o empresa"
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-slate-900 outline-none transition-all focus:border-[#1E3A8A] focus:bg-white focus:ring-4 focus:ring-blue-900/15 font-medium"
                />
                {errors.nombre && <p className="mt-1.5 ml-1 font-mono text-[0.65rem] text-red-500 uppercase tracking-wide font-bold">{errors.nombre}</p>}
              </div>

              <div>
                <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-slate-700 font-bold">
                  {t.customPayment.emailLabel}
                </label>
                <input
                  type="email"
                  value={form.correo}
                  onChange={(e) => update("correo", e.target.value)}
                  placeholder="contacto@empresa.com"
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-slate-900 outline-none transition-all focus:border-[#1E3A8A] focus:bg-white focus:ring-4 focus:ring-blue-900/15 font-medium"
                />
                {errors.correo && <p className="mt-1.5 ml-1 font-mono text-[0.65rem] text-red-500 uppercase tracking-wide font-bold">{errors.correo}</p>}
              </div>
            </div>

            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-slate-700 font-bold">
                {t.customPayment.refLabel}
              </label>
              <input
                type="text"
                value={form.referencia}
                onChange={(e) => update("referencia", e.target.value)}
                placeholder="Ej. Desarrollo de Plataforma Web Q3"
                className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-slate-900 outline-none transition-all focus:border-[#1E3A8A] focus:bg-white focus:ring-4 focus:ring-blue-900/15 font-medium"
              />
              {errors.referencia && <p className="mt-1.5 ml-1 font-mono text-[0.65rem] text-red-500 uppercase tracking-wide font-bold">{errors.referencia}</p>}
            </div>

            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-slate-700 font-bold">
                {t.customPayment.amountLabel}
              </label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 font-mono text-xl text-[#1E3A8A] font-bold">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="1"
                  value={form.monto}
                  onChange={(e) => update("monto", e.target.value)}
                  placeholder="0.00"
                  className="h-16 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-5 font-mono text-2xl font-black text-slate-900 outline-none transition-all focus:border-[#1E3A8A] focus:bg-white focus:ring-4 focus:ring-blue-900/15"
                />
              </div>
              {errors.monto && <p className="mt-1.5 ml-1 font-mono text-[0.65rem] text-red-500 uppercase tracking-wide font-bold">{errors.monto}</p>}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="group flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#1E3A8A] to-[#4F46E5] px-8 font-sans text-base font-bold tracking-wider text-white transition-all hover:opacity-95 shadow-xl shadow-blue-900/20 hover:scale-[1.01]"
              >
                {t.customPayment.button}
                <ChevronsRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="mt-6 text-center font-mono text-[0.65rem] uppercase tracking-widest text-slate-400 space-y-1 font-medium">
              <p>{t.customPayment.note1}</p>
              <p>{t.customPayment.note2}</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}