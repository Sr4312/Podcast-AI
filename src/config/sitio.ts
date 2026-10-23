/**
 * Datos del sitio. ÚNICO lugar donde se cargan nombre, dominio, plataformas,
 * conductores y proveedores.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ TODO ANTES DE PUBLICAR: todo lo marcado con `// TODO` es un valor de  │
 * │ presentación, inventado para la demo. Reemplazalo por el real.        │
 * └──────────────────────────────────────────────────────────────────────┘
 */

export const SITIO = {
  nombre: 'Señal Pública', // TODO nombre real del podcast
  nombreCorto: 'Señal Pública',
  dominio: 'senalpublica.ar', // TODO dominio real
  url: 'https://senalpublica.ar', // TODO
  idioma: 'es-AR',
  descripcionCorta:
    'Un podcast sobre inteligencia artificial aplicada a problemas públicos concretos en Argentina y América Latina.',
  descripcion50:
    'Señal Pública es un podcast sobre inteligencia artificial aplicada a problemas de política pública, sociedad y economía. Cada episodio toma un caso concreto de Argentina o América Latina y analiza, con fuentes a la vista, qué cambia y qué no cambia con IA.',
  descripcion150:
    'Señal Pública es un podcast sobre inteligencia artificial aplicada a problemas públicos concretos. No es un programa de novedades tecnológicas: cada episodio parte de un problema real —una ley en discusión, un trámite municipal, un mercado de trabajo, un servicio público— y lo somete a prueba. Comparamos lo que hace un sistema de IA con lo que hace una persona experta, contrastamos respuestas de chatbots con normativa oficial y seguimos casos de implementación en el Estado. Todo lo que afirmamos tiene una fuente primaria citada y verificable: boletines oficiales, datasets públicos, papers y documentos de organismos. Está pensado para funcionarios, legisladores y sus equipos, periodistas, investigadores, organizaciones sociales y público informado que quiere entender la IA sin publicidad ni pánico. Publicamos transcripciones completas, capítulos, fuentes y una fe de erratas pública.',
  email: 'hola@senalpublica.ar', // TODO
  emailCorrecciones: 'correcciones@senalpublica.ar', // TODO
  temporadaActual: 1,
  anioInicio: 2026,

  /** Hosting del audio y feed RSS canónico (el del hosting, no el de la web). */
  hosting: {
    nombre: 'Transistor', // TODO
    rss: 'https://feeds.transistor.fm/senal-publica', // TODO URL real del feed
  },

  /** Links del SHOW en cada plataforma (los de cada episodio van en su frontmatter). */
  plataformas: {
    youtube: 'https://www.youtube.com/@senalpublica', // TODO
    spotify: 'https://open.spotify.com/show/ejemplo-senal-publica', // TODO
    apple: 'https://podcasts.apple.com/ar/podcast/ejemplo-senal-publica', // TODO
    ivoox: '', // opcional
  },

  redes: {
    linkedin: 'https://www.linkedin.com/company/ejemplo-senal-publica', // TODO
    instagram: 'https://www.instagram.com/ejemplo.senalpublica', // TODO
    bluesky: '', // opcional
  },

  newsletter: {
    proveedor: 'buttondown' as 'buttondown' | 'substack' | 'beehiiv' | 'ninguno',
    /** Buttondown: https://buttondown.com/api/emails/embed-subscribe/<usuario> */
    endpoint: 'https://buttondown.com/api/emails/embed-subscribe/senal-publica', // TODO
    nombreLista: 'La señal de la semana',
  },

  analytics: {
    proveedor: 'plausible' as 'plausible' | 'umami' | 'cloudflare' | 'ninguno',
    dominio: 'senalpublica.ar', // TODO
    script: 'https://plausible.io/js/script.outbound-links.js',
  },

  formularios: {
    /** Endpoint que recibe "Proponer un caso". Vacío = modo demo (no envía). */
    proponerCaso: '', // TODO p. ej. un Worker de Cloudflare o Formspree
  },
} as const;

export const EJES = {
  'politica-publica': {
    nombre: 'Política pública',
    descripcion:
      'Leyes, regulación, trámites y decisiones del Estado: dónde la IA entra en el circuito y qué cambia en el resultado.',
  },
  sociedad: {
    nombre: 'Sociedad',
    descripcion:
      'Derechos, información pública, educación, salud y la relación cotidiana entre personas e instituciones.',
  },
  economia: {
    nombre: 'Economía',
    descripcion:
      'Trabajo, productividad, mercados y costos: qué dicen los datos sobre el impacto real de la automatización.',
  },
} as const;

export type EjeId = keyof typeof EJES;

/** Viñeta (src/components/Vineta.astro) que acompaña a cada eje en la home y en /temas. */
export const VINETA_EJE: Record<EjeId, 'estado' | 'sociedad' | 'economia'> = {
  'politica-publica': 'estado',
  sociedad: 'sociedad',
  economia: 'economia',
};

export const FORMATOS = {
  laboratorio: {
    nombre: 'Laboratorio',
    descripcion: 'Ponemos a prueba un sistema de IA contra una persona experta en la misma tarea.',
  },
  caso: {
    nombre: 'Caso',
    descripcion: 'Seguimos una implementación real de IA en el Estado o en una organización.',
  },
  investigacion: {
    nombre: 'Investigación',
    descripcion: 'Contrastamos sistemáticamente respuestas de IA con fuentes oficiales.',
  },
  debate: {
    nombre: 'Debate',
    descripcion: 'Dos posiciones fundamentadas sobre una misma decisión pública.',
  },
  entrevista: {
    nombre: 'Entrevista',
    descripcion: 'Una conversación larga con alguien que tomó o estudió una decisión concreta.',
  },
  especial: {
    nombre: 'Especial',
    descripcion: 'Episodios fuera de serie: balances, respuestas a la audiencia, coberturas.',
  },
} as const;

export type FormatoId = keyof typeof FORMATOS;

export const TIPOS_FUENTE = {
  norma: 'Ley o norma',
  dataset: 'Dataset',
  paper: 'Paper',
  'documento-oficial': 'Documento oficial',
  nota: 'Nota periodística',
} as const;

export type TipoFuente = keyof typeof TIPOS_FUENTE;
