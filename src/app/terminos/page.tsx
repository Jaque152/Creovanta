"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export default function TerminosPage() {
  const { lang } = useLanguage();

  const content = {
    es: {
      title: "Términos y Condiciones",
      subtitle: "OPERATION MIDELTON, S.A. DE C.V.",
      date: "Fecha de entrada en vigor: Septiembre de 2026",
      intro:
        "Creovanta, nombre comercial de OPERATION MIDELTON, S.A. DE C.V., con oficinas en la Ciudad de México, pone a su disposición los presentes términos y condiciones, que regulan el uso de este sitio web (creovanta.com.mx) y cualquier otro contrato o relación jurídica conexa celebrada con el titular de manera jurídicamente vinculante. Se recomienda a los usuarios leer atentamente este documento previo a cualquier interacción relacionada con el presente sitio web.",
      sections: [
        {
          title: "1. Información del Titular",
          body: [
            "Este sitio web es ofrecido por: OPERATION MIDELTON, S.A. de C.V.",
            "Correo electrónico de contacto: administracion@creovanta.com.mx",
          ],
        },
        {
          title: "2. Condiciones de Uso",
          body: [
            "Las condiciones de uso detalladas en esta sección se aplicarán de forma general al uso de este sitio web. En situaciones específicas, pueden aplicarse condiciones de uso adicionales, las cuales se indicarán de forma adicional en este documento. Al utilizar este sitio web, los usuarios confirman que cumplen los siguientes requisitos.",
          ],
        },
        {
          title: "3. Contenido en el Sitio Web",
          body: [
            "A menos que se especifique lo contrario o se pueda reconocer de forma clara, todos los contenidos disponibles en este sitio web son propiedad del titular o son proporcionados por este o sus licenciantes. El titular se compromete a actuar con diligencia para garantizar que los contenidos proporcionados no infrinjan ninguna disposición legal ni vulneren los derechos de terceros. Sin embargo, no siempre será posible conseguir dicho objetivo. En tales casos, se ruega a los usuarios que comuniquen cualquier queja utilizando los datos de contacto facilitados.",
          ],
        },
        {
          title: "4. Acceso a Recursos Externos",
          body: [
            "A través de este sitio web, los usuarios podrán acceder a recursos externos proporcionados por terceros. Los usuarios reconocen y aceptan que el titular no tiene ningún control sobre dichos recursos y, por tanto, no es responsable de sus contenidos y disponibilidad. Las condiciones aplicables a los recursos proporcionados por terceros se derivan de los términos y condiciones de dichos terceros o, en su defecto, de las leyes aplicables.",
          ],
        },
        {
          title: "5. Usos Aceptables",
          body: [
            "Este sitio web y el servicio solo podrán utilizarse dentro del ámbito para el cual se proporcionan, de acuerdo con estas condiciones y la legislación aplicable. Los usuarios serán los únicos responsables de asegurarse de que su uso de este sitio web y/o del servicio no infringe ninguna ley o reglamento ni vulnera derechos de terceros.",
          ],
        },
        {
          title: "6. Disposiciones Comunes",
          body: [
            "La falta de ejercicio de cualquier derecho o el hecho de no invocar una disposición en virtud de estas condiciones no constituirán una renuncia a dicho derecho o disposición. Para garantizar el mejor nivel de servicio posible, el titular se reserva el derecho de interrumpir el servicio para labores de mantenimiento, actualizaciones del sistema o cualquier otro cambio, informando adecuadamente a los usuarios. Dentro de los límites de la ley, el titular también podrá decidir suspender o dejar de prestar el servicio por completo. En caso de que el servicio deje de prestarse, el titular cooperará con los usuarios para permitirles retirar datos personales o información y respetará los derechos de los usuarios relativos al uso continuado del producto y/o la compensación, según establezca la ley aplicable. El servicio puede no estar disponible debido a motivos fuera del control razonable del titular, como “fuerza mayor” (por ejemplo, averías en las infraestructuras o apagones).",
          ],
        },
        {
          title: "7. Reventa del Servicio",
          body: [
            "Los usuarios no reproducirán, duplicarán, copiarán, venderán, revenderán ni explotarán ninguna parte de este sitio web y de su servicio sin la autorización previa, expresa y por escrito del titular, ya sea directamente o a través de un programa de reventa legítimo.",
          ],
        },
        {
          title: "8. Derechos de Propiedad Intelectual",
          body: [
            "Los derechos de propiedad intelectual, tales como los derechos de autor, derechos derivados de marcas registradas, derechos de patentes y derechos de diseños relativos a este sitio web son propiedad exclusiva del titular o de sus licenciantes y están protegidos por las leyes en vigor en materia de marcas y los tratados internacionales relacionados. Todas las marcas registradas —sean denominativas o gráficas— y cualquier otra marca, nombre comercial, marca de servicio, signo denominativo, ilustraciones, imágenes o logotipos que aparezcan en relación con este sitio web son y seguirán siendo propiedad exclusiva del titular o de sus licenciantes y están protegidos por las leyes en vigor en materia de marcas y los tratados internacionales relacionados.",
          ],
        },
        {
          title: "9. Cambios de las Condiciones",
          body: [
            "El titular se reserva el derecho de cambiar o modificar de cualquier otro modo estas condiciones en cualquier momento. En tales casos, el titular informará adecuadamente a los usuarios de esos cambios. Dichos cambios solo afectarán a la relación con los usuarios a partir de la fecha comunicada a estos. La continuidad en el uso del servicio indicará la aceptación por parte de los usuarios de las condiciones modificadas. Si los usuarios no desean quedar vinculados por estos cambios, deberán dejar de usar el servicio y podrán resolver el contrato. La versión aplicable previa regulará la relación antes de la aceptación del usuario. Los usuarios podrán obtener cualquier versión previa del titular.",
          ],
        },
        {
          title: "10. Cesión del Contrato",
          body: [
            "El titular se reserva el derecho de transferir, ceder, disponer mediante novación o subcontratar cualquiera de los derechos u obligaciones establecidos conforme a estas condiciones, teniendo en cuenta los intereses legítimos de los usuarios. Los usuarios no podrán ceder ni transferir sus derechos u obligaciones conforme a estas condiciones en modo alguno, salvo con el permiso por escrito del titular.",
          ],
        },
        {
          title: "11. Contacto",
          body: [
            "Todas las comunicaciones relativas a la utilización de este sitio web deberán remitirse utilizando los datos de contacto señalados en este documento.",
          ],
        },
        {
          title: "12. Posibilidad de Separar una Disposición",
          body: [
            "En el caso de que cualquier disposición de estas condiciones fuera declarada o se convirtiera en inválida o inejecutable conforme a la ley aplicable, la invalidez o inejecutabilidad de dicha disposición no afectará la validez de las disposiciones restantes, que continuarán gozando de plena vigencia y efectividad.",
          ],
        },
        {
          title: "13. Consentimiento del Titular",
          body: [
            "Finalmente, Creovanta tiene por consentidos los términos y condiciones previstos en este texto, en el momento en que Usted, el titular de los datos a tratar, ha sido informado del contenido de la presente Política y se sirva a proporcionarlos.",
          ],
        },
      ],
      privacyLinkParagraph:
        "El tratamiento de los datos personales que el Cliente facilite a través del sitio se rige por el ",
      privacyLinkLabel: "Aviso de Privacidad de la Empresa.",
    },
    en: {
      title: "Terms and Conditions",
      subtitle: "OPERATION MIDELTON, S.A. DE C.V.",
      date: "Effective date: September 2026",
      intro:
        "Creovanta, commercial name of OPERATION MIDELTON, S.A. DE C.V., with offices in Mexico City, makes these terms and conditions available to you. They govern the use of this website (creovanta.com.mx) and any other contract or related legal relationship entered into with the owner in a legally binding manner. Users are advised to read this document carefully before any interaction related to this website.",
      sections: [
        {
          title: "1. Owner Information",
          body: [
            "This website is offered by: OPERATION MIDELTON, S.A. de C.V.",
            "Contact email: administracion@creovanta.com.mx",
          ],
        },
        {
          title: "2. Conditions of Use",
          body: [
            "The conditions of use detailed in this section apply generally to the use of this website. In specific situations, additional conditions of use may apply, which will be indicated separately in this document. By using this website, users confirm that they meet the following requirements.",
          ],
        },
        {
          title: "3. Content on the Website",
          body: [
            "Unless otherwise specified or clearly recognizable, all content available on this website is the property of the owner or is provided by the owner or its licensors. The owner undertakes to act diligently to ensure that the content provided does not infringe any legal provision or violate the rights of third parties. However, it may not always be possible to achieve this goal. In such cases, users are asked to report any complaint using the contact details provided.",
          ],
        },
        {
          title: "4. Access to External Resources",
          body: [
            "Through this website, users may access external resources provided by third parties. Users acknowledge and accept that the owner has no control over such resources and is therefore not responsible for their content and availability. The conditions applicable to resources provided by third parties derive from those third parties' terms and conditions or, failing that, from applicable law.",
          ],
        },
        {
          title: "5. Acceptable Use",
          body: [
            "This website and the service may only be used within the scope for which they are provided, in accordance with these conditions and applicable law. Users are solely responsible for ensuring that their use of this website and/or the service does not infringe any law or regulation or violate the rights of third parties.",
          ],
        },
        {
          title: "6. Common Provisions",
          body: [
            "The failure to exercise any right or the failure to invoke a provision under these conditions shall not constitute a waiver of that right or provision. To ensure the best possible level of service, the owner reserves the right to interrupt the service for maintenance work, system updates, or any other changes, duly informing users. Within the limits of the law, the owner may also decide to suspend or stop providing the service entirely. If the service is discontinued, the owner will cooperate with users to allow them to retrieve personal data or information and will respect users' rights regarding continued use of the product and/or compensation, as established by applicable law. The service may be unavailable due to reasons beyond the owner's reasonable control, such as “force majeure” (for example, infrastructure failures or power outages).",
          ],
        },
        {
          title: "7. Resale of the Service",
          body: [
            "Users shall not reproduce, duplicate, copy, sell, resell, or exploit any part of this website and its service without the prior, express, and written authorization of the owner, whether directly or through a legitimate resale program.",
          ],
        },
        {
          title: "8. Intellectual Property Rights",
          body: [
            "Intellectual property rights, such as copyrights, rights derived from registered trademarks, patent rights, and design rights related to this website are the exclusive property of the owner or its licensors and are protected by applicable trademark laws and related international treaties. All registered trademarks — whether word marks or figurative marks — and any other trademark, trade name, service mark, word sign, illustrations, images, or logos appearing in connection with this website are and shall remain the exclusive property of the owner or its licensors and are protected by applicable trademark laws and related international treaties.",
          ],
        },
        {
          title: "9. Changes to the Conditions",
          body: [
            "The owner reserves the right to change or otherwise modify these conditions at any time. In such cases, the owner will duly inform users of those changes. Such changes will only affect the relationship with users from the date communicated to them. Continued use of the service indicates users' acceptance of the modified conditions. If users do not wish to be bound by these changes, they must stop using the service and may terminate the contract. The applicable prior version shall govern the relationship before the user's acceptance. Users may obtain any prior version from the owner.",
          ],
        },
        {
          title: "10. Assignment of the Contract",
          body: [
            "The owner reserves the right to transfer, assign, dispose of by novation, or subcontract any of the rights or obligations set forth under these conditions, taking into account the legitimate interests of users. Users may not assign or transfer their rights or obligations under these conditions in any way, except with the written permission of the owner.",
          ],
        },
        {
          title: "11. Contact",
          body: [
            "All communications relating to the use of this website must be sent using the contact details indicated in this document.",
          ],
        },
        {
          title: "12. Severability",
          body: [
            "If any provision of these conditions is declared or becomes invalid or unenforceable under applicable law, the invalidity or unenforceability of that provision shall not affect the validity of the remaining provisions, which shall continue to be fully valid and effective.",
          ],
        },
        {
          title: "13. Owner's Consent",
          body: [
            "Finally, Creovanta considers the terms and conditions set forth in this text accepted at the moment You, the data subject, have been informed of the content of this Policy and proceed to provide them.",
          ],
        },
      ],
      privacyLinkParagraph:
        "The processing of personal data provided by the Client through the site is governed by the ",
      privacyLinkLabel: "Company's Privacy Policy.",
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
                {sec.body.map((paragraph, j) => {
                  // Enlace al aviso de privacidad dentro de la sección de contacto
                  if (
                    sec.title.includes("Contacto") ||
                    sec.title.includes("Contact")
                  ) {
                    return <p key={j}>{paragraph}</p>;
                  }
                  return <p key={j}>{paragraph}</p>;
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}