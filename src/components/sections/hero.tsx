"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#1E3A8A] via-[#3730A3] to-[#701A75] text-center">
      {/* Patrón de fondo geométrico sutil */}
      <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Formas isométricas flotantes de fondo */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          animate={{ y: [-20, 20, -20] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[10%] top-[20%] h-64 w-64 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 [transform:rotateX(60deg)_rotateZ(-45deg)]"
        />
        <motion.div 
          animate={{ y: [20, -20, 20] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[5%] bottom-[10%] h-80 w-80 rounded-3xl bg-[#4F46E5]/20 backdrop-blur-3xl border border-white/5 [transform:rotateX(60deg)_rotateZ(-45deg)]"
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="display text-5xl font-bold leading-tight text-white sm:text-7xl drop-shadow-lg"
        >
          {t.hero.titlePart1}
          <span className="text-white">{t.hero.titlePart2}</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl font-medium"
        >
          {t.hero.deliveryText}
        </motion.p>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-12">
          <Link 
            href="/contacto" 
            className="inline-flex h-14 items-center justify-center rounded-full bg-[#0B1B3D] px-10 text-lg font-bold text-white transition-all hover:bg-[#152b5e] hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1"
          >
            {t.hero.ctaBtn}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}