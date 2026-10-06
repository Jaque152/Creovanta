"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { useLanguage } from "@/lib/language-context";

export default function SobreNosotrosPage() {
  const { lang } = useLanguage();

  const content = {
    es: {
      eyebrow: "SOBRE NOSOTROS",
      title: "Sobre nosotros",
      intro:
        "En InnovaTrend Marketing, nos dedicamos a diseñar soluciones que anticipan las tendencias del mercado. Nuestra pasión por la innovación se refleja en cada proyecto, asegurando que nuestros clientes siempre estén un paso adelante.",
      intro2:
        "Comprometidos con la excelencia, ofrecemos herramientas que no solo cumplen, sino que superan las expectativas de la industria.",
      productsBtn: "Nuestros productos",
      historyEyebrow: "Nuestra historia",
      historyTitle: "El inicio de la era Trend Marketing",
      historyP1:
        "La historia de InnovaTrend Marketing comienza con una visión: transformar la web en un lugar más accesible y efectivo para hacer negocios.",
      historyP2:
        "Desde nuestros inicios, hemos estado al frente de la innovación, proporcionando estrategias que facilitan a las empresas destacar en un entorno digital competitivo.",
      ctaEyebrow: "Es momento de iniciar",
      ctaTitle: "Comienza a conectar con tus usuarios",
      ctaDesc:
        "InnovaTrend Marketing proporciona herramientas excepcionales para conectar con tu público objetivo a través de análisis predictivos y estrategias personalizadas. Nuestros sistemas avanzados facilitan la comprensión de las necesidades de tus usuarios, permitiéndote adaptar tus esfuerzos de marketing con mayor precisión. Descubre cómo nuestras soluciones pueden transformar tus interacciones digitales.",
      ctaPlans: "Conoce nuestros planes",
      ctaEyebrow2: "Únete hoy",
      ctaTitle2:
        "Desarrolla tu negocio utilizando soluciones de marketing digital de vanguardia con InnovaTrend Marketing.",
      ctaDesc2:
        "Nuestra plataforma integral te ofrece herramientas avanzadas para el análisis predictivo y estrategias personalizadas que te posicionan por delante de la competencia.",
      ctaKnow: "Conócenos más",
    },
    en: {
      eyebrow: "ABOUT US",
      title: "About us",
      intro:
        "At InnovaTrend Marketing, we focus on designing solutions that anticipate market trends. Our passion for innovation shows in every project, ensuring our clients always stay one step ahead.",
      intro2:
        "Committed to excellence, we deliver tools that don't just meet industry expectations — they surpass them.",
      productsBtn: "Our products",
      historyEyebrow: "Our story",
      historyTitle: "The beginning of the Trend Marketing era",
      historyP1:
        "The story of InnovaTrend Marketing begins with a vision: turning the web into a more accessible and effective place to do business.",
      historyP2:
        "Since our beginnings, we have stood at the forefront of innovation, providing strategies that help companies stand out in a competitive digital landscape.",
      ctaEyebrow: "It is time to start",
      ctaTitle: "Start connecting with your users",
      ctaDesc:
        "InnovaTrend Marketing provides outstanding tools to connect with your target audience through predictive analytics and personalized strategies. Our advanced systems make it easier to understand your users' needs, letting you fine-tune your marketing efforts with greater accuracy. Discover how our solutions can transform your digital interactions.",
      ctaPlans: "Discover our plans",
      ctaEyebrow2: "Join today",
      ctaTitle2:
        "Grow your business using cutting-edge digital marketing solutions alongside InnovaTrend Marketing.",
      ctaDesc2:
        "Our all-in-one platform offers advanced tools for predictive analytics and personalized strategies that place you ahead of the competition.",
      ctaKnow: "Get to know us",
    },
  };

  const t = content[lang] || content.es;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero / Intro */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1E3A8A] via-[#3730A3] to-[#701A75] py-28 text-white">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1100px] container-px">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-blue-200 backdrop-blur-md mb-8">
              <Sparkles className="h-3.5 w-3.5" />
              {t.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="display max-w-4xl text-5xl font-black uppercase tracking-tight text-white sm:text-7xl leading-[1.05]">
              {t.title}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-slate-200 font-medium">
              {t.intro}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300 font-medium">
              {t.intro2}
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <Link
              href="/servicios"
              className="mt-10 inline-flex h-14 items-center justify-center rounded-full bg-white px-10 text-base font-bold text-[#1E3A8A] transition-all hover:bg-blue-50 hover:shadow-[0_10px_30px_rgba(255,255,255,0.25)] hover:-translate-y-1"
            >
              {t.productsBtn}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Historia */}
      <section className="mx-auto max-w-[1100px] container-px py-24">
        <Reveal>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1E3A8A]">
            {t.historyEyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl leading-tight">
            {t.historyTitle}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <Reveal delay={0.2}>
            <p className="text-lg leading-relaxed text-slate-600 font-medium">
              {t.historyP1}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-lg leading-relaxed text-slate-600 font-medium">
              {t.historyP2}
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA 1 */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1100px] container-px">
          <Reveal>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1E3A8A]">
              {t.ctaEyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl leading-tight">
              {t.ctaTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 font-medium">
              {t.ctaDesc}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <Link
              href="/servicios"
              className="mt-10 inline-flex h-14 items-center justify-center rounded-full bg-[#1E3A8A] px-10 text-base font-bold text-white transition-all hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1"
            >
              {t.ctaPlans}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CTA 2 */}
      <section className="bg-[#F8FAFC] py-24">
        <div className="mx-auto max-w-[1100px] container-px">
          <Reveal>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1E3A8A]">
              {t.ctaEyebrow2}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display mt-4 max-w-3xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl leading-tight">
              {t.ctaTitle2}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 font-medium">
              {t.ctaDesc2}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <Link
              href="/contacto"
              className="mt-10 inline-flex h-14 items-center justify-center rounded-full bg-slate-900 px-10 text-base font-bold text-white transition-all hover:bg-blue-600 hover:shadow-xl hover:-translate-y-1"
            >
              {t.ctaKnow}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}