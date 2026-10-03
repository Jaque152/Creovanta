"use client";

import { StoreGrid } from "@/components/site/store-grid";
import { useLanguage } from "@/lib/language-context";
import { Cpu } from "lucide-react";

export function ServiciosClient() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1E3A8A] via-[#3730A3] to-[#701A75] py-28 text-white">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 mx-auto max-w-[1400px] container-px text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-blue-200 backdrop-blur-md mb-8">
            <Cpu className="h-3.5 w-3.5 animate-pulse" /> {t.servicesPage.eyebrow}
          </div>
          <h1 className="display max-w-4xl text-balance text-5xl font-black uppercase tracking-tight text-white sm:text-7xl leading-[1.05]">
            {t.servicesPage.titlePart1}{" "}
            <span className="text-blue-200">
              {t.servicesPage.titlePart2}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200 font-medium">
            {t.servicesPage.desc}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] container-px -mt-12 relative z-20 pb-32">
        <StoreGrid />
      </section>
    </div>
  );
}