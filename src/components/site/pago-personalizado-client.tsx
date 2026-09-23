"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ChevronsRight } from "lucide-react";
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
      // Imagen actualizada a una temática de software/código
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
    <section className="relative isolate min-h-[calc(100vh-68px)] bg-ink py-16 sm:py-24 border-b border-clay/20 overflow-hidden">
      {/* Malla tecnológica de fondo */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#00E5FF0A_1px,transparent_1px),linear-gradient(to_bottom,#00E5FF0A_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="absolute top-1/4 right-0 h-96 w-96 rounded-full bg-ochre/10 blur-[120px] pointer-events-none" />

      <div className="mx-auto grid max-w-[1200px] gap-12 container-px lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-20">
        
        {/* LADO IZQUIERDO: Títulos */}
        <div>
          <h1 className="display text-5xl font-bold uppercase leading-[1.05] tracking-tight text-cream-paper sm:text-[5.5rem]">
            {t.customPayment.title1}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-clay to-ochre">{t.customPayment.title2}</span>
          </h1>
          <p className="mt-8 max-w-sm text-lg leading-relaxed text-cream-paper/70 font-mono text-sm">
            {t.customPayment.desc}
          </p>
        </div>

        {/* LADO DERECHO: Formulario (Tech Mode) */}
        <div className="rounded-xl border border-clay/20 bg-ink-2 p-7 shadow-[0_0_40px_rgba(0,229,255,0.05)] sm:p-12 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-clay to-ochre rounded-t-xl" />
          
          <form onSubmit={handleSubmit} noValidate className="space-y-7">
            <div className="grid gap-7 sm:grid-cols-2">
              <div>
                <label className="mb-2.5 block ml-1 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-clay">
                  {t.customPayment.nameLabel}
                </label>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={(e) => update("nombre", e.target.value)}
                  className="h-12 w-full rounded-md border border-clay/30 bg-ink px-4 text-cream-paper outline-none transition-all focus:border-clay focus:ring-1 focus:ring-clay"
                />
                {errors.nombre && <p className="mt-2 ml-1 font-mono text-[0.6rem] text-destructive uppercase tracking-wide">{errors.nombre}</p>}
              </div>

              <div>
                <label className="mb-2.5 block ml-1 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-clay">
                  {t.customPayment.emailLabel}
                </label>
                <input
                  type="email"
                  value={form.correo}
                  onChange={(e) => update("correo", e.target.value)}
                  className="h-12 w-full rounded-md border border-clay/30 bg-ink px-4 text-cream-paper outline-none transition-all focus:border-clay focus:ring-1 focus:ring-clay"
                />
                {errors.correo && <p className="mt-2 ml-1 font-mono text-[0.6rem] text-destructive uppercase tracking-wide">{errors.correo}</p>}
              </div>
            </div>

            <div>
              <label className="mb-2.5 block ml-1 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-clay">
                {t.customPayment.refLabel}
              </label>
              <input
                type="text"
                value={form.referencia}
                onChange={(e) => update("referencia", e.target.value)}
                className="h-12 w-full rounded-md border border-clay/30 bg-ink px-4 text-cream-paper outline-none transition-all focus:border-clay focus:ring-1 focus:ring-clay"
              />
              {errors.referencia && <p className="mt-2 ml-1 font-mono text-[0.6rem] text-destructive uppercase tracking-wide">{errors.referencia}</p>}
            </div>

            <div>
              <label className="mb-2.5 block ml-1 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-clay">
                {t.customPayment.amountLabel}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-clay/50">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="1"
                  value={form.monto}
                  onChange={(e) => update("monto", e.target.value)}
                  className="h-14 w-full rounded-md border border-clay/30 bg-ink pl-8 pr-4 font-mono text-xl text-cream-paper outline-none transition-all focus:border-clay focus:ring-1 focus:ring-clay"
                />
              </div>
              {errors.monto && <p className="mt-2 ml-1 font-mono text-[0.6rem] text-destructive uppercase tracking-wide">{errors.monto}</p>}
            </div>

            <div className="pt-4 flex justify-center">
              <button
                type="submit"
                className="group flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-clay px-12 font-sans text-sm font-bold tracking-widest text-ink transition-all hover:bg-cream-paper shadow-[0_0_20px_rgba(0,229,255,0.3)]"
              >
                {t.customPayment.button}
                <ChevronsRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="mt-8 text-center font-mono text-[0.64rem] uppercase tracking-[0.14em] text-cream-paper/40">
              <p>{t.customPayment.note1}</p>
              <p>{t.customPayment.note2}</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}