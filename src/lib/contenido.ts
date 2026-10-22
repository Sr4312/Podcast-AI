import { getCollection, type CollectionEntry } from 'astro:content';
import { aSegundos } from './tiempo';
import { SITIO } from '@/config/sitio';
import type { EpisodioCarga } from '@/stores/reproductor';

/** Datos mínimos que el reproductor necesita para cargar un episodio. */
export function cargaReproductor(ep: CollectionEntry<'episodios'>): EpisodioCarga {
  return {
    id: ep.id,
    numero: ep.data.numero,
    titulo: ep.data.titulo,
    url: ep.data.audio?.url ?? '',
    duracion: aSegundos(ep.data.duracion),
    ruta: `/episodios/${ep.id}`,
    capitulos: ep.data.capitulos.map((c) => ({ t: aSegundos(c.t), titulo: c.titulo })),
    podcast: SITIO.nombre,
  };
}

export type Episodio = CollectionEntry<'episodios'>;

/** Episodios visibles: publicados siempre; borradores solo en desarrollo. */
export async function getEpisodios(): Promise<Episodio[]> {
  const todos = await getCollection('episodios', ({ data }) =>
    import.meta.env.PROD ? data.estado === 'publicado' : true,
  );
  return todos.sort((a, b) => b.data.fecha.getTime() - a.data.fecha.getTime() || b.data.numero - a.data.numero);
}

export async function getEpisodio(slug: string): Promise<Episodio | undefined> {
  return (await getEpisodios()).find((e) => e.id === slug);
}

export function duracionSegundos(ep: Episodio): number {
  return aSegundos(ep.data.duracion);
}

/** Capítulos con segundos ya calculados. */
export function capitulosDe(ep: Episodio) {
  return ep.data.capitulos.map((c) => ({ ...c, segundos: aSegundos(c.t) }));
}

/** Picos de la waveform, si fueron generados con `npm run peaks`. */
const peaksGlob = import.meta.glob<{ default: { picos: number[]; duracion: number } }>('../data/peaks/*.json');

export async function picosDe(slug: string): Promise<number[] | null> {
  const ruta = `../data/peaks/${slug}.json`;
  const cargar = peaksGlob[ruta];
  if (!cargar) return null;
  const mod = await cargar();
  return mod.default.picos;
}

/** 3 episodios relacionados por temas compartidos (desempate: más reciente). */
export function relacionados(ep: Episodio, todos: Episodio[], n = 3): Episodio[] {
  const temas = new Set(ep.data.temas.map((t) => t.id));
  return todos
    .filter((e) => e.id !== ep.id)
    .map((e) => ({ e, score: e.data.temas.filter((t) => temas.has(t.id)).length }))
    .sort((a, b) => b.score - a.score || b.e.data.fecha.getTime() - a.e.data.fecha.getTime())
    .slice(0, n)
    .map((x) => x.e);
}

/* ---------- Agregados para las páginas de biblioteca ---------- */

export interface FuenteAgregada {
  titulo: string;
  url: string;
  tipo: Episodio['data']['fuentes'][number]['tipo'];
  organismo: string;
  fecha?: Date;
  verificada: boolean;
  /** Episodios que la citan, con la nota de cada uno. */
  citas: { ep: Episodio; nota: string }[];
}

/** Todas las fuentes de todos los episodios, deduplicadas por URL. */
export function fuentesAgregadas(episodios: Episodio[]): FuenteAgregada[] {
  const mapa = new Map<string, FuenteAgregada>();
  for (const ep of episodios) {
    for (const f of ep.data.fuentes) {
      const clave = f.url.replace(/\/$/, '').toLowerCase();
      const existente = mapa.get(clave);
      if (existente) {
        existente.citas.push({ ep, nota: f.nota });
        // Verificada si al menos un episodio la verificó.
        existente.verificada = existente.verificada || f.verificada;
      } else {
        mapa.set(clave, { titulo: f.titulo, url: f.url, tipo: f.tipo, organismo: f.organismo, fecha: f.fecha, verificada: f.verificada, citas: [{ ep, nota: f.nota }] });
      }
    }
  }
  return Array.from(mapa.values()).sort((a, b) => a.titulo.localeCompare(b.titulo, 'es'));
}

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Episodios en cuya transcripción aparece un término del glosario (o sus sinónimos). */
export function episodiosConTermino(termino: CollectionEntry<'glosario'>, episodios: Episodio[]): Episodio[] {
  const variantes = [termino.data.termino, ...termino.data.sinonimos].map(escapeRegex);
  const re = new RegExp(`(?<![\\p{L}\\p{N}-])(?:${variantes.join('|')})(?![\\p{L}\\p{N}-])`, 'iu');
  return episodios.filter((ep) => re.test(ep.body ?? ''));
}

/** Todas las correcciones y seguimientos del sitio, más recientes primero. */
export function correccionesDe(episodios: Episodio[]) {
  return episodios
    .flatMap((ep) => ep.data.correcciones.map((c) => ({ ep, fecha: c.fecha, texto: c.texto })))
    .sort((a, b) => b.fecha.getTime() - a.fecha.getTime());
}

export function iniciales(nombre: string): string {
  return nombre
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join('');
}

export function fechaLarga(d: Date): string {
  return new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d);
}

export function fechaCorta(d: Date): string {
  return new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' })
    .format(d)
    .replace('.', '');
}

export function fechaISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}
