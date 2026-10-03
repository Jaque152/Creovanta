"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { useLanguage } from "@/lib/language-context";

function VisaBadge() {
  return (
    <span className="grid h-8 w-12 place-items-center rounded-md bg-white shadow-sm hover:scale-105 transition-transform">
      <span className="font-display text-sm font-black italic tracking-tight text-[#1434CB]">
        VISA
      </span>
    </span>
  );
}

function MastercardBadge() {
  return (
    <span className="flex h-8 w-12 items-center justify-center rounded-md bg-white shadow-sm hover:scale-105 transition-transform">
      <span className="h-5 w-5 rounded-full bg-[#EB001B]" />
      <span className="-ml-2 h-5 w-5 rounded-full bg-[#F79E1B] mix-blend-multiply opacity-90" />
    </span>
  );
}

export function Footer() {
  const { t } = useLanguage();

  const legalRoutes = ["/privacidad", "/terminos", "/devoluciones"];

  return (
    <footer className="bg-[#0B1121] text-white border-t border-white/10">
      <div className="mx-auto max-w-[1400px] container-px">
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          
          {/* Columna 1: Logo y Legales */}
          <div className="space-y-6">
            <Logo variant="cream" />
            <div className="flex flex-col gap-3">
              {t.footer.legal.map((label: string, index: number) => (
                <Link
                  key={label}
                  href={legalRoutes[index] || "#"}
                  className="w-fit font-mono text-[0.72rem] uppercase tracking-[0.12em] font-semibold text-white/50 transition-colors hover:text-blue-400"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Columna 2: Contacto (Datos Nuevos) */}
          <div className="space-y-5">
            <p className="font-mono text-[0.75rem] tracking-[0.2em] uppercase font-bold text-blue-500">
              {t.footer.contactEyebrow}
            </p>
            <div className="flex flex-col gap-3 font-mono text-sm">
              <a
                href="tel:+525555575699"
                className="text-white/80 transition-all hover:text-blue-400 hover:translate-x-1 inline-block w-fit"
              >
                55 5557 5699
              </a>
              <a
                href="mailto:administracion@creovanta.com.mx"
                className="text-white/80 transition-all hover:text-blue-400 hover:translate-x-1 inline-block w-fit"
              >
                administracion@creovanta.com.mx
              </a>
            </div>
          </div>

          {/* Columna 3: Ubicación y Métodos de Pago (Datos Nuevos) */}
          <div className="space-y-5">
            <p className="font-mono text-[0.75rem] tracking-[0.2em] uppercase font-bold text-blue-500">
              {t.footer.addressEyebrow}
            </p>
            <p className="max-w-[280px] text-sm leading-relaxed text-white/70 font-medium">
              BLVD. PARQUE ORIZABA NO. 7, PISO 3, COL. EL PARQUE, C.P. 53398, NAUCALPAN, ESTADO DE MÉXICO
            </p>
            <div className="flex items-center gap-3 pt-2">
              <VisaBadge />
              <MastercardBadge />
            </div>
          </div>
        </div>

        {/* Barra Inferior (Copyright) */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 py-8 sm:flex-row sm:items-center">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-white/40 font-semibold">
            © {new Date().getFullYear()} Creovanta — Impulsando la innovación.
          </p>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-blue-500/70 font-bold hover:text-blue-400 transition-colors cursor-default">
            {t.footer.studio}
          </p>
        </div>
      </div>
    </footer>
  );
}