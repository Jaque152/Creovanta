import type { Metadata } from "next";
import { PagoPersonalizadoClient } from "@/components/site/pago-personalizado-client";

export const metadata: Metadata = {
  title: "Pago Personalizado — Devion",
  description: "Realiza el pago a la medida de tu proyecto digital. Genera tu orden segura 100% en línea.",
};

export default function PagoPersonalizadoPage() {
  return <PagoPersonalizadoClient />;
}