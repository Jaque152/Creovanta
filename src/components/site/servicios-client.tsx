"use client";

import { StoreGrid } from "@/components/site/store-grid";
import { ServicesHeroCTA } from "@/components/site/services-hero-cta";
import { useLanguage } from "@/lib/language-context";
import { Cpu } from "lucide-react";

export function ServiciosClient() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1E3A8A] via-[#3730A3] to-[#701A75] py-28 text-white">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col items-center text-center container-px">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-blue-200 backdrop-blur-md">
            <Cpu className="h-3.5 w-3.5 animate-pulse" /> {t.servicesPage.eyebrow}
          </div>
          <h1 className="display max-w-4xl text-balance text-5xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-7xl">
            {t.servicesPage.titlePart1}{" "}
            <span className="text-blue-200">{t.servicesPage.titlePart2}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-slate-200">
            {t.servicesPage.desc}
          </p>
        </div>
      </section>

      <section className="relative z-20 mx-auto -mt-12 max-w-[1400px] pb-32 container-px">
        <div className="mb-10 flex justify-center">
          <ServicesHeroCTA />
        </div>
        <StoreGrid />
      </section>
    </div>
  );
}