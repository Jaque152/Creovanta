"use client";

import { Reveal } from "@/components/site/reveal";
import { useLanguage } from "@/lib/language-context";

// Nuevo diseño de ícono: Glassmorphism con núcleo brillante
const PremiumIcon = () => (
  <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_4px_10px_rgba(0,0,0,0.02)] border border-slate-200 transition-transform group-hover:scale-110 group-hover:shadow-[0_10px_20px_rgba(37,99,235,0.1)]">
    {/* Resplandor interno */}
    <div className="absolute inset-0 rounded-2xl bg-blue-500/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    {/* Núcleo */}
    <div className="relative h-6 w-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-sm" />
  </div>
);

export function Process() {
  const { t } = useLanguage();

  return (
    <section id="desarrollo" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] container-px">
        
        {/* Header de sección */}
        <div className="mb-20 max-w-3xl">
          <Reveal>
            <h2 className="display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl leading-tight">
              {t.process.titlePart1}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {t.process.titlePart2}
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              {t.process.desc}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
             <a href="#contacto" className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-slate-900 px-8 text-sm font-bold text-white transition-all hover:bg-blue-600 hover:shadow-[0_10px_20px_rgba(37,99,235,0.2)]">
              {t.process.ctaBtn}
            </a>
          </Reveal>
        </div>

        {/* Cuadrícula de Beneficios */}
        <div className="mt-28">
          <Reveal>
            <h3 className="display text-center text-3xl font-bold text-slate-900 mb-16">
              {t.process.gridTitle}
            </h3>
          </Reveal>
          <div className="grid grid-cols-2 gap-x-6 gap-y-16 sm:grid-cols-4 lg:gap-x-12">
            {t.process.steps.map((s: any, i: number) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <div className="group flex flex-col items-center text-center cursor-default">
                  <PremiumIcon />
                  <h4 className="text-[0.95rem] font-bold text-slate-800 leading-snug max-w-[160px] group-hover:text-blue-600 transition-colors">
                    {s.title}
                  </h4>
                  {/* Pequeño separador decorativo */}
                  <div className="mt-3 h-1 w-6 rounded-full bg-slate-200 transition-all duration-300 group-hover:w-10 group-hover:bg-blue-500" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}