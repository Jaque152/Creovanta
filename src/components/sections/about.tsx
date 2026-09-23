"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { useLanguage } from "@/lib/language-context";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="nosotros" className="relative py-24 sm:py-32 bg-cream-paper">
      <div className="mx-auto grid max-w-[1400px] gap-14 container-px lg:grid-cols-2 lg:items-center lg:gap-20">
        
        {/* Terminal Visual - Moved to the left */}
        <div className="order-2 lg:order-1 relative">
          <Reveal>
            <div className="rounded-xl overflow-hidden border border-ink/20 shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-ink">
              <div className="bg-ink-2 px-4 py-3 border-b border-ink/40 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-destructive/80"></span>
                <span className="h-3 w-3 rounded-full bg-ochre/80"></span>
                <span className="h-3 w-3 rounded-full bg-clay/80"></span>
              </div>
              <div className="p-8 text-cream-paper">
                <p className="font-mono text-sm text-clay mb-6">~ % {t.about.servicesIncludedEyebrow}</p>
                <ul className="space-y-4 font-mono text-sm">
                  {t.about.servicesList.map((s) => (
                    <li key={s} className="flex items-start gap-4">
                      <span className="text-ochre mt-0.5">{"=>"}</span>
                      <span className="text-cream-paper/80 leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Text Content - Moved to the right */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-2.5 text-clay-deep">
              <span className="h-2 w-2 rounded-sm bg-clay" />
              {t.about.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display mt-6 text-balance text-4xl font-bold leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
              {t.about.titlePart1}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-clay-deep to-ochre">{t.about.titlePart2}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-7 max-w-xl space-y-5 text-pretty text-[1.05rem] leading-relaxed text-ink/70">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <Button asChild className="mt-9 bg-clay-deep text-white hover:bg-ink rounded-md">
              <Link href="/servicios">
                {t.about.ctaBtn}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}