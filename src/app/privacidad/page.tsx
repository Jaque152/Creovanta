"use client";

import { useLanguage } from "@/lib/language-context";

export default function PrivacidadPage() {
  const { lang } = useLanguage();

  const content = {
    es: {
      title: "Política de Privacidad",
      subtitle: "OPERATION MIDELTON, S.A. DE C.V.",
      date: "Fecha de última actualización: Septiembre de 2026",
      intro:
        "Creovanta, nombre comercial de OPERATION MIDELTON, S.A. DE C.V., con oficinas en la Ciudad de México, se compromete a cumplir con la normativa vigente de protección de datos personales, salvaguardando la integridad de los datos personales y sensibles que usted, como titular, nos proporcione.",
      sections: [
        {
          title: "Finalidad del Tratamiento de Datos Personales",
          body: [
            "Para Creovanta el tratamiento de sus datos es necesario para proveer los servicios solicitados, informarle sobre cambios en los mismos y evaluar la calidad del servicio brindado. Para estas finalidades, requerimos los siguientes datos personales: nombre completo, datos laborales o de negocio, correo electrónico y número telefónico.",
          ],
        },
        {
          title: "Finalidades Primarias y Necesarias",
          body: [
            "Se le informa por este medio al Titular, que los datos personales que nos facilite en las comunicaciones serán con objeto de llevar a cabo las finalidades primarias y necesarias para la correcta ejecución de nuestra prestación de servicios, las cuales se mencionan a continuación:",
            "• Atender, gestionar y dar seguimiento a su historial de servicio.",
            "• Atender consultas.",
            "• Aclaraciones de dudas.",
            "• Gestión de pagos.",
            "• Realizar las investigaciones necesarias para obtener el estado de su historial de compra y/o crédito.",
            "• Registrar y actualizar los datos en sistema de administración de Creovanta.",
            "• Generar una base de datos de los clientes para un mejor control y realización de los procesos subsecuentes de consulta.",
          ],
        },
        {
          title: "Precisión y Seguridad de los Datos",
          body: [
            "Creovanta garantiza la precisión de los datos y la correcta utilización de la información, la cual será manejada únicamente con los fines descritos anteriormente. Implementamos procedimientos y medidas de seguridad físicas, tecnológicas y administrativas apropiadas para proteger la información recabada, almacenándola en bases de datos controladas y con acceso limitado.",
          ],
        },
        {
          title: "Transferencia de Datos Personales",
          body: [
            "Creovanta le informa que para las finalidades necesarias anteriormente descritas transferirá sus datos en caso de ser necesario, siempre verificando que se cumplan con las medidas de seguridad mínimas indispensables, de la misma forma en aquellas finalidades exigidas legalmente o por las autoridades competentes, Creovanta sólo transferirá los datos necesarios en los casos legalmente previstos.",
          ],
        },
        {
          title: "Ejercicio de Derechos ARCO",
          body: [
            "Asimismo, hace de su conocimiento, que para el ejercicio de cualquiera de sus derechos ARCO (acceso, rectificación, cancelación y oposición), usted podrá enviar su solicitud al correo electrónico administracion@creovanta.com.mx, en un horario de 09:00 a 18:00 horas de lunes a viernes, donde nuestro Departamento de Datos Personales le prestará la atención oportuna. La solicitud deberá ser por escrito respecto del derecho a ejercer, dirigida al responsable y acompañada de la siguiente información y documentación:",
            "• Nombre completo.",
            "• Correo electrónico.",
            "• Número telefónico.",
            "Estos datos deberán ser precisos para que se le comunique la respuesta a la Solicitud ARCO.",
            "Para cerciorarnos de que se está realizando una solicitud por cuenta del Titular, deberá agregar cualquier documento o información que facilite la localización de sus datos personales, y en caso de solicitar una rectificación de sus datos personales, deberá de indicar también, las modificaciones a realizarse y aportar la documentación que sustente su petición.",
          ],
        },
        {
          title: "Modificaciones al Aviso de Privacidad",
          body: [
            "Creovanta se reserva su derecho a efectuar en cualquier momento modificaciones o actualizaciones al presente aviso de privacidad, para la atención en el cumplimiento de invenciones legislativas, cumplimiento de sus fines, y/o nuevos requerimientos para la prestación u ofrecimiento de nuestro servicio o productos. Cualquier cambio será comunicado y estará disponible en nuestra página web: creovanta.com.mx",
          ],
        },
        {
          title: "Consentimiento del Titular",
          body: [
            "Finalmente, Creovanta tiene por consentidos los términos del presente Aviso de Privacidad, en el momento en que Usted, el titular de los datos a tratar, ha sido informado del contenido de la presente Política de Privacidad y se sirva a proporcionarlos.",
          ],
        },
      ],
    },
    en: {
      title: "Privacy Policy",
      subtitle: "OPERATION MIDELTON, S.A. DE C.V.",
      date: "Last updated: September 2026",
      intro:
        "Creovanta, commercial name of OPERATION MIDELTON, S.A. DE C.V., with offices in Mexico City, undertakes to comply with current personal data protection regulations, safeguarding the integrity of the personal and sensitive data that you, as the data subject, provide to us.",
      sections: [
        {
          title: "Purpose of Personal Data Processing",
          body: [
            "For Creovanta, processing your data is necessary to provide the requested services, inform you about changes to them, and evaluate the quality of the service provided. For these purposes, we require the following personal data: full name, employment or business information, email address, and phone number.",
          ],
        },
        {
          title: "Primary and Necessary Purposes",
          body: [
            "You are hereby informed, as the Data Subject, that the personal data you provide in communications will be used to carry out the primary and necessary purposes for the correct execution of our service provision, which are listed below:",
            "• Respond to, manage, and follow up on your service history.",
            "• Handle inquiries.",
            "• Clarify doubts.",
            "• Payment management.",
            "• Conduct the necessary investigations to obtain the status of your purchase and/or credit history.",
            "• Register and update data in Creovanta's administration system.",
            "• Generate a customer database for better control and execution of subsequent consultation processes.",
          ],
        },
        {
          title: "Accuracy and Security of Data",
          body: [
            "Creovanta guarantees the accuracy of the data and the correct use of the information, which will be handled only for the purposes described above. We implement appropriate physical, technological, and administrative security procedures and measures to protect the information collected, storing it in controlled databases with limited access.",
          ],
        },
        {
          title: "Transfer of Personal Data",
          body: [
            "Creovanta informs you that, for the necessary purposes described above, it will transfer your data when necessary, always verifying that the minimum essential security measures are met. Likewise, for those purposes required by law or by competent authorities, Creovanta will only transfer the necessary data in cases legally provided for.",
          ],
        },
        {
          title: "Exercise of ARCO Rights",
          body: [
            "Furthermore, you are informed that to exercise any of your ARCO rights (access, rectification, cancellation, and opposition), you may send your request to the email address administracion@creovanta.com.mx, Monday through Friday from 09:00 to 18:00, where our Personal Data Department will provide timely attention. The request must be in writing regarding the right to be exercised, addressed to the responsible party, and accompanied by the following information and documentation:",
            "• Full name.",
            "• Email address.",
            "• Phone number.",
            "This data must be accurate so that the response to the ARCO Request can be communicated to you.",
            "To verify that a request is being made on behalf of the Data Subject, you must attach any document or information that facilitates the location of your personal data. In the case of requesting a rectification of your personal data, you must also indicate the modifications to be made and provide the documentation supporting your request.",
          ],
        },
        {
          title: "Changes to the Privacy Notice",
          body: [
            "Creovanta reserves the right to make changes or updates to this privacy notice at any time, in order to comply with legislative innovations, fulfill its purposes, and/or meet new requirements for the provision or offering of our service or products. Any change will be communicated and will be available on our website: creovanta.com.mx",
          ],
        },
        {
          title: "Data Subject's Consent",
          body: [
            "Finally, Creovanta considers the terms of this Privacy Notice accepted at the moment You, the data subject, have been informed of the content of this Privacy Policy and proceed to provide them.",
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