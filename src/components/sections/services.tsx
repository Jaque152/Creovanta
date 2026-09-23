"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { useLanguage } from "@/lib/language-context";

export function Services() {
  const { t } = useLanguage();

  return (
    <section id="servicios" className="bg-ink py-24 sm:py-32 border-t border-clay/20">
      <div className="mx-auto max-w-[1400px] container-px">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow inline-flex items-center gap-2.5 text-clay">
              <span className="h-2 w-2 bg-ochre rounded-sm" />
              {t.services.eyebrow}
            </span>
            <Reveal>
              <h2 className="display mt-6 text-balance text-4xl font-bold leading-[1.1] text-cream-paper sm:text-5xl lg:text-6xl">
                {t.services.title}
              </h2>
            </Reveal>
          </div>
          <p className="max-w-sm text-pretty text-[0.95rem] leading-relaxed text-cream-paper/60 border-l-2 border-clay/30 pl-4">
            {t.services.desc}
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((item, i) => (
            <Reveal key={item.n} delay={i * 0.1}>
              <Link
                href="/servicios"
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-ink-2 bg-ink-2/50 p-8 transition-all hover:border-clay hover:bg-ink-2 hover:shadow-[0_0_30px_rgba(0,229,255,0.1)]"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-clay/5 blur-[50px] transition-all group-hover:bg-clay/20" />
                
                <div>
                  <span className="font-mono text-sm font-bold text-clay">
                    {item.n}
                  </span>
                  <h3 className="display mt-5 text-2xl font-semibold text-cream-paper transition-colors group-hover:text-clay">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-cream-paper/60">
                    {item.desc}
                  </p>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <span className="grid h-10 w-10 place-items-center rounded-sm bg-ink text-clay border border-clay/20 transition-all group-hover:bg-clay group-hover:text-ink">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}