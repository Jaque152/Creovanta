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
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* nav */}
      <div
        className={cn(
          "transition-all duration-300",
          scrolled
            ? "border-b border-clay/20 bg-ink/85 backdrop-blur-md shadow-sm"
            : "border-b border-transparent bg-ink/40 backdrop-blur-sm"
        )}
      >
        <div className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between gap-6 container-px">
          <Link href="/" aria-label="Devion inicio">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {t.header.nav.map((l: any) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "link-underline font-mono text-[0.72rem] uppercase tracking-[0.16em] font-semibold transition-colors",
                    active ? "text-clay" : "text-cream-paper/70 hover:text-clay"
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {/* Selector de Idioma ES | EN */}
            <div className="flex items-center rounded-md border border-clay/20 bg-ink-2 p-0.5 font-mono text-[0.68rem] font-bold tracking-wider">
              <button
                type="button"
                onClick={() => setLang("es")}
                className={cn(
                  "rounded-sm px-2.5 py-1 transition-all",
                  lang === "es"
                    ? "bg-clay text-ink shadow-[0_0_10px_rgba(0,229,255,0.3)]"
                    : "text-clay/60 hover:text-clay"
                )}
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={cn(
                  "rounded-sm px-2.5 py-1 transition-all",
                  lang === "en"
                    ? "bg-clay text-ink shadow-[0_0_10px_rgba(0,229,255,0.3)]"
                    : "text-clay/60 hover:text-clay"
                )}
              >
                EN
              </button>
            </div>

            <Button asChild size="sm" className="hidden sm:inline-flex bg-clay text-ink hover:bg-cream-paper font-bold shadow-[0_0_15px_rgba(0,229,255,0.2)]">
              <Link href="/contacto">{t.header.cta}</Link>
            </Button>

            <button
              type="button"
              onClick={toggle}
              aria-label={t.header.cartAria}
              className="relative grid h-10 w-10 place-items-center rounded-md border border-clay/20 bg-ink-2 text-clay transition-all hover:border-clay hover:shadow-[0_0_15px_rgba(0,229,255,0.2)]"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {hydrated && count > 0 && (
                <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-ochre px-1 font-mono text-[0.62rem] font-bold text-white shadow-[0_0_10px_rgba(176,38,255,0.4)]">
                  {count}
                </span>
              )}
            </button>

            {/* mobile menu */}
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label={t.header.menuAria}
                  className="grid h-10 w-10 place-items-center rounded-md border border-clay/20 bg-ink-2 text-clay transition-colors hover:border-clay md:hidden"
                >
                  <Menu className="h-[18px] w-[18px]" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="ink-panel w-full border-l border-clay/20 p-0 text-cream-paper sm:max-w-sm [&>button]:text-cream-paper/70"
              >
                <div className="flex h-full flex-col bg-ink">
                  <div className="border-b border-clay/20 px-7 py-6">
                    <Logo variant="cream" />
                  </div>
                  <nav className="flex flex-1 flex-col justify-center gap-1 px-7">
                    {t.header.nav.map((l: any, i: number) => (
                      <SheetClose asChild key={l.href}>
                        <Link
                          href={l.href}
                          className="group flex items-center gap-4 border-b border-clay/10 py-5"
                        >
                          <span className="font-mono text-xs font-bold text-clay">
                            0{i + 1}
                          </span>
                          <span className="display text-3xl font-bold text-cream-paper transition-colors group-hover:text-clay">
                            {l.label}
                          </span>
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="px-7 py-7 bg-ink-2 border-t border-clay/20">
                    <SheetClose asChild>
                      <Button asChild size="lg" className="w-full bg-clay text-ink font-bold hover:bg-cream-paper">
                        <Link href="/contacto">{t.header.cta}</Link>
                      </Button>
                    </SheetClose>
                    <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-cream-paper/40">
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