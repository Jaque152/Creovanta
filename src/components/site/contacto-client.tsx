"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { ContactForm } from "./contact-form";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

export function ContactoClient() {
  const { t } = useLanguage();

  const DETAILS = [
    { icon: Phone, label: t.contactPage.detailsLabelPhone, value: "55 5557 5699", href: "tel:+525555575699" },
    { icon: Mail, label: t.contactPage.detailsLabelEmail, value: "administracion@creovanta.com.mx", href: "mailto:administracion@creovanta.com.mx" },
    {
      icon: MapPin,
      label: t.contactPage.detailsLabelAddress,
      value: "BLVD. PARQUE ORIZABA NO. 7, PISO 3, COL. EL PARQUE, C.P. 53398, NAUCALPAN, ESTADO DE MÉXICO",
      href: "#",
    },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-[#F8FAFC] min-h-screen py-24">
      <div className="mx-auto max-w-[1400px] container-px">
        
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          
          <div className="space-y-8">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-50 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-[#1E3A8A] mb-6 shadow-sm">
                {t.contactPage.eyebrow}
              </span>
              <h1 className="display text-5xl font-black uppercase tracking-tight text-slate-900 sm:text-7xl leading-[1.02]">
                {t.contactPage.titlePart1}
                <span className="text-[#1E3A8A] block mt-1">{t.contactPage.titlePart2}</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-600 font-medium max-w-lg">
                {t.contactPage.desc}
              </p>
            </div>

            <Button asChild className="rounded-full bg-[#1E3A8A] px-8 py-7 text-base font-bold text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl">
              <Link href="/personalizado">
                {t.contactPage.payBtn}
                <ArrowUpRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>

            <div className="space-y-4 pt-6">
              {DETAILS.map((d) => (
                <a
                  key={d.label}
                  href={d.href}
                  className="group flex items-start gap-5 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl"
                >
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-blue-50 text-[#1E3A8A] border border-blue-100 transition-all group-hover:bg-[#1E3A8A] group-hover:text-white shadow-inner">
                    <d.icon className="h-6 w-6" />
                  </span>
                  <div className="space-y-1">
                    <span className="font-mono text-xs uppercase tracking-widest text-slate-400 font-bold block">
                      {d.label}
                    </span>
                    <span className="text-slate-800 font-bold text-base transition-colors group-hover:text-[#1E3A8A] block leading-snug">
                      {d.value}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-slate-200/80 bg-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1E3A8A] via-[#3730A3] to-[#4F46E5]" />
            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  );
}