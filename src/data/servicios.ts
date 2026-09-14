// Contenido y configuración de la landing comercial /servicios.
// Audiencia: dueños de negocios locales y pymes, no reclutadores ni devs —
// evitar jerga técnica en todo lo que se muestre aquí.

// CTA principal: cambia esta URL por un link de Calendly/Cal.com cuando quieras
// dejar de usar WhatsApp como canal de agendado.
const WHATSAPP_NUMBER = '51966770912';
const WHATSAPP_MESSAGE = 'Hola Renzo, vi tu página de servicios y quiero agendar una llamada gratis.';

export const CTA_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
export const CTA_LABEL = 'Agenda una llamada gratis de 20 min';

export const painPoints: string[] = [
  'Pierdes clientes porque no respondes a tiempo, o ni siquiera te encuentran en internet.',
  'Pasas horas haciendo a mano tareas que podrías automatizar: cotizaciones, agendar citas, llevar tus cuentas.',
  'Sientes que tu competencia ya avanzó con su presencia digital y tú te estás quedando atrás.',
  'No sabes con certeza cuánto vendes ni en qué se te va el tiempo — todo vive en cuadernos, Excels sueltos o en tu cabeza.',
];

export interface Offer {
  index: string;
  title: string;
  desc: string;
}

// Descripciones a nivel de beneficio, a propósito genéricas. Cuando definas
// el nicho o el paquete/precio concreto, amplía cada `desc` con el detalle real.
export const offers: Offer[] = [
  {
    index: '01',
    title: 'Presencia digital que atrae clientes',
    desc: 'Una página web simple y rápida, pensada para que te contacten.',
  },
  {
    index: '02',
    title: 'Sistema para no perder ningún cliente ni venta',
    desc: 'Un sistema sencillo para ordenar tus pedidos, clientes y ventas en un solo lugar.',
  },
  {
    index: '03',
    title: 'Automatiza tareas y recupera tu tiempo',
    desc: 'Automatizaciones que hacen por ti lo repetitivo: recordatorios, reportes, cotizaciones.',
  },
  {
    index: '04',
    title: 'Bots y asistentes que atienden por ti',
    desc: 'Un asistente que responde y atiende pedidos por WhatsApp, incluso cuando tú no puedes.',
  },
];

export interface ProcessStep {
  number: string;
  title: string;
  desc: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: '1',
    title: 'Hablamos de tu negocio',
    desc: 'Llamada corta y sin compromiso para entender qué necesitas.',
  },
  {
    number: '2',
    title: 'Te presento una propuesta a tu medida',
    desc: 'Sabes exactamente qué recibes y cuánto cuesta, antes de empezar.',
  },
  {
    number: '3',
    title: 'Lo implemento y te acompaño',
    desc: 'Te entrego la solución funcionando y sigo disponible si necesitas ajustes.',
  },
];

export interface ProofCase {
  title: string;
  desc: string;
  tag: string;
  tagVariant: 'success' | 'info';
  href?: string;
  quote?: {
    text: string;
    name: string;
    role: string;
  };
  note?: string;
}

// Las citas son reales, tomadas de notas de prensa oficiales de la UNMSM sobre
// estos mismos proyectos (San Market y Medibyte) — el `href` apunta a la nota
// original. Reemplázalas por testimonios propios de negocios locales cuando
// los tengas; a Cuentape (sin nota de prensa aún) le falta el suyo.
export const proofCases: ProofCase[] = [
  {
    title: 'Tienda online universitaria',
    desc: 'Tienda online para una universidad que simplifica pagos y trámites a miles de personas.',
    tag: 'En producción',
    tagVariant: 'success',
    href: 'https://www.unmsm.edu.pe/noticias-y-eventos/noticias/noticia-detalle/unmsm-lanza-san-market-la-nueva-tienda-virtual-para-simplificar-pagos-y-tramites',
    quote: {
      text: 'Esta es una experiencia moderna, eficiente y económica. San Marcos está en plena transformación digital.',
      name: 'Jeri Ramón Ruffner',
      role: 'Rectora de la UNMSM',
    },
  },
  {
    title: 'Historias clínicas digitales',
    desc: 'Sistema que digitalizó miles de historias clínicas en papel, ahorrando horas de trabajo manual al personal médico.',
    tag: 'En producción',
    tagVariant: 'success',
    href: 'https://www.unmsm.edu.pe/noticias-y-eventos/noticias/noticia-detalle/adios-al-papel-sistema-quipucamayoc-digitalizara-las-historias-clinicas-de-san-marcos',
    quote: {
      text: 'Es una aplicación extraordinaria. Ya no debemos tener documentos escritos, sino virtuales, y este programa es bastante seguro.',
      name: 'José Somocurcio',
      role: 'Director de la Clínica Universitaria UNMSM',
    },
  },
  {
    title: 'Gestión financiera para pymes',
    desc: 'App para vendedores de mercado que va más allá de anotar ventas: registra automáticamente sus cobros por Yape y Plin, permite anotar sus gastos y ver las ventas por categoría o producto, para que sepan exactamente cuánto ganaron de verdad.',
    tag: 'En prueba con vendedores reales',
    tagVariant: 'info',
    note: 'Ya en prueba de campo real: un vendedor de mercado la usa día a día para registrar sus ventas de principio a fin.',
  },
];
