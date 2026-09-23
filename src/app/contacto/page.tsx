import type { Metadata } from "next";
import { ContactoClient } from "@/components/site/contacto-client";

export const metadata: Metadata = {
  title: "Contacto — Devion",
  description:
    "¿Tienes un proyecto? Hablemos. Completa el formulario y te enviaremos una propuesta personalizada.",
};

export default function ContactoPage() {
  return <ContactoClient />;
}