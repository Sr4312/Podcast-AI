import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** "hh:mm:ss" estricto. */
const hms = z
  .string()
  .regex(/^\d{2}:[0-5]\d:[0-5]\d$/, 'Formato esperado hh:mm:ss, p. ej. 00:12:34');

const slugEpisodio = /^\d{3}-[a-z0-9]+(?:-[a-z0-9]+)*$/;
const slugSimple = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const formato = z.enum(['laboratorio', 'caso', 'investigacion', 'debate', 'entrevista', 'especial']);
const eje = z.enum(['politica-publica', 'sociedad', 'economia']);
const tipoFuente = z.enum(['norma', 'dataset', 'paper', 'documento-oficial', 'nota']);

const fuente = z.object({
  titulo: z.string().min(3),
  url: z.string().url(),
  tipo: tipoFuente,
  organismo: z.string().min(2),
  fecha: z.coerce.date().optional(),
  verificada: z.boolean().default(false),
  nota: z.string().min(3),
});

const capitulo = z.object({
  t: hms,
  titulo: z.string().min(2),
});

const entradaFechada = z.object({
  fecha: z.coerce.date(),
  texto: z.string().min(3),
});

const episodios = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/episodios' }),
  schema: ({ image }) =>
    z
      .object({
        numero: z.number().int().positive(),
        temporada: z.number().int().positive().default(1),
        titulo: z.string().min(5).max(120),
        bajada: z.string().min(20).max(220),
        fecha: z.coerce.date(),
        duracion: hms,
        formato,
        ejes: z.array(eje).min(1),
        temas: z.array(reference('temas')).min(1),
        invitados: z.array(reference('invitados')).default([]),
        conductores: z.array(reference('conductores')).optional(),
        destacado: z.boolean().default(false),
        portada: image().optional(),
        audio: z
          .object({
            url: z.string().min(1),
            bytes: z.number().int().nonnegative().default(0),
            tipo: z.string().default('audio/mpeg'),
          })
          .optional(),
        youtube: z.string().optional(),
        plataformas: z
          .object({
            youtube: z.string().url().optional(),
            spotify: z.string().url().optional(),
            apple: z.string().url().optional(),
            ivoox: z.string().url().optional(),
          })
          .default({}),
        resumen: z
          .object({
            puntos: z.array(z.string().min(10)).min(3).max(5),
            contexto: z.string().min(100),
          })
          .optional(),
        frase: z
          .object({
            texto: z.string().min(10),
            autor: z.string().min(2),
            t: hms,
          })
          .optional(),
        capitulos: z.array(capitulo).default([]),
        fuentes: z.array(fuente).default([]),
        ia: z
          .object({
            usada_para: z.array(z.string()).min(1),
            no_usada_para: z.array(z.string()).min(1),
            revisado_por: z.string().min(2),
          })
          .optional(),
        seguimiento: z.array(entradaFechada).default([]),
        correcciones: z.array(entradaFechada).default([]),
        estado: z.enum(['borrador', 'publicado']).default('borrador'),
        ejemplo: z.boolean().default(false),
      })
      .superRefine((ep, ctx) => {
        if (ep.estado !== 'publicado') return;
        const falta = (campo: string, msg: string) =>
          ctx.addIssue({ code: z.ZodIssueCode.custom, path: [campo], message: msg });
        if (!ep.audio?.url) falta('audio', 'Un episodio publicado necesita audio.url');
        if (ep.capitulos.length === 0) falta('capitulos', 'Un episodio publicado necesita al menos un capítulo');
        if (ep.fuentes.length === 0) falta('fuentes', 'Un episodio publicado necesita al menos una fuente');
        if (!ep.resumen) falta('resumen', 'Un episodio publicado necesita resumen (puntos + contexto)');
        if (!ep.ia) falta('ia', 'Un episodio publicado necesita el bloque ia');
      }),
});

const invitados = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/invitados' }),
  schema: ({ image }) =>
    z.object({
      nombre: z.string().min(3),
      rol: z.string().min(3),
      organizacion: z.string().optional(),
      foto: image().optional(),
      links: z
        .object({
          web: z.string().url().optional(),
          linkedin: z.string().url().optional(),
          x: z.string().url().optional(),
          bluesky: z.string().url().optional(),
          scholar: z.string().url().optional(),
        })
        .default({}),
      /** Vacío = "Sin conflictos declarados". */
      conflictos: z.array(z.string()).default([]),
      ejemplo: z.boolean().default(false),
    }),
});

const conductores = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/conductores' }),
  schema: ({ image }) =>
    z.object({
      nombre: z.string().min(3),
      rol: z.string().min(3),
      foto: image().optional(),
      links: z
        .object({
          web: z.string().url().optional(),
          linkedin: z.string().url().optional(),
          x: z.string().url().optional(),
          bluesky: z.string().url().optional(),
        })
        .default({}),
      conflictos: z.array(z.string()).default([]),
      orden: z.number().int().default(0),
    }),
});

const temas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/temas' }),
  schema: z.object({
    nombre: z.string().min(2),
    eje,
    descripcion: z.string().min(40).max(400),
    glosario: z.array(reference('glosario')).default([]),
  }),
});

const glosario = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/glosario' }),
  schema: z.object({
    termino: z.string().min(2),
    /** Variantes que también se enlazan en transcripciones (plural, sigla, inglés). */
    sinonimos: z.array(z.string()).default([]),
    definicion: z.string().min(40).max(400),
    relacionados: z.array(reference('glosario')).default([]),
  }),
});

export const collections = { episodios, invitados, conductores, temas, glosario };

export { slugEpisodio, slugSimple };
