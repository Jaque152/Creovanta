"use client";

import { StoreGrid } from "@/components/site/store-grid";
import { useLanguage } from "@/lib/language-context";

export function ServiciosClient() {
  const { t } = useLanguage();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink border-b border-clay/20">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute -left-32 top-[-20%] h-[460px] w-[460px] rounded-full bg-clay/10 blur-[120px]" />
          <div className="absolute right-[-10%] top-10 h-[420px] w-[420px] rounded-full bg-ochre/10 blur-[120px]" />
          {/* Tech grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00E5FF08_1px,transparent_1px),linear-gradient(to_bottom,#00E5FF08_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>
        <div className="mx-auto max-w-[1400px] container-px pb-14 pt-14 sm:pt-24 text-center flex flex-col items-center">
          <span className="eyebrow inline-flex items-center gap-2.5 text-clay">
            <span className="h-2 w-2 rounded-sm bg-ochre" />
            {t.servicesPage.eyebrow}
          </span>
          <h1 className="display mt-6 max-w-4xl text-balance text-5xl font-bold uppercase leading-[0.95] tracking-tight text-cream-paper sm:text-7xl">
            {t.servicesPage.titlePart1}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-clay to-ochre">{t.servicesPage.titlePart2}</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-[0.95rem] leading-relaxed text-cream-paper/60 font-mono">
            {t.servicesPage.desc}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] container-px pb-20 sm:pb-28 bg-ink relative z-10 pt-10">
        <StoreGrid />
      </section>
    </>
  );
}