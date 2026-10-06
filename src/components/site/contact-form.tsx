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
    if (!isValidPhone(form.telefono))
      e.telefono = lang === "es" ? "Teléfono inválido (10 dígitos)" : "Invalid phone (10 digits)";
    if (!form.mensaje.trim() || form.mensaje.trim().length < 5) e.mensaje = t.contact.errMsg;
    if (/https?:\/\//i.test(form.mensaje))
      e.mensaje = lang === "es" ? "No se permiten enlaces" : "Links are not allowed";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();

    // LOG [1] - ¿Se disparó el submit?
    console.log("🟢 [1] Submit disparado");
    console.log("🟢 [2] Estado del form:", form);
    console.log(
      "🟢 [3] Segundos desde mount:",
      (Date.now() - mountTimeRef.current) / 1000
    );

    if (loading) {
      console.log("🟡 [4] Bloqueado: loading");
      return;
    }

    // ⚠️ ANTIBOT - esto es lo que está bloqueando todo
    if (form.website_hp || (Date.now() - mountTimeRef.current) / 1000 < 2.5) {
      console.log("🔴 [5] BLOQUEADO POR ANTI-BOT");
      console.log("   website_hp valor:", JSON.stringify(form.website_hp));
      console.log(
        "   segundos transcurridos:",
        (Date.now() - mountTimeRef.current) / 1000
      );
      setSent(true);
      setTimeout(() => setSent(false), 4000);
      return;
    }

    if (!validate()) {
      console.log("🔴 [6] BLOQUEADO POR VALIDACIÓN");
      console.log("   errores:", errors);
      toast.error(t.contact.toastTitle, { description: t.contact.toastDesc });
      return;
    }

    console.log("🟢 [7] Validación OK, llamando processContact…");
    setLoading(true);

    const { website_hp, ...payload } = form;
    console.log("🟢 [8] Payload enviado al server:", payload);

    try {
      const result = await processContact({ form: payload, lang });
      console.log("🟢 [9] Respuesta del server:", result);

      if (result.success) {
        console.log("✅ [10] Éxito");
        setSent(true);
        toast.success(t.contact.sentToastTitle, {
          description: t.contact.sentToastDesc,
        });
        mountTimeRef.current = Date.now();
      } else {
        console.error("❌ [11] Error devuelto por el server:", result);
        toast.error("Error", {
          description:
            result.error ||
            (lang === "es"
              ? "Ocurrió un problema al enviar el mensaje."
              : "There was a problem sending your message."),
        });
      }
    } catch (err) {
      console.error("❌ [12] Excepción al llamar processContact:", err);
      toast.error("Error", {
        description:
          lang === "es"
            ? "Ocurrió un problema al enviar el mensaje."
            : "There was a problem sending your message.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="flex min-h-[440px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-xl">
        <span className="grid h-16 w-16 place-items-center rounded-full border border-blue-200 bg-blue-50 text-blue-600">
          <Check className="h-7 w-7" strokeWidth={3} />
        </span>
        <h3 className="display mt-6 text-3xl font-bold text-slate-900">
          {t.contact.successTitle}
        </h3>
        <p className="mt-3 max-w-sm font-mono text-sm text-slate-600">
          {t.contact.successDesc}
        </p>
        <Button
          className="mt-8 rounded-full bg-slate-900 font-bold text-white hover:bg-blue-600"
          onClick={() => {
            setForm(EMPTY);
            setSent(false);
            mountTimeRef.current = Date.now();
          }}
        >
          {t.contact.sendAnother}
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative rounded-2xl border border-slate-200 bg-white p-8 shadow-xl sm:p-10"
    >
      <div className="absolute left-0 top-0 h-1 w-full rounded-t-2xl bg-gradient-to-r from-blue-600 to-indigo-600" />

      {/* Honeypot — debe quedar vacío siempre */}
      <div className="absolute -left-[9999px] top-0" aria-hidden="true">
        <input
          type="text"
          name="website_hp"
          autoComplete="off"
          tabIndex={-1}
          value={form.website_hp}
          onChange={(e) => update("website_hp", e.target.value)}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label={t.contact.fullName} error={errors.nombre}>
          <Input
            className="h-12 rounded-xl border-slate-200 bg-slate-50 text-slate-900 focus-visible:ring-blue-600"
            value={form.nombre}
            onChange={(e) => update("nombre", e.target.value)}
            placeholder={t.contact.namePlaceholder}
          />
        </Field>
        <Field label={t.contact.email} error={errors.correo}>
          <Input
            className="h-12 rounded-xl border-slate-200 bg-slate-50 text-slate-900 focus-visible:ring-blue-600"
            type="email"
            value={form.correo}
            onChange={(e) => update("correo", e.target.value)}
            placeholder={t.contact.emailPlaceholder}
          />
        </Field>
        <Field label={t.contact.phone} error={errors.telefono}>
          <Input
            className="h-12 rounded-xl border-slate-200 bg-slate-50 text-slate-900 focus-visible:ring-blue-600"
            type="tel"
            value={form.telefono}
            onChange={handlePhoneChange}
            placeholder={t.contact.phonePlaceholder}
            maxLength={10}
          />
        </Field>
        <Field label={t.contact.subject}>
          <Input
            className="h-12 rounded-xl border-slate-200 bg-slate-50 text-slate-900 focus-visible:ring-blue-600"
            value={form.asunto}
            onChange={(e) => update("asunto", e.target.value)}
            placeholder={t.contact.subjectPlaceholder}
          />
        </Field>
        <Field label={t.contact.message} error={errors.mensaje} className="sm:col-span-2">
          <Textarea
            className="resize-none rounded-xl border-slate-200 bg-slate-50 text-slate-900 focus-visible:ring-blue-600"
            value={form.mensaje}
            onChange={(e) => update("mensaje", e.target.value)}
            placeholder={t.contact.msgPlaceholder}
            rows={5}
          />
        </Field>
      </div>

      <Button
        type="submit"
        size="lg"
        className="mt-8 w-full rounded-full bg-blue-600 font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? (
          <>
            {t.contact.sending} <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          </>
        ) : (
          <>
            {t.contact.submitBtn} <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}