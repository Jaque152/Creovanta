"use client";

import { useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { toast } from "sonner";
import { Copy, Gift, Loader2, PartyPopper, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import {
  COUPONS,
  MAX_SPINS,
  canSpin,
  getSpinCount,
  pickWeightedCoupon,
  registerSpin,
  Coupon,
} from "@/lib/coupons";

const SECTORS = COUPONS.length; // 5

const SECTOR_COLORS = [
  "#1E3A8A",
  "#4F46E5",
  "#F43F5E",
  "#8B5CF6",
  "#0EA5E9",
];

export function DiscountWheel() {
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<Coupon | null>(null);
  const [spins, setSpins] = useState(0);
  const [copied, setCopied] = useState(false);
  const controls = useAnimation();
  const rotationRef = useRef(0);

  const handleOpen = () => {
    setSpins(getSpinCount());
    setResult(null);
    setCopied(false);
    setOpen(true);
  };

  const handleSpin = async () => {
    if (spinning || !canSpin()) return;

    setSpinning(true);
    setResult(null);
    setCopied(false);

    const winner = pickWeightedCoupon();
    const winnerIndex = COUPONS.findIndex((c) => c.code === winner.code);
    const sectorIndex = winnerIndex < 0 ? 0 : winnerIndex;

    const sectorSize = 360 / SECTORS;
    const midAngle = sectorIndex * sectorSize + sectorSize / 2;

    const fullTurns = 6 + Math.floor(Math.random() * 3);
    const targetRotation =
      rotationRef.current + fullTurns * 360 + (360 - midAngle);

    rotationRef.current = targetRotation;

    await controls.start({
      rotate: targetRotation,
      transition: { duration: 4.2, ease: [0.2, 0.9, 0.15, 1] },
    });

    const ok = registerSpin(winner.code);
    if (!ok) {
      toast.error(t.wheel.limitTitle, { description: t.wheel.limitDesc });
      setSpinning(false);
      return;
    }

    setResult(winner);
    setSpins(getSpinCount());
    setSpinning(false);

    toast.success(t.wheel.winToast, {
      description: winner.label[lang],
    });
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.code);
      setCopied(true);
      toast.success(t.wheel.copiedToast);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error(t.wheel.copyError);
    }
  };

  const remaining = Math.max(0, MAX_SPINS - spins);

  return (
    <>
      <Button
        type="button"
        onClick={handleOpen}
        className="group h-14 rounded-full bg-gradient-to-r from-[#F43F5E] to-[#8B5CF6] px-10 text-base font-bold text-white shadow-xl shadow-rose-500/20 transition-all hover:scale-[1.03] hover:shadow-2xl"
      >
        <Gift className="mr-2 h-5 w-5 transition-transform group-hover:-rotate-12" />
        {t.wheel.trigger}
        <Sparkles className="ml-2 h-4 w-4 opacity-80" />
      </Button>

      <Dialog open={open} onOpenChange={(o) => !spinning && setOpen(o)}>
        <DialogContent
          className="flex max-h-[90dvh] w-[95vw] max-w-md flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-0 shadow-2xl"
        >
          {/* Header compacto */}
          <div className="relative shrink-0 bg-gradient-to-br from-[#1E3A8A] via-[#3730A3] to-[#701A75] px-6 py-4 text-center text-white">
            <DialogTitle className="display text-lg font-extrabold sm:text-xl">
              {t.wheel.title}
            </DialogTitle>
            <DialogDescription className="mt-0.5 text-xs text-slate-200">
              {t.wheel.subtitle}
            </DialogDescription>
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 font-mono text-[0.6rem] font-bold uppercase tracking-widest text-white/90">
              {t.wheel.attempts.replace("{n}", String(remaining))}
            </span>
          </div>

          {/* Contenido scrolleable */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            {/* Ruleta — más chica para caber en 800px */}
            <div className="relative mx-auto aspect-square w-full max-w-[220px]">
              <div className="absolute -top-1.5 left-1/2 z-20 -translate-x-1/2">
                <div className="h-0 w-0 border-l-[10px] border-r-[10px] border-t-[16px] border-l-transparent border-r-transparent border-t-[#F43F5E] drop-shadow-lg" />
              </div>

              <motion.div
                animate={controls}
                className="relative h-full w-full rounded-full border-[3px] border-white shadow-2xl"
                style={{ transformOrigin: "center" }}
              >
                <svg viewBox="0 0 200 200" className="h-full w-full rounded-full">
                  {COUPONS.map((coupon, i) => {
                    const sectorSize = 360 / SECTORS;
                    const startAngle = i * sectorSize - 90;
                    const endAngle = startAngle + sectorSize;
                    const cx = 100;
                    const cy = 100;
                    const r = 100;

                    const x1 = cx + r * Math.cos((Math.PI * startAngle) / 180);
                    const y1 = cy + r * Math.sin((Math.PI * startAngle) / 180);
                    const x2 = cx + r * Math.cos((Math.PI * endAngle) / 180);
                    const y2 = cy + r * Math.sin((Math.PI * endAngle) / 180);

                    const largeArc = sectorSize > 180 ? 1 : 0;
                    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;

                    const percentLabel = coupon.label[lang]
                      .replace(/ de descuento/i, "")
                      .replace(/ off/i, "");

                    const midAngle = startAngle + sectorSize / 2;
                    const tx = cx + 62 * Math.cos((Math.PI * midAngle) / 180);
                    const ty = cy + 62 * Math.sin((Math.PI * midAngle) / 180);

                    return (
                      <g key={coupon.code}>
                        <path
                          d={path}
                          fill={SECTOR_COLORS[i % SECTOR_COLORS.length]}
                          stroke="#ffffff"
                          strokeWidth="1"
                        />
                        <text
                          x={tx}
                          y={ty}
                          fill="#ffffff"
                          fontSize="14"
                          fontWeight="900"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          transform={`rotate(${midAngle} ${tx} ${ty})`}
                        >
                          {percentLabel}
                        </text>
                      </g>
                    );
                  })}
                  <circle cx="100" cy="100" r="16" fill="#ffffff" />
                  <circle cx="100" cy="100" r="12" fill="#1E3A8A" />
                </svg>
              </motion.div>
            </div>

            {/* Resultado / Acción — compactado */}
            <div className="mt-5">
              {result ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 text-emerald-600">
                    <PartyPopper className="h-4 w-4" />
                    <p className="font-mono text-[0.65rem] font-bold uppercase tracking-widest">
                      {t.wheel.youWon}
                    </p>
                  </div>
                  <p className="display text-center text-2xl font-black text-slate-900">
                    {result.label[lang]}
                  </p>
                  <div className="flex items-center gap-2 rounded-xl border-2 border-dashed border-[#1E3A8A]/30 bg-blue-50 px-3 py-2">
                    <code className="flex-1 font-mono text-base font-black tracking-widest text-[#1E3A8A]">
                      {result.code}
                    </code>
                    <Button
                      type="button"
                      onClick={handleCopy}
                      className="h-8 rounded-lg bg-[#1E3A8A] px-3 text-[0.7rem] font-bold text-white hover:bg-blue-700"
                    >
                      {copied ? t.wheel.copied : t.wheel.copy}
                      <Copy className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-center text-xs font-medium text-slate-500">
                    {t.wheel.instruction}
                  </p>
                  <Button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="h-11 w-full rounded-xl bg-slate-900 text-sm font-bold text-white hover:bg-slate-800"
                  >
                    {t.wheel.close}
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  onClick={handleSpin}
                  disabled={spinning || !canSpin()}
                  className="h-12 w-full rounded-xl bg-gradient-to-r from-[#1E3A8A] to-[#4F46E5] text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {spinning ? (
                    <>
                      {t.wheel.spinning}
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    </>
                  ) : !canSpin() ? (
                    t.wheel.noMoreSpins
                  ) : (
                    <>
                      {t.wheel.spinBtn}
                      <Sparkles className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}