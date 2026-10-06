// ============================================================================
// INOVATREND MARKETING - CATALOGO DE PRODUCTOS Y PLANES (/paquetes/)
// ============================================================================

export interface ProductPlan {
  id: string;
  priceMXN: number;
  taxIncluded: boolean;
  currency: string;
  imageUrl: string;
  sku: string;
  category: string;
  es: {
    name: string;
    description: string;
    features: string[];
  };
  en: {
    name: string;
    description: string;
    features: string[];
  };
}

export const webPlans: ProductPlan[] = [
  {
    id: 'conexion-inicial',
    priceMXN: 190.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85',
    sku: 'INN-OTFP66',
    category: 'Fila 1',
    es: {
      name: 'Conexión Inicial',
      description: 'Asesoría para la selección de red social más adecuada para tu negocio y optimización inicial.',
      features: [
        'Asesoría para la selección de red social más adecuada para tu negocio (20 minutos).',
        'Recomendación de mejores prácticas para primeros pasos.',
        'Checklist básico para optimizar perfil inicial.'
      ]
    },
    en: {
      name: 'Initial Connection',
      description: 'Consulting for selecting the most suitable social network for your business.',
      features: [
        'Consulting for selecting the most suitable social network (20 mins).',
        'Best practices recommendation for first steps.',
        'Basic checklist to optimize initial profile.'
      ]
    }
  },
  {
    id: 'microplantilla',
    priceMXN: 460.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=85',
    sku: 'INN-W24DTK',
    category: 'Fila 1',
    es: {
      name: 'Microplantilla',
      description: 'Entrega de 1 diseño de estructura básica para correo electrónico.',
      features: [
        'Entrega de 1 diseño de estructura básica para correo electrónico (sin personalización avanzada).',
        'En formato editable para reutilización.',
        'Incluye revisión rápida (una ronda de ajustes).'
      ]
    },
    en: {
      name: 'Microtemplate',
      description: 'Delivery of 1 basic email structure design.',
      features: [
        'Delivery of 1 basic email structure design (without advanced customization).',
        'In editable format for reuse.',
        'Includes quick review (one round of adjustments).'
      ]
    }
  },
  {
    id: 'paquete-0',
    priceMXN: 800.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=85',
    sku: 'INN-XCT4Z3',
    category: 'Fila 2',
    es: {
      name: 'Paquete 0 - Red social',
      description: 'Integración de 1 red social para potenciar tu presencia.',
      features: [
        'Integración de 1 red social.'
      ]
    },
    en: {
      name: 'Package 0 - Social Network',
      description: 'Integration of 1 social network.',
      features: [
        'Integration of 1 social network.'
      ]
    }
  },
  {
    id: 'paquete-0-5',
    priceMXN: 1300.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=1200&q=85',
    sku: 'INN-U3UUA6',
    category: 'Fila 2',
    es: {
      name: 'Paquete 0.5 - Mini Email Marketing',
      description: 'Plantilla de correo personalizada y envío mensual.',
      features: [
        '1 plantilla de correo electrónico personalizada (base reutilizable).',
        'Envío de hasta 200 correos electrónicos en el mes.'
      ]
    },
    en: {
      name: 'Package 0.5 - Mini Email Marketing',
      description: 'Custom email template and monthly sending.',
      features: [
        '1 customized email template (reusable base).',
        'Sending up to 200 emails in the month.'
      ]
    }
  },
  {
    id: 'paquete-1',
    priceMXN: 4621.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=1200&q=85',
    sku: 'INN-TIQ2HJ',
    category: 'Fila 2',
    es: {
      name: 'Paquete 1 - Básico de Marketing por Correo Electrónico',
      description: 'Creación de 2 plantillas de correos electrónicos personalizadas y análisis.',
      features: [
        'Creación de 2 plantillas de correos electrónicos personalizadas.',
        'Envío de hasta 500 correos electrónicos por mes.',
        'Análisis básico de rendimiento (tasa de apertura, clics).'
      ]
    },
    en: {
      name: 'Package 1 - Basic Email Marketing',
      description: 'Creation of 2 custom email templates and analytics.',
      features: [
        'Creation of 2 customized email templates.',
        'Sending up to 500 emails per month.',
        'Basic performance analysis (open rate, clicks).'
      ]
    }
  },
  {
    id: 'paquete-2',
    priceMXN: 7150.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85',
    sku: 'INN-RDKRCI',
    category: 'Fila 2',
    es: {
      name: 'Paquete 2 - Diseño de Sitio Web Inicial',
      description: 'Diseño y desarrollo de un sitio web de hasta 3 páginas con SEO básico.',
      features: [
        'Diseño y desarrollo de un sitio web de hasta 3 páginas.',
        'Optimización básica para motores de búsqueda (SEO).',
        'Integración con redes sociales.'
      ]
    },
    en: {
      name: 'Package 2 - Initial Website Design',
      description: 'Design and development of a website up to 3 pages with basic SEO.',
      features: [
        'Design and development of up to 3 pages website.',
        'Basic search engine optimization (SEO).',
        'Social media integration.'
      ]
    }
  },
  {
    id: 'paquete-3',
    priceMXN: 12345.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85',
    sku: 'INN-YG1XJD',
    category: 'Fila 3',
    es: {
      name: 'Paquete 3 - Gestión Básica de Redes Sociales',
      description: 'Gestión en 2 perfiles con 8 publicaciones mensuales.',
      features: [
        'Gestión y publicación en 2 perfiles de redes sociales.',
        'Creación de 8 publicaciones mensuales.',
        'Informes mensuales de rendimiento.'
      ]
    },
    en: {
      name: 'Package 3 - Basic Social Media Management',
      description: 'Management across 2 profiles with 8 monthly posts.',
      features: [
        'Management and posting on 2 social media profiles.',
        'Creation of 8 monthly posts.',
        'Monthly performance reports.'
      ]
    }
  },
  {
    id: 'paquete-4',
    priceMXN: 16789.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=85',
    sku: 'INN-0E8BNX',
    category: 'Fila 3',
    es: {
      name: 'Paquete 4 - Plantillas Personalizadas para Redes Sociales',
      description: 'Diseño de 10 plantillas editables para redes sociales.',
      features: [
        'Diseño de 10 plantillas personalizadas para publicaciones en redes sociales.',
        'Archivos editables y exportables.'
      ]
    },
    en: {
      name: 'Package 4 - Custom Social Media Templates',
      description: 'Design of 10 editable social media templates.',
      features: [
        'Design of 10 customized templates for social media posts.',
        'Editable and exportable files.'
      ]
    }
  },
  {
    id: 'paquete-5',
    priceMXN: 18223.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85',
    sku: 'INN-Z98GBU',
    category: 'Fila 3',
    es: {
      name: 'Paquete 5 - Automatización de Marketing Básica',
      description: 'Configuración de 3 flujos de automatización y segmentación.',
      features: [
        'Configuración de 3 flujos de automatización de correos electrónicos.',
        'Segmentación básica de la lista de contactos.',
        'Análisis de rendimiento de campañas automatizadas.'
      ]
    },
    en: {
      name: 'Package 5 - Basic Marketing Automation',
      description: 'Setup of 3 automation flows and segmentation.',
      features: [
        'Configuration of 3 email automation flows.',
        'Basic contact list segmentation.',
        'Automated campaigns performance analysis.'
      ]
    }
  },
  {
    id: 'paquete-6',
    priceMXN: 20567.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=85',
    sku: 'INN-8YO0TG',
    category: 'Fila 3',
    es: {
      name: 'Paquete 6 - Informes y Análisis Detallados',
      description: 'Creación de informes mensuales de rendimiento y ventas.',
      features: [
        'Creación de informes mensuales de rendimiento de campañas.',
        'Análisis detallado de ventas y conversiones.',
        'Recomendaciones para optimización.'
      ]
    },
    en: {
      name: 'Package 6 - Detailed Reports and Analysis',
      description: 'Creation of monthly performance and sales reports.',
      features: [
        'Creation of monthly campaign performance reports.',
        'Detailed sales and conversion analysis.',
        'Recommendations for optimization.'
      ]
    }
  },
  {
    id: 'paquete-7',
    priceMXN: 22890.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1200&q=85',    sku: 'INN-QCPEQZ',
    category: 'Fila 4',
    es: {
      name: 'Paquete 7 - Gestión de Público y Segmentación',
      description: 'Creación y gestión de segmentos de audiencia.',
      features: [
        'Creación y gestión de segmentos de audiencia.',
        'Estrategias de targeting para campañas publicitarias.',
        'Análisis de comportamiento y recomendaciones.'
      ]
    },
    en: {
      name: 'Package 7 - Audience Management and Segmentation',
      description: 'Creation and management of audience segments.',
      features: [
        'Creation and management of audience segments.',
        'Targeting strategies for advertising campaigns.',
        'Behavioral analysis and recommendations.'
      ]
    }
  },
  {
    id: 'paquete-8',
    priceMXN: 25456.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=85',    sku: 'INN-XV1J08',
    category: 'Fila 4',
    es: {
      name: 'Paquete 8 - Herramientas de Marketing de IA Básicas',
      description: 'Configuración de herramientas de IA y chatbots.',
      features: [
        'Configuración de herramientas básicas de IA para marketing.',
        'Asesoramiento en el uso de chatbots y asistentes virtuales.',
        'Integración con plataformas de correo electrónico y redes sociales.'
      ]
    },
    en: {
      name: 'Package 8 - Basic AI Marketing Tools',
      description: 'Setup of basic AI marketing tools and chatbots.',
      features: [
        'Configuration of basic AI marketing tools.',
        'Consulting on chatbot and virtual assistant usage.',
        'Integration with email and social media platforms.'
      ]
    }
  },
  {
    id: 'paquete-9',
    priceMXN: 30123.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=85',    sku: 'INN-2UWFRO',
    category: 'Fila 4',
    es: {
      name: 'Paquete 9 - Creación de Contenido Avanzada',
      description: 'Desarrollo de 8 piezas de contenido y estrategia.',
      features: [
        'Desarrollo de 8 piezas de contenido (artículos, infografías, videos cortos).',
        'Estrategia de contenido y planificación de calendario.',
        'Optimización de contenido para SEO.'
      ]
    },
    en: {
      name: 'Package 9 - Advanced Content Creation',
      description: 'Development of 8 content pieces and strategy.',
      features: [
        'Development of 8 content pieces (articles, infographics, short videos).',
        'Content strategy and calendar planning.',
        'Content optimization for SEO.'
      ]
    }
  },
  {
    id: 'paquete-10',
    priceMXN: 48765.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85',
    sku: 'INN-7XHBYT',
    category: 'Fila 4',
    es: {
      name: 'Paquete 10 - Diseño de Sitio Web Avanzado',
      description: 'Sitio de hasta 8 páginas con e-commerce o reservas y SEO avanzado.',
      features: [
        'Diseño y desarrollo de un sitio web de hasta 8 páginas.',
        'Integración con e-commerce o sistemas de reservas.',
        'Optimización avanzada para SEO y rendimiento.'
      ]
    },
    en: {
      name: 'Package 10 - Advanced Website Design',
      description: 'Up to 8 pages website with e-commerce or booking systems and advanced SEO.',
      features: [
        'Design and development of up to 8 pages website.',
        'Integration with e-commerce or booking systems.',
        'Advanced optimization for SEO and performance.'
      ]
    }
  },
  {
    id: 'plan-personalizado',
    priceMXN: 0.00,
    taxIncluded: false,
    currency: 'MXN + IVA',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85',
    sku: 'INN-AASQHF',
    category: 'Personalizado',
    es: {
      name: 'Plan Personalizado',
      description: 'Servicio a la medida de tus necesidades.',
      features: [
        'Cotización personalizada según requerimientos específicos de TI.',
        'Configuración a la medida tras validación de pago.'
      ]
    },
    en: {
      name: 'Custom Plan',
      description: 'Tailored service to your specific needs.',
      features: [
        'Custom quote according to specific IT requirements.',
        'Custom configuration upon payment validation.'
      ]
    }
  }
];

export function formatMXN(amount: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(amount);
}