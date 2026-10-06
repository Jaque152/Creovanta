"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ProductPlan } from "./products";
import { findCoupon, Coupon } from "./coupons";

export const IVA_RATE = 0.16;

export interface CartItem {
  product: ProductPlan;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  count: number;
  subtotal: number;
  discountAmount: number;
  discountedSubtotal: number;
  iva: number;
  total: number;
  coupon: Coupon | null;
  couponError: string | null;
  isOpen: boolean;
  hydrated: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  add: (product: ProductPlan) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  applyCoupon: (code: string) => { ok: boolean; message?: string };
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("Devion_cart");
      if (saved) setItems(JSON.parse(saved));

      const savedCoupon = localStorage.getItem("Devion_coupon");
      if (savedCoupon) {
        const parsed = JSON.parse(savedCoupon);
        const found = findCoupon(parsed?.code ?? "");
        if (found) setCoupon(found);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("Devion_cart", JSON.stringify(items));
  }, [items, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    if (coupon) {
      localStorage.setItem("Devion_coupon", JSON.stringify({ code: coupon.code }));
    } else {
      localStorage.removeItem("Devion_coupon");
    }
  }, [coupon, hydrated]);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(!isOpen);

  const add = (product: ProductPlan) => {
    setItems((prev) => {
      const ex = prev.find((i) => i.product.id === product.id);
      if (ex)
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      return [...prev, { product, qty: 1 }];
    });
  };

  const setQty = (id: string, qty: number) => {
    if (qty < 1) return remove(id);
    setItems((prev) =>
      prev.map((i) => (i.product.id === id ? { ...i, qty } : i))
    );
  };

  const remove = (id: string) =>
    setItems((prev) => prev.filter((i) => i.product.id !== id));

  const clear = () => {
    setItems([]);
    setCoupon(null);
    setCouponError(null);
  };

  const applyCoupon = (code: string): { ok: boolean; message?: string } => {
    setCouponError(null);
    const found = findCoupon(code);
    if (!found) {
      const msg = "Cupón inválido";
      setCouponError(msg);
      return { ok: false, message: msg };
    }
    setCoupon(found);
    return { ok: true };
  };

  const removeCoupon = () => {
    setCoupon(null);
    setCouponError(null);
  };

  const count = items.reduce((acc, i) => acc + i.qty, 0);
  const subtotal = items.reduce((acc, i) => acc + i.product.priceMXN * i.qty, 0);
  const discountAmount = coupon ? subtotal * coupon.discount : 0;
  const discountedSubtotal = subtotal - discountAmount;
  const iva = discountedSubtotal * IVA_RATE;
  const total = discountedSubtotal + iva;

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        subtotal,
        discountAmount,
        discountedSubtotal,
        iva,
        total,
        coupon,
        couponError,
        isOpen,
        hydrated,
        open,
        close,
        toggle,
        add,
        setQty,
        remove,
        clear,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}