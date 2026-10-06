"use client";

import { useLanguage } from "@/lib/language-context";

export default function DevolucionesPage() {
  const { lang } = useLanguage();

  const content = {
    es: {
      title: "Política de Devoluciones y Reembolso",
      subtitle: "OPERATION MIDELTON, S.A. DE C.V.",
      date: "Fecha de última actualización: Septiembre de 2026",
      intro:
        "Creovanta, nombre comercial de OPERATION MIDELTON, S.A. de C.V., con oficinas en la Ciudad de México, pone a su disposición las presentes políticas de reembolso. Estas políticas establecen las condiciones bajo las cuales los solicitantes podrán hacer acreditable y válida su solicitud de reembolso.",
      sections: [
        {
          title: "1. Generalidades",
          body: [
            "Creovanta ofrece un beneficio de reembolso que le permite a sus solicitantes ejercerlo en un plazo no mayor a 40 días naturales, contados a partir de la fecha de contratación. Los solicitantes pueden solicitar a Creovanta el reembolso del pago de uno o varios servicios, cuando alguno de éstos, a juicio del solicitante, no satisface la necesidad por la cual originó la compra, siempre y cuando cumpla con los requisitos, términos y condiciones que en esta política se señalan.",
          ],
        },
        {
          title: "2. Servicios que se consideran en la Solicitud de Reembolso",
          body: [
            "La opción de solicitar un servicio a Creovanta es aplicable única y exclusivamente en la contratación inicial de las siguientes categorías de Servicios:",
            "1. Hosting.",
            "2. Estrategias predictivas.",
            "3. Optimización de campañas digitales.",
            "4. Integración social inteligente.",
            "5. Generación y conversión de leads.",
            "6. Servicios publicados en la tienda en línea.",
          ],
        },
        {
          title: "3. Procedimiento para Solicitar un Reembolso",
          body: [
            "Para solicitar un reembolso, el solicitante deberá seguir los siguientes pasos:",
            "• Comunicación: Enviar una solicitud escrita al correo electrónico de contacto administracion@creovanta.com.mx, indicando claramente el motivo de la solicitud y proporcionando la información necesaria para identificar la transacción.",
            "• Evaluación: Creovanta evaluará la solicitud y responderá en un plazo no mayor a cinco (5) días hábiles, informando al solicitante sobre la procedencia o improcedencia de la misma.",
            "• Documentación Adicional: En caso de ser necesario, Creovanta podrá requerir documentación adicional para procesar la solicitud de reembolso.",
            "• Aprobación: Si la solicitud es aprobada, el reembolso será procesado en un plazo no mayor a quince (15) días hábiles a partir de la fecha de aprobación.",
          ],
        },
        {
          title: "4. Opciones de Reembolso",
          body: [
            "Devolución de Fondos: Reembolso mediante la devolución de los fondos o crédito en el método de pago utilizado en la tienda en línea de creovanta.com.mx única y exclusivamente por la cantidad y servicio acordado en la aprobación de reembolso.",
            "Cupón: Reembolso mediante la expedición de un cupón, no acumulable, generado por el monto única y exclusivamente del costo del servicio del cual desea hacer valer la Garantía de Satisfacción Creovanta. Este cupón estará disponible dentro de las siguientes setenta y dos (72) horas posteriores a la confirmación de Creovanta y tendrá una vigencia de un (1) año para hacerlo efectivo en la contratación o renovación de servicios. En caso de que el o los servicios a contratar superen el monto del cupón, el solicitante deberá pagar la diferencia con el método de pago disponible para su elección.",
          ],
        },
        {
          title: "5. Solicitud de Reembolso",
          body: [
            "El Solicitante deberá enviar un correo electrónico a administracion@creovanta.com.mx, desde la cuenta de correo electrónico registrada en su Cuenta de Usuario, indicando el ID del Servicio del cual desea hacer valer la Garantía de Satisfacción Creovanta, así como la Opción de Reembolso elegida y/o aplicable. El Solicitante deberá expresar los motivos por los cuales desea hacer valer su Garantía de Satisfacción Creovanta, en el entendido que esta información solo será utilizada con el único fin de que Creovanta pueda mejorar la calidad de entrega de los servicios.",
          ],
        },
        {
          title: "6. Procesamiento de la Solicitud de Reembolso",
          body: [
            "Una vez recibida la Solicitud de Reembolso, con toda la información requerida, Creovanta confirmará de manera automática la recepción de la misma y procederá a revisar en un plazo no mayor a 03 (tres) días hábiles, que la documentación e información enviada cumpla con las presentes Políticas. De confirmar que la información es completa y que reúne los requisitos para solicitar esa Política de Reembolso, Creovanta le enviará un correo de confirmación de Reembolso e inmediatamente procederá a la cancelación del o los Servicios.",
          ],
        },
        {
          title: "7. Del Plazo para Efectuar el Reembolso",
          body: [
            "Si la Opción de Reembolso es mediante devolución de fondos, el plazo para lo anterior es de hasta veinticinco (25) días hábiles.",
            "Si la Opción de Reembolso es mediante Cupón, el plazo para que se le entregue éste, es de hasta cuarenta y ocho (48) horas naturales.",
          ],
        },
        {
          title: "8. Restricciones",
          body: [
            "• No es válida para los nombres de dominio.",
            "• No es válida para las renovaciones de ningún Servicio ofrecido por Creovanta.",
            "• No es válida en la adquisición de paquetes promocionales de servicios ofertados en conjunto.",
            "• No es válida si el Solicitante por sí solo ha cancelado previamente el Servicio, aun y cuando se encuentre dentro del plazo de los treinta (30) días.",
            "• La Garantía Creovanta solo podrá usarse una vez en la contratación inicial de cada categoría de Servicio por lo que, independientemente de si el Servicio tiene varias modalidades o planes, sólo podrá usarse una sola vez en cualquiera de éstos.",
            "• La Política de Reembolso Creovanta solo aplicará para aquellos servicios contratados a partir de Mayo de 2024.",
          ],
        },
        {
          title: "9. Validez de los Contratos de Políticas de Reembolso",
          body: [
            "Las presentes políticas de reembolso se rigen por las leyes aplicables en México. Los contratos celebrados bajo estas políticas son válidos y vinculantes siempre y cuando cumplan con los requisitos establecidos por la legislación mexicana, incluyendo la veracidad de la información proporcionada por el solicitante y el cumplimiento de los términos y condiciones especificados.",
          ],
        },
        {
          title: "10. Contacto",
          body: [
            "Para cualquier duda o consulta relacionada con las políticas de reembolso, el solicitante puede ponerse en contacto con Creovanta a través del correo electrónico administracion@creovanta.com.mx",
          ],
        },
      ],
    },
    en: {
      title: "Refund and Cancellation Policy",
      subtitle: "OPERATION MIDELTON, S.A. DE C.V.",
      date: "Last updated: September 2026",
      intro:
        "Creovanta, commercial name of OPERATION MIDELTON, S.A. de C.V., with offices in Mexico City, makes this refund policy available to you. This policy establishes the conditions under which applicants may validate and exercise their refund request.",
      sections: [
        {
          title: "1. General Provisions",
          body: [
            "Creovanta offers a refund benefit that allows applicants to exercise it within a period no greater than 40 calendar days, counted from the date of contracting. Applicants may request from Creovanta a refund of the payment for one or several services, when any of them, in the applicant's judgment, does not satisfy the need that originated the purchase, provided that they comply with the requirements, terms, and conditions set forth in this policy.",
          ],
        },
        {
          title: "2. Services Eligible for Refund Request",
          body: [
            "The option to request a refund from Creovanta applies solely and exclusively to the initial contracting of the following categories of Services:",
            "1. Hosting.",
            "2. Predictive strategies.",
            "3. Digital campaign optimization.",
            "4. Smart social integration.",
            "5. Lead generation and conversion.",
            "6. Services published in the online store.",
          ],
        },
        {
          title: "3. Procedure for Requesting a Refund",
          body: [
            "To request a refund, the applicant must follow these steps:",
            "• Communication: Send a written request to the contact email administracion@creovanta.com.mx, clearly stating the reason for the request and providing the information necessary to identify the transaction.",
            "• Evaluation: Creovanta will evaluate the request and respond within a period no greater than five (5) business days, informing the applicant whether it is approved or rejected.",
            "• Additional Documentation: If necessary, Creovanta may request additional documentation to process the refund request.",
            "• Approval: If the request is approved, the refund will be processed within a period no greater than fifteen (15) business days from the approval date.",
          ],
        },
        {
          title: "4. Refund Options",
          body: [
            "Fund Refund: Refund by returning the funds or crediting the payment method used in the online store creovanta.com.mx, solely and exclusively for the amount and service agreed upon in the refund approval.",
            "Coupon: Refund by issuing a non-cumulative coupon, generated for the amount solely and exclusively of the cost of the service for which the Creovanta Satisfaction Guarantee is being invoked. This coupon will be available within seventy-two (72) hours after Creovanta's confirmation and will be valid for one (1) year to be used in the contracting or renewal of services. If the service(s) to be contracted exceed the coupon amount, the applicant must pay the difference with the payment method available for their choice.",
          ],
        },
        {
          title: "5. Refund Request",
          body: [
            "The Applicant must send an email to administracion@creovanta.com.mx, from the email account registered in their User Account, indicating the Service ID for which they wish to invoke the Creovanta Satisfaction Guarantee, as well as the chosen and/or applicable Refund Option. The Applicant must state the reasons why they wish to invoke their Creovanta Satisfaction Guarantee, with the understanding that this information will be used solely for the purpose of allowing Creovanta to improve the quality of service delivery.",
          ],
        },
        {
          title: "6. Processing of the Refund Request",
          body: [
            "Once the Refund Request is received with all the required information, Creovanta will automatically confirm its receipt and will proceed to review, within a period no greater than 03 (three) business days, that the documentation and information sent comply with these Policies. If it is confirmed that the information is complete and meets the requirements to request this Refund Policy, Creovanta will send a refund confirmation email and will immediately proceed with the cancellation of the Service(s).",
          ],
        },
        {
          title: "7. Refund Processing Time",
          body: [
            "If the Refund Option is by fund refund, the period for this is up to twenty-five (25) business days.",
            "If the Refund Option is by Coupon, the period for its delivery is up to forty-eight (48) natural hours.",
          ],
        },
        {
          title: "8. Restrictions",
          body: [
            "• Not valid for domain names.",
            "• Not valid for renewals of any Service offered by Creovanta.",
            "• Not valid for the acquisition of promotional packages of services offered together.",
            "• Not valid if the Applicant has previously canceled the Service on their own, even if within the thirty (30) day period.",
            "• The Creovanta Guarantee may only be used once in the initial contracting of each Service category; therefore, regardless of whether the Service has various modalities or plans, it may only be used once in any of them.",
            "• The Creovanta Refund Policy will only apply to services contracted as of May 2024.",
          ],
        },
        {
          title: "9. Validity of Refund Policy Contracts",
          body: [
            "This refund policy is governed by the applicable laws in Mexico. Contracts entered into under this policy are valid and binding as long as they comply with the requirements established by Mexican legislation, including the truthfulness of the information provided by the applicant and compliance with the specified terms and conditions.",
          ],
        },
        {
          title: "10. Contact",
          body: [
            "For any questions or inquiries related to the refund policy, the applicant may contact Creovanta through the email address administracion@creovanta.com.mx",
          ],
        },
      ],
    },
  };

  const t = content[lang] || content.es;

  return (
    <main className="min-h-screen bg-cream-paper py-20 sm:py-32">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        <h1 className="display text-4xl font-bold text-ink sm:text-5xl">{t.title}</h1>
        <p className="mt-2 text-lg text-ink/60">{t.subtitle}</p>
        <p className="mt-4 font-mono text-sm uppercase tracking-widest text-clay">{t.date}</p>
        <p className="mt-8 text-[0.95rem] italic leading-relaxed text-ink/80">{t.intro}</p>

        <div className="mt-12 space-y-12">
          {t.sections.map((sec, i) => (
            <section key={i}>
              <h2 className="display mb-4 text-2xl font-semibold text-ink">{sec.title}</h2>
              <div className="space-y-3 text-[0.95rem] leading-relaxed text-ink/80">
                {sec.body.map((paragraph, j) => (
                  <p key={j}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}