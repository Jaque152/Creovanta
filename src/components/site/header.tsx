"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { count, toggle, hydrated } = useCart();
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className={cn(
          "transition-all duration-500 ease-in-out",
          scrolled
            ? "bg-[#0B1121]/80 backdrop-blur-lg border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] py-2"
            : "bg-transparent border-b border-transparent py-4"
        )}
      >
        <div className="mx-auto flex h-[60px] max-w-[1400px] items-center justify-between gap-6 container-px">
          <Link href="/" aria-label="Inicio" className="hover:scale-105 transition-transform duration-300">
            {/* Forzamos la variante oscura/crema del logo para que resalte en el fondo oscuro */}
            <Logo variant="cream" /> 
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {t.header.nav.map((l: { href: string; label: string }) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "font-mono text-[0.75rem] uppercase tracking-[0.16em] font-semibold transition-all duration-300 relative",
                    active 
                      ? "text-blue-400" 
                      : "text-white/70 hover:text-white"
                  )}
                >
                  {l.label}
                  {active && (
                    <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-full border border-white/20 bg-black/20 p-1 font-mono text-[0.65rem] font-bold tracking-wider backdrop-blur-sm">
              <button
                type="button"
                onClick={() => setLang("es")}
                className={cn(
                  "rounded-full px-3 py-1.5 transition-all duration-300",
                  lang === "es"
                    ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                    : "text-white/60 hover:text-white"
                )}
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={cn(
                  "rounded-full px-3 py-1.5 transition-all duration-300",
                  lang === "en"
                    ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                    : "text-white/60 hover:text-white"
                )}
              >
                EN
              </button>
            </div>

            <Button asChild size="sm" className="hidden sm:inline-flex rounded-full bg-blue-600 text-white hover:bg-indigo-500 hover:scale-105 transition-all duration-300 font-bold shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] border-none">
              <Link href="/contacto">{t.header.cta}</Link>
            </Button>

            <button
              type="button"
              onClick={toggle}
              aria-label={t.header.cartAria}
              className="relative grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/20 text-white transition-all hover:bg-blue-600 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] backdrop-blur-sm"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {hydrated && count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-indigo-500 px-1 font-mono text-[0.62rem] font-bold text-white shadow-md">
                  {count}
                </span>
              )}
            </button>

            {/* Menú Móvil */}
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label={t.header.menuAria}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/20 text-white transition-colors hover:bg-blue-600 md:hidden backdrop-blur-sm"
                >
                  <Menu className="h-[18px] w-[18px]" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full border-l border-white/10 p-0 text-white sm:max-w-sm bg-[#0B1121]/95 backdrop-blur-2xl">
                <div className="flex h-full flex-col">
                  <div className="border-b border-white/10 px-7 py-6">
                    <Logo variant="cream" />
                  </div>
                  <nav className="flex flex-1 flex-col justify-center gap-2 px-7">
                    {t.header.nav.map((l: { href: string; label: string }, i: number) => (
                      <SheetClose asChild key={l.href}>
                        <Link href={l.href} className="group flex items-center gap-4 border-b border-white/5 py-5">
                          <span className="font-mono text-xs font-bold text-blue-500">0{i + 1}</span>
                          <span className="display text-3xl font-bold text-white transition-colors group-hover:text-blue-400">
                            {l.label}
                          </span>
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="px-7 py-7 bg-black/20 border-t border-white/10">
                    <SheetClose asChild>
                      <Button asChild size="lg" className="w-full rounded-full bg-blue-600 text-white font-bold hover:bg-indigo-500">
                        <Link href="/contacto">{t.header.cta}</Link>
                      </Button>
                    </SheetClose>
                    <p className="mt-5 text-center font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/50">
                      {t.header.contactEmail}
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}