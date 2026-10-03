"use server";

import { Resend } from "resend";
import axios from "axios";

const resend = new Resend(process.env.RESEND_API_KEY);
const ETOMIN_API_URL = "https://pagos.etomin.com/api/v1";

const etominClient = axios.create({
  baseURL: ETOMIN_API_URL,
  headers: {
    'accept': 'application/json',
    'content-type': 'application/json',
  },
});

async function getEtominAuthToken(): Promise<string> {
  const { data } = await etominClient.post('/signin', {
    email: process.env.ETOMIN_USER,
    password: process.env.ETOMIN_PASSWORD,
  });
  return data.authToken;
}

async function tokenizeEtominCard(token: string, cardNum: string, cardName: string, expMonth: string, expYear: string): Promise<string> {
  const { data } = await etominClient.post(
    '/card/tokenizer',
    {
      cardData: {
        cardNumber: cardNum.replace(/\s/g, ''),
        cardholderName: cardName,
        expirationYear: expYear,
        expirationMonth: expMonth,
      },
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data.cardNumberToken;
}

export interface CheckoutFormState {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  empresa?: string;
  rfc?: string;
  direccion: string;
  ciudad: string;
  estado: string;
  cp: string;
  pais: string;
  card: string;
  cardName: string;
  exp: string;
  cvc: string;
  notas?: string;
}

export interface CheckoutItem {
  product: {
    id: string | number;
    priceMXN: number;
    es: { name: string };
    en: { name: string };
  };
  qty: number;
}

export interface CheckoutPayload {
  form: CheckoutFormState;
  items: CheckoutItem[];
  totals: {
    subtotal: number;
    iva: number;
    total: number;
  };
  lang: "es" | "en";
}

export async function processCheckout(payload: CheckoutPayload) {
  try {
    const { form, items, totals, lang } = payload;
    const orderId = `CV-${Math.floor(100000 + Math.random() * 899999)}`;
    const currentLang = lang || "es";

    if (!process.env.ETOMIN_USER || !process.env.ETOMIN_PASSWORD) {
      throw new Error("Credenciales de la pasarela Etomin no configuradas en el servidor.");
    }

    const token = await getEtominAuthToken();

    const expParts = form.exp.split("/");
    const month = expParts[0].trim();
    const year = `20${expParts[1].trim()}`;

    const cardToken = await tokenizeEtominCard(token, form.card, form.cardName, month, year);
    if (!cardToken) throw new Error("Error al tokenizar la tarjeta de crédito.");

    const currencyCode = "484";
    const salePayload = {
      amount: Math.round(totals.total * 100) / 100,
      currency: currencyCode,
      reference: orderId,
      customerInformation: {
        firstName: form.nombre,
        lastName: form.apellidos,
        email: form.email,
        phone1: form.telefono,
        address1: form.direccion,
        city: form.ciudad,
        state: form.estado,
        postalCode: form.cp,
        country: form.pais === "México" ? "MX" : form.pais,
        company: form.empresa || "",
        ip: "127.0.0.1",
      },
      cardData: {
        cardNumberToken: cardToken,
        cvv: form.cvc.replace(/\s/g, ""),
      },
    };

    const { data: saleData } = await etominClient.post('/sale', salePayload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const status = saleData.status?.toUpperCase();

    if (status === "DECLINED") {
      return { success: false, error: "Pago declinado. Verifica los fondos o intenta con otra tarjeta." };
    }

    if (status === "PENDING" && saleData.redirectTo) {
      return { success: true, redirectTo: saleData.redirectTo };
    }

    if (status !== "APPROVED") {
      return { success: false, error: "La transacción fue rechazada o no pudo ser aprobada por el banco." };
    }

    await enviarCorreos(orderId, form, items, totals, currentLang);

    return { success: true, orderId };
  } catch (error: unknown) {
    let errorMessage = "Ocurrió un error al procesar el pago.";
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data as { message?: string } | undefined;
      console.error("Etomin Payment Error:", responseData || error.message);
      errorMessage = responseData?.message || error.message;
    } else if (error instanceof Error) {
      console.error("Etomin Payment Error:", error.message);
      errorMessage = error.message;
    } else {
      console.error("Etomin Payment Error:", error);
    }
    return { success: false, error: errorMessage };
  }
}

async function enviarCorreos(
  orderId: string,
  form: CheckoutFormState,
  items: CheckoutItem[],
  totals: { subtotal: number; iva: number; total: number },
  lang: "es" | "en"
) {
  const adminEmail = "administracion@creovanta.com.mx";
  const senderEmail = "Creovanta <administracion@creovanta.com.mx>";

  const texts = {
    es: {
      subjectClient: `¡Gracias por tu pedido! Folio: ${orderId} - Creovanta`,
      subjectAdmin: `💰 NUEVA VENTA APROBADA: ${orderId} - ${form.nombre}`,
      title: `Confirmación de Pedido`,
      subtitle: `Folio de referencia: ${orderId}`,
      hello: `Hola`,
      intro: `Tu pago ha sido procesado exitosamente a través de nuestra pasarela segura. Hemos recibido tu solicitud y comenzaremos con la configuración de tus servicios.`,
      totalPaid: `Total Pagado:`,
      subtotalLabel: `Subtotal`,
      ivaLabel: `IVA (16%)`,
      clientData: `Datos de Facturación y Cliente`,
      emailLabel: `Correo Electrónico:`,
      phoneLabel: `Teléfono:`,
      companyLabel: `Empresa / RFC:`,
      addressLabel: `Dirección:`,
      footer: `Creovanta — Soluciones Tecnológicas y Digitales Avanzadas.`
    },
    en: {
      subjectClient: `Thank you for your order! Folio: ${orderId} - Creovanta`,
      subjectAdmin: `💰 NEW APPROVED SALE: ${orderId} - ${form.nombre}`,
      title: `Order Confirmation`,
      subtitle: `Reference Folio: ${orderId}`,
      hello: `Hello`,
      intro: `Your payment has been successfully processed through our secure gateway. We have received your request and will start setting up your services.`,
      totalPaid: `Total Paid:`,
      subtotalLabel: `Subtotal`,
      ivaLabel: `VAT (16%)`,
      clientData: `Billing & Customer Information`,
      emailLabel: `Email:`,
      phoneLabel: `Phone:`,
      companyLabel: `Company / Tax ID:`,
      addressLabel: `Address:`,
      footer: `Creovanta — Advanced Technological & Digital Solutions.`
    }
  };

  const t = texts[lang] || texts["es"];
  
  const itemsListHtml = items.map((i) => `
    <tr>
      <td style="padding: 14px 16px; border-bottom: 1px solid #E2E8F0; color: #0F172A; font-weight: 600;">${i.qty}x ${i.product[lang].name}</td>
      <td style="padding: 14px 16px; border-bottom: 1px solid #E2E8F0; text-align: right; color: #475569; font-family: monospace;">$${(i.product.priceMXN * i.qty).toFixed(2)} MXN</td>
    </tr>
  `).join("");

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
        
        <div style="border-radius: 16px; background-color: #F8FAFC; border: 1px solid #E2E8F0; overflow: hidden; margin-bottom: 30px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            ${itemsListHtml}
            <tr>
              <td style="padding: 12px 16px; color: #64748B; font-size: 13px;">${t.subtotalLabel}</td>
              <td style="padding: 12px 16px; text-align: right; color: #334155; font-family: monospace; font-size: 13px;">$${totals.subtotal.toFixed(2)} MXN</td>
            </tr>
            <tr>
              <td style="padding: 4px 16px 12px 16px; color: #64748B; font-size: 13px;">${t.ivaLabel}</td>
              <td style="padding: 4px 16px 12px 16px; text-align: right; color: #334155; font-family: monospace; font-size: 13px;">$${totals.iva.toFixed(2)} MXN</td>
            </tr>
            <tr style="background-color: #EFF6FF; border-top: 2px solid #BFDBFE;">
              <td style="padding: 18px 16px; font-weight: bold; color: #1E3A8A; text-transform: uppercase; font-size: 12px; letter-spacing: 0.05em;">${t.totalPaid}</td>
              <td style="padding: 18px 16px; font-weight: 900; text-align: right; color: #1E3A8A; font-size: 20px; font-family: monospace;">$${totals.total.toFixed(2)} <span style="font-size: 12px; font-weight: 600;">MXN</span></td>
            </tr>
          </table>
        </div>

        <h3 style="margin: 0 0 12px 0; color: #0F172A; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700;">${t.clientData}</h3>
        <div style="font-size: 13px; color: #475569; line-height: 1.8; background-color: #F8FAFC; padding: 20px; border-radius: 14px; border: 1px solid #E2E8F0;">
          <strong style="color: #1E3A8A;">${t.emailLabel}</strong> <span style="color: #0F172A;">${form.email}</span><br/>
          <strong style="color: #1E3A8A;">${t.phoneLabel}</strong> <span style="color: #0F172A;">${form.telefono}</span><br/>
          <strong style="color: #1E3A8A;">${t.companyLabel}</strong> <span style="color: #0F172A;">${form.empresa || "N/A"} / ${form.rfc || "N/A"}</span><br/>
          <strong style="color: #1E3A8A;">${t.addressLabel}</strong> <span style="color: #0F172A;">${form.direccion}, ${form.ciudad}, ${form.estado} C.P. ${form.cp}</span>
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
      to: form.email,
      subject: t.subjectClient,
      html: emailBody,
    });
  } catch (err) {
    console.error("❌ Error enviando correo al cliente:", err);
  }

  try {
    await resend.emails.send({
      from: senderEmail,
      to: adminEmail,
      subject: t.subjectAdmin,
      html: `<div style="background-color: #F1F5F9; padding: 30px;">${emailBody}</div>`,
    });
  } catch (err) {
    console.error("❌ Error enviando notificación al admin:", err);
  }
}