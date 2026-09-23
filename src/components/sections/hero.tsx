"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % words.length), 2300);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <span className="relative inline-flex h-[1.4em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-110%" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-clay to-ochre"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative isolate overflow-hidden bg-ink text-cream-paper min-h-[90vh] flex flex-col justify-center border-b border-clay/20">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#00E5FF0A_1px,transparent_1px),linear-gradient(to_bottom,#00E5FF0A_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      <div aria-hidden className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="absolute h-[600px] w-[600px] rounded-full bg-clay/20 blur-[150px] mix-blend-screen" />
        <div className="absolute right-[-10%] top-[10%] h-[400px] w-[400px] rounded-full bg-ochre/20 blur-[150px] mix-blend-screen" />
      </div>

      <div className="mx-auto max-w-[1400px] container-px py-20 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 rounded-sm border border-clay/30 bg-clay/10 px-4 py-1.5"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-clay shadow-[0_0_8px_#00E5FF]" />
          <span className="eyebrow !text-[0.65rem] !tracking-[0.2em] text-clay">{t.hero.eyebrow}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-3 font-mono text-sm uppercase tracking-[0.16em] text-cream-paper/70"
        >
          {t.hero.weCreate} <RotatingWord words={t.hero.rotatingWords} />
        </motion.div>

        <h1 className="display mt-6 font-black uppercase leading-[0.9] tracking-tighter text-cream-paper">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="block text-[clamp(2.8rem,10vw,8rem)]"
          >
            {t.hero.titlePart1}<span className="text-transparent bg-clip-text bg-gradient-to-r from-clay to-ochre">{t.hero.titlePart2}</span>
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <p className="text-center font-mono text-[0.8rem] leading-relaxed tracking-[0.1em] text-cream-paper/60 whitespace-pre-line">
            {t.hero.deliveryText}
          </p>
        </motion.div>
      </div>
    </section>
  );
}