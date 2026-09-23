import type { Metadata } from "next";
import { ServiciosClient } from "@/components/site/servicios-client";

export const metadata: Metadata = {
  title: "Servicios — Devion",
  description:
    "Planes de diseño y desarrollo web a la medida: páginas web, tiendas en línea, plataformas, branding y marketing. Precios en MXN.",
};

export default function ServiciosPage() {
  return <ServiciosClient />;
}