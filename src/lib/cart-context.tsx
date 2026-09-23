"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ProductPlan } from "./products";

export const IVA_RATE = 0.16;

export interface CartItem {
  product: ProductPlan;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  count: number;
  subtotal: number;
  iva: number;
  total: number;
  isOpen: boolean;
  hydrated: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  add: (product: ProductPlan) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("Devion_cart");
    if (saved) setItems(JSON.parse(saved));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("Devion_cart", JSON.stringify(items));
  }, [items, hydrated]);

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
  const clear = () => setItems([]);

  const count = items.reduce((acc, i) => acc + i.qty, 0);
  const subtotal = items.reduce((acc, i) => acc + i.product.priceMXN * i.qty, 0);
  const iva = subtotal * IVA_RATE;
  const total = subtotal + iva;

  return (
    <CartContext.Provider
      value={{ items, count, subtotal, iva, total, isOpen, hydrated, open, close, toggle, add, setQty, remove, clear }}
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