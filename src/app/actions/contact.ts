"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactFormState {
  nombre: string;
  correo: string;
  telefono: string;
  asunto: string;
  mensaje: string;
}

export interface ContactPayload {
  form: ContactFormState;
  lang: "es" | "en";
}

export async function processContact(payload: ContactPayload) {
  try {
    const { form, lang } = payload;
    const adminEmail = "administracion@creovanta.com.mx";
    const senderEmail = "Creovanta <administracion@creovanta.com.mx>";

    const texts = {
      es: {
        subjectClient: "Hemos recibido tu mensaje - Creovanta",
        subjectAdmin: `Nuevo mensaje de contacto: ${form.nombre}`,
        title: "¡Gracias por contactarnos!",
        subtitle: "Soporte y Atención Comercial",
        hello: "Hola",
        intro: "Hemos recibido tu mensaje correctamente. Nuestro equipo revisará los requerimientos de tu proyecto y se pondrá en contacto contigo a la brevedad.",
        details: "Detalles de la Solicitud:",
        name: "Nombre:",
        email: "Correo:",
        phone: "Teléfono:",
        subject: "Asunto:",
        message: "Mensaje:",
        footer: "Creovanta — Soluciones Tecnológicas y Digitales Avanzadas."
      },
      en: {
        subjectClient: "We have received your message - Creovanta",
        subjectAdmin: `New contact message: ${form.nombre}`,
        title: "Thank you for reaching out!",
        subtitle: "Support & Commercial Team",
        hello: "Hello",
        intro: "We have successfully received your message. Our team will review your project requirements and get back to you shortly.",
        details: "Request Details:",
        name: "Name:",
        email: "Email:",
        phone: "Phone:",
        subject: "Subject:",
        message: "Message:",
        footer: "Creovanta — Advanced Technological & Digital Solutions."
      }
    };

    const t = texts[lang] || texts["es"];

    // Diseño Creovanta Clean Corporate Light Theme
    const emailBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; background-color: #F8FAFC; color: #0F172A; border: 1px solid #E2E8F0; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
        <div style="background: linear-gradient(135deg, #1E3A8A 0%, #3730A3 50%, #4F46E5 100%); height: 6px; width: 100%;"></div>
        <div style="padding: 40px 35px; background-color: #FFFFFF;">
          <div style="margin-bottom: 24px;">
            <span style="font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #1E3A8A; font-weight: 700; background-color: #EFF6FF; padding: 6px 12px; border-radius: 8px; border: 1px solid #BFDBFE;">${t.subtitle}</span>
          </div>
          
          <h2 style="color: #0F172A; margin: 0 0 12px 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em;">${t.title}</h2>
          <p style="font-size: 15px; line-height: 1.6; color: #334155; margin: 0 0 8px 0;">${t.hello} <strong style="color: #1E3A8A;">${form.nombre}</strong>,</p>
          <p style="font-size: 14px; line-height: 1.6; color: #64748B; margin: 0 0 30px 0;">${t.intro}</p>
          
          <h3 style="margin: 0 0 12px 0; color: #0F172A; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700;">${t.details}</h3>
          <div style="font-size: 13px; color: #475569; line-height: 1.8; background-color: #F8FAFC; padding: 20px; border-radius: 14px; border: 1px solid #E2E8F0;">
            <strong style="color: #1E3A8A;">${t.name}</strong> <span style="color: #0F172A;">${form.nombre}</span><br/>
            <strong style="color: #1E3A8A;">${t.email}</strong> <span style="color: #0F172A;">${form.correo}</span><br/>
            <strong style="color: #1E3A8A;">${t.phone}</strong> <span style="color: #0F172A;">${form.telefono || "N/A"}</span><br/>
            <strong style="color: #1E3A8A;">${t.subject}</strong> <span style="color: #0F172A;">${form.asunto || "N/A"}</span><br/>
            
            <strong style="color: #1E3A8A; display: block; margin-top: 15px; border-top: 1px dashed #CBD5E1; padding-top: 12px;">${t.message}</strong>
            <div style="margin-top: 6px; color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${form.mensaje}</div>
          </div>

          <div style="margin-top: 40px; padding-top: 25px; border-top: 1px solid #E2E8F0; text-align: center;">
            <p style="margin: 0; font-size: 11px; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 600;">${t.footer}</p>
          </div>
        </div>
      </div>
    `;

    if (!process.env.RESEND_API_KEY) {
      console.warn("⚠️ Advertencia: RESEND_API_KEY no está configurada.");
    }

    try {
      await resend.emails.send({
        from: senderEmail,
        to: form.correo,
        subject: t.subjectClient,
        html: emailBody,
      });
    } catch (e) {
      console.error("❌ Error enviando correo al cliente:", e);
    }

    try {
      await resend.emails.send({
        from: senderEmail,
        to: adminEmail,
        subject: t.subjectAdmin,
        html: `<div style="background-color: #F1F5F9; padding: 30px;">${emailBody}</div>`,
      });
    } catch (e) {
      console.error("❌ Error enviando notificación al admin:", e);
    }

    return { success: true };
  } catch (error: unknown) {
    console.error("❌ Error general en processContact:", error);
    const errorMessage = error instanceof Error ? error.message : "Ocurrió un error desconocido";
    return { success: false, error: errorMessage };
  }
}