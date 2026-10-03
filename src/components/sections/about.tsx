"use client";

import Link from "next/link";
import { Reveal } from "@/components/site/reveal";
import { useLanguage } from "@/lib/language-context";
import { motion } from "framer-motion";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="plataforma" className="relative overflow-hidden bg-gradient-to-br from-[#F5F7FA] to-[#EAEFFA] py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-16 container-px lg:grid-cols-2 lg:items-center">
        
        {/* Lado Izquierdo: Composición Isométrica CSS */}
        <div className="relative h-[500px] w-full perspective-[1200px]">
          <motion.div 
            animate={{ y: [-15, 15, -15] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 h-80 w-64 -translate-x-1/2 -translate-y-1/2 [transform:rotateX(55deg)_rotateZ(-45deg)]"
          >
            {/* Dispositivo principal */}
            <div className="absolute inset-0 rounded-3xl bg-white shadow-2xl border-4 border-slate-100">
              <div className="absolute inset-2 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 shadow-inner flex items-center justify-center overflow-hidden">
                 <div className="h-32 w-32 bg-white/20 backdrop-blur-md rounded-xl" />
              </div>
            </div>
            
            {/* Pantalla flotante lateral */}
            <motion.div 
              animate={{ z: [20, 50, 20] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-20 top-10 h-32 w-48 rounded-xl bg-white/90 backdrop-blur-lg shadow-xl border border-slate-200 p-2"
            >
              <div className="h-full w-full bg-blue-100/50 rounded-lg border border-blue-200/50" />
            </motion.div>

            {/* Elemento inferior flotante */}
            <motion.div 
              animate={{ z: [10, -20, 10] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-10 -bottom-10 h-24 w-32 rounded-lg bg-indigo-600 shadow-2xl border border-indigo-400"
            />
          </motion.div>
        </div>

        {/* Lado Derecho: Contenido de Texto */}
        <div className="max-w-xl">
          <Reveal>
            <h2 className="display text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              {t.about.titlePart1}
              <br />
              {t.about.titlePart2}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              {t.about.p1}
            </p>
          </Reveal>
          
          <div className="mt-10 space-y-8">
            {t.about.servicesList.map((service: string, i: number) => (
              <Reveal key={i} delay={0.2 + (i * 0.1)}>
                <div className="border-l-4 border-indigo-600 pl-6">
                  <h4 className="text-lg font-bold text-slate-900">{service}</h4>
                  <p className="mt-2 text-sm text-slate-500">{t.about.p2}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <Link 
              href="/servicios"
              className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-[#0B1B3D] px-8 text-sm font-bold text-white transition-all hover:bg-blue-600"
            >
              {t.about.ctaBtn}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}