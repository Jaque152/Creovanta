"use client";

import { Reveal } from "@/components/site/reveal";
import { useLanguage } from "@/lib/language-context";
import { motion } from "framer-motion";

// Gráficos 3D mejorados con CSS y Framer Motion
const LayeredGraphic1 = () => (
  <div className="relative h-28 w-28 [transform:rotateX(55deg)_rotateZ(-45deg)] [transform-style:preserve-3d]">
    <motion.div 
      animate={{ z: [0, 20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-400 shadow-[20px_20px_30px_rgba(30,58,138,0.2)]" 
    />
    <motion.div 
      animate={{ z: [20, 50, 20] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-0 rounded-2xl bg-white/30 backdrop-blur-md border border-white/60 shadow-lg" 
    />
  </div>
);

const LayeredGraphic2 = () => (
  <div className="relative h-28 w-28 [transform:rotateX(55deg)_rotateZ(-45deg)] [transform-style:preserve-3d]">
    <div className="absolute inset-4 rounded-xl bg-indigo-200 border border-indigo-300 shadow-md" />
    <motion.div animate={{ z: [10, 30, 10] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-2 rounded-xl bg-indigo-400 border border-indigo-300 shadow-lg" />
    <motion.div animate={{ z: [30, 60, 30] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-[10px_10px_20px_rgba(0,0,0,0.15)] border border-indigo-500" />
  </div>
);

const LayeredGraphic3 = () => (
  <div className="relative h-28 w-28 [transform:rotateX(55deg)_rotateZ(-45deg)] [transform-style:preserve-3d]">
    <div className="absolute inset-0 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shadow-inner">
      <div className="h-10 w-10 bg-blue-100 rounded-full" />
    </div>
    <motion.div animate={{ x: [-10, 10, -10], y: [10, -10, 10], z: [30, 30, 30] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute -inset-2 rounded-xl bg-blue-500/80 backdrop-blur-sm border border-blue-400 shadow-2xl" />
  </div>
);

const LayeredGraphic4 = () => (
  <div className="relative h-28 w-28 [transform:rotateX(55deg)_rotateZ(-45deg)] [transform-style:preserve-3d]">
    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 shadow-[15px_15px_30px_rgba(30,58,138,0.2)]" />
    <motion.div animate={{ scale: [1, 1.2, 1], z: [20, 40, 20] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-4 rounded-full bg-white/40 backdrop-blur-md border border-white/60" />
  </div>
);

const LayeredGraphic5 = () => (
  <div className="relative h-28 w-28 [transform:rotateX(55deg)_rotateZ(-45deg)] [transform-style:preserve-3d]">
    <motion.div animate={{ rotateZ: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border-[6px] border-dashed border-blue-200" />
    <motion.div animate={{ z: [15, 35, 15] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-xl border border-blue-400" />
  </div>
);

const graphics = [LayeredGraphic1, LayeredGraphic2, LayeredGraphic3, LayeredGraphic4, LayeredGraphic5];

export function Services() {
  const { t } = useLanguage();

  return (
    <section id="servicios" className="bg-[#F8FAFC] py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] container-px">
        <Reveal>
          <h2 className="display text-center text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {t.services.title}
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((item: any, i: number) => {
            const Graphic = graphics[i % graphics.length];
            return (
              <Reveal key={item.n} delay={i * 0.1}>
                <motion.div 
                  whileHover={{ y: -8 }}
                  className="group relative flex h-full flex-col items-center rounded-3xl bg-white p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all hover:shadow-[0_20px_40px_rgba(30,58,138,0.08)] border border-slate-100"
                >
                  <div className="mb-10 flex h-36 w-full items-center justify-center">
                    <Graphic />
                  </div>
                  <h3 className="display text-xl font-bold text-slate-900 text-center group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[0.9rem] leading-relaxed text-slate-600 text-center">
                    {item.desc}
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}