"use client";

import { StoreGrid } from "@/components/site/store-grid";
import { useLanguage } from "@/lib/language-context";

export function ServiciosClient() {
  const { t } = useLanguage();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-cream-paper">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute -left-32 top-[-20%] h-[460px] w-[460px] rounded-full bg-clay/10 blur-[120px]" />
          <div className="absolute right-[-10%] top-10 h-[420px] w-[420px] rounded-full bg-ochre/10 blur-[120px]" />
          {/* Subtle tech grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>
        <div className="mx-auto max-w-[1400px] container-px pb-10 pt-14 sm:pt-20">
          <span className="eyebrow inline-flex items-center gap-2.5 text-clay-deep">
            <span className="h-2 w-2 rounded-sm bg-clay" />
            {t.servicesPage.eyebrow}
          </span>
          <h1 className="display mt-6 max-w-4xl text-balance text-5xl font-bold uppercase leading-[0.95] tracking-tight text-ink sm:text-7xl">
            {t.servicesPage.titlePart1}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-clay-deep to-ochre">{t.servicesPage.titlePart2}</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink/70 font-mono text-[0.9rem]">
            {t.servicesPage.desc}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] container-px pb-20 sm:pb-28 bg-cream-paper relative z-10">
        <StoreGrid />
      </section>
    </>
  );
}