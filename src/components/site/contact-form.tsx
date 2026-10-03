"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { toast } from "sonner";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { processContact } from "@/app/actions/contact";

const INVALID_PHONE_PATTERNS = [
  "0000000000", "1111111111", "2222222222", "3333333333", "4444444444",
  "5555555555", "6666666666", "7777777777", "8888888888", "9999999999",
  "1234567890", "0987654321",
];

function isGibberishText(text: string): boolean {
  const clean = text.trim();
  if (clean.length < 2) return true;
  if (/https?:\/\//i.test(clean)) return true;
  const words = clean.split(/\s+/);
  return words.some((word) => word.length > 6 && !/[aeiouáéíóúy]/i.test(word));
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  if (digits.length !== 10) return false;
  if (INVALID_PHONE_PATTERNS.includes(digits)) return false;
  return true;
}

type Fields = "nombre" | "correo" | "telefono" | "asunto" | "mensaje" | "website_hp";
type FormState = Record<Fields, string>;

const EMPTY: FormState = {
  nombre: "", correo: "", telefono: "", asunto: "", mensaje: "", website_hp: "",
};

function Field({ label, children, error, className }: { label: string; children: React.ReactNode; error?: string; className?: string; }) {
  return (
    <div className={className}>
      <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-slate-700 font-bold">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 font-mono text-[0.66rem] uppercase tracking-wide text-red-500 font-bold">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const mountTimeRef = useRef<number>(0);

  useEffect(() => {
    mountTimeRef.current = Date.now();
  }, []);

  const update = (k: Fields, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const digitsOnly = rawValue.replace(/\D/g, "").slice(0, 10);
    update("telefono", digitsOnly);
  };

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.nombre.trim() || isGibberishText(form.nombre)) e.nombre = t.contact.errName;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.correo)) e.correo = t.contact.errEmail;
    if (!isValidPhone(form.telefono)) e.telefono = lang === "es" ? "Teléfono inválido (10 dígitos)" : "Invalid phone (10 digits)";
    if (!form.mensaje.trim() || form.mensaje.trim().length < 5) e.mensaje = t.contact.errMsg;
    if (/https?:\/\//i.test(form.mensaje)) e.mensaje = lang === "es" ? "No se permiten enlaces" : "Links are not allowed";
    
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (loading) return;

    if (form.website_hp || (Date.now() - mountTimeRef.current) / 1000 < 2.5) {
      setSent(true);
      setTimeout(() => setSent(false), 4000);
      return;
    }

    if (!validate()) {
      toast.error(t.contact.toastTitle, { description: t.contact.toastDesc });
      return;
    }
    
    setLoading(true);
    const { website_hp, ...payload } = form;
    const result = await processContact({ form: payload, lang });
    setLoading(false);

    if (result.success) {
      setSent(true);
      toast.success(t.contact.sentToastTitle, { description: t.contact.sentToastDesc });
      mountTimeRef.current = Date.now();
    } else {
      toast.error("Error", { description: "Ocurrió un problema al enviar el mensaje." });
    }
  };

  if (sent) {
    return (
      <div className="flex min-h-[440px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-xl">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-blue-50 text-blue-600 border border-blue-200">
          <Check className="h-7 w-7" strokeWidth={3} />
        </span>
        <h3 className="display mt-6 text-3xl font-bold text-slate-900">
          {t.contact.successTitle}
        </h3>
        <p className="mt-3 max-w-sm text-slate-600 font-mono text-sm">
          {t.contact.successDesc}
        </p>
        <Button className="mt-8 rounded-full bg-slate-900 text-white font-bold hover:bg-blue-600" onClick={() => { setForm(EMPTY); setSent(false); mountTimeRef.current = Date.now(); }}>
          {t.contact.sendAnother}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-xl">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-2xl" />
      
      <div className="absolute -left-[9999px] top-0" aria-hidden="true" tabIndex={-1}>
        <input type="text" name="website_hp" autoComplete="off" value={form.website_hp} onChange={(e) => update("website_hp", e.target.value)} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label={t.contact.fullName} error={errors.nombre}>
          <Input className="h-12 rounded-xl bg-slate-50 border-slate-200 text-slate-900 focus-visible:ring-blue-600" value={form.nombre} onChange={(e) => update("nombre", e.target.value)} placeholder={t.contact.namePlaceholder} />
        </Field>
        <Field label={t.contact.email} error={errors.correo}>
          <Input className="h-12 rounded-xl bg-slate-50 border-slate-200 text-slate-900 focus-visible:ring-blue-600" type="email" value={form.correo} onChange={(e) => update("correo", e.target.value)} placeholder={t.contact.emailPlaceholder} />
        </Field>
        <Field label={t.contact.phone} error={errors.telefono}>
          <Input className="h-12 rounded-xl bg-slate-50 border-slate-200 text-slate-900 focus-visible:ring-blue-600" type="tel" value={form.telefono} onChange={handlePhoneChange} placeholder={t.contact.phonePlaceholder} maxLength={10} />
        </Field>
        <Field label={t.contact.subject}>
          <Input className="h-12 rounded-xl bg-slate-50 border-slate-200 text-slate-900 focus-visible:ring-blue-600" value={form.asunto} onChange={(e) => update("asunto", e.target.value)} placeholder={t.contact.subjectPlaceholder} />
        </Field>
        <Field label={t.contact.message} error={errors.mensaje} className="sm:col-span-2">
          <Textarea className="rounded-xl bg-slate-50 border-slate-200 text-slate-900 focus-visible:ring-blue-600 resize-none" value={form.mensaje} onChange={(e) => update("mensaje", e.target.value)} placeholder={t.contact.msgPlaceholder} rows={5} />
        </Field>
      </div>

      <Button type="submit" size="lg" className="mt-8 w-full rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20" disabled={loading}>
        {loading ? (
          <>{t.contact.sending} <Loader2 className="h-4 w-4 ml-2 animate-spin" /></>
        ) : (
          <>{t.contact.submitBtn} <ArrowRight className="h-4 w-4 ml-2" /></>
        )}
      </Button>
    </form>
  );
}