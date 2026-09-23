"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { useLanguage } from "@/lib/language-context";

export function Process() {
  const { t } = useLanguage();

  return (
    <section id="proceso" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] container-px">
        
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow inline-flex items-center gap-2.5 text-clay-deep">
            <span className="h-2 w-2 rounded-sm bg-clay" />
            {t.process.eyebrow}
          </span>
          <Reveal>
            <h2 className="display mt-6 text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">
              {t.process.titlePart1}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-clay-deep to-ochre">{t.process.titlePart2}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 text-pretty leading-relaxed text-ink/70">
              {t.process.desc}
            </p>
          </Reveal>
        </div>

        {/* Tech Timeline */}
        <div className="mt-20 relative max-w-4xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-[28px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-clay via-ochre to-transparent md:left-1/2 md:-translate-x-px" />
          
          <div className="space-y-12 md:space-y-0">
            {t.process.steps.map((s, i) => (
              <div key={s.n} className="relative pl-20 md:pl-0 md:w-1/2 md:even:ml-auto md:even:pl-16 md:odd:pr-16 md:odd:text-right md:py-8">
                
                {/* Timeline Node */}
                <div className="absolute left-0 md:left-auto md:right-[-28px] md:even:left-[-28px] top-0 md:top-1/2 md:-translate-y-1/2 grid h-14 w-14 place-items-center rounded-lg border-2 border-clay bg-ink text-clay shadow-[0_0_20px_rgba(0,229,255,0.3)] z-10">
                  <span className="font-mono text-sm font-bold">{s.n}</span>
                </div>
                
                {/* Content Card */}
                <div className="rounded-xl border border-ink/10 bg-cream-paper p-6 shadow-sm hover:border-clay/40 transition-colors">
                  <p className="display text-xl font-bold text-ink">
                    {s.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex justify-center">
          <Button asChild className="bg-clay-deep text-white hover:bg-ink rounded-md">
            <Link href="/servicios">
              {t.process.ctaBtn}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}